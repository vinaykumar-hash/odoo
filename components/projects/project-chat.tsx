"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Paperclip, Smile } from "lucide-react"
import { format } from "date-fns"

interface ProjectChatProps {
  projectId: number
}

// Mock chat messages
const mockMessages = [
  {
    id: 1,
    author: "Sarah Wilson",
    content:
      "Hey team! I've just uploaded the latest design mockups. Please take a look and let me know your thoughts.",
    timestamp: "2023-12-21T09:30:00Z",
    type: "message",
  },
  {
    id: 2,
    author: "John Doe",
    content: "Looks great! I especially like the new color scheme. Much more modern than the previous version.",
    timestamp: "2023-12-21T09:35:00Z",
    type: "message",
  },
  {
    id: 3,
    author: "Mike Johnson",
    content: "Agreed! The navigation is much cleaner now. Should we schedule a review meeting for tomorrow?",
    timestamp: "2023-12-21T09:40:00Z",
    type: "message",
  },
  {
    id: 4,
    author: "System",
    content: "Emily Chen joined the project",
    timestamp: "2023-12-21T10:00:00Z",
    type: "system",
  },
  {
    id: 5,
    author: "Emily Chen",
    content: "Hi everyone! Excited to be part of this project. The designs look fantastic!",
    timestamp: "2023-12-21T10:05:00Z",
    type: "message",
  },
]

export function ProjectChat({ projectId }: ProjectChatProps) {
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      author: "Current User", // In real app, get from auth context
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      type: "message" as const,
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Project Chat</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                {message.type === "system" ? (
                  <div className="text-center">
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {message.content}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{getInitials(message.author)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{message.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(message.timestamp), "HH:mm")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="resize-none"
              />
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Smile className="h-4 w-4" />
              </Button>
              <Button size="icon" className="h-9 w-9" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
