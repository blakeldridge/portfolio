import { useState } from "react";
import { Braces } from "lucide-react";
import CodeTextBox from "./code-textbox";
import folderData from "../assets/experience.json";

const EducationSection = () => {
  const folders = folderData.folders;
  const [selectedFolder, setSelectedFolder] = useState("University");
  const [expandedFolders, setExpandedFolders] = useState({
    University: true,
    Experiences: true,
  });
  const [selectedFile, setSelectedFile] = useState(
    Object.keys(folders[selectedFolder])[0]
  );

  const toggleFolder = (folderName) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const handleFileClick = (folder, file) => {
    setSelectedFolder(folder);
    setSelectedFile(file);
  };

  return (
    <div className="w-full bg-gray-950 border border-gray-700 shadow-2xl overflow-hidden">
      {/* Main Editor Area */}
      <div className="flex flex-row items-stretch min-h-[70vh]">
        {/* LEFT PANEL: Folder Explorer */}
        <div className="w-1/3 bg-gray-800 border-r border-gray-700 p-2 overflow-y-auto">
          {Object.entries(folders).map(([folderName, files]) => (
            <div key={folderName} className="mb-1">
              {/* Folder Header */}
              <div
                className="flex justify-start gap-4 items-center cursor-pointer p-2 hover:bg-gray-700 rounded"
                onClick={() => toggleFolder(folderName)}
              >
                <span className="text-gray-400">
                  {expandedFolders[folderName] ? "▾" : "▸"}
                </span>
                <span className="text-blue-500">{folderName}</span>
              </div>

              {/* Folder Contents */}
              {expandedFolders[folderName] && (
                <ul className="ml-8 text-gray-300 font-mono text-sm">
                  {Object.keys(files).map((file) => (
                    <li
                      key={file}
                      className={`cursor-pointer p-1 rounded hover:bg-gray-700 transition flex items-center gap-2 ${
                        selectedFolder === folderName && selectedFile === file
                          ? "bg-gray-700 text-white font-medium"
                          : ""
                      }`}
                      onClick={() => handleFileClick(folderName, file)}
                    >
                      <Braces size={12} className="text-yellow-400" />
                      {file}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT PANEL: Open File */}
        <div className="flex-1 flex flex-col bg-gray-900">
          {/* Tabs */}
          <div className="flex items-center bg-gray-850 text-gray-300 px-4 py-2 border-b border-gray-700 font-mono text-sm">
            {selectedFile}
          </div>

          {/* Code / Content Display */}
          <div className="flex-1 overflow-y-auto p-4">
            <CodeTextBox
              title={folders[selectedFolder][selectedFile].title}
              content={folders[selectedFolder][selectedFile].content}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
