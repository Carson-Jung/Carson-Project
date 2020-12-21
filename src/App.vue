<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created () {
    sessionStorage.getItem('token') &&
    this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(sessionStorage.getItem('token'))))
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('token', JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.pull-left {
  float: left !important;
}
.pull-right {
  float: right !important;
}
/* 清除浮动 */
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
  clear: both
}
</style>
