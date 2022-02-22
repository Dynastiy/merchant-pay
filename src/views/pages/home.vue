<template>
  <div>
    <div class="kyc-container">
      <!-- Table for kyc List -->
      <div class="row mt-4 user__table">
        <div class="col-lg-12">
          <div class="mb-4">
            <h4 class="font-weight-bold">All Submitted KYCs</h4>
            <p class="small"> Showing <span> {{ pages_details.from }} - {{ pages_details.to }} </span> of <span> {{ pages_details.total }} </span></p>
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
                  </td>
                  <td class="text-capitalize"> {{ item.name }} </td>
                  <td > {{ item.email }} </td>
                  <td class="d-flex align-items-center"> <div :class="[item.is_verified]"></div> <span>{{ item.is_verified }}</span> </td>
                  <td>
                      <router-link :to=" '/kyc/'+item.reference_number " class="view-btn">View More</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- end table-responsive -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import helpers from '@/helpers/index.js'
export default {
  props: ['page'],
  components:{
  },
  data(){
    return{
      kyc: [],
      pages_details: {},
      loading: false,
    }
  },
  methods:{
    async getKyc(){
      this.loading = true
      const page = this.$route.query.page
      let res = await helpers.getKyc(page);
      console.log(res.kycs);
      this.pages_details = res.kycs
      this.kyc = res.kycs.data
      this.loading = false
    }
  },
  async created(){
    this.getKyc();
  }
}
</script>