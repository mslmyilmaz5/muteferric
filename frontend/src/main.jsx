import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { PoemContextProvider } from './context/PoemContext.jsx'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV == 'production') disableReactDevTools();

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthContextProvider>
      <PoemContextProvider>
        <App />
      </PoemContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
)
