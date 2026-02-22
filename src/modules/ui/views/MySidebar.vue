<script setup lang="ts">
import SidebarDemoComplete from './_components/SidebarDemoComplete.vue';
import SidebarDemoFloating from './_components/SidebarDemoFloating.vue';
import SidebarDemoIconCollapse from './_components/SidebarDemoIconCollapse.vue';
import SidebarDemoInset from './_components/SidebarDemoInset.vue';
import SidebarDemoReference from './_components/SidebarDemoReference.vue';
import SidebarDemoRight from './_components/SidebarDemoRight.vue';
import SidebarDemoSkeleton from './_components/SidebarDemoSkeleton.vue';
</script>

<template>
  <div class="flex flex-col gap-16 p-8">
    <h1 class="text-3xl font-bold">Sidebar</h1>
    <SidebarDemoComplete />
    <SidebarDemoRight />
    <SidebarDemoIconCollapse />
    <SidebarDemoFloating />
    <SidebarDemoInset />
    <SidebarDemoSkeleton />
    <SidebarDemoReference />
  </div>
</template>
