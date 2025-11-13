import { FaReact } from "react-icons/fa";

/**
 * SkillTreeBranch
 * 
 * Props:
 *  - title: string (e.g. "Frontend")
 *  - skills: array of { name, icon, level }
 */
const SkillTreeBranch = ({ title, skills }) => {
  return (
    <div className="font-mono text-gray-200">
      {/* Header */}
      <div className="text-blue-400">{`${title}: {`}</div>

      {/* Skill List */}
      <div className="pl-6 border-l border-gray-600 mt-2 space-y-2">
        {skills.map((skill, index) => {
          const isLast = index === skills.length - 1;
          return (
            <div key={skill.name} className="flex items-center gap-3">
              <span className="text-gray-500">
                {isLast ? "└──" : "├──"}
              </span>
              {skill.icon}
              <span className="text-gray-100">{skill.name}</span>

              {/* Skill Level Dots */}
              <span className="flex gap-1 ml-3">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < skill.level ? "bg-blue-500" : "bg-gray-700"
                      }`}
                    />
                  ))}
              </span>
            </div>
          );
        })}
      </div>

      <div className="text-blue-400 mt-2">{`},`}</div>
    </div>
  );
};

export default SkillTreeBranch;
