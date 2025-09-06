"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ProjectActivityProps {
  projectId: number
}

// Mock activity data
const mockActivity = [
  {
    id: 1,
    user: "Salvi",
    action: "completed task",
    target: "Homepage Design",
    time: "2 hours ago",
    type: "task",
  },
  {
    id: 2,
    user: "Archie",
    action: "uploaded file",
    target: "Design Mockups.fig",
    time: "4 hours ago",
    type: "file",
  },
  {
    id: 3,
    user: "Vinay",
    action: "commented on",
    target: "Navigation Implementation",
    time: "6 hours ago",
    type: "comment",
  },
  {
    id: 4,
    user: "Arya",
    action: "joined the project",
    target: "",
    time: "1 day ago",
    type: "member",
  },
  {
    id: 5,
    user: "Salvi",
    action: "created task",
    target: "Content Migration",
    time: "2 days ago",
    type: "task",
  },
]

export function ProjectActivity({ projectId }: ProjectActivityProps) {
  const getActivityColor = (type: string) => {
    switch (type) {
      case "task":
        return "bg-accent text-accent-foreground"
      case "comment":
        return "bg-primary text-primary-foreground"
      case "file":
        return "bg-secondary text-secondary-foreground"
      case "member":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent Activity</h3>

      <div className="space-y-4">
        {mockActivity.map((activity) => (
          <Card key={activity.id}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{getInitials(activity.user)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-1">
                  <div className="text-sm">
                    <span className="font-medium">{activity.user}</span>
                    <span className="text-muted-foreground"> {activity.action} </span>
                    {activity.target && <span className="font-medium">{activity.target}</span>}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className={`text-xs ${getActivityColor(activity.type)}`}>
                      {activity.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
