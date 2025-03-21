import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../App.vue';

describe('App.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(App);
  });

  it('renders header with title', () => {
    expect(wrapper.find('h1').text()).toBe('Super Todo');
  });

  it('starts with free plan by default', () => {
    expect(wrapper.vm.userRole).toBe('free');
  });

  it('updates userRole when select value changes', async () => {
    const select = wrapper.find('select');
    await select.setValue('paid');
    expect(wrapper.vm.userRole).toBe('paid');
  });

  it('passes correct userRole to TodoList component', async () => {
    const todoList = wrapper.findComponent({ name: 'TodoList' });
    expect(todoList.props('userRole')).toBe('free');

    await wrapper.find('select').setValue('paid');
    expect(todoList.props('userRole')).toBe('paid');
  });
});