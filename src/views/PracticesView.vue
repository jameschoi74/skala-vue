<script setup>
// 교재 슬라이드 예제(practices) 확인용 페이지.
// 보고 싶은 컴포넌트의 import와 <template> 태그를 함께 주석 해제해 사용한다.
// practices 폴더를 삭제할 때는 이 View 파일과 라우터의 /practices 항목만 지우면 된다.
//
// 72p  import SampleOne from '@/components/practices/basic/SampleOne.vue'
// 93p  import VHtmlText from '@/components/practices/directive/VHtmlText.vue'
// 93p  import VBind from '@/components/practices/directive/VBind.vue'
// 93p  import VIfShow from '@/components/practices/directive/VIfShow.vue'
// 93p  import VFor from '@/components/practices/directive/VFor.vue'
// 93p  import VMisc from '@/components/practices/directive/VMisc.vue'
// 105p import VOnBasic from '@/components/practices/event/VOnBasic.vue'
// 115p import VModelBasic from '@/components/practices/form/VModelBasic.vue'
// 126p import RefState from '@/components/practices/composition/RefState.vue'
// 144p import ComputedBasic from '@/components/practices/composition/ComputedBasic.vue'
// 155p import LifecycleParent from '@/components/practices/component/LifecycleParent.vue'
// 172p import PropsEmitsParent from '@/components/practices/component/PropsEmitsParent.vue'
// 177p import SlotDefaultParent from '@/components/practices/component/SlotDefaultParent.vue'
// 211p import StoreCounter from '@/components/practices/library/StoreCounter.vue'
// 229p import AxiosWeather from '@/components/practices/library/AxiosWeather.vue'
// 229p import AxiosJson from '@/components/practices/library/AxiosJson.vue'
// 246p import ElementForm from '@/components/practices/library/ElementForm.vue'
// 247p import ElementData from '@/components/practices/library/ElementData.vue'
// 248p import ElementFeedback from '@/components/practices/library/ElementFeedback.vue'

const CHALLENGES = [
  { page: '72p', title: '학습환경 구성', files: 'basic/SampleOne, SampleTwo' },
  {
    page: '93p',
    title: 'Vue Directive',
    files: 'directive/VHtmlText, VBind, VIfShow, VFor, VMisc',
  },
  { page: '105p', title: 'Event Handling', files: 'event/VOnBasic, EventObject, EventModifier' },
  { page: '115p', title: 'Form & Style', files: 'form/VModelBasic, FormElements, VModelModifiers' },
  { page: '126p', title: 'Reactive State', files: 'composition/RefState, ReactiveState' },
  { page: '144p', title: 'Computed & Watchers', files: 'composition/ComputedBasic, Watch*' },
  {
    page: '155p',
    title: 'Component Lifecycle',
    files: 'component/LifecycleParent, LifecycleChild',
  },
  { page: '172p', title: 'Props & Emits', files: 'component/PropsEmitsParent, PropsEmitsChild' },
  { page: '177p', title: 'Component Slot', files: 'component/Slot{Default,Named,Scoped}*' },
  { page: '211p', title: 'Pinia Store', files: 'library/StoreCounter' },
  { page: '229p', title: 'Axios', files: 'library/AxiosWeather, AxiosJson' },
  {
    page: '246~248p',
    title: 'Element Plus',
    files: 'library/ElementForm, ElementData, ElementFeedback',
  },
]
</script>

<template>
  <div class="practices-view">
    <h2>교재 예제 (Code Challenge)</h2>
    <p class="hint">
      아래 목록의 컴포넌트를 보려면 <code>src/views/PracticesView.vue</code>에서 해당 import와
      템플릿 태그의 주석을 해제하세요.
    </p>

    <table>
      <thead>
        <tr>
          <th>슬라이드</th>
          <th>주제</th>
          <th>파일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in CHALLENGES" :key="item.page">
          <td>{{ item.page }}</td>
          <td>{{ item.title }}</td>
          <td>
            <code>{{ item.files }}</code>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 여기에 주석 해제한 컴포넌트를 배치 -->
    <!-- <SampleOne /> -->
    <!-- <VHtmlText /> -->
    <!-- <LifecycleParent /> -->
    <!-- <StoreCounter /> -->
    <!-- <AxiosWeather /> -->
    <!-- <AxiosJson /> -->
    <!-- <ElementForm /> -->
    <!-- <ElementData /> -->
    <!-- <ElementFeedback /> -->
  </div>
</template>

<style scoped>
.practices-view {
  max-width: 900px;
}

.hint {
  margin: 10px 0 16px;
  font-size: 14px;
  color: gray;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

th,
td {
  border: 1px solid var(--color-border);
  padding: 8px 10px;
  text-align: left;
}

th {
  color: #42b983;
}
</style>
