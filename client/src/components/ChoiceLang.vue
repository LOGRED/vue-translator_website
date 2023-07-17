<template>
    <div class="radio">
        <div class="radioLang" v-for="lang in langList" :key="lang.name">
            {{ lang.name }}
            <div v-if="lang.default">
                <input type="radio" name="lang" @:click="changeLang(lang.lang)" checked />
                {{ changeLang(lang.lang) }}
            </div>
            <div v-else>
                <input type="radio" name="lang" @:click="changeLang(lang.lang)" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ChoiceLang',
    data() {
        return {
            langList: [{ name: '한국어', lang: 'ko' }, { name: '영어', lang: 'en', default: true }, { name: '일본어', lang: 'ja' }],
        }
    },
    props: {
        changeLang: Function,
    }
}
</script>
<style scoped>
.radio {
    font-weight: bold;
}

.radioLang {
    display: inline-block;
    margin-left: 10px;
}

input[type='radio']:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: #d1d3d1;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
}

input[type='radio']:checked:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: #4CAF50;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
}
</style>