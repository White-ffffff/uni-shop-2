export default {
  // 开启命名空间
  namespaced: true,
  // state数据
  state: () => ({
    // 读取本地的收货地址数据，初始化 address 对象
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
  }),
  // 方法
  mutations: {
    // 更新收获地址
    updateAddress(state, address) {
      state.address = address
      this.commit('m_user/saveAddressToStorage')
    },
    // 持久化存储address
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    }
    
  },
  // 属性
  getters: {
    // 检查收货地址是否准备
    addstr(state) {
        if (!state.address.provinceName) return ''
        // 拼接 省，市，区，详细地址 的字符串并返回给用户
        return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
  
}