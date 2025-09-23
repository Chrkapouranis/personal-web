import React, { useEffect, useState } from "react";

interface SkillBarProps {
  skillNumber: number;
  title: string;
  currentPage: number;
  portraitMode: boolean;
}

const SkillBar: React.FC<SkillBarProps> = ({ skillNumber, title, currentPage, portraitMode }) => {
  const colors = ["bg-green-200", "bg-green-300", "bg-green-400", "bg-green-500", "bg-green-600"];
  const maxStage = 5;
  const [stage, setStage] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const shouldAnimate = portraitMode ? currentPage === 4 : currentPage >= 3;

    if (shouldAnimate && stage < maxStage) {
      interval = setInterval(() => {
        setStage((prev) => {
          const next = Math.min(prev + 1, maxStage);
          if (next === maxStage && interval) clearInterval(interval);
          return next;
        });
      }, 500);
    }

    return () => clearInterval(interval);
  }, [currentPage, portraitMode, stage]);

  return (
    <div className="w-full flex items-center justify-between mt-1 pl-5 pr-5 relative">
      <span className={`truncate max-w-[40%] text-md ${title === "C#" ? "font-serif" : ""}`}>
        {title}
      </span>
      <div className="w-[60%] flex justify-between">
        {Array.from({ length: maxStage }, (_, index) => (
          <div
            key={index}
            className={`w-[17.5%] h-2 rounded-lg transition-colors duration-1000 ${
              index + 1 <= skillNumber && index + 1 <= stage ? colors[index] : "bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillBar;
