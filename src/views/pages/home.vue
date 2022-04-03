<template>
  <div>
    <div class="kyc-container">
      <!-- Table for kyc List -->
      <div class="row mt-4 user__table">
        <div class="col-lg-12">
          <div class="mb-4 d-flex justify-content-between">
            <div>
              <h4 class="font-weight-bold">All Submitted KYCs</h4>
              <p class="small">
                Showing
                <span> {{ pages_details.from }} - {{ pages_details.to }} </span>
                of <span> {{ pages_details.total }} </span>
              </p>
            </div>
            <div v-if="admin">
              <button class="email__wrap px-3 py-1" @click="send_feedback()">
                Send Feedback
              </button>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-centered table-nowrap mb-0">
              <thead class="thead-light">
                <tr>
                  <th>Reference No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Verification Status</th>
                  <th></th>
                </tr>
              </thead>
              <div class="d-flex justify-content-center mt-5" v-if="loading">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <tbody>
                <tr v-for="item in kyc" :key="item.id">
                  <td class="text-uppercase">
                    {{ item.reference_number }}
                    <!-- {{ admin.admin }} -->
                  </td>
                  <td class="text-capitalize">{{ item.name }}</td>
                  <td>{{ item.email }}</td>
                  <td class="d-flex align-items-center">
                    <div :class="[item.is_verified]"></div>
                    <span>{{ item.is_verified }}</span>
                  </td>
                  <td>
                    <router-link
                      :to="'/kyc/' + item.reference_number"
                      class="view-btn"
                      >View More</router-link
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- end table-responsive -->
          <pagination @next="getKyc" :meta="meta" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/pagination";
import helpers from "@/helpers/index.js";
export default {
  components: {
    pagination,
  },
  data() {
    return {
      kyc: [],
      pages_details: {},
      loading: false,
      admin: {},
      meta: {},
      page: "",
    };
  },
  methods: {
    async getKyc(page = 1) {
      this.loading = true;
      // const page = this.$route.query.page;
      let res = await helpers.getKyc(page);
      console.log(res.kycs);
      this.pages_details = res.kycs;
      this.kyc = res.kycs.data;
      this.meta = res.kycs;
      this.loading = false;
    },
    async send_feedback() {
      try {
        let res = await helpers.send_feedback();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async getAdmin() {
      try {
        let res = await helpers.getAdmin();
        this.admin = res.admin;
        console.log(this.admin);
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    this.getKyc();
    this.getAdmin();
  },
};
</script>