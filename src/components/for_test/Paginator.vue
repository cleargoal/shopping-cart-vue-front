<template>
    <div
        v-if="alwaysShow ? true : (pageLinks && pageLinks.length > 1)"
        class="p-paginator p-component"
    >
        <div
            v-if="$slots.start"
            class="p-paginator-left-content"
        >
            <slot
                name="start"
                :state="currentState"
            />
        </div>
        <template
            v-for="item of templateItems"
            :key="item"
        >
            <first-page-link
                v-if="item === 'FirstPageLink'"
                :disabled="isFirstPage || empty"
                @click="changePageToFirst($event)"
            />
            <PrevPageLink
                v-else-if="item === 'PrevPageLink'"
                :disabled="isFirstPage || empty"
                @click="changePageToPrev($event)"
            />
            <NextPageLink
                v-else-if="item === 'NextPageLink'"
                :disabled="isLastPage || empty"
                @click="changePageToNext($event)"
            />
            <LastPageLink
                v-else-if="item === 'LastPageLink'"
                :disabled="isLastPage || empty"
                @click="changePageToLast($event)"
            />
            <PageLinks
                v-else-if="item === 'PageLinks'"
                :value="pageLinks"
                :page="page"
                @click="changePageLink($event)"
            />
            <current-page-report
                v-else-if="item === 'CurrentPageReport'"
                :template="currentPageReportTemplate"
                :current-page="currentPage"
                :page="page"
                :page-count="pageCount"
                :first="d_first"
                :rows="d_rows"
                :total-records="totalRecords"
            />
            <RowsPerPageDropdown
                v-else-if="item === 'RowsPerPageDropdown' && rowsPerPageOptions"
                :rows="d_rows"
                :options="rowsPerPageOptions"
                :disabled="empty"
                @rows-change="onRowChange($event)"
            />
            <JumpToPageDropdown
                v-else-if="item === 'JumpToPageDropdown'"
                :page="page"
                :page-count="pageCount"
                :disabled="empty"
                @page-change="changePage($event)"
            />
            <JumpToPageInput
                v-else-if="item === 'JumpToPageInput'"
                :page="currentPage"
                :disabled="empty"
                @page-change="changePage($event)"
            />
        </template>
        <div
            v-if="$slots.end"
            class="p-paginator-right-content"
        >
            <slot
                name="end"
                :state="currentState"
            />
        </div>
    </div>
</template>

<script>
    import CurrentPageReport from 'primevue/paginator/CurrentPageReport.vue';
    import FirstPageLink from 'primevue/paginator/FirstPageLink.vue';
    import LastPageLink from 'primevue/paginator/LastPageLink.vue';
    import NextPageLink from 'primevue/paginator/NextPageLink.vue';
    import PageLinks from 'primevue/paginator/PageLinks.vue';
    import PrevPageLink from 'primevue/paginator/PrevPageLink.vue';
    import RowsPerPageDropdown from 'primevue/paginator/RowsPerPageDropdown.vue';
    import JumpToPageDropdown from 'primevue/paginator/JumpToPageDropdown.vue';
    import JumpToPageInput from 'primevue/paginator/JumpToPageInput.vue';

    export default {
        name: 'Paginator',
        components: {
            CurrentPageReport,
            FirstPageLink,
            LastPageLink,
            NextPageLink,
            PageLinks,
            PrevPageLink,
            RowsPerPageDropdown,
            JumpToPageDropdown,
            JumpToPageInput
        },
        props: {
            totalRecords: {
                type: Number,
                default: 0
            },
            rows: {
                type: Number,
                default: 10
            },
            first: {
                type: Number,
                default: 0
            },
            pageLinkSize: {
                type: Number,
                default: 5
            },
            rowsPerPageOptions: {
                type: Array,
                default: null
            },
            template: {
                type: String,
                default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
            },
            currentPageReportTemplate: {
                type: null,
                default: '({currentPage} of {totalPages})'
            },
            alwaysShow: {
                type: Boolean,
                default: true
            }
        },
        emits: ['update:first', 'update:rows', 'page', 'set-new-page', 'page-count',],
        data() {
            return {
                d_first: this.first,
                d_rows: this.rows
            }
        },
        computed: {
            templateItems() {
                let keys = [];
                this.template.split(' ').map((value) => {
                    keys.push(value.trim());
                })
                return keys;
            },
            page() {
                return Math.floor(this.d_first / this.d_rows);
            },
            pageCount() {
                let pages = Math.ceil(this.totalRecords / this.d_rows);
                this.$emit('page-count', pages);
                return pages;
            },
            isFirstPage() {
                return this.page === 0;
            },
            isLastPage() {
                return this.page === this.pageCount - 1;
            },
            calculatePageLinkBoundaries() {
                const numberOfPages = this.pageCount;
                const visiblePages = Math.min(this.pageLinkSize, numberOfPages);

                //calculate range, keep current in middle if necessary
                let start = Math.max(0, Math.ceil(this.page - ((visiblePages) / 2)));
                let end = Math.min(numberOfPages - 1, start + visiblePages - 1);

                //check when approaching to last page
                const delta = this.pageLinkSize - (end - start + 1);
                start = Math.max(0, start - delta);

                return [start, end];
            },
            pageLinks() {
                let pageLinks = [];
                let boundaries = this.calculatePageLinkBoundaries;
                let start = boundaries[0];
                let end = boundaries[1];

                for (var i = start; i <= end; i++) {
                    pageLinks.push(i + 1);
                }

                return pageLinks;
            },
            currentState() {
                return {
                    page: this.page,
                    first: this.d_first,
                    rows: this.d_rows
                }
            },
            empty() {
                return this.pageCount === 0;
            },
            currentPage() {
                return this.pageCount > 0 ? this.page + 1 : 0;
            }
        },
        watch: {
            first(newValue) {
                this.d_first = newValue;
            },
            rows(newValue) {
                this.d_rows = newValue;
            },
            totalRecords(newValue) {
                if (this.page > 0 && newValue && (this.d_first >= newValue)) {
                    this.changePage(this.pageCount - 1);
                }
            }
        },
        methods: {
            changePage(p) {
                const pc = this.pageCount;

                if (p >= 0 && p < pc) {
                    this.d_first = this.d_rows * p;
                    const state = {
                        page: p,
                        first: this.d_first,
                        rows: this.d_rows,
                        pageCount: pc
                    };

                    this.$emit('update:first', this.d_first);
                    this.$emit('update:rows', this.d_rows);
                    this.$emit('page', state);
                }
                this.$emit('set-new-page', this.currentPage);
                this.debug();
            },
            changePageToFirst(event) {
                if (!this.isFirstPage) {
                    this.changePage(0);
                }

                event.preventDefault();
            },
            changePageToPrev(event) {
                this.changePage(this.page - 1);
                event.preventDefault();
            },
            changePageLink(event) {
                this.changePage(event.value - 1);
                event.originalEvent.preventDefault();
            },
            changePageToNext(event) {
                this.changePage(this.page + 1);
                event.preventDefault();
            },
            changePageToLast(event) {
                if (!this.isLastPage) {
                    this.changePage(this.pageCount - 1);
                }

                event.preventDefault();
            },
            onRowChange(value) {
                this.d_rows = value;
                this.changePage(this.page);
            },
            debug() {
                console.log('Paginator.totalRecords', this.totalRecords);
                console.log('Paginator.rows', this.rows);
                console.log('Paginator.d_rows', this.d_rows);
                console.log('Paginator.first', this.first);
                console.log('Paginator.d_first', this.d_first);
                console.log('Paginator.pageLinkSize', this.pageLinkSize);
                console.log('Paginator.rowsPerPageOptions', this.rowsPerPageOptions);
                console.log('Paginator.template', this.template);
                console.log('Paginator.currentPageReportTemplate', this.currentPageReportTemplate);
                console.log('Paginator.alwaysShow', this.alwaysShow);
                console.log('Paginator.templateItems', this.templateItems);
                console.log('Paginator.page', this.page);
                console.log('Paginator.pageCount', this.pageCount);
                console.log('Paginator.currentPage', this.currentPage);
            }
        },
    }
</script>

<style lang="css">
.p-paginator {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.p-paginator-left-content {
  margin-right: auto;
}

.p-paginator-right-content {
  margin-left: auto;
}

.p-paginator-page,
.p-paginator-next,
.p-paginator-last,
.p-paginator-first,
.p-paginator-prev,
.p-paginator-current {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  user-select: none;
  overflow: hidden;
  position: relative;
}

.p-paginator-element:focus {
  z-index: 1;
  position: relative;
}
</style>
