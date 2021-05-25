export default [
  {
    path: '/profile',
    name: 'PersonalInfo',
    component: () => import('@/pages/profile/PersonalInfo'),
  },
  {
    path: '/profile/attendance',
    name: 'My-Attendance',
    component: () => import('@/pages/profile/Attendance'),
  },
  {
    path: '/profile/notification',
    name: 'notification',
    component: () => import('@/pages/profile/ProfileNotification'),
  },
  {
    path: '/profile/Gmail/inbox',
    name: 'gmailInbox',
    component: () => import('@/pages/profile/Gmail/ProfileGmailInbox'),
  },
  {
    path: '/profile/Gmail/starred',
    name: 'gmailStarred',
    component: () => import('@/pages/profile/Gmail/ProfileGmailStarred'),
  },
  {
    path: '/profile/calendar',
    name: 'calendar',
    component: () => import('@/pages/profile/ProfileCalendar'),
  },
];
