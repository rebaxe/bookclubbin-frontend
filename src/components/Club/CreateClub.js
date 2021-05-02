import {
  Box, Paper, TextField, Typography, Stepper, Step, StepLabel, Button, Chip, InputAdornment,
} from '@material-ui/core'
import { React, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Face, ArrowForward, ArrowBack, PersonAdd,
} from '@material-ui/icons'

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
    gap: theme.spacing(2),
  },
  flexRow: {
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
  const [members, setMembers] = useState([])
  const [newMember, setNewMember] = useState('')
  const [clubName, setClubName] = useState('')
  const [activeStep, setActiveStep] = useState(0)
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handleDelete = (memberToRemove) => {
    setMembers(members.filter((member) => member !== memberToRemove))
  }

  const addNewMember = () => {
    setMembers([...members, newMember])
    setNewMember('')
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
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                value={newMember}
                onChange={((e) => { setNewMember(e.target.value) })}
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <PersonAdd />
                //     </InputAdornment>
                //   ),
                // }}
              />
              <Button variant="contained" color="primary" onClick={addNewMember}>
                <PersonAdd />
              </Button>
            </Box>
            <Box className={classes.flexRow}>
              {members.map((member) => (
                <Chip
                  icon={<Face />}
                  label={member}
                  onDelete={(() => { handleDelete(member) })}
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )
      case 2:
        return (
          <Box className={classes.formContainer}>
            <Typography variant="body1">Just a double check - is this the right name and the friends you want to invite?</Typography>
            <Box className={classes.clubContainer} width={1}>
              <Typography variant="subtitle1">{clubName}</Typography>
              <Box className={classes.flexRow}>
                {members.map((member) => (
                  <Chip
                    icon={<Face />}
                    label={member}
                    // onDelete={handleDelete}
                    variant="outlined"
                  />
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
                <Typography className={classes.instructions}>All steps completed</Typography>
                <Button onClick={handleReset}>Reset</Button>
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
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : <ArrowForward />}
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
