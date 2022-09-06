import { AppProvider } from '@/providers/AppProvider';

const App = () => {
  return (
    <AppProvider>
      <span>FilmTab</span>
    </AppProvider>
  );
};

export default App;
