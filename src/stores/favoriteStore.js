import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 212p 요구사항 4) 본인만의 추가 Store — 관심 도시 즐겨찾기.
export const useFavoriteStore = defineStore('favorite', () => {
  // state — 즐겨찾기한 도시 id 목록
  const favoriteIds = ref([])

  // getters — 즐겨찾기 개수
  const favoriteCount = computed(() => favoriteIds.value.length)

  // getters — 특정 id가 즐겨찾기인지 판별. 인자를 받아야 하므로 함수를 반환한다.
  const isFavorite = computed(() => {
    return (cityId) => favoriteIds.value.includes(cityId)
  })

  // actions — 즐겨찾기 추가/해제
  function toggleFavorite(cityId) {
    const index = favoriteIds.value.indexOf(cityId)
    if (index === -1) {
      favoriteIds.value.push(cityId)
    } else {
      favoriteIds.value.splice(index, 1)
    }
  }

  return { favoriteIds, favoriteCount, isFavorite, toggleFavorite }
})
