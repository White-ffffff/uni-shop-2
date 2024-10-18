<template>
	<view class="my-search-container" :style="{'background-color': bgcolor}" @click="searchBoxHandler">
		<view class="my-search-box" :style="{'border-radius': radius + 'px'}">
      <!-- 使用uni-ui提供的图标组件 -->
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
	</view>
</template>

<script>
	export default {
    props: {
      // 背景颜色
      bgcolor: {
        type: String,
        default: '#C00000'
      },
      // 圆角尺寸
      radius: {
        type: Number,
        // 单位是 px
        default: 18
      }
    },
		data() {
			return {
      
			}
		},
    methods: {
      // 父组件绑定事件处理函数
      searchBoxHandler(){
        console.log("父组件中绑定事件处理函数searchBoxHandler--->okokook")
        this.$emit('click')
      }
    }
	}
</script>

<style lang="scss">
.my-search-container {
  background-color: #c00000;
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
}

.my-search-box {
  height: 36px;
  background-color: #ffffff;
  border-radius: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .placeholder {
    font-size: 15px;
    margin-left: 5px;
  }
}
</style>
