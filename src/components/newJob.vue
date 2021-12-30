<template>
    <el-dialog title="发布职位" :visible.sync="newJobVisible" :show-close="false" class="jobDialog">
        <el-form :model="jobInfo" :rules="jobRules" ref='jobInfo' label-width="100px">
        <el-form-item label="职位名称" prop="title" class="jobinput">
            <el-input v-model="jobInfo.title"></el-input>
        </el-form-item>
        

        <el-form-item label="工作地点" prop="location" class="jobinput">
            <el-cascader :options="options" v-model="jobInfo.location" @change="handleChange()" clearable></el-cascader>
        </el-form-item>


        <el-form-item label="薪水" prop="salary" class="jobinput">
            <el-col :span="10">
                <el-input-number v-model="jobInfo.baseSalary" size="small" :min="1" :max="1000" label="描述文字"></el-input-number>
                <!-- <el-input v-model="jobInfo.baseSalary"></el-input> -->
            </el-col>
            <el-col :span="4">
                --
            </el-col>
            <el-col :span="10">
                <el-input-number v-model="jobInfo.highSalary" size="small" :min="1000" :max="400000" label="描述文字"></el-input-number>

                <!-- <el-input v-model="jobInfo.highSalary"></el-input> -->
            </el-col>
        </el-form-item>        


        <el-form-item label="职位介绍" prop="description" class="jobinput">
            <el-input type="textarea" rows="10" v-model="jobInfo.description"></el-input>
        </el-form-item>

        <!-- <el-form-item label="技术栈" prop="skills" v-for="(item, key) in jobInfo.skills" :key="key">
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
        </el-form-item> -->

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
        var checkTitle = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('职位名称不能为空'))
            } else {
                callback()
            }
        }
        var checkLocation = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('工作地点不能为空'))
            } else {
                callback()
            }
        }
        // var checkSalary = (rule, value, callback) => {
        //     let reg=new RegExp(/([1-9]([0-9]+)?(.[0-9]{1,2})?$)|(^(0){1}$)|([0-9].0-9?$)/);
        //     console.log(value);
        //     if (!value) {
        //         return callback(new Error('薪水不能为空'))
        //     } 
        //     else if(reg.test(value)) {
        //         return callback(new Error('请输入正确的工资！'));
        //     }
        //     else{
        //         callback()
        //     }
        // }
        var checkDescription = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('职位介绍不能为空'))
            } else {
                callback()
            }
        }
        // var checkSkill = (rule, value, callback) => {
        //     if (!value) {
        //         return callback(new Error('技术要求不能为空'))
        //     } else {
        //         callback()
        //     }
        // }
        return{
            options: regionDataPlus,
            
            jobInfo: {
                title: '',
                description: '',
                // companyId: '',
                baseSalary:'',
                highSalary:'',
                // employeeId:0,
                location:'',
                // skills: [
                //     {
                //         name: '',
                //         weight: 0
                //     }
                // ]
            },
            jobRules: {
                title: [{validator: checkTitle, trigger: 'blur'}],
                location: [{validator:checkLocation, trigger: 'blur'}],
                description: [{validator: checkDescription, trigger: 'blur'}],
                // salary: [{validator: checkSalary, trigger: 'blur'}],
                // skills: [{validator: checkSkill, trigger: 'blur'}]
            }
        }
    },
    methods:{
        handleChange(){
            let loc='';
            // for(let i=0;i<this.location.length;++i){
            //     loc+=CodeToText[this.location[i]];
            // }
            console.log(loc);
        },
        addjob (formName) {
            if(this.jobInfo.baseSalary>this.jobInfo.highSalary){
                this.$message({
                    message:"基础工资高于最高工资！",
                    type:"warning",
                })
                return ;
            }            
            
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let link='http://youngoldman.top:5555/api/job/insert/'+localStorage.getItem('token');
                    axios.post(link,{
                        type:this.jobInfo.title,
                        baseSalary:this.jobInfo.baseSalary,
                        highSalary: this.jobInfo.highSalary,
                        // companyId: this.jobInfo.companyId,
                        location: this.jobInfo.location,
                        description: this.jobInfo.description,
                        employeeId: this.jobInfo.employeeId,
                    })
                    .then(res => {
                        if (res.status === 200) {
                            // this.amount++;
                            this.$refs[formName].resetFields();
                            this.newJobVisible=false;
                        }
                    }).catch(e => {
                        console.log(e)
                    })
                }
            })
        },
        // deleteItem (key) {
        //     this.jobInfo.skills.splice(key, 1)
        // },
        // addSkill () {
        //     let newskill= {
        //         weight: 0,
        //         name: ''
        //     }
        //     this.jobInfo.skills.push(newskill)
        // },
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