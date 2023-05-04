<script lang="ts" setup>
const { chatWindow } = useChatState();
</script>

<template>
  <div class="ChatBot">
    <ChatWindow v-if="chatWindow" />
    <ChatButton />
  </div>
</template>
