<template>
  <el-form :model="resumeList" status-icon :rules="resumerules" ref="resumeInfo" label-width="100px"
               class="resumeInfoForm">
        <el-row>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="resumeList.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="resumeList.sex" placeholder="请选择性别" style="width: 100%">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        </el-row>
        
        <el-row>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="resumeList.age"></el-input>
        </el-form-item>
        </el-row>

        <el-row>
        <el-form-item label="地址" prop="address">
          <el-input v-model="resumeList.address"></el-input>
        </el-form-item>
        </el-row>

        <el-form-item label="我的简介" prop="introduce">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="resumeList.introduce"></el-input>
        </el-form-item>
        <el-form-item label="毕业年份" prop="endTime" >
          <el-input v-model.number="resumeList.endTime"></el-input>
        </el-form-item>
        <el-form-item label="学校" prop="school">
          <el-input v-model="resumeList.school"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="resumeList.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="resumeList.email"></el-input>
        </el-form-item>
        <el-form-item label="技术栈" prop="skills">
          
          
          <el-col span="6">
            <el-input v-model="resumeList.skills"></el-input>
          </el-col>

          <el-col span="6">
              <select class="select" v-model="item.level">
                <option label="了解" value=1></option>
                <option label="熟悉" value=2></option>
                <option label="掌握" value=3></option>
                <option label="精通" value=4></option>
              </select>
              <i class="el-icon-error deleteIt" @click="deleteItem(key)"></i>
          </el-col>  
          
          <el-col span="6">
          <el-button @click="addSkill()" >添加</el-button>
          </el-col>

        </el-form-item>
        <el-form-item label="工作(实习)经历" prop="experience">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="resumeList.experience "></el-input>
        </el-form-item>
        <el-form-item label="获奖经历" prop="awards">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="resumeList.awards"></el-input>
        </el-form-item>
  </el-form>
</template>

<script>
import fetch from '../api/fetch';
import advertisement from '../components/advertisement';


export default {
  components:{advertisement},
  data () {
    return {
      resumeList: {
        userId: sessionStorage.getItem('userId'),
        address: '',
        name: '',
        sex: '',
        introduce: '',
        age: '',
        avatar: '',
        awards: '',
        email: '',
        endTime: '',
        experience: '',
        phone: '',
        school: '',
        skills: [
          {
            level: 0,
            name: ''
          }
        ]
      },
      crouselImg: [
        {img: 'https://sxsimg.xiaoyuanzhao.com/3C/09/3C4A275077015CBF398443CC21774709.png'},
        {img: 'https://sxsimg.xiaoyuanzhao.com/C3/55/C35273E2AAA17DBA580304E05DF22155.png'},
        {img: 'https://sxsimg.xiaoyuanzhao.com/C6/FC/C60F54D6D175ABAF3E9A33F0FDE867FC.png'},
        {img: 'https://sxsimg.xiaoyuanzhao.com/FD/0C/FDBBBD21A98136E3054ADDD432A5020C.png'}

      ],
      activeIndex2: '1',
      currentDate: '完美',
      company: '',
      companyList: [],
      jobList: [],
      recommandList: [],
      isHr: localStorage.getItem('role') === '1',
      isLogin: localStorage.getItem('token') ? true : false,
      isShow:  false,
      getResumeList: {
          name: '',
          sex: '',
          age: '',
          skills: [{
            id: 1,
            name: '',
            level: '',
            resumeId: 1
          }],
          school: '',
          address: '',
          endTime: 2019,
          phone: '',
          email: '',
          introduce: '',
          experience: '',
          awards: '',
          avatar: ''
        },
    }
  },

  mounted () {
    window.addEventListener('scroll', this.handler)
    this.getCompany()
    this.getJob()
    this.getRecommand()
  },
  methods: {
    handler() {
      let info = document.getElementById('aboutusInfo') || null
      let card = document.getElementsByClassName('temp')[0] || null
      if (info === null || card === null) {
          return;
      }
      else if (document.documentElement.scrollTop > 1000) {
         card.classList.add('animated')
         card.classList.add('bounceInLeft')
         info.classList.add('animated')
         info.classList.add('bounceInLeft')
      } else {
        info.classList.remove('animated')
        info.classList.remove('bounceInLeft')
        card.classList.remove('animated')
        card.classList.remove('bounceInLeft')
      }
    },

    jobDetail (id) {
      localStorage.setItem('jobId', id)
      this.$router.push({name: 'jobInfo'})
    },

    getJob () {
      fetch.findJob().then(res => {
        if (res.status === 200) {
          if (res.data.success === true) {
            this.jobList = res.data.data.recruitList
          }
        }
      }).catch(e => {
        console.log(e)
      })
    },

    getCompany () {
      fetch.getCompany().then(res => {
        if (res.status === 200) {
          this.companyList = res.data.data.companyList
        }
      })
    },

    getCompanyDetail (id) {
      localStorage.setItem('companyId', id)
      this.$router.push({name: 'companyDetail'})
    },
    // 获取推荐列表
    getRecommand () {
      if (this.isLogin) {
        if (this.isHr) {
        fetch.recommendCandidate().then(res => {
          if (res.status === 200) {
            this.recommandList = res.data.data
          }
        })
      } else {
        fetch.recommendJob().then(res => {
        if (res.status === 200) {
          this.recommandList = res.data.data
        }
      })
      }
    }
  },
  // 查看推荐候选人
  getTableList(id) {
      this.isShow = true
        fetch
          .getResume(id)
          .then(res => {
            if (res.status === 200) {
              if (res.data.success === true) {
                if (res.data.data !== null) {
                  this.getResumeList = res.data.data
                }
              }
            }
          })
          .catch(e => {
            console.log(e)
          })
      }
},

}
</script>


<style scoped>
@import "../assets/Animate/animate.min.css";

</style>
