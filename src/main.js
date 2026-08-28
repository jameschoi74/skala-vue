import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 236p) Element Plus 모듈 및 필수 CSS Import
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 249p) Element Plus 다크 테마 변수.
// 앱의 base.css가 prefers-color-scheme로 다크를 쓰므로, 두 테마를 일치시킨다.
import 'element-plus/theme-chalk/dark/css-vars.css'

// Element Plus는 <html class="dark">가 있을 때만 다크 변수를 적용한다.
// OS 설정을 따라가도록 클래스를 동기화한다.
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
const syncTheme = (isDark) => document.documentElement.classList.toggle('dark', isDark)
syncTheme(darkQuery.matches)
darkQuery.addEventListener('change', (e) => syncTheme(e.matches))

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus) // 236p) Vue 앱에 Element Plus 사용 등록

app.mount('#app')
