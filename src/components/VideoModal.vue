<template>
  <div
    ref="videoModal"
    class="modal bg-gray-900 bg-opacity-60 fixed z-10 top-0 left-0 w-full h-full overflow-auto flex justify-center items-center "
    @click="modalClicked"
  >
    <div
      class="modal-content bg-white dark:bg-rose-400 h-96 rounded flex
      flex-wrap justify-between flex-row relative w-11/12	h-4/5	 p-6 border-2 border-slate-700"
    >
      <span
        class="close dark:text-slate-200 hover:text-black no-underline cursor-pointer focus:text-black no-underline cursor-pointer absolute top-0 right-2.5 text-xl font-bold"
        ref="close"
        @click="closeHandler"
        >&times;</span
      >
      <iframe
        :src="this.url"
        ref="modalIframe"
        frameborder="10"
        allow="autoplay"
        class="w-2/4"
      ></iframe>
      <div>
        <p
          ref="profileName"
          class="mt-6 dark:text-slate-200 text-right text-amber-600"
        >
          UserName: "{{ this.profileArr.data.profile.name }}"
        </p>
        <p
          v-if="doseVideoExist"
          ref="visit"
          class="dark:text-slate-200 text-right clear-both text-amber-600"
        >
          number of views:{{ this.videoViews[this.index].count }}
        </p>
        <p
          v-else
          ref="visit"
          class="dark:text-slate-200 text-right clear-both text-amber-600"
        >
          number of views:1
        </p>
      </div>
      <div>
        <img
          alt=""
          id="profilePic"
          class="my-3 float-right rounded-full"
          :src="this.profileArr.data.profile.pic_m"
        />
      </div>
      <div v-for="similarVideo in similarVideos.slice(0, 3)" 
      :key="similarVideo.id"
      class="mt-14">
        <iframe :src="similarVideo.frame" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "videoModal",
  data() {
    return {};
  },
  props: {
    clickedVideoId: {
      type: String,
    },
    videos: {
      type: Array,
    },
    profileArr: {
      type: Object,
    },
    url: {
      type: String,
    },
    index: {
      type: Number,
    },
    videoViews: {
      type: Array,
    },
    doseVideoExist: {
      type: Boolean,
    },
    similarVideos: {
      type: Array,
    },
  },
  methods: {
    closeHandler() {
      this.$refs.videoModal.classList.add("hidden");
    },
    modalClicked() {
      this.$store.dispatch("changeIsModalFalse");
      // this.$emit("modal-click");
    },
  },
  // emits: ["modal-click"],
};
</script>

<style></style>
