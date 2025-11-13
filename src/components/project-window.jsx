import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProjectDetailWindow = ({ project, onClose }) => {
  if (!project) return null;

  const [currentImage, setCurrentImage] = useState(0);
  const images = project.media || [];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gray-100 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Window Header */}
        <div className="bg-gray-200 flex justify-between items-center h-12 px-4 border-b border-gray-300">
          <div className="flex items-center">
            <div className="flex space-x-2">
              <button
                onClick={onClose}
                className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition cursor-pointer"
                aria-label="Close"
              ></button>
              <button
                className="w-3 h-3 bg-yellow-400 rounded-full hover:bg-yellow-500 transition cursor-pointer"
                aria-label="Minimize"
              ></button>
              <button
                className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition cursor-pointer"
                aria-label="Maximize"
              ></button>
            </div>
            <span className="ml-4 font-mono font-bold text-gray-700">
              {project.name}
            </span>
          </div>
        </div>

        {/* Window Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {/* Slideshow Section */}
          {images.length > 0 && (
            <div className="mb-6 relative bg-gray-50 rounded-lg overflow-hidden border border-gray-200 w-full h-96">
              <img
                src={images[currentImage].url}
                alt={project.name}
                className="w-full h-full object-cover"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80"
                  >
                    <FaArrowLeft />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80"
                  >
                    <FaArrowRight />
                  </button>
                </>
              )}
            </div>
          )}


          {/* Links Section */}
          {(project.github || project.link) && (
            <div className="flex gap-3 mb-6">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition font-mono text-sm"
                >
                  <FaGithub size={18} />
                  <span>View on GitHub</span>
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-mono text-sm"
                >
                  <FaExternalLinkAlt size={16} />
                  <span>View Project</span>
                </a>
              )}
            </div>
          )}

          {/* Description Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 font-mono">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed font-mono text-sm">
              {project.description}
            </p>
          </div>

          {/* Inspiration Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 font-mono">
              Inspiration
            </h3>
            <p className="text-gray-700 leading-relaxed font-mono text-sm">
              {project.inspiration}
            </p>
          </div>

          {/* Conclusion Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 font-mono">
              Conclusion
            </h3>
            <p className="text-gray-700 leading-relaxed font-mono text-sm">
              {project.workflow || project.conclusion}
            </p>
          </div>

          {/* Takeaways Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 font-mono">
              Key Takeaways
            </h3>
            <p className="text-gray-700 leading-relaxed font-mono text-sm">
              {project.takeaways}
            </p>
          </div>


          {/* Skills Section */}
          {project.skills && project.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3 font-mono">
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 text-gray-500 rounded-lg text-sm font-mono shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetailWindow;
