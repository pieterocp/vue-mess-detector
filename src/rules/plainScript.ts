import { BG_RESET, BG_WARN, TEXT_WARN, TEXT_RESET } from '../asceeCodes'

const plainScriptFiles: string[] = []

const checkPlainScript = (filePath: string) => {
  plainScriptFiles.push(filePath)
}

const reportPlainScript = () => {
  if (plainScriptFiles.length > 0) {
    console.log(`\n${BG_WARN}Plain <script> blocks${BG_RESET} in ${plainScriptFiles.length} files.`)
    console.log(`👉 ${TEXT_WARN} Consider using <script setup> to leverage the new SFC <script> syntax.${TEXT_RESET}`)
    plainScriptFiles.forEach(file => {
      console.log(`- ${file}`)
    })
  }
  return plainScriptFiles.length
}

export { checkPlainScript, reportPlainScript }
