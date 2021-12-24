<template>
  <v-card
    color=""
    class="pa-4"
  >
    <v-card min-height="60" class="d-flex flex-row align-center ma-0 mt-n4 pa-0" flat color="transparent">
      <v-card
        v-if="instanceId"
        class="px-4 py-2 mr-2 rounded-r-pill primary font-weight-bold white--text"
        @click="onClickInstance"
      >
        Instance {{ instanceId }}
      </v-card>
      <v-card
        v-if="instanceId && buildId"
        class="px-4 py-2 mr-2 rounded-r-pill primary font-weight-bold white--text"
        @click="onClickBuild"
      >
        Build {{ buildId }}
      </v-card>
      <v-card
        v-if="instanceId && buildId && suiteId"
        class="px-4 py-2 mr-2 rounded-r-pill primary font-weight-bold white--text"
        @click="onClickSuite"
      >
        Suite {{ suiteId }}
      </v-card>
    </v-card>

    <v-divider></v-divider>

    <div class="text-center pt-2 d-flex flex-row align-center">
      <div class="pa-4 title">
        Total {{ view }}: {{ total }}
      </div>
      <v-spacer></v-spacer>
      <v-pagination
        v-model="page"
        :length="pagesAmount"
      ></v-pagination>
    </div>

    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="items"
      :items-per-page="itemsPerPage"
      :page.sync="page"
      hide-default-footer
      @click:row="onClickRow"
    >
      <template #item.started="{ value }">
        {{ value | date }}
      </template>
      <template #item.finished="{ value }">
        {{ value | date }}
      </template>
      <template #item.result_status="{ value }">
        <div class="fill-height pa-2">
          <div
            class="rounded-pill fill-height pa-2 font-weight-bold d-flex flex-row align-center justify-center text--darken-4"
            :class="{
              'error error--text': value === 'ERROR',
              'warning warning--text ': value === 'FAILED',
              'success success--text': value === 'SUCCESS',
            }"
          >
            {{ value }}
          </div>
        </div>
      </template>
    </v-data-table>

  </v-card>
</template>

<script>
export default {
  name: 'Main',

  data() {
    return {
      instanceId: null,
      buildId: null,
      suiteId: null,
      caseId: null,
      total: 0,
      page: 1,
      itemsPerPage: 10,
      items: [],
      loading: false,
    };
  },

  computed: {
    view() {
      const { instanceId, buildId, suiteId } = this;
      if (instanceId && buildId && suiteId) return 'cases';
      if (instanceId && buildId) return 'suites';
      if (instanceId) return 'builds';
      return 'instances';
    },

    headers() {
      const HEADER_PK = {
        text: 'Id',
        align: 'center',
        value: 'id',
      }
      const HEADER_NAME = {
        text: 'Name',
        align: 'center',
        value: 'name',
      }
      const HEADER_DESCRIPTION = {
        text: 'Description',
        align: 'center',
        value: 'description',
      }
      const HEADER_NUMBER = {
        text: 'Number',
        align: 'center',
        value: 'number',
      }
      const HEADER_STARTED = {
        text: 'Started',
        align: 'center',
        sortable: false,
        value: 'started',
      }
      const HEADER_FINISHED = {
        text: 'Finished',
        align: 'center',
        sortable: false,
        value: 'finished',
      }
      const HEADER_STATUS = {
        text: 'Status',
        align: 'center',
        value: 'result_status',
      }
      const headersVariants = {
        instances:  [HEADER_PK, HEADER_NAME, HEADER_DESCRIPTION],
        builds:     [HEADER_PK, HEADER_NUMBER, HEADER_STARTED, HEADER_FINISHED],
        suites:     [HEADER_PK, HEADER_NAME, HEADER_STARTED, HEADER_FINISHED],
        cases:      [HEADER_PK, HEADER_NAME, HEADER_STARTED, HEADER_FINISHED, HEADER_STATUS],
      }
      return headersVariants[this.view] ?? [HEADER_PK]
    },

    pagesAmount() {
      return Math.ceil(this.total / this.itemsPerPage)
    },
  },

  watch: {
    view: {
      immediate: true,
      handler() {
        this.page = 1;
        this.total = 0;
        this.load();
      },
    },

    page: {
      immediate: true,
      handler() {
        this.load();
      }
    }
  },

  filters: {
    date: v => new Date(v).toLocaleString(),
  },

  methods: {
    load() {
      const { instanceId, buildId, suiteId, caseId, page, itemsPerPage } = this;
      this.loading = true;
      let offset = (page-1) * itemsPerPage
      let limit = itemsPerPage
      const loadVariants = {
        instances: this.$api.getInstances,
        builds:    this.$api.getBuilds,
        suites:    this.$api.getSuites,
        cases:     this.$api.getCases,
      }
      const get = loadVariants[this.view];
      get({ filter: { offset, limit }, instanceId, buildId, suiteId, caseId})
      .then( ({ data }) => {
        this.items = data?.results;
        this.total = data?.count;
      })
      .finally( () => {
        this.loading = false;
      })
    },

    onClickRow(item) {
      console.log({ item })
      const { view } = this;
      const idVariand = {
        instances:  'instanceId',
        builds:     'buildId',
        suites:     'suiteId',
        cases:      'caseId',
      }
      this[idVariand[view]] = item.id
    },

    onClickInstance() {
      this.suiteId = null;
      this.buildId = null;
      this.instanceId = null;
    },

    onClickBuild() {
      this.suiteId = null;
      this.buildId = null;
    },

    onClickSuite() {
      this.suiteId = null;
    }
  },


}
</script>
