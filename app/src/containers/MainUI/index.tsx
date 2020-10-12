import React from 'react'
import Webcam from 'react-webcam'
import Iframe from 'react-iframe'
import { makeStyles } from '@material-ui/core/styles'
import { useTimer } from 'react-timer-hook'

const url =
  'https://docs.google.com/presentation/d/e/2PACX-1vS6BgWtnYx4V_Ql9QQiunncS5mkJhViZycy4xwd5QERx3dtzS5jJv6nPJXwkkiTBFN5K8SbgQQ3bGbt/embed?start=false&loop=false&delayms=3000'

const useStyles = makeStyles({
  presenter: {
    display: 'flex',
  },
  slide: {
    width: 650,
    height: 350,
  },
  webcam: {
    height: 300,
    alignSelf: 'flex-end',
  },
  timer: {
    textAlign: 'center',
    fontSize: '50px',
  },
})

function MyTimer() {
  const classes = useStyles()
  const t = new Date()
  const expiryTimestamp = t.setSeconds(t.getSeconds() + 300)
  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      const time = new Date()
      restart(time.setSeconds(time.getSeconds() + 300))
    },
  })

  return <div className={classes.timer}>{`${minutes}:${Math.floor(seconds / 10)}${seconds % 10}`}</div>
}

export const MainUI = () => {
  const classes = useStyles()
  return (
    <div className={classes.presenter}>
      <div>
        <MyTimer />
        <Iframe className={classes.slide} title="slide" url={url} />
      </div>

      <Webcam className={classes.webcam} />
    </div>
  )
}
