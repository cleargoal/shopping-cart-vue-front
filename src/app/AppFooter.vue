<template>
    <div class="layout-footer">
        <img
            alt="Logo"
            :src="footerImage()"
            height="20"
            class="mr-2"
        >
        buy
        <span class="font-medium ml-2">Foods</span>
    </div>
</template>

<script>
    export default {
        name: "AppFooter",
        methods: {
            footerImage() {
                return '/images/whole-europe.svg';
            }
        }
    }
</script>

<style>
.layout-footer {
    transition: margin-left $transitionDuration;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
    border-top: 1px solid var(--surface-border);
}
.layout-footer img {
    max-height: 100%;
}
</style>