import { Card, CardContent, CardMedia, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { useState } from 'react'
import BookModal from './BookModal.js'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    height: 500,
    margin: 20,
    padding: '10px',
    position: 'relative',
  },
  view: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 5
  },
  btn: {
    padding: 5
  }
}))

const BookPreview = (props) => {
  const classes = useStyles()
  const book = props.book
  const [ openView, setOpenView ] = useState(false)

  const handleViewBook = () => {
    setOpenView(true)
  }
  const handleClose = () => {
    setOpenView(false)
  }

  return ( 
    <div>
      <Card className={classes.root}>
        <div
          style={{
            display: "flex",
            alignItem: "center",
            justifyContent: "center"
          }}
        >
        <CardMedia 
        style={{
          width: "auto",
          height: "200px",
          margin: '10px'
        }}
        component="img"
        image={ book.image }
        />
        </div>
        <CardContent>
          <Typography variant="h6">{ book.title }</Typography>
          { book.authors !== undefined && <Typography variant="h6">by { book.authors }</Typography> }
          <Typography variant="body2">{ book?.description?.substring(0, 100) }...</Typography>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10,
            marginTop: 15
          }}>
          </div>
          <div className={classes.view}>
            <IconButton className={classes.btn} onClick={handleViewBook}>
              {/*<Visibility />*/}
              <ArrowForwardIcon/>
            </IconButton>
          </div>
        </CardContent>
      </Card>
      <BookModal open={openView} book={book} handleClose={handleClose}></BookModal>
    </div>
   );
}
 
export default BookPreview;