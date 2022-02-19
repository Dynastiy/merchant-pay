<template>
    <div class="mb-5">
        <h1> {{  currentRouteName}}<small class="small" v-if="currentRouteParams"> / {{ currentRouteParams }} </small></h1> 
        <hr>
        <!-- <div v-if="currentRouteName != 'Dashboard' " class="align-items-center d-flex" @click="goBack">
            <i class="fa fa-arrow-left fa-2x mr-3" aria-hidden="true"></i>
            <span>Back to Dashboard</span>
        </div> -->
        <!-- <div>
            <button @click="logout" class="btn cart-btn btn-danger">Logout</button>
        </div> -->
    </div>
</template>

<script>
// import Swal from 'sweetalert2'
export default {
    methods:{
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