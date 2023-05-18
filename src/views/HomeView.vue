<script setup lang="ts">
import SurveyModal from '@/components/SurveyModal.vue';
import { ref } from 'vue';

const showSurveyModal = ref(false);
const toggleSurveyModal = () => {
    showSurveyModal.value = true;
};
</script>

<template>
    <main class="p-2">
        <div class="card">
            <h1 class="h1">Survey</h1>
            <p>Click the button below to answer our survey!</p>
            <p class="text-center">
                <a href="#" class="btn btn-success" @click="toggleSurveyModal">
                    Participate
                </a>
            </p>
        </div>
        <SurveyModal :showSurveyModal="showSurveyModal" />
    </main>
</template>

<style scoped></style>
