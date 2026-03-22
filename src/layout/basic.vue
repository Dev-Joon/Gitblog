<script setup lang="js">
import Top from '../components/top.vue';
import Side from '../components/side.vue';
import Bottom from '../components/bottom.vue';
</script>

<template>
    <div class="layout-root">
      <Top />
  
      <div class="main-wrapper">
        
        <main class="content-area">
          <router-view :key="$route.fullPath" />
        </main>
  
        <Side class="blog-sidebar" />
      </div>
  
      <Bottom />
    </div>
  </template>
  
<style scoped>
    .layout-root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
  }

  .main-wrapper {
    display: flex;
    align-items: flex-start;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    gap: 30px;
    box-sizing: border-box;
  }

  .content-area {
    flex: 1;
    min-width: 0;
  }

  .blog-sidebar {
    width: 250px;
    flex-shrink: 0;
    position: sticky;
    top: 100px;
  }

  @media (max-width: 1024px) {
    .main-wrapper {
      flex-direction: column-reverse;
      padding: 20px;
      gap: 20px;
    }
    
    .blog-sidebar {
      width: 100%;
      max-width: none;
      position: static;
    }
  }
</style>