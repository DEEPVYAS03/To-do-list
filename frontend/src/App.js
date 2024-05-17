import AppNavigation from './navigation/AppNavigation';
import { AuthProvider } from './context/authContext';

function App() {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}

export default App;
