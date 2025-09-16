import { hover } from "@testing-library/user-event/dist/hover";
import React from "react";
import { FiUser, FiTrendingUp, FiBookOpen, FiCrosshair } from "react-icons/fi";

interface PageMarkersProps {
  pagesLength: number;
  pageNumber: number;
  isFocused: boolean;
  currentPage: number;
  flipTo: (page: number) => void;
}

const colorMap: Record<string, string> = {
  red: "bg-red-400",
  green: "bg-green-400",
  yellow: "bg-yellow-400",
  blue: "bg-blue-300",
};

const PageMarkers: React.FC<PageMarkersProps> = ({ pagesLength, pageNumber, isFocused, currentPage, flipTo }) => {
  const pages = [
    { color: "blue", page: 1, icon: <FiUser size={pageNumber === 1 ? 40 : 15} /> },
    { color: "red", page: 2, icon: <FiTrendingUp size={pageNumber === 2 ? 40 : 15} /> },
    { color: "green", page: 3, icon: <FiBookOpen size={pageNumber === 3 ? 40 : 15} /> },
    { color: "yellow", page: 4, icon: <FiCrosshair size={pageNumber === 4 ? 40 : 15} /> },
  ];

  const isOdd = (num: number) => num % 2 !== 0;

  const markers =
    pageNumber === 0
      ? Array.from({ length: pagesLength - 1 }, (_, index) => {
          const { color, page, icon } = pages[index % pages.length];

          return (
            <div
              key={index}
              className={`h-14 mt-6 w-8 p-1 ${
                colorMap[color]
              } flex items-center justify-center rounded hover:cursor-pointer ${
                !isFocused && pageNumber < currentPage && index < currentPage - pageNumber - 2 && "opacity-0"
              } ${!isFocused && pageNumber > currentPage && index < pageNumber - 2 && "opacity-0"}`}
              onClick={() => {
                flipTo(page);
              }}
            >
              {icon}
            </div>
          );
        })
      : isOdd(pageNumber)
      ? Array.from({ length: pageNumber === pagesLength ? pageNumber - 1 : pageNumber }, (_, index) => {
          const { color, page, icon } = pages[index % pages.length];

          return (
            <div
              key={index}
              className={`h-14 mt-6 w-8 p-1 ${
                colorMap[color]
              } flex items-center justify-center rounded hover:cursor-pointer ${
                !isFocused && pageNumber < currentPage && index < currentPage - pageNumber - 2 && "opacity-0"
              } ${!isFocused && pageNumber > currentPage && index < pageNumber - 2 && "opacity-0"} ${
                currentPage === page && "border-2 border-black hover:cursor-default"
              }`}
              onClick={() => {
                flipTo(page);
              }}
            >
              {icon}
            </div>
          );
        })
      : Array.from({ length: pagesLength - pageNumber }, (_, index) => {
          const { color, page, icon } = pages[(index + pageNumber - 1) % pages.length];
          return (
            <div
              key={index}
              className={` h-14 mt-6 w-8 p-1 ${
                colorMap[color]
              } flex items-center justify-center rounded hover:cursor-pointer ${
                !isFocused && index > pageNumber - 1 && currentPage > 0 ? "opacity-0" : ""
              } ${currentPage + 1 === page && "border-2 border-black hover:cursor-default"}`}
              onClick={() => {
                flipTo(page);
              }}
            >
              {icon}
            </div>
          );
        });

  return (
    <div
      className={`h-20 px-4 flex gap-2 ${
        !isOdd(pageNumber) && "justify-end"
      } transition-all duration-[0ms] absolute -top-0 w-[100%] bg-cyan-100`}
    >
      {markers}
    </div>
  );
};

export default PageMarkers;
