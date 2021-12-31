<template>
  <div>
    <Advertisement></Advertisement>
    
    <div class="division">
      <h3>热门企业</h3>
      <!-- <h3 style="color: #888;font-weight: 400">--- Hot ---</h3> -->
    </div>

    <CompanyCarousel></CompanyCarousel>
    
    <!-- <div class="aboutus">
      <div id="aboutusInfo">
        <h2>关于我们</h2>
        <p>面向互联网求职招聘，提供更多的实习和工作机会</p>
        <p>即刻起，点赞你的生活，从这一份工作开始。</p>
      </div>
    </div> -->

    <footer class="footer">
      <div class="division"><h3>联系我们</h3>
      
        <h3 style="color:white;font-weight: 400">--- CONTACT ---</h3>
        <i class="el-icon-link"></i>
        <el-link href="https://github.com/S-N-O-R-L-A-X/newBee" target="_blank"  style="color:white">https://github.com/S-N-O-R-L-A-X/newBee</el-link>
       
      </div>
    </footer>
  </div>
</template>

<script>

import axios from 'axios';
import Advertisement from '../components/indexComponents/advertisement';
import CompanyCarousel from '../components/indexComponents/companyCarousel.vue';

export default {
  components:{Advertisement,CompanyCarousel},
  data () {
    return {
      activeIndex2: '1',
      currentDate: '完美',
      company: '',
      // companyList: [],
      jobList: [],
      recommandList: [],
      isHr: localStorage.getItem('role')==='1',
      isLogin: localStorage.getItem('token') ? true : false,
      isShow:  false,
      getResumeList: {
          name: '',
          sex: '',
          age: '',
          skills: [{
            id: 1,
            name: '',
            level: '',
            resumeId: 1
          }],
          school: '',
          address: '',
          endTime: 2019,
          phone: '',
          email: '',
          introduce: '',
          experience: '',
          awards: '',
          avatar: ''
        },
    }
  },

  mounted () {
    window.addEventListener('scroll', this.handler);
    this.getCompany();
    // this.getJob();

  },
  
  methods: {
    handler() {
      let info = document.getElementById('aboutusInfo') || null
      let card = document.getElementsByClassName('temp')[0] || null
      if (info === null || card === null) {
          return;
      }
      else if (document.documentElement.scrollTop > 1000) {
         card.classList.add('animated')
         card.classList.add('bounceInLeft')
         info.classList.add('animated')
         info.classList.add('bounceInLeft')
      } else {
        info.classList.remove('animated')
        info.classList.remove('bounceInLeft')
        card.classList.remove('animated')
        card.classList.remove('bounceInLeft')
      }
    },

    jobDetail (id) {
      localStorage.setItem('jobId', id)
      // this.$router.push('JobInfo')
      this.$router.push('companyDetail');
    },

    // getJob () {
    //   axios.get('http://youngoldman.top:5555/api/company/getCompany',{
    //   })
    //   .then(res => {
    //     if (res.status === 200) {
    //       if (res.data.code===0) {
    //         this.jobList=res.data;
    //       }
    //     }
    //   }).catch(e => {
    //     console.log(e)
    //   })
    // },

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
  },

}
</script>


<style scoped>
@import "../assets/Animate/animate.min.css";

body {
  background: #ededed;
}

.myMenu {
  position: sticky;
  top: 0;
  z-index: 100;
}



.cardContain {
  width: 100%;
  height: 100%;
  background: #fff;
}

.newsContain {
  padding-top: 1px;
  width: 100%;
  height: 100%;
  background: #fff;
}

.picContain {
  margin-right: 10px;
  perspective: 1000px;
}

.picContain:hover .flipper, .picContain.hover .flipper{
  transform: rotateY(180deg);
}

.picContain, .itemPic, .back{
  width: 80px;
  height: 80px;
}

.flipper {
  transition: 0.6s;
  transform-style:preserve-3d;
  position: relative;
}

.newsItem {
  display: flex;
  justify-content: flex-start;
  width: 1200px;
  margin: auto;
  height: 114px;
  text-align: left;
  color: #5a5a5a;
  font-weight: 500;
  padding-top: 15px;
  border-bottom: 1px solid #ededed;
}

.itemPic, .back {
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  background: #cc0000;
  text-align: center;
  color: white;
  font-weight: 500;
  line-height: 80px;
  white-space: nowrap;
}

.itemPic {
  z-index: 2;
}

.back {
  transform: rotateY(180deg);
}

.footer {
  width: 100%;
  height: 100px;
  background: black;
  /* padding-top:20px */
}

.footer a {
  color: black;
  text-decoration: none;
}

.aboutus  {
  width: 100%;
  height: 500px;
  background: url("https://upload-images.jianshu.io/upload_images/9381131-fd2872c9d933b2de.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240") no-repeat;
  background-size: 100% 100%;
  filter: grayscale(70%);
  opacity: 0.7;
  color: white;
  font-weight: 600;
  padding-top: 60px;
}

.aboutus p{
  margin-top: 30px;
  font-size: 18px;
}

#aboutusInfo {
  margin-top: 80px;
  animation-delay: 1s
}


.wrapper-card {
  width: 1200px;
  height:1000px;
  margin: 30px auto auto auto;
  padding-top: 30px;
}

.wrapper-card .card {
  color: #07111B;
  font-size: 16px;
  width: 336px;
  height: 243px;
  float: left;
  margin: 30px;
  border-radius: 6px;
}

.wrapper-card .card:hover {
  transform: translateY(-5px);
  transition: 3ms;
  box-shadow: 5px 5px 10px #888;
}

.wrapper-card .image {
  border-radius: 6px 6px 0 0;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  border-radius: 6px;
}


.division {
  width: 100%;
  margin: 30px  auto;
  text-align: center;
  padding-left: 10px;
  color: white;
  bottom:0;
}

.footer img{
  width:25px;
  height: 25px;
  margin-right: 10px
}

.footer span {
  margin-right: 20px;
}


.el-progress__text {
  font-size: 16px !important;
  text-align: center !important;
}

.el-carousel-item {
  display: flex;
  justify-content: space-around;
}

.el-carousel {
  width: 1200px;
  margin: 0 auto;
}

.recommandJob {
  border: 1px solid #ebebeb;
  text-align: left;
  color: #fff;
  line-height: 30px;
  background: linear-gradient(#948E99, #2E1437);
  border-radius: 4px;
  width: 150px;
  height: 180px;
  padding: 20px 10px 10px;
  font-weight: bold;
}

.mytable {
  width: 100%;
  height: 700px;
}

.progress2 {
  width: 182px;
  border: 0;
}

</style>
