import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'

import RootLayout from './layouts/RootLayout'
import SettingLayout from './layouts/SettingLayout'
import Dashboard from './pages/Dashboard'
import ProtectedLogin from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import ExpenseCenters from './pages/settings/ExpenseCenters'
import ExpenseTopics from './pages/settings/ExpenseTopics'
import ProjectLevels from './pages/settings/ProjectLevels'
import Sources from './pages/settings/Sources'
import SubTopics from './pages/settings/SubTopics'
import Topics from './pages/settings/Topics'
import Units from './pages/settings/Units'
import FinancialYears from './pages/settings/FinancialYears'
import Banks from './pages/settings/Banks'
import ProjectLayout from './layouts/ProjectLayout'
import CostEstimate from './pages/Projects/CostEstimate'
import ProjectDetail from './pages/Projects/ProjectDetail'
import ExtendTimeline from './pages/Projects/ExtendTimeline'
import ProjectPayment from './pages/Projects/ProjectPayment'
import ProjectSite from './pages/Projects/ProjectSite'
import ProjectContract from './pages/Projects/ProjectContract'
import UserCommittee from './pages/Projects/UserCommittee'
import OtherDocuments from './pages/Projects/OtherDocuments'
import UserProfile from './pages/UserProfile'

import Users from './pages/Users'
import Projects from './pages/Projects'

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <ProtectedLogin />,
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/projects',
        element: <Projects />,
      },
      {
        path: '/profile',
        element: <UserProfile />,
      },
      {
        path: '/projects/:id',
        element: <ProjectLayout />,
        children: [
          { path: '', element: <Navigate to="details" replace /> },
          { path: 'details', element: <ProjectDetail /> },
          { path: 'cost-estimate', element: <CostEstimate /> },
          { path: 'user-committee-formation', element: <UserCommittee /> },
          { path: 'project-contract', element: <ProjectContract /> },
          { path: 'project-site', element: <ProjectSite /> },
          { path: 'project-payment-process', element: <ProjectPayment /> },
          { path: 'other-documents', element: <OtherDocuments /> },
          { path: 'exception', element: <PageNotFound /> },
          { path: 'messages', element: <PageNotFound /> },
          { path: 'extend-timeline', element: <ExtendTimeline /> },
          { path: 'cost-estimate-modification', element: <PageNotFound /> },
        ],
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/setting',
        element: <SettingLayout />,
        children: [
          {
            path: '',
            element: <Navigate to="topics" replace />,
          },
          {
            path: 'topics',
            element: <Topics />,
          },
          {
            path: 'sub-topics',
            element: <SubTopics />,
          },
          {
            path: 'project-levels',
            element: <ProjectLevels />,
          },
          {
            path: 'expense-topics',
            element: <ExpenseTopics />,
          },
          {
            path: 'expense-centers',
            element: <ExpenseCenters />,
          },
          {
            path: 'sources',
            element: <Sources />,
          },
          {
            path: 'units',
            element: <Units />,
          },
          {
            path: 'financial-years',
            element: <FinancialYears />,
          },
          {
            path: 'banks',
            element: <Banks />,
          },
        ],
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router
