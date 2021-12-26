<template>
<el-collapse v-model="showSearch">
  <el-collapse-item >
<el-card class="mycard">
 <el-form>
      <el-form-item>
        <el-input placeholder="搜索心仪的职位"  v-model="jobInfo.content" @change="searchJob()" prefix-icon="iconfont el-icon-search"></el-input>
      </el-form-item>
      <el-form-item label="工作地点" prop="location" class="jobinput">
          <el-cascader :options="options" v-model="jobInfo.location" @change="handleChange()" clearable></el-cascader>
      </el-form-item>
      <el-form-item label="薪水" prop="salary" class="jobinput">
          <el-col :span="6">
              <el-input-number v-model="jobInfo.baseSalary" size="small" :min="1" :max="1000" label="描述文字"></el-input-number>
          </el-col>
          <el-col :span="4">
              --
          </el-col>
          <el-col :span="6">
              <el-input-number v-model="jobInfo.highSalary" size="small" :min="1" :max="1000" label="描述文字"></el-input-number>
          </el-col>
      </el-form-item> 
    </el-form>
</el-card>
  </el-collapse-item>
</el-collapse>
</template>


<script>/* eslint-disable indent */

import fetch from '../api/fetch'

export default {
    data () {
    var checkname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'))
      } else {
        callback()
      }
    }
    var checksex = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('性别不能为空'))
      } else {
        callback()
      }
    }
    var checkintroduce = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('简介不能为空'))
      } else {
        callback()
      }
    }
    var checkendTime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('毕业年份不能为空'))
      } else {
        callback()
      }
    }
    var checkschool = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('学校不能为空'))
      } else {
        callback()
      }
    }
    var checkexperience = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('经历不能为空'))
      } else {
        callback()
      }
    }
    var checkaddress = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('地址不能为空'))
      } else {
        callback()
      }
    }
    var checkage = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      } else {
        callback()
      }
    }
    var checkphone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        callback()
      }
    }
    var checkemail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      } else {
        callback()
      }
    }
    var checkaward = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('获奖不能为空'))
      } else {
        callback()
      }
    }
   
    return {
      
      list: [],
      showSearch:false,
      jobInfo:{
        location:"",
        content:"",
        baseSalary:"",
        highSalary:"",
      }
    }
  },
  mounted () {
    let userId = sessionStorage.getItem('userId')
    this.getResume(userId)
  },
  watch: {
    tip() {
      location.reload()
    },
    
  },
  methods: {
    cancelChange () {
      this.isChange = !this.isChange
    },
    cancelSubmit () {
      this.create = false;
      this.$emit('update:create', false);
    },
    deleteItem (key) {
      this.resumeList.skills.splice(key, 1)
    },
    changeResume (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          fetch.sendResume(this.resumeList).then(res => {
            if (res.status === 200) {
              if (res.data.success) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.tip++
                this.resumeFormVisible = false
                this.dialogFormVisible = false
                this.isChange = false
              }
            }
          }).catch(e => {
            console.log(e)
          })
        }
      })
    },
    getResume (userId) {
      fetch
        .getResume(userId)
        .then(res => {
          if (res.status === 200) {
            if (res.data.success === true) {
              if (res.data.data !== null) {
                this.haveResume = true
                this.resumeList = res.data.data
                this.tableList = res.data.data
                this.len = res.data.data.skills.length
              } else {
                this.haveResume = false
              }
            }
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    addSkill () {
      let newskills = {
        id: 0,
        level: 0,
        name: '',
        resumeId: 0
      }
      this.resumeList.skills.push(newskills)
    }
  },

}
</script>


<style scoped>
  .input {
    width: 45%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    outline: 0;
    background: #fff;
    padding: 0 15px;
    margin: auto 11.2px 14px auto;
  }
  .delete {
    color: #dcdfe6;
    position: relative;
  }
  .delete:hover {
    color: red;
  }
  .select {
    width: 45%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    outline: 0;
    background: #fff;
    padding: 0 15px;
    margin: auto 11.2px 14px auto;
  }

  .myDialog {
    width: 90%;
  }

  .mycard{
    width:80%;
    height:60%;
  }
</style>