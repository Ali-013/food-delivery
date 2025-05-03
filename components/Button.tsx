import { fugaz } from "@/utils/appFonts";
type buttonProps = {
  dark: boolean;
  text: string;
  full?: boolean;
};
export default function Button(props: buttonProps) {
  return (
    <button
      className={` rounded-full overflow-hidden duration-300 hover:cursor-pointer border-2 border-solid border-indigo-600 ${
        props.dark
          ? "text-white bg-indigo-600 hover:bg-white hover:text-indigo-600"
          : "text-indigo-600 hover:bg-indigo-600 hover:text-white"
      } ${props.full ? "grid place-items-center w-full" : ""}`}
    >
      <p
        className={`px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ${fugaz.className}`}
      >
        {props.text}
      </p>
    </button>
  );
}
