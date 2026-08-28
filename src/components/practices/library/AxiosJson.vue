<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 💡 1. 백엔드 공용 주소
const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

// 💡 2. 반응형 상태 데이터
const items = ref([]) // 서버에서 받아온 데이터 배열 박스
const textInput = ref('') // 입력창과 연결된 글자 데이터 박스
const lastResponse = ref('') // 응답 결과 확인용 (교재에 없는 추가분)

// ----------------------------------------------------
// [READ] GET : 데이터 가져오기
// ----------------------------------------------------
const handleRead = async () => {
  try {
    // 공부용으로 딱 3개만 들고 옵니다.
    const response = await axios.get(BASE_URL, { params: { _limit: 3 } })
    items.value = response.data
    lastResponse.value = `GET 성공 — ${response.status} / ${response.data.length}건 수신`
    console.log('GET 성공:', response.data)
  } catch (error) {
    lastResponse.value = `GET 실패 — ${error.message}`
    console.error('GET 실패:', error)
  }
}

// ----------------------------------------------------
// [CREATE] POST : 새 데이터 등록
// 217p 표 기준 — Body { title, body, userId }를 보내면 id:101을 붙여 되돌려준다.
// ----------------------------------------------------
const handleCreate = async () => {
  if (!textInput.value) return
  try {
    const response = await axios.post(BASE_URL, {
      title: textInput.value,
      body: '날씨현황',
      userId: 1,
    })
    // JSONPlaceholder는 가상 API라 서버에 실제로 저장되지 않는다.
    // 응답으로 돌아온 객체를 화면 목록 앞에 직접 끼워 넣어 결과를 확인한다.
    items.value.unshift(response.data)
    lastResponse.value = `POST 성공 — ${response.status} / 새 id=${response.data.id}`
    console.log('POST 성공:', response.data)
    textInput.value = ''
  } catch (error) {
    lastResponse.value = `POST 실패 — ${error.message}`
    console.error('POST 실패:', error)
  }
}

// ----------------------------------------------------
// [UPDATE] PUT : 기존 데이터 전체 교체
// ----------------------------------------------------
const handleUpdate = async (item) => {
  try {
    const response = await axios.put(`${BASE_URL}/${item.id}`, {
      title: textInput.value || `수정된 제목 (${item.id})`,
      body: '수정현황',
    })
    const index = items.value.findIndex((row) => row.id === item.id)
    if (index !== -1) items.value[index] = response.data
    lastResponse.value = `PUT 성공 — ${response.status} / id=${item.id} 교체`
    console.log('PUT 성공:', response.data)
  } catch (error) {
    lastResponse.value = `PUT 실패 — ${error.message}`
    console.error('PUT 실패:', error)
  }
}

// ----------------------------------------------------
// [DELETE] DELETE : 데이터 삭제 (성공 시 빈 객체 반환)
// ----------------------------------------------------
const handleDelete = async (item) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${item.id}`)
    items.value = items.value.filter((row) => row.id !== item.id)
    lastResponse.value = `DELETE 성공 — ${response.status} / id=${item.id} 삭제`
    console.log('DELETE 성공:', response.status)
  } catch (error) {
    lastResponse.value = `DELETE 실패 — ${error.message}`
    console.error('DELETE 실패:', error)
  }
}

// 화면이 열리자마자 목록을 한 번 불러온다. (152p 표대로 API 호출은 onMounted가 적기)
onMounted(handleRead)
</script>

<template>
  <div class="practice-section">
    <h2>🔁 Axios REST CRUD (JSONPlaceholder)</h2>

    <div class="toolbar">
      <input v-model="textInput" placeholder="등록/수정할 제목을 입력하세요" />
      <button @click="handleCreate" :disabled="!textInput">POST 등록</button>
      <button @click="handleRead">GET 새로고침</button>
    </div>

    <p v-if="lastResponse" class="response">{{ lastResponse }}</p>

    <ul class="post-list">
      <li v-for="item in items" :key="item.id">
        <span class="id">#{{ item.id }}</span>
        <span class="title">{{ item.title }}</span>
        <button @click="handleUpdate(item)">PUT</button>
        <button class="danger" @click="handleDelete(item)">DELETE</button>
      </li>
    </ul>

    <p class="note">
      ※ JSONPlaceholder는 가상 API입니다. POST/PUT/DELETE 요청은 정상 응답(201/200)을 돌려주지만
      서버에 실제로 저장되지는 않으므로, GET 새로고침을 누르면 원래 목록으로 돌아옵니다.
    </p>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}

.toolbar input {
  padding: 8px 12px;
  font-size: 15px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  min-width: 240px;
}

.response {
  margin-top: 10px;
  font-size: 14px;
  color: #42b983;
}

.post-list {
  list-style: none;
  padding: 0;
  margin-top: 12px;
}

.post-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 14px;
}

.id {
  color: gray;
  min-width: 44px;
}

.title {
  flex: 1;
}

.danger {
  color: #e17055;
  border-color: #e17055;
}

.note {
  margin-top: 12px;
  font-size: 13px;
  color: gray;
}
</style>
