import { resolve } from 'node:path'
import { copySync, writeJSONSync } from 'fs-extra'
import { themes } from 'tm-themes'
import pkgInfo from '../package.json'

function main() {
  copySync(resolve(__dirname, '../node_modules/tm-themes/themes'), resolve(__dirname, '../dist/themes'))

  pkgInfo.contributes.themes = themes.map(theme => ({
    id: theme.name,
    label: theme.displayName,
    uiTheme: theme.type === 'dark' ? 'vs-dark' : 'vs',
    path: `./dist/themes/${theme.name}.json`,
  }))

  writeJSONSync(
    resolve(__dirname, '../package.json'),
    pkgInfo,
    {
      spaces: 2,
    },
  )
}

main()
