import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SurveyModal from '../components/SurveyModal.vue';

describe('HomeView', () => {
    it('should render the correct HTML', () => {
        const wrapper = mount(SurveyModal);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should have a title of "Supermarket Survey!"', () => {
        const wrapper = mount(SurveyModal);

        expect(wrapper.find('h1').text()).toEqual('Supermarket Survey!');
    });

    it('should have a button with the text "Cancel"', () => {
        const wrapper = mount(SurveyModal);

        expect(wrapper.find('a.btn.hide-btn').text()).toEqual('Cancel');
    });

    it('should have a button with the text "Submit"', () => {
        const wrapper = mount(SurveyModal);

        expect(wrapper.find('a.btn.btn-primary').text()).toEqual('Submit');
    });
});
