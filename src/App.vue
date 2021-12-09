<template>
  <div id="app">
    <Menu></Menu>
    <el-main>
      <router-view></router-view>
    </el-main> 
  </div>
</template>

<script>
import Menu from './components/menu.vue'
export default {
  name: 'app',
  components: {
    Menu
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
