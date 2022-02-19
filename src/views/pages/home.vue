<template>
  <div>
    <div class="kyc-container">
      <!-- Table for kyc List -->
      <div class="row mt-4 user__table">
        <div class="col-lg-12">
          <h4 class="font-weight-bold mb-4">All Submitted KYCs</h4>
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
  data(){
    return{
      kyc: [],
    }
  },
  methods:{
    async getKyc(){
      let res = await helpers.getKyc();
      console.log(res.kycs);
      this.kyc = res.kycs
    }
  },
  async created(){
    this.getKyc();
  }
}
</script>