<template>
	<view>
		<!-- 商品列表的标题区域 -->
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    
    <!-- 循环渲染购物车里的商品信息 -->
    <block v-for="(goods, i) in cart" :key="i">
      <my-goods :goods="goods" :show-radio="true" @radio-change="radioChangeHandler"></my-goods>
    </block>
    
	</view>
</template>

<script>
// 按需导入 mapGetters 这个辅助方法
import { mapGetters } from 'vuex'

import { mapState, mapMutations } from 'vuex'

export default {
	data() {
		return {
			
		}
	},
  computed: {
    // 将 m_cart 模块中的 total 映射为当前页面的计算属性
    ...mapGetters('m_cart',['total']),
    ...mapState('m_cart',['cart'])
  },
  onShow() {
    // 在页面刚显示出来的时候,立即调用 setBadge 方法,设置数字徽标
    this.setBadge()
  },
  methods: {
    setBadge() {
      // 调用 uni.setTabBarBadge() 方法,为购物车设置右上角的徽标
      uni.setTabBarBadge({
        index: 2,
        // 注意：text 的值必须是字符串，不能是数字，因此进行字符串转换
        text: this.total + ''
      })
    },
    ...mapMutations('m_cart',['updateGoodsState']),
    //商品的勾选状态发生变化
    radioChangeHandler(e){
      this.updateGoodsState(e)
      console.log(e)
    }
  }
}
</script>

<style lang="less">
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}
</style>
