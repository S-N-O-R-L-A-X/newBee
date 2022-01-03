<template>
  <div class="deliveryWrap">
    <div v-if="!show" class="nofind">
      <el-empty description="暂时没有记录哦"></el-empty>
    </div>
    <div v-for="(item, index) in list" :key="index" v-if="show" @click="checkDetail(item.recruitId)">
      <el-card shadow="hover" class="deliverycard">
        <div class="resumeBox">
          <p>{{item.title}}</p>
          <p>投递时间{{item.time}}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>
<style>
  .deliveryWrap {
    height: 1000px;
    overflow: scroll;
  }

  .deliveryWrap::-webkit-scrollbar {
    display: none;
  }

  .resumeBox {
    display: flex;
    justify-content: space-between;
  }

  .deliverycard {
    margin-bottom: 14px;
    width: 100%;
    height: 100px;
    border-left: 5px solid #888;
  }

  .nofind p {
    font-size: 18px;
    color: #909399;
  }

  .nofind img {
    width: 350px;
    height: 280px;
    margin: 28px 28px auto auto;
  }
</style>

<script>

  import axios from 'axios'
  export default {
    data() {
      return {
        list: [],
        show: true
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      checkDetail(id) {
        localStorage.setItem('jobId', id);
        this.$router.push('jobInfo');
      },
      getList() {
        
          axios.get("http://youngoldman.top:5555/api/resume/query/",{
            hid:localStorage.getItem("uid")
          })
          .then(res => {
            if (res.status === 200) {
              if (res.data.data === null) {
                this.show = false
              } else {
                this.list = res.data.data.sendList ? res.data.data.sendList : []
              }
            }
            else{
              this.$message({
                  message:"sorry，我们的服务器出了一些问题。",
                  type: "error"
              })
            }
          })
          .catch(e => {
            console.log(e); 
            this.$message({
                message:"sorry，我们的服务器出了一些问题。",
                type: "error"
            })
          })
      }
    }
  }
</script>
