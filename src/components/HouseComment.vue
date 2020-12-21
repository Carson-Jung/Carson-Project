<template>
    <div class="container">
        <div class="title">
            评价
        </div>
        <div class="rate">
            <el-rate
                v-model="rate"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
            </el-rate>
            <span> 7条用户评价</span>
        </div>
        <div class="comment">
            <Comment/>
        </div>
    </div>
</template>
<script>
import Comment from '../components/Comment'
export default {
  data () {
    return {
      rate: 4.7
    }
  },
  components: {
    Comment
  }
}
</script>

<style scoped>
.container {
    margin-bottom: 10px;
}
.title {
    margin: 20px;
    font-weight: 700;
    font-size: 28px;
    color: #000;
}
.rate {
    display: flex;
    align-items: flex-start;
    margin: 10px 20px;
}
.rate span{
    margin-left: 20px;
}
.comment {
    margin: 10px 20px;
}
</style>
