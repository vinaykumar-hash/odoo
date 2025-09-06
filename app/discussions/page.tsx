"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DiscussionList } from "@/components/discussions/discussion-list"
import { CreateDiscussionDialog } from "@/components/discussions/create-discussion-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface User {
  email: string
  name: string
}

export default function DiscussionsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const discussionListRef = useRef<{ refreshDiscussions: () => void } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/login")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const handleDiscussionCreated = () => {
    if (discussionListRef.current) {
      discussionListRef.current.refreshDiscussions()
    }
  }

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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Team Discussions</h1>
            <p className="text-muted-foreground">Collaborate and communicate with your team</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="glass">
            <Plus className="mr-2 h-4 w-4" />
            New Discussion
          </Button>
        </div>

        <DiscussionList ref={discussionListRef} />

        <CreateDiscussionDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onDiscussionCreated={handleDiscussionCreated}
        />
      </main>
    </div>
  )
}
