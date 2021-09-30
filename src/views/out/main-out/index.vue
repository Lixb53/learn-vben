<template>
  <div class="fixed flex flex-col items-center justify-center w-full h-full text-4xl">
    <div class=""> 位于主框架外的页面 </div>
    <a-button @click="$router.go(-1)" class="mt-10" type="primary">Back</a-button>
  </div>
</template>
