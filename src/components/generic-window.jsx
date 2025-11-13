import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const GenericWindow = ({
  title = "Window",
  children,
  minWidth = 300,
  minHeight = 200,
  initialWidth = minWidth,
  initialHeight = minHeight,
  initialX = 0.1,
  initialY = 0.1,
  className = "",
  onClose, // optional callback for parent (WindowManager)
  enableClose = true,
}) => {
    const [size, setSize] = useState({
        width: Math.max(initialWidth, minWidth),
        height: Math.max(initialHeight, minHeight),
    });

    const [position, setPosition] = useState(() => ({
    x: typeof initialX === "number" && initialX <= 1 ? window.innerWidth * initialX : initialX,
    y: typeof initialY === "number" && initialY <= 1 ? window.innerHeight * initialY : initialY,
    }));

    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isClosed, setIsClosed] = useState(false);

    const windowRef = useRef(null);
    const resizingRef = useRef(false);
    const draggingRef = useRef(false);
    const startPosRef = useRef({});

  // -------------------
  // RESIZE HANDLERS
  // -------------------
  const handleResizeMouseDown = (e) => {
    if (isMaximized) return; // disable resize when maximized
    e.preventDefault();
    e.stopPropagation();
    resizingRef.current = true;
    startPosRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    };
    window.addEventListener("mousemove", handleResizeMouseMove);
    window.addEventListener("mouseup", handleResizeMouseUp);
  };

  const handleResizeMouseMove = (e) => {
    if (!resizingRef.current) return;
    const dx = e.clientX - startPosRef.current.x;
    const dy = e.clientY - startPosRef.current.y;
    setSize({
      width: Math.max(minWidth, startPosRef.current.width + dx),
      height: Math.max(minHeight, startPosRef.current.height + dy),
    });
  };

  const handleResizeMouseUp = () => {
    resizingRef.current = false;
    window.removeEventListener("mousemove", handleResizeMouseMove);
    window.removeEventListener("mouseup", handleResizeMouseUp);
  };

  // -------------------
  // DRAG HANDLERS
  // -------------------
  const handleDragMouseDown = (e) => {
    if (isMaximized) return; // can't drag maximized window
    e.preventDefault();
    draggingRef.current = true;
    startPosRef.current = {
      x: e.clientX,
      y: e.clientY,
      left: position.x,
      top: position.y,
    };
    window.addEventListener("mousemove", handleDragMouseMove);
    window.addEventListener("mouseup", handleDragMouseUp);
  };

  const handleDragMouseMove = (e) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - startPosRef.current.x;
    const dy = e.clientY - startPosRef.current.y;
    setPosition({
      x: startPosRef.current.left + dx,
      y: startPosRef.current.top + dy,
    });
  };

  const handleDragMouseUp = () => {
    draggingRef.current = false;
    window.removeEventListener("mousemove", handleDragMouseMove);
    window.removeEventListener("mouseup", handleDragMouseUp);
  };

  // -------------------
  // WINDOW CONTROLS
  // -------------------
  const handleClose = () => {
    if (enableClose){
      setIsClosed(true);
      if (onClose) onClose();
    }
  };

  const handleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  const handleMaximize = () => {
    if (!isMaximized) {
      // save old size/pos
      startPosRef.current = { size, position };
      setPosition({ x: 0, y: 0 });
      setSize({
        width: window.innerWidth,
        height: window.innerHeight - 40, // leave space for bottom taskbar maybe
      });
      setIsMaximized(true);
    } else {
      // restore old size/pos
      setSize(startPosRef.current.size);
      setPosition(startPosRef.current.position);
      setIsMaximized(false);
    }
  };

  if (isClosed) return null;

  return (
    <motion.div
      ref={windowRef}
      className={`bg-gray-900 border border-gray-800 rounded-xl shadow-xl overflow-hidden absolute ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        width: size.width,
        height: isMinimized ? 40 : size.height,
        left: position.x,
        top: position.y,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
    >
      {/* Toolbar (Drag Handle) */}
      <div
        onMouseDown={handleDragMouseDown}
        className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700 cursor-move"
      >
        <div className="flex space-x-2">
          <button
            onClick={handleClose}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600"
            title="Close"
          />
          <button
            onClick={handleMinimize}
            className="w-3 h-3 bg-yellow-400 rounded-full hover:bg-yellow-500"
            title="Minimize"
          />
          <button
            onClick={handleMaximize}
            className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600"
            title={isMaximized ? "Restore" : "Maximize"}
          />
        </div>
        <span className="text-gray-400 text-sm font-mono select-none">{title}</span>
        <div></div>
      </div>

      {/* Window Content */}
      {!isMinimized && (
        <div className="h-full overflow-auto">
          {children}
        </div>
      )}

      {/* Resize Handle */}
      {!isMaximized && (
        <div
          onMouseDown={handleResizeMouseDown}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)",
            backgroundSize: "8px 8px",
          }}
        />
      )}
    </motion.div>
  );
};

export default GenericWindow;
