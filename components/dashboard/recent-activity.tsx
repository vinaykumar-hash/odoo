import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock activity data
const recentActivity = [
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
    action: "commented on",
    target: "Mobile App Development",
    time: "4 hours ago",
    type: "comment",
  },
  {
    id: 3,
    user: "Vinay",
    action: "created project",
    target: "Q1 Marketing Campaign",
    time: "1 day ago",
    type: "project",
  },
  {
    id: 4,
    user: "Arya",
    action: "updated deadline for",
    target: "Website Redesign",
    time: "2 days ago",
    type: "update",
  },
]

export function RecentActivity() {
  const getActivityColor = (type: string) => {
    switch (type) {
      case "task":
        return "bg-accent text-accent-foreground"
      case "comment":
        return "bg-primary text-primary-foreground"
      case "project":
        return "bg-secondary text-secondary-foreground"
      case "update":
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
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates from your team</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivity.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">{getInitials(activity.user)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="text-sm">
                <span className="font-medium">{activity.user}</span>
                <span className="text-muted-foreground"> {activity.action} </span>
                <span className="font-medium">{activity.target}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className={`text-xs ${getActivityColor(activity.type)}`}>
                  {activity.type}
                </Badge>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
