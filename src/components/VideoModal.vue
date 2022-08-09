<template>
  <div
    ref="videoModal"
    class="modal fixed z-10 top-0 left-0 w-full h-full overflow-auto flex justify-center items-center"
    @click="modalClicked"
  >
    <div
      class="modal-content bg-white dark:bg-rose-400 h-96 rounded flex justify-between flex-row flex-wrap relative w-4/5 p-6 border-2 dark:border-pink-900 border-amber-900"
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
      ></iframe>
      <div>
        <div>
          <p ref="profileName" class="mt-6 dark:text-slate-200 text-right">
            {{ this.profileArr.data.profile.name }}
          </p>
          <img
            alt=""
            id="profilePic"
            class="my-3 float-right"
            :src="this.profileArr.data.profile.pic_m"
          />
        </div>
        <p
          v-if="doseVideoExist"
          ref="visit"
          class="dark:text-slate-200 text-right clear-both"
        >
          number of views:{{ this.videoViews[this.index].count }}
        </p>
        <p v-else ref="visit" class="dark:text-slate-200 text-right clear-both">
          number of views:1
        </p>
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
  },
  methods: {
    closeHandler() {
      this.$refs.videoModal.classList.add("hidden");
    },
    modalClicked() {
      this.$store.dispatch("changeIsModalFalse")
      // this.$emit("modal-click");
    },
  },
  // emits: ["modal-click"],
};
</script>

<style></style>
