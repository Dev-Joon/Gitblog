<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { usePostManager } from "../composables/usePostManager";

const route = useRoute();
const { allPosts } = usePostManager();

const categoryName = computed(() => route.params.child || route.params.parent);

const filteredPosts = computed(() => {
  const { parent, child } = route.params;
  return allPosts.filter((p) => {
    if (child) {
      return p.parentCategory === parent && p.childCategory === child;
    }
    return p.parentCategory === parent;
  });
});
</script>

<template>
  <div class="category-container">
    <header class="cat-header">
      <h1 class="category-title">
        {{ $route.params.parent }}
        <span v-if="$route.params.child"> > {{ $route.params.child }}</span>
      </h1>
    </header>

    <div v-if="filteredPosts.length > 0" class="post-grid">
      <div v-for="post in filteredPosts" :key="post.id" class="post-card">
        <router-link :to="`/post/${post.id}`" class="post-link">
          <div class="card-body">
            <h2 class="title">{{ post.title }}</h2>
            <p class="description">{{ post.description }}</p>
            <div class="meta-info">
              <span class="date">{{ post.date || "날짜 미상" }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <div v-else class="no-posts">
      <p>게시글이 없습니다.</p>
    </div>
  </div>
</template>

<style scoped>
  .category-container {
    max-width: 1000px;
    margin: 0 auto;
  }

  .cat-header {
    border-bottom: 2px solid #1B1B1B;
    padding-bottom: 15px;
    margin-bottom: 40px;
  }

  .category-title {
    font-size: 1.8rem;
    color: #1B1B1B;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .post-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .post-card {
    background: #fff;
    border-radius: 12px;
    border: 1px solid #eee;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }

  .post-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    border-color: #ddd;
  }

  .post-link {
    text-decoration: none;
    color: inherit;
    display: block;
    padding: 25px;
  }

  .title {
    margin: 0 0 12px 0;
    font-size: 1.5rem;
    color: #1B1B1B;
    font-weight: 700;
    line-height: 1.3;
  }

  .description {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
    margin-bottom: 15px;
  }

  .date {
    font-size: 0.85rem;
    color: #999;
    font-weight: 500;
  }

  .no-posts {
    padding: 100px 0;
    text-align: center;
    color: #bbb;
  }
</style>