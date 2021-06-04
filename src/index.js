import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import App from './App'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#D8A31A',
    },
  },
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MuiThemeProvider>,
  document.getElementById('root'),
)
