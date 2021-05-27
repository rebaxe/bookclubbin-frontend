import { makeStyles } from '@material-ui/core'
import { ReactComponent as Reader } from './images/reader.svg'

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

const Home = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Reader />
    </div>
  )
}

export default Home
