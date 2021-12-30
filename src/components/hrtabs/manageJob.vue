<template>
  <div class="wrapper">
    <div v-if="show" class="nofind">
      <el-empty description="暂时没有发布的职位哦，快去发布吧"></el-empty>
    </div>
    <el-card  v-for="(item, key) in joblist" :key="key" class="mycard" v-if="!show" @click="checkDetail(item.id)">
      <p class="myflex">{{item.title}}</p>
      <el-button class="delbtn" @click="deletejob(item.id)">删除职位</el-button>
    </el-card>
  </div>
</template>
<script>
import fetch from '../../api/fetch'
export default {
  data () {
    return {
      joblist: [],
      count: 0,
      show: true
    }
  },
  mounted () {
    this.checkJob()
  },
  watch: {
    count () {
      location.reload()
    }
  },
  methods: {
    checkDetail (id) {
      localStorage.setItem('jobId', id)
      this.$router.push({name: 'jobInfo'})
    },
    checkJob () {
      fetch.checkJob().then(res => {
        if (res.status === 200) {
          this.joblist = res.data.data
          if (this.joblist.length === 0) {
            this.show = true
          }
        }
      }).catch(e => {
        console.log(e)
      })
    },
    deletejob (id) {
      fetch.deletejob(id).then(res => {
        if (res.status === 200) {
          if (res.data.code === true) {
            this.count++
          }
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style>

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
</style>
