"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { addDiscussion, getProjects } from "@/lib/storage"
import { useEffect } from "react"

interface CreateDiscussionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDiscussionCreated?: () => void // Added callback for refresh
}

export function CreateDiscussionDialog({ open, onOpenChange, onDiscussionCreated }: CreateDiscussionDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("technical")
  const [projectId, setProjectId] = useState("")
  const [isPinned, setIsPinned] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [projects, setProjects] = useState<any[]>([]) // Added projects state
  const { toast } = useToast()

  useEffect(() => {
    setProjects(getProjects())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!title.trim() || !category) {
        throw new Error("Please fill in all required fields")
      }

      const newDiscussion = addDiscussion({
        title,
        description,
        category,
        projectId: projectId || undefined,
        isPinned,
      })

      toast({
        title: "Discussion created!",
        description: `${title} has been successfully created.`,
      })

      // Reset form
      setTitle("")
      setDescription("")
      setCategory("technical")
      setProjectId("")
      setIsPinned(false)
      onOpenChange(false)

      if (onDiscussionCreated) {
        onDiscussionCreated()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create discussion.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto glass-strong">
        <DialogHeader>
          <DialogTitle>Start New Discussion</DialogTitle>
          <DialogDescription>Create a new discussion thread to collaborate with your team.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Discussion Title *</Label>
            <Input
              id="title"
              placeholder="Enter discussion title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="glass"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what you'd like to discuss"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="glass resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="glass">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="glass-strong">
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="brainstorm">Brainstorm</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Project (Optional)</Label>
              <Select value={projectId} onValueChange={setProjectId}>
                <SelectTrigger className="glass">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent className="glass-strong">
                  <SelectItem value="general">General Discussion</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id.toString()}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="pinned" checked={isPinned} onCheckedChange={(checked) => setIsPinned(checked as boolean)} />
            <Label htmlFor="pinned" className="text-sm">
              Pin this discussion to the top
            </Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="glass">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !title.trim()}>
              {isLoading ? "Creating..." : "Create Discussion"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
