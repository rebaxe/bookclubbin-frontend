import {
  Avatar,
  Box,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import { useContext } from 'react'
import { UserContext } from '../../UserContext'

const useStyles = makeStyles((theme) => ({
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    gap: theme.spacing(2),
  },
}))

const UserContainer = () => {
  const [user] = useContext(UserContext)
  const classes = useStyles()
  return (
    <Box width={0.5}>
      <Paper className={classes.userInfo}>
        <Avatar src={user.image} />
        <Typography variant="h5">{user.username}</Typography>
      </Paper>
    </Box>
  )
}

export default UserContainer
