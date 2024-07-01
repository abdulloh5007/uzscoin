import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Home from './pages/home/Home'
import CardDetails from './components/collection/cardDetails/CardDetails'

function App() {
  
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/card/:id' element={<CardDetails />}/>
      </Routes>
    </div>
  )
}

export default App
