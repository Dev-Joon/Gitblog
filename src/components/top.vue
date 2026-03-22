<script setup></script>

<template>
  <header>
    <div>
      <router-link to="/" class="title-link">
        <h1 class="title">개발 노트 | Joon</h1>
      </router-link>
    </div>
  </header>
</template>

<style scoped>
header {
  height: 200px;
  background-image: url("../assets/images/header_bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #1b1b1b;
  width: 100%;
}

.title-link {
  text-decoration: none;
  display: block;
}

.title {
  color: #ffcc33;
  font-size: 80px;
  font-weight: bold;
  -webkit-text-stroke: 2px black;
  text-align: center;
  white-space: nowrap;
  transition: all 0.3s ease;
  cursor: pointer;
}

.title-link:hover .title {
  filter: brightness(1.1);
}

@media (max-width: 1024px) {
  .title {
    font-size: 60px;
    -webkit-text-stroke: 1.5px black;
  }
}

@media (max-width: 768px) {
  header {
    height: 150px;
  }
  .title {
    font-size: 40px;
    -webkit-text-stroke: 1px black;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 32px;
  }
}
</style>