<template>
    <div class="block">
        <el-carousel :autoplay="false" trigger="click" :height="bannerH +'px'">
        <el-carousel-item v-for="(item,index) in imgUrls" :key="index">
            <img :src="item" class="loginBgImg"/>
        </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
export default {
  data () {
    return {
      bannerH: 600,
      imgUrls: [
        require('../assets/img/background1.jpg'),
        require('../assets/img/background2.jpg'),
        require('../assets/img/background3.jpg')
      ]
    }
  },
  methods: {
    setBannerH () {
      let height = document.body.clientWidth / 2.5
      if (height < 450) {
        height = 450
      }
      this.bannerH = height
    }
  },
  mounted () {
    this.setBannerH()
    window.addEventListener('resize', () => {
      this.setBannerH()
    }, false)
  },
  created () {}
}
</script>

<style scoped>
.block{
    z-index: -1;
    min-width: 740px;
    overflow: hidden;
}
.loginBgImg{
    width: 100%;
    min-height: 450px;
}
</style>
