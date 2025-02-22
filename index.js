const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
app.use(cors())
const { extractMetadata, extractContent } = require('./utils')

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/posts/:filename', (req, res) => {
  let fileContent = fs.readFileSync(__dirname + '/posts/' + req.params.filename + '.mdx', 'utf8')
  let metadata = extractMetadata(fileContent)
  let content = extractContent(fileContent)
  res.json({metadata, content})
})
app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000')
})
  

