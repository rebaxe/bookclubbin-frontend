import {
  GridList, GridListTile, makeStyles,
  Tooltip, Zoom,
} from '@material-ui/core'
import defaultCover from './images/defaultbookcover.png'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    width: '-webkit-fill-available',
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  tile: {
    height: '100%',
    width: 'auto',
    objectFit: 'cover',
    objectPosition: 'center',
  },
}))

const BookCarousel = (props) => {
  const { books } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {books.length > 1 ? (
        <GridList className={classes.gridList} cols={2.5}>
          {books.map((tile) => (
            <Tooltip TransitionComponent={Zoom} title={tile.title}>
              <GridListTile className={classes.tile} key={tile.googleId}>
                {tile.image ? (
                  <img className={classes.tile} src={tile.image} alt={tile.title} />
                ) : (
                  <img className={classes.tile} src={defaultCover} alt="Book cover" />
                )}
              </GridListTile>
            </Tooltip>
          ))}
        </GridList>
      ) : (
        <Tooltip TransitionComponent={Zoom} title={books[0].title}>
          <img src={books[0].image} alt={books[0].title} />
        </Tooltip>
      )}
    </div>
  )
}

export default BookCarousel
