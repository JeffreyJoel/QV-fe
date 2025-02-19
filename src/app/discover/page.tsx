"use client";

import { CreateRoomForm } from "@/components/room/create-room";
import { JoinRoomDialog } from "@/components/room/join-room";
import { NavBar } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRoom } from "@/hooks/useRoom";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function Discover() {
  const { rooms, isLoading, error, joinRoom } = useRoom();

  return (
    <>
      <NavBar isApp={true} />
      <div>
        <div className="mx-auto md:max-w-7xl mt-16">
          <h1 className="text-center text-4xl font-bold text-[#00FF66]">
            Discover Rooms
          </h1>
          <p className="text-center text-gray-400 mt-6 text-xl">
            Empowering smarter decisions through the power of quadratic voting
          </p>

          <main className="container mx-auto px-4 py-8 mt-8">
            <div className="flex justify-end mb-4">
              <CreateRoomForm />
            </div>
            {isLoading("fetchRooms") ? (
              <p className="text-center text-gray-400">Loading rooms...</p>
            ) : error ? (
              <p className="text-center text-red-500">Error: {error.message}</p>
            ) : rooms.length === 0 ? (
              <p className="text-center text-gray-400">No rooms found</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rooms.map((room) => (
                  <Card key={room.id} className="backdrop-blur-sm bg-card/50">
                    <CardHeader>
                      <CardTitle className="text-lg">{room.name}</CardTitle>
                      <CardDescription>{room.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Admin</span>
                          <span className="font-mono">
                            {room.creator.slice(0, 6)}...
                            {room.creator.slice(-4)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Total Sessions
                          </span>
                          <span>{Number(room.sessions) || 0}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Status</span>
                          {/* <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              room.active
                                ? "bg-green-700 text-white"
                                : "bg-secondary text-secondary-foreground"
                            }`}
                          >
                            {room.active ? "Active" : "Inactive"}
                          </span> */}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <JoinRoomDialog
                          roomId={Number(room.id)}
                          onJoinRoom={joinRoom}
                        />
                        <Link href={`/room/${room.id}`} className="flex-1">
                          <Button className="w-full" variant="secondary">
                            View Room
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default Discover;
