<template>
  <div>
    <div class="media-cover-wrapper">
      <div class="user-cover no-edit">
        <div class="cover-photo" :style="{backgroundImage: 'url(' + bgImg + ')'}">
          <div class="dark-cover-overlay"></div>
        </div>
      </div>
      <nav class="cover-nav navbar navbar-light">
        <div class="container">
          <div class="row">
            <div class="nav navbar-nav">
              <a href="javascript:;" class="nav-item nav-link active">简介</a>
              <a href="javascript: history.back()" class="nav-item nav-link">返回</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div class="container">
      <div class="is-sticky media-sidebar--sticky">
        <div class="media-sidebar">
          <span class="media-poster">
            <div class="lazy-image is-loaded">
              <img v-lazy="posterImage">
            </div>
          </span>
          <div class="library-state with-header">
            <div class="entry-state-status"></div>
          </div>
        </div>
      </div>
      <div class="media-container row">
        <div class="row">
          <div class="col-sm-12 no-padding-right">
            <div class="kitsu-ad is-enabled">
            </div>
          </div>
          <div class="col-sm-9">
            <section class="media--title">
              <h3>{{ anime.attributes.titles.ja_jp }}</h3>
              <h5>{{ anime.attributes.startDate.substring(0,4) }}</h5>
            </section>
            <section class="media-rating">
            </section>
            <section class="media-synopsis m-b-1">
              <p>{{ anime.attributes.synopsis }}</p>
            </section>
          </div>
          <div class="col-sm media--sidebar">
            <div class="is-sticky">
              <div>
                <div class="media-summary">
                  <div class="media--information">
                    <ul>
                      <li><strong>罗马音</strong>{{ anime.attributes.titles.en_jp }}</li>
                      <li><strong>日语</strong>{{ anime.attributes.titles.ja_jp }}</li>
                      <li><strong>类型</strong>{{ anime.attributes.showType }}</li>
                      <li><strong>状态</strong>{{ anime.attributes.status }}</li>
                      <li><strong>开始时间</strong>{{ anime.attributes.startDate }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Spin size="large" fix v-if="loading"></Spin>
  </div>
</template>

<script>
  export default {
    name: "Anime",
    data() {
      return {
        anime: {
          attributes: {
            coverImage: {
            },
            titles: {},
            startDate: '',
            status: ''
          }
        },
        loading: false,
      }
    },
    methods: {
      getAnime() {
        this.loading = true
        let url = 'https://kitsu.io/api/edge/anime/' + this.$route.params.id
        this.$http({
          url: url,
          method: "get",
        }).then(response => {
          this.anime = response.data.data
          this.loading = false
        }).catch(response => {
          console.log("error : ", response);
          this.loading = false
        });
      }
    },
    computed: {
      bgImg() {
        return (this.anime.attributes.coverImage && this.anime.attributes.coverImage.original) ?
          this.anime.attributes.coverImage.original : '/static/default.png'
      },
      posterImage() {
        return (this.anime.attributes.posterImage && this.anime.attributes.posterImage.small) ?
          this.anime.attributes.posterImage.small : '/static/error.jpg'
      }
    },
    created() {
      this.getAnime()
    }
  };

</script>

<style scoped>
  .media-cover-wrapper {
    width: 100%;
  }

  .media-cover-wrapper .cover-nav {
    margin-bottom: 15px;
  }

  .user-cover,
  .user-cover .cover-photo {
    height: 400px;
    position: relative;
    width: 100%;
  }

  .user-cover .dark-cover-overlay {
    position: absolute;
    bottom: 0;
    top: 0;
    width: 100%;
    background: rgba(76, 75, 75, 0.3);
  }

  .user-cover .cover-photo {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .media-cover-wrapper .cover-nav {
    margin-bottom: 15px;
  }

  .cover-nav.navbar-light {
    padding: 0;
    margin-bottom: 30px;
    background-color: #FFF;
    box-shadow: 0 0 1px rgba(0, 0, 0, .15);
    border-bottom: none;
  }

  .navbar {
    background: #402F3F;
    background-color: rgb(64, 47, 63);
    padding: 0;
    border-bottom: 1px solid #271c26;
    border-radius: 0;
  }

  .container,
  .navbar,
  .quick-update .flickity-viewport {
    width: 100%;
  }

  .navbar {
    border-radius: .25rem;
  }

  .navbar {
    position: relative;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  main,
  menu,
  nav,
  section,
  summary {
    display: block;
  }

  .media-cover-wrapper .cover-nav .navbar-nav {
    padding-left: 220px;
  }

  .cover-nav.navbar-light .nav-item.active,
  .cover-nav.navbar-light .nav-item:hover {
    background: #f7f7f7;
    color: #464646;
  }

  .cover-nav.navbar-light .nav-item:first-child {
    border-left: 1px solid #e5e5e5;
  }

  .cover-nav.navbar-light .nav-item {
    border-right: 1px solid #e5e5e5;
    padding: 10px 20px;
    font-size: 14px;
    color: #9f9f9f;
  }

  .navbar-light .navbar-nav .nav-link {
    color: rgba(0, 0, 0, .3);
  }

  .navbar-nav .nav-link {
    display: block;
    padding-top: .425rem;
    padding-bottom: .425rem;
  }

  .navbar-nav .nav-item {
    float: left;
  }

  .navbar a {
    color: #939393;
  }

  .nav-item,
  .navbar .logo,
  .notifications,
  .site-search,
  .site-search__icon {
    position: relative;
  }

  .nav-inline .nav-item,
  .nav-link {
    display: inline-block;
  }

  .media-sidebar--sticky {
    top: 215px;
    width: 195px;
    float: left
  }

  @media (max-width: 767px) {
    .media-sidebar--sticky {
      width: 100%;
      float: none;
      top: 0;
      margin-top: -15px;
      margin-bottom: 15px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e5e5e5
    }
  }

  @media screen and (max-height: 710px) {
    .media-sidebar--sticky {
      position: relative;
      top: 0
    }
  }

  .media-sidebar--sticky:after {
    display: block;
    visibility: hidden;
    height: 0;
    clear: both
  }

  .media-sidebar--sticky .media-sidebar {
    position: relative;
    /* top: -142px; */
    right: 15px
  }

  @media (max-width: 767px) {
    .media-sidebar--sticky .media-sidebar {
      right: 0;
      top: 0
    }

    .media-sidebar--sticky .media-sidebar img {
      display: none
    }
  }

  .media-sidebar--sticky .media-sidebar .button--primary,
  .media-sidebar--sticky .media-sidebar .notification-settings--headers .button,
  .notification-settings--headers .media-sidebar--sticky .media-sidebar .button {
    padding: 10px;
    width: 100%;
    font-size: 12px;
    margin-top: 10px
  }

  .media-sidebar--sticky .media-sidebar .button--primary:hover,
  .media-sidebar--sticky .media-sidebar .notification-settings--headers .button:hover,
  .notification-settings--headers .media-sidebar--sticky .media-sidebar .button:hover {
    box-shadow: none
  }

  .media-sidebar .media-poster img {
    width: 195px;
    height: 277px;
  }

  .lazy-image.is-loaded img {
    opacity: 1;
  }

  .media-sidebar--sticky .media-sidebar img,
  .user-cover .mini-bio--poster img {
    border-radius: 3px;
  }

  .lazy-image img {
    display: block;
    margin: 0 auto;
    object-fit: fill;
    transition: opacity .4s linear;
    opacity: 0;
  }

  img {
    max-width: 100%;
  }

  img {
    border-style: none;
    vertical-align: middle;
  }

  .no-padding-right {
    padding-right: 0;
  }

  .kitsu-ad {
    background: rgba(0, 0, 0, .03);
    border-radius: 3px;
    text-align: center;
    width: 100%;
  }

  section {
    width: 100%;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  main,
  menu,
  nav,
  section,
  summary {
    display: block;
  }

  .media--title h3 {
    display: inline;
    margin-right: 5px;
  }

  .h3,
  h3 {
    font-size: 1.75rem;
  }

  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: .5rem;
    line-height: 1.1;
    color: inherit;
  }

  .media--title h5 {
    display: inline;
    position: relative;
    color: #999;
    font-size: 17px;
  }

  .media-rating {
    margin: 5px 0;
    font-size: 14px;
    font-weight: 700;
  }

  .m-b-1,
  .m-y-1 {
    margin-bottom: 1rem !important;
  }

  .media--sidebar {
    padding-right: 0;
    max-width: 310px;
  }

  @media (max-width: 767px) {
    .media--sidebar {
      width: 100%;
      max-width: 100%;
      padding: 0 15px;
      border-left: 0
    }
  }

  @media screen and (max-height: 1200px) {
    .media--sidebar .is-sticky {
      position: relative;
      top: 0
    }
  }

  .media--sidebar ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    font-size: 12px
  }

  .media--sidebar li {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 5px
  }

  .media--sidebar li>strong {
    width: 100px
  }

  .media--sidebar h5 {
    margin-bottom: 10px
  }

  .media--sidebar a {
    color: #464646
  }

  .media--sidebar section {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eaeaea
  }

  .media-summary {
    padding: 20px;
    margin-bottom: 15px;
    background: #FFF;
    border: 1px solid #eaeaea;
    border-radius: 3px;
  }

</style>
