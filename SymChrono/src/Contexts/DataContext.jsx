import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useCalander } from "./GeoTimeProvider";

const PersonalDataContext = React.createContext();

export const PersonalDataProvider = ({ children }) => {
  const { currentTime } = useCalander();

  const [journalMonthList, setJournalMonthList] = useState([]);

  const [diary, setDiary] = useState({
    morning: "",
    afternoon: "",
    evening: "",
  });
  const [flashCards, setFlashCards] = useState([]);

  const [hasJournal, setHasJournal] = useState(false);

  const [reflectData, setReflectData] = useState({
    blue: "",
    green: "",
    orange: "",
    red: "",
    yellow: "",
  });

  const [emotionData, setEmotionData] = useState("");

  const [spendingData, setSpendingData] = useState();

  const [dayRatingData, setDayRatingData] = useState();

  const getAllData = async (authorId, dateRange) => {
    try {
      const [
        diaryDataFetching,
        flashcardDataFetching,
        selfanalysisDataFetching,
      ] = await Promise.all([
        axios(
          `http://127.0.0.1:8000/api/diary/${authorId}/${dateRange.startOfDayTz}/${dateRange.endOfDayTz}`
        ),
        axios(
          `http://127.0.0.1:8000/api/flashcard/${authorId}/${dateRange.startOfDayTz}/${dateRange.endOfDayTz}`
        ),
        axios(
          `http://127.0.0.1:8000/api/self-analysis/${authorId}/${dateRange.startOfDayTz}/${dateRange.endOfDayTz}`
        ),
      ]);

      //below are helper functions to make the data insertion easier and better readability
      const processDiaryData = (data) => ({
        morning: data.morning || "",
        afternoon: data.afternoon || "",
        evening: data.evening || "",
      });
      const processFlashcardData = (data) =>
        data.map((dataRow) => {
          return {
            subject: dataRow.subject,
            content: dataRow.content,
            cardId: dataRow.id,
            cardEditMode: false,
          };
        });
      setDiary(processDiaryData(diaryDataFetching.data));

      setFlashCards(processFlashcardData(flashcardDataFetching.data) || []);

      setReflectData(
        {
          blue: selfanalysisDataFetching.data.blue,
          green: selfanalysisDataFetching.data.green,
          orange: selfanalysisDataFetching.data.orange,
          red: selfanalysisDataFetching.data.red,
          yellow: selfanalysisDataFetching.data.yellow,
        } || {}
      );
      setDayRatingData(selfanalysisDataFetching.data.rating || "");
      setEmotionData(selfanalysisDataFetching.data.emotion || "");
      setSpendingData(selfanalysisDataFetching.data.expense || "");
    } catch (error) {
      console.log("error has occured", error);
    }
  };

  const getCheckedJournals = async (month) => {
    const getJournalData = await axios(
      `http://127.0.0.1:8000/api/finished-journal/${month}`
    ).then((res) => res.data);
    setJournalMonthList(getJournalData.data);
  };

  return (
    <PersonalDataContext.Provider
      value={{
        diary,
        setDiary,
        flashCards,
        setFlashCards,
        reflectData,
        setReflectData,
        emotionData,
        setEmotionData,
        dayRatingData,
        setDayRatingData,
        spendingData,
        setSpendingData,
        getAllData,

        getCheckedJournals,
        journalMonthList,
      }}
    >
      {children}
    </PersonalDataContext.Provider>
  );
};

export const usePersonalData = () => {
  return useContext(PersonalDataContext);
};
