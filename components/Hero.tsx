import { fugaz } from "@/utils/appFonts";

export default function Hero() {
  return (
    <div className='py-10 sm:py-14 md-py-20'>
      <h1
        className={`text-5xl sm:text-6xl md:text-7xl text-center ${fugaz.className}`}
      >
        <span>Moodly</span> helps you track your <span>daily </span>
        <span>mood!</span>
      </h1>
    </div>
  );
}
