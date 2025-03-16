import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useSwitchSection } from "../Contexts/SwitchSection";
import { usePersonalData } from "../Contexts/DataContext";
import { useNavigate } from "react-router-dom";
import FlashCards from "./FlashCards";
import axios from "axios";
import SelfAnalysis from "./SelfAnalysis";
import { useLocation } from "react-router-dom";
import moment from "moment-timezone";

function JournalLog() {
  const navigate = useNavigate();
  const {
    diary,
    flashCards,
    reflectData,
    emotionData,
    dayRatingData,
    spendingData,
    getAllData,
  } = usePersonalData();

  const location = useLocation();

  const { date } = location.state;

  console.log(date);

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

  console.log(dateRange);

  useEffect(() => {
    getAllData(1, dateRange);
  }, [diary.morning]);

  const { section, setSection } = useSwitchSection();
  const [toggle, setToggle] = useState(true);

  const [rating, setRating] = useState();

  const starVariant = {
    hidden: {
      y: -700,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
    closed: {
      y: 700,
      opacity: 0,
    },
  };

  return (
    <div>
      <motion.div
        // onHoverStart={() => {
        //   console.log("hi");
        // }}
        whileHover={{ scale: 1.3 }}
        className={`text-white`}
      >
        Hover me
      </motion.div>
      <div className="text-white">This is {diary.morning}</div>
    </div>
  );
}

export default JournalLog;
