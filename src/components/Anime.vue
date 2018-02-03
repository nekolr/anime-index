<template>
  <div class="media-cover-wrapper">
    <div class="user-cover no-edit">
      <div class="cover-photo" :style="{backgroundImage: 'url(' + anime.attributes.coverImage.original + ')'}">
        <div class="dark-cover-overlay"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Anime",
    data() {
      return {
        anime: {},
        params: {
          "fields[anime]": "titles,synopsis,startDate,coverImage"
        }
      }
    },
    methods: {
      getAnime() {
        const url = 'https://kitsu.io/api/edge/anime/' + this.$route.params.id
        this.$http({
          url: url,
          method: "get",
          params: this.params,
        }).then(response => {
          this.anime = response.data.data
        }).catch(response => {
          console.log("error : ", response);
        });
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

  .user-cover,.user-cover .cover-photo {
    height: 400px;
    position: relative;
    width: 100%;
  }

  .media-cover-wrapper .cover-nav {
    margin-bottom: 15px;
  }

  .cover-nav.navbar-light {
    padding: 0;
    margin-bottom: 30px;
    background-color: #fff;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
    border-bottom: none;
  }

  .user-cover,.user-cover .cover-photo {
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

</style>
