<template>
    <div class="mb-3">
        <div class="py-2">
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
        </div>
        <div>
            <h1> {{  currentRouteName}}<small class="small" v-if="currentRouteParams"> / {{ currentRouteParams }} </small></h1> 
        <hr>
        </div>
    </div>
</template>

<script>
// import Swal from 'sweetalert2'
import axios from 'axios';
export default {
    data(){
        return{
            results: [],
            baseurl: "https://api.verify.szcmerchant.com/",
            searchVal: '',
            search_results: false,
            no_result: false,
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
        logout() {
      this.$store.dispatch('logout');
    //   Swal.fire(
    //       'Bye!',
    //       'Logged out!',
    //       'warning'
    //     )
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