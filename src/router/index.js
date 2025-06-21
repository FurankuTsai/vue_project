import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/MainPage.vue'  // 你的主頁面
import MatchedImages from '@/components/MatchedImages.vue' // 搜尋結果頁面

const routes = [
  { path: '/', name: 'MainPage', component: MainPage },
  { path: '/matched-images', name: 'MatchedImages', component: MatchedImages },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
