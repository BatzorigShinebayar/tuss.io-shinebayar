import profile from '@/router/profile';
import taskManagement from '@/router/taskManagement';
import crucialInformation from '@/router/crucialInformation';
import formBuilder from '@/router/form-builder';
import company from '@/router/company';
import diagnose from '@/router/diagnose';
import goalManagement from '@/router/goalManagement';
import stakeHoldersManagement from '@/router/stakeHoldersManagement';

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage'),
    meta: { auth: 'public' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/Login'),
    meta: { auth: 'guest' },
  },
  {
    path: '/login/password',
    name: 'forgot-password',
    component: () => import('@/pages/login/Password'),
    meta: { auth: 'guest' },
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('@/pages/login/Logout'),
    meta: { auth: 'public' },
  },
  ...profile,
  ...taskManagement,
  ...crucialInformation,
  ...company,
  ...formBuilder,
  ...goalManagement,
  ...diagnose,
  ...stakeHoldersManagement,
];
