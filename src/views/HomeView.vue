<script setup>
import { computed } from 'vue';
import { usePostManager } from '../composables/usePostManager';

const { allPosts } = usePostManager();

const latestPosts = computed(() => {
  return [...allPosts]
    .filter(p => p.id && p.id !== 'no-id')
    .sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date) - new Date(a.date);
    })
    .slice(0, 12)
    .map(post => ({
      ...post,
      displayCategory: post.childCategory 
        ? `${post.parentCategory} > ${post.childCategory}` 
        : post.parentCategory
    }));
});
</script>

<template>
  <div class="home-container">
    <header class="home-header">
      <h1 class="section-title">최신 글</h1>
    </header>

    <div v-if="latestPosts.length > 0" class="post-grid">
      <div v-for="post in latestPosts" :key="post.id" class="post-card">
        <router-link :to="`/post/${post.id}`">
          <div class="card-thumb" :style="{ backgroundImage: `url(${post.thumbnail || '/images/default-thumb.jpg'})` }">
            <span v-if="!post.thumbnail" class="no-img">No Image</span>
          </div>
          <div class="card-body">
            <span class="category">{{ post.displayCategory }}</span>
            <h2 class="title">{{ post.title }}</h2>
            <p class="description">{{ post.description }}</p>
            <span class="date">{{ post.date || '날짜 미상' }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}
.home-header {
  margin-bottom: 40px;
  border-bottom: 2px solid #1B1B1B;
  padding-bottom: 15px;
}
.section-title {
  font-size: 1.8rem;
  color: #1B1B1B;
  font-weight: 800;
}
.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}
.post-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
}
.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}
.post-card a {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}
.card-thumb {
  height: 200px;
  background-size: cover;
  background-position: center;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #eee;
}
.no-img {
  color: #aaa;
  font-size: 0.8rem;
}
.card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.category {
  display: inline-block;
  color: #42b983;
  font-size: 0.75rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-transform: uppercase;
  background: #f0fdf4;
  padding: 2px 8px;
  border-radius: 4px;
  align-self: flex-start;
}
.title {
  font-size: 1.3rem;
  margin: 0 0 10px 0;
  color: #1B1B1B;
  line-height: 1.4;
  font-weight: 700;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
.description {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 4.8em;
}
.date {
  font-size: 0.85rem;
  color: #999;
  margin-top: auto;
}
</style>