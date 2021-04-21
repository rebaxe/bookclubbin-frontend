import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App.js'
import { createMuiTheme, MuiThemeProvider, ThemeProvider } from '@material-ui/core/styles'

const theme =  createMuiTheme({
    palette: {
      primary: {
        main: '#D8A31A'
      }
    }
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MuiThemeProvider>,
  document.getElementById('root')
)
