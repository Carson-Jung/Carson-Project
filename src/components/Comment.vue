<template>
    <div class="container">
        <div class="avatar">
            <img src="../assets/img/houseOwner.png" alt="">
            <div class="userInfo">
                <div>用户昵称</div>
                <div>2019-06</div>
            </div>
        </div>
        <div class="commentContent">
            <p>位置挺不错，房东人很好，但是厕所有异味。</p>
        </div>
    </div>
</template>
<script>
export default {}
</script>

<style scoped>
.container {
    margin: 10px 0;
}
.avatar {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
}
.userInfo {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
}

</style>
