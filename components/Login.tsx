import Button from "@/components/Button";
import { fugaz } from "@/utils/appFonts";

export default function Login() {
  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={`text-xl sm-text-5xl md-text-6xl ${fugaz.className}`}>
        Log In / Register
      </h3>
      <p>You&#39;re one step away!!! </p>
      <input
        className='max-w-[400px] w-full mx-auto px-4 py-2 sm:py-3  hover:border-indigo-600 focus:border-indigo-600 border rounded-full outline-none border-solid border-indigo-400'
        placeholder='Email'
        type='email'
      />
      <input
        className='max-w-[400px] w-full mx-auto px-4 py-2 sm:py-3 hover:border-indigo-600 focus:border-indigo-600 border rounded-full outline-none border-solid border-indigo-400'
        placeholder='password'
        type='password'
      />
      <div className='max-w-[400px] w-full mx-auto'>
        <Button text='submit' full dark={false} />
      </div>
      <p className='text-center'>
        Don&#39;t have an account?{" "}
        <span className='text-indigo-600'>Sign Up</span>
      </p>
    </div>
  );
}
