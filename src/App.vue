<template>
  <div id="app">
    <!-- 
      <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login" v-if="!isLogin">Login</router-link>
      <a @click="logout" v-if="isLogin">Logout</a>
    </div>
     -->
     <!-- 动画，route-move为动画名称 -->
     <transition name="route-move">
        <router-view class="child-view" />
     </transition>
   
    <!-- show-slider 导航滑动式切换 -->
    <cube-tab-bar show-slider
    v-model="selectedLabel"
    :data="tabs"
    @change="changeHandler">
   </cube-tab-bar>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    data() {
      return {
        selectedLabel: '/',  //默认页签
        tabs:[
          {label:'Home', value:'/', icon:'cubeic-home'},
          {label:'Cart', value:'/cart', icon:'cubeic-mall'},
          {label:'Me', value:'/login', icon:'cubeic-person'}
        ]
      }
    },
    // 页面没有刷新，编程触发路由变化,路由变化时tabs选中
    watch:{
      $route(route){
          this.selectedLabel = route.path;
      }
    },
    // 页面刷新触发，只执行一次
    created(){
      // 初始化页签设置,当前路由的path
      this.selectedLabel = this.$route.path;
    },
    methods: {
      logout() {
        this.$http.get('/api/logout')
      },
      changeHandler(val) {
        this.$router.push(val);
      }
    },
    computed:{
      ...mapGetters(['isLogin'])
    }
  }
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.cube-tab-bar{
  position: fixed;
  bottom:0;
  left: 0;
  right: 0;
  background-color: #edf0fe;
}
.cube-tab-bar-slider {
  /* 设置滑动条显示在tabbar上方 */
  /* top:0; */
}
/* 页面滑动动画 */
/* 入场前 */
.route-move-enter {
  transform:translate3d(-100%,0,0)
}
/* 出场后 */
.route-move-leave-to{
  transform: translate3d(100%,0,0)
}
.route-move-enter-active,route-move-leave-to-active{
  transition: transform 0.3s;
}
.child-view{
  /* position: absolute;
  left:0;
  top:0;
  padding-bottom:36px; */
}
</style>
