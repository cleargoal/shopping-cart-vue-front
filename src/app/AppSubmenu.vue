<template>
    <ul v-if="items">
        <template
            v-for="(item, i, key) of items"
            :key="key"
        >
            <li
                v-if="visible(item) && !item.separator"
                :class="[{'layout-menuitem-category': root, 'active-menuitem': activeIndex === i && !item.to && !item.disabled}]"
                role="none"
            >
                <template v-if="root">
                    <div
                        v-show="$route.path.substring(1).split('/')[0] === 'admin' || ($route.path.substring(1).split('/')[0] !== '!admin' && item.group_key !== 'admin')"
                        class="layout-menuitem-root-text"
                        aria-label="item.label"
                    >
                        <span>
                            {{ item.label }}
                        </span>
                    </div>
                    <app-submenu
                        :items="visible(item) && item.items"
                        @menuitem-click="$emit('menuitem-click', $event)"
                    />
                </template>
                <template v-else>
                    <router-link
                        v-if="item.to"
                        v-show="$route.path.substring(1).split('/')[0] === 'admin' || ($route.path.substring(1).split('/')[0] !== '!admin' && item.group_key !== 'admin')"
                        :to="item.to"
                        :class="[item.class, 'p-ripple', {'p-disabled': item.disabled}]"
                        :style="item.style"
                        :target="item.target"
                        :aria-label="item.label"
                        exact
                        role="menuitem"
                        @click="onMenuItemClick($event,item,i)"
                    >
                        <i
                            :class="item.icon"
                        />
                        <span
                            style="font-size: large;"
                        >{{ item.label }}</span>
                        <i
                            v-if="item.items"
                            class="pi pi-fw pi-angle-down menuitem-toggle-icon"
                        />
                        <BadgeColored
                            v-if="item.badge"
                            :value="item.badge"
                        />
                    </router-link>
                    <a
                        v-if="!item.to"
                        :href="item.url||'#'"
                        :style="item.style"
                        :class="[item.class, 'p-ripple', {'p-disabled': item.disabled}]"
                        :target="item.target"
                        :aria-label="item.label"
                        role="menuitem"
                        @click="onMenuItemClick($event,item,i)"
                    >
                        <i :class="item.icon" />
                        <span>{{ item.label }}</span>
                        <i
                            v-if="item.items"
                            class="pi pi-fw pi-angle-down menuitem-toggle-icon"
                        />
                        <BadgeColored
                            v-if="item.badge"
                            :value="item.badge"
                        />
                    </a>
                    <transition name="layout-submenu-wrapper">
                        <app-submenu
                            v-show="activeIndex === i"
                            :items="visible(item) && item.items"
                            @menuitem-click="$emit('menuitem-click', $event)"
                        />
                    </transition>
                </template>
            </li>
            <li
                v-if="visible(item) && item.separator"
                :key="'separator' + i"
                class="p-menu-separator"
                :style="item.style"
                role="separator"
            />
        </template>
    </ul>
</template>
<script>
    export default {
        name: 'AppSubmenu',
        props: {
            items: {
                type: Array,
                default: null,
            },
            root: {
                type: Boolean,
                default: false
            }
        },
        emits: ["menuitem-click"],
        data() {
            return {
                activeIndex: null
            }
        },
        methods: {
            onMenuItemClick(event, item, index) {
                console.log('item, index, route: ', item, index, this.$route.path.substring(1).split('/')[0]);
                if (item.disabled) {
                    event.preventDefault();
                    return;
                }

                if (!item.to && !item.url) {
                    event.preventDefault();
                }

                //execute command
                if (item.command) {
                    item.command({originalEvent: event, item: item});
                }

                this.activeIndex = index === this.activeIndex ? null : index;

                this.$emit('menuitem-click', {
                    originalEvent: event,
                    item: item
                });
            },
            visible(item) {
                return (typeof item.visible === 'function' ? item.visible() : item.visible !== false);
            }
        }
    }
</script>
