<template>
	<view class="cart-container" v-if="cart.length !== 0">
    <!-- 收获地址组件 -->
    <my-address></my-address>
		<!-- 商品列表的标题区域 -->
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    
    <!-- 商品列表区域 -->
    <!-- uni-swipe-action 是最外层包裹性质的容器 -->
    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
        <uni-swipe-action-item :options="options" @click="swipeActionClickHandler(goods)">
          <my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
     <!-- 结算区域 -->
    <my-settle></my-settle>
	</view>
   <!-- 空白购物车区域 -->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
// 按需导入 mapGetters 这个辅助方法
import { mapGetters } from 'vuex'
import badgeMix from '@/mixins/tabbar-badge.js'
import { mapState, mapMutations } from 'vuex'

export default {
  mixins: [badgeMix],
	data() {
		return {
			options: [{
			  text: '删除', // 显示的文本内容
			  style: {
			    backgroundColor: '#C00000' // 按钮的背景颜色
			  }
			}],
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
    ...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsById']),
    //商品的勾选状态发生变化
    radioChangeHandler(e){
      this.updateGoodsState(e)
      console.log(e)
    },
    // 商品的数量发生了变化
    numberChangeHandler(e){
      this.updateGoodsCount(e)
      console.log(e)
    },
    // 点击滑动删除按钮
    swipeActionClickHandler(goods) {
      this.removeGoodsById(goods.goods_id)
      console.log(goods)
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
.cart-container {
  padding-bottom: 50px;
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
