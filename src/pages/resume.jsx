import React from "react";
import { motion } from "framer-motion";
import { FaFilePdf, FaDownload } from "react-icons/fa";

/**
 * ResumeWindow
 * Mimics a PDF viewer window for your CV/Resume
 */
const Resume = () => {
  const resumeUrl = "/resume.pdf"; // put your PDF in public folder

  return (
    <motion.div
      className="mx-auto mt-6 w-[75vw] h-[80vh] bg-gray-100 rounded-xl shadow-lg flex flex-col overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Toolbar */}
      <div className="bg-gray-200 h-12 flex items-center justify-between px-4 border-b border-gray-300">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 font-mono font-bold text-gray-700">Resume.pdf</span>
        </div>

        <a
          href={resumeUrl}
          download="Blake_Eldridge_Resume.pdf"
          className="flex items-center gap-1 text-gray-700 hover:text-blue-500 font-mono"
        >
          <FaDownload /> Download
        </a>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto bg-gray-100">
        <iframe
          src={resumeUrl}
          title="Resume PDF"
          className="w-full h-full"
          style={{ border: "none" }}
        />
      </div>
    </motion.div>
  );
};

export default Resume;
