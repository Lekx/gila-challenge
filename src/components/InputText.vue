<script setup lang="ts">
import { ref, watch } from 'vue';

// Props defined for component:
// 
const props = defineProps({
    defaultValue: {
        type: String,
        required: false,
        default: ''
    },
    labelText: {
        type: String,
        required: true,
    },
    helperText: {
        type: String,
        required: false,
        default: null,
    },
    max: {
        type: Number,
        required: false,
        default: null,
    },
});

const emit = defineEmits(['input-change']);

const inputValue = ref(props.defaultValue);

watch(() => inputValue.value, (newValue) => { 
    emit('input-change', newValue);
});

</script>
<template>
    <div>
        <label class="input-text d-block py-1 lead text-gray-dark">{{ props.labelText }}</label>
        <input class="input-field py-1" type="text" :maxlength="max" v-model="inputValue"/>
        <div class="input-helpers ly-row" v-if="helperText || max">
            <span class="helper-text py-1 w-80 text-dark-muted" v-if="helperText">{{ props.helperText }}</span>
            <span class="helper-length py-1 w-20 text-right" v-if="max">{{ `${inputValue.length}/${props.max}` }}</span>
        </div>
    </div>
</template>
<style lang="scss" scoped>
</style>
