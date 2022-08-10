<template>
  <div>
    <div class="container mx-auto px-10">
      <search-video :videos="videos" @video-urls="getUrls"></search-video>
      <show-video :videos="videos"></show-video>
    </div>
    <div v-show="isButton" class="flex justify-center">
      <button
        @click="prevHandler"
        class="p-2 rounded-xl bg-teal-600 text-white mx-3"
      >
        صفحه قبلی
      </button>
      <button
        @click="nextHandler"
        class="p-2 rounded-xl bg-teal-600 text-white mx-3"
      >
        صفحه بعدی
      </button>
    </div>
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
      isButton:false,
      // searchedText:'',
      skip: 1,
    };
  },

  methods: {
    getUrls(inputValue) {
      // console.log(inputValue);
      axios
        .get(
          `https://www.aparat.com/etc/api/videoBySearch/text/${inputValue}/perpage/6/curoffset/${this.skip}`
        )
        .then((res) => {
          this.videos = res.data.videobysearch;
          console.log(this.videos);
          this.isButton=true
        });
    },
    nextHandler() {
      this.skip = this.skip + 1;
      this.getUrls();
    },
    prevHandler() {
      this.skip = this.skip - 1;
      this.getUrls();
    },
  },
  watch: {},
};
</script>
