<template>
  <div class="home">
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
    <goods-list :goods="filterGoods"></goods-list> 


    <!-- 商品分类列表 -->
    <cube-drawer ref="drawer" title="请选择分类" :data="[drawerList]" 
    @select="selectHandler"></cube-drawer>
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
    }
  },
}
</script>
<style scoped>
  .cube-slide{
    /* width: 100%; */
    height: auto;
  }
  .slider{
    /* width:100%; */
    /* height:100% */
  }
  .cube-slide-item > a > img {
    width:100%;
  }
</style>
