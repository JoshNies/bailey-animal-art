import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from './components/MyContext'
import Routes from './components/Routes'
import './App.scss'

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </Provider>
  )
}

export default App
