<template>
  <div class="wrapper">
    <div v-if="show" class="nofind">
      <el-empty description="暂时没有发布的职位哦，快去发布吧"></el-empty>
    </div>
    <el-card  v-for="(item, key) in jobList" :key="key" class="mycard" v-if="!show" @click="checkDetail(item.id)">
        <p class="myflex">{{item.type}} {{item.companyName}} {{item.location}}</p>
        <p class="myflex"></p>
        <el-button class="delbtn" @click="deletejob(item.id)">删除职位</el-button>
        
    </el-card>  
    <!-- <el-pagination layout="prev, pager, next" :page-size="5" :current-page="currentPage" @current-change="handleCurrentChange()">
      
    </el-pagination> -->
    
  </div>
</template>
<script>

import axios from 'axios'
export default {
  data () {
    return {
      jobList: [],
      // showList:[],
      count: 0,
      show: true,
      // currentPage:0,
    }
  },
  mounted () {
    this.checkAllJobs()
  },
  watch: {
    count () {
      location.reload()
    }
  },
  methods: {
    checkDetail (id) {
      localStorage.setItem('jobId', id)
      this.$router.push('jobInfo')
    },
    checkAllJobs () {
      axios.get("http://youngoldman.top:5555/api/job/query/employee/"+localStorage.getItem('uid'))
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          if(res.data.code===0){
            this.jobList = res.data.data;
            // handleCurrentChange();
          }
          
          if (this.jobList.length>0) {//no jobs published
            this.show = false;
          }
          
        }
      }).catch(e => {
        console.log(e)
      })
    },
    deletejob (id) {
      axios.get("http://youngoldman.top:5555/api/job/delete/"+id)
      .then(res => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.count++;
          }
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // handleCurrentChange() {
    //   // this.currentPage = val;
    //   let val=this.currentPage;
    //   this.showList=this.jobList.slice(10*val);
    //   console.log(`当前页: ${val}`);
    // }
  }
}
</script>

<style>

.mycard {
  border-left: 5px solid #888;
  height: 100px;
  margin-bottom: 14px;
}
.myflex {
  float: left;
}
.delbtn {
  float: right;
}
</style>
