import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Home from './pages/home/Home'
import CardDetails from './components/collection/cardDetails/CardDetails'
import Header from './components/header/Header'
import User from './components/user/User'
import LoginPage from './components/login/Login'

function App() {

  return (
    <div>
      <Header />
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/card/:uid' element={<CardDetails />} />
          <Route path='/user/:wallet' element={<User />}/>
          <Route path='/login' element={<LoginPage />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
