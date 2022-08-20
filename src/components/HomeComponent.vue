<template>
  <div>
    <div class="center">
      <p class="text-2xl text-emerald-800">خوش امدید</p>
    </div>
    <div class="center mt-4">
      <router-link to="/Main" class="text-2xl text-emerald-800 block">
        برای ورود به سرچ کلیک کنید
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "home-component",
};
</script>
<style scoped>
  .center{
    @apply flex justify-center items-center;
  }
</style>