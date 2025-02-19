"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { VoteIcon } from "lucide-react";
import ConnectButton from "./connect-button";
import CreateModal from "../create";

export const NavBar = (props: { isApp?: boolean }) => {
  const { isApp } = props;
  return (
    <>
      <header className=" mx-auto px-4 py-8 w-full lg:w-11/12 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-[#00FF66] font-bold text-xl flex items-center">
            <VoteIcon className="w-8 h-8 mr-2" />
            Quorum
          </div>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          {/* <Link
            href="#"
            className="text-white text-lg hover:text-[#00FF66] transition-colors"
          >
            About
          </Link> */}
          <Link
            href="/discover"
            className="text-white text-lg hover:text-[#00FF66] transition-colors"
          >
            Discover
          </Link>
          {/* <CreateModal /> */}
   
        <div>
          {isApp ? (
            <>
              <ConnectButton />
            </>
          ) : (
            <Link href="/app">
              <Button className="bg-[#00FF66] p-5 text-gray-800 text-md rounded-full hover:bg-[#00FF66]/90">
                Launch App
              </Button>
            </Link>
          )}
        </div>
        </nav>
      </header>
    </>
  );
};
