<template>
  <div class="post-list-wrapper">
    <div
      class="post-list-box"
      v-if="posts">
      <div
        class="post-item"
        v-for="post in posts"
        :key="post.datetime()">
        <div class="user-box">
          <div class="lft-box">
            <img
              class="avatar"
              :src="post.avatar()"
              alt="user avatar"/>
          </div>
          <div class="rgt-box">
            <div class="x-wb-bw">{{ post.username() }}</div>
            <div class="level">{{ post.level() }}</div>
          </div>
        </div>
        <div class="x-pre-content" v-html="post.content()"/>
        <div
          class="img-box"
          v-if="post.hasImages()">
          <img
            v-for="image in post.images()"
            :key="image"
            alt="topic image"
            :src="image"/>
        </div>
        <div class="bottom-box">
          <div class="bottom-item">
            {{ post.datetime() }}
            <i class="dot"/>
          </div>
          <a
            class="bottom-item">
            <i class="x-ico-like"/>
            <span>{{ post.like() }}</span>
          </a>
          <a
            class="bottom-item">
            <i class="x-ico-comment"/>
            <span>{{ post.comment() }}</span>
          </a>
        </div>
      </div>
    </div>
    <div class="x-tac">
      <a
        class="btn-more">
        查看更多内容
      </a>
    </div>
  </div>
</template>

<script>
  import fn from "gs-common/dist/fe/Functions";
  import Service from "../../../../services/topicsharing";

  export default {
    name: "PostList",
    data () {
      return {
        posts: null
      };
    },
    mounted () {
      Service.posts(fn.getURLParameter("topicId")).then(posts => {
        this.posts = posts;
      });
    }
  };
</script>

<style lang="less" scoped src="./style.less"></style>