<script setup lang="ts">
import { ref, watch } from 'vue';

// Props defined for component:
//
const props = defineProps({
    defaultValue: {
        type: String || Number,
        required: false,
        default: null,
    },
    labelText: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false,
        default: 'decimal',
    },
    max: {
        type: Number,
        required: false,
        default: null,
    },
});

const emit = defineEmits(['input-change']);

const inputValue = ref(props.defaultValue);

const parsedValue = (value: string) => {
    if (props.type === 'integer') {
        return value.replace(/\D/g, '');
    }
    return Number(value.replace(/[^0-9.]/g, '')).toLocaleString('en-US');
};

watch(
    () => inputValue.value,
    (newValue) => {
        inputValue.value = parsedValue(newValue);
        emit('input-change', inputValue.value);
    }
);
</script>
<template>
    <div>
        <label class="input-text d-block py-1 lead text-gray-dark">{{
            props.labelText
        }}</label>
        <div :class="['input-field-wrapper', props.type]">
            <i class="lpi-dollar" v-if="props.type === 'currency'"></i>
            <input
                class="input-field py-1"
                type="text"
                :maxlength="max + (props.type !== 'integer' ? 2 : 0)"
                v-model="inputValue"
            />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.input-field-wrapper.currency {
    position: relative;
    input {
        padding-left: 25px;
    }
    i {
        position: absolute;
        left: 0;
        top: 3px;
        z-index: 1;
        font-size: 2em;
    }
}
</style>
