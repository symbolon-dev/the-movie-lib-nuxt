<template>
    <div class="flex min-h-screen flex-col items-center justify-center">
        <h1 class="heading-1 mb-2">
            Fehler {{ error?.statusCode || '' }}
        </h1>
        <p class="mb-8 max-w-xl text-center ">
            {{ error?.message || 'Es ist ein unerwarteter Fehler aufgetreten.' }}
        </p>
        <button
            class="btn btn-primary" 
            @click="clearError({ redirect: '/' })"
        >
            Zurück zur Startseite
        </button>
    </div>
</template>

<script setup lang="ts">
const error = useError();
</script>
