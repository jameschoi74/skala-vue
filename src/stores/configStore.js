import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 212p) 날씨 표시 단위를 앱 전역에서 관리하는 설정 스토어.
export const useConfigStore = defineStore('config', () => {
  // state — 단위를 저장하는 변수 (초기값: celsius)
  const unit = ref('celsius')

  // getters — 현재 단위 상태에 맞는 기호
  const unitSymbol = computed(() => (unit.value === 'celsius' ? '℃' : '℉'))

  // getters(추가) — 섭씨 원본값을 현재 단위로 환산해 주는 변환기.
  // 교재는 각 컴포넌트마다 displayTemp computed를 두어 변환식이 중복되는 문제를
  // Composable로 풀 수 있다고 안내(범위 제외)하는데,
  // 함수를 반환하는 getter를 두면 스토어 안에서 한 번만 정의하고 재사용할 수 있다.
  const convertTemp = computed(() => {
    return (celsius) => (unit.value === 'fahrenheit' ? Math.round((celsius * 9) / 5 + 32) : celsius)
  })

  // actions — 'celsius'와 'fahrenheit'를 토글(스위칭)하는 함수
  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  return { unit, unitSymbol, convertTemp, toggleUnit }
})
