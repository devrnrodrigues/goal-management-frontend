import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  theme,
  GlobalStyles,
  PlaceholderPage,
  useScrollbarVisibility,
  getAuthToken,
  getRefreshToken,
  isMockSession,
  clearAuthSession,
} from './features/shared';
import { MainLayout } from './features/layout';
import { MyGoals } from './features/my-goals';
import { DashboardPage } from './features/dashboard';
import { TaskBoard } from './features/task-board';
import { RecentActivity } from './features/recent-activity';
import { CalendarPage } from './features/calendar';
import { ReportsPage } from './features/reports';
import { CompletedGoalsPage } from './features/completed-goals';
import { AuthPage } from './features/auth';
import { authApi } from './features/auth/api/authApi';
import './App.css';

const pageNamesMap: Record<string, string> = {
  'task-board': 'Quadro de tarefas',
  'recent-activity': 'Atividades recentes',
  'calendar': 'Calendário de entregas',
  'completed-goals': 'Metas concluídas',
  'reports': 'Relatórios e métricas',
};

export function App() {
  useScrollbarVisibility();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(getAuthToken() || isMockSession());
  });
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  useEffect(() => {
    const handleSessionExpired = () => {
      setIsAuthenticated(false);
    };

    window.addEventListener('auth-session-expired', handleSessionExpired);
    return () => {
      window.removeEventListener('auth-session-expired', handleSessionExpired);
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      authApi.logout(refreshToken).catch(() => undefined);
    }
    clearAuthSession();
    setIsAuthenticated(false);
  };

  const handleOpenAddGoal = () => {
    setActiveTab('goals');
    setTimeout(() => {
      window.dispatchEvent(new Event('open-add-goal-modal'));
    }, 0);
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'goals':
        return <MyGoals />;
      case 'dashboard':
        return <DashboardPage />;
      case 'task-board':
        return <TaskBoard />;
      case 'recent-activity':
        return <RecentActivity />;
      case 'calendar':
        return <CalendarPage />;
      case 'completed-goals':
        return <CompletedGoalsPage />;
      case 'reports':
        return <ReportsPage />;
      default:
        return (
          <PlaceholderPage
            pageName={pageNamesMap[activeTab] || 'Módulo em desenvolvimento'}
            onNavigateToGoals={() => setActiveTab('goals')}
          />
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {!isAuthenticated ? (
        <AuthPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <MainLayout
          activeNavItemId={activeTab}
          onSelectNavItem={(id) => setActiveTab(id)}
          onLogout={handleLogout}
          onOpenAddGoal={handleOpenAddGoal}
        >
          {renderActivePage()}
        </MainLayout>
      )}
    </ThemeProvider>
  );
}

export default App;