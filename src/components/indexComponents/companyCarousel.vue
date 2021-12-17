<template>
  <div class="cardContain">
    <div class="wrapper-card">
      <el-carousel>
        <el-carousel-item v-for="(item, key) in companyList" :key="key">
          <el-card>
            <div slot="header" class="clearfix">
                <span>{{item.name}}</span>
                <img :src="item.logo" class="image" @click="getCompanyDetail(item.id)">
            </div>
            <div>
                {{item.description}}
            </div>
               
          </el-card>

        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            companyList: [],
        }
    },
    mounted(){
        this.getCompany()
    },
    methods: {
        getCompany () {
            axios.get('http://youngoldman.top:5555/api/company/getCompany',{
            })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    if (res.data.code===0) {
                        this.companyList=res.data.data;
                    }
                }
            }).catch(e => {
                console.log(e)
            })
        },
        getCompanyDetail (id) {
            localStorage.setItem('companyId', id);
            this.$router.push('companyDetail');
        },
    }
}
</script>

<style scoped>
.image {
    cursor: pointer;
}
</style>