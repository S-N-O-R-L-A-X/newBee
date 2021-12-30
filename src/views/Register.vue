<template>
  <div id="container">
    <el-card class="register">
      <div class="choice" ref="choice">
        
      </div>
      
      <el-form :model="user" status-icon :rules="validation" ref="user" label-width="100px" class="hrruleForm">
        <el-form-item prop="username">
          <el-input class="registerInput" type="text" v-model="user.username" auto-complete="off" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input type="password" v-model="user.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item  prop="checkPass">
          <el-input type="password" v-model="user.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
        </el-form-item>

        <el-switch v-model="user.status" active-color="#409eff" inactive-color="#13ce66" active-value="1" inactive-value="0"
          active-text="我要招聘" inactive-text="我要找工作"></el-switch>
        
        <el-form-item prop="verifyCode">
          <el-col :span="10">
            <el-input v-model="user.phone" placeholder="手机号"></el-input>
          </el-col>
        
          <el-col :span="10" >
            <el-input class="code" v-model="user.verifyCode" placeholder="验证码"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button  @click="sendCode">{{msg}}</el-button>
          </el-col>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" class="registerBtn" @click="register('user')">注册</el-button>
        </el-form-item>
        <div class="footer-tip3" @click="toLogin">
            已有账号?直接登录
        </div>
      </el-form>
    </el-card>
  </div>
</template>


<script>

import fetch from '../api/fetch'
import axios from 'axios'
export default {
  data() {
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入验证码"))
      } else {
        callback()
      }
    }

    var checkCompany = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择公司"))
      } else {
        return callback()
      }
    }

    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入手机号"))
      } else if(!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)) {
        return callback(new Error("请输入正确的手机号"))
      } else {
        callback()
      }
    }

    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱"))
      } else if(!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
        return callback(new Error("请输入正确的邮箱"))
      }else {
        callback()
      }
    }
    var validUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"))
      } else if (!/^\w+$/gi.test(value)) {
        callback(new Error("用户名必须由英文或者数字组成"))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.user.checkPass !== "") {
          this.$refs.user.validateField("checkPass")
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"))
      } else if (value !== this.user.password) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    }
    return {
      msg: "发送验证码",
      count: "",
      timer: null,
      show: true,
      confirmCode: "",
      companyId: "",
      isHr: false,
      options: [],
      dialogShow: false,
      tipsShow: false,
      companyInfo: {
        name: '',
        avatar: '',
        introduce: '',
        scale: '',
        type: ''
      },
      formLabelWidth: '120px',
      user: {
        username: "",
        password: "",
        status: 0,
        phone: "",
        verifyCode: ""
      },
      validation: {
        verifyCode: [{validator: checkCode, trigger: "blur"}],
        company: [{validator: checkCompany, trigger: "blur"}],
        username: [{validator: validUsername, trigger: "blur"}],
        password: [{validator: validatePass, trigger: "blur"}],
        checkPass: [{validator: validatePass2, trigger: "blur"}],
        phone: [{validator: checkPhone, trigger: "blur"}],
        email: [{validator: checkEmail, trigger: "blur"}]
      }
    }
  },

  mounted() {
    // this.getCompany()
  },

  methods: {

    sendCode() {
      const TIME_COUNT=60;
      
      if (/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.user.phone)){
        let link='http://youngoldman.top:5555/api/service/sms/'+this.user.phone;
        
        axios.get(link)
        .then(res =>{
          console.log(res);
          if (res.status === 200) {
            if (res.data.code === 0) {
              this.$message({
                message: '发送成功',
                type: 'success'
              });
            }
          }
        })
        .catch(e => {
          console.log(e)
        })
      }
      
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
            this.msg = this.count + "s后可重发"
            if (this.count === 0) {
              this.msg = '发送验证码'
            }
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    register(formName){
      this.$refs[formName].validate(valid => {
        if (valid && !this.tipsShow) {
          
          axios.post("http://youngoldman.top:5555/api/user/register",{
            username:this.user.username,
            password:this.user.password,
            phone:this.user.phone,
            status:this.user.status,
            verifyCode: this.user.verifyCode,
          })
          .then(res=>{
            if(res.status===200){
              if(res.data.code===0){
                this.$router.push('login');
              }
              else if(res.data.code===201){
                this.$message({
                    message: res.data.msg,
                    type: 'warning'
                  })
              }
              else if(res.data.code===100){
                this.$message({
                    message: res.data.msg,
                    type: 'warning'
                  })
              }
            }
          })
          .catch(e=>{
            alert(e);
          })
        }
      })
    },

    toLogin() {
      this.$router.push("/login");
    },

    
    // 注册切换角色
    changeTabs(isHr) {
      if (!isHr) {
        this.$refs.choice.firstChild.style.fontWeight = '700'
         this.$refs.choice.lastChild.style.fontWeight = '400'
      } else {
        this.$refs.choice.firstChild.style.fontWeight = '400'
        this.$refs.choice.lastChild.style.fontWeight = '700'
      }
      this.isHr = isHr;
    },
    toIndex() {
      this.$router.push('index');
    }
  }
}
</script>



<style scoped>
/* @import "../assets/Animate/animate.min.css"; */
  .register {
    width:60%;
    margin-left:auto;
    margin-right:auto;
  }

  /* .registerInput{
    width:100%;
  } */

  /* .el-form-item{
    text-align: center;
  }

  .el-form-item__content {
    text-align:center;
  } */

  .footer-tip3{
    /* position: absolute; */
    bottom: 16px;
    right: 16px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.5);
  }
  
  .code{
    width:90%;
  }

  .registerBtn {
    width: 100%;
  }


  /* .hrForm {
    background: #fff;
    border: 1px solid #ededed;
    width: 555px;
    min-height: 630px;
    margin: 120px auto 150px auto;
    box-shadow: 0px 5px 8px #888;
    border-radius: 8px;
    padding-top: 36px;
    position: relative;
  } */

  /* .el-card{
    width:60%;
    left:20%;
  } */

  /* .registerForm {
    background: #fff;
    border: 1px solid #ededed;
    width: 450px;
    height: 320px;
    margin: 250px auto 250px auto;
    box-shadow: 0px 5px 8px #888;
    border-radius: 8px;
    position: relative;
  }
 */
  


  /* .hrruleForm {
    width: 500px;
    position: relative;
    top: 14px;
    left: -14px;
    padding: 14px 14px 14px 100px;
  }

  .choose {
    width: 100%;
  } */


  

  .tips {
    margin-top: -20px;
    text-align: left;
    cursor: pointer;
    color: red;
    font-size: 14px;
  }

  .bg_bottom {
    position: fixed;
    bottom: 0;
    right: 0;
  }

  .bg_bottom2 {
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .introduceCompany {
    color: #5f6368;
    font-size: 20px;
    font-weight: bold;
    position: absolute;
    top: 0;
    right: 0;
    width: 320px;
    height: 600px;
    padding: 30px 30px 0 0;
  }

  .introduceCompany img {
    width: 300px;
    height: 300px;;
    margin-bottom: 20px;
    cursor: pointer;
  }


  .companyForm {
    padding: 0 66px;
  }

  
</style>
