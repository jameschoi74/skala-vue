// 조회 대상 도시 목록.
// 230p 이전에는 이 파일이 목(mock) 날씨 데이터를 들고 있었지만,
// 실제 API 연동 후에는 "어느 도시를 조회할지"만 남기고
// 기온·습도 등 실측값은 OpenWeatherMap 응답으로 대체한다.
export const TARGET_CITIES = [
  { id: 'city_01', name: '제주', lat: 33.4996, lon: 126.5312 },
  { id: 'city_02', name: '대전', lat: 36.3504, lon: 127.3845 },
  { id: 'city_03', name: '강릉', lat: 37.7519, lon: 128.8761 },
  { id: 'city_04', name: '춘천', lat: 37.8813, lon: 127.73 },
  { id: 'city_05', name: '속초', lat: 38.207, lon: 128.5918 },
]

// cityId로 조회 대상 도시를 찾는다. 없으면 null.
export const findTargetById = (cityId) => TARGET_CITIES.find((city) => city.id === cityId) ?? null
