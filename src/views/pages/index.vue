<template>
    <div>
        
            <router-view :key="$route.fullPath" />
            <pagination/>
    </div>
</template>

<script>
import pagination from '@/components/pagination'
export default {
    components:{
        pagination 
    }
}
</script>