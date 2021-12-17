<template>
    <el-dialog title="发布职位" :visible.sync="publishvisible">
        <el-form :model="publishInfo" :rules="publishRules" ref='publishInfo'>
        <el-form-item label="职位名称" prop="title" class="jobinput">
            <el-input class="require" v-model="publishInfo.title"></el-input>
        </el-form-item>

        <el-form-item label="职位名称" prop="location" class="jobinput">
            <el-input class="require" v-model="publishInfo.location"></el-input>
        </el-form-item>
        <el-form-item label="职位介绍" prop="content" class="jobinput">
            <el-input type="textarea" rows="10" class="require" v-model="publishInfo.content"></el-input>
        </el-form-item>

        <el-form-item label="技术栈" prop="skillList">
            <el-button @click="addskill()" class="addbtn">添加</el-button>
            <div v-for="(item, key) in publishInfo.skillList" :key="key">
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
            <el-button @click="addjob('publishInfo')">确定</el-button>
        </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
export default {
    data(){
        return{
            jobInfo: {
                
                title: '',
                content: '',
                companyId: '',
                baseSalary:0,
                highSalary:0,
                employeeId:0,
                skillList: [
                    {
                        name: '',
                        weight: 0
                    }
                ]
            },
        }
    },
    methods:{
        addjob (formName) {
            this.publishvisible = false
            this.publishInfo.hrId = sessionStorage.getItem('userId')
            this.publishInfo.companyId = localStorage.getItem('companyId')
            this.$refs[formName].validate(valid => {
                if (valid) {
                fetch.publishJob(this.publishInfo).then(res => {
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
    }
}
</script>

<style>

</style>