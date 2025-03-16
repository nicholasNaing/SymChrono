import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import Diary from "./Diary";
import FlashCards from "./FlashCards";
import { AnimatePresence, motion } from "framer-motion";
import SelfAnalysis from "./SelfAnalysis";
import { useSwitchSection } from "../Contexts/SwitchSection";
import { useLocation } from "react-router-dom";
import { usePersonalData } from "../Contexts/DataContext";
import moment from "moment-timezone";
// import { useCalander } from "../Contexts/GeoTimeProvider";

const slideDownInVariant = {
  hidden: { opacity: 0, y: "-100vh" },
  visible: {
    opacity: 1,
    y: 0,
  },

  closed: {},
};

function Canvas() {
  const { section } = useSwitchSection();

  const location = useLocation();

  // const { calanderDate, setCalanderDate } = useCalander();

  const { getAllData, currentDate } = usePersonalData();

  const { date } = location.state;

  console.log(date.getMonth() + 1);

  const startOfDayTz = moment
    .utc(date)
    .clone()
    .tz("Asia/Bangkok")
    .startOf("day")
    .utc()
    .format();

  const endOfDayTz = moment
    .utc(date)
    .clone()
    .tz("Asia/Bangkok")
    .endOf("day")
    .utc()
    .format();

  const dateRange = { startOfDayTz, endOfDayTz };

  useEffect(() => {
    // setCalanderDate(date);
    getAllData(1, dateRange);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      console.log("Back button pressed!", location.pathname);
      // Your logic for back navigation
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.pathname]);

  const renderSection = () => {
    switch (section) {
      case 0:
        return (
          <motion.div
            key="diary"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
            className="w-[100%] h-[100%] overflow-y-auto"
          >
            <Diary date={date} />
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            key="flashcards"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
            className="w-[100%] h-[100%] flex"
          >
            <FlashCards />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="selfanalysis"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
            className="w-[100%]  h-[100%] flex overflow-hidden"
          >
            <SelfAnalysis />
          </motion.div>
        );
      default:
        return null;
    }
  };
  return (
    <motion.div
      variants={slideDownInVariant}
      initial="hidden"
      animate="visible"
      exit="closed"
      className={`w-[95dvw] min-h-[95dvh] lg:w-[90dvw] lg:h-[90dvh] border border-white border-opacity-20 flex flex-col lg:flex-row items-center bg-white/10 backdrop-blur-sm backdrop-saturate-150 shadow-lg p-2 text-center`}
    >
      <Todo />
      <AnimatePresence mode="wait">{renderSection()}</AnimatePresence>
    </motion.div>
  );
}

export default Canvas;
