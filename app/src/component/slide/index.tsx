import { useState } from 'react'
import { Document, pdfjs, Page } from 'react-pdf'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import url from '@/pdf/sample.pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const useStyles = makeStyles({
  slide: {
    width: 650,
  },
  slideView: {
    height: 450,
  },
  slideUI: {
    height: 50,
    textAlign: 'center',
  },
})

export const Slide = () => {
  const classes = useStyles()
  const [numPages, setNumPages] = useState<number>(1)
  const [pages, setPages] = useState<number>(1)

  return (
    <div className={classes.slide}>
      <Document file={{ url }} onLoadSuccess={pdf => setNumPages(pdf.numPages)} className={classes.slideView}>
        <Page pageNumber={pages} />
      </Document>
      <div className={classes.slideUI}>
        <Slider
          aria-labelledby="input-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={numPages}
          value={pages}
          onChange={(_, val) => setPages(val as number)}
        />
      </div>
    </div>
  )
}
