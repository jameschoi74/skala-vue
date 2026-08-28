import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // [요구사항 1] 모든 라우트에 동적 import를 적용하여 지연 로딩(Lazy Loading) 처리.
    // 해당 경로에 처음 진입하는 순간에만 청크를 내려받는다.
    {
      path: '/',
      name: 'WeatherHome',
      component: () => import('@/views/WeatherHomeView.vue'),
    },
    {
      // [동적 세그먼트] /weather/city_01 → route.params.cityId === 'city_01'
      path: '/weather/:cityId',
      name: 'WeatherDetail',
      component: () => import('@/views/WeatherDetailView.vue'),
    },
    {
      path: '/ranking',
      name: 'WeatherRanking',
      component: () => import('@/views/WeatherRankingView.vue'),
    },
    {
      path: '/about',
      name: 'WeatherAbout',
      component: () => import('@/views/WeatherAboutView.vue'),
    },
    {
      path: '/practices',
      name: 'Practices',
      component: () => import('@/views/PracticesView.vue'),
    },
    // [요구사항 1] Catch-all Route. 반드시 목록의 가장 마지막에 배치한다.
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
