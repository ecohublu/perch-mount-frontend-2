import type { SidebarGroup } from '@/types/sidebar'

export const sidebarData: SidebarGroup[] = [
  {
    name: 'INSIGHT',
    items: [
      { name: 'Projects', icon: 'pi pi-android', to: '/app/projects' },
      { name: 'Perch Mounts', icon: 'pi pi-flag-fill', to: '/app/perchmounts' },
      {
        name: 'Pending Perch Mounts',
        icon: 'pi pi-spinner-dotted',
        to: '/app/perchmounts/pending',
      },
    ],
  },
  {
    name: 'DATA',
    items: [
      { name: 'Data Export', icon: 'pi pi-database', to: '/app/data' },
      { name: 'Highlights', icon: 'pi pi-heart-fill', to: '/app/highlights' },
    ],
  },
  {
    name: 'QUEUE',
    items: [
      { name: '來點空拍檢查', icon: 'pi pi-check-circle', to: '/app/emptycheck' },
      { name: '來點物種辨識', icon: 'pi pi-eye', to: '/app/review' },
      { name: '來點獵物辨認', icon: 'pi pi-check-square', to: '/app/identifyprey' },
    ],
  },
  {
    name: 'SETTING',
    items: [
      { name: 'Members', icon: 'pi pi-users', to: '/app/members' },
      { name: 'Options', icon: 'pi pi-bars', to: '/app/options' },
    ],
  },
]
