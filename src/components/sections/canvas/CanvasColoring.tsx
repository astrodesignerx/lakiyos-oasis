'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/Button'

const COLORS = [
  '#C7603A', '#F5C842', '#8FAF8A', '#2C2C2C', '#7A7065',
  '#E89478', '#FCE38A', '#B5CFB0', '#D4A830', '#A34E2E',
  '#6F8F6A', '#FFFFFF',
]

export function CanvasColoring() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [color, setColor] = useState(COLORS[0])
  const [brushSize, setBrushSize] = useState(8)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)
    ctx.fillStyle = '#FAF7F2'
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2)

    const outlineColor = '#2C2C2C'
    ctx.strokeStyle = outlineColor
    ctx.lineWidth = 3

    const drawOutline = (x: number, y: number, w: number, h: number) => {
      ctx.strokeRect(x, y, w, h)
    }

    ctx.beginPath()
    drawOutline(40, 40, 180, 160)
    drawOutline(260, 60, 120, 120)
    drawOutline(140, 220, 100, 140)
    drawOutline(40, 380, 120, 100)
    drawOutline(200, 370, 180, 120)

    ctx.beginPath()
    ctx.arc(100, 100, 30, 0, Math.PI * 2)
    ctx.stroke()
  }, [])

  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    return { x: clientX - rect.left, y: clientY - rect.top }
  }, [])

  const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    setIsDrawing(true)
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const pos = getPos(e)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
  }, [getPos])

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    if (!isDrawing) return
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const pos = getPos(e)
    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.strokeStyle = color
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
  }, [isDrawing, brushSize, color, getPos])

  const stopDrawing = useCallback(() => {
    setIsDrawing(false)
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.beginPath()
  }, [])

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#FAF7F2'
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              color === c ? 'border-charcoal scale-110' : 'border-transparent'
            }`}
            style={{ backgroundColor: c }}
            aria-label={`Color ${c}`}
          />
        ))}
        <div className="w-px h-8 bg-beige mx-2 hidden sm:block" />
        <div className="flex items-center gap-2">
          <span className="text-xs text-warm-gray">Size:</span>
          <input
            type="range"
            min="4"
            max="24"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-20 accent-coral"
          />
        </div>
        <button
          onClick={clearCanvas}
          className="ml-auto text-xs text-warm-gray hover:text-coral transition-colors underline underline-offset-2"
        >
          Clear
        </button>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-[400px] sm:h-[500px] rounded-xl cursor-crosshair touch-none"
        style={{ background: '#FAF7F2' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />

      <p className="text-xs text-warm-gray/60 mt-3 text-center">
        Choose a color, adjust brush size, and start coloring. Tap the &ldquo;Clear&rdquo; button to reset.
      </p>
    </div>
  )
}
