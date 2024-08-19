import fs from 'node:fs/promises'
import path from 'node:path'
import { parse, SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_INFO, BG_OK, BG_RESET } from './rules/asceeCodes'
import { RULESETS, type RuleSetType } from './rules/rules'
import { reportRules } from './rulesReport'
import { checkRules } from './rulesCheck'
import type { GroupBy, OrderBy } from './types'
import { calculateCodeHealth } from './helpers'

interface AnalyzeParams {
  dir: string;
  apply: Array<RuleSetType>;
  groupBy: GroupBy;
  orderBy: OrderBy;
}

let filesCount = 0
let linesCount = 0
let _apply: Array<RuleSetType> = []

const skipDirs = ['cache', 'coverage', 'dist', '.git', 'node_modules',  '.nuxt',  ]

const walkAsync = async (dir: string) => {
  const files = await fs.readdir(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    const stats = await fs.stat(filePath)
    if (stats.isDirectory()) {
      if (!skipDirs.some(dir => filePath.includes(dir))) {
        await walkAsync(filePath)
      }
    }
    else if (file.endsWith('.vue') || file.endsWith('.ts') || file.endsWith('.js')) {
      filesCount++
      const content = await fs.readFile(filePath, 'utf-8')
      linesCount += content.split(/\r\n|\r|\n/).length
      const { descriptor } = parse(content)

      // vue files has descriptor.source, descriptor.script, descriptor.styles, descriptor.template
      // ts/js files has descriptor.source only but the work for us as a script block
      if (file.endsWith('.ts') || file.endsWith('.js')) {
        descriptor.script = { content } as SFCScriptBlock
      }
      checkRules(descriptor, filePath, _apply)
    }
  }
}

export const analyze = async ({ dir, apply = [], groupBy, orderBy }: AnalyzeParams) => {
  console.log(`\n\n${BG_INFO}Analyzing Vue, TS and JS files in ${dir}${BG_RESET}`)
  const ignore = RULESETS.filter(rule => !apply.includes(rule))
  console.log(`Applying ${BG_INFO}${apply.length}${BG_RESET} rulesets ${BG_INFO}${apply}${BG_RESET}, ignoring ${BG_INFO}${ignore.length}${BG_RESET} rulesets ${BG_INFO}${ignore}${BG_RESET}, grouping by ${BG_INFO}${groupBy}${BG_RESET}, ordering ${BG_INFO}${orderBy}${BG_RESET}`)

  _apply = apply

  await walkAsync(dir)

  console.log(`Found ${BG_INFO}${filesCount}${BG_RESET} files`)

  const health = reportRules(groupBy, orderBy)
  const { errors, warnings } = calculateCodeHealth(health, linesCount, filesCount)

  if (!errors && !warnings) {
    console.log(`${BG_OK}No code smells detected!${BG_RESET}`)
  }
}
