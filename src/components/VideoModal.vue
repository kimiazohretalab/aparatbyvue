<template>
  <div
    ref="videoModal"
    class="modal bg-gray-900 bg-opacity-60 fixed z-10 top-0 left-0 w-full h-full flex justify-center items-center"
    @click="modalClicked"
  >
    <div
      v-if="this.doseVideoExist"
      class="modal-content  overflow-y-scroll bg-white rounded-2xl h-full  w-11/12 sm:h-full md:h-4/5 p-6 border-2 border-slate-700"
    >
      <span
        class="close dark:text-slate-200 hover:text-black focus:text-black no-underline cursor-pointer absolute top-0 right-2.5 text-xl font-bold"
        ref="close"
        @click="closeHandler"
        >&times;</span
      >
      <div class="flex justify-center items-center h-full" v-if="isLoading">
        <loading />
      </div>
      <div
        class="flex flex-wrap md:justify-between justify-center sm:justify-center flex-col sm:flex-col md:flex-row relative 	"
        v-else
      >
        <iframe
          :src="this.url"
          ref="modalIframe"
          frameborder="10"
          allow="autoplay"
          class="md:w-2/4 w-max self-center	"
        ></iframe>
        <div class="w-max	self-center	">
          <p
            v-if="this.doesProfileExist"
            ref="profileName"
            class="mt-6 dark:text-slate-200 text-right text-amber-600"
          >
            نام کاربری: "{{ this.profileArr.data.profile.name }}"
          </p>
          <p
            ref="visit"
            class="dark:text-slate-200 text-right clear-both text-amber-600"
          >
            تعداد بازدید ها:{{ this.videoViews[this.index].count }}
          </p>
        </div>
        <div class="w-max self-center	">
          <img
            v-if="this.doesProfileExist"
            alt=""
            id="profilePic"
            class="my-3 float-right rounded-full"
            :src="this.profileArr.data.profile.pic_m"
          />
        </div>
        <br />
        <div
          v-for="similarVideo in similarVideos.slice(0, 3)"
          :key="similarVideo.id"
          class="mt-14 w-max	self-center	"
        >
          <iframe
            :src="similarVideo.frame"
            frameborder="0"
            style="width: 350px"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "./LoadingSpinner.vue";
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "videoModal",
  components: {
    Loading,
  },
  data() {
    return {
      url: "",
      videoViews: [],
      index: 0,
      doseVideoExist: false,
      similarVideos: [],
      tag: "",
      profileArr: [],
      doesProfileExist: false,
    };
  },
  props: {
    clickedVideoId: {
      type: String,
    },
    videos: {
      type: Array,
    },
    video: {
      type: Object,
    },
  },
  methods: {
    closeHandler() {
      this.$store.dispatch("changeIsModalFalse");
    },
    modalClicked() {
      this.$store.dispatch("changeIsModalFalse");
    },
  },
  computed: {
    ...mapGetters({ isLoading: "getIsLoading" }),
  },
  created() {
    this.url = this.video.frame;
    this.uid = this.video.uid;
    this.$store.dispatch("LoadingAction", true);
    this.$store.dispatch("changeIsModalTrue");
    axios
      .get(
        `https://www.aparat.com/etc/api/profile/username/${this.video.username}`
      )
      .then((res) => {
        this.profileArr = res;
        this.doesProfileExist = true;
      });
    axios
      .get(`https://www.aparat.com/etc/api/video/videohash/${this.video.uid}`)
      .then((res) => {
        console.log(res);
        if (res) {
          this.tag = res.data.video.tags[0].name;
        }
      });
    axios
      .get(`https://www.aparat.com/etc/api/videobytag/text/${this.tag}`)
      .then((res) => {
        this.similarVideos = res.data.videobytag;
        this.$store.dispatch("LoadingAction", false);
      });
    this.videoViews = localStorage.getItem("count")
      ? JSON.parse(localStorage.getItem("count"))
      : [];
    this.index = this.videoViews.findIndex(
      (videoIndex) => videoIndex.id === this.video.id
    );
    this.doseVideoExist = this.videoViews.some(
      (view) => view.id === this.video.id
    );
    if (this.doseVideoExist == false) {
      this.videoViews.push({ id: this.video.id, count: 1 });
    } else {
      this.videoViews[this.index].count = this.videoViews[this.index].count + 1;
    }
    localStorage.setItem("count", JSON.stringify(this.videoViews));
  },
};
</script>

<style></style>
