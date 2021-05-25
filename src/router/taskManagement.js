export default [
  {
    path: '/task-management',
    name: 'task',
    component: () => import('@/pages/task-management/TaskListPage'),
  },
  {
    path: '/task-management/detail',
    name: 'task-detail',
    component: () => import('@/pages/task-management/TaskDetailPage'),
  },
  {
    path: '/task-management/configurations',
    name: 'task-configurations',
    component: () => import('@/pages/task-management/ConfigurationList'),
  },
  {
    path: '/task-management/configurations/:id',
    name: 'task-configurations-detail',
    component: () => import('@/pages/task-management/ConfigurationDetail'),
  },
  {
    path: '/task-management/gantt_chart',
    name: 'task-gantt-chart',
    component: () => import('@/pages/task-management/TaskGanttChartPage'),
  },
];
