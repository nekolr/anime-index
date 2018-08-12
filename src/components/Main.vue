<template>
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
</template>

<script>
import SideBar from "@/components/SideBar";
import Card from "@/components/Card";

const url = "https://kitsu.io/api/edge/anime";
export default {
  name: "Main",
  data() {
    return {
      animes: [],
      loading: false,
      params: {
        "page[offset]": 0,
        "page[limit]": 20,
        "sort": "-userCount",
        "fields[anime]": "titles,posterImage"
      },
      globalLoading: false
    };
  },
  components: {
    SideBar,
    Card
  },
  methods: {
    scroll() {
      const sumH = document.body.scrollHeight || document.documentElement.scrollHeight;
      const viewH = document.documentElement.clientHeight;
      const scrollH = document.body.scrollTop || document.documentElement.scrollTop;
      if (viewH + scrollH + 100 >= sumH) {
        if(!this.globalLoading) {
          let _context = this
          // scorll 会导致窗口抖动，使用 setTimeout 防抖
          // details: <https://www.cnblogs.com/coco1s/p/5499469.html>
          setTimeout(function() {
            _context.params['page[offset]'] += 20
            _context.getAnimes(_context.params)
          }, 200)
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
          this.animes = response.data.data;
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
        if(!flag) {
          this.animes.push.apply(this.animes, response.data.data)
        } else {
          scrollTo(0,0)
          this.animes = response.data.data
        }
        this.globalLoading = false
      }).catch(response => {
        this.globalLoading = false
        console.log("error : ", response);
      });
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scroll);
  },
  created() {
    this.initialized();
  }
};
</script>

