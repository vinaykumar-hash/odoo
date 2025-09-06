"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FolderOpen, CheckSquare, MessageSquare, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: FolderOpen, label: "Projects", path: "/projects" },
    { icon: CheckSquare, label: "Tasks", path: "/tasks" },
    { icon: MessageSquare, label: "Discussions", path: "/discussions" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className={cn("flex flex-col items-center gap-1 h-auto py-2 px-3", isActive && "text-primary")}
              onClick={() => router.push(item.path)}
            >
              <item.icon className={cn("h-4 w-4", isActive && "text-primary")} />
              <span className="text-xs">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
