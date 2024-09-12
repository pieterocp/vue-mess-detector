import type { SFCScriptBlock } from '@vue/compiler-sfc'

import type { FileCheckResult, Offense } from '../../types'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const checkNoPropDestructure = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  // eslint-disable-next-line regexp/no-super-linear-backtracking
  const regex = /(?:const|let)\s*\{\s*([^}]+?)\s*\}\s*=\s*(?:defineProps|props)\s*\(\s*(?:(?:\[[^\]]*\]|\{[^}]*\})\s*)?\)/g

  const matches = script.content.match(regex)

  matches?.forEach((match) => {
    const lineNumber = getLineNumber(script.content, match)
    results.push({
      filePath,
      message: `line #${lineNumber} <bg_warn>props destructuring found: ${match}</bg_warn>`,
    })
  })
}

const reportNoPropDestructure = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ no Prop Destructure</text_info>`,
        description: `👉 <text_warn>Avoid destructuring props in the setup function. Use \`props.propName\` instead of \`const { propName } = defineProps()\`.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetNoPropDestructure = () => (results.length = 0)

export { checkNoPropDestructure, reportNoPropDestructure, resetNoPropDestructure }
