<template>
  <div class="max-w-2xl mx-auto p-4">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- Create Todo Form -->
      <div class="p-6 border-b border-gray-200">
        <form @submit.prevent="createTodo" class="space-y-4">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              v-model="newTodo.title"
              required
              class="p-2 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="My title"
            />
          </div>
          <div v-if="userRole === 'paid'">
            <label for="notes" class="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              id="notes"
              v-model="newTodo.notes"
              rows="3"
              class="p-2 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Add notes (Premium feature)"
            ></textarea>
          </div>
          <div class="text-right">
            <button type="submit" 
                    class="inline-flex justify-center py-2 px-4 border border-transparent 
                           shadow-sm text-sm font-medium rounded-md text-white 
                           bg-blue-600 hover:bg-blue-700
                           focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Create Todo
            </button>
          </div>
        </form>
      </div>

      <!-- Todo List -->
      <div class="divide-y divide-gray-200">
        <div
          v-for="todo in todos"
          :key="todo.id"
          class="p-4 hover:bg-gray-50"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <input
                type="checkbox"
                :checked="todo.isCompleted"
                @change="toggleComplete(todo.id)"
                class="h-4 w-4 rounded border-gray-300 text-blue-600 
                       focus:ring-blue-500"
              />
              <span 
                @click="toggleTodo(todo.id)"
                :class="[
                  'text-sm cursor-pointer',
                  todo.isCompleted ? 'line-through text-gray-400' : 'text-gray-900'
                ]"
              >
                {{ todo.title }}
              </span>
            </div>
            <div class="flex items-center space-x-2">
              <button 
                @click="deleteTodo(todo.id)"
                class="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
              <button 
                @click="toggleTodo(todo.id)"
                class="text-gray-400 hover:text-gray-600"
              >
                {{ expandedTodos[todo.id] ? '▼' : '▶' }}
              </button>
            </div>
          </div>

          <!-- Accordion Content -->
          <div 
            v-show="expandedTodos[todo.id]"
            class="mt-4 pl-7"
          >
            <div class="space-y-4">
              <div class="text-sm text-gray-500">
                Created: {{ new Date(todo.createdAt).toLocaleDateString() }}
              </div>
              
              <div v-if="userRole === 'paid'" class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  v-model="todo.notes"
                  rows="3"
                  @change="updateNotes(todo.id, $event.target.value)"
                  class="block w-full rounded-md border-gray-300 shadow-sm 
                         focus:border-blue-500 focus:ring-blue-500 text-sm"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from 'vue';
import type { Todo, UserRole } from '../types/todo';

interface NewTodo {
  title: string;
  notes?: string;
}

export default defineComponent({
  name: 'TodoList',
  props: {
    userRole: {
      type: String as PropType<UserRole>,
      required: true,
    },
  },
  setup(props) {
    const todos = ref<Todo[]>([]);
    const expandedTodos = ref<Record<string, boolean>>({});
    const newTodo = ref<NewTodo>({
      title: '',
      notes: '',
    });
    const url = "http://localhost:3000/todo";

    const fetchTodos = async () => {
      try {
        const response = await fetch(`${url}?userRole=${props.userRole}`);
        todos.value = await response.json();
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };

    const createTodo = async () => {
      try {
        console.log(JSON.stringify(newTodo.value));
        const response = await fetch(`${url}?userRole=${props.userRole}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTodo.value),
        });
        
        if (response.ok) {
          newTodo.value = { title: '', notes: '' };
          await fetchTodos();
        }
      } catch (error) {
        console.error('Failed to create todo:', error);
      }
    };

    const toggleTodo = (todoId: string) => {
      expandedTodos.value[todoId] = !expandedTodos.value[todoId];
    };

    const toggleComplete = async (todoId: string) => {
      const todo = todos.value.find(t => t.id === todoId);
      if (todo) {
        try {
          await fetch(`${url}/${todoId}?userRole=${props.userRole}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isCompleted: !todo.isCompleted }),
          });
          await fetchTodos();
        } catch (error) {
          console.error('Failed to update todo:', error);
        }
      }
    };

    const updateNotes = async (todoId: string, notes: string) => {
      try {
        await fetch(`${url}/${todoId}?userRole=${props.userRole}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ notes }),
        });
        await fetchTodos();
      } catch (error) {
        console.error('Failed to update notes:', error);
      }
    };

    const deleteTodo = async (todoId: string) => {
      try {
        await fetch(`${url}/${todoId}`, {
          method: 'DELETE',
        });
        await fetchTodos();
      } catch (error) {
        console.error('Failed to delete todo:', error);
      }
    };

    onMounted(fetchTodos);

    return {
      todos,
      expandedTodos,
      newTodo,
      createTodo,
      toggleTodo,
      toggleComplete,
      updateNotes,
      deleteTodo,
    };
  },
});
</script>