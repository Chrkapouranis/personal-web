import React, { useState, useEffect } from "react";
import { FiUser, FiTrendingUp, FiBookOpen, FiCrosshair } from "react-icons/fi";
import bookmark from "../../Bookmark.png";

interface PageMarkersProps {
  pagesLength: number;
  pageNumber: number;
  isFocused: boolean;
  currentPage: number;
  flipTo: (page: number) => void;
}

const PageMarkers: React.FC<PageMarkersProps> = ({
  pagesLength,
  pageNumber,
  isFocused,
  currentPage,
  flipTo,
}) => {
  const pages = [
    { page: 1, icon: <FiUser size={pageNumber === 1 ? 30 : 20} /> },
    { page: 2, icon: <FiTrendingUp size={pageNumber === 2 ? 30 : 20} /> },
    { page: 3, icon: <FiBookOpen size={pageNumber === 3 ? 30 : 20} /> },
    { page: 4, icon: <FiCrosshair size={pageNumber === 4 ? 30 : 20} /> },
  ];

  const isOdd = (num: number) => num % 2 !== 0;

  const commonParentClsName =
    "scale-x-115 w-10 h-16 relative flex items-center justify-center overflow-hidden";

  const markers =
    pageNumber === 0
      ? Array.from({ length: pagesLength - 1 }, (_, index) => {
          const { page, icon } = pages[index % pages.length];

          return (
            <div
              key={index}
              className={`${commonParentClsName} hover:cursor-pointer ${
                !isFocused &&
                pageNumber < currentPage &&
                index < currentPage - pageNumber - 2 &&
                "opacity-0"
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
      ? Array.from(
          { length: pageNumber === pagesLength ? pageNumber - 1 : pageNumber },
          (_, index) => {
            const { page, icon } = pages[index % pages.length];

            return (
              <div
                key={index}
                className={`${commonParentClsName} ${
                  !isFocused &&
                  pageNumber < currentPage &&
                  index < currentPage - pageNumber - 2 &&
                  "opacity-0"
                } ${
                  !isFocused && pageNumber > currentPage && index < pageNumber - 2 && "opacity-0"
                } ${currentPage === page ? "hover:cursor-auto" : "hover:cursor-pointer"}`}
                onClick={() => {
                  flipTo(page);
                }}
              >
                <img src={bookmark} alt="bookmark" className="z-0 absolute w-10 h-32" />
                <span className="z-10 mt-2">{icon}</span>
              </div>
            );
          }
        )
      : Array.from({ length: pagesLength - pageNumber }, (_, index) => {
          const { page, icon } = pages[(index + pageNumber - 1) % pages.length];
          return (
            <div
              key={index}
              className={`${commonParentClsName} ${
                !isFocused && index > pageNumber - 1 && currentPage > 0 ? "opacity-0" : ""
              } ${currentPage + 1 === page ? "hover:cursor-auto" : "hover:cursor-pointer"}`}
              onClick={() => {
                flipTo(page);
              }}
            >
              <img src={bookmark} alt="bookmark" className="z-0 absolute w-10 h-32" />
              <span className="z-10 mt-2">{icon}</span>
            </div>
          );
        });

  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    if (currentPage > 0 && currentPage < pagesLength) {
      setTimeout(() => {
        setShowBg(true);
      }, 750);
    } else {
      setShowBg(false);
    }
  }, [currentPage, pagesLength]);

  return (
    <div
      className={`h-16 px-4 flex gap-2 ${
        !isOdd(pageNumber) && "justify-end"
      } transition-all duration-[0ms] absolute top-4 w-[100%] ${showBg && "bg-[#b88457]"}`}
    >
      {markers}
    </div>
  );
};

export default PageMarkers;
