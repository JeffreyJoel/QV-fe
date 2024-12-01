"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { VoteIcon } from "lucide-react";
import ConnectButton from "./connect-button";

export const NavBar = (props: { isApp?: boolean }) => {
  const { isApp } = props;
  return (
    <>
      <header className="container mx-auto px-4 py-8 sm:w-11/12 md:w-10/12 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-[#00FF66] font-bold text-xl flex items-center">
            <VoteIcon className="w-8 h-8 mr-2" />
            Quorum
          </div>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
           <Link href="#" className="text-white text-lg hover:text-[#00FF66] transition-colors">
            About
          </Link>
          <Link href="#" className="text-white text-lg hover:text-[#00FF66] transition-colors">
             Discover
           </Link>
          {isApp ? (
            <>
        
            <ConnectButton />
            </>
          ) : (
            <Link href="/app">
              <Button className="bg-[#00FF66] p-5 text-gray-800 text-md rounded-2xl hover:bg-[#00FF66]/90">
                Launch App
              </Button>
            </Link>
          )}
        </nav>
      </header>
    </>
  );
};
