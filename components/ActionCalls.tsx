"use client";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function ActionCalls() {
  const { user } = useAuth();
  if (user) {
    return (
      <div className=''>
        <Link href='/dashboard'>
          <Button text='Continue to Dashboard' dark={false} />
        </Link>
      </div>
    );
  }
  return (
    <div>
      <div className='grid grid-cols-2 gap-5'>
        <Link href='/dashboard'>
          <Button text='Login' dark={false} />
        </Link>
        <Link href='/dashboard'>
          <Button text='Sign Up' dark={true} />
        </Link>
      </div>
    </div>
  );
}
