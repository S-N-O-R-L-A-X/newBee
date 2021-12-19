<template>
  <el-header>
    <div class="contain">
      <div>
        <span @click="redirect(1)" class="tab">首页</span>
        <span v-if="isHr" @click="createJob=true" class="tab">发布职位</span>
        <span v-if="isHr && !isLogin" @click="redirect(6)" class="tab">个人中心</span>
        <span @click="redirect(2)" class="tab" v-if="!isHr && !isLogin">个人中心</span>
        <span @click="redirect(7)" class="tab" v-if="!isHr && !isLogin">工作广场</span>
        <span class="tab" v-if="!isHr">
          <el-input placeholder="搜索心仪的职位" style="width:18rem" v-model="content" @change="getJob(content)" prefix-icon="iconfont el-icon-search"></el-input>
        </span>
      </div>
      <div>
        <span @click="redirect(3)" class="tab" v-show="!isLogin">
          <i class="el-icon-message" style="margin-right:0.3rem" @click="redirect(5)">
            </i>消息中心<span class="icon" v-show="count > 0" ref="icon">{{ count }}</span>
          </span>
        <span v-if="isLogin">
          <el-button style="background:#2F2F2F;" @click="redirect(4)"> <span class="tab">登录</span></el-button>
          <el-button style="background:#2F2F2F;" @click="toRegister()"> <span class="tab">注册</span></el-button>
        </span>

        <NewJob v-bind:newJobVisible="createJob" v-on:update:newJobVisible='createJob=$event'></NewJob>

        <span v-if="!isLogin" class="tab" @click="logout()">退出登录</span>
      </div>
    </div>
  </el-header>
</template>


<script>
import fetch from '../api/fetch'
import axios from 'axios'
import NewJob from './newJob'

export default {
  components: {NewJob},
  data () {
    var checktitle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('职位名称不能为空'))
      } else {
        callback()
      }
    }
    var checkintroduce = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('职位介绍不能为空'))
      } else {
        callback()
      }
    }
    var checkskill = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('技术要求不能为空'))
      } else {
        callback()
      }
    }
    return {
      index: 0,
      count: 0,
      amount: 0,
      websocket: null,
      publishInfo: {
        hrId: '',
        title: '',
        content: '',
        companyId: '',
        skillList: [
          {
            name: '',
            weight: 0
          }
        ]
      },
      createJob:false,
      // publishvisible: false,
      isHr: false,
      content: '',
      companyList: [],
      msg: '',
      isLogin: true,
      publishRules: {
        title: [{validator: checktitle, trigger: 'blur'}],
        content: [{validator: checkintroduce, trigger: 'blur'}],
        skillList: [{validator: checkskill, trigger: 'blur'}]
      }
    }
  },
  created () {
    this.initWs();
    // location.reload();
  },
  
  methods: {
    initWs () {
      if (sessionStorage.getItem('userId') !== null) {
        if ('WebSocket' in window) {
          this.websocket = new WebSocket('ws://pf.stalary.com/push/ws/' + `${sessionStorage.getItem('userId')}`, [])
        } else {
          alert('浏览器不支持WebSocket')
        }
        this.websocket.onopen = this.openWS
        this.websocket.onmessage = this.receiveWSMessage
        this.websocket.onclose = this.closeWS
      }
    },
    openWS (e) {
      console.log('建立连接')
    },
    receiveWSMessage (e) {
      console.log('接收消息' + e.data)
      this.count = parseInt(e.data)
    },
    closeWS (e) {
      console.log('关闭连接')
    },
    redirect (num) {
      switch(num){
        case 1:this.$router.push('index');break;
        case 2:this.$router.push('userInfo');break;
        case 3:
        case 5:
          this.$router.push('messageCenter');break;
        case 4:this.$router.push('login');break;
        // case 5:this.$router.push('infoCenter');break;
        case 6:this.$router.push('hrInfo');break;
        case 7:this.$router.push('allJobs');break;
        default:break;
      }
    },
    toRegister () {
        this.$router.push('register');
    },
    getJob (value) {
      if (value !== null) {
        localStorage.setItem('content', value)
      }
      this.$router.push({name: 'allJobs', params: {count: 1}})
    },

    logout(){
      let tk=localStorage.getItem('token');
      
      axios.get('http://youngoldman.top:5555/api/user/logout/'+tk,{
          // token:tk,
      })
      .then(res => {
          if (res.status === 200) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            // sessionStorage.removeItem('userId')
            localStorage.removeItem('role');
            localStorage.removeItem('token');
            // localStorage.removeItem('count')
            // this.websocket.close()
            this.isLogin=true;
            this.$router.push('login');
          }
        })
        .catch(e => {
          console.log(e)
        })
        .finally(()=>{
          console.log(localStorage.getItem('token'));
          
        })

    },

    
    changeStatus() {
      this.publishvisible = true
    }
  },
  watch: {
    amount () {
      location.reload()
    },
    // updateisLogin(){
    //   if(localStorage.getItem('token')){
    //     this.isLogin=false;
    //   }
    //   else{
    //     this.isLogin=true;
    //   }
    // }
    
  },
  mounted () {
    
    // console.log(sessionStorage.getItem('token'));
    if(localStorage.getItem('token')){
      this.isLogin=false;
    }

    if(localStorage.getItem('role')==='2'){
      this.isHr=true;
    }

    // if (sessionStorage.getItem('token')) {
    //   this.isLogin = false
      
    // }
    // if (localStorage.getItem('role') === '2') {
    //   this.isHr = true;
    // }
  },
}
</script>


<style>
  html * {
    padding: 0;
    margin: 0;
  }
  * {
    box-sizing: border-box;
  }
  header {
    width: 100%;
    /* height: 60px; */
    background: rgba(0,0,0,0.8);
  }
  .contain {
    display: flex;
    justify-content: space-between;
    width: 1000px;
    margin: auto;
    line-height: 60px;
    font-weight: 500;
  }
  .contain .tab{
    cursor: pointer;
    color: white;
    font-size: 16px;
    margin: 10px;
    padding: 6px;
    border-radius: 4px;
  }


  .icon {
    position: relative;
    background: red;
    font-size: 10px;
    border-radius: 50%;
    left: 0;
    top: -8px;
    padding: 0 5px;
    color: #fff;
  }

  .requireinput {
    width: 35%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    outline: 0;
    background: #fff;
    padding: 0 15px;
    margin: auto 11.2px 14px auto;
  }

  .requireselect {
    width: 35%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    outline: 0;
    background: #fff;
    padding: 0 15px;
    margin: auto 11.2px 14px auto;
  }

  .require {
    width: 80%;
  }

  .addbtn {
    position: relative;
    top: 40px;
    left: 280px;
  }

  .delete {
    color: #dcdfe6;
    position: relative;
    left: -10px;
  }

  .delete:hover {
    color: red;
  }

</style>
