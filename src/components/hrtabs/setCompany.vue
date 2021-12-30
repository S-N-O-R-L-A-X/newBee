<template>
  <div>
    <el-card v-if="cid===null">
      <p>您的公司还未在本平台收录哦，快来记录您的公司吧！</p>
      <el-form :model="company" status-icon :rules="phonerules" ref="company" label-width="100px"
                class="demo-ruleForm">
        <el-form-item label="公司名" prop="name" class="settinginput">
          <el-input v-model="company.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="公司描述" prop="description" class="settinginput">
          <el-input v-model="company.description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司头像" prop="logo" >
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
            :limit="1" :on-exceed="handleExceed" :before-upload="beforeAvatarUpload"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" @click="setCompany('company')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card v-else>
      <el-input v-model="cid">请输入您所在的公司id</el-input>
      <el-button @click="changeCompany()">提交</el-button>
    </el-card>
  </div>
</template>
<script>

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
      
      company:{name:null,logo:null,description:null},
      cid:localStorage.getItem("cid"),
      rules: {
          name: [{validator: checkCompanyName, trigger: 'blur'}],
          description: [{validator: checkCompanyDescription, trigger: 'blur'}],
          logo: [{validator: checkCompanyLogo, trigger: 'blur'}],
      }
    }
  },
  mounted () {
    console.log(localStorage.getItem("cid"));
  },
  watch: {
    count () {
      location.reload()
    }
  },
  methods: {
     
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

    changeCompany(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.post("http://youngoldman.top:5555/api/employee/setCompany"+localStorage.getItem('token'),{
            cid:this.cid
          })
          .then(res => {
            if(res.status === 200){
              if (res.data.code === 0) {
                this.$message({
                  message:"修改公司成功",
                  type: "success"
                })
              }
            }
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
