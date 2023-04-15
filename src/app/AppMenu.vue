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

<style>
.layout-sidebar {
    position: sticky;
    width: 300px;
    height: calc(100vh - 9rem);
    z-index: 999;
    overflow-y: auto;
    user-select: none;
    top: 7rem;
    left: 2rem;
    transition: transform $transitionDuration, left $transitionDuration;
    background-color: var(--surface-overlay);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0px 3px 5px rgba(0,0,0,.02), 0px 0px 2px rgba(0,0,0,.05), 0px 1px 4px rgba(0,0,0,.08)
}

.layout-menu {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
        &.layout-menuitem-category {
            margin-top: .75rem;

            &:first-child {
                margin-top: 0;
            }
        }

        .layout-menuitem-root-text {
            text-transform: uppercase;
            color:var(--surface-900);
            font-weight: 600;
            margin-bottom: .5rem;
            font-size: .875rem;
        }

        a {
            cursor: pointer;
            text-decoration: none;
            display: flex;
            align-items: center;
            color:var(--text-color);
            transition: color $transitionDuration;
            border-radius: $borderRadius;
            padding: .75rem 1rem;
            transition: background-color .15s;

            span {
                margin-left: 0.5rem;
            }

            .menuitem-toggle-icon {
                margin-left: auto;
            }

            &:focus {
                @include focused-inset();
            }

            &:hover {
                background-color: var(--surface-hover);
            }

            &.router-link-exact-active {
                font-weight: 700;
                color: var(--primary-color);
            }

            .p-badge {
                margin-left: auto;
            }
        }

        &.active-menuitem {
            > a {
                .menuitem-toggle-icon {
                    &:before {
                        content: '\e933';
                    }
                }
            }
        }

        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;

            &.layout-submenu-wrapper-enter-from,
            &.layout-submenu-wrapper-leave-to {
                max-height: 0;
            }

            &.layout-submenu-wrapper-enter-to,
            &.layout-submenu-wrapper-leave-from {
                max-height: 1000px;
            }

            &.layout-submenu-wrapper-leave-active {
                overflow: hidden;
                transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);
            }

            &.layout-submenu-wrapper-enter-active {
                overflow: hidden;
                transition: max-height 1s ease-in-out;
            }

            ul {
                padding-left: 1rem;
            }
        }
    }
}
</style>