<script lang="ts" setup>
interface Message {
  role: string;
  content: string;
}

const isTyping = ref<boolean>(false);

const messageInput = ref<HTMLInputElement>();

const messageText = ref<string>("");

const messages = ref<Message[]>([
  {
    role: "assistant",
    content: "Hi there! I am your Toucan Buddy from Offshorly. How can I help?",
  },
  {
    role: "assistant",
    content: "You can ask me anything about Offshorly's services.",
  },
]);

const sendMessage = () => {
  messages.value = [
    ...messages.value,
    {
      role: "user",
      content: messageText.value,
    },
  ];

  isTyping.value = true;

  $fetch("/api/send", {
    method: "POST",
    body: JSON.stringify({
      messages: messages.value,
    }),
  })
    .then((res: any) => {
      messages.value = [...messages.value, res.message];
      isTyping.value = false;
    })
    .catch((err) => console.log(err, "err"));

  messageText.value = "";
};

onMounted(() => {
  nextTick(() => {
    messageInput.value?.focus();
  });
});
</script>

<template>
  <div class="ChatBot-window">
    <header>
      <h4>Toucan Buddy</h4>
    </header>

    <div class="ChatBot-messages">
      <ChatBubble
        v-for="(message, index) in messages"
        :key="index"
        :role="message.role"
      >
        {{ message.content }}
      </ChatBubble>
      <ChatBubble v-if="isTyping" role="assistant">
        <ChatTyping></ChatTyping>
      </ChatBubble>
    </div>

    <!-- @TODO - Create a component for the message form -->
    <form class="ChatBot-form" @submit.prevent="sendMessage">
      <div class="ChatBot-field">
        <input ref="messageInput" v-model="messageText" type="text" />
        <button class="ChatBot-submit">
          <!-- @TODO - refactor from inline -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M23 0l-4.5 16.5-6.097-5.43 5.852-6.175-7.844 5.421-5.411-1.316 18-9zm-11 12.501v5.499l2.193-3.323-2.193-2.176zm-8.698 6.825l-1.439-.507 5.701-5.215 1.436.396-5.698 5.326zm3.262 4.287l-1.323-.565 4.439-4.503 1.32.455-4.436 4.613zm-4.083.387l-1.481-.507 8-7.89 1.437.397-7.956 8z"
            />
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>
