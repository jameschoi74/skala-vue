<script setup>
import { ref } from 'vue'

// [요구사항 5] 교재 기본 데이터(서울/수원/부산) 대신 직접 구성.
// icon / humidity / wind 필드를 추가해 카드에 함께 노출한다.
const weatherList = ref([
  { id: 'city_01', name: '제주', temp: 29, status: '맑음', icon: '☀️', humidity: 68, wind: 3.2 },
  { id: 'city_02', name: '대전', temp: 27, status: '소나기', icon: '🌦️', humidity: 80, wind: 2.4 },
  {
    id: 'city_03',
    name: '강릉',
    temp: 26,
    status: '구름많음',
    icon: '⛅',
    humidity: 55,
    wind: 4.1,
  },
  { id: 'city_04', name: '춘천', temp: 23, status: '흐림', icon: '☁️', humidity: 62, wind: 1.8 },
  { id: 'city_05', name: '속초', temp: 21, status: '비', icon: '🌧️', humidity: 88, wind: 5.6 },
])

// [요구사항 3] 한글 IME 조합 중에도 값이 반영되도록 v-model 대신 :value + @input 사용
const keyword = ref('')
const onSearchInput = (e) => {
  keyword.value = e.target.value
}

// 검색어로 목록 필터링 (다음 장에서 computed로 개선 예정)
const filteredList = () => weatherList.value.filter((city) => city.name.includes(keyword.value))

// 받침(종성) 유무에 따라 주격 조사 이/가를 고른다.
// 한글 음절은 U+AC00부터 28개 종성 단위로 배열되므로,
// (코드 - 0xAC00) % 28 이 0이면 받침이 없다. (예: 제주 -> 가, 대전 -> 이)
const withSubjectParticle = (word) => {
  const lastCode = word.charCodeAt(word.length - 1)
  const isHangul = lastCode >= 0xac00 && lastCode <= 0xd7a3
  if (!isHangul) return `${word}가`
  return word + ((lastCode - 0xac00) % 28 !== 0 ? '이' : '가')
}

// [요구사항 4] 카드 클릭 시 상태바 갱신
const statusMessage = ref('도시를 선택해 주세요.')
const selectCity = (cityName) => {
  statusMessage.value = `${withSubjectParticle(cityName)} 선택되었습니다.`
}

// [요구사항 4] 상세보기는 버블링 차단(@click.stop) 후 alert
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="weather-mockup">
    <h2>날씨 목업 (Weather Mockup)</h2>

    <!-- [요구사항 3] :value + @input 양방향 바인딩 -->
    <div class="search-bar">
      <input
        type="text"
        :value="keyword"
        @input="onSearchInput"
        placeholder="도시 이름을 한글로 검색하세요"
      />
      <p class="echo">
        입력한 도시명: <strong>{{ keyword }}</strong>
      </p>
    </div>

    <!-- [요구사항 4] 카드 클릭 결과를 보여주는 상태바 -->
    <p class="status-bar">{{ statusMessage }}</p>

    <!-- [요구사항 1] v-for 배열 렌더링 + :key에 id 바인딩 -->
    <ul class="card-list">
      <li v-for="city in filteredList()" :key="city.id" class="card" @click="selectCity(city.name)">
        <div class="card-head">
          <span class="icon">{{ city.icon }}</span>
          <span class="name">{{ city.name }}</span>
          <span class="temp">{{ city.temp }}°C</span>
        </div>

        <p class="status">{{ city.status }}</p>

        <!-- [요구사항 5] 추가 데이터 -->
        <p class="detail">습도 {{ city.humidity }}% · 풍속 {{ city.wind }}m/s</p>

        <!-- [요구사항 2] v-if / v-else 조건부 렌더링 -->
        <p v-if="city.temp >= 25" class="label hot">🔥 더움 (25도 이상)</p>
        <p v-else class="label cool">❄️ 선선함 (25도 미만)</p>

        <!-- [요구사항 4] .stop으로 카드 클릭 이벤트로의 버블링 차단 -->
        <button class="detail-btn" @click.stop="showDetail(city.name, city.status)">
          상세보기
        </button>
      </li>
    </ul>

    <p v-if="filteredList().length === 0" class="empty">검색 결과가 없습니다.</p>
  </div>
</template>

<style scoped>
.weather-mockup {
  max-width: 900px;
}

.search-bar input {
  padding: 8px 12px;
  font-size: 15px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  width: 260px;
}

.echo {
  margin-top: 6px;
  font-size: 14px;
}

.status-bar {
  margin: 12px 0;
  padding: 10px 14px;
  background-color: var(--color-background-mute);
  border-left: 4px solid #42b983;
  border-radius: 4px;
  font-size: 14px;
}

.card-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}

.card {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 14px;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.card:hover {
  border-color: #42b983;
}

.card-head {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 24px;
}

.name {
  font-size: 17px;
  font-weight: bold;
}

.temp {
  margin-left: auto;
  font-size: 17px;
}

.status,
.detail {
  margin-top: 6px;
  font-size: 14px;
}

.label {
  margin: 10px 0;
  font-size: 14px;
  font-weight: bold;
}

.hot {
  color: #e17055;
}

.cool {
  color: #0984e3;
}

.detail-btn {
  padding: 6px 12px;
  font-size: 13px;
  border: 1px solid #42b983;
  border-radius: 5px;
  background: transparent;
  color: #42b983;
  cursor: pointer;
}

.detail-btn:hover {
  background-color: #42b983;
  color: #fff;
}

.empty {
  margin-top: 12px;
  font-size: 14px;
}
</style>
