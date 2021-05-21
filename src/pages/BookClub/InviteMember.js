import {
  TextField, Avatar, makeStyles, IconButton,
} from '@material-ui/core'
import { PersonAdd } from '@material-ui/icons'
import { Autocomplete } from '@material-ui/lab'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getUserByName, getBookclub, sendInvite, getBookclubs,
} from '../../api/apiCalls'
import { ClubsContext } from '../../ClubsContext'
import { UserContext } from '../../UserContext'

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: '1',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  addBtn: {
    backgroundColor: '#D8A31A',
  },
}))

const InviteMember = () => {
  const classes = useStyles()
  const { id: clubId } = useParams()
  const [user] = useContext(UserContext)
  const [matchingUsers, setMatchingUsers] = useState([])
  const [newMember, setNewMember] = useState('')
  const [clubs, setClubs] = useContext(ClubsContext)
  const [club, setClub] = useState(null)

  useEffect(() => {
    getBookclub(clubId).then((res) => setClub(res))
  }, [clubs])

  const searchForMatchingUsers = async (string) => {
    if (string !== '' || !string) {
      const res = await getUserByName(string)
      const users = []
      let isMember = false
      res.forEach((resUser) => {
        isMember = false
        if (resUser.id === user.id) {
          isMember = true
        } else {
          club.members.forEach((member) => {
            if (member.id === resUser.id) {
              isMember = true
            }
          })
          club.invitations.forEach((invite) => {
            if (invite.invitedUser === resUser.id) {
              isMember = true
            }
          })
          if (!isMember) {
            users.push(resUser)
          }
        }
      })
      setMatchingUsers(users)
    } else {
      setMatchingUsers([])
    }
  }

  const handleInvite = async () => {
    sendInvite(clubId, user.id, newMember.id)
    setNewMember('')
    setMatchingUsers([])
    const updatedClubs = await getBookclubs(user)
    setClubs(updatedClubs)
    const updatedClub = await getBookclub(clubId)
    setClub(updatedClub)
  }

  return (
    <div className={classes.formContainer}>
      <Autocomplete
        fullWidth
        freeSolo
        autoComplete
        autoHighlight
        options={matchingUsers}
        renderInput={(params) => (
          <TextField
            className={classes.root}
            {...params}
            onChange={((e) => {
              searchForMatchingUsers(e.target.value)
            })}
            variant="outlined"
            size="small"
            fullWidth
            label="Invite a friend"
          />
        )}
        getOptionLabel={(option) => (option.username ? option.username : '')}
        renderOption={(option) => (
          <>
            <div className={classes.optionContainer}>
              <Avatar src={option.image} />
              {option.username}
            </div>
          </>
        )}
        value={newMember}
        onChange={((e, value) => {
          setNewMember(value)
        })}
      />
      <IconButton className={classes.addBtn} variant="contained" disabled={!newMember} onClick={handleInvite}>
        <PersonAdd />
      </IconButton>
    </div>
  )
}

export default InviteMember
