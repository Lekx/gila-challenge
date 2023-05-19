<script setup lang="ts">
import { ref, watch } from 'vue';

interface iGroup {
    title: string;
    list: string[];
}
// Props defined for component:
//
const props = defineProps({
    list: {
        type: Array<iGroup>,
        required: true,
        default: null,
    },
    searchable: {
        type: Boolean,
        required: false,
        default: false,
    },
    defaultValue: {
        type: String,
        required: false,
        default: null,
    },
    labelText: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(['input-change']);

const initialListValues = JSON.parse(JSON.stringify(props.list));
const list = ref(props.list);
//Save an original copy of the list

const inputValue = ref(props.defaultValue);
const searchValue = ref(null);

watch(() => inputValue.value, (newValue) => {
    emit('input-change', newValue);
});

const showList = ref(false);

const toggleList = () => {
    showList.value = !showList.value;
};
//Reset the list values whenever is needed
const resetListValues = () => {
    searchValue.value = null;
    //assign a new copy to remove filters
    list.value = JSON.parse(JSON.stringify(initialListValues));
}

const selectItem = (item: string) => {
    toggleList();
    inputValue.value = item;
    resetListValues();
};

watch(() => searchValue.value, (newValue) => {
    console.log('called', newValue);
    if (!newValue || newValue === '') {
        resetListValues();
        return;
    };
    const res = list.value.map((group) => {
        const res = group.list.filter((item) => item.toLowerCase().includes(String(newValue).toLowerCase()));
        group.list = res;
        return group;
    });
    list.value = res;
});
</script>
<template>
    <div class="component-wrapper">
        <label class="input-text d-block py-1 lead text-gray-dark">{{
            props.labelText
        }}</label>
        <div class="input-field-wrapper" @click="toggleList">
            <i class="lpi-caret-down"></i>
            <input class="input-field py-1" type="text" v-model="inputValue" disabled placeholder="Select one"/>
        </div>
        <div class="rounded-sm shadow list-wrapper" v-if="showList">
            <div class="search-wrapper" v-if="props.searchable">
                <input type="text" class="search-input" v-model="searchValue" placeholder="Filter options..."/>
                <i class="lpi-search"></i>
            </div>
            <div v-for="(group, index) in list" :key="index">
                <label class="h6 text-gray pb-1">{{ group.title }}</label>
                <span class="list-item d-block" v-for="(item, idx) in group.list" :key="idx" @click="selectItem(item)">
                    {{ item }}
                </span>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.input-field-wrapper {
    position: relative;
    cursor: pointer;
    input {
        padding-right: 25px;
        &:disabled{
            cursor: pointer;
            color: black;
        }
    }
    i {
        position: absolute;
        right: 0;
        top: 3px;
        z-index: 1;
        font-size: 2em;
    }
}
.search-wrapper{
    position: relative;
    input{
        padding-left: 35px;
        margin-bottom: 10px;
    }
    i {
        position: absolute;
        left: 0;
        top: 7px;
        z-index: 1;
        font-size: 1.5em;
    }  
}
.component-wrapper{
    position: relative;
    .list-wrapper{
        background-color: white;
        padding: 10px;
        // width: 300px;
        position: absolute;
        top:100%;
        left:0;
        right: 0;
        .list-item{
            padding: 10px;
            border-left: 5px solid transparent;
            &:hover{
                background-color: #1a63ff6a;
                border-left:5px solid blue;
                cursor: pointer;
            }
        }
    }
}
</style>
