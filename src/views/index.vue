<template>
    <div>
        <app-drawer></app-drawer>
        <div class="" id="main">
            <app-header></app-header>
            <router-view :key="$route.fullPath" />
        </div>
    </div>
</template>

<script>
import appHeader from '../components/appHeader.vue';
import appDrawer from '../components/AppDrawer.vue';
export default {
    components:{
        appHeader,
        appDrawer
    }
}
</script>