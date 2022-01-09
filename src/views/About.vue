<template>
  <div>
    <el-button @click="produceCards"></el-button>
      <div v-for="card of cards">
        <el-card>{{card.name}}+{{card.content}}</el-card>
      </div>
    <el-pagination background layout="prev, pager, next" :total="1000" 
    :current-page="currentPage" :page-size="pageSize" @current-change="handlePageChange">
    </el-pagination>
    
 </div>
</template>


<script>/* eslint-disable indent */
import axios from 'axios'

export default {

    data () {
      
    return {
      cards:[],
      totalCards:[],
      md:'#### 标题',
      list: [],
      pageSize:2,
      currentPage:1,
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
    // let userId = sessionStorage.getItem('userId')
    this.getResume()
  },
  watch: {
    tip() {
      location.reload()
    },
    
  },
  methods: {
    produceCards(){
      for(let i=0;i<10;++i){
        let cd={};
        cd.name="card"+i;
        cd.content="content"+i;
        this.totalCards.push(cd);
      }
      this.cards=this.totalCards.slice(0,this.pageSize);
    },
    handlePageChange(val){
      this.currentPage=val;
      console.log(val);
      this.cards=this.totalCards.slice(1*val,2*val);
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
    
    getEmployeeInfo(){
      return new Promise(resolve=>{
        let link="http://youngoldman.top:5555/api/jobHunter/getJHInfo/"+localStorage.getItem('token');
        axios.get(link)
        .then(res => {
          console.log(res);
          if(res.status === 200){
            this.employeeId=res.data.data.uid;
            console.log("gotta!"+this.employeeId);
          }
          resolve("aa");
        })
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

  .mycard{
    width:80%;
    height:60%;
  }
</style>