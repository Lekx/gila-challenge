import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import HomeView from '../views/HomeView.vue';

describe('HomeView', () => {
    it('should render the correct HTML', () => {
        const wrapper = mount(HomeView);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should have a title of "Survey"', () => {
        const wrapper = mount(HomeView);

        expect(wrapper.find('h1').text()).toEqual('Survey');
    });

    it('should have a button with the text "Participate"', () => {
        const wrapper = mount(HomeView);

        expect(wrapper.find('a.btn.btn-success').text()).toEqual('Participate');
    });

    it('show the modal when button is clicked', async () => {
        const wrapper = mount(HomeView);

        const button = wrapper.find('a.btn.btn-success');
        await button.trigger('click');

        const overlay = wrapper.find('.overlay');
        expect(overlay.classes()).toContain('show');
    });
});
