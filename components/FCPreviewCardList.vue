<script lang="ts" setup>
const cardList = ref<FCPreviewCardType[]>([
  {
    title: "Resourcing",
    body: "We find the right balance for you, whether you need a single days support or an entire team of developers. Flexible and cost efficient.",
    icon: "supervisor",
    color: "cyan",
  },
  {
    isGrouped: true,
    cards: [
      {
        title: "Development",
        body: "We build websites, apps, and e-commerce platforms and have worked on projects of all sizes with everyone from start-ups to big name brands.",
        icon: "team-builder",
        color: "red",
      },
      {
        title: "E-Commerce",
        body: "We help you build and grow your e-commerce business by offering cost-effective consultancy and skilled resource.",
        icon: "karma",
        color: "orange",
      },
    ],
  },
  {
    title: "Social",
    body: "We offer a not-for-profit model for NGOs and social enterprise to help make a difference though digital. Visit Social Offshore to see how we can help.",
    icon: "calculator",
    color: "blue",
  },
]);
</script>

<template>
  <div class="FCPreview-cardList">
    <template v-for="(card, index) in cardList" :key="index">
      <div v-if="card.isGrouped" class="FCPreview-cardGrouped">
        <FCPreviewCardItem
          v-for="(subCard, index) in card.cards"
          :key="index"
          :card="subCard"
        />
      </div>
      <FCPreviewCardItem v-else :card="card" />
    </template>
  </div>
</template>
