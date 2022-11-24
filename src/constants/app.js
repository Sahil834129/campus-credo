export const FILE_SIZE = 3000000 // 3 MB
export const ACCEPT_MIME_TYPE = ['image/jpeg', 'image/png', 'application/pdf']

export const DEFAULT_ROLES = {
  SCHOOL_ADMIN: 'ROLE_ROLE_SCHOOL_ADMIN',
  PARENT: 'ROLE_PARENT'
}

export const ADMIN_DASHBOARD_LINK = [
  { title: 'Dasboard', url: '/admin-dashboard', showsData: true },
  { title: 'Manage Application', url: '/manage-application', showsData: true },
  { title: 'Manage Admission', url: '/manage-admission', showsData: false },
  { title: 'Manage Fees', url: '/manage-fees', showsData: false },
  { title: 'Manage Users', url: '/manage-users', showsData: false }
]
