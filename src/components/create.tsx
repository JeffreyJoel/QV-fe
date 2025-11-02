"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, VoteIcon } from "lucide-react";
import { useState } from "react";
import CreateSession from "./create-session";

type ModalType = "select" | "room" | "session" | null;

export default function CreateModal() {
  const [activeModal, setActiveModal] = useState<ModalType>("select");

  const handleOptionClick = (type: "room" | "session") => {
    setActiveModal(type);
  };

  const handleClose = () => {
    setActiveModal("select");
  };

  const handleSubmit = (type: "room" | "session") => (e: React.FormEvent) => {
    e.preventDefault();
    setActiveModal("select");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-lg hover:text-[#00FF66] cursor-pointer">
          Create
        </p>
      </DialogTrigger>

      {/* Selection Modal */}
      {activeModal === "select" && (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              What would you like to create?
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <Button
              variant="outline"
              className="h-auto flex flex-col items-center gap-4 p-4 hover:border-[#00FF66] hover:text-[#00FF66]"
              onClick={() => handleOptionClick("room")}
            >
              <Home style={{height:"32px", width:"32px"}} />
              <div className="space-y-2 text-center">
                <h3 className="font-semibold text-lg">Create Room</h3>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto w-full flex flex-col items-center gap-4 p-6 hover:border-[#00FF66] hover:text-[#00FF66]"
              onClick={() => handleOptionClick("session")}
            >
              <VoteIcon style={{height:"32px", width:"32px"}} />
              <div className="space-y-2 text-center">
                <h3 className="font-semibold text-lg">Create Session</h3>
              </div>
            </Button>
          </div>
        </DialogContent>
      )}

      {/* Room Creation Modal */}
      {activeModal === "room" && (
        <CreateSession />
      )}

      {/* Session Creation Modal */}
      {activeModal === "session" && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Voting Session</DialogTitle>
            <DialogDescription>
              Start a new voting session in an existing room.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit("session")}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="session-name">Session Name</Label>
                <Input
                  id="session-name"
                  placeholder="Enter session name"
                  className="w-full"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="session-topic">Topic</Label>
                <Input
                  id="session-topic"
                  placeholder="What are we voting on?"
                  className="w-full"
                />
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="button" variant="ghost" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Create Session</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}
