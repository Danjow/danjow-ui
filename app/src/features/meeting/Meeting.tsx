import { useState } from 'react'
import Webcam from 'react-webcam'
import { makeStyles } from '@material-ui/core/styles'
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
      <div className={classes.presenter}>
        {sharedView()}
        <Webcam className={classes.webcam} />
      </div>
      <div>
        <button onClick={() => setMode('slide')}>slide</button>
        <button onClick={() => setMode('movie')}>movie</button>
      </div>
    </div>
  )
}
