import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import News from "./pages/News"
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Fitness from "./pages/Fitness";
import Aibot from "./pages/Aibot";
import ExerciseDetail from "./pages/ExerciseDetail";
import Bmi from "./pages/Bmi";
import Games from "./pages/Games";
import Memory from "./components/games/memory";
import Catch from "./components/games/Catch";
import Tracker from "./pages/Tracker";
import "./index.css"
import { useUser } from "@clerk/clerk-react";
import { useAuthStore } from "./context/store";
import AdminDashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Profile from './pages/admin/Profile'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from "./components/Layout";



import theme from "./theme";

function App() {
  const { isLoaded, user } = useUser()
  const { setUser } = useAuthStore()
  
  if (isLoaded && user) {
    setUser(user, user.publicMetadata?.role)
  }

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Fitness" element={<Fitness />} />
       
          <Route path="/Bmi" element={<Bmi />} />
          <Route path="/Fitness/exercise/:id" element={<ExerciseDetail />} />
          <Route path="/Aibot" element={<Aibot />} />
          <Route path="/Games" element={<Games />} />
          <Route path="/Memory" element={<Memory />} />
          <Route path="/Catch" element={<Catch />} />
          <Route path="/Tracker/*" element={<ProtectedRoute><Tracker /></ProtectedRoute>} />
          <Route path="/login" element={!user ? <Login /> : ""} />
          <Route path="/admin-dashboard/*" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/profile/*" element={user ? <Profile /> : <Navigate to={'/'} />} />
        </Routes>
      </Layout>
    </ChakraProvider>

  );
}

export default App;
