<template>
  <div>
    <el-collapse>
      <el-collapse-item title="搜索框">
        <el-card>
          <el-form class="searchForm" :inline="true">
            <el-form-item>
              <el-input placeholder="搜索心仪的职位" style="width:20rem" v-model="jobInfo.content" @change="searchJob()" prefix-icon="iconfont el-icon-search"></el-input>
            </el-form-item>
            <el-form-item label="工作地点" prop="location" class="jobinput">
                <el-cascader :options="options" v-model="jobInfo.location" @change="handleChange()" clearable></el-cascader>
            </el-form-item>
            <el-form-item label="期望薪水" prop="salary" class="jobinput">
                <el-input-number v-model="jobInfo.salary" size="small" :min="1" :max="10000000" label="描述文字"></el-input-number> 
            </el-form-item> 
            <el-form-item>
              <el-button type="primary" @click="searchJob()">查询</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-collapse-item>
    </el-collapse>

    <el-card class="nojob" v-if="list.length===0">暂时没有该岗位信息</el-card>
    <el-card v-if="list.length>0" v-for="(item, key) in list" :key="key" class="jobcard">
      <div  @click="findDetail(item.id)">
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
import {regionDataPlus,CodeToText} from 'element-china-area-data'


export default {
  data () {
    return {
      options: regionDataPlus,
      list: [],
      
      jobInfo:{
        location:"",
        content:"",
        salary:"",
      }
    }
  },
  // created(){
  //   this.getAllJobs();
  // },
  mounted () {
      this.getAllJobs();
  },
  methods: {
    findDetail (id) {
      localStorage.setItem('jobId', id)
      this.$router.push('jobInfo');
    },
    getAllJobs () {
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
    },
    searchJob () {
      console.log(this.jobInfo.content);
      console.log(this.jobInfo.salary);
      console.log(this.jobInfo.location);

      axios.get('http://youngoldman.top:5555/api/job/query',{params:{
        type:this.jobInfo.content,
        salary:this.jobInfo.salary,
        location:this.jobInfo.location
      }})
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
    },
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
  width: 250px;
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