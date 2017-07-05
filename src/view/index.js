import { mapState } from 'vuex'
import MainHeader from '@/components/mainHeader/index.vue'
import MainFooter from '@/components/mainFooter/index.vue'
import RecursionMenuItem from '@/components/recursionMenuItem/index.vue'
import ComponentsBreadcrumb from '@/components/breadcrumb/index.vue'
export default {
  components: {
    MainHeader,
    MainFooter,
    RecursionMenuItem,
    ComponentsBreadcrumb
  },
  computed: {
    ...mapState(['menu'])
  },
  data () {
    return {
    }
  },
  created () {
    
  },
  methods: {
    onSelect (e) {
      if (e.path) {
        this.$router.push({
          path: e.path
        })
      }
    }
  }
}