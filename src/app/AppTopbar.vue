<template>
    <div class="layout-topbar">
        <router-link
            to="/"
            class="layout-topbar-logo"
        >
            <img
                alt="Good Foods"
                :src="topbarImage()"
            >
            <span
                title="Good Foods"
                class="text-600"
                style="font-size: small"
            >Good Foods</span>
        </router-link>
        <button
            class="p-link layout-menu-button layout-topbar-button"
            @click="onMenuToggle"
        >
            <i class="pi pi-bars" />
        </button>

        <button
            class="p-link layout-topbar-menu-button layout-topbar-button"
            :class="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein',
                      leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}"
        >
            <i class="pi pi-ellipsis-v" />
        </button>
        <ul class="layout-topbar-menu hidden lg:flex origin-top">
            <li>
                <cart-widget />
            </li>
            <li>
                <button class="p-link layout-topbar-button">
                    <i class="pi pi-calendar" />
                    <span>Events</span>
                </button>
            </li>
            <li>
                <button class="p-link layout-topbar-button">
                    <i class="pi pi-cog" />
                    <span>Settings</span>
                </button>
            </li>
            <li>
                <button class="p-link layout-topbar-button">
                    <i class="pi pi-user" />
                    <span>Profile</span>
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
    import CartWidget from "../components/cart/CartWidget.vue";

    export default {
        components: {CartWidget},
        emits: ['menu-toggle', 'topbar-menu-toggle'],
        methods: {
            onMenuToggle(event) {
                this.$emit('menu-toggle', event);
            },
            onTopbarMenuToggle(event) {
                this.$emit('topbar-menu-toggle', event);
            },
            topbarImage() {
                return '/images/whole-europe.svg';
            }
        }
    }
</script>

<style></style>