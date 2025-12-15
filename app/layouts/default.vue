<template>
    <div>
        <NuxtRouteAnnouncer />
        <HeaderComponent />
        <main class="max-w-8xl xs:px-8 mx-auto min-h-svh px-4 lg:px-16">
            <NuxtPage keepalive />
        </main>
    </div>
</template>
