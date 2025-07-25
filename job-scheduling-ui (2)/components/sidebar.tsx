"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  Home,
  LayoutDashboard,
  Search,
  Calendar,
  FileText,
  Users,
  Settings,
} from "lucide-react"

interface MenuItem {
  id: string
  label: string
  icon: any
  expandable?: boolean
  expanded?: boolean
  subItems?: { id: string; label: string }[]
}

interface SidebarProps {
  selectedMenuItem: string
  onMenuItemSelect: (id: string) => void
  className?: string
}

export const Sidebar = ({ selectedMenuItem, onMenuItemSelect, className = "" }: SidebarProps) => {
  const [expandedMenus, setExpandedMenus] = useState({
    scheduling: true,
    approvals: false,
    ca7: false,
  })

  const toggleMenu = (menu: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }))
  }

  const sidebarMenuItems: MenuItem[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "search", label: "Global Search", icon: Search },
    {
      id: "scheduling",
      label: "Scheduling",
      icon: Calendar,
      expandable: true,
      expanded: expandedMenus.scheduling,
      subItems: [
        { id: "add-job", label: "Add Job" },
        { id: "schedule-job", label: "Schedule Job v1" },
        { id: "modify-job", label: "Modify Job" },
        { id: "delete-job", label: "Delete Job" },
      ],
    },
    {
      id: "approvals",
      label: "Approvals",
      icon: FileText,
      expandable: true,
      expanded: expandedMenus.approvals,
      subItems: [],
    },
    {
      id: "ca7",
      label: "CA7 Administration",
      icon: Settings,
      expandable: true,
      expanded: expandedMenus.ca7,
      subItems: [
        { id: "requests", label: "Requests" },
        { id: "vacation", label: "Vacation Plan" },
      ],
    },
    {
      id: "operational",
      label: "Operational Requests",
      icon: Users,
    },
  ]

  return (
    <div className={`w-full md:w-[280px] bg-white border-r border-gray-200 flex flex-col shadow-sm ${className}`}>
      <div className="p-4 md:p-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#0066cc] rounded flex items-center justify-center">
            <Calendar className="text-white" size={18} />
          </div>
          <div className="hidden md:block">
            <div className="text-base font-semibold text-gray-900">Enterprise Job Scheduling</div>
            <div className="text-xs text-gray-500">Navigation Menu</div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {sidebarMenuItems.map((item) => {
          const IconComponent = item.icon
          return (
            <div key={item.id}>
              <button
                className={`w-full flex items-center gap-2 px-3 md:px-5 py-2.5 text-left text-[13px] transition-colors hover:bg-gray-50 ${
                  selectedMenuItem === item.id
                    ? "bg-blue-50 text-blue-700 font-medium border-l-[3px] border-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => {
                  onMenuItemSelect(item.id)
                  if (item.expandable) {
                    toggleMenu(item.id)
                  }
                }}
              >
                <IconComponent size={16} />
                <span className="flex-1 hidden md:block">{item.label}</span>
                {item.expandable && (
                  <div className="hidden md:block">
                    {item.expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </div>
                )}
              </button>
              {item.expandable &&
                item.expanded &&
                item.subItems?.map((subItem) => (
                  <button
                    key={subItem.id}
                    className={`w-full flex items-center gap-2 pl-8 md:pl-12 pr-3 md:pr-5 py-2 text-left text-[13px] transition-colors hover:bg-gray-50 ${
                      selectedMenuItem === subItem.id
                        ? "text-blue-700 font-medium bg-blue-50"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => onMenuItemSelect(subItem.id)}
                  >
                    <span className="hidden md:block">{subItem.label}</span>
                  </button>
                ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
