import Calender from "@/components/Calender";
import { fugaz } from "@/utils/appFonts";

export default function Dashboard() {
  const infoObject = {
    num_days: 14,
    time_remaining: "10:12:13",
    date: new Date().toLocaleDateString("en-US", { dateStyle: "full" }),
  };
  const moods = {
    "$&*@!": "😡",
    Sad: "😢",
    Existing: "😐",
    Good: "😃",
    Delighted: "😄",
  };
  return (
    <>
      <div className='flex flex-col flex-1 gap-6 sm:gap-10 md:gap-16 items-center'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 text-center place-items-center bg-indigo-100 w-full rounded-2xl py-4 sm:py-6'>
          {Object.keys(infoObject).map((info, index) => {
            return (
              <div
                className={`grid grid-cols-1 gap-0 sm:gap-4 text-indigo-500 overflow-hidden ${
                  index === 1
                    ? "border-b-2 border-t-2 py-2 w-[200px] border-indigo-300 sm:border-b-0 sm:border-t-0"
                    : ""
                }`}
                key={index}
              >
                <div className='font-medium text-xs sm:text-sm '>
                  {info.replace("_", " ").toUpperCase()}
                </div>
                <div className={`text-base sm:text-lg ${fugaz.className}`}>
                  {infoObject[info as keyof typeof infoObject]}
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
        <div className='flex flex-row items-stretch flex-wrap gap-4  w-full place-items-center justify-center '>
          {Object.keys(moods).map((mood, index) => {
            return (
              <button
                key={index}
                className={` p-4 grid grid-col gap-4 rounded-2xl hover:cursor-pointer hover:border-0 bg-indigo-50 buttonShade hover:bg-indigo-100  w-full flex-1`}
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
        <div className=' w-full md:w-2xl rounded-2xl py-4 sm:py-6'>
          <Calender />
        </div>
      </div>
    </>
  );
}
