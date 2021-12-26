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
            <el-form-item label="薪水" prop="salary" class="jobinput">
                <!-- <el-col :span="8"> -->
                    <el-input-number v-model="jobInfo.baseSalary" size="small" :min="1" :max="1000" label="描述文字"></el-input-number>
                <!-- </el-col> -->
                <!-- <el-col :span="4"> -->
                    --
                <!-- </el-col> -->
                <!-- <el-col :span="8"> -->
                    <el-input-number v-model="jobInfo.highSalary" size="small" :min="1" :max="1000" label="描述文字"></el-input-number>
                <!-- </el-col> -->
            </el-form-item> 
          </el-form>
        </el-card>
      </el-collapse-item>
    </el-collapse>

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
import {regionDataPlus,CodeToText} from 'element-china-area-data'


export default {
  data () {
    return {
      options: regionDataPlus,
      list: [],
      
      jobInfo:{
        location:"",
        content:"",
        baseSalary:"",
        highSalary:"",
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
      console.log("search");
      axios.get('http://youngoldman.top:5555/api/job/query',{params:{
        type:this.content,
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