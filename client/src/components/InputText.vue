<template>
    <input type="text" @:keypress="(e) => clickEnterEvent(e)" @:click="msg = ''" v-model="msg" class="search" />
    <!-- <p v-bind:msg="메세지">{{ msg }}</p> -->
</template>

<script>
export default {
    name: 'InputText',
    emits: ['getTranslate'],
    data() {
        return {
            msg: '안녕하',
        }
    },
    methods: {
        clickEnterEvent(e) {
            if (e.code === 'Enter') {
                this.getTranslate(this.msg);
            }
        }
    },
    watch: {
        getTranslate() {
            this.$emit('getTranslate', this.msg)
        }
    }
}   
</script>

<style scoped>
.search {
    width: 30rem;
    margin: 1rem;
    padding: 0.5rem;
    background-color: white;
    color: #2c3e50;
    font-size: 0.5rem;
    font-weight: bold;
    border-radius: 1rem;
    border: 2px solid #4CAF50;
    outline: none;
}

.search:focus {
    border: 2px solid #2c3e50;
}
</style>