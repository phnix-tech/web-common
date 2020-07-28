<template>
  <div class="info-box" v-if="topic">
    <div class="x-pr inner">
      <div class="cover-box">
        <img
          alt="cover image"
          :src="topic.img(isMobile())">
      </div>
      <div class="bg-mask"/>
      <div class="rgt-box">
        <div class="name x-wb-bw x-tac">{{ topic.name() }}</div>
        <div class="hot x-tac">
          <span class="num">{{ topic.hot() }}</span>热度
        </div>
        <div
          class="desc x-pre-content x-pr"
          id="js-txt-topic-desc">{{ topic.desc() }}<div
            class="btn-expand"
            :class="expandCls"
            v-show="showBtnExpand"><a
              href="javascript:void(0)"
              @click="expand">{{ expandTxt }}</a></div></div>
        <div class="x-tac">
          <a
            @click="joinTopic"
            class="btn-join">
            加入讨论
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import fn from "gs-common/dist/fe/Functions";
  import Service from "../../../../services/topicsharing";

  export default {
    name: "Info",
    beforeCreate () {
      this._hasHandleDescOverflow = false;
      this._descScrollHeight = 0;
    },
    data () {
      return {
        topic: null,
        showBtnExpand: false,
        expandCls: "",
        expandTxt: "...展开"
      };
    },
    mounted () {
      Service.topic(fn.getURLParameter("topicId")).then(topic => {
        this.topic = topic;
        document.title = this.topic.name();
      });
    },
    updated () {
      if (!this._hasHandleDescOverflow) {
        const destEl = document.getElementById("js-txt-topic-desc");
        this._descScrollHeight = destEl.scrollHeight;
        let maxHeight = 36;
        if (fn.browser.isMobile()) {
          // 10vw
          maxHeight = window.innerWidth * 10 / 100;
        }
        if (this._descScrollHeight > maxHeight) {
          this.showBtnExpand = true;
        }
        this._hasHandleDescOverflow = true;
      }
    },
    methods: {
      expand () {
        const
          destEl = document.getElementById("js-txt-topic-desc"),
          height = destEl.style.height;

        if (height) {
          destEl.style.height = "";
          destEl.style.overflow = "";
          destEl.style.maxHeight = "";
          this.expandTxt = "...展开";
          this.expandCls = "";
        } else {
          destEl.style.height = `${this._descScrollHeight}px`;
          destEl.style.overflow = "visible";
          destEl.style.maxHeight = "none";
          this.expandTxt = " 收起";
          this.expandCls = "expanded";
        }
      },
      isMobile () {
        return fn.browser.isMobile();
      },
      joinTopic () {
        // disable eslint
      }
    }
  };
</script>

<style lang="less" scoped src="./style.less"></style>