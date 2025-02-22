const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('node:fs/promises')

app.use(cors())
const { extractMetadata, extractContent } = require('./utils')

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/posts/:filename', async (req, res) => {
  let fileContent = await fs.readFile(__dirname + '/posts/' + req.params.filename + '.mdx', 'utf8')
  let metadata = extractMetadata(fileContent)
  let content = extractContent(fileContent)


  console.log({metadata, content})
  res.json({metadata, content})
})
app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000')
})
  

