"use client";
import { baseRatings, gradients } from "@/utils";
import { useEffect } from "react";

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
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const data: Record<string, number> = {
  "15": 3,
  "16": 1,
  "17": 5,
  "18": 2,
  "19": 4,
  "20": 1,
  "21": 5,
  "22": 3,
  "23": 2,
  "24": 4,
  "25": 1,
  "26": 5,
  "27": 2,
};

export default function Calender(props) {
  const { demo } = props;
  const year = 2025;
  const month = "May";
  const monthNow = new Date(year, Object.keys(months).indexOf(month), 1);
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(year, Object.keys(months).indexOf(month) + 1, 0);
  const daysToShow = firstDayOfMonth + daysInMonth.getDate();
  const numRows = Math.floor(daysToShow / 7) + (daysToShow % 7 > 0 ? 1 : 0);

  useEffect(() => {
    console.log("firstDayOfMonth", firstDayOfMonth);
    console.log("daysInMonth", daysToShow, numRows);
  }, []);

  return (
    <div className='flex flex-col gap-1 py-2 sm:py-4 md:py-6'>
      {[...Array(numRows).keys()].map((row, rowIndex) => {
        return (
          <div key={rowIndex} className='grid grid-cols-7 gap-1'>
            {daysOfWeek.map((dayOfWeek, dayOfWeekIndex) => {
              const dayIndex: number =
                rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);
              const dayDisplay =
                dayIndex > daysInMonth.getDate()
                  ? false
                  : row === 0 && dayOfWeekIndex < firstDayOfMonth
                  ? false
                  : true;
              const dateOfCell = new Date(
                year,
                Object.keys(months).indexOf(month),
                dayIndex
              );
              const today =
                new Date().toDateString() === dateOfCell.toDateString();
              if (!dayDisplay) {
                return <div className='bg-white' key={dayOfWeekIndex}></div>;
              }

              const color = demo
                ? gradients.indigo[baseRatings[Number(dayIndex).toString()]]
                : dayIndex in data
                ? gradients.indigo[data[dayIndex.toString()]]
                : "white";
              return (
                <div
                  style={{ background: color }}
                  key={dayOfWeekIndex}
                  className={`text-sx sm:text-sm border border-solid rounded-lg p-2 flex items-center gap-2 justify-between
                    ${today ? " border-indig-400" : "border-indigo-100"}
                    ${color === "white" ? "text-indigo-400" : "text-white"}`}
                >
                  <p>{dayIndex}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
