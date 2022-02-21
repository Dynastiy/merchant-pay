<template>
    <div>
        <div id="sidebar">
            <div class="p-3 text-center mt-5">
                <img src="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png" alt="" width="70" class="bg-white rounded-circle">
                <p class="small text-white mt-3"> {{ user.name }} </p>
            </div>
            <ul class="list-unstyled">
                <router-link to="/">
                    <li>
                        <i class="fa fa-list" aria-hidden="true"></i>
                        <span>KYC Submissions
                        </span></li>
                </router-link>
                <router-link to="/staffs" v-show="user.role === 'admin' ">
                    <li>
                        <i class="fa fa-users" aria-hidden="true"></i>
                        <span>Staff 
                        </span></li>
                </router-link>

                <!-- <router-link to="/profile">
                
                    <li>
                        <i class="fa fa-user" aria-hidden="true"></i>
                        <span>Profile
                        </span></li>
                </router-link> -->

                <a href="javascript:void(0)" @click="logout">
                    <li>
                        <i class="fa fa-power-off" aria-hidden="true"></i>
                        <span>Logout</span></li>
                </a>
            </ul>
        </div>
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
        user(){
            return this.$store.getters.getUser
        }
    }
}
</script>

