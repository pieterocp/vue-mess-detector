import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkVforNoKey, reportVforNoKey, resetReportVForNoKey } from './vforNoKey'

describe('checkVforNoKey', () => {
  beforeEach(() => {
    resetReportVForNoKey()
  })

  it('should not report files where v-for has key property', () => {
    const script = {
      content: `<template>
      <ul>
        <li
            v-for="todo in todos"
            :key="todo.id"
        >
            {{ todo.text }}
        </li>
      </ul>
    </template>`,
    } as SFCTemplateBlock
    const fileName = 'vfor-with-key.vue'
    checkVforNoKey(script, fileName)
    expect(reportVforNoKey().length).toBe(0)
    expect(reportVforNoKey()).toStrictEqual([])
  })

  it('should report files where v-for has no key property', () => {
    const script = {
      content: `<template>
      <ul>
        <li v-for="todo in todos">
            {{ todo.text }}
        </li>
      </ul>
    </template>`,
    } as SFCTemplateBlock
    const fileName = 'vfor-no-key.vue'
    checkVforNoKey(script, fileName)
    expect(reportVforNoKey().length).toBe(1)
    expect(reportVforNoKey()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}vue-essential ~ v-for has no key${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Add a \`:key\` property to all v-for.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`,
      message: `v-for used ${BG_WARN}without a key${BG_RESET} 🚨`,
    }])
  })
})
