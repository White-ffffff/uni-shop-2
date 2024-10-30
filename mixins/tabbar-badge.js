import { mapGetters } from 'vuex'

// 导出一个 mixin 对象
export default {
  // 添加监听器实时更新购物车徽标的商品总数
  // watch: {
  //   // 定义 total 监听器，监听total值的变化
  //   total: {
  //     // 回调函数:定义handler函数，用来处理total数据的变化
  //     handler(newTotal){
  //       this.setBadge()
  //       console.log('total changed to:', newTotal);
  //     }, 
  //     // immediate 属性用来声明此侦听器，是否在页面初次加载完毕后立即调用
  //     immediate:true ,
  //   }
  // },
  watch: {
      // 监听 total 值的变化
      total() {
        // 调用 methods 中的 setBadge 方法，重新为 tabBar 的数字徽章赋值
        this.setBadge()
      },
    },
  computed: {
    ...mapGetters('m_cart',['total'])
  },
  onShow() {
    this.setBadge()
  },
  methods: {
    setBadge() {
      uni.setTabBarBadge({
        index: 2,
        text: this.total + ''
      })
    }
  }
  
}


