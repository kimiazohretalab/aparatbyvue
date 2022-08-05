<template>
  <div>
    <input type="search" placeholder="search here.." v-model="inputValue" />
    <button @click="getVideoHandler">search</button>
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
