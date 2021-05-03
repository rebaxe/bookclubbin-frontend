import {
  Box, Paper, TextField, Typography, Stepper, Step,
  StepLabel, Button, Chip, Avatar, CircularProgress,
} from '@material-ui/core'
import { React, useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  ArrowForward, ArrowBack, PersonAdd,
} from '@material-ui/icons'
import axios from 'axios'
import { Autocomplete } from '@material-ui/lab'
import { UserContext } from '../../UserContext'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(3, 2),
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  clubContainer: {
    border: '2px solid #D8A327',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    gap: theme.spacing(1),
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: '1',
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
}))

function getSteps() {
  return ['Name the club', 'Add some friends', 'Confirm']
}

const CreateClub = () => {
  const classes = useStyles()
  const [user] = useContext(UserContext)
  const [members, setMembers] = useState([user])
  const [newMember, setNewMember] = useState('')
  const [clubName, setClubName] = useState('')
  const [activeStep, setActiveStep] = useState(0)
  const [matchingUsers, setMatchingUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    if (activeStep === 2) {
      createClub()
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const createClub = async () => {
    setIsLoading(true)
    const URL = process.env.REACT_APP_REGISTER_CLUB
    const invitedMemberIDs = []
    const invitedMembers = members.filter((member) => member.id !== user.id)
    invitedMembers.forEach((member) => invitedMemberIDs.push(member.id))
    const res = await axios({
      method: 'post',
      url: URL,
      data: {
        clubname: clubName,
        firstMember: user.id,
        invitedMembers: invitedMemberIDs,
        members: user.id,
      },
    })
    console.log(res.status)
    setIsLoading(false)
  }

  const handleDelete = (memberToRemove) => {
    setMembers(members.filter((member) => member !== memberToRemove))
  }

  const searchForMatchingUsers = async (string) => {
    if (string !== '' || !string) {
      const URL = process.env.REACT_APP_SEARCH_USERS
      const response = await axios.get(URL, {
        params: { searchString: string },
      })
      const users = []
      let isMember = false
      response.data.forEach((resUser) => {
        isMember = false
        if (resUser.id === user.id) {
          isMember = true
        } else if (members.length < 1) {
          users.push(resUser)
        } else {
          members.forEach((member) => {
            console.log(member)
            console.log(resUser)
            console.log(user)
            if (member.id === resUser.id) {
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

  const addNewMember = () => {
    setMembers([...members, newMember])
    setNewMember(null)
    setMatchingUsers([])
  }

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Box className={classes.formContainer}>
            <Typography variant="body1">First - what&apos;s the name of your brand new amazingly cool club?</Typography>
            <TextField variant="outlined" size="small" fullWidth value={clubName} onChange={((e) => { setClubName(e.target.value) })} />
          </Box>
        )
      case 1:
        return (
          <Box className={classes.formContainer}>
            <Typography variant="body1">Now - invite some booklovin&apos; friends to join the club.</Typography>
            <Box className={classes.flexRow} width={1}>
              <Autocomplete
                fullWidth
                freeSolo
                autoComplete
                autoHighlight
                options={matchingUsers}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={((e) => {
                      searchForMatchingUsers(e.target.value)
                    })}
                    variant="outlined"
                    size="small"
                    fullWidth
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
              <Button variant="contained" color="primary" disabled={!newMember} onClick={addNewMember}>
                <PersonAdd />
              </Button>
            </Box>
            <Box className={classes.flexRow}>
              {members.map((member) => (
                (member.id === user.id
                  ? (
                    <Chip
                      key={member.id}
                      avatar={<Avatar src={member.image} />}
                      label="You"
                      // label={member.username}
                      variant="outlined"
                    />
                  ) : (
                    <Chip
                      key={member.id}
                      avatar={<Avatar src={member.image} />}
                      label={member.username}
                      onDelete={(() => { handleDelete(member) })}
                      variant="outlined"
                    />
                  )
                )
              ))}
            </Box>
          </Box>
        )
      case 2:
        return (
          <Box className={classes.formContainer}>
            <Typography variant="body1">Just a double check - is this the right name and the friends you want to invite?</Typography>
            <Box className={classes.clubContainer} width={1}>
              <Typography variant="h6">{clubName}</Typography>
              <Typography variant="body2">with</Typography>
              <Box className={classes.flexRow}>
                {members.map((member) => (
                  (member.id === user.id
                    ? (
                      <Chip
                        key={member.id}
                        avatar={<Avatar src={member.image} />}
                        label="You"
                        // label={member.username}
                        variant="outlined"
                      />
                    ) : (
                      <Chip
                        key={member.id}
                        avatar={<Avatar src={member.image} />}
                        label={member.username}
                        variant="outlined"
                      />
                    )
                  )
                ))}
              </Box>
            </Box>
          </Box>
        )
      default:
        return 'Unknown stepIndex'
    }
  }

  return (
    <Box className={classes.container} width={1}>
      <Box width={0.5}>
        <Paper className={classes.paper}>
          <Typography variant="h5">Start a new book club</Typography>
          <div>
            {activeStep === steps.length ? (
              <div>
                {isLoading
                  ? <CircularProgress color="primary" />
                  : (
                    <Typography className={classes.instructions}>
                      You&apos;ve just started a book club!
                    </Typography>
                  )}
                {/* <Button onClick={handleReset}>Reset</Button> */}
              </div>
            ) : (
              <div className={classes.formContainer}>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
                <div className={classes.flexRow}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    <ArrowBack />
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext} disabled={(activeStep === 1 && members.length === 0) || (activeStep === 0 && clubName === '')}>
                    {activeStep === steps.length - 1 ? 'Submit' : <ArrowForward />}
                  </Button>
                </div>
              </div>
            )}
          </div>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </Box>
    </Box>
  )
}

export default CreateClub
