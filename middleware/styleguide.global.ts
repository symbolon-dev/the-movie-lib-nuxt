export default defineNuxtRouteMiddleware((to) => {
    if (process.env.NODE_ENV === 'production' && to.path === '/styleguide') {
        return navigateTo('/');
    }
});
