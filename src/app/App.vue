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
        <PreLoader />
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import AppTopBar from "./AppTopbar.vue";
    import AppMenu from "./AppMenu.vue";
    import AppFooter from "./AppFooter.vue";
    import PreLoader from "../components/PreLoader.vue";
    import ApiService from "../service/ApiService";

    export default {
        components: {
            AppTopBar,
            AppMenu,
            AppFooter,
            PreLoader,
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
                        group_key: 'admin',
                        items: [
                            {
                                label: "Set Discount Form",
                                icon: "pi pi-fw pi-id-card",
                                group_key: 'admin',
                                to: "/admin/set-discount",
                            },
                            {
                                label: "Discounts List",
                                icon: "pi pi-fw pi-list",
                                group_key: 'admin',
                                to: "/admin/discounts",
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
        beforeUpdate() {
            if (this.mobileMenuActive)
                this.addClass(document.body, "body-overflow-hidden");
            else this.removeClass(document.body, "body-overflow-hidden");
        },
        methods: {
            onWrapperClick() {
                if (!this.menuClick) {
                    this.overlayMenuActive = false;
                    this.mobileMenuActive = false;
                }

                this.menuClick = false;
            },
            onMenuToggle(event) {
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
                let today = new Date().toDateString();
                let pastDay = new Date(window.localStorage.getItem("catDate")).toDateString();
                let categories = window.localStorage.getItem("categories");
                if (!categories || today !== pastDay) {
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
                        window.localStorage.setItem("catDate", JSON.stringify(new Date()));
                    });
            },
            async fillCategories() {
                await this.getCategories();
                const found = this.menu.find((e) => e.group_key === "categories");
                found.items = [...found.items, ...(this.getCategoriesList || [])];
            },
            ...mapActions("categoryModule", ["setCategoriesList"]),
        },
    };
</script>
<style lang="scss">
@import "../assets/styles/main.scss";
</style>