<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

async function onSubmit(event: FormSubmitEvent<any>) {
  await pb.collection("users").authWithOAuth2({ provider: "github" });
  navigateTo("/");
}
</script>

<template>
  <div class="h-full flex flex-col justify-center">
    <UContainer>
      <img src="/donut.jpeg" alt="dev-and-donuts" class="w-32 mx-auto" />
      <UButton
        color="black"
        leading-icon="i-simple-icons-github"
        class="w-64 justify-center"
        @click="onSubmit"
        block
      >
        Login with GitHub
      </UButton>
    </UContainer>
  </div>
</template>
