<template>
  <div>
    <div class="indexContain">
      <div class="cardBox">
        <el-carousel trigger="click" height="400px" style="position: sticky;">
            <el-carousel-item v-for="(item, key) in crouselImg" :key="key">
              <img :src="item.img" class="boxImg" >
            </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      crouselImg: [
        {img: 'https://sxsimg.xiaoyuanzhao.com/3C/09/3C4A275077015CBF398443CC21774709.png'},
        {img: 'https://sxsimg.xiaoyuanzhao.com/C3/55/C35273E2AAA17DBA580304E05DF22155.png'},
        {img: 'https://sxsimg.xiaoyuanzhao.com/C6/FC/C60F54D6D175ABAF3E9A33F0FDE867FC.png'},
        {img: 'https://sxsimg.xiaoyuanzhao.com/FD/0C/FDBBBD21A98136E3054ADDD432A5020C.png'},
        {img: 'https://sxsimg.xiaoyuanzhao.com/adservice/image/20211222104630NtxDyd7oKgmD3ROU4b.jpeg?x-oss-process=image/format,jpg/quality,q_90/resize,w_1200'},
        {img:'https://sxsimg.xiaoyuanzhao.com/adservice/image/20211226221859majH8oG2PLGyIhvQgV.jpeg?x-oss-process=image/format,jpg/quality,q_90/resize,w_1200'},
      ],
    }
  },
}
</script>

<style scoped>
.indexContain {
  width: 100%;
  height: 100%;
  border:1px solid #ededed;
  background: #fff;
}

.cardBox {
  position: relative;
  width: 1200px;
  margin: 20px auto 30px auto;
  box-shadow: 0 10px 15px #888;
  border-radius: 6px;
}

.boxImg {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}
</style>