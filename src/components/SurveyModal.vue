<script setup lang="ts">
import { ref, watch } from 'vue';

// Props defined for component:
// showSurveyModal - to display the modal or not
const props = defineProps({
    showSurveyModal: {
        type: Boolean,
        required: true,
        default: false,
    },
});

// var that holds the modal class to show or hide the modal
const modalStyleState = ref('hide');

// Watcher to listen for parent button change on showing or not the modal
watch(
    () => props.showSurveyModal,
    (newValue) => {
        modalStyleState.value = newValue ? 'show' : 'hide';
    }
);

// Arrow function to change modalStyleState value to hide in order to hide the modal
const hideSurveyModal = () => {
    modalStyleState.value = 'hide';
};
</script>
<template>
    <div :class="['overlay', modalStyleState]">
        <div class="modal modal-md" id="survey-modal">
            <div class="ly-row ly-spacebetween-center mb-1">
                <h1 class="m-0">Supermarket Survey!</h1>
                <a href="" class="btn btn-noborder btn-icon">
                    <i class="lpi-close"></i><span>Close</span>
                </a>
            </div>
            <div>
                <!-- form placeholder -->
            </div>
            <div class="modal-footer text-right">
                <a href="" class="btn hide-btn" @click="hideSurveyModal()">Cancel</a>
                <a href="" class="btn btn-primary">Submit</a>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
// classes to fix the library functionality for toggling the modal
.show {
    display: flex;
    .modal {
        display: block;
    }
}
.hide {
    display: none;
}
</style>
