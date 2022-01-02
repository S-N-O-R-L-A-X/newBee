<template>
  <div class="getResumeWrap">
    <div v-if="show" class="nofind">
      <el-empty description="暂时没有收到简历哦"></el-empty>
      
    </div>
    <div v-for="(item, index) in list" :key="index" v-if="!show">
      <el-card shadow="hover" class="receiveBox">
        <div class="flex">
          <el-progress :width="80" type="circle" :percentage="item.rate" color="#A6F6AF" class="circle"></el-progress>
          <span class="pipei">简历匹配度</span>
          <p class="receiveInfo">收到{{item.name}}的{{item.title}}求职信息</p>
          <el-button @click="getTableList(item.hid)" class="clickbtn">查看</el-button>
          <el-button @click="deleteResume(item.jid)" class="clickbtn">删除</el-button>
        </div>
        <p class="receive">{{item.time}}</p>
      </el-card>
      <el-dialog :title="getResumeList.name+'的简历'" :visible.sync="getResumev">
        <table border="1" cellspacing="0" style="border-color:#ededed" class="mytable">
          <tr>
            <td>姓名：</td>
            <td>{{getResumeList.name}}</td>
          </tr>
          <tr>
            <td>生日：</td>
            <td>{{getResumeList.birthday}}</td>
          </tr>
          <tr>
            <td>性别：</td>
            <td>{{getResumeList.gender}}</td>
          </tr>

          <tr>
            <td>电话：</td>
            <td>{{getResumeList.phone}}</td>
          </tr>
          <tr>
            <td>电话：</td>
            <td>{{getResumeList.email}}</td>
          </tr>
          <tr>
            <td>对公司的期望：</td>
            <td>{{getResumeList.expect}}</td>
          </tr>
          
          <!-- <tr>
            <td>学校：</td>
            <td>{{getResumeList.school}}</td>
          </tr>
          <tr>
            <td>毕业时间：</td>
            <td>{{getResumeList.endTime}}</td>
          </tr>
          <tr>
            <td>技术栈：</td>
            <td>
          <tr v-for="(item, key) in getResumeList.skills" :key="key">
            <td class="progress2">{{item.name}}</td>
            <td class="progress2">熟悉程度：
              <el-progress :text-inside="true" :stroke-width="15" :percentage="item.level*25"></el-progress>
            </td>
          </tr>
          </td>
          </tr>
          <tr>
            <td>实习（工作）经历：</td>
            <td>{{getResumeList.experience}}</td>
          </tr>
          <tr>
            <td>自我介绍：</td>
            <td>{{getResumeList.introduce}}</td>
          </tr>
          <tr>
            <td>获奖经历：</td>
            <td>{{getResumeList.awards}}</td>
          </tr> -->
        </table>
      </el-dialog>
    </div>
  </div>
</template>
<style>
  .getResumeWrap {
    height: 1000px;
    overflow: scroll;
  }

  .getResumeWrap::-webkit-scrollbar {
    display: none;
  }

  .progress2 {
    width: 182px;
    border: 0;
  }

  .mytable {
    width: 100%;
    height: 700px;
  }

  .clickbtn {
    height: 35px;
    margin-top: 14px;
  }

  .pipei {
    position: relative;
    top: 82px;
    left: -76px;
  }

  .flex {
    display: flex;
    justify-content: flex-start;
  }

  .receiveInfo {
    margin: 28px auto auto 14px;
  }

  .receive {
    position: relative;
    left: 330px;
  }

  .receiveBox {
    margin-bottom: 14px;
    width: 100%;
  }

  .nofind p {
    font-size: 18px;
    color: #909399;
  }

  .nofind img {
    width: 350px;
    height: 280px;
    margin: 28px 28rem auto auto;
  }
</style>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
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
        list: [],
        show: false,
        getResumev: false,
        refresh:0,
      }
    },
    mounted() {
      this.getList()
    },
    watch:{
      refresh(){
        location.reload();
      }
    },
    methods: {
      getList() {
        // let link="http://youngoldman.top:5555/api/employee/getJHResumes/"+localStorage.getItem('token');
        let link="http://youngoldman.top:5555/api/resume/query/";
        axios.get(link,{
          eid:localStorage.getItem('uid')
        })
        .then(res => {
          console.log(res);
          this.list = res.data.data;
          if (this.list.length === 0) {
            this.show = true
          }
        })
        .catch(e => {
          console.log(e)
        })
      },
      getTableList(id) {
        this.getResumev = true
        this.getResumeList=this.list[id];
        console.log(this.getResumeList);
      },
      deleteResume(id) {
        let link="http://youngoldman.top:5555/api/resume/delete/"+id;
        axios.get(link)
        .then(res => {
          console.log(res);
          if(res.status===200){
            if(res.data.code===0){
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.refresh++;
            }
          }
        })
        .catch(e => {
          console.log(e)
        })
      }
    }
  }
</script>
