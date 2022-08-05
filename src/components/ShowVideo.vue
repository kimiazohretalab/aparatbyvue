<template>
  <div class="show mx-auto h-screen flex flex-wrap justify-around items-center">
    <div id="videoWrapper">
      <div
        class="divStyle"
        v-for="video in videos"
        :key="video.id"
        @mouseout="isHovered = false"
      >
        <img
          class="iframeStyle"
          :src="video.big_poster"
          alt=""
          :class="{ iframevideoStyle: isHovered }"
          @mouseover="isHovered = true"
        />
        <p v-show="videoHoverHandler(video.id)"  :class="{ hidden: !isHovered }">
          {{ video.username }}
        </p>
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
    };
  },
  props: {
    videos: {
      type: Array,
    },
  },
  methods:{
    videoHoverHandler(k){
      return k
    }
  }
};
</script>
<style>
.divStyle {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: blue;
  width: 300px;
  height: 200px;
  margin: 20px;
}
.iframeStyle {
  width: 300px;
  height: 200px;
}
.iframevideoStyle:hover {
  display: none;
}
</style>
