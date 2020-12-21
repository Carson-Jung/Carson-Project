/**
 * 包含多个由action触发直接更新状态的方法的对象
 */
import {LOGIN, EXIT_LOGIN, GET_PERSONAL_INFO, UPDATE_BASE_INFO, UPDATE_EXTRA_INFO, UPDATE_LANDLORD_INFO, UPDATE_AGENT_INFO, ADD_HOUSE_FORM, ADD_HOUSE_BASE_FORM, ADD_HOUSE_ALLOCATION_FORM, GET_HOUSE_INFO, GET_AGENT_INFO} from './mutation-types'

export default {
  [LOGIN] (state, {user}) {
    state.isLogin = true
    state.userInfo = user
  },
  [EXIT_LOGIN] (state) {
    state.isLogin = false
    state.userInfo = {}
  },
  [GET_PERSONAL_INFO] (state, {personalInfo}) {
    state.userInfo.userPersonalInfo = personalInfo
  },
  [UPDATE_BASE_INFO] (state, {baseInfo}) {
    state.userInfo = baseInfo
  },
  [UPDATE_EXTRA_INFO] (state, {personalInfo}) {
    state.userInfo.userPersonalInfo = personalInfo
  },
  [UPDATE_LANDLORD_INFO] (state, {landlordInfo}) {
    state.landlordInfo = landlordInfo
  },
  [UPDATE_AGENT_INFO] (state, {agentInfo}) {
    state.agentInfo = agentInfo
  },
  [ADD_HOUSE_FORM] (state, {houseForm}) {
    state.houseForm = houseForm
  },
  [ADD_HOUSE_BASE_FORM] (state, {baseForm}) {
    state.baseForm = baseForm
  },
  [ADD_HOUSE_ALLOCATION_FORM] (state, {allocationForm, featureForm}) {
    state.allocationForm = allocationForm
    state.featureForm = featureForm
  },
  [GET_HOUSE_INFO] (state, {houseInfos}) {
    state.houseInfos = houseInfos
  },
  [GET_AGENT_INFO] (state, {agentInfo}) {
    state.agentInfo = agentInfo
  }
}
