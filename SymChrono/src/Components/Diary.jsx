import React, { useEffect, useState } from "react";
import { TextareaAutosize } from "@mui/base";
import { useCalander } from "../Contexts/GeoTimeProvider";
import { usePersonalData } from "../Contexts/DataContext";
import { useSwitchSection } from "../Contexts/SwitchSection";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const slideDownInVariant = {
  hidden: { opacity: 0, y: "-100vh" },
  visible: {
    opacity: 1,
    y: 0,
  },

  closed: {},
};

function Diary(props) {
  const { section, setSection } = useSwitchSection();
  const { diary, setDiary } = usePersonalData();

  const location = useLocation();

  const calanderDate = props.date;
  const { specificDate } = useCalander();

  const handleSubmit = (e) => {
    e.preventDefault();

    setSection(section + 1);
  };

  //useEffect below is to warn for the unsaved data
  //here, we dont need to warn for the previous date for now. So if its today and there is data in the textField, beforeunload will works
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     if (location.pathname === "/personal") {
  //       const message =
  //         "Are you sure you want to leave this page There are unsaved data?";
  //       event.returnValue = message; // Required for most browsers
  //       return message;
  //     }
  //   };
  //   console.log(calanderDate.getDate(), specificDate.date);
  //   if (
  //     calanderDate.getDate() === parseInt(specificDate.date) &&
  //     Object.values(diaryEntries).length > 0
  //   ) {
  //     console.log
  // ][(Object.values(diaryEntries).length);
  //     window.addEventListener("beforeunload", handleBeforeUnload);
  //   }
  //   return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  // }, [location.pathname, specificDate]);

  return (
    <div
      className={`w-[100%] landscape:h-[100%] flex-grow flex flex-col justify-evenly items-center overflow-y-auto landscape:pl-2`}
    >
      <div
        className={`w-[100%] h-[10%] max-h-[20%] border-slate-100 border-opacity-15 border-2 flex justify-center items-center bg-[#ffffff00] text-lg lg:text-2xl tracking-wider font-bold font-patrick`}
      >
        Your Journal For
        <span className={`ml-3 underline text-shadow-custom `}>
          {calanderDate.getDate()} {calanderDate.getMonth() + 1}{" "}
          {calanderDate.getFullYear()}
        </span>
      </div>
      <form
        onSubmit={handleSubmit}
        className={`w-[100%] flex flex-col items-center justify-start gap-3`}
      >
        <motion.div
          className={`w-[100%]`}
          variants={slideDownInVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3, type: "spring", bounce: 0.4 }}
        >
          <TextareaAutosize
            value={diary.morning}
            onChange={(e) => setDiary({ ...diary, morning: e.target.value })}
            minRows={3} // Start with a minimum of 3 visible lines
            maxRows={5} // Limit to 3 visible lines (will not grow beyond this)
            maxLength={150} // Limit to 150 characters
            placeholder="Write your diary entry of your morning..."
            className={`w-[100%] resize-none p-[10px] bg-[#00000033] text-slate-50 focus:bg-slate-100 focus:text-slate-900 focus:placeholder:text-slate-400 placeholder:text-slate-400 outline-none font-patrick text-lg tracking-wider shadow-top-right-inset shadow-slate-200 rounded-tr-xl`}
          ></TextareaAutosize>
        </motion.div>
        <motion.div
          className={`w-[100%]`}
          variants={slideDownInVariant}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 0.2,
            type: "spring",
            bounce: 0.4,
          }}
        >
          <TextareaAutosize
            value={diary.afternoon}
            onChange={(e) => setDiary({ ...diary, afternoon: e.target.value })}
            minRows={3} // Start with a minimum of 3 visible lines
            maxRows={5} // Limit to 3 visible lines (will not grow beyond this)
            maxLength={150} // Limit to 150 characters
            placeholder="Write your diary entry of your afternoon..."
            className={`w-[100%] resize-none p-[10px] bg-[#00000033] text-slate-50 focus:bg-slate-100 focus:text-slate-900 focus:placeholder:text-slate-400 placeholder:text-slate-400 outline-none font-patrick text-lg tracking-wider`}
          ></TextareaAutosize>
        </motion.div>
        <motion.div
          className={`w-[100%]`}
          variants={slideDownInVariant}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 0.1,
            type: "spring",
            bounce: 0.4,
          }}
        >
          <TextareaAutosize
            value={diary.evening}
            onChange={(e) => setDiary({ ...diary, evening: e.target.value })}
            minRows={3} // Start with a minimum of 3 visible lines
            maxRows={5} // Limit to 3 visible lines (will not grow beyond this)
            maxLength={300} // Limit to 150 characters
            placeholder="Write your diary entry of your evening..."
            className={`w-[100%] resize-none p-[10px] bg-[#00000033] text-slate-50 focus:bg-slate-100 focus:text-slate-900 focus:placeholder:text-slate-400 placeholder:text-slate-400 outline-none font-patrick text-lg tracking-wider shadow-bottom-left-inset shadow-slate-200 rounded-bl-xl`}
          ></TextareaAutosize>
        </motion.div>
        <button
          type="submit"
          className={`border-2 border-slate-100 border-opacity-50 px-2 text-slate-50 bg-[#ffffff66]`}
        >
          save
        </button>
      </form>
    </div>
  );
}

export default Diary;
