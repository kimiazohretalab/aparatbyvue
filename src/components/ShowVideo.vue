<template>
  <div>
    <div id="videoWrapper" class="flex flex-wrap flex-row">
      <div
        class="divStyle"
        v-for="video in videos"
        :key="video.id"
        @mouseout="offHover"
        @click="modalShow(video)"
      >
        <img
          class="imageStyle rounded-xl"
          :src="video.big_poster"
          alt=""
          @mouseover="onHover(video.id)"
          v-if="hoveredVideoId !== video.id"
        />
        <p v-if="hoveredVideoId === video.id" class="text-teal-700 text-2xl">
          {{ video.username }}
        </p>
      </div>
    </div>
    <video-modal
      v-show="$store.state.isModal"
      :profileArr="profileArr"
      :url="url"
      :videos="videos"
      :videoViews="videoViews"
      :index="index"
      :doseVideoExist="doseVideoExist"
      :similarVideos="similarVideos"
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
      similarVideos:[],
      tag:'',
      hoveredVideoId: "",
      // isModal: false,
      profileArr: {},
      url: "",
      videoViews: [],
      index: 0,
      doseVideoExist: "",
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
      this.url = p.frame;
      this.uid= p.uid
      // this.isModal = true;
      this.$store.dispatch("changeIsModalTrue");
      axios
        .get(`https://www.aparat.com/etc/api/profile/username/${p.username}`)
        .then((res) => {
          this.profileArr = res;
        });
       axios
        .get(`https://www.aparat.com/etc/api/video/videohash/${p.uid}`)
        .then((res) => {
          this.tag = res.data.video.tags[0].name;
        });
       axios
        .get(`https://www.aparat.com/etc/api/videobytag/text/${this.tag}`)
        .then((res) => {
          this.similarVideos = res.data.videobytag;
          console.log(this.similarVideos);
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
    // changeIsModal() {
    //   this.isModal = false;
    // },
  },
};
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
