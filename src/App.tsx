import React from "react";
import { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import cover from "./cover.jpg";
import closingCover from "./closing-cover.jpg";
import limpid from "./limpid.png";
import PageMarkers from "./components/page-markers/PageMarkers";
import ArrowNavigation from "./components/arrow-navigation/ArrowNavigation";
import { FiMail, FiGithub, FiLinkedin, FiBook } from "react-icons/fi";
import SkillBar from "./components/skill-bar/SkillBar";
import paper from "./rough-textured-wall.jpg";

type PageFlipBook = {
  pageFlip: () => {
    getCurrentPageIndex: () => number;
    flipNext: (corner: string) => void;
    flipPrev: (corner: string) => void;
    flip: (page: number, corner: string) => void;
    turnToPage: (page: number) => void;
    turnToPrevPage: () => void;
    turnToNextPage: () => void;
  };
};

const pagesLength = 5;

const App = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const portraitMode = windowSize.width < 860;
  const animationPadding = windowSize.width * 0.35;

  const bookRef = useRef<PageFlipBook | null>(null);

  const [bookRightPadding, setBookRightPadding] = useState(animationPadding);
  const [bookLeftPadding, setBookLeftPadding] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const pageClassname =
    "bg-center bg-cover pb-[5%] h-[100%] border-2 border-solid border-black text-lg px-[5%] justify-center z-10 h-[100%] overflow-y-auto my-scrollbar";
  const titleClassname =
    "text-center font-bold h-[5%] flex justify-center items-center text-2xl text-red-800 underline font-morris mt-[5%]";
  const paragraphClassname =
    "text-center mt-[2.5%] text-wrap text-xl justify-center flex flex-col items-center relative";
  const listParagraphClassname = "text-left mt-[2.5%] text-wrap text-xl";
  const contactParClassname = "ml-2 text-left text-xl truncate max-w-[90%]";
  const experienceSubtitleClassname = "text-center text-wrap text-xl";

  const skills = [
    { name: "JavaScript", value: 4 },
    { name: "TypeScript", value: 3 },
    { name: "React", value: 4 },
    { name: "React Native", value: 4 },
    { name: "Firebase", value: 4 },
    { name: "REST APIs", value: 4 },
    { name: "Node.js", value: 3 },
    { name: ".NET", value: 3 },
    { name: "C#", value: 3 },
    { name: "Git", value: 4 },
    { name: "Docker", value: 2 },
    { name: "Problem Solving", value: 4 },
    { name: "Adaptability", value: 4 },
    { name: "Team Player", value: 4 },
    { name: "Communication", value: 4 },
    { name: "Time Management", value: 4 },
    { name: "Greek (Native)", value: 5 },
    { name: "English (B2)", value: 3 },
  ];

  const onInit = () => {
    if (currentPage === 0) {
      setTimeout(() => {
        setBookRightPadding(0);
        if (!portraitMode) {
          bookRef?.current?.pageFlip()?.flip(1, "bottom");
        }
      }, 1250);
    }
  };

  const onFlip = () => {
    const index = bookRef?.current?.pageFlip()?.getCurrentPageIndex();
    if (index === 0) {
      setBookRightPadding(animationPadding);
      setBookLeftPadding(0);
    } else if (index === pagesLength) {
      setBookRightPadding(0);
      setBookLeftPadding(animationPadding);
    } else {
      setBookRightPadding(0);
      setBookLeftPadding(0);
    }

    if (index !== undefined) {
      setCurrentPage(index);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth > 360 ? window.innerWidth : 360,
          height: window.innerHeight > 360 ? window.innerHeight : 360,
        });
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="relative w-svh h-svh flex justify-center items-center overflow-auto min-h-[400px] min-w-[360px] rounded-none bg-[radial-gradient(circle,_#b88457_80%,_#c99568_90%,_black_100%)]">
      <div
        className="absolute z-10 overflow-hidden w-56 justify-center flex"
        style={{
          bottom: (windowSize.height - windowSize.height * 0.8) / 2 + (portraitMode ? -30 : -40),
        }}
      >
        <ArrowNavigation
          pagesLength={pagesLength}
          currentPage={currentPage}
          turnToPrev={() => bookRef.current?.pageFlip().turnToPrevPage()}
          turnToNext={() => bookRef.current?.pageFlip().turnToNextPage()}
          flipToPrev={() => bookRef.current?.pageFlip().flipPrev("bottom")}
          flipToNext={() => bookRef.current?.pageFlip().flipNext("bottom")}
          portraitMode={portraitMode}
        />
      </div>

      <div
        className={`flex justify-center items-center pb-24 ${
          !portraitMode && "transition-[padding] duration-[1000ms]"
        }  overflow-hidden relative h-[100%]`}
        style={{
          paddingRight: portraitMode ? 0 : bookRightPadding,
          paddingLeft: portraitMode ? 0 : bookLeftPadding,
        }}
      >
        <HTMLFlipBook
          key={windowSize.width + windowSize.height}
          style={{}}
          startPage={currentPage}
          size="fixed"
          width={portraitMode ? windowSize.width * 0.85 : windowSize.width * 0.35}
          height={windowSize.height * 0.85}
          minWidth={0}
          maxWidth={0}
          minHeight={0}
          maxHeight={0}
          drawShadow={false}
          flippingTime={1000}
          usePortrait={portraitMode}
          startZIndex={1}
          autoSize={false}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={false}
          clickEventForward={false}
          useMouseEvents={false}
          swipeDistance={30}
          showPageCorners={false}
          disableFlipByClick={true}
          ref={bookRef}
          onInit={onInit}
          onFlip={onFlip}
          className=""
        >
          <div className="pt-20 ">
            <img
              src={cover}
              alt="cover"
              className="h-[100%] w-[100%] border-solid border-black border-2"
            />
          </div>

          <div className="pt-20">
            {portraitMode ? null : (
              <PageMarkers
                pagesLength={pagesLength}
                pageNumber={1}
                isFocused={currentPage === 1}
                currentPage={currentPage}
                flipTo={(page) => bookRef.current?.pageFlip()?.flip(page, "bottom")}
              />
            )}

            <div className={pageClassname} style={{ backgroundImage: `url(${paper})` }}>
              <p className={titleClassname}>About me</p>
              <p className={paragraphClassname}>
                I’m Christos Kapouranis, a software developer from Greece with a background in
                Automation Engineering and a passion for building user focused applications. I
                specialize in React and React Native with experience across the full development
                lifecycle, from designing intuitive interfaces to deploying scalable solutions. My
                projects range from smart home applications to mobile apps like my personal project
                Limpid, a hydration tracker available on the Play Store. I enjoy exploring new
                technologies, solving real world problems through code and continuously expanding my
                skills in modern software development.
              </p>

              <p className={titleClassname}>Contact & Links</p>
              <div className="flex flex-row items-center mt-2">
                <FiMail size={25} />
                <p className={contactParClassname}>xristos.kapoura@gmail.com</p>
              </div>
              <div className="flex flex-row items-center mt-2">
                <FiLinkedin size={25} />
                <p
                  className={`${contactParClassname} hover:cursor-pointer hover:underline`}
                  onClick={() => {
                    window.open(
                      "https://www.linkedin.com/in/christos-kapouranis-6a07b528a",
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                >
                  https://www.linkedin.com/in/christos-kapouranis-6a07b528a
                </p>
              </div>
              <div className="flex flex-row items-center mt-2">
                <FiGithub size={25} />
                <p
                  className={`${contactParClassname} hover:cursor-pointer hover:underline`}
                  onClick={() => {
                    window.open(
                      "https://github.com/Chrkapouranis",
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                >
                  https://github.com/Chrkapouranis
                </p>
              </div>

              <div className="flex flex-row items-center mt-2">
                <img src={limpid} alt="limpid" className="h-[25px] w-[25px]" />
                <p
                  className={`${contactParClassname} hover:cursor-pointer hover:underline`}
                  onClick={() => {
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.kapplications.waterreminder&hl=en",
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                >
                  Limpid: Water Reminder
                </p>
              </div>

              <div className="flex flex-row items-center mt-2">
                <FiBook size={25} />
                <p
                  className={`${contactParClassname} hover:cursor-pointer hover:underline`}
                  onClick={() => {
                    window.open(
                      "https://dev.to/christos_kapouranis/i-built-my-first-app-water-reminder-with-react-native-heres-my-journey-2l7g",
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                >
                  Article about Limpid - Dev.to
                </p>
              </div>
            </div>
          </div>

          <div className="pt-20">
            {portraitMode ? null : (
              <PageMarkers
                pagesLength={pagesLength}
                pageNumber={2}
                isFocused={currentPage + 1 === 2}
                currentPage={currentPage}
                flipTo={(page) => bookRef.current?.pageFlip().flip(page, "bottom")}
              />
            )}

            <div className={pageClassname} style={{ backgroundImage: `url(${paper})` }}>
              <p className={titleClassname}>Experience</p>
              <p className={`${paragraphClassname} font-semibold`}>Freelance | 2023 - Today</p>
              <p className={`${experienceSubtitleClassname}`}>
                Personal Project | Limpid: Water Reminder | Play Store
              </p>
              <ul className={listParagraphClassname}>
                <li>
                  · Developed a cross-platform hydration tracking app with personalized reminders
                  and progress charts.
                </li>
                <li>
                  · Led the full development lifecycle, gaining practical experience in programming
                  and project management.
                </li>
                <li>
                  · Utilized React, React Native, Firebase, and AdMob to build and deploy the
                  application efficiently.
                </li>
              </ul>

              <p className={`${paragraphClassname} font-semibold`}>
                Front End Developer | 2023-2025
              </p>
              <p className={`${experienceSubtitleClassname}`}>Olympia Electronics, Aiginio</p>
              <ul className={listParagraphClassname}>
                <li>
                  · Contributed across the full software development lifecycle for both public and
                  internal applications.
                </li>
                <li>
                  · Designed and developed an internal HR dashboard and API using React and .NET
                  Entity Framework, enabling the HR team to manage candidate profiles, create and
                  evaluate technical/knowledge tests and administer Myers–Briggs personality
                  assessments.
                </li>
                <li>
                  · Modernized a legacy Python Django application by upgrading it across multiple
                  major versions, then rebuilt it as a modern internal dashboard in React to manage
                  global firmware updates for company devices. Deployed the system using Docker and
                  Nginx on a virtual machine.
                </li>
                <li>
                  · Worked extensively on a smart home mobile application, developing features
                  across the full stack using React Native, backend APIs, databases and a custom
                  MQTT server for real-time device communication. Managed containerization,
                  deployment, testing, QA workflows and Firebase integration.
                </li>
                <li>
                  · Built an internal automation system with a lightweight UI in vanilla JavaScript,
                  significantly speeding up production and operational workflows for multiple
                  departments.
                </li>
                <li>
                  · Utilized and explored a broad technology stack including React, React Native,
                  .NET Entity Framework, Node.js, Django, Docker, MariaDB, MongoDB, PostgreSQL,
                  Redis and API deployment practices.
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-20">
            {portraitMode ? null : (
              <PageMarkers
                pagesLength={pagesLength}
                pageNumber={3}
                isFocused={currentPage === 3}
                currentPage={currentPage}
                flipTo={(page) => bookRef.current?.pageFlip().flip(page, "bottom")}
              />
            )}

            <div className={pageClassname} style={{ backgroundImage: `url(${paper})` }}>
              <p className={titleClassname}>Education</p>
              <p className={`${paragraphClassname} font-semibold`}>
                IHU Automation Department Thessaloniki
              </p>
              <p className={`${experienceSubtitleClassname}`}>Bachelor in Automation Engineering</p>
              <ul className={listParagraphClassname}>
                <li>· Specialized in automation systems, robotics, and software development.</li>
                <li>
                  · Strong background in programming and algorithm design (C++/C
                  <span className="font-serif">#</span>).
                </li>
                <li>
                  · Hands-on experience with industrial automation tools like PLC programming and
                  SCADA systems.
                </li>
                <li>
                  · Solid understanding of D/A electronics, microcontrollers and embedded systems.
                </li>
              </ul>

              <p className={`${paragraphClassname} font-semibold`}>Online Courses & Books</p>
              <ul className={listParagraphClassname}>
                <li>· The Complete React Native + Hooks Course - Udemy</li>
                <li>· React – The Complete Guide 2023 (incl. React Router & Redux) – Udemy</li>
                <li>
                  · Learn to Code by Making Games - Complete C<span className="font-serif">#</span>{" "}
                  Unity Developer - Udemy
                </li>
                <li>· Introduction to 3D Animation with Autodesk Maya - Udemy</li>
                <li>· C++ Tutorial for Complete Beginners – Udemy</li>
                <li>· The Arduino Starter’s Kit Project Book</li>
              </ul>
            </div>
          </div>

          <div className="pt-20">
            {portraitMode ? null : (
              <PageMarkers
                pagesLength={pagesLength}
                pageNumber={4}
                isFocused={currentPage + 1 === 4}
                currentPage={currentPage}
                flipTo={(page) => bookRef.current?.pageFlip().flip(page, "bottom")}
              />
            )}

            <div className={pageClassname} style={{ backgroundImage: `url(${paper})` }}>
              <p className={titleClassname}>Skills</p>
              <div className={paragraphClassname}>
                {skills.map((_, index) => {
                  return (
                    <React.Fragment key={index}>
                      <SkillBar
                        portraitMode={portraitMode}
                        skillNumber={skills[index].value}
                        title={skills[index].name}
                        currentPage={currentPage}
                      />
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-20 ">
            <img
              src={closingCover}
              alt="cover"
              className="h-[100%] w-[100%] border-solid border-black border-2"
            />
          </div>
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default App;
