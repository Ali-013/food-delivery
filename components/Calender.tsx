"use client";
import type { MoodData } from "@/types";
import { baseRatings, gradients } from "@/utils";
import { fugaz } from "@/utils/appFonts";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
const monthsArr = Object.keys(months);
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface CalenderProps {
  demo?: boolean;
  completeData?: MoodData;
  selectedMonth?: string;
  setSelectedMonth?: (month: string) => void;
  selectedYear?: number;
  setSelectedYear?: (year: number) => void;
}

export default function Calender(props: CalenderProps) {
  const {
    demo = false,
    completeData = {},
    selectedMonth = monthsArr[new Date().getMonth()],
    setSelectedMonth = () => {},
    selectedYear = new Date().getFullYear(),
    setSelectedYear = () => {},
  } = props;

  const data =
    completeData?.[`${selectedYear}`]?.[
      Object.keys(months).indexOf(selectedMonth)
    ];
  console.log("data", data);
  console.log("selectedMonth", selectedMonth);
  // const year = 2025;
  // const month = "May";
  const monthNow = new Date(
    selectedYear,
    Object.keys(months).indexOf(selectedMonth),
    1
  );
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(
    selectedYear,
    Object.keys(months).indexOf(selectedMonth) + 1,
    0
  );
  const daysToShow = firstDayOfMonth + daysInMonth.getDate();
  const numRows = demo
    ? 5
    : Math.floor(daysToShow / 7) + (daysToShow % 7 > 0 ? 1 : 0);
  const numericMonth = Object.keys(months).indexOf(selectedMonth);
  interface HandleChangeMonthFn {
    (value: number): void;
  }

  const handleChangeMonth: HandleChangeMonthFn = (value) => {
    if (numericMonth + value < 0) {
      setSelectedYear(selectedYear - 1);
      setSelectedMonth(monthsArr[11]);
    } else if (numericMonth + value > 11) {
      setSelectedYear(selectedYear + 1);
      setSelectedMonth(monthsArr[0]);
    } else {
      setSelectedMonth(monthsArr[numericMonth + value]);
    }
  };
  return (
    <div className='flex flex-col gap-4'>
      {!demo && (
        <div className='grid grid-cols-3  justify-between'>
          <button
            onClick={() => handleChangeMonth(-1)}
            className='mr-auto hover:cursor-pointer'
          >
            <FontAwesomeIcon
              className='text-xl sm:text-3xl text-indigo-400 duration-200 hover:opacity-50'
              icon={faCircleChevronLeft}
            />
          </button>
          <p
            className={`text-center capitalize textGradient text-xl md:text-2xl whitespace-nowrap ${fugaz.className}`}
          >
            {selectedMonth + ", " + selectedYear}
          </p>
          <button
            onClick={() => handleChangeMonth(1)}
            className='ml-auto hover:cursor-pointer'
          >
            <FontAwesomeIcon
              className='text-xl sm:text-3xl text-indigo-400 duration-200 hover:opacity-50'
              icon={faCircleChevronRight}
            />
          </button>
        </div>
      )}
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
                  selectedYear,
                  Object.keys(months).indexOf(selectedMonth),
                  dayIndex
                );
                const today =
                  new Date().toDateString() === dateOfCell.toDateString();
                if (!dayDisplay) {
                  return <div className='bg-white' key={dayOfWeekIndex}></div>;
                }

                const color = demo
                  ? gradients.indigo[baseRatings[Number(dayIndex).toString()]]
                  : data?.[dayIndex.toString()]
                  ? gradients.indigo[data[dayIndex.toString()]]
                  : "white";
                return (
                  <div
                    style={{ background: color }}
                    key={dayOfWeekIndex}
                    className={`text-sx sm:text-sm border border-solid rounded-lg p-2 flex items-center gap-2 justify-between
                    ${
                      today && !demo
                        ? " border-indigo-500"
                        : "border-indigo-200"
                    }
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
    </div>
  );
}
