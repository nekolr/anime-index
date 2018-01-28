<template>
  <div class="container global-container">
    <div class="row">
      <div class="media-browse col-sm-12">
        <div class="media-grid container">
          <div class="row">
            <div class="filter-options">
              <div class="filter-wrapper">
                <side-bar></side-bar>
              </div>
            </div>
            <div class="media-posters">
              <div class="row">
                <div class="media-posters-list">
                  <Card v-for='item of animes' :key="item.id" :anime="item"></Card>
                </div>
              </div>
            </div>
          </div>
          <Spin size="large" fix v-if="loading"></Spin>
        </div>
      </div>
    </div>
  <BackTop></BackTop>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import Card from "@/components/Card";

const url = "https://kitsu.io/api/edge/anime";
export default {
  name: "App",
  data() {
    return {
      animes: [],
      loading: false,
      params: {
        "page[offset]": 0,
        "page[limit]": 20,
        "sort": "-userCount"
      },
      globalLoading: false
    };
  },
  components: {
    SideBar,
    Card
  },
  methods: {
    scorll() {
      const sumH = document.body.scrollHeight || document.documentElement.scrollHeight;
      const viewH = document.documentElement.clientHeight;
      const scrollH = document.body.scrollTop || document.documentElement.scrollTop;
      if (viewH + scrollH + 300 >= sumH) {
        if(!this.globalLoading) {
          this.params['page[offset]'] += 20
          this.getAnimes(this.params);
        }
      }
    },
    initialized() {
      this.loading = true
      this.$http({
        url: url,
        method: "get",
        params: this.params,
      }).then(response => {
          this.animes = this.animes.concat(response.data.data);
          this.loading = false
      }).catch(response => {
        console.log("error : ", response);
        this.loading = false
      });
    },
    getAnimes(params, flag) {
      this.params = params
      // 全局设置正在加载数据，防止滚动后多次加载
      this.globalLoading = true
      this.$http({
        url: url,
        method: "get",
        params: this.params,
      }).then(response => {
        this.globalLoading = false
        if(!flag) {
          this.animes = this.animes.concat(response.data.data);
        } else {
          scrollTo(0,0)
          this.animes = response.data.data
        }
      }).catch(response => {
        this.globalLoading = false
        console.log("error : ", response);
      });
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scorll);
  },
  created() {
    this.initialized();
  }
};
</script>