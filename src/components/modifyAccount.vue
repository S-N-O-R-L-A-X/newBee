<template>
  <div>
    <el-collapse>
      <el-collapse-item title="修改手机号" name="1" class="set">
        <el-form :model="phoneForm" status-icon :rules="phonerules" ref="phoneForm" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="手机号" prop="phone" class="settinginput">
            <el-input v-model="phoneForm.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" @click="changePhone('phoneForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="修改密码" name="2" class="set">
        <el-form :model="passwordForm" status-icon :rules="passwordrules" ref="passwordForm" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="旧密码" prop="oldPassword" class="settinginput">
            <el-input type="password" v-model="passwordForm.oldPassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword" class="settinginput">
            <el-input type="password" v-model="passwordForm.newPassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="againNew" class="settinginput">
            <el-input type="password" v-model="passwordForm.againNew" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" @click="changePassword('passwordForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="修改邮箱" name="3" class="set">
        <el-form :model="emailForm" status-icon :rules="emailrules" ref="emailForm" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="新邮箱" prop="email" class="settinginput">
            <el-input v-model="emailForm.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" @click="changeEmail('emailForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<style scoped>
  .demo-ruleForm {
    margin-top: 20px
  }

  .set {
    margin-top: 21px;
    font-size: 14px;
    color: #909399
  }

  .btn {
    position: relative;
    top: -62px;
    left: 225px;
  }

  .settinginput {
    width: 75%
  }
</style>

<script>/* eslint-disable indent */
  export default {
    data () {
      var checkphone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
      var checkpass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入正确的密码'))
        } else if (value !== this.passwordForm.password) {
          return callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      }
      var confirmPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请再次输入正确的密码'))
        } else {
          callback()
        }
      }
      var checkemail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入正确的邮箱'))
        } else {
          callback()
        }
      }
      return {
        phoneForm: {
          phone: ''
        },
        passwordForm: {
          oldPassword: '',
          newPassword: '',
          againNew:'',
        },
        emailForm: {
          email: ''
        },
        phonerules: {
          phone: [{validator: checkphone, trigger: 'blur'}]
        },
        passwordrules: {
          password: [{validator: checkpass, trigger: 'blur'}],
          checkpass: [{validator: confirmPass, trigger: 'blur'}]
        },
        emailrules: {
          email: [{validator: checkemail, trigger: 'blur'}]
        }
      }
    },
    methods: {
      // changePhone (formName) {
      //   this.$refs[formName].validate(valid => {
      //     if (valid) {
      //       fetch.changePhone(this.phoneForm).then(res => {
      //         if (res.status === 200) {
      //           if (res.data.code===0) {
      //             this.$message({
      //               message: '修改成功',
      //               type: 'success'
      //             })
      //           }
      //         }
      //       }).catch(e => {
      //         console.log(e)
      //       })
      //     } else {
      //       console.log('error submit!!')
      //     }
      //   })
      // },
      changePassword (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            delete this.passwordForm.checkpass;
            axios.post('http://youngoldman.top:5555/api/user/updatePassword',{
              "oldPassword":this.passwordForm.oldPassword,
              "newpassword":this.passwordForm.newpassword,
            })

            .then(res => {
               if (res.data.code===0) {
                 this.$message({
                   message: '修改成功',
                   type: 'success'
                 })
               }
            }).catch(e => {
              console.log(e)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // changeEmail (formName) {
      //   this.$refs[formName].validate(valid => {
      //     if (valid) {
      //       fetch.changeEmail(this.emailForm).then(res => {
      //       }).catch(e => {
      //         console.log(e)
      //       })
      //     } else {
      //       console.log('error submit!!')
      //       return false
      //     }
      //   })
      // }
    }

  }
</script>
