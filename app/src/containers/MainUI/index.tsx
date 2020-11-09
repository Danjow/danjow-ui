import React, { useState } from 'react'
import Webcam from 'react-webcam'
import { Document, pdfjs, Page } from 'react-pdf'
import { makeStyles } from '@material-ui/core/styles'
import { useTimer } from 'react-timer-hook'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

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
  slide: {
    width: 650,
  },
  slideView: {
    height: 450,
  },
  slideButton: {
    height: 50,
    textAlign: 'center',
  },
  webcam: {
    height: 200,
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
  const [base64, setBase64] = useState<string>('')
  const [numPages, setNumPages] = useState<number>(1)
  const [pages, setPages] = useState<number>(1)

  return (
    <div className={classes.container}>
      <div className={classes.timer}>
        <MyTimer />
      </div>
      <div className={classes.presenter}>
        <div className={classes.slide}>
          {base64 ? (
            <Document file={base64} onLoadSuccess={pdf => setNumPages(pdf.numPages)} className={classes.slideView}>
              <Page pageNumber={pages} />
            </Document>
          ) : (
            <input
              type="file"
              className={classes.slideView}
              onChange={e => {
                const file = e!.target!.files![0]
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                  setBase64(reader.result as string)
                }
              }}
            />
          )}
          <div className={classes.slideButton}>
            <button disabled={pages <= 1} onClick={() => setPages(pages - 1)}>
              Prev
            </button>
            <button disabled={pages >= numPages || !numPages} onClick={() => setPages(pages + 1)}>
              Next
            </button>
          </div>
        </div>
        <Webcam className={classes.webcam} />
      </div>
    </div>
  )
}
