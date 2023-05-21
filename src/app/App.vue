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

        <div
            v-if="preloader"
            class="preloader"
        >
            <main>
                <svg
                    class="ip"
                    viewBox="0 0 256 128"
                    width="256px"
                    height="128px"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient
                            id="grad1"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                        >
                            <stop
                                offset="0%"
                                stop-color="#5ebd3e"
                            />
                            <stop
                                offset="33%"
                                stop-color="#ffb900"
                            />
                            <stop
                                offset="67%"
                                stop-color="#f78200"
                            />
                            <stop
                                offset="100%"
                                stop-color="#e23838"
                            />
                        </linearGradient>
                        <linearGradient
                            id="grad2"
                            x1="1"
                            y1="0"
                            x2="0"
                            y2="0"
                        >
                            <stop
                                offset="0%"
                                stop-color="#e23838"
                            />
                            <stop
                                offset="33%"
                                stop-color="#973999"
                            />
                            <stop
                                offset="67%"
                                stop-color="#009cdf"
                            />
                            <stop
                                offset="100%"
                                stop-color="#5ebd3e"
                            />
                        </linearGradient>
                    </defs>
                    <g
                        fill="none"
                        stroke-linecap="round"
                        stroke-width="16"
                    >
                        <g
                            class="ip__track"
                            stroke="#ddd"
                        >
                            <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                            <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                        </g>
                        <g stroke-dasharray="180 656">
                            <path
                                class="ip__worm1"
                                stroke="url(#grad1)"
                                stroke-dashoffset="0"
                                d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"
                            />
                            <path
                                class="ip__worm2"
                                stroke="url(#grad2)"
                                stroke-dashoffset="358"
                                d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"
                            />
                        </g>
                    </g>
                </svg>
            </main>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from "vuex";
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
            ...mapState({
                preloader: state => state.commonModule.preloader,
            }),
        },
        watch: {
            $route() {
                this.menuActive = false;
                if (this.$toast) {
                    this.$toast.removeAllGroups();
                }
                this.setShowPreloader();
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
            ...mapActions('commonModule', ['setShowPreloader', 'setHidePreloader']),
        },
    };
</script>
<style lang="scss">
@import "../assets/styles/main.scss";
main {
  padding: 1.5em 0;
}
.ip {
  width: 16em;
  height: 8em;
}
.ip__track {
  stroke: hsl(var(--hue),90%,90%);
  transition: stroke var(--trans-dur);
}
.ip__worm1,
.ip__worm2 {
  animation: worm1 0.5s linear infinite;
}
.ip__worm2 {
  animation-name: worm2;
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: hsl(var(--hue),90%,5%);
    --fg: hsl(var(--hue),90%,95%);
  }
  .ip__track {
    stroke: hsl(var(--hue),90%,15%);
  }
}

/* Animation */
@keyframes worm1 {
  from {
    stroke-dashoffset: 0;
  }
  50% {
    animation-timing-function: steps(1);
    stroke-dashoffset: -358;
  }
  50.01% {
    animation-timing-function: linear;
    stroke-dashoffset: 358;
  }
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes worm2 {
  from {
    stroke-dashoffset: 358;
  }
  50% {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: -358;
  }
}
.preloader {
  position: absolute;
  top: 20%;
  left: 37.5%;
  z-index: 1000;
  width: 25%;
  height: 25%;
  background-color: black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>