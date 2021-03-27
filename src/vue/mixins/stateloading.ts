import {mapState} from "vuex";

/**
 * 基于store状态管理的loading计算属性
 * 注：store state需要mixin `loading`中的data数据
 */
export default {
  computed: mapState([
    "loading",
    "loadingText"
  ])
};