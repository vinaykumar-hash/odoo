"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, X, MessageSquare, CheckSquare, Users, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "task" | "message" | "team" | "deadline"
  title: string
  message: string
  time: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "task",
    title: "Task Assigned",
    message: "You've been assigned to 'Update user interface'",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "message",
    title: "New Message",
    message: "Sarah commented on 'Project Alpha Discussion'",
    time: "5 min ago",
    read: false,
  },
  {
    id: "3",
    type: "deadline",
    title: "Deadline Reminder",
    message: "Mobile app prototype due tomorrow",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "4",
    type: "team",
    title: "Team Update",
    message: "John joined Project Beta team",
    time: "2 hours ago",
    read: true,
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "task":
      return <CheckSquare className="h-4 w-4 text-blue-500" />
    case "message":
      return <MessageSquare className="h-4 w-4 text-green-500" />
    case "team":
      return <Users className="h-4 w-4 text-purple-500" />
    case "deadline":
      return <Calendar className="h-4 w-4 text-orange-500" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">No notifications</div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-3 p-3 hover:bg-muted/50 cursor-pointer",
                    !notification.read && "bg-muted/30",
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeNotification(notification.id)
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                  {!notification.read && <div className="w-2 h-2 bg-primary rounded-full mt-2" />}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
