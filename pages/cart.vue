<template>
  <UContainer>
    <UCard class="flex-1">
      <h2 class="font-bold text-lg mb-2">Cart</h2>
      <ul class="space-y-2">
        <li
          v-for="cartItem in cartList"
          :key="cartItem.id"
          class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 w-full flex items-center justify-between"
        >
          <div>
            <span class="inline-block w-8">{{ cartItem.amount }}x </span>
            <span class="font-normal">{{
              cartItem.expand?.item.name ?? "Not found"
            }}</span>
          </div>

          <div class="flex items-center gap-1">
            <span>
              {{ (cartItem.expand?.item.price ?? 0) * cartItem.amount }}€
            </span>
            <UButton
              icon="i-heroicons-plus"
              size="xs"
              color="primary"
              square
              variant="solid"
              @click="() => adjust(cartItem, 1)"
            />

            <UButton
              icon="i-heroicons-minus"
              size="xs"
              color="primary"
              square
              variant="solid"
              @click="() => adjust(cartItem, -1)"
            />

            <UButton
              icon="i-heroicons-trash"
              size="xs"
              color="primary"
              square
              variant="solid"
              @click="() => deleteItem(cartItem)"
            />
          </div>
        </li>
      </ul>
    </UCard>
  </UContainer>
</template>

<script lang="ts" setup>
import { pb } from "~/utils/pocketbase";
const cartList = ref<[]>([]);

onMounted(async () => {});

const adjust = async (cartItem: CartResponse, amount: number) => {};

const deleteItem = async (cartItem: CartResponse) => {};
</script>

<style></style>
