<template>
    <div
        :class="containerClass"
        @click="onWrapperClick"
    >
        <AppTopBar @menu-toggle="onMenuToggle" />

        <div
            class="layout-sidebar"
            @click="onSidebarClick"
        >
            <AppMenu
                :model="menu"
                @menuitem-click="onMenuItemClick"
            />
        </div>

        <div class="layout-main-container">
            <div class="layout-main">
                <router-view />
            </div>
            <AppFooter />
        </div>

        <transition name="layout-mask">
            <div
                v-if="mobileMenuActive"
                class="layout-mask p-component-overlay"
            />
        </transition>
        <TheToast />
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import AppTopBar from "./AppTopbar.vue";
    import AppMenu from "./AppMenu.vue";
    import AppFooter from "./AppFooter.vue";
    import ApiService from "../service/ApiService";

    export default {
        components: {
            AppTopBar,
            AppMenu,
            AppFooter,
        },
        emits: ["change-theme"],
        data() {
            return {
                layoutMode: "static",

                staticMenuInactive: false,
                overlayMenuActive: false,
                mobileMenuActive: false,
                showCart: false,
                menuActive: false,
                menu: [
                    {
                        group_key: "categories",
                        label: "Product Groups",
                        items: [],
                    },
                    {
                        label: "Admin Settings",
                        items: [
                            {
                                label: "Set Discount Form",
                                icon: "pi pi-fw pi-id-card",
                                to: "/set-discount",
                            },
                            {
                                label: "Discounts List",
                                icon: "pi pi-fw pi-list",
                                to: "/discounts",
                            },
                        ],
                    },
                ],
            };
        },
        apiService: null,

        computed: {
            containerClass() {
                return [
                    "layout-wrapper",
                    {
                        "layout-overlay": this.layoutMode === "overlay",
                        "layout-static": this.layoutMode === "static",
                        "layout-static-sidebar-inactive":
                            this.staticMenuInactive && this.layoutMode === "static",
                        "layout-overlay-sidebar-active":
                            this.overlayMenuActive && this.layoutMode === "overlay",
                        "layout-mobile-sidebar-active": this.mobileMenuActive,
                        "p-input-filled": this.$primevue.config.inputStyle === "filled",
                        "p-ripple-disabled": this.$primevue.config.ripple === false,
                    },
                ];
            },
            ...mapGetters("categoryModule", ["getCategoriesList"]),
        },
        watch: {
            $route() {
                this.menuActive = false;
                if (this.$toast) {
                    this.$toast.removeAllGroups();
                }
            },
        },
        created() {
            this.apiService = new ApiService();
        },
        mounted() {
            this.fillCategories();
        },
        methods: {
            onWrapperClick() {
                if (!this.menuClick) {
                    this.overlayMenuActive = false;
                    this.mobileMenuActive = false;
                }

                this.menuClick = false;
            },
            onMenuToggle() {
                this.menuClick = true;

                if (this.isDesktop()) {
                    if (this.layoutMode === "overlay") {
                        if (this.mobileMenuActive === true) {
                            this.overlayMenuActive = true;
                        }

                        this.overlayMenuActive = !this.overlayMenuActive;
                        this.mobileMenuActive = false;
                    } else if (this.layoutMode === "static") {
                        this.staticMenuInactive = !this.staticMenuInactive;
                    }
                } else {
                    this.mobileMenuActive = !this.mobileMenuActive;
                }

                event.preventDefault();
            },
            onSidebarClick() {
                this.menuClick = true;
            },
            onMenuItemClick(event) {
                if (event.item && !event.item.items) {
                    this.overlayMenuActive = false;
                    this.mobileMenuActive = false;
                }
            },
            addClass(element, className) {
                if (element.classList) element.classList.add(className);
                else element.className += ` ${className}`;
            },
            removeClass(element, className) {
                if (element.classList) element.classList.remove(className);
                else
                    element.className = element.className.replace(
                        new RegExp(`(^|\\b)${className.split(" ").join("|")}(\\b|$)`, "gi"),
                        " "
                    );
            },
            isDesktop() {
                return window.innerWidth >= 992;
            },
            isSidebarVisible() {
                if (this.isDesktop()) {
                    if (this.layoutMode === "static") return !this.staticMenuInactive;
                    if (this.layoutMode === "overlay") return this.overlayMenuActive;
                }

                return true;
            },
            async getCategories() {
                if (!window.localStorage.getItem("categories")) {
                    await this.getCategoriesFromDb();
                }
                await this.setCategoriesList(
                    JSON.parse(window.localStorage.getItem("categories"))
                );
            },
            getCategoriesFromDb() {
                return this.apiService
                    .getCategoriesList(this.$store.categories)
                    .then((list) => {
                        window.localStorage.setItem("categories", JSON.stringify(list));
                    });
            },
            async fillCategories() {
                await this.getCategories();
                const found = this.menu.find((e) => e.group_key === "categories");
                found.items = [...found.items, ...(this.getCategoriesList || [])];
            },
            ...mapActions("categoryModule", ["setCategoriesList"]),
        },
        beforeUpdate() {
            if (this.mobileMenuActive)
                this.addClass(document.body, "body-overflow-hidden");
            else this.removeClass(document.body, "body-overflow-hidden");
        },
    };
</script>
<style lang="scss">
.layout-content-area {
    display: flex;
}

</style>
