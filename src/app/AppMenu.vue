<template>
    <div class="layout-menu-container">
        <AppSubmenu
            :items="model"
            class="layout-menu"
            :root="true"
            @menuitem-click="onMenuItemClick"
            @keydown="onKeyDown"
        />
    </div>
</template>

<script>
    import AppSubmenu from "./AppSubmenu.vue";

    export default {
        components: {
            AppSubmenu,
        },
        props: {
            model: {
                type: Array,
                default: null,
            },
        },
        emits: ["menuitem-click"],
        methods: {
            onMenuItemClick(event) {
                this.$emit("menuitem-click", event);
            },
            onKeyDown(event) {
                const nodeElement = event.target;
                if (event.code === "Enter" || event.code === "Space") {
                    nodeElement.click();
                    event.preventDefault();
                }
            },
        },
    };
</script>

<style scoped>
</style>