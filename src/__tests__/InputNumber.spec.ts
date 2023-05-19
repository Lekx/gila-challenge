import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import InputNumber from '../components/InputNumber.vue';

describe('InputNumber', () => {
    it('displays the label and input for integer. check if icon does not appear', () => {
        // Mount the component
        const wrapper = mount(InputNumber, {
            props: {
                labelText: 'Integer Label',
                max: 9,
                type: 'integer',
            },
        });
        // Find the label and input
        const label = wrapper.find('label');
        const input = wrapper.find('input');
        const icon = wrapper.find('.lpi-dollar');

        // Check if the label and input are displayed correctly
        expect(label.text()).toBe('Integer Label');
        expect(input.exists()).toBe(true);
        // Check icon does not exist
        expect(icon.exists()).toBe(false);
    });

    it('displays the label, input and for decimal. check if icon does not appear', () => {
        // Mount the component
        const wrapper = mount(InputNumber, {
            props: {
                labelText: 'Decimal Label',
                max: 5,
                type: 'decimal',
            },
        });
        // Find the label and input
        const label = wrapper.find('label');
        const input = wrapper.find('input');
        const icon = wrapper.find('.lpi-dollar');

        // Check if the label and input are displayed correctly
        expect(label.text()).toBe('Decimal Label');
        expect(input.exists()).toBe(true);
        // Check icon does not exist
        expect(icon.exists()).toBe(false);
    });

    it('displays the label, input and icon for currency. check if icon does not appear', () => {
        // Mount the component
        const wrapper = mount(InputNumber, {
            props: {
                labelText: 'Currency Label',
                max: 5,
                type: 'currency',
            },
        });
        // Find the label, input and icon elements
        const label = wrapper.find('label');
        const input = wrapper.find('input');
        const icon = wrapper.find('.lpi-dollar');

        // Check if the label, input, icon are displayed correctly
        expect(label.text()).toBe('Currency Label');
        expect(input.exists()).toBe(true);
        expect(icon.exists()).toBe(true);
    });

    it('emits input-change event with the new value', async () => {
        // Mount the component
        const wrapper = mount(InputNumber, {
            props: {
                labelText: 'Test Label',
                defaultValue: 500,
                max: 5,
            },
        });

        // Find the input element
        const input = wrapper.find('input');

        // Simulate input value change
        await input.setValue(200);

        // Check if the input-change event was emitted with the new value
        expect(wrapper.emitted('input-change')).toHaveLength(1);
        expect(wrapper.emitted('input-change')[0][0]).toBe('200');
    });
});
