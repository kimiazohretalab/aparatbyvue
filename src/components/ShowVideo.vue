<template>
  <div class="show mx-auto h-screen flex flex-wrap justify-around items-center">
    <div id="videoWrapper">
      <div
        class="divStyle"
        v-for="video in videos"
        :key="video.id"
        @mouseout="offHover = false"
        @mouseover="onHover(video.id)"
        :class="{ bg: isHovered }"
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
      document.getElementsByTagName("p")[this.info].setAttribute("class", "kimia");
      document.getElementsByTagName("img")[this.info].setAttribute("class", "hidden");
    },
    offHover() {
      document.getElementsByTagName("p")[this.info].removeAttribute("class", "kimia");
      document.getElementsByTagName("img")[this.info].removeAttribute("class", "hidden");
    },
  },
};
</script>
<style>
.divStyle {
  position: relative;
  width: 300px;
  height: 200px;
  margin: 20px;
}
.iframeStyle {
  width: 300px;
  height: 200px;
  z-index: 1;
}
p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  z-index: -1;
}
.kimia {
  z-index: 2 !important;
}
.bg {
  background-color: black;
}
</style>
