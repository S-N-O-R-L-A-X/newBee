<template>
    <el-dialog title="发布职位" :visible.sync="newJobVisible" :show-close="false" class="jobDialog">
        <el-form :model="jobInfo" :rules="publishRules" ref='jobInfo' label-width="100px">
        <el-form-item label="职位名称" prop="title" class="jobinput">
            <el-input class="require" v-model="jobInfo.title"></el-input>
        </el-form-item>
        

        <el-form-item label="工作地点" prop="location" class="jobinput">
            <el-cascader :options="options" v-model="location" @change="handleChange()" clearable></el-cascader>
        </el-form-item>


        <el-form-item label="薪水" prop="salary" class="jobinput">
            <el-col :span="6">
                <el-input class="require" v-model="jobInfo.salary.baseSalary"></el-input>
            </el-col>
            <el-col :span="2">
                --
            </el-col>
            <el-col :span="6">
                <el-input class="require" v-model="jobInfo.salary.highSalary"></el-input>
            </el-col>
        </el-form-item>        


        <el-form-item label="职位介绍" prop="description" class="jobinput">
            <el-input type="textarea" rows="10" class="require" v-model="jobInfo.description"></el-input>
        </el-form-item>

        <el-form-item label="技术栈" prop="skills" v-for="(item, key) in jobInfo.skills" :key="key">
          <el-col :span="10">
            <el-input v-model="item.name"></el-input>
          </el-col>

          <el-col :span="10">
              <select class="select" v-model="item.level">
                <option label="了解" value=1></option>
                <option label="熟悉" value=2></option>
                <option label="掌握" value=3></option>
                <option label="精通" value=4></option>
              </select>
              <i class="el-icon-error delete" @click="deleteItem(key)" v-if="jobInfo.skills.length>1"></i>
          </el-col>  
          
          <el-col :span="4">
            <el-button @click="addSkill()" >添加</el-button>
          </el-col>
        </el-form-item>

        <el-form-item>
            <el-button @click="cancelSubmit()">取 消</el-button>
            <el-button @click="addjob('jobInfo')">确 定</el-button>
        </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import axios from 'axios'
import {regionDataPlus,CodeToText} from 'element-china-area-data'

export default {
    props:["newJobVisible"],
    data(){
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
        return{
            options: regionDataPlus,
            
            jobInfo: {
                title: '',
                description: '',
                companyId: '',
                salary:{
                    baseSalary:0,
                    highSalary:0,
                },
                
                employeeId:0,
                // location:{
                //     city:'',
                //     district:''
                // },
                location:[],
                skills: [
                    {
                        name: '',
                        weight: 0
                    }
                ]
            },
            publishRules: {
                title: [{validator: checktitle, trigger: 'blur'}],
                description: [{validator: checkintroduce, trigger: 'blur'}],
                skillList: [{validator: checkskill, trigger: 'blur'}]
            }
        }
    },
    methods:{
        handleChange(){
            let loc='';
            for(let i=0;i<this.selectedOption.length;++i){
                loc+=CodeToText[this.selectedOption[i]];
            }
            console.log(loc);
        },
        addjob (formName) {
            this.newJobVisible = false
            this.jobInfo.hrId = sessionStorage.getItem('userId')
            this.jobInfo.companyId = localStorage.getItem('companyId')
            this.$refs[formName].validate(valid => {
                if (valid) {
                    axios.post('http://youngoldman.top:5555/api/job/insert',{
                        type:this.jobInfo.title,
                        baseSalary:this.jobInfo.baseSalary,
                        highSalary: this.jobInfo.highSalary,
                        companyId: this.jobInfo.companyId,
                        location: this.jobInfo.location,
                        description: this.jobInfo.description,
                        employeeId: this.jobInfo.employeeId,
                    })
                    .then(res => {
                        if (res.status === 200) {
                            // this.amount++;
                            this.$refs[formName].resetFields()
                        }
                    }).catch(e => {
                        console.log(e)
                    })
                }
            })
        },
        deleteItem (key) {
            this.jobInfo.skills.splice(key, 1)
        },
        addSkill () {
            let newskill= {
                weight: 0,
                name: ''
            }
            this.jobInfo.skills.push(newskill)
        },
        cancelSubmit () {
            this.newJobVisible = false;
            this.$emit('update:newJobVisible', false);
        },
    }
}
</script>

<style>
    .jobDialog{
        width:90%;
    }
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
  /* .requireinput {
    width: 35%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    outline: 0;
    background: #fff;
    padding: 0 15px;
    margin: auto 11.2px 14px auto;
  } */

  /* .requireselect {
    width: 35%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    outline: 0;
    background: #fff;
    padding: 0 15px;
    margin: auto 11.2px 14px auto;
  } */

  /* .require {
    width: 80%;
  } */


  .delete {
    color: #dcdfe6;
    position: relative;
  }

  .delete:hover {
    color: red;
  }

</style>