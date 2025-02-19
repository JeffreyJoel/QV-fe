"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Clock } from "@/components/ui/clock"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DateTimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  className?: string
}

export function DateTimePicker({ date, setDate, className }: DateTimePickerProps) {
  const minuteRef = React.useRef<HTMLDivElement>(null)
  const hourRef = React.useRef<HTMLDivElement>(null)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground", className)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP p") : <span>Pick date and time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Tabs defaultValue="date">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="date">Date</TabsTrigger>
            <TabsTrigger value="time">Time</TabsTrigger>
          </TabsList>
          <TabsContent value="date" className="p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                if (date) {
                  const newDateTime = date
                  if (minuteRef.current && hourRef.current) {
                    const hour = Number.parseInt(hourRef.current.getAttribute("data-hour") || "0")
                    const minute = Number.parseInt(minuteRef.current.getAttribute("data-minute") || "0")
                    newDateTime.setHours(hour, minute)
                  }
                  setDate(newDateTime)
                }
              }}
              initialFocus
            />
          </TabsContent>
          <TabsContent value="time" className="p-0">
            <Clock date={date} setDate={setDate} minuteRef={minuteRef} hourRef={hourRef} />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}

