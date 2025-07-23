<template>
  <button
    class="my-button"
    :class="buttonClass"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  type?: 'default' | 'primary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}>();

// 定义组件要触发的事件
const emit = defineEmits(['click']);

// 根据 props 计算 class
const buttonClass = computed(() => ({
  'my-button--primary': props.type === 'primary',
  'my-button--default': props.type === 'default' || !props.type,
  'my-button--disabled': props.disabled,
  'my-button--small': props.size === 'small',
  'my-button--large': props.size === 'large',
  'my-button--medium': props.size === 'medium' || !props.size,
}));

// 点击事件的处理函数
const handleClick = (event: MouseEvent) => {
  // 如果按钮被禁用，则不触发 click 事件
  if (props.disabled) {
    return;
  }
  emit('click', event); // 触发外部的 click 事件
};
</script>

<style>
/* 简单样式 */
.my-button {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.my-button--primary {
  background-color: blue;
  color: white;
  border-color: blue;
}
.my-button--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>