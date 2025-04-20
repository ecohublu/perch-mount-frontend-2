export interface SidebarItem {
  name: string
  icon: string
  to: string
}

export interface SidebarGroup {
  name: string
  items: SidebarEntry[]
}

export type SidebarEntry = SidebarItem
