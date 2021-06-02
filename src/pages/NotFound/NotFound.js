import { makeStyles, Typography } from '@material-ui/core'
import { ReactComponent as NotFoundImg } from './images/404.svg'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    height: '90%',
  },
  text: {
    fontFamily: 'Orelega One',
    color: 'white',
    fontSize: '2.5rem',
  },
}))

const NotFound = () => {
  const classes = useStyles()

  return (
    <div id="notFoundContainer" width={1} className={classes.container}>
      <NotFoundImg />
      <Typography className={classes.text}>404 - Not Found</Typography>
    </div>
  )
}

export default NotFound
