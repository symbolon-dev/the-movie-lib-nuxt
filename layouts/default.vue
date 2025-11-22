<template>
    <div>
        <NuxtRouteAnnouncer />
        <HeaderComponent />
        <main class="mx-auto min-h-svh max-w-8xl px-4 xs:px-8 lg:px-16">
            <NuxtPage keepalive />
        </main>
    </div>
</template>
