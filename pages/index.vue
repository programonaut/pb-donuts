<template>
  <div>
    <UButton
      class="w-64 justify-center"
      @click="() =>{
        pb.authStore.clear();
        navigateTo('/login');
      }"
    >
      Logout
    </UButton>
  </div>
</template>

<script lang="ts" setup>
  import { pb } from '~/utils/pocketbase'
</script>

<style>

</style>