export default [
  {
    path: '/diagnose-system',
    name: 'diagnose-list',
    component: () => import('@/pages/diagnose-system/DiagnoseListPage'),
  },
  {
    path: '/diagnose-system/detail/:id',
    name: 'diagnose-detail',
    component: () => import('@/pages/diagnose-system/DiagnoseDetailPage'),
  },
  {
    path: '/diagnose-system/diagnoseconfigrations',
    name: 'diagnose-configurations',
    component: () => import('@/pages/diagnose-system/DiagnoseConfigurations'),
  },
];
