import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // 確認路由路徑正確

const app = createApp(App)
app.use(router)  // 掛載 router
app.mount('#app')
