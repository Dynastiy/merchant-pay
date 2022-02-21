<template>
    <div class="mb-3">
        <div class="py-2 d-flex justify-content-between">
            <div class="search__field">
                <i class="fa fa-search" aria-hidden="true"></i>
                <input type="text" placeholder="Enter Email or reference number" v-model="searchVal" @keyup="getQuery">
                <div class="search__result" v-if="search_results">
                    <ul class="list-unstyled">
                        <li v-for="result in results" :key="result.id">
                            <router-link :to=" '/kyc/'+result.reference_number">{{ result.name }}</router-link>
                        </li>
                        <li v-show="no_result"> <a href="javascript:void(0)"></a> No results found </li>
                    </ul>
                </div>
            </div>
            <div>
                <button class="view-btn small" @click="update_password = !update_password">Update Password</button>
            </div>
        </div>
        <div>
            <h1> {{  currentRouteName}}<small class="small" v-if="currentRouteParams"> / {{ currentRouteParams }} </small></h1> 
        <hr>
        </div>


         <!-- Modal to Update Password  -->
      <div class="add_staff_container" v-show="update_password">
        
        <form action="" class="shadow-lg" @submit.prevent="updatePassword">
            <div class="text-right" @click="update_password = !update_password">
            <i class="fa fa-times text-danger" aria-hidden="true"></i>
        </div>
            <h5 class="font-weight-bold mb-3">Update Password</h5>
          <div class="mb-3">
            <label for="" class="small">Old Password</label> <br />
            <input type="text" name="" v-model="payload.old_password" id="" />
            <!-- <p class="small text-danger" v-for="error in errors.email" :key="error.id"> *{{ error }} </p> -->
          </div>
          <div class="mb-3">
            <label for="" class="small">New Password</label> <br />
            <input type="text" name="" v-model="payload.password" id="" />
            <!-- <p class="small text-danger" v-for="error in errors.email" :key="error.id"> *{{ error }} </p> -->
          </div>
          <div class="mb-5">
            <label for="" class="small">Confirm Password</label> <br />
            <input type="text" name="" v-model="payload.password_confirmation" id="" />
            <!-- <p class="small text-danger" v-for="error in errors.email" :key="error.id"> *{{ error }} </p> -->
          </div>
          <div>
                <div class="d-flex justify-content-center" v-if="loading">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
              <button v-else type="submit" class="view-btn small">Update Password</button>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
import helpers from '@/helpers/index.js'
import Swal from 'sweetalert2'
import axios from 'axios';
export default {
    data(){
        return{
            results: [],
            baseurl: "https://api.verify.szcmerchant.com/",
            searchVal: '',
            search_results: false,
            no_result: false,
            update_password: false,
            payload:{
                old_password: '',
                password: '',
                password_confirmation: '',
            },
            loading: false,
        }
    },
    methods:{
        async getQuery(){
            if(this.search_results === false){
                this.search_results = true;
                const res = await axios.get(`${this.baseurl}api/kyc/details`, { params: { search: this.searchVal } });
                console.log(res.data.kycs.data);
                this.results = res.data.kycs.data
                if(this.results.length === 0){
                    this.no_result = true
                }
                else{
                    this.no_result = false
                }
            }
            else{
                this.search_results = false;
            }
        
    },
    async updatePassword(){
        this.loading  = true
        try {
            
            const res = await helpers.updatePassword(this.payload);
        console.log(res);
        let msg = res.message
        this.update_password = false
        this.payload= {}
        Swal.fire(
          'Nice!',
          msg,
          'success'
        )
        this.$router.push('/signin')
        } catch (error) {
            let msg = error.response.data.message;
        Swal.fire(
          'Error!',
          msg,
          'warning'
        )
        this.payload= {}
        }
        this.loading = false
    },
        logout() {
      this.$store.dispatch('logout');
    
      this.$router.push('/signin');
    },
    goBack(){
        this.$router.go(-1)
    }
    },
    computed:{
        currentRouteName(){
            return this.$route.name
        },
        currentRouteParams(){
            return this.$route.params.id
        }
    }
}
</script>