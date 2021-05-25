export default [
  {
    path: '/form/edit/',
    name: 'form-edit',
    component: () => import('@/pages/form/Edit'),
  },
  {
    path: '/form/entry/',
    name: 'form-entry',
    component: () => import('@/pages/form/Entry'),
  },
  {
    path: '/form/',
    name: 'form',
    component: () => import('@/pages/form/HomePage'),
  },
  {
    path: '/form/update/',
    name: 'form-update',
    component: () => import('@/pages/form/Update'),
  },
  {
    path: '/form/preview/',
    name: 'form-preview',
    component: () => import('@/pages/form/Preview'),
  },
];
