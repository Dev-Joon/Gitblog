<script setup>
import { ref, computed } from "vue";
import profile from "./profile.vue";
import CategoryItem from "./CategoryItem.vue";

const posts = import.meta.glob("/src/contents/blog/**/*.md", { eager: true });
const openCategories = ref(new Set());

const toggleCategory = (path) => {
  if (openCategories.value.has(path)) openCategories.value.delete(path);
  else openCategories.value.add(path);
};

const categoryTree = computed(() => {
  const root = { _count: 0, _children: {} };
  Object.keys(posts).forEach((path) => {
    const relativePath = path.split("/src/contents/blog/")[1];
    if (!relativePath) return;

    const parts = relativePath.split("/");
    let current = root;
    let currentPath = "";

    parts.forEach((part) => {
      if (part.endsWith(".md")) return;
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      if (!current._children[part]) {
        current._children[part] = { _count: 0, _children: {}, _path: currentPath };
      }
      current._children[part]._count++;
      current = current._children[part];
    });
  });
  return root._children;
});
</script>

<template>
  <aside class="sidebar">
    <profile />
    <nav class="cat-nav">
      <div v-if="Object.keys(categoryTree).length === 0" class="empty-msg">
        게시글이 없거나 폴더 구조를 확인해주세요.
      </div>
      
      <CategoryItem 
        v-for="(data, name) in categoryTree" 
        :key="name" 
        :name="name" 
        :data="data" 
        :openCategories="openCategories"
        @toggle="toggleCategory"
      />
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  padding: 20px; border-left: 1px solid var(--border);
  display: flex; flex-direction: column; align-items: center; gap: 30px; width: 100%;
}
.cat-nav { width: 100%; max-width: 250px; }
.empty-msg { color: #bbb; text-align: center; padding: 20px 0; }
</style>