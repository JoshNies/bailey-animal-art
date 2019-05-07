import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from './components/MyContext'
import Routes from './components/Routes'
import HttpsRedirect from 'react-https-redirect'
import './App.scss'

function App() {
  return (
    <Provider>
      <HttpsRedirect>
        <BrowserRouter>
          <Routes/>
        </BrowserRouter>
      </HttpsRedirect>
    </Provider>
  )
}

export default App
