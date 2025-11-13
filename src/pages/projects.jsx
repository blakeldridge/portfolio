import React, { useState } from "react";
import { motion } from "framer-motion";
import ProjectDetailWindow from "../components/project-window";
import { FaGithub, FaFolder, FaFolderOpen, FaClock, FaBrain, FaGamepad, FaGlobe, FaBook, FaMicrochip, FaBolt, FaMobileAlt, FaGraduationCap } from "react-icons/fa";

import projectsData from "../assets/projects.json";

const ProjectsWindow = () => {
  const projects = projectsData.projects;

  const categories = ["All", "Recent", "AI", "Game", "Web", "Hardware", "Energy", "App"];
  const categoryIcons = {
    All: <FaFolderOpen />,
    Recent: <FaClock />,
    AI: <FaBrain />,
    Game: <FaGamepad />,
    Web: <FaGlobe />,
    Research: <FaBook />,
    Hardware: <FaMicrochip />,
    Energy: <FaBolt />,
    App: <FaMobileAlt />,
    Education: <FaGraduationCap />
  };

  const [activeCategory, setActiveCategory] = useState("All");
  const [openProject, setOpenProject] = useState(null);

  const filteredProjects = projects.filter(p =>
    activeCategory === "All" ? true : // you could add a "recently updated" flag if desired
    p.tags.includes(activeCategory)
  );

  return (
    <div className="flex my-4 justify-center items-start h-[calc(100vh-125px)]">
      <motion.div
        className="w-[90vw] h-full bg-gray-100 rounded-xl shadow-xl flex flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Window Header / Toolbar */}
        <div className="bg-gray-200 flex justify-between h-12 px-4 border-b border-gray-300">
          <div className="flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="ml-4 font-mono font-bold text-gray-700">Projects</span>
          </div>

          <a
            href={"https://linkedin.com/in/yourusername"}
            className="flex items-center gap-1 text-gray-700 hover:text-gray-500 font-mono"
          >
            <FaGithub /> GitHub
          </a>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-56 bg-gray-50 border-r border-gray-300 p-4 flex-shrink-0">
            <ul className="flex flex-col gap-2">
              {categories.map(cat => (
                <li
                  key={cat}
                  className={`px-3 py-2 rounded cursor-pointer flex items-center gap-2 ${activeCategory === cat ? "bg-gray-300 font-bold" : "hover:bg-gray-200"}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {categoryIcons[cat]}
                  <span>{cat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects Grid */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProjects.map(project => (
                <motion.div
                  key={project.id}
                  className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg cursor-pointer transition"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setOpenProject(project)}
                >
                  <FaFolder className="text-yellow-400 text-5xl mb-2" />
                  <span className="text-gray-800 text-center font-medium">{project.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Detail Modal */}
        {openProject && (
            <ProjectDetailWindow
              project={openProject}
              onClose={() => setOpenProject(null)}
            />
          )}
      </motion.div>
    </div>
  );
};

export default ProjectsWindow;
