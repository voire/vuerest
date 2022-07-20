import fs from 'fs'
import { safeWrite } from './safeWrite'

const skipArtifacts = ['index.ts', 'temp']
const composables = fs.readdirSync('./src', 'utf-8')
  .filter(filename => !skipArtifacts.includes(filename))

const exportsList = composables.reduce((list, composable) => {
  const composableName = composable.replace(/.ts$/, '')
  const exportString = `export * from '../${composableName}';`
  return `${list}${exportString}\n`
}, '')

safeWrite('./src/temp', 'index.ts', exportsList)
