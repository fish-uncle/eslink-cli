<template>
  <div>hello
    <img width="100" src="./logo.png"/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        a: process.env.NODE_ENV,
        img:require('./logo.png')
      }
    },
    mounted() {
      console.log(process.env.NODE_ENV)
    }
  }
</script>
<style>
  body {
    background-image: url('./logo.png');
    transition: all .3s;
  }
</style>
