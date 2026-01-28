// import React, { useRef, useEffect, useState, useCallback } from 'react'

// const MaskBox = ({ image, initialStyle }) => {
//   const canvasRef = useRef(null)
//   const maskRef = useRef(null)
//   const [isDragging, setIsDragging] = useState(false)
//   const [position, setPosition] = useState({
//     left: initialStyle.left || '0px',
//     top: initialStyle.top || '0px',
//     right: initialStyle.right || 'auto'
//   })
//   const dragOffset = useRef({ x: 0, y: 0 })

//   const drawClipped = useCallback((ctx, image, rect) => {
//     if (!image || !image.naturalWidth || !image.naturalHeight) return

//     // Calculate aspect ratios
//     const imageAspect = image.naturalWidth / image.naturalHeight
//     const windowAspect = window.innerWidth / window.innerHeight
    
//     // Calculate how the image would be displayed to cover the entire window
//     let displayWidth, displayHeight, displayX, displayY
    
//     if (imageAspect > windowAspect) {
//       // Image is wider - fit to height, center horizontally
//       displayHeight = window.innerHeight
//       displayWidth = displayHeight * imageAspect
//       displayX = (window.innerWidth - displayWidth) / 2
//       displayY = 0
//     } else {
//       // Image is taller - fit to width, center vertically
//       displayWidth = window.innerWidth
//       displayHeight = displayWidth / imageAspect
//       displayX = 0
//       displayY = (window.innerHeight - displayHeight) / 2
//     }
    
//     // Calculate the scale factor between image dimensions and display dimensions
//     const scaleX = image.naturalWidth / displayWidth
//     const scaleY = image.naturalHeight / displayHeight
    
//     // Calculate which portion of the image corresponds to the mask position
//     const sourceX = (rect.left - displayX) * scaleX
//     const sourceY = (rect.top - displayY) * scaleY
//     const sourceWidth = rect.width * scaleX
//     const sourceHeight = rect.height * scaleY
    
//     // Draw the corresponding portion of the image to the canvas
//     ctx.drawImage(
//       image,
//       sourceX,
//       sourceY,
//       sourceWidth,
//       sourceHeight,
//       0,
//       0,
//       rect.width,
//       rect.height
//     )
//   }, [])

//   const draw = useCallback(() => {
//     if (!canvasRef.current || !maskRef.current || !image) return

//     const canvas = canvasRef.current
//     const ctx = canvas.getContext('2d')
//     const rect = maskRef.current.getBoundingClientRect()

//     canvas.width = rect.width
//     canvas.height = rect.height

//     ctx.imageSmoothingEnabled = true
//     ctx.imageSmoothingQuality = 'high'

//     drawClipped(ctx, image, rect)
//   }, [image, drawClipped])

//   useEffect(() => {
//     let animationId
    
//     const animate = () => {
//       draw()
//       animationId = requestAnimationFrame(animate)
//     }
    
//     if (image) {
//       animate()
//     }
    
//     return () => {
//       if (animationId) {
//         cancelAnimationFrame(animationId)
//       }
//     }
//   }, [draw, image])

//   const handleMouseDown = (e) => {
//     setIsDragging(true)
//     const rect = maskRef.current.getBoundingClientRect()
//     dragOffset.current = {
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top
//     }
//   }

//   const handleMouseMove = useCallback((e) => {
//     if (!isDragging) return
    
//     setPosition({
//       left: `${e.clientX - dragOffset.current.x}px`,
//       top: `${e.clientY - dragOffset.current.y}px`,
//       right: 'auto'
//     })
//   }, [isDragging])

//   const handleMouseUp = useCallback(() => {
//     setIsDragging(false)
//   }, [])

//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove)
//       document.addEventListener('mouseup', handleMouseUp)
      
//       return () => {
//         document.removeEventListener('mousemove', handleMouseMove)
//         document.removeEventListener('mouseup', handleMouseUp)
//       }
//     }
//   }, [isDragging, handleMouseMove, handleMouseUp])

//   const maskStyle = {
//     width: initialStyle.width,
//     height: initialStyle.height,
//     left: position.left,
//     top: position.top,
//     right: position.right !== 'auto' ? position.right : initialStyle.right,
//     cursor: isDragging ? 'grabbing' : 'grab'
//   }

//   return (
//     <div 
//       ref={maskRef}
//       className="mask-box fixed"
//       style={maskStyle}
//       onMouseDown={handleMouseDown}
//     >
//       <canvas ref={canvasRef} />
//     </div>
//   )
// }

// export default MaskBox

import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MaskBox = ({ image, config }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Performance-optimized Drawing Logic
  const draw = useCallback(() => {
    if (!canvasRef.current || !containerRef.current || !image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = containerRef.current.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    // Aspect Ratio calculations (Your original logic is solid, keeping it for the "Portal" effect)
    const imageAspect = image.naturalWidth / image.naturalHeight;
    const windowAspect = window.innerWidth / window.innerHeight;
    
    let displayWidth, displayHeight, displayX, displayY;
    
    if (imageAspect > windowAspect) {
      displayHeight = window.innerHeight;
      displayWidth = displayHeight * imageAspect;
      displayX = (window.innerWidth - displayWidth) / 2;
      displayY = 0;
    } else {
      displayWidth = window.innerWidth;
      displayHeight = displayWidth / imageAspect;
      displayX = 0;
      displayY = (window.innerHeight - displayHeight) / 2;
    }
    
    const scaleX = image.naturalWidth / displayWidth;
    const scaleY = image.naturalHeight / displayHeight;
    
    ctx.drawImage(
      image,
      (rect.left - displayX) * scaleX,
      (rect.top - displayY) * scaleY,
      rect.width * scaleX,
      rect.height * scaleY,
      0, 0, rect.width, rect.height
    );
  }, [image]);

  useEffect(() => {
    let frameId;
    const loop = () => {
      draw();
      frameId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(frameId);
  }, [draw]);

  return (
    <motion.div
      ref={containerRef}
      drag
      dragMomentum={true}
      initial={{ 
        width: config.width, 
        height: config.height, 
        top: config.top, 
        left: config.left,
        opacity: 0,
        scale: 0.9 
      }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileDrag={{ scale: 1.05, zIndex: 50 }}
      style={{
        position: 'fixed',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        boxShadow: '0 0 30px rgba(0,0,0,0.5), inset 0 0 15px rgba(56, 189, 248, 0.1)',
        overflow: 'hidden',
        background: '#000',
        borderRadius: '4px'
      }}
    >
      {/* Portal Canvas */}
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Cinematic HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5">
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className="text-[8px] font-mono text-cyan-400 opacity-80 leading-none">
            {config.label}
          </span>
          <div className="w-8 h-[1px] bg-cyan-400/50" />
        </div>
        <div className="absolute bottom-2 right-2">
            <div className="w-2 h-2 border-r border-b border-cyan-400/50" />
        </div>
      </div>
    </motion.div>
  );
};

export default MaskBox;