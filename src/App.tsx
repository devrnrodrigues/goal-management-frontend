import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyles, PlaceholderPage } from './features/shared';
import { MainLayout } from './features/layout';
import { MyGoals } from './features/my-goals';
import { DashboardPage } from './features/dashboard';
import './App.css';

const pageNamesMap: Record<string, string> = {
  'task-board': 'Quadro de tarefas',
  'recent-activity': 'Atividades recentes',
  'calendar': 'Calendário de entregas',
  'completed-goals': 'Metas concluídas',
  'reports': 'Relatórios e métricas',
};

export function App() {
  const [activeTab, setActiveTab] = useState<string>('goals');

  const renderActivePage = () => {
    switch (activeTab) {
      case 'goals':
        return <MyGoals />;
      case 'dashboard':
        return <DashboardPage onNavigateToGoals={() => setActiveTab('goals')} />;
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
      <MainLayout
        activeNavItemId={activeTab}
        onSelectNavItem={(id) => setActiveTab(id)}
      >
        {renderActivePage()}
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;