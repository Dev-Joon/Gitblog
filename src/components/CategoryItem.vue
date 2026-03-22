<template>
    <div class="cat-group">
      <div class="cat-header" @click="$emit('toggle', data._path)">
        <router-link :to="'/category/' + data._path" class="cat-link" @click.stop>
          <span class="cat-name" :class="{ 'is-parent': isParent }">{{ name }}</span>
          <span class="count">{{ data._count }}</span>
        </router-link>
        
        <span v-if="hasChildren" class="arrow-btn" :class="{ 'is-open': isOpen }">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
  
      <transition name="expand">
        <div v-if="isOpen && hasChildren" class="sub-menu">
          <CategoryItem 
            v-for="(childData, childName) in data._children" 
            :key="childName" 
            :name="childName" 
            :data="childData" 
            :openCategories="openCategories"
            @toggle="$emit('toggle', $event)"
          />
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  const props = defineProps(['name', 'data', 'openCategories']);
  const emit = defineEmits(['toggle']);
  
  const hasChildren = computed(() => Object.keys(props.data._children).length > 0);
  const isOpen = computed(() => props.openCategories.has(props.data._path));
  const isParent = computed(() => !props.data._path.includes('/'));
  </script>
  
  <style scoped>
  .cat-group { width: 100%; }
  
  .cat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    cursor: pointer;
    border-bottom: 1px solid #f2f2f2;
    transition: background 0.2s;
  }
  
  .cat-header:hover {
    background-color: #fafafa;
  }
  
  .cat-link {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
  }
  
  .cat-name {
    font-size: 1rem;
    color: #555;
    font-weight: 500;
  }
  
  .cat-name.is-parent {
    font-size: 1.1rem;
    color: #1B1B1B;
    font-weight: 700;
  }
  
  .count {
    font-size: 0.8rem;
    color: #42b983;
    font-weight: 700;
    background: #f0fdf4;
    padding: 2px 6px;
    border-radius: 4px;
  }
  
  .arrow-btn {
    color: #ccc;
    transition: transform 0.3s ease;
    padding: 0 5px;
  }
  
  .arrow-btn.is-open {
    transform: rotate(180deg);
    color: #1B1B1B;
  }
  
  .sub-menu {
    padding-left: 20px;
    border-left: 1px solid #eee;
    margin-left: 5px;
  }
  
  .expand-enter-active, .expand-leave-active {
    transition: all 0.3s ease-in-out;
    max-height: 1000px;
    overflow: hidden;
  }
  .expand-enter-from, .expand-leave-to {
    max-height: 0;
    opacity: 0;
  }
  </style>