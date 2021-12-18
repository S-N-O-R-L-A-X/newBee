<template>
    <el-dialog title="发布职位" :visible.sync="newJobVisible" :show-close="false">
        <el-form :model="jobInfo" :rules="publishRules" ref='jobInfo'>
        <el-form-item label="职位名称" prop="title" class="jobinput">
            <el-input class="require" v-model="jobInfo.title"></el-input>
        </el-form-item>

        <el-form-item label="职位名称" prop="location" class="jobinput">
            <el-input class="require" v-model="jobInfo.location.city"></el-input>
            <el-input class="require" v-model="jobInfo.location.district"></el-input>
        </el-form-item>
        <el-form-item label="职位介绍" prop="content" class="jobinput">
            <el-input type="textarea" rows="10" class="require" v-model="jobInfo.content"></el-input>
        </el-form-item>

        <el-form-item label="技术栈" prop="skillList">
            <el-button @click="addskill()" class="addbtn">添加</el-button>
            <div v-for="(item, key) in jobInfo.skillList" :key="key">
            <input placeholder="技术" class="requireinput" v-model="item.name"/>
            <select class="requireselect" v-model="item.weight">
                <option label="了解" value=1></option>
                <option label="熟悉" value=2></option>
                <option label="掌握" value=3></option>
                <option label="精通" value=4></option>
            </select>
            <i class="el-icon-error delete" @click="deleteItem(key)"></i>
            </div>
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
            newJobVisible:false,
            jobInfo: {
                title: '',
                content: '',
                companyId: '',
                baseSalary:0,
                highSalary:0,
                employeeId:0,
                location:{
                    city:'',
                    district:''
                },
                skillList: [
                    {
                        name: '',
                        weight: 0
                    }
                ]
            },
            publishRules: {
                title: [{validator: checktitle, trigger: 'blur'}],
                content: [{validator: checkintroduce, trigger: 'blur'}],
                skillList: [{validator: checkskill, trigger: 'blur'}]
            }
        }
    },
    methods:{
        addjob (formName) {
            this.newJobVisible = false
            this.jobInfo.hrId = sessionStorage.getItem('userId')
            this.jobInfo.companyId = localStorage.getItem('companyId')
            this.$refs[formName].validate(valid => {
                if (valid) {
                    axios.post('http://youngoldman.top:5555/api/job/insert',{
                        
                    })
                    .then(res => {
                        if (res.status === 200) {
                        this.amount++
                        this.$refs[formName].resetFields()
                        }
                    }).catch(e => {
                        console.log(e)
                    })
                }
            })
        },
        cancelSubmit () {
            this.newJobVisible = false;
            this.$emit('update:newJobVisible', false);
        },
    }
}
</script>

<style>

</style>