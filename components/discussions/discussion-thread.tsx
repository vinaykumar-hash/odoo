"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Pin, MessageSquare, Users, Clock, Send, Heart, Reply } from "lucide-react"
import { format } from "date-fns"

interface Discussion {
  id: number
  title: string
  description: string
  author: string
  projectName: string
  category: string
  isPinned: boolean
  replies: number
  participants: number
  lastActivity: string
  createdAt: string
}

interface DiscussionThreadProps {
  discussion: Discussion
}

// Mock replies data
const mockReplies = [
  {
    id: 1,
    author: "John Doe",
    content:
      "I really like the new color scheme! The blue and green combination feels fresh and modern. However, I think the navigation menu could be a bit more prominent.",
    createdAt: "2023-12-20T10:15:00Z",
    likes: 3,
    replies: [
      {
        id: 11,
        author: "Sarah Wilson",
        content:
          "Thanks for the feedback! I'll work on making the navigation more prominent. What do you think about increasing the font size?",
        createdAt: "2023-12-20T10:30:00Z",
        likes: 1,
      },
    ],
  },
  {
    id: 2,
    author: "Mike Johnson",
    content:
      "The layout looks great on desktop, but I'm concerned about how it will look on mobile devices. Have we tested the responsive design yet?",
    createdAt: "2023-12-20T11:45:00Z",
    likes: 2,
    replies: [],
  },
  {
    id: 3,
    author: "Emily Chen",
    content:
      "I love the overall direction! The user flow is much clearer now. One suggestion: could we add more white space around the call-to-action buttons to make them stand out more?",
    createdAt: "2023-12-20T14:20:00Z",
    likes: 4,
    replies: [],
  },
]

export function DiscussionThread({ discussion }: DiscussionThreadProps) {
  const [replies, setReplies] = useState(mockReplies)
  const [newReply, setNewReply] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const { toast } = useToast()

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technical":
        return "bg-primary text-primary-foreground"
      case "feedback":
        return "bg-accent text-accent-foreground"
      case "brainstorm":
        return "bg-secondary text-secondary-foreground"
      case "general":
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

  const handleAddReply = () => {
    if (!newReply.trim()) return

    const reply = {
      id: replies.length + 1,
      author: "Current User", // In real app, get from auth context
      content: newReply.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    }

    setReplies([...replies, reply])
    setNewReply("")
    toast({
      title: "Reply posted",
      description: "Your reply has been added to the discussion.",
    })
  }

  const handleAddNestedReply = (parentId: number) => {
    if (!replyContent.trim()) return

    const nestedReply = {
      id: Date.now(), // Simple ID generation
      author: "Current User",
      content: replyContent.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
    }

    setReplies(
      replies.map((reply) => (reply.id === parentId ? { ...reply, replies: [...reply.replies, nestedReply] } : reply)),
    )

    setReplyContent("")
    setReplyingTo(null)
    toast({
      title: "Reply posted",
      description: "Your reply has been added.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Discussion Header */}
      <Card>
        <CardHeader>
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  {discussion.isPinned && <Pin className="h-4 w-4 text-accent" />}
                  <CardTitle className="text-xl">{discussion.title}</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getCategoryColor(discussion.category)} variant="secondary">
                    {discussion.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{discussion.projectName}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">{getInitials(discussion.author)}</AvatarFallback>
                </Avatar>
                <span>{discussion.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{format(new Date(discussion.createdAt), "PPp")}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span>{discussion.replies} replies</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{discussion.participants} participants</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{discussion.description}</p>
        </CardContent>
      </Card>

      {/* Replies */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Replies ({replies.length})</h3>

        {replies.map((reply) => (
          <Card key={reply.id}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{getInitials(reply.author)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="text-sm font-medium">{reply.author}</span>
                      <div className="text-xs text-muted-foreground">{format(new Date(reply.createdAt), "PPp")}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4 mr-1" />
                      {reply.likes}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setReplyingTo(reply.id)}>
                      <Reply className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed pl-10">{reply.content}</p>

                {/* Nested Replies */}
                {reply.replies && reply.replies.length > 0 && (
                  <div className="pl-10 space-y-3 border-l-2 border-muted ml-4">
                    {reply.replies.map((nestedReply) => (
                      <div key={nestedReply.id} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{getInitials(nestedReply.author)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{nestedReply.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(nestedReply.createdAt), "PPp")}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed pl-8">{nestedReply.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                {replyingTo === reply.id && (
                  <div className="pl-10 space-y-2">
                    <Textarea
                      placeholder="Write a reply..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      rows={2}
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleAddNestedReply(reply.id)} disabled={!replyContent.trim()}>
                        <Send className="h-3 w-3 mr-1" />
                        Reply
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setReplyingTo(null)
                          setReplyContent("")
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Reply */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">CU</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Add to discussion</span>
            </div>

            <Textarea
              placeholder="Share your thoughts..."
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              rows={3}
            />

            <div className="flex justify-end">
              <Button onClick={handleAddReply} disabled={!newReply.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Post Reply
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
