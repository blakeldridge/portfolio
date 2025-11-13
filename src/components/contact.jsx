import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const ContactSection = () => {
  const contacts = [
    { name: "LinkedIn", icon: <FaLinkedin />, link: "https://linkedin.com/in/blake" },
    { name: "GitHub", icon: <FaGithub />, link: "https://github.com/blakeeldridge" },
    { name: "Email", icon: <FaEnvelope />, link: "mailto:blake@example.com" },
  ];

  return (
    <section className="w-full py-16 flex gap-8 flex-col items-center">
        <div className="flex items-center text-2xl gap-2">
            <span className="text-blue-500">&#123;</span>

            Contact Me

            <span className="text-blue-500">&#125;</span>
        </div>
        <div className="grid grid-cols-3 gap-12">
            {contacts.map((c) => (
            <a
                key={c.name}
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-gray-400 hover:text-blue-500 transition transform hover:scale-110"
            >
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex items-center justify-center text-4xl mb-2">
                {c.icon}
                </div>
                <span className="font-mono">{c.name}</span>
            </a>
            ))}
        </div>
    </section>
  );
};

export default ContactSection;
