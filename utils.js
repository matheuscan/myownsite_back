function extractMetadata(content){
    let metadata = {}
    let lines = content.split('\n')
    let isMetadata = false
    if (lines[0].includes('---')) {
      isMetadata = true
      let i = 1
      while (isMetadata) {
        if (lines[i].includes('---')) {
          isMetadata = false
          break
        }
        let parts = lines[i].split(':')
        metadata[parts[0]] = parts[1].trim()
        i++
      }
    }
    return metadata
  }
function extractContent(content){
    let lines = content.split('\n')
    let con = ""
    let returned_content = {}
    let i = 1
    if (lines[0].includes('---')) {
      isMetadata = true
      while (i < lines.length) {
        
        if (!isMetadata) {
          con += lines[i] + '\n'
        }
        if (lines[i] === '---\r') {
          isMetadata = false
          
        }
        i++
      }
    }
    returned_content.content = con
    return returned_content
  }
module.exports = { extractMetadata, extractContent }