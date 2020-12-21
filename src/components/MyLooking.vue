<template>
    <div>
      <el-row>
        <el-col :xs="{span:24}" :sm="{span:24}" :md="{span:22,offset:1}" :lg="{span:22,offset:1}">
          <div class="container">
            <div class="header">
              <h3>我的约看</h3>
            </div>
            <div>
              <el-table
                :data="looking"
                stripe
                style="width: 100%">
                <el-table-column
                  prop="looking_id"
                  label="约看单号"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="house.title"
                  label="房源"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="site"
                  label="约看地点">
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="约看时间"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="约看状态"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="agent.real_name"
                  label="经纪人"
                  width="80">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="60">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="cancelLooking(scope.$index, looking)"
                      type="text"
                      size="small">
                      取消
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      looking: []
    }
  },
  methods: {
    cancelLooking (index, rows) {
      this.$axios({
        method: 'GET',
        url: '/user/deleteLooking',
        params: {
          lookingId: this.looking[index].looking_id
        }
      }).then(res => {
        if (res) {
          rows.splice(index, 1)
          this.$message.success('取消成功')
        } else {
          this.$message.error('取消失败')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted () {
    let looking = {}
    // if (this.userInfo.role_id === 3) {
    //   looking.agent_id = this.userInfo.user_id
    // } else {
    //   looking.user_id = this.userInfo.user_id
    // }
    this.$axios({
      method: 'post',
      url: '/user/findLookings',
      params: {
        looking: looking,
        roleId: this.userInfo.role_id,
        userId: this.userInfo.user_id
      }
    }).then(res => {
      console.log(res)
      for (let index = 0; index < res.length; index++) {
        res[index].date = res[index].date.toString().substr(0, 10)
      }
      for (let index = 0; index < res.length; index++) {
        if (res[index].status === 0) {
          res[index].status = '待接单'
        } else if (res[index].status === 1) {
          res[index].status = '已接单'
        } else if (res[index].status === 2) {
          res[index].status = '已完成'
        }
      }
      this.looking = res
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 10px;
}
.header {
  height: 40px;
  margin: 10px;
  color: #f7a11f;
  border-bottom: 1px solid #ddd;
}
</style>
