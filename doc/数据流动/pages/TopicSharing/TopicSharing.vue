<template>
  <div :class="$style.container">
    <Info/>
    <PostList/>
  </div>
</template>

<script>
  import Info from "./components/Info";
  import PostList from "./components/PostList";

  export default {
    name: "TopicSharing",
    comments: {
      Info,
      PostList
    }
  };
</script>

<style lang="less" module src="./style.less"></style>