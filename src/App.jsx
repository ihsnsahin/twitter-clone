import './App.css'
import { Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Login from './components/Login'
import Register from './components/Register'
import HomePage from './components/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import TweetPage from './components/TweetPage'
import ProfilPage from './components/ProfilPage'

function App() {
  return (
    <Switch>
      <ProtectedRoute path="/" exact>
        <HomePage />
      </ProtectedRoute>
      <GuestRoute path="/login">
        <Login />
      </GuestRoute>
      <GuestRoute path="/register">
        <Register />
      </GuestRoute>
      <ProtectedRoute path="/tweet/:id">
        <TweetPage />
      </ProtectedRoute>
      <ProtectedRoute path="/profile/:id">
        <ProfilPage />
      </ProtectedRoute>
    </Switch>
  )
}

export default App
