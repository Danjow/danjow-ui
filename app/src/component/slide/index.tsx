import { useState } from 'react'
import { Document, pdfjs, Page } from 'react-pdf'
import { makeStyles } from '@material-ui/core/styles'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const useStyles = makeStyles({
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
})

export const Slide = () => {
  const classes = useStyles()
  const [base64, setBase64] = useState<string>('')
  const [numPages, setNumPages] = useState<number>(1)
  const [pages, setPages] = useState<number>(1)

  return (
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
  )
}
