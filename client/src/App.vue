<template>
  <img alt="Vue logo" src="./assets/logo.png" style="width: 15%;">
  <h1>번역기</h1>
  <ChoiceLang :changeLang="changeLang" />
  <input maxlength="100" type="text" @:keypress="(e) => clickEnterEvent(e)"
    @:click="() => { msg = ''; changeBarStatus(true) }" v-model="msg" class="search" />
  <button @:click="this.getTranslate(this.msg)" class="button1">번역</button>
  <div class="resultField">
    <div v-for=" value  in  output " :key="value"
      @:click="() => { output[value.index].status = !output[value.index].status }">
      <p v-if="value.info === 0" class="resultBox success">{{
        value.status ? value.original : value.translate }}</p>
      <p v-else-if="value.info === 1" class="resultBox fail">{{ value.translate }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ChoiceLang from './components/ChoiceLang.vue'

export default {
  name: 'App',
  data() {
    return {
      msg: '문자를 입력해주세요.',
      lang: '',
      output: [],
      bar: false
    }
  },
  methods: {
    async getTranslate(originalMsg) {
      if (this.msg.length !== 0) {
        try {
          let temp = this.msg;
          this.msg = '';
          const translate = await axios.get(`/translate?msg=${temp}&lang=${this.lang}`);
          this.output.push({ original: originalMsg, translate: translate.data, status: false, index: this.output.length, info: 0 })
        } catch (err) {
          this.output.push({ original: originalMsg, translate: '입력언어와 번역언어가 같거나, 언어를 인식하지 못하였습니다.', status: false, index: this.output.length, info: 1 })
        }
      }
    },
    clickEnterEvent(e) {
      if (e.code === 'Enter') {
        this.getTranslate(this.msg);
      }
    },
    changeBarStatus(status) {
      this.bar = status;
    },
    changeLang(lang) {
      this.lang = lang;
    }
  },
  components: {
    ChoiceLang,
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}



.button1 {
  padding: 0.5rem;
  background-color: #4CAF50;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 1rem;
  border: 2px solid #4CAF50;
}

/* .button1:hover {
  background-color: rgba(76, 175, 80, 0.5);
} */

.button1:active {
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.24);
  transform: translateY(1px);
}

.search {
  width: 50vw;
  margin: 1rem;
  padding: 0.5rem;
  background-color: white;
  color: #2c3e50;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 1rem;
  border: 2px solid #4CAF50;
  outline: none;
}

.search:focus {
  border: 2px solid #2c3e50;
}

.resultBox {
  /* display: inline-block; */
  display: flex;
  border-radius: 1rem;
  padding: 0.5rem;
  margin: 0.3rem;
  min-height: 10vh;
  max-height: 10vh;
  max-width: 70vw;
  min-width: 70vw;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #2c3e50;
}

.resultField {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 55vh;
  overflow: auto;
}

.success {
  border: 2px solid #4CAF50;
}

.success:active {
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.24);
  transform: translateY(1px);
}

.fail {
  border: 2px solid #db2121;
  color: #db2121;
}
</style>