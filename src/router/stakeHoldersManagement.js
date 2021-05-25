export default [
  {
    path: '/stake-holder-management/:type/:id',
    name: 'shm-list',
    component: () => import('@/pages/stake-holder-management/Stakeholders'),
  },
  {
    path: '/stake-holder-detail/:id',
    name: 'stake-holder-detail',
    component: () =>
      import('@/pages/stake-holder-management/StakeholderDetail'),
  },
  {
    path: '/stake-holders-types',
    name: 'stake-holders-types',
    component: () =>
      import('@/pages/stake-holder-management/StakeHoldersTypes'),
  },
  {
    path: '/stake-holder-management/leave-request',
    name: 'leave-requests',
    component: () => import('@/pages/stake-holder-management/LeaveRequests'),
  },
  {
    path: '/stake-holder-management/employee-vacation',
    name: 'employee-vacations',
    component: () => import('@/pages/stake-holder-management/EmployeeVacation'),
  },
  {
    path: '/stake-holder-personal-info/:id',
    name: 'stake-holder-personal-info',
    component: () =>
      import('@/pages/stake-holder-management/StakeholderPersonalInfo'),
  },
];
