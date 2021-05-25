export default [
  {
    path: '/crucial-information/',
    name: 'crucial',
    component: () => import('@/pages/crucial-information/index'),
  },
  {
    path: '/crucial-information/01/',
    name: 'crucialInfo01',
    component: () => import('@/pages/crucial-information/01'),
  },
  {
    path: '/crucial-information/:weekId/04/:type/:id/',
    name: 'crucialInfo04',
    component: () =>
      import('@/pages/crucial-information/_weekId/04/_type/_id/04'),
  },
  {
    path: '/crucial-information/:weekId/04/:type/:id/:date/',
    name: 'crucialInfo04Perf',
    component: () =>
      import('@/pages/crucial-information/_weekId/04/_type/_id/_date/04perf'),
  },
];
