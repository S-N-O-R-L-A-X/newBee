<template>
  <div>
    <el-card class="nojob" v-if="list.length===0">暂时没有该岗位信息</el-card>
    <el-card v-if="list.length>0" v-for="(item, key) in list" :key="key" class="jobcard">
      <div  @click="findDetail(item.companyId)">
        <img class="jobavatar" :src="item.companyLogo"/>
        <div class="introduce">
          <p>{{item.companyName}}</p>
          <p>{{item.type}}</p>
          <p><i class="el-icon-location-outline" ></i>{{item.location}}<span>|</span><i class="el-icon-money"></i>薪水{{item.baseSalary}}-{{item.highSalary}}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import fetch from '../api/fetch'
import axios from 'axios'

export default {
  data () {
    return {
      content: localStorage.getItem('content'),
      list: [],
      
    }
  },
  mounted () {
    this.getJob()
  },
  methods: {
    findDetail (id) {
      localStorage.setItem('jobId', id)
      this.$router.push('jobInfo');
    },
    getJob () {
      axios.get('http://youngoldman.top:5555/api/job/list')
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            if (res.data.code===0) {
              this.list=res.data.data;
            }
          }
          console.log(this.list);
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style>
.nojob {
  margin: 20px auto auto auto;
}
.jobcard {
  width: 1000px;
  margin: 20px auto auto auto;
}
.jobavatar {
  float: left;
  width: 126px;
  height: 110px;
  margin: auto 14px 20px auto;
}
.introduce {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.introduce p {
  font-size: 18px;
  margin-bottom: 14px;
}
</style>