<script lang="ts" setup>
const props = defineProps<{
  card: FCPreviewCardType;
}>();

const { title, body, icon } = props.card;
</script>

<template>
  <div class="FCPreview-cardItem">
    <h4>{{ title }}</h4>
    <p>{{ body }}</p>
    <div class="FCPreview-icon">
      <img :src="`/icon-${icon}.svg`" :alt="icon" />
    </div>
  </div>
</template>
