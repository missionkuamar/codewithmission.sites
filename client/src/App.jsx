import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import AddProjectPage from './pages/AddProjectPage';
import EditProjectPage from './pages/EditProjectPage';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  const { darkMode } = useSelector((state) => state.ui);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/projects/:id" element={<ProjectDetailsPage />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add-project"
                element={
                  <PrivateRoute>
                    <AddProjectPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-project/:id"
                element={
                  <PrivateRoute>
                    <EditProjectPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </div>
  );
}

export default App;