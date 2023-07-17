<template>
    <div class="header" v-if="enable">
        <img alt="Vue logo" src="../assets/logo.png" style="width: 5%; margin-top: 35px;">
    </div>
</template>

<script>
export default {
    name: 'HeaderBar',
    props: {
        enable: Boolean
    }
}   
</script>

<style scoped>
@media only screen and (max-width: 768px) {
    .header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 0;
        padding: 0 0 calc(env(safe-area-inset-top) + 6px);
        background-color: #000;
        /* 원하는 배경색으로 변경 */
        /* 원하는 텍스트 색상으로 변경 */
    }
}
</style>