import fs from 'fs'

fs.rmSync('./src/temp', { recursive: true, force: true })
console.log('Temp files have been removed!')
