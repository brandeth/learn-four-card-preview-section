<script lang="ts" setup>
const cardList = ref<FCPreviewCardType[]>([
  {
    title: "Supervisor",
    body: "Monitors activity to identify project roadblocks",
    icon: "supervisor",
    color: "cyan",
  },
  {
    isGrouped: true,
    cards: [
      {
        title: "Team Builder",
        body: "Scans our talent network to create the optimal team for your project",
        icon: "team-builder",
        color: "red",
      },
      {
        title: "Karma",
        body: "Regularly evaluates our talent to ensure quality",
        icon: "karma",
        color: "orange",
      },
    ],
  },
  {
    title: "Calculator",
    body: "Uses data from past projects to provide better delivery estimates",
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
