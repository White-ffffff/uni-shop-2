<template>
	<view class="goods-item">
	  <!-- 左侧区域 -->
	  <view class="goods-item-left">
      <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
	    <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
	  </view>
	  <!-- 右侧区域 -->
	  <view class="goods-item-right">
	    <!-- 商品的名字 -->
	    <view class="goods-name">{{goods.goods_name}}</view>
	    <view class="goods-info-box">
        <!-- 在渲染商品价格的时候，通过管道符 | 调用过滤器 -->
	      <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
        <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
	    </view>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
				
			};
		},
    props: {
      goods: {
        type: Object,
        default: {}
      },
      showRadio: {
        type: Boolean,
        default: false
      },
      // 是否展示右侧的NumberBox 组件
      showNum: {
        type: Boolean,
        default: false
      },
    },
    filters: {
      // 把数字处理为带两位小数点的数字
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    methods: {
      radioClickHandler(){
        // 通过 this.$emit() 来触发 radio-change 事件
        this.$emit('radio-change',{
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      // NumberBox 组件的 change 事件处理函数
      numChangeHandler(val){
        console.log(val)
        this.$emit('num-change',{
          goods_id: this.goods.goods_id,
          goods_count: +val
        })
      }
    }
	}
</script>

<style lang="scss">
.goods-item {
  // 让 goods-item 项占满整个屏幕的宽度
    width: 750rpx;
    // 设置盒模型为 border-box
    box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

  .goods-item-left {
    margin-right: 5px;

    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  
    .goods-name {
      font-size: 13px;
    }
  
    .goods-info-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  
    .goods-price {
      font-size: 16px;
      color: #c00000;
    }
  }
  .goods-item-left {
    margin-right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  
    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
}
</style>
