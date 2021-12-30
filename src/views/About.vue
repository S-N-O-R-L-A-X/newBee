<template>

</template>


<script>/* eslint-disable indent */

import fetch from '../api/fetch'
import axios from 'axios'
export default {
    data () {
   
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
    // let userId = sessionStorage.getItem('userId')
    this.getResume()
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
    async  getResume () {
      await this.getEmployeeInfo();
      
      console.log(this.employeeId);
      let link='http://youngoldman.top:5555/api/resume/query/employee/'+this.employeeId;
      axios.get(link)
        .then(res => {
          if (res.status === 200) {
            console.log(res);
            if (res.data.code === true) {
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