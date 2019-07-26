<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  async created(){
    // 测试拦截器
    const res = await this.$http.get('/api/goods');
    console.log(res,'测试拦截器-res')
  }
}
</script>
