<template>
<!-- 小球动画 -->
     <div class="ball-wrap">
      <transition
       @before-enter="beforeEnter"
       @enter="enter"
       @after-enter="afterEnter"
      >
        <div class="ball" v-show="ball.show">
            <div class="inner">
                <div class="cubeic-add"></div>
            </div>
        </div>
      </transition>  
    </div>
</template>

<script>
    export default {
        name:'ballAnim',
        // el 加购按钮，动画起点
        props:['el'],
        data() {
            return {
                 ball:{
                    // 显示控制
                    show:false,
                    el:this.el  //目标dom引用 目标动画的载体
                },
            }
        },
        methods: {
            start(){
                // 开启动画
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
                const inner = el.querySelector(".inner");
                // inner只移动x
                inner.style.transform = `translate3d(${x}px,0,0)`;

            },
            enter(el, done){
                // 获取offsetHeight触发重绘
                document.body.offsetHeight;
                // done动画完成，设置动画结束点
                el.style.transform = 'translate3d(0,0,0)';
                el.addEventListener('transitionend', done);

            },
            afterEnter(el){
                // 结束 隐藏小球
                this.ball.show = false;
                el.style.display = 'none';

                // 动画结束事件 派发事件
                this.$emit('transitionend');
            }
        },
    }
</script>

<style lang="scss" scoped>
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
   .ball-wrap .inner {
      width: 16px;
      height: 16px;
      transition: all 0.5s linear;
  }
    .ball-wrap  .cubeic-add {
        font-size: 22px;
   }
  
</style>