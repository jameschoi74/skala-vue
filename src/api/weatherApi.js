import axios from 'axios'

// 230p) 실제 날씨 API 통신 모듈.
// 컴포넌트는 axios를 직접 부르지 않고 이 파일의 함수만 호출한다.
// 엔드포인트나 키 처리 방식이 바뀌어도 컴포넌트는 손대지 않는다.

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

// [요구사항 1] OpenWeatherMap 현재 날씨
const openWeather = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 8000,
})

// [요구사항 3] Open-Meteo — API 키가 필요 없는 다른 제공사의 예보 API
const openMeteo = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
  timeout: 8000,
})

export const hasApiKey = () => Boolean(API_KEY)

// OpenWeather 응답(JSON)을 앱이 쓰는 형태로 변환한다.
// 화면 컴포넌트가 외부 API의 응답 구조를 알 필요가 없도록 여기서 흡수한다.
const toCity = (target, data) => ({
  id: target.id,
  name: target.name,
  temp: Math.round(data.main.temp),
  status: data.weather[0].description,
  icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  humidity: data.main.humidity,
  wind: data.wind.speed,
  detail: {
    feelsLike: Math.round(data.main.feels_like),
    pressure: data.main.pressure,
    tempMin: Math.round(data.main.temp_min),
    tempMax: Math.round(data.main.temp_max),
    observedAt: new Date(data.dt * 1000).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  },
})

// [요구사항 1] 도시 한 곳의 현재 날씨
export const fetchCurrentWeather = async (target) => {
  const { data } = await openWeather.get('/weather', {
    params: { lat: target.lat, lon: target.lon, appid: API_KEY, units: 'metric', lang: 'kr' },
  })
  return toCity(target, data)
}

// 여러 도시를 동시에 조회한다. 한 곳이 실패해도 나머지는 살린다.
export const fetchAllWeather = async (targets) => {
  const results = await Promise.allSettled(targets.map((t) => fetchCurrentWeather(t)))
  const cities = []
  const failed = []
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') cities.push(result.value)
    else failed.push(targets[index].name)
  })
  return { cities, failed }
}

// [요구사항 2] OpenWeatherMap 대기오염 API 추가
const AQI_LABEL = ['', '좋음', '보통', '나쁨', '매우 나쁨', '최악']

export const fetchAirPollution = async (target) => {
  const { data } = await openWeather.get('/air_pollution', {
    params: { lat: target.lat, lon: target.lon, appid: API_KEY },
  })
  const item = data.list[0]
  return {
    aqi: item.main.aqi,
    label: AQI_LABEL[item.main.aqi] ?? '알 수 없음',
    pm10: Math.round(item.components.pm10),
    pm25: Math.round(item.components.pm2_5),
  }
}

// [요구사항 3] Open-Meteo 일별 예보 (API 키 불필요)
export const fetchDailyForecast = async (target, days = 4) => {
  const { data } = await openMeteo.get('/forecast', {
    params: {
      latitude: target.lat,
      longitude: target.lon,
      daily: 'temperature_2m_max,temperature_2m_min',
      timezone: 'Asia/Seoul',
      forecast_days: days,
    },
  })
  return data.daily.time.map((date, index) => ({
    date,
    max: Math.round(data.daily.temperature_2m_max[index]),
    min: Math.round(data.daily.temperature_2m_min[index]),
  }))
}
