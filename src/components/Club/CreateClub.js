import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useState } from 'react'

const CreateClub = (props) => {
  const { open, handleClose } = props
  const [member, setMember] = useState('')

  const handleInput = (e) => {
    console.log(e.target.value)
  }

  return ( 
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Start a book club</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To start bookclubbin' - give your club a punchy name and add some book loving friends!
        </DialogContentText>
        <TextField
          autoComplete="off"
          variant="outlined"
          margin="dense"
          id="name"
          label="The name of the club"
          fullWidth
          required
        />
        <Autocomplete
          //freeSolo
          id="member-input"
          disableClearable
          options={users.map((user) => user.name )}
          noOptionsText={'Your friend is not on BookClubbin\'.'}
          renderInput={(params) => (
            <TextField
              {...params}
              value={member}
              margin="dense"
              variant="outlined"
              label="Friend you want to add"
              fullWidth
              required
              InputProps={{...params.InputProps, type: 'search'}}
              //onChange={(e) => {handleInput(e.target.value)}}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog> 
  )
}

const users = [
  { name: 'Rebecca' },
  { name: 'Joel' },
  { name: 'Katta' }
]

export default CreateClub