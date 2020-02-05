import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        primary: '#ffe000',
        secondary: '#3fb5dd',
        accent: '#1d1d1b',
        error: '#f44336',
        warning: '#ff9800',
        info: '#009688',
        success: '#4caf50'
      }
    }
  }
})
