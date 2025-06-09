import Logout from "@/components/Logout";
import { AuthProvider } from "@/context/AuthContext";
import { fugaz, openSans } from "@/utils/appFonts";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moodly",
  description: "Your personal mood tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header: React.ReactNode = (
    <header className='p-4 sm:p-8 flex items-center justify-between gap-4'>
      <Link href='/'>
        <h1
          className={`text-base sm:text-xl md:text-xl textGradient ${fugaz.className}`}
        >
          Moodly
        </h1>
      </Link>
      <div className='flex items-center justify-between'>
        <Logout />
      </div>
    </header>
  );
  const footer: React.ReactNode = (
    <footer className=' p-4 sm:p-8 grid place-items-center'>
      <p className={`text-indigo-400 ${fugaz.className}`}>Made with 💚</p>
    </footer>
  );
  return (
    <AuthProvider>
      <html lang='en'>
        <body
          className={`w-full w-max-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ${openSans.className}`}
        >
          {header}
          {children}
          {footer}
        </body>
      </html>
    </AuthProvider>
  );
}
