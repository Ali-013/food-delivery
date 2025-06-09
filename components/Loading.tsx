import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  return (
    <div className='flex flex-col flex-1 justify-center items-center'>
      <div className='w-16 h-16 flex items-center justify-center'>
        <FontAwesomeIcon
          icon={faSpinner}
          className='text-indigo-600 animate-spin w-full h-full'
          style={{ width: "64px", height: "64px" }}
        />
      </div>
    </div>
  );
}
