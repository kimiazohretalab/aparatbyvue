<template>
  <div>
    <div class="w-full flex justify-center mt-1">
      <input
        type="search"
        placeholder="جست و جو کنید.."
        v-model="inputValue"
        class="bg-yellow-200 text-orange-900 p-2 rounded-xl focus:ring-2 focus:outline-none focus:ring-amber-500 w-6/12"
      />
      <button
        @click="getVideoHandler"
        class="p-2 rounded-xl bg-teal-600 text-white"
      >
        جست و جو
      </button>
    </div>
    <div>
      <router-link to="/" class="p-2 rounded-xl bg-teal-600 text-white">
        خانه
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "getVideo",
  props: {
    videos: {
      type: Array,
      default() {
        [];
      },
    },
    // value: {
    //   type: String,
    //   default: "",
    // },
  },
  data() {
    return {
      inputValue: "",
    };
  },
  // watch:{
  //   inputValue(){
  //     this.$emit("video-urls", this.inputValue)
  //   }
  // },
  // computed: {
  //   inputValue: {
  //     get() {
  //       return this.value;
  //     },
  //     set(value) {
  //       this.$emit("input", value);
  //     },
  //   },
  // },
  emits: ["video-urls"],
  methods: {
    getVideoHandler() {
      this.$emit("video-urls", this.inputValue);
    },
    // sendData(){
    //   this.$emit("video-urls", this.inputValue)
    // }
  },
};
</script>
