const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('node:fs')

app.use(cors())
const { extractMetadata, extractContent } = require('./utils')

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/posts/:filename', (req, res) => {
  let fileContent =  fs.readFile(__dirname + '/posts/' + req.params.filename + '.mdx', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    if (data) {
      console.log('File content:', data)
      let metadata = extractMetadata(data)
      let content = extractContent(data)

    console.log({metadata, content})
    res.json({metadata, content})
    }
    
  })
  
})
app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000')
})
  

