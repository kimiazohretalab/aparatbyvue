<template>
  <div class="show mx-auto h-screen flex flex-wrap flex-row justify-around items-center">
    <div id="videoWrapper">
      <div
        class="divStyle"
        v-for="video in videos"
        :key="video.id"
        @mouseout="offHover(video.id)"
        @mouseover="onHover(video.id)"
      >
        <img class="iframeStyle" :src="video.big_poster" alt="" />
        <p v-text="video.username"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "showVideo",
  data() {
    return {
      isHovered: false,
      info: "",
    };
  },
  props: {
    videos: {
      type: Array,
    },
  },
  methods: {
    onHover(p) {
      this.info = "";
      this.isHovered = true;
      this.info = this.videos.findIndex((video) => {
        return video.id == p;
      });
      document.getElementsByTagName("p")[this.info].setAttribute("class", "zIndex");
      document.getElementsByTagName("img")[this.info].setAttribute("class", "hidden");
    },
    offHover(a) {
      this.info = "";
      this.isHovered = false;
      this.info = this.videos.findIndex((video) => {
        return video.id == a;
      });
      document.getElementsByTagName("p")[this.info].removeAttribute("class", "zIndex");
      document.getElementsByTagName("img")[this.info].removeAttribute("class", "hidden");
    },
  },
};
</script>
<style scoped>
.divStyle {
  position: relative;
  width: 350px;
  height: 250px;
  margin: 20px;
}
.iframeStyle {
  z-index: 1;
  width: 350px;
  height: 250px;

}
p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  z-index: -1;
}
.zIndex {
  z-index: 2 !important;
}
</style>
