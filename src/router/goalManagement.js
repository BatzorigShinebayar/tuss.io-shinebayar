export default [
  {
    path: '/goal-management',
    name: 'goal',
    component: () => import('@/pages/goal-management/GoalIndexListPage'),
  },
  {
    path: '/goal-management/index',
    name: 'goal-detail',
    component: () => import('@/pages/goal-management/GoalDetailPage'),
  },
  {
    path: '/goal-management/plan',
    name: 'goal-plan-list',
    component: () => import('@/pages/goal-management/GoalPlanListPage'),
  },
  {
    path: '/goal-management/plan/create',
    name: 'goal-plan-create',
    component: () => import('@/pages/goal-management/GoalPlanCreatePage'),
  },
];
