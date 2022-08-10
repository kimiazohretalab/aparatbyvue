<template>
  <div>
    <div id="videoWrapper" class="flex flex-wrap flex-row">
      <div
        class="divStyle"
        v-for="video in videos"
        :key="video.id"
        @mouseout="offHover"
        @mouseover="onHover(video.id)"
        @click="modalShow(video)"
      >
        <img
          class="imageStyle rounded-xl"
          :src="video.big_poster"
          alt=""
          v-if="hoveredVideoId !== video.id"
        />
        <p v-if="hoveredVideoId === video.id" class="text-teal-700 text-2xl">
          {{ video.username }}
        </p>
      </div>
    </div>
    <video-modal
      v-if="$store.state.isModal"
      :video="video"
      :videos="videos"
    >
    </video-modal>
  </div>
</template>

<script>

import VideoModal from "./VideoModal.vue";

export default {
  name: "showVideo",
  components: {
    VideoModal,
  },
  data() {
    return {
      video:{},
      hoveredVideoId: "",
    };
  },
  props: {
    videos: {
      type: Array,
    },
  },
  methods: {
    onHover(videoId) {
      this.hoveredVideoId = videoId;
      console.log("hoveredVideoId", this.hoveredVideoId);
    },
    offHover() {
      this.hoveredVideoId = "";
      console.log("this.hoveredVideoId", this.hoveredVideoId);
    },
    modalShow(video) {
      this.video=video
      this.$store.dispatch("changeIsModalTrue");
  },
}
}
</script>
<style scoped>
.divStyle {
  position: relative;
  width: 350px !important;
  height: 250px;
  margin: 20px;
}
.imageStyle {
  z-index: 1;
  width: 350px;
  height: 250px;
}
p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  z-index: 0;
}
.zIndex {
  z-index: 2 !important;
}
</style>
