"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  LayoutDashboard,
  FolderOpen,
  CheckSquare,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react"

interface User {
  email: string
  name: string
}

interface MobileNavProps {
  user: User
}

export function MobileNav({ user }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/auth/login")
    setOpen(false)
  }

  const navigate = (path: string) => {
    router.push(path)
    setOpen(false)
  }

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: FolderOpen, label: "Projects", path: "/projects" },
    { icon: CheckSquare, label: "Tasks", path: "/tasks" },
    { icon: MessageSquare, label: "Discussions", path: "/discussions" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <div className="flex flex-col h-full">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-lg font-semibold text-primary">SynergySphere</h2>
            <div className="mt-2">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate(item.path)}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="border-t pt-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/settings")}>
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-3 h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
