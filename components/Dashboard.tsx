"use client";
import Calender from "@/components/Calender";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import type { MoodData } from "@/types";
import { fugaz } from "@/utils/appFonts";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const moods = {
  "$&*@!": "😡",
  Sad: "😢",
  Existing: "😐",
  Good: "😃",
  Delighted: "😄",
};

const months = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

function getTimeRemaining() {
  const now = new Date();
  const hoursLeft = 23 - now.getHours();
  const minutesLeft = 59 - now.getMinutes();
  return `${hoursLeft}H ${minutesLeft}M`;
}

export default function Dashboard() {
  const { user, userData, setUserData, loading } = useAuth();
  const [data, setData] = useState<MoodData | null>(null);
  const now = new Date();
  const currentMonth = now.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(
    Object.keys(months)[currentMonth]
  );

  console.log("selectedMonth", selectedMonth, "current month", currentMonth);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());
  const [isUpdating, setIsUpdating] = useState(false); // Add loading state

  // Fixed getGlobalStreak function
  function getGlobalStreak(data: MoodData): number {
    if (!data) return 0;

    let streak = 0;
    const today = new Date();
    const currentDate = new Date(today); // Create a copy to avoid mutating original

    // First, check if today has an entry
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();
    const hasTodayEntry =
      data?.[todayYear]?.[todayMonth]?.[todayDay] !== undefined;

    if (hasTodayEntry) {
      streak = 1; // Start with today's entry
    } else {
      // If no entry today, start checking from yesterday
      currentDate.setDate(currentDate.getDate() - 1);
    }

    // Continue checking previous days
    while (true) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const day = currentDate.getDate();

      const hasEntry = data?.[year]?.[month]?.[day] !== undefined;

      if (hasEntry) {
        // Only increment if we haven't already counted today
        if (!(year === todayYear && month === todayMonth && day === todayDay)) {
          streak++;
        }
        // Move to previous day
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }

      // Safety check: don't go back more than 365 days
      if (streak > 365) {
        break;
      }
    }

    return streak;
  }

  function averageMood() {
    if (!data) return 0;
    const yearData = data[selectedYear];
    if (!yearData) return 0;
    const monthData = yearData[Object.keys(months).indexOf(selectedMonth)];
    if (!monthData) return 0;

    const totalMood = Object.values(monthData).reduce((acc, mood) => {
      return acc + (mood || 0);
    }, 0);
    const numDays = Object.keys(monthData).length;

    return numDays > 0 ? (totalMood / numDays).toFixed(1) : 0;
  }

  async function handleUpdateMood(mood: number) {
    if (isUpdating) return; // Prevent multiple simultaneous updates

    setIsUpdating(true);

    try {
      const year = now.getFullYear();
      const month = now.getMonth();
      const day = now.getDate();

      // Create new data object
      const newData = { ...userData };
      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }
      newData[year][month][day] = mood;

      // Update local state first
      setData(newData);
      setUserData(newData);

      console.log("Updating mood:", newData);

      // Update Firebase
      if (user) {
        const docRef = doc(db, "users", user.uid);
        console.log("Updating mood for user:", docRef);
        await setDoc(
          docRef,
          {
            [year]: {
              [month]: {
                [day]: mood,
              },
            },
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.error("Error updating mood:", error);
      // Optionally revert the local state on error
      setData(userData);
    } finally {
      setIsUpdating(false);
    }
  }

  // Memoize infoObject to prevent unnecessary recalculations
  const infoObject = [
    {
      label: "Overall streak",
      value: `${getGlobalStreak(data || {})} 🔥`,
    },
    {
      label: `No. of entries (${selectedMonth})`,
      value: Object.keys(
        data?.[selectedYear]?.[Object.keys(months).indexOf(selectedMonth)] || {}
      ).length,
    },
    {
      label: `Average mood (${selectedMonth})`,
      value: averageMood(),
    },
    {
      label: "Time remaining",
      value: timeRemaining,
    },
  ];

  useEffect(() => {
    if (!user && !userData) return;
    setData(userData);
  }, [user, userData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (user === null) {
    return <Login />;
  }

  return (
    <>
      <div className='flex flex-col flex-1 gap-6 sm:gap-10 md:gap-16 items-center'>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 text-center place-items-center bg-indigo-100 w-full rounded-2xl py-4 sm:py-6'>
          {infoObject.map((info, index) => {
            return (
              <div
                className={`grid grid-cols-1 gap-0 sm:gap-4 text-indigo-500 overflow-hidden ${
                  index === 12
                    ? "border-b-2 border-t-2 py-2 w-[200px] border-indigo-300 sm:border-b-0 sm:border-t-0"
                    : ""
                }`}
                key={index}
              >
                <div className='font-medium text-xs sm:text-sm capitalize'>
                  {info.label}
                </div>
                <div className={`text-base sm:text-lg ${fugaz.className}`}>
                  {info.value}
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <p
            className={`text-5xl sm:text:6xl md:text-7xl text-center ${fugaz.className}`}
          >
            How do you <span className={` textGradient`}>feel </span>today?
          </p>
        </div>
        <div className='flex flex-row items-stretch flex-wrap gap-4 w-full place-items-center justify-center'>
          {Object.keys(moods).map((mood, index) => {
            return (
              <button
                onClick={() => {
                  const moodValue = index + 1;
                  handleUpdateMood(moodValue);
                }}
                key={index}
                disabled={
                  isUpdating ||
                  now.getFullYear() != selectedYear ||
                  now.getMonth() != Object.keys(months).indexOf(selectedMonth)
                } // Disable buttons while updating
                className={`p-4 grid grid-col gap-4 rounded-2xl  bg-indigo-50 buttonShade w-full flex-1 ${
                  isUpdating ||
                  now.getFullYear() != selectedYear ||
                  now.getMonth() != Object.keys(months).indexOf(selectedMonth)
                    ? "opacity-50 cursor-not-allowed"
                    : " hover:bg-indigo-100 hover:border-0 hover:cursor-pointer "
                }`}
              >
                <p className='text-4xl sm:text-5xl md:text-6xl'>
                  {moods[mood as keyof typeof moods]}
                </p>
                <p
                  className={`text-indigo-600 text-xs sm:text-sm ${fugaz.className}`}
                >
                  {mood}
                </p>
              </button>
            );
          })}
        </div>
        <div className='w-full md:w-2xl rounded-2xl py-4 sm:py-6'>
          <Calender
            completeData={data ?? undefined}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </div>
      </div>
    </>
  );
}
