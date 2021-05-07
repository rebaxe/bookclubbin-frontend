import {
  Box,
  Button,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import {
  React,
} from 'react'

const useStyles = makeStyles((theme) => ({
  club: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    gap: theme.spacing(2),
  },
  startClub: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    gap: theme.spacing(2),
  },
  btn: {
    backgroundColor: '#D8A31A',
    color: 'white',
    padding: theme.spacing(1, 2),
    borderRadius: 20,
    transition: '0.3s ease-in-out',
    '&:hover': {
      color: '#D8A31A',
    },
  },
}))

const NoClubContainer = (props) => {
  const { handleCreateClub } = props
  const classes = useStyles()
  return (
    <Paper className={classes.club}>
      <Box className={classes.startClub}>
        <Typography>
          Looks like you&apos;re not in a book club yet &#128546;
        </Typography>
        <Button className={classes.btn} onClick={handleCreateClub}>
          Start book club
        </Button>
      </Box>
    </Paper>
  )
}

export default NoClubContainer
