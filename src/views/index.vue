<template>
    <div>
        <div class="container mt-5">
            <app-header></app-header>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import appHeader from '../components/appHeader.vue';
export default {
    components:{
        appHeader
    }
}
</script>