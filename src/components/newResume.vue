<template>
  <el-dialog title="新建简历" v-bind:visible.sync="create" :modal-append-to-body="false" class="myDialog" :show-close="false">
      <el-form :model="resumeList" status-icon :rules="resumerules" ref="resumeInfo" label-width="120px"
               class="resumeInfoForm">
       
        <el-form-item label="姓名" prop="name">
          <el-input v-model="resumeList.name" auto-complete="off"></el-input>
        </el-form-item>
      
        <el-form-item label="性别" prop="sex">
          <el-select v-model="resumeList.sex" placeholder="请选择性别" style="width: 100%">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
  
        <el-form-item label="年龄" prop="age">
          <el-input v-model="resumeList.age" ></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model="resumeList.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="resumeList.email"></el-input>
        </el-form-item>
        
        <el-form-item label="地址" prop="address">
          <el-input v-model="resumeList.address"></el-input>
        </el-form-item>
        <el-form-item label="能力介绍" prop="advantage">
          <el-input type="textarea" placeholder="建议填写自己的技术栈，获奖情况等等" :autosize="{ minRows: 6, maxRows: 10}" v-model="resumeList.advantage"></el-input>
        </el-form-item>
        <el-form-item label="个人经历" prop="experience">
          <el-input type="textarea" placeholder="建议填写自己的项目经历，工作经历等等" :autosize="{ minRows: 6, maxRows: 10}" v-model="resumeList.experience"></el-input>
        </el-form-item>
        
        
        <el-form-item>
          <el-button @click="cancelSubmit">取消</el-button>
          <el-button type="primary" @click="changeResume('resumeInfo')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</template>


<script>/* eslint-disable indent */

import axios from 'axios'

export default {
  props:["create"],
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
      len: 0,
      tip: 0,
      isChange: false,
      dialogFormVisible: false,
      resumeFormVisible: false,
      resumeList: {
        userId: sessionStorage.getItem('userId'),
        address: '',
        name: '',
        sex: '',
        adavantage: '',
        email: '',
        experience: '',
        phone: '',
        // school: '',
      },
      tableList: [],
      employeeId: null,
      hid: null,
      eid: null,
      haveResume: false,
      value: '',
      options: [
        {
          value: '2018',
          label: '2018'
        },
        {
          value: '2019',
          label: '2019'
        },
        {
          value: '2020',
          label: '2020'
        },
        {
          value: '2021',
          label: '2021'
        },
        {
          value: '2022',
          label: '2022'
        }
      ],
      resumerules: {
        name: [{validator: checkname, trigger: 'blur'}],
        sex: [{validator: checksex, trigger: 'blur'}],
        address: [{validator: checkaddress, trigger: 'blur'}],
        introduce: [{validator: checkintroduce, trigger: 'blur'}],
        endTime: [{validator: checkendTime, trigger: 'blur'}],
        phone: [{validator: checkphone, trigger: 'blur'}],
        school: [{validator: checkschool, trigger: 'blur'}],
        age: [{validator: checkage, trigger: 'blur'}],
        email: [{validator: checkemail, trigger: 'blur'}],
        experience: [{validator: checkexperience, trigger: 'blur'}],
        awards: [{validator: checkaward, trigger: 'blur'}]
      }
    }
  },
  // async created(){
    // await this.getEmployeeInfo();
  // },
  mounted () {
    // let userId = sessionStorage.getItem('userId')
    this.getEmployeeInfo();
    this.getHrInfo();
    this.getResume();
    
  },
  watch: {
    tip() {
      location.reload()
    },
    
  },
  methods: {
    // 通过token获取Hunter的id
    getHrInfo(){
      let link="http://youngoldman.top:5555/api/jobHunter/getJHInfo/"+localStorage.getItem('token');
      axios.get(link)
      .then(res => {
        console.log(res);
        if(res.status === 200){
          this.hid=res.data.data.uid;
          console.log("hid==>" + this.hid)
          // console.log("gotta!"+this.employeeId);
        }
      })
    },

    getEmployeeInfo(){
      // 通过工作获取对应的employee的id
      axios
        .get("http://youngoldman.top:5555/api/job/query/"+localStorage.getItem("jobId"))
        .then((res) => {
          this.eid = res.data.data.employeeId;
          console.log("eid==>" + this.eid);
        });

    },
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
    
    async getResume () {
      console.log(this.eid);
      console.log(this.hid)
      // localStorage.getItem('');
      axios.get('http://youngoldman.top:5555/api/resume/query',{
        hid:this.hid
      })
        .then(res => {
          if (res.status === 200) {
            console.log(res);
            if (res.data.code === 0) {
              if (res.data.data !== null) {
                this.haveResume = true
                this.resumeList = res.data.data
                this.tableList = res.data.data
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

    changeResume (formName) {
      // await this.getEmployeeInfo();
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.post('http://youngoldman.top:5555/api/resume/delivery',{
            name:this.resumeList.name,
            gender:this.resumeList.gender,
            birthday:this.resumeList.birthday,
            location: this.resumeList.location,
            phone:this.resumeList.phone,
            email:this.resumeList.email,
            advantage:this.resumeList.advantage,
            page:this.resumeList.experience,
            jid:localStorage.getItem('jobId'),
            eid:this.employeeId,
            hid:this.hid,
          })
          .then(res=>{
            if (res.status === 200) {
              if (res.data.code===0) {
                this.$message({
                  message: '投递成功',
                  type: 'success'
                })
                this.tip++;
                // this.resumeFormVisible = false;
                this.create = false;
                // this.isChange = false;
              }
              this.$emit('update:create', false);
            }
          }).catch(e => {
            console.log(e)
          })

        }
      })
    },
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
</style>