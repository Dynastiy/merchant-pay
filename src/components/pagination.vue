<template>
    <div>
        <div class="pagination__page">
       
                <router-link to="/" class="mr-3 text-dark" v-if="pages.current_page === pages.last_page "> First</router-link>
            
                <router-link class="text-dark" v-if="pages.current_page === pages.last_page " :to="{path:'/',query:{page:pages.current_page-1}}"> <i class="fa fa-angle-left" aria-hidden="true"></i><i class="fa fa-angle-left" aria-hidden="true"></i> </router-link>
            
             <ul class="list-unstyled pagination mt-3">
                <li>
                    <router-link v-for="i in pages.last_page" :key="i" :to="{path:'/', query:{page: i }}"> {{ i }} </router-link>
                </li>
             </ul>
                <router-link class="text-dark" :to="{path:'/',query:{page: pages.current_page+1}}" v-if="pages.current_page !== pages.last_page "> <i class="fa fa-angle-right" aria-hidden="true"></i><i class="fa fa-angle-right" aria-hidden="true"></i> </router-link>
            
                <router-link class="ml-3 text-dark" :to="{path:'/',query:{page:pages.last_page}}"  v-if="pages.current_page !== pages.last_page "> Last </router-link>
        
    </div>
    </div>
</template>

<script>
import helpers from '@/helpers/index.js'
export default {
    data(){
        return{
            pages: {},
            page: this.$route.query.page,
        }
    },
    methods:{
    async getPages(){
      
        // const res = await axios.get(`${this.baseUrl}admin/get-users`, { params: { status: page } });
        // console.log(res.data);
      let res = await helpers.getKyc(this.page);
      console.log(res.kycs);
      this.pages = res.kycs

    }
  },
  async created(){
    this.getPages();
  }
    
}
</script>