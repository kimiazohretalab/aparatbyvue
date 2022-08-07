<template>
  <div>
    <div
      class="show mx-auto h-screen flex flex-wrap flex-row justify-around items-center"
    >
      <div id="videoWrapper">
        <div
          class="divStyle"
          v-for="video in videos"
          :key="video.id"
          @mouseout="offHover"
          @click="modalShow(video)"
        >
          <img
            class="imageStyle"
            :src="video.big_poster"
            alt=""
            @mouseover="onHover(video.id)"
            v-if="hoveredVideoId !== video.id"
          />
          <p v-if="hoveredVideoId === video.id">{{ video.username }}</p>
        </div>
      </div>
    </div>
    <video-modal
      v-show="isModal"
      :isModal="isModal"
      :clickedVideoId="clickedVideoId"
      :profileArr="profileArr"
      :url="url"
      @modal-click="changeIsModal"
      :videos="videos"
    ></video-modal>
  </div>
</template>

<script>
import axios from "axios";
import VideoModal from "./VideoModal.vue";
export default {
  name: "showVideo",
  components: {
    VideoModal,
  },
  data() {
    return {
      hoveredVideoId: "",
      isModal: false,
      clickedVideoId: "",
      profileArr: {},
      url: "",
      videoViews: [],
      index: "",
      doseVideoExist: false,
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
    modalShow(p) {
      this.clickedVideoId = p.id;
      this.url = p.frame;
      this.isModal = true;
      axios
        .get(`https://www.aparat.com/etc/api/profile/username/${p.username}`)
        .then((res) => {
          console.log(res);
          this.profileArr = res;
        });
      this.videoViews = localStorage.getItem("count")
        ? JSON.parse(localStorage.getItem("count"))
        : [];
      this.index = this.videoViews.findIndex(
        (videoIndex) => videoIndex.id === p.id
      );
      this.doseVideoExist = this.videoViews.some((view) => view.id === p.id);
      if (this.doseVideoExist == false) {
        this.videoViews.push({ id: p.id, count: 1 });
      } else {
        this.videoViews[this.index].count =
          this.videoViews[this.index].count + 1;
      }
      localStorage.setItem("count", JSON.stringify(this.videoViews));
    },
    changeIsModal() {
      this.isModal = false;
    },
  },
};
</script>
<style scoped>
.divStyle {
  position: relative;
  width: 400px;
  height: 300px;
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
  color: black;
  background: white;
  font-size: 2rem;
  z-index: 0;
}
.zIndex {
  z-index: 2 !important;
}
</style>
