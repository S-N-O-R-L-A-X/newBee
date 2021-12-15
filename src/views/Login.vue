<template>
  <div class="container">
    <el-card class="login">
      <div slot="header">
        <span>用户登录</span>
      </div>
      <div>
        <el-form :model="loginInfo" status-icon :rules="rules2" ref="loginInfo" class="loginForm">
          <el-form-item  prop="username" >
            
            <el-input type="text" v-model="loginInfo.usernameORphone" auto-complete="off" class="loginInput" placeholder="输入用户名或手机密码" suffix-icon="iconfont el-icon-s-custom"></el-input>
          </el-form-item>
          <el-form-item  prop="password">
            <el-input type="password" v-model="loginInfo.password" auto-complete="off" class="loginInput" placeholder="密码" suffix-icon="iconfont el-icon-key"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="loginBtn" @click="submitForm('loginInfo')" >登录</el-button>
          </el-form-item>
          <div class="footer-tip3" @click="toRegister()">
            已有账号?直接登录
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>


<script>/* eslint-disable indent */

  import fetch from '../api/fetch'
  import index from '../api/index'
  import axios from 'axios'
  export default {
    data () {
      var validUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名或手机号！'))
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      return {
        loginInfo: {
          usernameORphone: '',
          password: ''
        },
        rules2: {
          username: [{validator: validUsername, trigger: 'blur'}],
          password: [{validator: validatePass, trigger: 'blur'}]
        },
        classList:[],
      }
    },
    mounted() {
        
    },
    methods: {
      backIndex () {
        this.$router.push({name: 'index'})
      },
      toRegister () {
        this.$router.push('register');
      },
      submitForm (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            // fetch.login(this.loginInfo)
            // axios.post(index.login(),{params:{
            //   "usernameORphone":this.user.usernameORphone,
            //   "password":this.user.password
            // }})
            axios.post('http://youngoldman.top:5555/api/user/login',{
              "usernameORphone":this.loginInfo.usernameORphone,
              "password":this.loginInfo.password            
            })
            
              .then(res => {
                console.log(res);
                if (res.status === 200) {
                  if (res.data.code===0) {//interviewee
                    localStorage.setItem('token', res.data.token)
                    // localStorage.setItem('companyId', res.data.data.companyId)
                    // localStorage.setItem('role', res.data.data.role)
                    // sessionStorage.setItem('userId', res.data.data.userId)
                    if (res.data.status === 2) {
                      this.$router.push({name: 'userInfo', params: {refresh: 1}})
                    } else {
                      this.$router.push({name: 'HRInfo', params: {hrRefresh: 2}})
                    }
                  } 
                  else if(res.data.code===200){
                    this.$message({
                      message: '用户名或密码错误',
                      type: 'warning'
                    })
                  }
                }
              })
              .catch(e => {
                console.log(e)
              })
          }
        })
      },
    }
  }
</script>


<style scoped>

  .login{
    width:60%;
    margin-left:auto;
    margin-right:auto;
  }

  /* .loginForm {
    padding: 0 36px;
  } */

  .loginInput {
    width: 100%;
    
  }

  .footer-tip3 {
    color: rgba(0, 0, 0, 0.5);
    font-size: 16px;
    cursor: pointer;
    /* position: absolute; */
    bottom: 16px;
    right: 16px;
  }
  

  .loginBtn {
    width: 100%;
  }

</style>
