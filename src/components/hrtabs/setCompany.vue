<template>
  <div>
    <el-card v-if="cid===null">
      <p>您的公司还未在本平台收录哦，快来记录您的公司吧！</p>
      <el-form :model="company" status-icon :rules="companyRules" ref="company" label-width="100px"
                class="demo-ruleForm">
        <el-form-item label="公司名" prop="name" class="settinginput" >
          <el-autocomplete v-model="company.name" style="width:100%" :fetch-suggestions="querySearchAsync"></el-autocomplete>
          <!-- <el-input v-model="company.name" auto-complete="on"></el-input> -->
        </el-form-item>

        <el-form-item label="公司描述" prop="description" class="settinginput">
          <el-input v-model="company.description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司头像" prop="logo" >
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
            :limit="1" :before-upload="beforeAvatarUpload" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" @click="setCompany('company')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card v-else style="height:5rem">
      <el-col :span="14">
        <el-input v-model="cid" placeholder="请修改您所在的公司id"></el-input>
      </el-col>
      <el-col :span="10">
        <el-button @click="changeCompany()">修改您所在的公司</el-button>
      </el-col>
    </el-card>

  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    var checkCompanyName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('公司名不能为空'))
      } else {
        callback()
      }
    }
    var checkCompanyDescription = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('公司介绍不能为空'))
      } else {
        callback()
      }
    }
    var checkCompanyLogo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('公司头像不能为空'))
      } else {
        callback()
      }
    }
    return {
      companyList:[],
      fileList:[],
      company:{name:null,logo:null,description:null},
      cid:localStorage.getItem("cid"),
      companyRules: {
          name: [{validator: checkCompanyName, trigger: 'blur'}],
          description: [{validator: checkCompanyDescription, trigger: 'blur'}],
          logo: [{validator: checkCompanyLogo, trigger: 'blur'}],
      }
    }
  },
  mounted () {
    
    this.getCompany();
  },
  watch: {
    count () {
      location.reload()
    }
  },
  methods: {
    getCompany () {
        axios.get('http://youngoldman.top:5555/api/company/getCompany',{
        })
        .then(res => {
            // console.log(res);
            if (res.status === 200) {
                if (res.data.code===0) {
                  for(let i=0;i<res.data.data.length;++i){
                    let obj={value:res.data.data[i].name};
                    this.companyList.push(obj);
                  }
                }
            }
        })
        
        .catch(e => {
            console.log(e)
        })
    },
    querySearchAsync(queryString, cb) {//used for autocomplete
      var restaurants = this.companyList;
      var results = queryString ? this.companyList.filter(this.createStateFilter(queryString)) : this.companyList;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (name) => {
        return (name.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },

    setCompany(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.post("http://youngoldman.top:5555/api/company/addCompany"+localStorage.getItem('token'))
          .then(res => {
            if(res.status === 200){
              if (res.data.code === 0) {
                this.$message({
                  message:"创建公司成功",
                  type: "success"
                })
              }
            }
          })
        }
      })

    },

    changeCompany(){
      
      axios.post("http://youngoldman.top:5555/api/employee/setCompany/"+localStorage.getItem('token'),{
        cid:this.cid
      })
      .then(res => {
        console.log(res);
        if(res.status === 200){
          if (res.data.code === 0) {
            this.$message({
              message:"修改公司成功",
              type: "success"
            })
          }
        }
        else{
          this.$message({
            message:"sorry，我们的服务器出了一些问题。",
            type: "error"
          })
        }
      })
       

    },
  }
    
  
}
</script>

<style scoped>

.mycard {
  border-left: 5px solid #888;
  height: 100px;
  margin-bottom: 14px;
}
.myflex {
  float: left;
}
.delbtn {
  float: right;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
