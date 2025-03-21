import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import TodoList from '../TodoList.vue';

describe('TodoList.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    // Mock fetch API
    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      })
    ) as unknown as typeof fetch;
  });

  it('renders todo form with title input', () => {
    wrapper = mount(TodoList, {
      props: { userRole: 'free' }
    });
    expect(wrapper.find('#title').exists()).toBe(true);
  });

  it('hides notes field for free users', () => {
    wrapper = mount(TodoList, {
      props: { userRole: 'free' }
    });
    expect(wrapper.find('#notes').exists()).toBe(false);
  });

  it('shows notes field for paid users', () => {
    wrapper = mount(TodoList, {
      props: { userRole: 'paid' }
    });
    expect(wrapper.find('#notes').exists()).toBe(true);
  });

  it('creates new todo when form is submitted', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: '1', title: 'Test Todo' })
    });
    window.fetch = mockFetch as unknown as typeof fetch;

    wrapper = mount(TodoList, {
      props: { userRole: 'free' }
    });

    await wrapper.find('#title').setValue('Test Todo');
    await wrapper.find('form').trigger('submit.prevent');

    expect(mockFetch).toHaveBeenCalled();
  });
});