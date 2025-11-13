import React, { useState } from "react";
import GenericWindow from "./generic-window";
import { FaUserGraduate, FaTerminal, FaBriefcase, FaBook, FaLaptopCode } from "react-icons/fa";
import useIsMobile from "../hooks/useIsMobile";

const WindowManager = ({ windows }) => {
  const isMobile = useIsMobile();
  const [windowStates, setWindowStates] = useState(() =>
    windows.map((w, index) => ({ ...w, zIndex: index + 1 }))
  );

  const bringToFront = (id) => {
    const maxZ = Math.max(...windowStates.map((w) => w.zIndex));
    setWindowStates((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: maxZ + 1 } : w))
    );
  };

  const toggleWindow = (id) => {
    setWindowStates((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: !w.isOpen } : w))
    );
  };

  const handleClose = (id) => {
    setWindowStates((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
    );
  };

  const getIcon = (title) => {
    const key = title.toLowerCase();
    if (key.includes("terminal")) return <FaTerminal />;
    if (key.includes("education")) return <FaUserGraduate />;
    if (key.includes("experience")) return <FaBriefcase />;
    if (key.includes("projects")) return <FaLaptopCode />;
    if (key.includes("about")) return <FaBook />;
    return <FaBook />;
  };

  // --- MOBILE: Static stacked windows ---
  if (isMobile) {
    return (
      <div className="flex flex-col gap-6 p-4">
        {windowStates.map((w) => (
          <div
            key={w.id}
            className="bg-gray-900 border border-gray-800 rounded-xl shadow-xl p-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="text-xl text-gray-400">{getIcon(w.title)}</div>
              <h2 className="font-bold text-lg text-gray-200">{w.title}</h2>
            </div>
            <div>{w.content}</div>
          </div>
        ))}
      </div>
    );
  }

  // --- DESKTOP: Movable windows with dock ---
  return (
    <>
      {windowStates.map(
        (w) =>
          w.isOpen && (
            <GenericWindow
              key={w.id}
              title={w.title}
              minHeight={w.minHeight}
              minWidth={w.minWidth}
              initialX={w.initialX}
              initialY={w.initialY}
              style={{ zIndex: w.zIndex }}
              onClick={() => bringToFront(w.id)}
              onClose={() => handleClose(w.id)}
            >
              {w.content}
            </GenericWindow>
          )
      )}

      <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 bg-gray-900/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-gray-800 transition-all">
        {windowStates.map((w) => (
          <button
            key={w.id}
            onClick={() => toggleWindow(w.id)}
            className={`group relative flex flex-col items-center justify-center w-16 py-2 rounded-xl text-gray-400 hover:text-gray-200 hover:bg-gray-800/70 transition-all duration-200 ${
              w.isOpen ? "ring-2 ring-blue-400 bg-gray-800/80" : ""
            }`}
            title={w.title}
          >
            <div className="text-2xl">{w.icon ? w.icon : getIcon(w.title)}</div>
            <span className="text-[11px] mt-1 font-medium text-gray-400 group-hover:text-gray-200 transition">
              {w.title}
            </span>
            {w.isOpen && (
              <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-blue-400 rounded-full"></span>
            )}
          </button>
        ))}
      </div>
    </>
  );
};

export default WindowManager;
