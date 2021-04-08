import { Card, CardContent, CardMedia, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import Visibility from '@material-ui/icons/Visibility'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    margin: '20px',
    padding: '10px'
  },
  view: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  btn: {
    padding: 5
  }
}))

const BookPreview = (props) => {
  const classes = useStyles()
  const book = props.book
  //const book = {
  //  title: 'Where the Crawdads Sing',
  //  authors: [ 'Delia Owens' ],
  //  description: `#1 NEW YORK TIMES BESTSELLING PHENOMENON More than 6 million copies sold A Reese Witherspoon x Hello Sunshine Book Club Pick A Business Insider Defining Book of the Decade "I can't even express how much I love this book! I didn't want this story to end!"--Reese Witherspoon "Painfully beautiful."--The New York Times Book Review For years, rumors of the "Marsh Girl" have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not what they say. Sensitive and intelligent, she has survived for years alone in the marsh that she calls home, finding friends in the gulls and lessons in the sand. Then the time comes when she yearns to be touched and loved. When two young men from town become intrigued by her wild beauty, Kya opens herself to a new life--until the unthinkable happens. Where the Crawdads Sing is at once an exquisite ode to the natural world, a heartbreaking coming-of-age story, and a surprising tale of possible murder. Owens reminds us that we are forever shaped by the children we once were, and that we are all subject to the beautiful and violent secrets that nature keeps.`,
  //  publishedDate: '2018-08-14',
  //  pages: 384,
  //  image: 'http://books.google.com/books/content?id=CGVDDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  //  googleRating: 4,
  //  googleId: 'CGVDDwAAQBAJ'
  //}
  return ( 
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
        maxHeight: "200px",
        margin: '10px'
      }}
      component="img"
      image={ book.image }
      />
      </div>
      <CardContent>
        <Typography variant="h6">{ book.title }</Typography>
        <Typography variant="h6">by { book.authors }</Typography>
        <Typography variant="body2">{ book?.description?.substring(0, 200) }...</Typography>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
          marginTop: 15
        }}>
          <Typography variant="subtitle2">Rating: { book.googleRating }</Typography>
          <Typography variant="subtitle2">Pages: { book.pages }</Typography>
        </div>
        <div className={classes.view}>
          <IconButton className={classes.btn}>
            <Visibility />
          </IconButton>
        </div>
      </CardContent>
    </Card>
   );
}
 
export default BookPreview;