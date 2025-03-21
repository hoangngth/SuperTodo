<template>
  <div class="bg-gray-100 container mx-auto my-10">
    <!-- Header -->
    <header>
      <div>
        <h1 class="text-center text-3xl font-semibold mb-4">Super Todo</h1>
        <p class="text-center mb-4">
          Current Plan: 
          <select v-model="userRole">
            <option value="free">Free</option>
            <option value="paid">Premium</option>
          </select>
        </p>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <TodoList :user-role="userRole" />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import TodoList from './components/TodoList.vue';
import type { UserRole } from './types/todo';

export default defineComponent({
  name: 'App',
  components: {
    TodoList,
  },
  setup() {
    const userRole = ref<UserRole>('free');

    onMounted(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const role = urlParams.get('userRole');
      if (role === 'paid') {
        userRole.value = role;
      } else {
        userRole.value = 'free';
      }
    });

    return { userRole };
  },
});
</script>