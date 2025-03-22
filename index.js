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
app.get('/blog', async (req, res) => {
  const files = await fs.readdir('./posts')

  const posts = await Promise.all(
    files.map(async (file) => {
      const fileContent = await fs.readFile(`./posts/${file}`, 'utf-8')
      const metadata = extractMetadata(fileContent)
      return { metadata, filename: file }
    })
  ) 
  res.json(posts)
})

