<script setup lang="ts">
import { ref, watch } from 'vue';
import InputText from '@/components/InputText.vue';
import InputSelect from '@/components/InputSelect.vue';
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
const simpleList = [
    {
        list: [
            'Watermelon',
            'Orange',
            'Banana',
            'Kiwi',
        ]
    },
];
const groupList = [
    {
        title: 'Fruits',
        list: [
            'Watermelon',
            'Orange',
            'Banana',
            'Kiwi',
        ]
    },
    {
        title: 'Vegetables',
        list: [
            'Lettuce',
            'Cucumber',
            'Cabbage',
            'Tomato',
        ]
    }
];

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
                <a href="" class="btn btn-noborder btn-icon text-black">
                    <i class="lpi-close"></i><span>Close</span>
                </a>
            </div>
            <div class="form">
                <div class="form-row">
                    <InputSelect class="field" labelText="Select a Fruit" :list="simpleList" :searchable="false" @input-change="handleInputChange"/>
                    <InputSelect class="field" labelText="Select a Food Item" :list="groupList" :searchable="true" @input-change="handleInputChange"/>
                </div>
                <div class="form-row">
                    <InputText class="field" labelText="Favorite Food" helperText="E.g. Seafood Pizza." defaultValue="" :max="80" @input-change="handleInputChange"/>
                    <InputNumber class="field" labelText="Food Budget" :max="9" type="currency" @input-change="handleInputChange" />
                </div>
            </div>
            <div class="modal-footer text-right">
                <a href="" class="btn btn-lg hide-btn" @click="hideSurveyModal()">Cancel</a>
                <a href="" class="btn btn-lg btn-primary">Submit</a>
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
.form-row{
    widows: 100%;
    display: flex;
    .field{
        
        width: 50%;
        padding: 10px 20px;
    }
}

@media only screen and (max-width: 600px) {
    .lp .overlay{
        padding: 1rem;
    }
    #survey-modal{
        width: 100%;
    }
    .form{
        margin-bottom:40px;
    }
    .form-row{
        flex-direction: column;
        .field{
            width: 100%;
        }
    }
}
</style>




