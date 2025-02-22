const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('node:fs/promises')
const { extractMetadata, extractContent } = require('./utils')

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/posts/:filename', async (req, res) => {
  let fileContent =  await fs.readFile(`./posts/${req.params.filename}.md`, 'utf-8')
  let metadata = extractMetadata(fileContent)
  let content = extractContent(fileContent)

  console.log({message: "This is the data we send", metadata, content})
  res.json({ metadata, content })
  
})
app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000')
})
  

