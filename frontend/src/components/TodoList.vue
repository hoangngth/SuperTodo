<template>
  <div>
    <div>
      <!-- Create Todo Form -->
      <div>
        <form @submit.prevent="createTodo">
          <div>
            <label for="title">Title</label>
            <input
              type="text"
              id="title"
              v-model="newTodo.title"
              required
            />
          </div>
          <div v-if="userRole === 'paid'">
            <label for="notes">Notes</label>
            <textarea
              id="notes"
              v-model="newTodo.notes"
              rows="3"
            ></textarea>
          </div>
          <button type="submit">
            Create Todo
          </button>
        </form>
      </div>

      <!-- Todo List -->
      <div>
        <div
          v-for="todo in todos"
          :key="todo.id"
        >
          <div>
            <div>
              Completed
              <input
                type="checkbox"
                :checked="todo.isCompleted"
                @change="toggleComplete(todo.id)"
              />
              <span 
                @click="toggleTodo(todo.id)"
                :class="{ 'completed': todo.isCompleted }"
              >
                {{ todo.title }}
              </span>
            </div>
            <div>
              <button @click="deleteTodo(todo.id)">
                Delete
              </button>
              <button @click="toggleTodo(todo.id)">
                {{ expandedTodos[todo.id] ? '▼' : '▶' }}
              </button>
            </div>
          </div>

          <!-- Accordion Content -->
          <div v-show="expandedTodos[todo.id]">
            <div>
              <div>
                Created: {{ new Date(todo.createdAt).toLocaleDateString() }}
              </div>
              
              <div v-if="userRole === 'paid'">
                <label>Notes</label>
                <textarea
                  v-model="todo.notes"
                  rows="3"
                  @change="updateNotes(todo.id, $event.target.value)"
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