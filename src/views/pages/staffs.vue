<template>
  <div>
    <div class="kyc-container">
      <!-- Table for kyc List -->
      <div class="row mt-4 user__table">
        <div class="col-lg-12">
          <div class="mb-4 text-right">
            <a href="javascript:void(0)" class="view-btn" @click="add_staff = !add_staff">Add Staff</a>
          </div>
          <div class="table-responsive">
            <table class="table table-centered table-nowrap mb-0">
              <thead class="thead-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in staffs" :key="item.id">
                  <td class="text-capitalize">{{ item.name }}</td>
                  <td>{{ item.email }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- end table-responsive -->
        </div>
      </div>

        <!-- Modal to Add new Staff  -->
      <div class="add_staff_container" v-show="add_staff">
        
        <form action="" class="shadow-lg" @submit.prevent="addStaff">
            <div class="text-right" @click="add_staff = !add_staff">
            <i class="fa fa-times text-danger" aria-hidden="true"></i>
        </div>
            <h5 class="font-weight-bold mb-3">Add Staff</h5>
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="" class="small">First Name</label> <br />
              <input type="text" name="" id="" v-model="first_name" @change='concatFunction' />
              <p class="small text-danger" v-for="error in errors.name" :key="error.id"> *{{ error }} </p>
            </div>
            <div class="col-md-6">
              <label for="" class="small">Last Name</label> <br />
              <input type="text" name="" id="" v-model="last_name" @change='concatFunction' />
            </div>
          </div>
          <div class="mb-5">
            <label for="" class="small">Email</label> <br />
            <input type="email" name="" v-model="payload.email" id="" />
            <p class="small text-danger" v-for="error in errors.email" :key="error.id"> *{{ error }} </p>
          </div>
          <div>
                <div class="d-flex justify-content-center" v-if="loading">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
              <button v-else type="submit" class="view-btn small">Add Staff</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import helpers from "@/helpers/index.js";
import Swal from 'sweetalert2'
export default {
  //   props: ['page'],
  components: {},
  data() {
    return {
      staffs: {},
      loading: false,
      add_staff: false,
      first_name: '',
      last_name: '',
      errors: {},
      payload: {
        name: "",
        email: "",
      },
    };
  },
  methods: {
       concatFunction(){
        this.payload.name = this.first_name + " " + this.last_name;
      },
    async addStaff() {
      try {
          this.loading = true;
        let res = await helpers.addStaff(this.payload);
        console.log(res);
        let msg = res.message
        this.getStaffs();
        this.payload = {};
        this.first_name = ''; 
        this.last_name= '';
        this.add_staff = false;
        Swal.fire(
          'Nice!',
          msg,
          'success'
        )
      } catch (error) {
        let msg = error.response.data.message;
        this.loading = false
        this.payload = {};
        this.first_name = ''; 
        this.last_name= '';
        this.errors = error.response.data.errors
        // this.add_staff = false;
        Swal.fire(
          'Error!',
          msg,
          'warning'
        )
        
      }
      this.loading= false;
    },
    async getStaffs() {
      let res = await helpers.getStaffs();
      console.log(res.users);
      this.staffs = res.users;
    },
  },
  async created() {
    this.getStaffs();
  },
};
</script>
