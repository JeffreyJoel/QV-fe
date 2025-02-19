"use client";

import { CreateSessionForm } from "@/components/room/create-session";
import { RoomDescription } from "@/components/room/room-description";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRoom } from "@/hooks/useRoom";
import { Room } from "@/types";
import { useParams } from "next/navigation";
import { useAppKitAccount } from "@reown/appkit/react";
import { NavBar } from "@/components/shared/navbar";

export default function RoomPage() {
  const { address } = useAppKitAccount();
  const {
    fetchRooms,
    rooms,
    fetchSessionsByRoom,
    sessionsByRoom,
    isLoading,
    error,
  } = useRoom();

  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const params = useParams();
  const id = Number(params.id);
  const admin = "0xDdb342ecc94236c29a5307d3757d0724D759453C";

  // Single useEffect for data fetching
  useEffect(() => {
    const fetchData = async () => {
      await fetchRooms();
      await fetchSessionsByRoom(id);
      console.log(sessionsByRoom);
    };

    fetchData();
  }, [id]); // Only depend on id

  // Update current room when rooms change
  useEffect(() => {
    const room = rooms.find((room) => Number(room.id) === id);
    if (room) {
      setCurrentRoom(room);
    }
  }, [rooms, id]);

  const sessions = sessionsByRoom || [];
  const isLoadingData = isLoading("fetchRooms") || isLoading("fetchSessions");

  // Show loading state while fetching initial data
  if (isLoading("fetchRooms") || isLoading("fetchSessions")) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading room details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <NavBar isApp={true} />

      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link
              href="/discover"
              className="flex items-center text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Discover
            </Link>
            {address !== admin ? (
              <CreateSessionForm roomId={id.toString()} />
            ) : (
              ""
            )}
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <RoomDescription
              name={currentRoom?.name || "Unknown Room"}
              description={
                currentRoom?.description || "No description available."
              }
              creator={currentRoom?.creator || "Unknown"}
              totalSessions={Number(currentRoom?.sessions) || 0}
              totalParticipants={0}
            />
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Voting Sessions
            </h2>
            <p className="mt-2 text-muted-foreground">
              View and participate in active voting sessions
            </p>
          </div>
          {sessions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No voting sessions found for this room.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {sessions.map((session) => (
                <Card key={session.id} className="backdrop-blur-sm bg-card/50">
                  <CardHeader>
                    <CardTitle>{session.name}</CardTitle>
                    <CardDescription>{session.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status</span>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            session.active
                              ? "bg-primary/10 text-primary"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {session.active ? "Active" : "Ended"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Duration</span>
                        <span>
                          {new Date(
                            Number(session.startTime) * 1000
                          ).toLocaleDateString()}{" "}
                          -{" "}
                          {new Date(
                            Number(session.endTime) * 1000
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Link href={`/room/${params.id}/session/${session.id}`}>
                      <Button className="w-full" variant="secondary">
                        {session.active ? "Vote Now" : "View Results"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
