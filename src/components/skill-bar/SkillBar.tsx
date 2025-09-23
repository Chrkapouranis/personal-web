import React, { useEffect, useState } from "react";

interface SkillBarProps {
  skillNumber: number;
  title: string;
  currentPage: number;
  portraitMode: boolean;
}

const SkillBar: React.FC<SkillBarProps> = ({ skillNumber, title, currentPage, portraitMode }) => {
  const colors = ["bg-green-200", "bg-green-300", "bg-green-400", "bg-green-500", "bg-green-600"];

  const [stage, setStage] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (portraitMode ? currentPage === 4 : currentPage >= 3) {
      interval = setInterval(() => {
        setStage((prev) => {
          if (prev < 5) {
            return prev + 1;
          } else {
            if (interval) clearInterval(interval);
            return prev;
          }
        });
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentPage]);

  return (
    <div className="w-[100%] flex flex-row mt-[0.5%]  items-center justify-between pl-[5%] pr-[5%] relative">
      <span className={`${title === "C#" && "font-serif"} truncate max-w-[40%] text-md`}>
        {title}
      </span>
      <div className="w-[60%] flex flex-row justify-between">
        {Array.from({ length: 5 }, (_, index) => {
          return (
            <div
              key={index}
              className={`w-[17.5%] h-2 rounded-lg ${
                index + 1 <= skillNumber && index + 1 <= stage ? colors[index] : "bg-white"
              } transition-colors duration-1000`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SkillBar;
