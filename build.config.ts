import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/temp/index'
  ],
  rollup: {
    emitCJS: true
  },
  declaration: true
})
