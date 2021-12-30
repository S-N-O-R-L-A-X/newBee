<template>
  
</template>
<script>

export default {
  data () {
    return {
      cid:null,
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
    setCompany(){
        axios.post
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
