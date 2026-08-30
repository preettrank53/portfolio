"use client";

import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef } from "react";
import type { SignaturePoint } from "@/types/signature";

export interface SignatureCanvasRef {
  clear: () => void;
  getStrokes: () => SignaturePoint[][];
  hasStrokes: () => boolean;
}

const SignatureCanvas = forwardRef<SignatureCanvasRef, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [strokes, setStrokes] = useState<SignaturePoint[][]>([]);
  const [currentStroke, setCurrentStroke] = useState<SignaturePoint[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    clear: () => {
      setStrokes([]);
      setCurrentStroke([]);
      setHasStarted(false);
      clearCanvas();
    },
    getStrokes: () => strokes,
    hasStrokes: () => strokes.length > 0 || currentStroke.length > 0
  }));

  // Handle Resize
  useEffect(() => {
    const handleResize = () => redrawCanvas();
    window.addEventListener("resize", handleResize);
    redrawCanvas(); // Initial draw
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strokes, currentStroke, hasStarted]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Reset canvas dimensions to match display size for crisp rendering
    const rect = canvas.parentElement?.getBoundingClientRect();
    if (rect) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw baseline if not started
    if (!hasStarted) {
      const midY = canvas.height * 0.7;
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.moveTo(canvas.width * 0.1, midY);
      ctx.lineTo(canvas.width * 0.9, midY);
      ctx.strokeStyle = "rgba(128, 128, 128, 0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw placeholder text
      ctx.font = "14px monospace";
      ctx.fillStyle = "rgba(128, 128, 128, 0.5)";
      ctx.textAlign = "center";
      ctx.fillText("Sign here", canvas.width / 2, midY - 10);
    }
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    clearCanvas();

    if (strokes.length === 0 && currentStroke.length === 0 && !hasStarted) return;

    ctx.strokeStyle = "var(--text, #ffffff)";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const drawStroke = (stroke: SignaturePoint[]) => {
      if (stroke.length === 0) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x * canvas.width, stroke[0].y * canvas.height);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x * canvas.width, stroke[i].y * canvas.height);
      }
      ctx.stroke();
    };

    strokes.forEach(drawStroke);
    if (currentStroke.length > 0) {
      drawStroke(currentStroke);
    }
  };

  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>): SignaturePoint | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    return { x, y };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // Only accept primary pointer (usually left click or first touch)
    if (!e.isPrimary) return;
    
    e.preventDefault(); // Prevent default touch actions just in case
    
    // Capture pointer so it tracks outside canvas bounds slightly
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.setPointerCapture(e.pointerId);
    }

    if (!hasStarted) setHasStarted(true);
    setIsDrawing(true);
    const point = getCoordinates(e);
    if (point) {
      setCurrentStroke([point]);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !e.isPrimary) return;
    
    const point = getCoordinates(e);
    if (point) {
      // Basic distance thresholding to reduce point density and smooth lines
      if (currentStroke.length > 0) {
        const lastPoint = currentStroke[currentStroke.length - 1];
        const dx = point.x - lastPoint.x;
        const dy = point.y - lastPoint.y;
        if (dx * dx + dy * dy < 0.0001) return; // Ignore very small movements
      }
      
      setCurrentStroke(prev => [...prev, point]);
      
      // Optimized redraw (could use a separate canvas layer for performance, but this is fine for small strokes)
      redrawCanvas(); 
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !e.isPrimary) return;
    setIsDrawing(false);
    if (currentStroke.length > 0) {
      setStrokes(prev => [...prev, currentStroke]);
      setCurrentStroke([]);
    }
    
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full aspect-[16/7] md:aspect-[21/9] border border-[var(--border)] bg-[var(--surface)] relative overflow-hidden touch-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
    </div>
  );
});

SignatureCanvas.displayName = "SignatureCanvas";

export default SignatureCanvas;
