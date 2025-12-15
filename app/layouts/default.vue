<template>
    <div>
        <NuxtRouteAnnouncer />
        <HeaderComponent />
        <main
            class="
                max-w-8xl mx-auto min-h-svh px-4
                xs:px-8
                lg:px-16
            "
        >
            <NuxtPage keepalive />
        </main>
    </div>
</template>
