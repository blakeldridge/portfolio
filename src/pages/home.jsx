import TextType from '../components/TextType';
import EducationSection from '../components/education';
import AboutMeSection from '../components/aboutme';
import Profile from '../components/profile';
import WindowManager from '../components/window-manager';
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Home = () => {
  const windows = [
    {
      id: "about",
      title: "About Me",
      content: <AboutMeSection />,
      minWidth: 700,
      minHeight: 500,
      initialX: 0.05,
      initialY: 0.1,
      isOpen: true,
    },
    {
      id:"profile",
      title: "profile pic",
      content: <Profile />,
      minWidth: 300,
      minHeight: 300,
      initialX: 0.8,
      initialY: 0.1,
      isOpen: true,
    },
    {
      id:"education-experience",
      title:"Education Experience",
      content: <EducationSection />,
      minWidth: 1000,
      minHeight: 500,
      initialX: 0.2,
      initialY: 0.2,
      isOpen: false,
    },
  ];

  const contacts = [
    { name: "LinkedIn", icon: <FaLinkedin />, link: "https://linkedin.com/in/blake-eldridge" },
    { name: "GitHub", icon: <FaGithub />, link: "https://github.com/blakeldridge" },
    { name: "Instagram", icon: <FaInstagram />, link: "https://www.instagram.com/blakeldridge/"},
  ];

  return (
    <div className="flex flex-col justify-center  mx-auto font-mono">
      <div className="flex flex-col justify-center min-h-screen items-center gap-4">
        <div className="flex items-center text-4xl sm:text-6xl gap-2">
          <span className="text-blue-500">&#123;</span>

          <TextType 
            text={["Software Engineer", "Data Scientist", "Elite Gymnast", "Blake Eldridge"]}
            typingSpeed={75}
            pauseDuration={1250}
            showCursor={true}
            cursorCharacter="_"
            loop={false}
            cursorClassName={"text-blue-500"}
            restart={true}
            restartTimer={10000}
          />

          <span className="text-blue-500">&#125;</span>
        </div>

        <div className="text-gray-400 pl-1">
          <p>Computer Science Student @ University of Manchester</p>
        </div>

        <div className="grid grid-cols-4 gap-6">
            {contacts.map((c) => (
            <a
                key={c.name}
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-gray-400 hover:text-blue-500 transition transform hover:scale-110"
            >
                <div className="bg-gray-800 rounded-lg p-2 shadow-lg flex items-center justify-center text-xl mb-2">
                {c.icon}
                </div>
            </a>
            ))}
            <NavLink 
              key="/contact"
              to="/contact"
              end
              className="flex flex-col items-center text-gray-400 hover:text-blue-500 transition transform hover:scale-110">
                <div className="bg-gray-800 rounded-lg p-2 shadow-lg flex items-center justify-center text-xl mb-2">
                  <FaEnvelope />
                </div>
            </NavLink>
        </div>
      </div>

      <WindowManager windows={windows} />

    </div>

  );
}

export default Home;
