/**
 * 包含所有基于state的getter计算属性的对象
 */
export default {
  // 查询房屋数量
  houseNum (state) {
    return state.houseInfos.length
  }
}
