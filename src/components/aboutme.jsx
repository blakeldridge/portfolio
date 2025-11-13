import GenericWindow from "./generic-window";
import ProfilePic from "../assets/profile.jpg";
import { motion } from "framer-motion";

const AboutMeSection = () => {
  const bio = [
    "Welcome!",
    "I am currently studying Computer Science at the University of Manchester, trying to use my skills to build something meaningful.",
    "I enjoy a good cup of tea, biscuits and getting stuck in a good programming project.",
    "Outside of tech, I am pushing the limits in gymnastics, attempting to be selected into National squads and compete internationally.",
    "Enjoy my desktop-themed portfolio :D"
  ];

  return (
    <div className="flex flex-col px-3">

      {/* Terminal Window */}
        <p className="text-blue-400 mb-4">
          $ about <span className="text-green-500">--info --ascii</span>
        </p>

        <pre className="text-blue-400 text-xs sm:text-sm md:text-base leading-snug mb-4">
{String.raw`
    ____  __      __           ________    __     _     __         
   / __ )/ /___ _/ /_____     / ____/ /___/ /____(_)___/ /___ ____ 
  / __  / / __ \/ //_/ _ \   / __/ / / __  / ___/ / __  / __ \/ _ \
 / /_/ / / /_/ / ,< /  __/  / /___/ / /_/ / /  / / /_/ / /_/ /  __/
/_____/_/\__,_/_/|_|\___/  /_____/_/\__,_/_/  /_/\__,_/\__, /\___/ 
                                                      /____/   
`}
        </pre>

        <div className="text-gray-200 space-y-2">
          {bio.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.3 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
    </div>
  );
};

export default AboutMeSection;
