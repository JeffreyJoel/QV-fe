import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, MapPin } from 'lucide-react'
import Image from "next/image"

export default function SessionCard() {
  return (
    <Card className="max-w-md overflow-hidden cursor-pointer hover:border-[#00FF66]/50 transition-all duration-300 shadow-lg hover:shadow-[#00FF66]/20">
      <div className="flex gap-4 p-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">YLP YEYOO</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="w-4 h-4" />
              <span className="text-sm">Sun, Feb 16th, 5PM</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">To Be Disclosed Soon</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm font-medium text-primary">Free</span>
          </div>
        </div>
        <div className="relative w-32 h-32">
          <Image
            src="/vote-default.svg"
            alt="Event image"
            width={128}
            height={128}
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </Card>
  )
}

