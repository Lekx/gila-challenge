import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import InputText from '../components/InputText.vue';

describe('InputText', () => {
  it('displays the label, input, helper text and max', () => {
    // Mount the component
    const wrapper = mount(InputText, {
      props: {
        labelText: 'Test Label',
        defaultValue: '',
        helperText: 'Helper Text',
        max: 10
      }
    });
    // Find the label, input, helper text and helper length elements
    const label = wrapper.find('label');
    const input = wrapper.find('input');
    const helperText = wrapper.find('.helper-text');
    const helperLength = wrapper.find('.helper-length');
    // Check if the label, input, helper text and helper length are displayed correctly
    expect(label.text()).toBe('Test Label');
    expect(input.exists()).toBe(true);
    expect(helperText.text()).toBe('Helper Text');
    expect(helperLength.text()).toBe('0/10');
  });
  
  it('displays only required props label and input', () => {
    // Mount the component
    const wrapper = mount(InputText, {
      props: {
        labelText: 'Required label',
      }
    });

    // Find the label, input, helper text and helper length elements
    const label = wrapper.find('label');
    const input = wrapper.find('input');
    const helperText = wrapper.find('.helper-text');
    const helperLength = wrapper.find('.helper-length');
    // Check if the label, input are displayed correctly.Helper text and helper length should not exist
    expect(label.text()).toBe('Required label');
    expect(input.exists()).toBe(true);
    expect(helperText.exists()).toBe(false);
    expect(helperLength.exists()).toBe(false);
  });

  it('emits input-change event with the new value', async () => {
    // Mount the component
    const wrapper = mount(InputText, {
      props: {
        labelText: 'Test Label',
        defaultValue: 'Initial Value',
        helperText: 'Helper Text',
        max: 10
      }
    });

    // Find the input element
    const input = wrapper.find('input');

    // Simulate input value change
    await input.setValue('New Value');

    // Check if the input-change event was emitted with the new value
    expect(wrapper.emitted('input-change')).toHaveLength(1);
    expect(wrapper.emitted('input-change')[0][0]).toBe('New Value');
  });
});
