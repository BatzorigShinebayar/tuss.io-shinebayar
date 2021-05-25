export default [
  {
    path: '/company',
    name: 'company',
    component: () => import('@/pages/company/CompanyGeneral'),
  },
  {
    path: '/company/algorithm',
    name: 'company-algorithm',
    component: () => import('@/pages/company/AlgorithmList'),
  },
  {
    path: '/company/algorithm/:id',
    name: 'company-algorithm-detail',
    component: () => import('@/pages/company/AlgorithmDetail'),
  },
  {
    path: '/company/department',
    name: 'company-department',
    component: () => import('@/pages/company/Departments'),
  },
  {
    path: '/company/employee',
    name: 'company-employee',
    component: () => import('@/pages/company/Employees'),
  },
  {
    path: '/company/function',
    name: 'company-function',
    component: () => import('@/pages/company/Functions'),
  },
  {
    path: '/company/job',
    name: 'company-job',
    component: () => import('@/pages/company/Job'),
  },
  {
    path: '/company/rules',
    name: 'company-rules',
    component: () => import('@/pages/company/RulesList'),
  },
  {
    path: '/company/rules/constitution/:id',
    name: 'company-rules-detail',
    component: () => import('@/pages/company/ConstitutionDetail'),
  },
  {
    path: '/company/rules/regulation/:id',
    name: 'company-regulation-detail',
    component: () => import('@/pages/company/RegulationDetail'),
  },
  {
    path: '/company/salary',
    name: 'company-salary',
    component: () => import('@/pages/company/Salary'),
  },
  {
    path: '/company/permission',
    name: 'company-permission',
    component: () => import('@/pages/company/PermissionTemplate'),
  },
  {
    path: '/company/stake-holders',
    name: 'stake-holders',
    component: () => import('@/pages/company/StakeHoldersSetting'),
  },
  {
    path: '/admin-settings/organization/:groupId',
    name: 'admin-setting-org',
    component: () => import('@/pages/settings/AdminSettingsOrg'),
  },
  {
    path: '/admin-settings/user/:groupId',
    name: 'admin-setting-user',
    component: () => import('@/pages/settings/AdminSettingsUser'),
  },
  {
    path: '/admin-settings',
    name: 'admin-setting',
    component: () => import('@/pages/settings/AdminSettings'),
  },
];
