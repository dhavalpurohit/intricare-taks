import marketingIcon from '@images/svg/marketing.svg?raw'
import { h } from 'vue'

export default [
  {
    title: 'Campaign',
    to: { name: 'root' },
    icon: { icon: h('div', { innerHTML: marketingIcon, style: 'line-height:0' }),  size: 20},
  },
]
