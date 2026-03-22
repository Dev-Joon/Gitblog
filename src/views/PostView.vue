<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { usePostManager } from "../composables/usePostManager";

const route = useRoute();
const { allPosts, renderMarkdown } = usePostManager();

const currentPost = computed(() => {
  const rawPath = Array.isArray(route.params.path)
    ? route.params.path.join("/")
    : route.params.path;

  const cleanRoutePath = rawPath.replace(/^\/+|\/+$/g, "").trim();

  return allPosts.find((p) => p.id === cleanRoutePath);
});
</script>

<template>
  <div class="post-container">
    <div v-if="currentPost" class="post-content">
      <header class="post-header">
        <h1 class="post-title">{{ currentPost.title }}</h1>
        <div class="post-meta">
          <span>{{ currentPost.date || "날짜 미상" }}</span>
          <span class="category-tag">
            {{ currentPost.parentCategory }}
            <span v-if="currentPost.childCategory">
              > {{ currentPost.childCategory }}</span
            >
          </span>
        </div>
      </header>
      <hr class="divider" />
      <div
        class="markdown-body"
        v-html="renderMarkdown(currentPost.content)"
      ></div>
    </div>

    <div v-else class="error-box">
      <h2>게시글을 불러올 수 없습니다.</h2>
      <p>경로가 올바른지 확인해주세요.</p>
      <router-link to="/" class="back-link">홈으로 돌아가기</router-link>
    </div>
  </div>
</template>

<style scoped>
    .post-container {
    max-width: 1000px;
    width: 100%; 
    margin: 0 auto;
    padding: 40px 20px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    box-sizing: border-box;
    }

    .post-header {
    margin-bottom: 30px;
    text-align: center;
    }

    .post-title {
    font-size: 2.8rem;
    color: #1B1B1B;
    margin-bottom: 15px;
    font-weight: 800;
    letter-spacing: -0.03em;
    }

    .post-meta {
    color: #888;
    font-size: 0.9rem;
    }

    .divider {
    border: 0;
    border-top: 1px solid #eee;
    margin: 30px 0;
    }

    .markdown-body {
    line-height: 1.8;
    font-size: 1.1rem;
    color: #1B1B1B;
    }

    .markdown-body :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    }

    .markdown-body :deep(pre) {
    max-width: 100%;
    background: #f6f8fa;
    padding: 20px;
    border-radius: 12px;
    margin: 24px 0;
    overflow-x: auto;
    white-space: pre;
    box-sizing: border-box;
    }

    .markdown-body :deep(code) {
    font-family: var(--mono);
    font-size: 0.95rem;
    }

    @media (max-width: 768px) {
    .post-container {
        padding: 20px 15px;
    }
    .post-title {
        font-size: 2rem;
    }
    }

    @media (max-width: 480px) {
    .post-title {
        font-size: 1.6rem;
    }
    }
</style>
