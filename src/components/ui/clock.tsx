"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ClockProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  minuteRef: React.RefObject<HTMLDivElement>
  hourRef: React.RefObject<HTMLDivElement>
}

export function Clock({ date, setDate, minuteRef, hourRef }: ClockProps) {
  const minutes = Array.from({ length: 60 }, (_, i) => i)
  const hours = Array.from({ length: 24 }, (_, i) => i)

  const selectedHour = date ? date.getHours() : 0
  const selectedMinute = date ? date.getMinutes() : 0

  return (
    <div className="flex h-[300px] w-full">
      <ScrollArea className="flex-1 border-r">
        <div className="space-y-1 p-2">
          {hours.map((hour) => (
            <div
              key={hour}
              ref={selectedHour === hour ? hourRef : null}
              data-hour={hour}
              className={cn(
                "rounded-md px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer",
                selectedHour === hour && "bg-primary text-primary-foreground",
              )}
              onClick={() => {
                if (!date) {
                  const newDate = new Date()
                  newDate.setHours(hour, selectedMinute)
                  setDate(newDate)
                } else {
                  const newDate = new Date(date)
                  newDate.setHours(hour)
                  setDate(newDate)
                }
              }}
            >
              {hour.toString().padStart(2, "0")}
            </div>
          ))}
        </div>
      </ScrollArea>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {minutes.map((minute) => (
            <div
              key={minute}
              ref={selectedMinute === minute ? minuteRef : null}
              data-minute={minute}
              className={cn(
                "rounded-md px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer",
                selectedMinute === minute && "bg-primary text-primary-foreground",
              )}
              onClick={() => {
                if (!date) {
                  const newDate = new Date()
                  newDate.setHours(selectedHour, minute)
                  setDate(newDate)
                } else {
                  const newDate = new Date(date)
                  newDate.setMinutes(minute)
                  setDate(newDate)
                }
              }}
            >
              {minute.toString().padStart(2, "0")}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

