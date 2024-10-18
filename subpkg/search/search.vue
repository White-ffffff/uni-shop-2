<template>
	<view>
		<view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 历史搜索列表 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item,i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
    
    
    
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 1.定义延时器
        timer: null,
        // 4.搜索关键词
        kw: '',
        // 搜索列表
        searchResults: [],
        // 搜索历史的数组
        historyList: ['a','app','apple']
			};
		},
    methods: {
      // input输入事件的处理函数,防抖处理
      input(e) {
        // console.log(e.value)
        
        // 3.500毫秒之内用户连续触发输入事件，clearTimeout需要清除之前的延时器，防止多次发送请求
        clearTimeout(this.timer)
        // 2.延时器,通过setTimeout启动延时器，500毫秒之后发送一次请求
        this.timer = setTimeout(() => {
          // 5.将最新的输入值作为关键词存储起来
          this.kw = e.value
          console.log(this.kw)
          
          this.getSearchList()
          
        },500)
        
      },
      // 获取搜索列表的方法
      async getSearchList(){
        if(this.kw === ''){
          this.searchResults = []
          return
        }
        const {data:res} = await uni.$http.get('api/public/v1/goods/search',{ query: this.kw })
        if(res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message.goods
        
        this.saveSearchHistory()
        
      },
      // 跳转到商品详情页
      gotoDetail(item) {
        console.log(item.goods_id)
        uni.navigateTo({
          // 指定详情页面的 URL 地址，并传递 goods_id 参数
          url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
        })
      },
      saveSearchHistory(){
        // this.historyList.push(this.kw)
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList = Array.from(set)
        console.log(set)
        // 本地存储数据:调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
        uni.setStorageSync('key',JSON.stringify(this.historyList))
      },
      // 清空搜索历史记录
      cleanHistory() {
        // 清空 data 中保存的搜索历史
        this.historyList = []
        // 清空本地存储中记录的搜索历史
        uni.setStorageSync('kw', '[]')
      },
      gotoGoodsList(kw){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?quary=' + kw
        })
      }
    },
    computed:{
      // 注意：由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
      // 而是应该新建一个内存无关的数组，再进行 reverse 反转
      historys(){
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      // 展示获取数据:从本地存储中读取存储在 'kw' 下的数据,通过JSON.parse()将 JSON 字符串转换回 JavaScript 对象或数组
      this.historyList = JSON.parse(uni.setStorageSync('key') || '[]')
    }
    
	}
</script>

<style lang="scss">
.search-box {
  // 设置定位效果为“吸顶”
  position: sticky;
  // 吸顶的“位置”
  top: 0;
  // 提高层级，防止被轮播图覆盖
  z-index: 999;
}
.sugg-list {
  padding: 0 5px;

  .sugg-item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}

.history-box {
  padding: 0 5px;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}

</style>
