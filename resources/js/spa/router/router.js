import {createRouter, createWebHistory} from "vue-router";

// === === === === Portal layout === === === === //
import layout from "../layout/layout.vue";
import home from "../pages/home.vue";
import game from "../pages/game.vue";
import profile from "../pages/profile.vue";
import shop from "../pages/shop.vue";
import settings from "../pages/settings.vue";
import wallet from "../pages/wallet.vue";
import milestone from "../pages/milestone.vue";

// === === === === Routes Declare === === === === //
const routes = [

    // === === === === Routes declare of portal layout === === === === //
    {
        path: '/', name: 'layout', component: layout,
        children: [
            {path: '', name: 'home', component: home },
            {path: 'game', name: 'game', component: game },
            {path: 'profile', name: 'profile', component: profile },
            {path: 'shop', name: 'shop', component: shop },
            {path: 'settings', name: 'settings', component: settings },
            {path: 'wallet', name: 'wallet', component: wallet },
            {path: 'milestone', name: 'milestone', component: milestone },
        ]
    },

];

// === === === === Routes create router as show history and scroll behavior === === === === //
const router = createRouter({
    history: createWebHistory(), routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) { return { el: to.hash, behavior: 'smooth' }; } else { return {top: 0, behavior: 'smooth'}; }
    }
});

export default router;
