import { useState } from 'react'
import Webcam from 'react-webcam'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import SlideshowIcon from '@material-ui/icons/Slideshow'
import MovieIcon from '@material-ui/icons/Movie'
import { Slide } from '../../component/slide'
import { Movie } from '../../component/movie'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  presenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  webcam: {
    height: 200,
    alignSelf: 'flex-end',
  },
  modeUI: {
    marginLeft: 20,
  },
})

type Mode = 'slide' | 'movie'

export const Meeting = () => {
  const classes = useStyles()
  const [mode, setMode] = useState<Mode>('slide')
  const sharedView = () => {
    switch (mode) {
      case 'slide':
        return <Slide />
      case 'movie':
        return <Movie />
      default:
        return <Slide />
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.modeUI}>
        <IconButton onClick={() => setMode('slide')}>
          <SlideshowIcon />
        </IconButton>
        <IconButton onClick={() => setMode('movie')}>
          <MovieIcon />
        </IconButton>
      </div>
      <div className={classes.presenter}>
        {sharedView()}
        <Webcam className={classes.webcam} />
      </div>
    </div>
  )
}
