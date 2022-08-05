<template>
  <div class="container mx-auto px-10">
    <search-video :videos="videos" @video-urls="getUrls"></search-video>
    <show-video :videos="videos"></show-video>
  </div>
</template>
<script>
import axios from "axios";
import SearchVideo from "./SearchVideo.vue";
import ShowVideo from "./ShowVideo.vue";

export default {
  components: {
    SearchVideo,
    ShowVideo,
  },
  data() {
    return {
      videos: [],
      // searchedText:'',
    };
  },

  methods: {
    getUrls(inputValue) {
      // console.log(inputValue);
      axios
        .get(
          `https://www.aparat.com/etc/api/videoBySearch/text/${inputValue}/perpage/6/`
        )
        .then((res) => {
          this.videos = res.data.videobysearch;
          console.log(this.videos);
        });
    },
  },
};
</script>
