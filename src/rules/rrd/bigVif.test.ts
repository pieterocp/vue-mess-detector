import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'
import { checkBigVif, reportBigVif, resetBigVif } from './bigVif'

describe('checkBigVif', () => {
  beforeEach(() => {
    resetBigVif()
  })

  it('should not report files with small v-if', () => {
    const template = {
      content: `<button v-if="isReady"></button>
      <button v-if="isNotReady" />
      <div v-if="!isReady">
        Processing <span>data</span>
      </div>`,
    } as SFCTemplateBlock
    const fileName = 'bigVif.vue'
    checkBigVif(template, fileName)
    expect(reportBigVif().length).toBe(0)
    expect(reportBigVif()).toStrictEqual([])
  })

  it('should report files with big v-if', () => {
    const template = {
      content: `<div v-if="!isReady">
        Processing <span>data</span>
        <table>
            <thead>
              <tr>
                  <th>data</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in items">
                  <td>{{ item}}</td>
              </tr>
          </table>
      </div>`,
    } as SFCTemplateBlock
    const fileName = 'bigVif-problem.vue'
    checkBigVif(template, fileName)
    expect(reportBigVif().length).toBe(1)
    expect(reportBigVif()).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ big v-if</text_info>`,
      description: `👉 <text_warn>Big v-if can be moved out to its own component.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vif.html`,
      message: `line #1 <bg_warn>has a v-if with 14 lines</bg_warn> 🚨`,
    }])
  })
})
