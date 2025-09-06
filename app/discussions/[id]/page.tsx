"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DiscussionThread } from "@/components/discussions/discussion-thread"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface User {
  email: string
  name: string
}

// Mock discussion data
const mockDiscussion = {
  id: 1,
  title: "Website Redesign Feedback",
  description:
    "Let's discuss the new homepage design and gather feedback from the team. I've uploaded the latest mockups and would love to hear everyone's thoughts on the layout, color scheme, and user experience flow.",
  author: "Sarah Wilson",
  projectId: 1,
  projectName: "Website Redesign",
  category: "feedback",
  isPinned: true,
  replies: 12,
  participants: 5,
  lastActivity: "2023-12-21T10:30:00Z",
  createdAt: "2023-12-20T09:00:00Z",
}

export default function DiscussionDetailPage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const params = useParams()
  const discussionId = params.id as string

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/login")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />

      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.push("/discussions")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Discussion</h1>
            <p className="text-muted-foreground">Collaborate with your team</p>
          </div>
        </div>

        <DiscussionThread discussion={mockDiscussion} />
      </main>
    </div>
  )
}
