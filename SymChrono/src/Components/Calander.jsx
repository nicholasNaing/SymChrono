import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment, { duration } from "moment-timezone";
import Calendar from "react-calendar";
import { useCalander } from "../Contexts/GeoTimeProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AnimatePresence, calcLength, easeInOut, motion } from "framer-motion";
import { useSwitchSection } from "../Contexts/SwitchSection";
import { usePersonalData } from "../Contexts/DataContext";

const calanderVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    backdropFilter: "blur(2px)",
    transition: { duration: 0.7, delay: 0.2 },
  },
  closed: {
    y: 700,
    opacity: 0,
    transition: { duration: 0.3, easeInOut },
  },
};

function Calander() {
  const { currentTime } = useCalander();

  const { setSection } = useSwitchSection();

  const {
    getCheckedJournals,
    journalMonthList,
    setDiary,
    setFlashCards,
    setReflectData,
    setEmotionData,
    setDayRatingData,
    setSpendingData,
  } = usePersonalData();

  const getDateObject = (timeString) => {
    return timeString
      ? new Date(moment(timeString, "YYYY-MM-DD HH:mm").toISOString())
      : new Date();
  };

  const checkIfJournalExist = (list, key, value) => {
    return list.some((obj) => obj[key] === value);
  };

  const today = getDateObject(currentTime);

  const journalMonthListRef = useRef(journalMonthList); //using ref so that the ref gets renewed when the value is change

  const viewMonthRef = useRef(0); //using this so that the ref should be renewed when its in a new month

  const cleanAllJournalField = () => {
    setDiary({});
    setFlashCards([]);
    setReflectData({});
    setEmotionData("");
    setSpendingData("");
    setDayRatingData("");
  };

  const [viewMonthState, setviewMonthState] = useState(0);

  useEffect(() => {
    console.log(viewMonthRef.current, "What is thi");
    getCheckedJournals(viewMonthRef.current);

    setSection(0);
    cleanAllJournalField();
    console.log("This is the month", journalMonthList);
  }, [viewMonthRef.current, journalMonthListRef]);

  //? Here we use viewMonthRef to update the current month and fetch the values, used JournalMonthListRef to fetch the newly trieve data
  //!the reason we use Ref and useState here is as i had said below, using normal state would trigger the rerendering of the component and would result in loop
  //! but just using useRef would not trigger the re-render as it doenst change the state, so i used both to trigger it

  const tileContent = ({ date, view, activeStartDate }) => {
    //? active start date is the first date of every month which would give us the month we are in

    const viewMonth = activeStartDate.getMonth() + 1;

    if (viewMonth !== viewMonthRef.current) {
      setviewMonthState(viewMonth);
      viewMonthRef.current = viewMonth;
    }

    // viewMonthRef.current = viewMonth; //to update the viewMonth value from initial value 0

    //my stupid** was updating the viewMonth variable with normal mean instead of using state. React only detect changes through states
    //and this will trigger rerender the entire component. Thus i used useRef

    if (view === "month") {
      const sameMonthYear =
        date.getMonth() === today.getMonth() &&
        today.getFullYear() === activeStartDate.getFullYear();

      if (
        today.getDate() > date.getDate() && //this will get all the previous dates from the current date
        sameMonthYear //this will only get the dates in the current month is in (so no dates for the prev month nor coming month)
      ) {
        const journalExist = checkIfJournalExist(
          journalMonthList,
          "calander_date",
          date.getDate()
        );
        // console.log(journalExist, date.getMonth() + 1);
        return (
          <Link
            to={`/journal-log`}
            state={{ date }}
            className="w-[100%] p-3 flex flex-col justify-center items-center relative"
          >
            <div
              className={`${
                journalExist ? "bg-blue-300" : "bg-[#00000033]"
              } w-[100%] h-[40%] absolute rounded-[50%] flex justify-center items-center text-[#00000066] rotate-[-60deg] lg:rotate-[-15deg] pointer-events-none`}
            >
              passed
            </div>
            <motion.div
              whileHover={{
                scale: 2,
              }}
              transition={{ duration: 0.2 }}
              className="font-semibold"
            >
              {date.getDate()}
            </motion.div>
          </Link>
        );
      } else if (today.getDate() < date.getDate() && sameMonthYear) {
        return (
          <div className="w-[100%] p-3 ">
            <div className="font-semibold">{date.getDate()}</div>
          </div>
        );
      } else if (
        today.getMonth() > date.getMonth() ||
        today.getFullYear() > activeStartDate.getFullYear()
        //? this conditional statement is used to mark or decorate the dates of the previus months and years.
      ) {
        const journalExist = checkIfJournalExist(
          journalMonthList,
          "calander_date",
          date.getDate()
        );
        return (
          <Link
            to={`/journal-log`}
            state={{ date }}
            className="w-[100%] p-3 flex flex-col justify-center items-center relative"
          >
            <div
              className={`${
                journalExist ? "bg-blue-300" : "bg-[#00000033]"
              } w-[100%] h-[40%] absolute rounded-[50%] flex justify-center items-center text-[#00000066] rotate-[-60deg] lg:rotate-[-15deg] pointer-events-none`}
            >
              passed
            </div>
            <motion.div
              whileHover={{
                scale: 2,
              }}
              transition={{ duration: 0.2 }}
              className="font-semibold"
            >
              {date.getDate()}
            </motion.div>
          </Link>
        );
      }
      // console.log(moment.utc(date).format("D-MM-YYYY"));

      return (
        <Link to="/personal" state={{ date }} className="w-[100%] p-3 ">
          <motion.div
            whileHover={{
              scale: 2,
            }}
            transition={{ duration: 0.2 }}
            className="font-semibold"
          >
            {date.getDate()}
          </motion.div>
        </Link>
      );
    }
  };

  return (
    <motion.div
      variants={calanderVariants}
      initial="hidden"
      animate="visible"
      exit="closed"
    >
      <Calendar value={today} tileContent={tileContent} />
    </motion.div>
  );
}
export default Calander;
