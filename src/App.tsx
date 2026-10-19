import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyles, PlaceholderPage, useScrollbarVisibility } from './features/shared';
import { MainLayout } from './features/layout';
import { MyGoals } from './features/my-goals';
import { DashboardPage } from './features/dashboard';
import { TaskBoard } from './features/task-board';
import { RecentActivity } from './features/recent-activity';
import { CalendarPage } from './features/calendar';
import { ReportsPage } from './features/reports';
import { CompletedGoalsPage } from './features/completed-goals';
import { AuthPage } from './features/auth';
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'goals':
        return <MyGoals />;
      case 'dashboard':
        return <DashboardPage onNavigateToGoals={() => setActiveTab('goals')} />;
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
        >
          {renderActivePage()}
        </MainLayout>
      )}
    </ThemeProvider>
  );
}

export default App;