<template>
  <strong class="important">{{ text }}</strong>
</template>

<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<style>
.important {
  color: red;
  font-size: 14px;
}
</style>
