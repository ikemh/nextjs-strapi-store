// export-schemas.js
const fs = require('fs')
const path = require('path')

/**
 * Recursivamente busca por arquivos schema.json em src/api e src/components
 * e imprime seu conteúdo no console, precedido pelo caminho completo.
 */
function exportSchemas(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    if (fs.statSync(full).isDirectory()) {
      exportSchemas(full)
    } else if (name === 'schema.json') {
      console.log(`\n===== ${full} =====\n`)
      console.log(fs.readFileSync(full, 'utf8'))
    }
  }
}

const baseDirs = [
  path.join(__dirname, 'src', 'api'),
  path.join(__dirname, 'src', 'components'),
]

for (const d of baseDirs) {
  if (fs.existsSync(d)) {
    exportSchemas(d)
  }
}
