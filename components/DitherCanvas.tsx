import React, { useRef, useEffect } from 'react';

const DitherCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    // Bayer matrix 4x4 for ordered dithering
    const bayerMatrix = [
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5]
    ];

    // We render at a low resolution and scale up with CSS for the pixelated look
    const scaleFactor = 4;
    
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = Math.ceil(parent.clientWidth / scaleFactor);
        canvas.height = Math.ceil(parent.clientHeight / scaleFactor);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      
      // Calculate mouse position relative to canvas
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Normalize to -1 to 1 range
      // Note: coordinates outside the canvas will result in values < -1 or > 1, 
      // which correctly moves the effect off-screen.
      const normalizedX = ((x / rect.width) * 2) - 1;
      const normalizedY = ((y / rect.height) * 2) - 1;
      
      mouseRef.current = { x: normalizedX, y: normalizedY };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    resize();

    const render = () => {
      if (!ctx) return;
      
      const w = canvas.width;
      const h = canvas.height;
      
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      const cx = w / 2;
      const cy = h / 2;
      
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          // Normalize coordinates -1 to 1
          const u = (x - cx) / cx;
          const v = (y - cy) / cy;
          
          // Calculate distances
          const dist = Math.sqrt(u * u + v * v);
          const distMouse = Math.sqrt((u - mx) ** 2 + (v - my) ** 2);
          
          // Rotating wave pattern
          const angle = Math.atan2(v, u);
          const wave = Math.sin(dist * 10 - t * 0.02 + Math.sin(angle * 4 + t * 0.01));
          
          // Shape 2: Floating "Blobs" (Meta-balls approximation)
          const blob1X = Math.sin(t * 0.015) * 0.5;
          const blob1Y = Math.cos(t * 0.02) * 0.5;
          const distBlob1 = Math.sqrt((u - blob1X) ** 2 + (v - blob1Y) ** 2);
          
          const blob2X = Math.sin(t * 0.01 + 2) * 0.6;
          const blob2Y = Math.cos(t * 0.01 + 2) * 0.3;
          const distBlob2 = Math.sqrt((u - blob2X) ** 2 + (v - blob2Y) ** 2);

          // Combine intensities
          let intensity = 0;
          
          // Base gradient
          intensity += (1 - dist) * 0.3;
          
          // Add blobs
          intensity += (0.2 / distBlob1) + (0.2 / distBlob2);
          
          // Add wave interference
          intensity += wave * 0.2;

          // Mouse Spotlight
          // Adds a strong light source at mouse position
          // The 0.1 constant prevents division by zero and controls the sharpness of the center
          intensity += (0.4 / (distMouse + 0.1));

          // Clamp intensity 0-1
          intensity = Math.max(0, Math.min(1, intensity));

          // --- DITHERING LOGIC ---
          
          // Map pixel position to Bayer matrix
          const bayerVal = bayerMatrix[y % 4][x % 4];
          
          // Normalize bayer value (0-15)
          const threshold = (bayerVal / 16) - 0.1; 
          
          // Determine color
          const color = intensity > threshold ? 255 : 0;

          const index = (y * w + x) * 4;
          data[index] = color;     // R
          data[index + 1] = color; // G
          data[index + 2] = color; // B
          data[index + 3] = 255;   // Alpha
        }
      }

      ctx.putImageData(imageData, 0, 0);
      
      t++;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block opacity-60 mix-blend-screen"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default DitherCanvas;