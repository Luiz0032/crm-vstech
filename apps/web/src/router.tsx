import { createBrowserRouter, Navigate } from 'react-router';

import { DashboardPage } from './pages/DashboardPage';
import { LeadDetailPage } from './pages/LeadDetailPage';
import { LeadsPage } from './pages/LeadsPage';
import { LoginPage } from './pages/LoginPage';
import { ProjectsPage } from './pages/ProjectsPage';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/painel" replace /> },
  { path: '/login', Component: LoginPage },
  { path: '/contatos', Component: LeadsPage },
  { path: '/contatos/:id', Component: LeadDetailPage },
  { path: '/projetos', Component: ProjectsPage },
  { path: '/painel', Component: DashboardPage },
]);
