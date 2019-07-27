<template>
  <div class="home">
    <!-- 页头 -->
    <k-header title="测试商城"></k-header>
    <!-- 轮播图 -->
    <cube-slide :data="slider" :interval="5000">
      <cube-slide-item v-for="item in slider" :key="item.id">
        <!-- slot插槽 -->
        <router-link :to="`/detail/${item.id}`">
            <img :src="item.img" class="slider" />
        </router-link>
      </cube-slide-item>
    </cube-slide>

    <!-- 触发分类选择按钮 -->
    <cube-button @click="showCatg">选择分类</cube-button>

    <!-- 商品列表 -->
    <goods-list :goods="filterGoods" @addCart="onAddCart"></goods-list> 


    <!-- 商品分类列表 -->
    <cube-drawer ref="drawer" title="请选择分类" :data="[drawerList]" 
    @select="selectHandler"></cube-drawer>

    <!-- 加购动画载体 -->
    <div class="ball-wrap">
      <transition
       @before-enter="beforeEnter"
       @enter="enter"
       @after-enter="afterEnter"
      >
        <div class="ball" v-show="ball.show"></div>
      </transition>  
    </div>

  <!-- 监听商品列表的点击事件，当点击加购时派发一个事件，根据事件可以知道当前点击事件的坐标，根据该坐标定位小球动画的起始坐标 -->

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import GoodsList from '@/components/GoodsList.vue';
const labels = {
  fe:'前端',
  python:'后端1',
  java:'后端2',
  bigdata:'大数据',
  ai:'人工智能'
}
export default {
  name: 'home',
  data() {
    return {
      ball:{
        // 显示控制
        show:true,
        el:null  //目标dom引用 目标动画的载体
      },
      slider: [],
      keys:[], // 可供使用的分类
      selectedKeys:[], // 分类过滤时使用
      goods:[]  // 所有商品分类
    }
  },
  components: {
    // HelloWorld,
    GoodsList
  },
  async created(){
    // 测试拦截器
    // const res = await this.$http.get('/api/goods');
    // console.log(res,'res--')
    // const goods = res.data.data;
    // const slider = goods.slider;
    // 多层解构
    const {data:{data:goods, slider,keys}} = await this.$http.get('/api/goods');
    console.log(goods,slider,'测试拦截器-goods,slider')
    this.slider = slider;
    console.log(this.slider,'000')
    this.goods = goods;
    this.keys = keys;
    // 默认选中所有分类
    this.selectedKeys = [...this.keys];
  },
  computed:{
    // 从已选择分类作为索引，从goods中取出对应数据并进行拼接
    filterGoods() {
      // 分类返回结果
      let ret = [];
      this.selectedKeys.forEach(v => {
        ret = ret.concat(this.goods[v]);
      })
      return ret;
    },
    drawerList(){
      return this.keys.map(v => {
        return {
          value:v,
          text:labels[v]   //转换为中文标签
        }
      })
    }
  },
  methods: {
    showCatg() {
      // 显示分类列表
      this.$refs.drawer.show();
    },
    selectHandler(val){
      this.selectedKeys = [...val]
    },
    onAddCart(el){
      // el则为动画元素
      this.ball.el = el;
      this.ball.show = true;

    },
    beforeEnter(el){
      // 动画初始值设置
      // 1.获取点击dom坐标
      const dom = this.ball.el;
      const rect = dom.getBoundingClientRect();
      // getBoundingClientRect得到边界客户端的矩形,然后可以从盒子中拿到坐标
      console.log(rect.top, rect.left);
      // 2.计算点击坐标
      const x = rect.left - window.innerWidth/2;
      // 30为差值，可根据实际情况调整
      const y = -(window.innerHeight - rect.top - 30);
      el.style.display = 'block';
      el.style.transform = `translate3d(${x}px, ${y}px, 0`;

    },
    enter(el, done){
      // 获取offsetHeight触发重绘
      document.body.offsetHeight;
      // done动画完成，设置动画结束点
      el.style.transform = 'translate3d(0,0,0)';
      el.addEventListener('transitionend', done);

    },
    afterEnter(el){
      this.ball.show = false;
      el.style.display = 'none';
    }
  },
}
</script>
<style scoped>
  .cube-slide{
    /* width: 100%; */
    height: auto;
  }

  .cube-slide-item > a > img {
    width:100%;
  }
  .ball-wrap .ball{
    position: fixed;
    left:50%;
    bottom:10px;
    z-index:200;
    color:red;
    width:30px;
    height:30px;
    /* 设置动画样式，拖一个曲线 */
    transition:all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41);
  }
</style>
