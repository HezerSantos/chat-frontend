import App from './App'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import DashboardMessageGroup from './pages/dashboard/DashboardMessageGroup'
import DashboardAddGroup from './pages/dashboard/DashboardAddGroup'
import DashboardFriends from './pages/dashboard//DashboardFriends'
import DashboardNotifications from './pages/dashboard/DashboardNotifications'
import DashboardSettings from './pages/dashboard/DashboardSettings'
const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: null,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/dashboard/groups',
        element: <DashboardMessageGroup />,
      },
      {
        path: '/dashboard/add-groups',
        element: <DashboardAddGroup />,
      },
      {
        path: 'dashboard/friends',
        element: <DashboardFriends />,
      },
      {
        path: 'dashboard/notifications',
        element: <DashboardNotifications />,
      },
      {
        path: 'dashboard/settings',
        element: <DashboardSettings />,
      },
    ],
  },
]

export default routes
