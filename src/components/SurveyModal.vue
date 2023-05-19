<script setup lang="ts">
import { ref, watch } from 'vue';
import InputText from '@/components/InputText.vue';
import InputNumber from '@/components/InputNumber.vue';
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

const handleInputChange = (value: string) => {
    console.log(value);
}
</script>
<template>
    <div :class="['overlay', modalStyleState]">
        <div class="modal modal-md" id="survey-modal">
            <div class="ly-row ly-spacebetween-center mb-1">
                <h1 class="h3 m-0">Supermarket Survey!</h1>
                <a href="" class="btn btn-noborder btn-icon">
                    <i class="lpi-close"></i><span>Close</span>
                </a>
            </div>
            <div class="form">
                <!-- form placeholder -->
                <div class="ly-row">
                    <InputNumber class="w-50" labelText="Select a Fruit" :max="9" type="integer" @input-change="handleInputChange" />
                    <InputText class="w-50" labelText="Select a Food item" />
                </div>
                <div class="ly-row">
                    <InputText class="w-50" labelText="Favorite Food" helperText="E.g. Seafood Pizza."
                        defaultValue="mms wey" :max="80" />
                    <InputText class="w-50" labelText="Food Budget" helperText="Solo numbers" :max="5" />
                </div>
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



