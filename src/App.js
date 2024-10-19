import './styles/style.css';
import Login from './components/Login';
import Home from './components/Home';
import { AuthProvider } from './components/contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { useStateValue } from './components/contexts/StateProvider';

function App() {

  const [{isLoading}] = useStateValue();

  return (
    <div className="home">

{isLoading &&(
      <div className='loading'> LOADING... </div>
    )}

      <>
      <Router>
      <AuthProvider>
 
        <Routes> 
          <Route path="/" element={<ProtectedRoute>
            <Login/>
            
            
            </ProtectedRoute>} />
          <Route path="/home" element={<PrivateRoute>

            <Home />
            
            </PrivateRoute>}
            />
        </Routes>
      </AuthProvider>
      </Router>
      </>
      
      
    </div>
  );
}

export default App;