/**
 * 包含多个接收组件通知触发mutations调用间接更新状态的方法的对象
 */
import {LOGIN, EXIT_LOGIN, GET_PERSONAL_INFO, UPDATE_BASE_INFO, UPDATE_EXTRA_INFO, UPDATE_LANDLORD_INFO, UPDATE_AGENT_INFO, ADD_HOUSE_FORM, ADD_HOUSE_BASE_FORM, ADD_HOUSE_ALLOCATION_FORM, GET_HOUSE_INFO, GET_AGENT_INFO} from './mutation-types'

export default {
  // 登录获取信息
  login ({commit}, user) {
    commit(LOGIN, {user})
  },
  // 退出登录
  exitLogin ({commit}) {
    commit(EXIT_LOGIN)
  },
  // 获取用户个人信息
  getPersonalInfo ({commit}, personalInfo) {
    commit(GET_PERSONAL_INFO, {personalInfo})
  },
  // 修改用户基本信息
  updateBaseInfo ({commit}, baseInfo) {
    commit(UPDATE_BASE_INFO, {baseInfo})
  },
  // 修改用户个人信息
  updateExtraInfo ({commit}, personalInfo) {
    commit(UPDATE_EXTRA_INFO, {personalInfo})
  },
  // 修改用户证件信息
  updateLandlordInfo ({commit}, landlordInfo) {
    commit(UPDATE_LANDLORD_INFO, {landlordInfo})
  },
  // 修改经纪人证件信息
  updateAgentInfo ({commit}, agentInfo) {
    commit(UPDATE_AGENT_INFO, {agentInfo})
  },
  // 添加房屋描述布局图片
  addHouseForm ({commit}, houseForm) {
    commit(ADD_HOUSE_FORM, {houseForm})
  },
  // 添加房源基本信息
  addHouseBaseForm ({commit}, baseForm) {
    commit(ADD_HOUSE_BASE_FORM, {baseForm})
  },
  // 添加房源配置信息
  addHouseAllocationForm ({commit}, {allocationForm, featureForm}) {
    commit(ADD_HOUSE_ALLOCATION_FORM, {allocationForm, featureForm})
  },
  // 获取房源信息
  getHouseInfo ({commit}, houseInfos) {
    commit(GET_HOUSE_INFO, {houseInfos})
  },
  // 获取经纪人信息
  getAgentInfo ({commit}, agentInfo) {
    commit(GET_AGENT_INFO, {agentInfo})
  }
}
