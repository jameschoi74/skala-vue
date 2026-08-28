# skala-vue

> 배포: https://skala-vue-lovat.vercel.app/

Full-Stack Engineering — Frontend Framework: Vue.js 교육과정 실습

교재의 Code Challenge / Hands on을 진행하면서 작성한 코드와, **개인별 Customization 내역**을 단원별로 기록.

---

## 실행 방법

```sh
npm install
```

```sh
npm run dev
```

```sh
npm run build
```

```sh
npm run lint
```

---

## 폴더 구조

```
src/
├── main.js                     진입점 (createApp / Pinia / Router 등록)
├── App.vue                     라우터 셸 — 네비게이션 바 + <RouterView />
├── router/
│   └── index.js                라우트 정의 (지연 로딩 + Catch-all)
├── api/
│   └── weatherApi.js           외부 API 통신 계층 (OpenWeatherMap / Open-Meteo)
├── data/
│   └── weatherData.js          조회 대상 도시 목록 (id·이름·위경도)
├── stores/
│   ├── counter.js              211p 챌린지용 카운터 스토어
│   ├── configStore.js          날씨 표시 단위 (섭씨/화씨) 전역 설정
│   ├── favoriteStore.js        관심 도시 즐겨찾기 (추가 Store)
│   └── weatherStore.js         API로 받아온 날씨 목록 (뷰 간 공유)
├── assets/
│   ├── base.css / main.css     전역 스타일 + 실습용 공용 클래스
│   └── challenge.css           114p 외부 CSS 실습용
├── views/                      페이지 단위 컴포넌트 (RouterView에 직접 매핑)
│   ├── WeatherHomeView.vue     메인 대시보드
│   ├── WeatherDetailView.vue   :cityId 동적 상세 페이지
│   ├── WeatherRankingView.vue  도시 랭킹 (추가 View)
│   ├── WeatherAboutView.vue    서비스 소개
│   ├── NotFoundView.vue        Catch-all 404
│   └── PracticesView.vue       교재 예제 확인용
└── components/
    ├── exercise/               Hands on 과제 컴포넌트
    └── practices/              Code Challenge 예제 (basic / directive /
                                event / form / style / composition / component)
```

프로젝트 루트의 환경변수 파일:

| 파일              | 로드 시점                      | 커밋 여부                            |
| ----------------- | ------------------------------ | ------------------------------------ |
| `.env.example`    | (템플릿)                       | ✅                                   |
| `.env.local`      | 모든 모드                      | ❌ gitignore — OpenWeatherMap API 키 |
| `.env.staging`    | `vite build --mode staging`    | ✅                                   |
| `.env.production` | `vite build` (기본 production) | ✅                                   |

실행 전 `.env.example`을 `.env.local`로 복사하고 OpenWeatherMap API 키를 채워 넣는다.

### `practices` 와 `exercise` 분리 원칙

- **`practices/`** — 교재 슬라이드 예제를 따라 친 학습용 코드. 자기완결적이라 **폴더째 삭제해도 앱이 동작**한다. 삭제 시 `views/PracticesView.vue`와 라우터의 `/practices` 항목을 함께 제거한다.
- **`exercise/`** — Hands on 과제 결과물. 실제 앱을 구성하는 코드.

---

## 진행 현황

| 슬라이드 | 구분           | 주제                            | 상태 |
| -------- | -------------- | ------------------------------- | ---- |
| 72p      | Code Challenge | 학습환경 구성                   | ✅   |
| 93p      | Code Challenge | Vue Directive                   | ✅   |
| 105p     | Code Challenge | Event Handling                  | ✅   |
| 115p     | Code Challenge | Form Handling & Style           | ✅   |
| 116p     | **Hands on**   | Weather Mockup                  | ✅   |
| 126p     | Code Challenge | Reactive State                  | ✅   |
| 144p     | Code Challenge | Computed & Watchers             | ✅   |
| 145p     | **Hands on**   | Weather Composition             | ✅   |
| 155p     | Code Challenge | Component Lifecycle             | ✅   |
| 172p     | Code Challenge | Props & Emits                   | ✅   |
| 177p     | Code Challenge | Component Slot                  | ✅   |
| 178p     | **Hands on**   | Weather Component               | ✅   |
| 196p     | **Hands on**   | Weather Router                  | ✅   |
| 211p     | Code Challenge | Pinia Store                     | ✅   |
| 212p     | **Hands on**   | Weather Store                   | ✅   |
| 229p     | Code Challenge | Axios                           | ✅   |
| 230p     | **Hands on**   | Weather Axios                   | ✅   |
| 246~248p | Code Challenge | Element Plus                    | ✅   |
| 249p     | **Hands on**   | Weather UI Library              | ✅   |
| 270~273p | Code Challenge | ESLint / Prettier / env / build | ✅   |
| 274p     | **Hands on**   | Weather Deployment              | ✅   |

---

## 단원별 실습 기록 및 Customization

### 72p — 학습환경 구성

`practices/basic/` : `SampleOne.vue`, `SampleTwo.vue`

- 교재는 컴포넌트 위치를 지정하지 않아, 이후 단원까지 고려해 `components/practices/` 아래를 **주제별 하위 폴더로 분류**하는 규칙을 정했다.

### 93p — Vue Directive

`practices/directive/` : `VHtmlText`, `VBind`, `VIfShow`, `VFor`, `VMisc`

- 슬라이드 예제 14개를 **주제 단위 5개 컴포넌트로 통합**했다. (교재는 예제 1개당 파일 1개 구조)
- **74p / 76p `{{}}` 처리** — 교재 원문의 빈 보간 `{{}}`는 컴파일은 되지만 `toDisplayString()`이 빈 문자열을 반환해 **화면에서 중괄호가 사라진다**. 슬라이드 의도대로 표시되도록 해당 `<h3>`에 `v-pre`를 붙였다.
- `main.css`에 `.practice-section` 공용 스타일을 추가하고, create-vue 기본값인 `#app` 2단 그리드를 **1단으로 override**했다. (실습 화면이 좌우로 쪼개지는 문제)

### 105p — Event Handling

`practices/event/` : `VOnBasic`, `EventObject`, `EventModifier`

- 교재 원문 유지. `.once` / `.self`는 101p 표에만 있고 예제가 없어 추가하지 않았다.

### 115p — Form Handling & Style

`practices/form/` : `VModelBasic`, `FormElements`, `VModelModifiers`
`practices/style/` : `VueStyle`

- **`assets/challenge.css` 직접 작성** — 114p가 `@import '@/assets/challenge.css'`로 참조하는 외부 CSS를 버튼 스타일로 직접 정의했다.
- **`[v-cloak]` 규칙을 전역 CSS로 이동** — 90p는 `<style scoped>` 안에 두지만, scoped는 `[v-cloak][data-v-*]`로 컴파일되고 `data-v-*`는 **렌더링 이후에 붙기 때문에** "로딩 전에 숨긴다"는 목적이 성립하지 않는다. `main.css`로 옮기고 이유를 주석으로 남겼다.

### 116p — Hands on: Weather Mockup

`exercise/WeatherMockup.vue`

- **데이터 교체** — 교재의 서울/수원/부산 3개 → 제주·대전·강릉·춘천·속초 5개. 25도 기준 분기가 양쪽 다 보이도록 기온을 배치했다.
- **필드 추가** — `icon`, `humidity`, `wind`를 추가하고 카드에 노출했다.
- **검색 필터링 추가** — 요구사항은 검색어 출력까지지만, 입력에 따라 목록이 걸러지도록 확장했다.
- **한글 조사 자동 처리** — 교재의 `{도시}이 선택되었습니다` 고정 문구 대신, 받침 유무에 따라 `이/가`를 계산한다. 한글 음절이 U+AC00부터 종성 28개 단위로 배열되는 성질을 이용해 `(코드 - 0xAC00) % 28`로 판정한다. (제주가 / 대전이)

### 126p — Reactive State

`practices/composition/` : `RefState`, `ReactiveState`

- 교재 원문 유지.

### 144p — Computed & Watchers

`practices/composition/` : `ComputedBasic`, `WatchBasic`, `WatchMultiSource`, `WatchDeep`, `WatchReactive`, `WatchEffectBasic`

- `main.css`에 `.monitor` 공용 스타일 추가. (교재 예제가 사용하지만 CSS 정의가 없음)

### 145p — Hands on: Weather Composition

`exercise/WeatherComposition.vue`

- 116p의 `filteredList()` 함수 호출을 **`computed`로 전환**. 정렬 옵션만 바꿨을 때 필터가 재실행되지 않는 것으로 캐싱 동작을 확인했다.
- **추가 반응형 상태** — `sortKey` (정렬 기준)
- **추가 computed** — `sortedWeatherList` (기온·습도 정렬), `weatherStats` (평균 기온 / 더운 도시 수)
- **추가 Watcher** — `watch([searchQuery, sortKey], ...)` Multi-Source 감시
- 정렬 시 `[...filteredWeatherList.value]`로 **복사 후 정렬**한다. `.sort()`는 제자리 정렬이라 복사하지 않으면 원본 순서가 영구히 훼손된다.

### 155p — Component Lifecycle

`practices/component/` : `LifecycleChild`, `LifecycleParent`

- **`<template>` 직접 작성** — 154p의 훅 코드에 맞춰 화면 영역을 직접 구성했다.
- `onUnmounted`를 관찰하려면 컴포넌트를 파괴할 주체가 필요해 **부모/자식 2개 파일로 분리**하고, 부모에 `v-if` 토글을 두었다.
- `onUpdated` 확인을 위해 3초 타이머와 별개로 **수동 +1 버튼**을 추가했다.

### 172p — Props & Emits

`practices/component/` : `PropsEmitsParent`, `PropsEmitsChild`

- `.parent-container` / `.child-container` 스타일 직접 작성. (교재에 CSS 없음 — 계층이 눈에 보이도록 테두리 처리)

### 177p — Component Slot

`practices/component/` : `SlotDefault*`, `SlotNamed*`, `SlotScoped*` (부모/자식 6개)

- `main.css`에 `.base-card`, `.display-panel` 추가. 세 자식 컴포넌트가 `.base-card`를 공유하므로 scoped 중복 정의 대신 공용으로 뺐다.

### 178p — Hands on: Weather Component

`exercise/` : `WeatherParent`, `BaseDashboardCard`, `SearchBar`, `WeatherCard`, `SortSelector`, `WeatherStats`

- 요구사항 4개 컴포넌트에 더해 **`SortSelector`, `WeatherStats`를 추가 분리**했다. (요구사항 7)
- 6개 파일 모두 `<style scoped>`로 디자인을 격리했다.

### 196p — Hands on: Weather Router

`router/index.js`, `App.vue`, `views/` 6개

- **`data/weatherData.js` 공용 모듈 분리** — 교재 폴더 트리에는 없지만, 목록 뷰와 상세 뷰가 같은 데이터를 참조해야 하므로 배열 중복 선언을 피했다. 추후 Axios 연동 시 이 파일만 교체하면 된다.
- **`WeatherRankingView.vue` 추가** — 기온·습도·풍속 기준으로 도시 순위를 보는 페이지. 항목 클릭 시 `router.push({ name, params })` 이름 기반 이동을 사용한다. (요구사항 6)
- **`PracticesView.vue` 추가** — App.vue가 라우터 셸이 되면서 교재 예제 확인 경로가 사라져, `/practices`에 별도 페이지를 두었다.
- **create-vue 기본 파일 정리** — 라우터 재작성으로 진입점이 끊긴 `HomeView`, `AboutView`, `HelloWorld`, `TheWelcome`, `WelcomeItem`, `icons/` (총 10개 파일)를 삭제했다.

### 211p — Pinia Store

`practices/library/StoreCounter.vue`

- **Step 1(main.js 등록), Step 2(stores/counter.js)는 create-vue 기본 생성물이 203p 설명과 동일**해서 그대로 사용했다. (`count` state / `doubleCount` getter / `increment` action / `return`)
- Step 3만 신규 작성. 교재가 지정한 경로 `components/practices/library/`를 그대로 따랐다.
- **전역 공유 검증** — `<StoreCounter />`를 2개 배치하고 한쪽 버튼만 3번 눌렀더니 양쪽 모두 `state=3 / getters=6`으로 동기화됐다. 72p 실습에서 `SampleOne`을 2개 배치했을 때 각 인스턴스가 독립된 카운터를 가졌던 것과 정반대 동작으로, "컴포넌트 계층과 무관한 단일 저장소"라는 Pinia의 정의가 확인된다.

### 212p — Hands on: Weather Store

`stores/configStore.js`, `stores/favoriteStore.js`, `exercise/UnitToggler.vue`

- **`configStore`** — 교재 스펙대로 state `unit`(초기값 `celsius`) / getter `unitSymbol`(℃·℉) / action `toggleUnit`을 작성했다.
- **`convertTemp` getter 추가 (요구사항 4)** — 교재는 컴포넌트마다 `displayTemp` computed를 두면 변환식이 중복된다고 지적하며 Composable을 대안으로 언급하고 범위에서 제외한다. **함수를 반환하는 getter**를 스토어에 두면 Composable 없이도 변환식을 한 곳에만 두고 재사용할 수 있어 이 방식을 택했다.
- **`favoriteStore.js` 추가 Store 작성 (요구사항 4)** — 관심 도시 즐겨찾기. state `favoriteIds` / getters `favoriteCount`·`isFavorite` / action `toggleFavorite`. `isFavorite`는 도시 id를 인자로 받아야 하므로 `convertTemp`와 같이 **함수를 반환하는 getter**로 구현했다.
- **`UnitToggler.vue`** — props/emits 없이 두 스토어를 직접 구독한다. `App.vue`의 Navigation Bar 우측에 배치했다. (요구사항 1·2)
- **단위 적용 범위 (요구사항 3)** — 교재는 "메인과 상세"를 지정하지만, 온도가 노출되는 화면을 전수 점검해 **랭킹 뷰, 통계 요약(평균 기온), 카드의 더움/선선함 임계값 표기**까지 함께 반영했다. 한 화면만 ℃로 남으면 사용자에겐 버그로 보이기 때문이다.
- 더움/선선함 **판정 기준은 섭씨 25도로 고정**하고 화면에 표시되는 임계값만 환산한다. (℃ 25도 이상 → ℉ 77도 이상)

### 229p — Axios

`practices/library/AxiosWeather.vue`, `practices/library/AxiosJson.vue`

- `npm install axios` (v1.20.0)
- **API 키를 환경변수로 분리** — 교재 224p는 `const API_KEY = '...'`로 소스에 직접 적지만, 이 저장소는 5p 요건에 따라 **Public**으로 제출하므로 키가 그대로 노출된다. `.env.local`(gitignore 대상)로 옮기고 `import.meta.env.VITE_OPENWEATHER_API_KEY`로 주입받도록 바꿨다. 변수명은 `.env.example`에 남겨 두었고, `.gitignore`에 `.env.local` / `.env.*.local`을 추가했다.
  - 배포 시에는 호스팅(Vercel 등) 대시보드의 Environment Variables에 같은 이름으로 등록해야 한다.
  - 키가 없으면 통신을 시도하지 않고 안내 문구를 띄운다.
- **`AxiosJson.vue`의 CRUD 완성** — 교재 228p는 `handleRead`(GET)까지만 싣고 `…`로 잘려 있다. 나머지 POST / PUT / DELETE는 217p의 엔드포인트·Body 표를 근거로 직접 작성했다.
- **응답 상태 표시줄 추가** — 각 요청의 HTTP status와 결과를 화면에 남겨, 콘솔을 열지 않아도 통신 성공 여부를 확인할 수 있게 했다.
- JSONPlaceholder는 가상 API라 쓰기 요청이 실제로 저장되지 않는다. 화면 반영은 응답 객체를 목록에 직접 반영하는 방식이며, 이 사실을 화면 하단에 명시했다.

### 230p — Hands on: Weather Axios

`api/weatherApi.js`, `stores/weatherStore.js`, `data/weatherData.js`(전면 교체), 뷰 3개 수정

- **요구사항 1 — 실제 데이터로 교체.** `data/weatherData.js`가 갖고 있던 목 날씨값을 걷어내고 **조회 대상 도시 목록(id·이름·위경도)만** 남겼다. 기온·습도·풍속·기압은 전부 OpenWeatherMap 응답값이다. (목 29·27·26·23·21℃ → 실측 34·30·30·29·28℃로 바뀌는 것을 확인)
- **요구사항 2 — OpenWeatherMap Air Pollution API 추가.** 상세 화면에 통합대기지수(1~5단계)와 PM10·PM2.5를 표시한다.
- **요구사항 3 — Open-Meteo API 추가.** OpenWeather와 **다른 제공사**의 무료 예보 API로, API 키가 필요 없다. 상세 화면에 4일치 최저/최고 기온을 붙였다.
- **`api/weatherApi.js` 통신 계층 분리** — 컴포넌트가 `axios`를 직접 부르지 않고 이 모듈의 함수만 호출한다. 외부 API의 응답 구조(`data.main.temp`, `data.weather[0].icon` 등)를 이 파일에서 앱 내부 형태로 변환해, 화면 코드가 특정 API 스펙에 묶이지 않게 했다.
- **`stores/weatherStore.js` 신설** — 대시보드와 랭킹이 같은 목록을 쓰므로 각자 통신하면 같은 데이터를 두 번 받는다. Pinia 스토어에 한 번 받아 공유하고, 이미 받아둔 데이터가 있으면 재요청하지 않는 가드를 두었다. (화면을 오가도 `[날씨 수신]` 로그가 1회만 찍히는 것으로 확인)
- **부분 실패 처리** — 5개 도시를 `Promise.allSettled`로 동시 조회한다. 한 도시가 실패해도 나머지는 정상 표시하고 실패한 도시명만 안내한다. 상세 화면의 3개 요청은 서로 의존하지 않으므로 `Promise.all`로 동시에 보낸다.
- **날씨 아이콘 교체** — 목 데이터의 이모지(`☀️`) 대신 OpenWeather가 주는 아이콘 이미지 URL을 쓰도록 `WeatherCard` / 랭킹 / 상세 3곳을 `<img>`로 바꿨다.
- 목 데이터에만 있던 **자외선 지수·미세먼지 항목은 제거**했다. Current Weather API가 주지 않는 값이라 화면에 남기면 허위 정보가 된다. 대신 실제로 받아오는 최저/최고 기온으로 대체하고, 미세먼지는 요구사항 2의 대기질 섹션이 담당한다.

### 246~248p — Element Plus

`practices/library/ElementForm.vue`, `ElementData.vue`, `ElementFeedback.vue`

- `npm install element-plus` (v2.14.5) 후 236p대로 `main.js`에 전역 등록.
- **246p** — `el-card`(header/footer 슬롯) + `el-input` + `el-switch` + `el-button`. `ElMessage`의 error / warning / success 3분기가 순서대로 발동하는 것을 확인했다.
- **247p** — `el-input-number`(수량) + `el-rate`(별점). 교재 템플릿 목록에는 `el-input-number`만 적혀 있으나 `productRate` 변수가 있으므로 `el-rate`를 함께 배치했다.
- **248p** — `ElMessageBox.confirm` + `el-progress`. 게이지가 0% → 40% → … 단계적으로 오르고 완료 메시지가 뜨는 것까지 확인했다.
- **중복 실행 방지** — `if (isDownloading.value) return` 으로 먼저 빠져나간 뒤 `isDownloading.value = true`를 세우도록 두 문장으로 나눴다. 진행 중에 버튼을 다시 눌러도 타이머가 겹쳐 돌지 않는다.
- **`ElMessageBox` type 값 수정** — 교재는 `type: 'danger'`를 쓰지만 Element Plus가 지원하는 값은 `success` / `info` / `warning` / `error` 4가지뿐이라 아이콘이 렌더링되지 않는다. `error`로 바꿔 경고 아이콘(`el-message-box-icon--error`)이 표시되는 것을 확인했다.
- **타이머 정리 추가** — `setInterval` 진행 중에 컴포넌트가 사라지면 타이머가 남으므로, 155p에서 배운 `onUnmounted`에 `clearInterval`을 넣었다. (교재 예제에는 없음)

### 249p — Hands on: Weather UI Library

선정 라이브러리: **Element Plus** (v2.14.5)

요구사항 1~3(OpenWeatherMap 실데이터 / 추가 API / 외부 API)은 230p에서 이미 충족했고, 이 과제에서는 **UI Library 적용**을 진행했다.

- **다크 테마 통합** — Element Plus는 기본이 라이트 테마라 앱(다크)과 카드 배경이 어긋난다. `theme-chalk/dark/css-vars.css`를 import하고, `prefers-color-scheme`를 감시해 `<html>`에 `dark` 클래스를 동기화하도록 `main.js`에 배선했다. OS 테마를 바꾸면 두 테마가 함께 따라간다.
- **적용 범위**

  | 화면                 | 교체 내용                                                                                  |
  | -------------------- | ------------------------------------------------------------------------------------------ |
  | `App.vue`            | `el-container` / `el-header` / `el-menu`(router 모드) / `el-backtop`                       |
  | `UnitToggler`        | `el-switch` + `el-badge` + `el-tooltip`                                                    |
  | `SearchBar`          | `el-input` (clearable, prefix)                                                             |
  | `SortSelector`       | `el-select` + `el-option`                                                                  |
  | `BaseDashboardCard`  | `el-card` + `el-empty`                                                                     |
  | `WeatherCard`        | `el-card` / `el-image` / `el-tag` / `el-button`                                            |
  | `WeatherStats`       | `el-row` + `el-statistic`                                                                  |
  | `WeatherHomeView`    | `el-alert`, `v-loading`, `el-empty`, `el-button`(loading)                                  |
  | `WeatherDetailView`  | `el-page-header` / `el-descriptions` / `el-tag` / `el-table` / `el-skeleton` / `el-result` |
  | `WeatherRankingView` | `el-tabs` / `el-table`(행 클릭 이동)                                                       |

- **한글 IME 동작 보존** — `el-input`은 내부적으로 조합(composition) 중 `input` 이벤트를 흘려보내지 않으므로, 그대로 교체하면 116p부터 지켜온 "한글 조합 중 실시간 필터링"이 깨진다. `@compositionupdate`를 함께 잡아 조합 중에도 부모로 emit하도록 했고, `compositionstart` → `isComposing: true` 상태에서 `속` 입력 시 목록이 속초로 걸러지는 것을 확인했다.
- `el-descriptions`의 라벨이 글자 단위로 세로 줄바꿈되어 `label-width`와 `white-space: nowrap`을 지정했다.

### 270~273p — ESLint / Prettier / env / build

`eslint.config.js`, `.env.staging`, `.env.production`, `package.json`

**270p — ESLint Custom 규칙**

`eslint.config.js`에 `app/custom-rules` 블록을 추가했다.

```js
rules: {
  eqeqeq: ['error', 'always'],  // === 강제
  'no-console': 'off',          // console.log 허용
}
```

검증: 컴포넌트에 `if (userAge == 20)`을 일부러 넣고 `npm run lint` 실행 →
`10:13 error Expected '===' and instead saw '==' eqeqeq` 검출. 같은 블록의 `console.log`는 경고 없음(`no-console: off` 동작 확인). **`lint` 스크립트에 `--fix`가 붙어 있어도 `eqeqeq`는 자동 수정되지 않고 에러로 남는다.** 확인 후 삽입한 코드는 원복했다.

**271p — Prettier**

교재가 준 코드를 그대로 넣고 `npm run format` 실행:

```js
// before
const myRegion = `Suwon`
const regionGreeting = `웰컴 투 ${myRegion}`

// after
const myRegion = `Suwon`
const regionGreeting = `웰컴 투 ${myRegion}`
```

바뀐 것은 **연속 공백 축약**과 **세미콜론 제거**(`.prettierrc.json`의 `semi: false`)뿐이다. 교재는 "백틱 기호가 어떻게 자동 변환되었는지 확인"하라고 하지만, **Prettier는 템플릿 리터럴을 일반 문자열로 바꾸지 않는다.** 보간이 없는 `` `Suwon` ``도 백틱 그대로 남는다. (AST를 바꾸지 않는다는 Prettier의 원칙)

**272p — 환경변수 모드**

`.env.staging` / `.env.production`에 `VITE_API_URL`을 정의하고, `package.json`에 `"build:staging": "vite build --mode staging"`을 추가했다. 확인용 `console.log`는 `WeatherAboutView.vue`에 두었다.

| 명령                    | 터미널 로그                                     | 번들에 박힌 값               |
| ----------------------- | ----------------------------------------------- | ---------------------------- |
| `npm run build:staging` | `building client environment for staging...`    | `https://api-stage.skcc.com` |
| `npm run build`         | `building client environment for production...` | `https://api-prod.skcc.com`  |

`npm run dev`에서는 `MODE = development` / `VITE_API_URL = undefined`가 나온다. `.env.development`를 만들지 않았기 때문이며, **모드별 파일은 해당 모드에서만 로드된다**는 것을 보여주는 정상 동작이다. (반면 `.env.local`은 모드와 무관하게 로드되므로 개발 중에도 날씨 API 키가 살아 있다.)

**273p — build 산출물**

`npm run build` 후 `dist/` 구조:

```
dist/
├── index.html            (611 B)  — /assets/index-*.js 를 참조
├── favicon.ico
└── assets/               (18개 파일)
    ├── index-DzPdkowV.js               928 KB   ← 벤더 포함 메인 번들
    ├── _plugin-vue_export-helper-*.js   64 KB
    ├── weatherApi-*.js                  52 KB   ← axios
    ├── WeatherHomeView-*.js              8 KB   ← 라우트별 지연 로딩 청크
    └── WeatherDetailView / Ranking / About / NotFound / Practices-*.js
```

파일명에 붙은 해시(`index-DzPdkowV.js`)는 내용이 바뀌면 함께 바뀌므로, 브라우저 캐시를 안전하게 무효화하는 장치다. 196p에서 라우터에 지연 로딩을 적용한 덕분에 View별로 청크가 분리되어 있다.

**메인 번들이 928 KB로 Vite의 500 KB 경고 기준을 넘는다.** Element Plus 전체를 `app.use(ElementPlus)`로 등록해 트리 셰이킹이 되지 않기 때문이다. 실무라면 `unplugin-vue-components`로 필요한 컴포넌트만 자동 import 하는 방식으로 줄이지만, 교재 236p가 전역 등록을 지정하고 있어 그대로 두었다.

### 274p — Hands on: Weather Deployment

**Source Code 품질관리 (요구사항 1·2)**

- `npm run lint` 오류 0 — oxlint / ESLint / Prettier 전부 통과.
  마지막까지 남아 있던 `SampleTwo.vue`의 미사용 `ref` import를 제거했다.
  교재 71p 원문에는 있지만 `welcomeMessage`가 일반 `const`라 실제로 쓰이지 않는 줄이다.
- API 키는 229p에서 이미 `.env.local`로 분리해 두었다. 저장소 전체를 검색해
  키 문자열이 소스·README 어디에도 남아 있지 않은 것을 확인했고,
  `.gitignore`에 `.env.local`과 `*.local`이 함께 걸려 있어 이중으로 제외된다.

**Build & Deployment (요구사항 3·4)**

- `npm run build` → `dist/` 약 1.4MB 생성. 라우트별 청크가 분리되어 있고
  파일명 해시로 캐시가 무효화된다.
- 배포 URL: **https://skala-vue-lovat.vercel.app/** (Vercel)
- **배포처에 환경변수를 별도로 등록해야 한다.** `.env.local`은 저장소에 포함되지 않으므로
  호스팅 대시보드(Vercel 등)의 Environment Variables에 `VITE_OPENWEATHER_API_KEY`를
  같은 이름으로 넣어야 날씨 데이터가 표시된다. 등록하지 않으면 화면은 뜨지만
  "VITE_OPENWEATHER_API_KEY가 없습니다" 안내가 나온다.

---

## 실습 중 확인한 내용

| 슬라이드 | 교재 내용                                             | 실행 결과                                                                                                                                                                                                                          |
| -------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 74p, 76p | `<h3>일반 보간법 {{}} 사용 결과:</h3>`                | 컴파일은 되지만 빈 문자열로 렌더되어 중괄호가 화면에서 사라짐 → `v-pre` 적용                                                                                                                                                              |
| 90p      | `[v-cloak]`을 `<style scoped>`에 정의                 | `data-v-*`가 렌더링 후 붙으므로 목적이 깨짐 → 전역 CSS로 이동                                                                                                                                                                             |
| 159p     | props 수정 시 "에러가 발생된다"                       | 예외가 던져지지 않고 **콘솔 경고 후 대입이 무시**됨 (`try/catch`로 잡히지 않음)                                                                                                                                                           |
| 248p     | `ElMessageBox` `type: 'danger'`                       | Element Plus 미지원 값이라 아이콘이 렌더링되지 않음 → `error`로 교체                                                                                                                                                                      |
| 271p     | "백틱(`) 기호와 공백이 어떻게 자동 변환되었는지 확인" | 공백·세미콜론만 정리되고 **백틱은 변환되지 않는다.** Prettier는 템플릿 리터럴을 일반 문자열로 바꾸지 않음                                                                                                                                 |
| 87p, 88p | `:key`에 고유값 강조                                  | 정작 배열 예제는 `:key="index"` 사용 (124p 삭제 기능과 조합 시 안티패턴)                                                                                                                                                                  |
| 205p     | 구조분해할당 시 "반응형이 유실될 수 있다"             | 확인 결과 **항상 끊긴다.** `const { count } = store`는 ref가 아닌 그 시점의 원시값 복사본이라 이후 `store.count`가 5로 올라가도 `count`는 3에 고정된다. `storeToRefs(store)`로 감싸면 `isRef: true`인 객체가 반환되어 값이 따라 올라간다. |

---
