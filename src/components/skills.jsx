import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SkillTreeBranch from "./skilltree";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaAws,
  FaGitAlt,
  FaLinux,
  FaFigma,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiPytorch,
  SiNumpy,
  SiGithubactions,
  SiCplusplus,
  SiExpress,
} from "react-icons/si";

const SkillsSection = () => {
  const containerRef = useRef(null);
  const [cols, setCols] = useState(3);

  const skills = {
    Frontend: [
      { name: "React", icon: <FaReact className="text-blue-400" />, level: 4 },
      { name: "Next.js", icon: <SiNextdotjs className="text-gray-300" />, level: 3 },
      { name: "Tailwind", icon: <SiTailwindcss className="text-sky-400" />, level: 4 },
    ],
    Backend: [
      { name: "Node.js", icon: <FaNodeJs className="text-green-500" />, level: 4 },
      { name: "MongoDB", icon: <SiMongodb className="text-green-400" />, level: 3 },
      { name: "Express.js", icon: <SiExpress className="text-gray-400" />, level: 4 },
    ],
    DataScience: [
      { name: "Python", icon: <FaPython className="text-yellow-400" />, level: 5 },
      { name: "PyTorch", icon: <SiPytorch className="text-red-500" />, level: 3 },
      { name: "NumPy", icon: <SiNumpy className="text-blue-500" />, level: 4 },
    ],
    DevOps: [
      { name: "Docker", icon: <FaDocker className="text-blue-500" />, level: 3 },
      { name: "GitHub Actions", icon: <SiGithubactions className="text-gray-300" />, level: 3 },
      { name: "AWS", icon: <FaAws className="text-orange-400" />, level: 2 },
    ],
    Tools: [
      { name: "Git", icon: <FaGitAlt className="text-orange-500" />, level: 4 },
      { name: "Figma", icon: <FaFigma className="text-pink-500" />, level: 3 },
    ],
    Other: [
      { name: "C++", icon: <SiCplusplus className="text-blue-600" />, level: 4 },
      { name: "Linux", icon: <FaLinux className="text-gray-400" />, level: 4 },
    ],
  };

  // Watch the component’s width and change the grid layout dynamically
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;

      if (width < 600) setCols(1);
      else if (width < 1000) setCols(2);
      else setCols(3);
    };

    handleResize(); // initial check
    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full bg-gray-900 shadow-lg overflow-hidden">
      <div className="p-6 font-mono text-gray-200">
        <p className="text-blue-400 mb-4">
          $ cat <span className="text-green-400">skills.js</span>
        </p>

        {/* Responsive grid inside the draggable window */}
        <div
          ref={containerRef}
          className="px-6 py-4 transition-all duration-300"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gap: "2rem",
          }}
        >
          {Object.entries(skills).map(([category, data]) => (
            <SkillTreeBranch key={category} title={category} skills={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
