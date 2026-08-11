import './App.css'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Login from './components/Login'
import Register from './components/Register'
import HomePage from './components/HomePage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
      <Switch>
        <ProtectedRoute path="/" exact>
          <HomePage />
        </ProtectedRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch></>

  )
}

export default App
