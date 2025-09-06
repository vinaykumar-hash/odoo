"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Mail, Plus, X } from "lucide-react"

interface InviteMemberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectId: number
}

export function InviteMemberDialog({ open, onOpenChange, projectId }: InviteMemberDialogProps) {
  const [invites, setInvites] = useState([{ email: "", role: "" }])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const addInvite = () => {
    setInvites([...invites, { email: "", role: "" }])
  }

  const removeInvite = (index: number) => {
    if (invites.length > 1) {
      setInvites(invites.filter((_, i) => i !== index))
    }
  }

  const updateInvite = (index: number, field: "email" | "role", value: string) => {
    const updated = invites.map((invite, i) => (i === index ? { ...invite, [field]: value } : invite))
    setInvites(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const validInvites = invites.filter((invite) => invite.email && invite.role)

      if (validInvites.length === 0) {
        throw new Error("Please add at least one valid invitation")
      }

      // TODO: Implement actual invitation sending
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Invitations sent!",
        description: `${validInvites.length} invitation(s) have been sent successfully.`,
      })

      setInvites([{ email: "", role: "" }])
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send invitations.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invite Team Members</DialogTitle>
          <DialogDescription>Send invitations to collaborate on this project.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            {invites.map((invite, index) => (
              <div key={index} className="flex items-end space-x-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`email-${index}`}>Email Address</Label>
                  <Input
                    id={`email-${index}`}
                    type="email"
                    placeholder="colleague@company.com"
                    value={invite.email}
                    onChange={(e) => updateInvite(index, "email", e.target.value)}
                  />
                </div>
                <div className="w-32 space-y-2">
                  <Label htmlFor={`role-${index}`}>Role</Label>
                  <Select value={invite.role} onValueChange={(value) => updateInvite(index, "role", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {invites.length > 1 && (
                  <Button type="button" variant="outline" size="icon" onClick={() => removeInvite(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button type="button" variant="outline" onClick={addInvite} className="w-full bg-transparent">
            <Plus className="mr-2 h-4 w-4" />
            Add Another Invitation
          </Button>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Mail className="mr-2 h-4 w-4" />
              {isLoading ? "Sending..." : "Send Invitations"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
