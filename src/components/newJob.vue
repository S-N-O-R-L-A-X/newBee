<template>
    <el-dialog title="发布职位" :visible.sync="newJobVisible" :show-close="false" class="jobDialog">
        <el-form :model="jobInfo" :rules="jobRules" ref='jobInfo' label-width="100px">
        <el-form-item label="职位名称" prop="title" class="jobinput">
            <el-input v-model="jobInfo.title"></el-input>
        </el-form-item>
        

        <el-form-item label="工作地点" prop="location" class="jobinput">
            <el-cascader :options="options" v-model="jobInfo.location" @change="handleChange()" clearable></el-cascader>
        </el-form-item>


        <el-form-item label="月薪" prop="salary" class="jobinput">
            <el-col :span="10">
                <el-input-number v-model="jobInfo.baseSalary" size="small" :min="1000" :max="300000" label="描述文字"></el-input-number>
                <!-- <el-input v-model="jobInfo.baseSalary"></el-input> -->
            </el-col>
            <el-col :span="4">
                --
            </el-col>
            <el-col :span="10">
                <el-input-number v-model="jobInfo.highSalary" size="small" :min="1000" :max="400000" label="描述文字"></el-input-number>
            </el-col>
        </el-form-item>        


        <el-form-item label="职位介绍" prop="description" class="jobinput">
            <v-md-editor v-model="jobInfo.description" height="20rem"></v-md-editor>
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
            text:'',
            editor:false,
            jobInfo: {
                
                title: '',
                description: '',
                // companyId: '',
                baseSalary:'',
                highSalary:'',
                // employeeId:0,
                location:'',
                loc:'',
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
            this.jobInfo.loc='';
            let n=this.jobInfo.location.length;
            for(let i=0;i<n;++i){
                this.jobInfo.loc+=CodeToText[this.jobInfo.location[i]];
                if(i<n-1){
                    this.jobInfo.loc+=':'
                }
            }
            console.log(this.jobInfo.loc);
        },
        addjob (formName) {
            if(this.jobInfo.baseSalary>this.jobInfo.highSalary){
                this.$message({
                    message:"基础工资高于最高工资！",
                    type:"warning",
                })
                return ;
            }            
            console.log(localStorage.getItem('uid'));
            this.$refs[formName].validate(valid => {
                if (valid) {
                    
                    console.log(this.jobInfo.loc+this.jobInfo.title+this.jobInfo.baseSalary
                    +this.jobInfo.highSalary+localStorage.getItem('cid')+this.jobInfo.description+localStorage.getItem('uid'));
                    axios.post('http://youngoldman.top:5555/api/job/insert',{
                        type:this.jobInfo.title,
                        baseSalary:this.jobInfo.baseSalary,
                        highSalary: this.jobInfo.highSalary,
                        companyId: localStorage.getItem('cid'),
                        location: this.jobInfo.loc,
                        description: this.jobInfo.description,
                        employeeId: localStorage.getItem('uid'),
                    })
                    .then(res => {
                        console.log(res);
                        if (res.status === 200) {
                            this.$message({
                                message: '创建成功',
                                type: 'success'
                            });
                            // this.amount++;
                            this.$refs[formName].resetFields();
                            this.newJobVisible=false;
                        }
                        else{
                            this.$message({
                                message:"sorry，我们的服务器出了一些问题。",
                                type: "error"
                            })
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