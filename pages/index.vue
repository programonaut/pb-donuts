<template>
  <UContainer class="h-full flex gap-4">
    <UCard class="flex-1">
      <h2 class="font-bold text-lg mb-2">Inventory</h2>
      <ul class="space-y-2">
        <li v-for="item in inventoryList" :key="item.id">
          <UButton
            class="justify-between"
            color="white"
            variant="solid"
            block
            @click="selectedItem = item"
          >
            <span class="font-normal">{{ item.name }}</span>

            <template #trailing>
              <span>{{ item.amount }}</span>
            </template>
          </UButton>
        </li>
      </ul>
    </UCard>

    <UDivider orientation="vertical" />

    <UCard
      class="flex-1"
      :ui="{ body: { base: 'h-full flex flex-col justify-between' } }"
    >
      <div>
        <h2 class="font-bold text-lg">{{ selectedItem.name }}</h2>
        <img
          :src="pb.files.getUrl(selectedItem, selectedItem.image)"
          :alt="selectedItem.name"
          class="max-w-72 w-1/2 mx-auto rounded border border-solid border-gray-100"
        />
        <div v-html="selectedItem.description"></div>
      </div>

      <div class="space-y-2">
        <div class="flex justify-between">
          <p class="text-sm text-gray-500">
            {{ selectedItem.amount }} in stock
          </p>
          <p class="text-sm text-gray-500">{{ selectedItem.price }}€</p>
        </div>
        <div class="flex justify-between">
          <UInput
            type="number"
            v-model="orderAmount"
            min="1"
            max="9"
            class="w-12"
          />
          <UButton color="primary" @click="orderItem">Order</UButton>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>

<script lang="ts" setup>
import { pb } from "~/utils/pocketbase";
import type { CartResponse } from "~/utils/types";
const inventoryList = await pb.collection("inventory").getFullList();

onMounted(() => {
  pb.collection("inventory").subscribe("*", (data) => {
    selectedItem.value.amount = data.record.amount;
  });
});

const selectedItem = ref(inventoryList[0]);
const orderAmount = ref(1);

const orderItem = async () => {
  if (selectedItem.value.amount < orderAmount.value) {
    alert("Not enough stock");
    return;
  }

  if (!pb.authStore.model) {
    alert("Please login first");
    return;
  }

  // modify cart
  let record: CartResponse | undefined;
  try {
    const exisiting = await pb
      .collection("cart")
      .getFirstListItem(
        `user.id="${pb.authStore.model?.id}" && item.id="${selectedItem.value.id}"`
      );
    record = exisiting;
  } catch (error) {}

  if (record?.id) {
    await pb.collection("cart").update(record.id, {
      amount: record.amount + orderAmount.value,
    });
  } else {
    await pb.collection("cart").create({
      user: pb.authStore.model.id,
      item: selectedItem.value.id,
      amount: orderAmount.value,
    });
  }

  // modify inventory
  await pb.collection("inventory").update(selectedItem.value.id, {
    amount: selectedItem.value.amount - orderAmount.value,
  });
};
</script>

<style></style>
