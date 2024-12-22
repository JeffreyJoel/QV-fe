"use client";

import SessionCard from "@/components/session-card";
import { NavBar } from "@/components/shared/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Discover() {
  return (
    <>
      <NavBar isApp={true} />
      <div>
        <div className="mx-auto md:max-w-7xl mt-16">
          <h1 className="text-center text-4xl font-bold text-[#00FF66]">
            Voting Sessions
          </h1>
          <p className="text-center text-gray-400 mt-6 text-xl">
            Empowering smarter decisions through the power of quadratic voting
          </p>

          <Tabs defaultValue="rooms" className="w-full">
            <TabsList className="ml-8 mt-8 rounded-full">
              <TabsTrigger value="rooms" className="rounded-full data-[state=active]:bg-[#00FF66] data-[state=active]:text-gray-800">Rooms</TabsTrigger>
              <TabsTrigger value="sessions" className="rounded-full data-[state=active]:bg-[#00FF66] data-[state=active]:text-gray-800">Sessions</TabsTrigger>
            </TabsList>
            <TabsContent value="rooms" className="w-full">
              <div className="mx-auto mt-8 grid grid-cols-1 gap-6 p-3 md:p-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
                <SessionCard />
                <SessionCard />
                <SessionCard />
                <SessionCard />
              </div>
            </TabsContent>
            <TabsContent value="sessions">
              <div className="mx-auto mt-8 grid grid-cols-1 gap-6 p-3 md:p-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
                <SessionCard />
                <SessionCard />
                <SessionCard />
                <SessionCard />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default Discover;
