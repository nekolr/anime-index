<template>
  <div class="poster-wrapper">
      <div class="ivu-card ivu-card-bordered"  @mouseover="cardMouseOver($event.currentTarget)" @mouseout="cardMouseOut($event.currentTarget)">
          <div class="grid-poster ivu-card-body">
              <div>
              <div class="lazy-image is-loaded">
                 <router-link :to='{name: "Anime", params: {id: anime.id}}'>
                  <img v-lazy="posterImage">
                 </router-link>
              </div>
              <div class="ellipsis">
                  <span class="media-title">{{ anime.attributes.titles.ja_jp }}</span>
              </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  methods: {
    cardMouseOver(ele) {
      ele.classList.add("tada");
      ele.classList.add("animated");
    },
    cardMouseOut(ele) {
      ele.classList.remove("tada");
      ele.classList.remove("animated");
    }
  },
  props: ["anime"],
  computed: {
    posterImage() {
      return (this.anime.attributes.posterImage && this.anime.attributes.posterImage.small) ?  
      this.anime.attributes.posterImage.small : '/static/error.jpg'
    }
  }
};
</script>

