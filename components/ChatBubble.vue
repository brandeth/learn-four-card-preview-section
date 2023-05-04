<script lang="ts" setup>
enum Role {
  USER = "user",
  ASSISTANT = "assistant",
}

defineProps<{
  role: string;
}>();
</script>

<template>
  <div
    :class="{
      'ChatBot-user': role === Role.USER,
      'ChatBot-assistant': role === Role.ASSISTANT,
    }"
    class="ChatBot-bubbleContainer"
  >
    <div class="ChatBot-bubble">
      <slot></slot>
    </div>
  </div>
</template>
