'use client';

import { useEffect, useRef } from 'react';

interface PlaceholderImageProps {
  text?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function PlaceholderImage({ 
  text = 'Sin imagen', 
  width = 200, 
  height = 200,
  className = ''
}: PlaceholderImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Establecer dimensiones
    canvas.width = width;
    canvas.height = height;

    // Fondo con gradiente
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#fde3ec');  // Rosa claro
    gradient.addColorStop(1, '#f5d0fe');  // Púrpura claro
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Dibujar patrón
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i < height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // Texto
    ctx.fillStyle = '#666';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);

  }, [width, height, text]);

  return (
    <canvas 
      ref={canvasRef} 
      className={className}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
} 