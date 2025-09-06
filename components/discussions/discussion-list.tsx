"use client"

import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Users, Clock, Search, Pin } from "lucide-react"
import { getDiscussions, getProjects } from "@/lib/storage"

export const DiscussionList = forwardRef<{ refreshDiscussions: () => void }>((props, ref) => {
  const [discussions, setDiscussions] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")
  const router = useRouter()

  useEffect(() => {
    loadDiscussions()
    setProjects(getProjects())
  }, [])

  const loadDiscussions = () => {
    setDiscussions(getDiscussions())
  }

  useImperativeHandle(ref, () => ({
    refreshDiscussions: loadDiscussions,
  }))

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesSearch =
      discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || discussion.category === categoryFilter
    const matchesProject =
      projectFilter === "all" ||
      (discussion.projectId && discussion.projectId.toString() === projectFilter) ||
      (projectFilter === "general" && !discussion.projectId)
    return matchesSearch && matchesCategory && matchesProject
  })

  const getProjectName = (projectId?: string) => {
    if (!projectId) return "General"
    const project = projects.find((p) => p.id.toString() === projectId)
    return project ? project.name : "General"
  }

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

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search discussions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass"
          />
        </div>

        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40 glass">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="glass-strong">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="feedback">Feedback</SelectItem>
              <SelectItem value="brainstorm">Brainstorm</SelectItem>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>

          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-48 glass">
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent className="glass-strong">
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="general">General</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id.toString()}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Discussion List */}
      <div className="space-y-4">
        {filteredDiscussions.map((discussion) => (
          <Card
            key={discussion.id}
            className="hover:shadow-md transition-shadow cursor-pointer glass"
            onClick={() => router.push(`/discussions/${discussion.id}`)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    {discussion.isPinned && <Pin className="h-4 w-4 text-accent" />}
                    <CardTitle className="text-base">{discussion.title}</CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getCategoryColor(discussion.category)} variant="secondary">
                      {discussion.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{getProjectName(discussion.projectId)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{discussion.description}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{getInitials(discussion.author)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{discussion.author}</span>
                  </div>

                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    <span>{discussion.replies}</span>
                  </div>

                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{discussion.participants}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{formatTimeAgo(discussion.lastActivity)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDiscussions.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No discussions found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || categoryFilter !== "all" || projectFilter !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Start a new discussion to collaborate with your team."}
          </p>
        </div>
      )}
    </div>
  )
})

DiscussionList.displayName = "DiscussionList"
