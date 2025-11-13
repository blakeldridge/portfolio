import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaSync,
  FaTimes,
  FaExternalLinkAlt,
} from "react-icons/fa";

import mediaData from "../assets/media.json";
import newsfeed from "../assets/newsfeed.json";

const GymnasticsBrowser = () => {
  const browserTabs = ["Gallery", "Competitions & News", "Routine Builder"];
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTabContentKey, setActiveTabContentKey] = useState(Date.now());

  const urls = {
    Gallery: "https://gravity.hates.me/media ",
    "Competitions & News": "https://flipfeed.com/latest ",
    "Routine Builder": "https://gymnastics-routine-builder.vercel.app ",
  };

  // keep only images
  const media = mediaData.media.filter((m) => m.type === "image");

  const [selectedMedia, setSelectedMedia] = useState(media[0] || null);

  const newsFeed = newsfeed.news;
  const [activeNewsId, setActiveNewsId] = useState(newsFeed[0]?.id || null);

  const handleRefresh = () => {
    setActiveTabContentKey(Date.now());
    setSelectedMedia(null);
  };

  return (
    <motion.div
      key={activeTabContentKey}
      className="mx-auto mt-6 w-[90vw] h-[80vh] bg-gray-100 rounded-xl shadow-xl flex flex-col overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{ top: "10%", position: "relative" }}
    >
      {/* Window Header / Browser Toolbar */}
      <div className="bg-gray-200 h-12 flex items-center px-4 border-b border-gray-300 justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-400 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
        <span className="ml-4 font-mono font-bold text-gray-700">
          Gymnastics Browser
        </span>
      </div>

      {/* Browser Tabs */}
      <div className="flex bg-gray-300 border-b border-gray-400 px-2">
        {browserTabs.map((tab, index) => (
          <div
            key={index}
            className={`flex items-center px-3 py-1 border-r border-gray-400 cursor-pointer  ${
              activeTabIndex === index
                ? "bg-white text-black rounded-t"
                : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTabIndex(index)}
          >
            <span className="mr-2">{tab}</span>
            <FaTimes className="text-gray-400 hover:text-gray-600 text-sm" />
          </div>
        ))}
      </div>

      {/* Address / Navigation bar */}
      <div className="bg-gray-200 h-10 flex items-center px-3 border-b border-gray-300 space-x-2">
        <button className="p-1 hover:bg-gray-300 rounded">
          <FaArrowLeft />
        </button>
        <button className="p-1 hover:bg-gray-300 rounded">
          <FaArrowRight />
        </button>
        <button onClick={handleRefresh} className="p-1 hover:bg-gray-300 rounded">
          <FaSync />
        </button>
        <div className="flex-1 bg-white rounded px-2 py-1 font-mono text-gray-600 select-none text-sm">
          {urls[browserTabs[activeTabIndex]]}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-900 text-gray-200 p-4">
        {/* Gallery (images only) */}
        {activeTabIndex === 0 && (
          <div className="flex h-full gap-4">
            {/* Left thumbnail strip */}
            <div className="w-1/4 overflow-y-auto space-y-2">
              {media.map((m) => (
                <div
                  key={m.id}
                  className="cursor-pointer rounded shadow hover:shadow-lg transition overflow-hidden"
                  onClick={() => setSelectedMedia(m)}
                >
                  <img
                    src={m.src}
                    alt=""
                    className="w-full aspect-square object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main preview */}
            <div className="flex-1 flex items-center justify-center bg-gray-800 rounded">
              {selectedMedia ? (
                <img
                  src={selectedMedia.src}
                  alt=""
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-gray-400 font-mono">
                  Select an image to view
                </div>
              )}
            </div>
          </div>
        )}

        {/* News (unchanged, but feed only images) */}
        {activeTabIndex === 1 && (
          <div className="flex h-full gap-4 overflow-hidden">
            <div className="w-1/3 bg-gray-800 p-4 overflow-y-auto space-y-2 rounded">
              {newsFeed.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded cursor-pointer transition ${
                    activeNewsId === item.id
                      ? "bg-gray-700 text-white shadow-inner"
                      : "hover:bg-gray-700 text-gray-300"
                  }`}
                  onClick={() => setActiveNewsId(item.id)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">{item.headline}</span>
                    <span className="text-gray-400 text-xs">
                      {item.readTime} min read
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="flex-1 bg-gray-900 p-6 rounded overflow-y-auto">
              {newsFeed
                .filter((item) => item.id === activeNewsId)
                .map((item) => (
                  <div key={item.id} className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">
                      {item.headline}
                    </h2>
                    {item.section1 ? (
                      <p className="text-gray-300">{item.section1}</p>
                    ) : null}
                    {item.section2 ? (
                      <p className="text-gray-300">{item.section2}</p>
                    ) : null}
                    {item.section3 ? (
                      <p className="text-gray-300">{item.section3}</p>
                    ) : null}
                    <p className="text-gray-400 italic">End of story</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Routine Builder */}
        {activeTabIndex === 2 && (
          <div className="flex-1 relative">
            <iframe
              src="https://gymnastics-routine-builder.vercel.app "
              className="w-full h-full rounded border border-gray-600"
              title="Routine Builder"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GymnasticsBrowser;