<template>
  <div>
    <table v-if="!isEdit" class="container">
      <th> 个人信息</th>
      <tr>
        <td>昵称：</td>
        <td>{{list.nickname}}</td>
      </tr>
      <tr>
        <td>姓名：</td>
        <td>{{list.name}}</td>
      </tr>
      <tr>
        <td>性别：</td>
        <td>{{list.sex}}</td>
      </tr>
      <tr>
        <td>地址：</td>
        <td>{{list.address}}</td>
      </tr>
      <tr>
        <td>我的简介：</td>
        <td>{{list.introduce}}</td>
      </tr>
      <tr>
        <td>毕业年份：</td>
        <td>{{list.endTime}}</td>
      </tr>
      <tr>
        <td>学历：</td>
        <td>{{list.education}}</td>
      </tr>
      <tr>
        <td>学校：</td>
        <td>{{list.school}}</td>
      </tr>
      <tr>
        <td>我想去的公司：</td>
        <td>{{list.intentionCompany}}</td>
      </tr>
      <tr>
        <td> 我感兴趣的工作：</td>
        <td>{{list.intentionJob}}</td>
      </tr>
      <el-button class="edit" @click="changeEdit">编辑</el-button>
    </table>
    <el-form  :model="list" status-icon :rules="rules2" ref="list" label-width="100px" class="formWrap"
             v-if="isEdit">
      <!-- <el-form-item label="昵称" prop="nickname">
        <el-input v-model="list.nickname" auto-complete="off"></el-input>
      </el-form-item> -->
       <el-form-item label="姓名" prop="name">
        <el-input v-model="list.name" auto-complete="off"></el-input>
      </el-form-item>
      
      
      <el-form-item label="学历信息" prop="school"  v-for="(item, key) in list.education" :key="key">
        <el-row :gutter="20">
        <el-col :span="11">
          <el-input v-model="item.school"></el-input>
        </el-col>
        
        <el-col :span="11">
          <el-select v-model="item.degree" style="width: 100%">
            <el-option
              v-for="item in educationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          
        </el-col>
        
        <el-col :span="10" size="small">
          入学年份<el-input-number v-model="item.startTime" controls-position="right" :min="1930" :max="2022"></el-input-number>
        </el-col>

        <el-col :span="10" size="small">
          毕业年份<el-input-number v-model="item.endTime" controls-position="right" :min="1930" :max="2022"></el-input-number>
        </el-col>
        <i class="el-icon-error delete" @click="deleteItem(key)" v-if="list.education.length>1"></i>
        <el-col :span="4">
          <el-button @click="addEducation()" >添加</el-button>
        </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="感兴趣的工作" prop="intentionJob">
        <el-select v-model="intentionJob" multiple placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in jobOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
       </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class='editor' @click="changeEdit">返回</el-button>
        <el-button  @click="submitInfo('list')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
  table {
   width: 600px;
   font-size: 16px
  }

  table tr td {
    padding: 11.2px;
    text-align: left;
  }

  .formWrap {
    width: 80%;
    font-size: 18px;
  }

  .edit {
    margin:10px auto auto 40px;
  }
</style>

<script>/* eslint-disable indent */

  import axios from "axios"

  export default {
    props: ['list', 'imageUrl'],
    data () {
      var checknickname = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('昵称不能为空'))
        } else {
          callback()
        }
      }
      var checkname = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('姓名不能为空'))
        } else {
          callback()
        }
      }
      var checksex = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('性别不能为空'))
        } else {
          callback()
        }
      }
      var checkintroduce = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('简介不能为空'))
        } else {
          callback()
        }
      }
      var checkendTime = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('毕业年份不能为空'))
        } else {
          callback()
        }
      }
      var checkschool = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('学校不能为空'))
        } else {
          callback()
        }
      }
      var checkcompany = (rule, value, callback) => {
        if (this.intentionCompany.length === 0) {
          return callback(new Error('想去的公司不能为空'))
        } else {
          callback()
        }
      }
      var checkaddress = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('地址不能为空'))
        } else {
          callback()
        }
      }
      var checkjob = (rule, value, callback) => {
        if (this.intentionJob.length === 0) {
          return callback(new Error('感兴趣的工作不能为空'))
        } else {
          callback()
        }
      }
      var checkeducation = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('学历不能为空'))
        } else {
          callback()
        }
      }
      return {
        isEdit: true,
        rules2: {
          nickname: [{validator: checknickname, trigger: 'blur'}],
          name: [{validator: checkname, trigger: 'blur'}],
          sex: [{validator: checksex, trigger: 'blur'}],
          address: [{validator: checkaddress, trigger: 'blur'}],
          introduce: [{validator: checkintroduce, trigger: 'blur'}],
          endTime: [{validator: checkendTime, trigger: 'blur'}],
          education: [{validator: checkeducation, trigger: 'blur'}],
          school: [{validator: checkschool, trigger: 'blur'}],
          intentionCompany: [{validator: checkcompany, trigger: 'blur'}],
          intentionJob: [{validator: checkjob, trigger: 'blur'}]
        },
        
        educationOptions: [
          {
            value: '高中及以下',
            label: '高中及以下'
          },
          {
            value: '大专',
            label: '大专'
          },
          {
            value: '本科',
            label: '本科'
          },
          {
            value: '硕士',
            label: '硕士'
          },
          {
            value: '博士',
            label: '博士'
          },
          
        ],
        companyOptions: [],
        jobOptions: [{
            value: '前端工程师',
            label: '前端工程师'
          },
          {
            value: '后端工程师',
            label: '后端工程师'
          },
          {
            value: 'JAVA工程师',
            label: 'JAVA工程师'
          },
          {
            value: 'C++工程师',
            label: 'C++工程师'
          },
          {
            value: '数据分析师',
            label: '数据分析师'
          },],
        intentionCompany: [],
        intentionJob: [
          
        ]
      }
    },
    mounted() {

    },
    watch: {
      list(val, oldVal) {
        if (val !== oldVal) {
           this.intentionCompany = this.list.intentionCompany.split(',') || ''
           this.intentionJob = this.list.intentionJob.split(',') || ''
        }
      }
    },
    methods: {
      deleteItem (key) {
        this.list.education.splice(key, 1)
      },
      addEducation () {
        let newEducation = {
          id: 0,
          level: 0,
          name: '',
          
        }
        this.list.education.push(newEducation)
      },
      changeEdit () {
        this.isEdit = !this.isEdit
      },
      // 提交订单信息
      submitInfo (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.list.intentionCompany = this.intentionCompany.toString();
            this.list.intentionJob = this.intentionJob.toString();
            axios.post("http://youngoldman.top:5555/api/jobHunter/"+localStorage.getItem('token'),{
              qualification:this.list.education
            })
              .then(res => {
                console.log('list', this.list)
                if (res.data.code===0) {
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  })
                }
              })
              .catch(e => {
                console.log(e)
              })
          } else {
            console.log('error submit!!')
          }
        })
      },
    }
  }
</script>
