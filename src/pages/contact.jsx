import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import GenericWindow from "../components/generic-window";

const SocialLauncher = () => {

  // Array of social buttons
  const socials = [
    { name: "GitHub", icon: <FaGithub />, link: "https://github.com/blakeldridge", color: "bg-gray-800 hover:bg-gray-700" },
    { name: "LinkedIn", icon: <FaLinkedin />, link: "https://linkedin.com/in/blake-eldridge", color: "bg-blue-600 hover:bg-blue-700" },
    { name: "Instagram", icon: <FaInstagram />, link: "https://instagram.com/blakeldridge", color: "bg-pink-500 hover:bg-pink-600" },
    { name: "Email", icon: <FaEnvelope />, link: "mailto:blakeldridge@gmail.com", color: "bg-green-500 hover:bg-green-600" },
  ];

  return (
      <GenericWindow
        key={0}
        title="Contact Me!"
        minHeight={300}
        minWidth={350}
        initialX={0.4}
        initialY={0.3}
        className="window"
        enableClose={false}
      >
        {(
        <div className="flex-1 bg-gray-50 p-4 flex flex-col justify-center items-center">
          <h2 className="font-mono text-xl text-gray-800 mb-4">Connect with me!</h2>
          <div className="grid grid-cols-2 gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center gap-2 text-white font-mono rounded-lg p-4 transition transform hover:scale-105 shadow ${social.color}`}
              >
                <div className="text-3xl">{social.icon}</div>
                <span className="text-sm">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
      </GenericWindow>
  );
};

export default SocialLauncher;
