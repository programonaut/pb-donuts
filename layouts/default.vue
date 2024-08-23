<template>
  <header class="w-full border border-b border-gray-100 h-16 shadow-sm">
    <UContainer class="h-full flex items-center justify-between">
      <ULink to="/">
        <UIcon
          :name="
            $route.path === '/' ? 'i-heroicons-home-solid' : 'i-heroicons-home'
          "
          color="black"
          class="w-6 h-6"
        />
      </ULink>
      <UChip :text="amount ?? 0" size="2xl">
        <ULink to="/cart">
          <UIcon
            :name="
              $route.path === '/cart'
                ? 'i-heroicons-shopping-cart-solid'
                : 'i-heroicons-shopping-cart'
            "
            color="black"
            class="w-6 h-6"
          />
        </ULink>
      </UChip>
    </UContainer>
  </header>
  <main class="flex-1 py-4 sm:py-6 lg:py-8">
    <slot />
  </main>
</template>

<script lang="ts" setup>
import type { ClientResponseError } from "pocketbase";
import { pb } from "~/utils/pocketbase";
const amount = ref(0);

const getAmount = async () => {
  try {
    const allItems = await pb.collection("cart").getFullList();
    amount.value = allItems.reduce((acc, item) => acc + item.amount, 0);
  } catch (e) {
    const error = e as ClientResponseError;
    console.error(error.message);
  }
};

onMounted(() => {
  getAmount();
  pb.collection("cart").subscribe("*", getAmount);
});
</script>

<style>
html,
body {
  height: 100%;
}

#__nuxt {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
