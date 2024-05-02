// TODO: More in-depth research is required for unit and e2e testing in Nuxt,
// especially in conjunction with Vuetify and Firebase.
// Even minor tests result in errors.
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import index from '@/pages/index.vue'

const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('ssr', async () => {
  it('tests index page', async () => {
    const wrapper = await mountSuspended(
      index,
      {
        props: {
          isGameRunning: true,
        },
        global: {
          plugins: [vuetify],
        },
      })

    expect(wrapper).toBeDefined()
    expect(wrapper.text()).toContain('Welcome to Intestellar Clash!')
    expect(wrapper.findComponent({ name: 'GameInstance' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'GameMenu' }).exists()).toBe(true)
  })
})
