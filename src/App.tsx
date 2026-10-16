import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyles } from './features/shared';
import { MyGoals } from './features/my-goals';
import './App.css';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MyGoals />
    </ThemeProvider>
  );
}

export default App;