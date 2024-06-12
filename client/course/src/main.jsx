import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider as ReduxProvider } from "react-redux"
import './index.css'
import store from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider store={store} >
    <ChakraProvider>
   <App />
   </ChakraProvider>
    </ReduxProvider>
  </React.StrictMode>,
)
