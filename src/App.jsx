import './App.css'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Login from './components/Login'
import Register from './components/Register'
import HomePage from './components/HomePage'

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
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
