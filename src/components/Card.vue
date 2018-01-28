<template>
  <div class="poster-wrapper">
    <Tooltip placement="left-start">
        <div class="ivu-card ivu-card-bordered"  @mouseover="cardMouseOver($event.currentTarget)" @mouseout="cardMouseOut($event.currentTarget)">
            <div class="grid-poster ivu-card-body">
                <div>
                <div class="lazy-image is-loaded">
                    <img v-lazy="anime.attributes.posterImage ? anime.attributes.posterImage.small : '/static/error.jpg' ">
                </div>
                <div class="ellipsis">
                    <span class="media-title">{{ anime.attributes.titles.ja_jp }}</span>
                </div>
                </div>
            </div>
        </div>
        <div slot="content">
            <p>显示多行信息</p>
            <p><i>可以自定义样式</i></p>
        </div>
    </Tooltip>
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
  props: ["anime"]
};
</script>

