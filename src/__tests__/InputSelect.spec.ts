import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import InputSelect from '../components/InputSelect.vue';

describe('InputSelect', () => {
    it('displays the label, and input', () => {
        const list = [
            { title: 'Group 1', list: ['Item 1', 'Item 2', 'Item 3'] },
            { title: 'Group 2', list: ['Item 4', 'Item 5', 'Item 6'] }
        ];
        // Mount the component
        const wrapper = mount(InputSelect, {
            props: {
                labelText: 'MyList',
                searchable: false,
                list: list,
            },
        });
        // Find the label and input
        const label = wrapper.find('label');
        const input = wrapper.find('input');

        // Check if the label and input are displayed correctly
        expect(label.text()).toBe('MyList');
        expect(input.exists()).toBe(true);

    });
  it('should emit input-change event when an item is selected', async () => {
    const list = [
      { title: 'Group 1', list: ['Item 1', 'Item 2', 'Item 3'] },
      { title: 'Group 2', list: ['Item 4', 'Item 5', 'Item 6'] }
    ];
    const labelText = 'Select an item';

    const wrapper = mount(InputSelect, {
      props: {
        list,
        labelText
      }
    });

    // Open the dropdown list
    await wrapper.find('.input-field-wrapper').trigger('click');

    // Select the first item
    await wrapper.find('.list-item').trigger('click');

    // Check if input-change event is emitted with the selected item value
    expect(wrapper.emitted('input-change')).toBeTruthy();
    expect(wrapper.emitted('input-change')[0][0]).toBe('Item 1');
  });

  it('should filter the list based on search input', async () => {
    const list = [
      { title: 'Group 1', list: ['Apple', 'Banana', 'Orange'] },
      { title: 'Group 2', list: ['Cat', 'Dog', 'Elephant'] }
    ];
    const labelText = 'Select an item';

    const wrapper = mount(InputSelect, {
      props: {
        list,
        labelText,
        searchable: true
      }
    });

    // Open the dropdown list
    await wrapper.find('.input-field-wrapper').trigger('click');

    // Type "a" in the search input
    await wrapper.find('.search-input').setValue('n');

    // Check if the list is filtered based on the search input
      const listItems = wrapper.findAll('.list-item');

    expect(listItems.length).toBe(3);
    expect(listItems[0].text()).toBe('Banana');
    expect(listItems[1].text()).toBe('Orange');
    expect(listItems[2].text()).toBe('Elephant');
  });
});
