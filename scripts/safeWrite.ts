import fs from 'fs'

export function safeWrite(dir: string, filename: string, content: string) {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(`${dir}/${filename}`, content, 'utf-8')
  console.log(`${filename} has been generated!`)
}
