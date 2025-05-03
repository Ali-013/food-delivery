import Button from "@/components/Button";
import Calender from "@/components/Calender";
import { fugaz } from "@/utils/appFonts";

export default function Hero() {
  return (
    <div className='py-4 sm:py-12 md-py-20 flex flex-col gap-4 sm:gap-8 items-center  '>
      <h1
        className={`w-full sm:max-w-[700px] md:max-w-[1200px] text-5xl sm:text-6xl md:text-7xl text-center ${fugaz.className}`}
      >
        <span className='textGradient'>Moodly</span> helps you track your{" "}
        <span className='textGradient'>daily </span>
        <span>mood!</span>
      </h1>
      <p className='text-lg sm:text-xl md:text-2xl text-center w-full mx-auto sm:max-w-[500px] '>
        Lets track those mood changes for{" "}
        <span className='font-semibold '>Every Day of Every Year</span>
      </p>
      <div className='grid grid-cols-2 gap-5'>
        <Button text='Login' dark={false} />
        <Button text='Sign Up' dark={true} />
      </div>
      <Calender />
    </div>
  );
}
