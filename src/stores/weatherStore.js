import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { TARGET_CITIES } from '@/data/weatherData'
import { fetchAllWeather, hasApiKey } from '@/api/weatherApi'

// 230p) 실제 API로 받아온 날씨를 여러 View가 공유하도록 스토어로 승격.
// 대시보드와 랭킹이 각각 통신하면 같은 데이터를 두 번 받아오게 되므로
// 한 번 받아 전역에 두고 함께 쓴다.
export const useWeatherStore = defineStore('weather', () => {
  // state
  const cities = ref([])
  const isLoading = ref(false)
  const errorMessage = ref('')
  const lastUpdated = ref('')

  // getters
  const isLoaded = computed(() => cities.value.length > 0)
  const getCityById = computed(() => {
    return (cityId) => cities.value.find((city) => city.id === cityId) ?? null
  })

  // actions
  async function fetchAll(force = false) {
    if (!hasApiKey()) {
      errorMessage.value = 'VITE_OPENWEATHER_API_KEY가 없습니다. .env.example을 참고하세요.'
      return
    }
    // 이미 받아둔 데이터가 있으면 재요청하지 않는다. (화면 전환마다 호출되는 것 방지)
    if (isLoaded.value && !force) return

    isLoading.value = true
    errorMessage.value = ''
    try {
      const { cities: fetched, failed } = await fetchAllWeather(TARGET_CITIES)
      cities.value = fetched
      lastUpdated.value = new Date().toLocaleTimeString('ko-KR')
      if (failed.length > 0) {
        errorMessage.value = `일부 도시를 불러오지 못했습니다: ${failed.join(', ')}`
      }
      console.log(`🌐 [날씨 수신] ${fetched.length}건 / 실패 ${failed.length}건`)
    } catch (error) {
      errorMessage.value = `날씨를 불러오지 못했습니다: ${error.message}`
      console.error('날씨 조회 실패:', error)
    } finally {
      isLoading.value = false
    }
  }

  return { cities, isLoading, errorMessage, lastUpdated, isLoaded, getCityById, fetchAll }
})
