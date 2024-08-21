<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

async function onSubmit(event: FormSubmitEvent<any>) {
  await pb.collection('users').authWithOAuth2({ provider: 'github' });
  navigateTo('/');
}
</script>

<template>
  <UContainer>
    <img src="/donut.png" alt="dev-and-donuts" class="w-32 mx-auto" />
    <UButton
      class="w-64 justify-center"
      @click="onSubmit"
    >
      Login with GitHub
    </UButton>
  </UContainer>
</template>
