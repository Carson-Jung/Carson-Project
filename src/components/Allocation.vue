<template>
    <div class="container">
        <div class="title">
            配套设施
        </div>
        <div class="allocation">
            <img src="../assets/img/gas.png" alt="" v-if="gas">
            <img src="../assets/img/HairDrier.png" alt="" v-if="hairDriver">
            <img src="../assets/img/HeatingCooling.png" alt="" v-if="heatingCooling">
            <img src="../assets/img/TV.png" alt="" v-if="TV">
            <img src="../assets/img/WashSupplies.png" alt="" v-if="washSupplies">
            <img src="../assets/img/wifi.png" alt="" v-if="wifi">
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      gas: true,
      hairDriver: true,
      heatingCooling: true,
      TV: true,
      washSupplies: true,
      wifi: true
    }
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
.allocation {
    margin-left: 20px;
    display: flex;
    align-items: flex-start;
}
.allocation img {
    margin: 10px 10px;
    width: 65px;
}
</style>
