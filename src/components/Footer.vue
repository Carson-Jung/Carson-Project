<template>
    <div class="footContainer">
        <el-row>
            <el-col :xs="8" :sm="8" :md="{span:6,offset:2}" :lg="{span:6,offset:2}">
                <div class="call">
                    <img class="footSvg" src="../assets/img/weixin.png">
                    <img class="footSvg" src="../assets/img/qq.png">
                </div>
                <div>
                    <span class="text-muted">Copyright: </span>Guangdong Ocean University<br/>
                    <span class="text-muted">Development and Maintenance: </span>No.5 Software Team
                </div>
            </el-col>
            <el-col :xs="{span:4,offset:3}" :sm="{span:4,offset:2}" :md="{span:2,offset:3}" :lg="{span:2,offset:4}">
                <div>
                    <img class="footLogo" src="../assets/img/logo.png" alt="">
                </div>
            </el-col>
            <el-col :xs="{span:7,offset:2}" :sm="{span:8,offset:2}" :md="{span:7,offset:2}" :lg="{span:6,offset:2}">
                <div>
                    <div class="text-muted call callPhone pull-right">
                        Contact us：<span >XXX-XXXXXXXX</span>
                    </div>
                    <div class="pull-right  ">
                        <span class="text-muted">Contact email: </span> XXXXXXXXXXX@gmail.com<br/>
                        <span class="pull-right">About Us and Livable</span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {}
</script>

<style scoped>
.footContainer{
    width:100%;
    min-width:660px;
    height: 150px;
}
/* 页脚联系方式图标 */
.footSvg{
    display: inline-block;
    width: 40px;
    height: 40px;
    margin: 15px 5px;
}
.footLogo{
    margin-top: 30px;
    width: 50px;
    height: 50px;
}
/* 版权字体颜色 */
.text-muted {
    color: #777;
}
.call {
    border-top: #cccccc 1px solid;
}
.callPhone{
    margin-top: 10px;
    padding-top: 10px;
    margin-bottom: 20px;
}
.callPhone span{
    text-align: right;
    color:#ff9900 ;
    font-size: x-large;
    font-weight: bold;
}
</style>
