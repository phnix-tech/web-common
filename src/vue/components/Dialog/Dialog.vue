<template>
  <el-dialog
    :visible="visible"
    :width="width"
    :title="title"
    :class="classNames"
    :show-close="showClose"
    @close="handleCancel"
    :close-on-click-modal="closeOnClickModal"
    append-to-body>
    <!-- dialog body -->
    <slot/>
    <template
      v-if="withFooter"
      #footer>
      <div
        :class="$style.footer">
        <slot name="footer">
          <el-button
            type="primary"
            @click="handleConfirm">{{ confirmTxt }}</el-button>
          <el-button @click="handleCancel">{{ cancelTxt }}</el-button>
        </slot>
      </div>
    </template>
  </el-dialog>
</template>

<script>
  export default {
    name: "Dialog",
    props: {
      width: String,
      title: String,
      visible: {
        type: Boolean,
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      /**
       * class name[s]
       */
      className: {
        type: [String, Array],
        default: undefined
      },
      closeOnClickModal: {
        type: Boolean,
        default: false
      },
      /**
       * 是否显示对话框底部，默认显示
       */
      withFooter: {
        type: Boolean,
        default: true
      },
      confirmTxt: {
        type: String,
        default: "确认"
      },
      cancelTxt: {
        type: String,
        default: "取消"
      },
      "on-confirm": {
        type: Function,
        default: null
      },
      "on-close": {
        type: Function,
        default: null
      }
    },
    computed: {
      classNames () {
        const
          classes = [this.$style.container],
          className = this.className;

        if (typeof className === "string") {
          classes.push(className);
        } else if (Array.isArray(className)) {
          classes.push.apply(classes, className);
        }

        return classes.join(" ");
      }
    },
    methods: {
      handleConfirm () {
        this.$emit("on-confirm");
      },
      handleCancel () {
        this.$emit("on-close");
      }
    },

    static: {
      mixin: {
        data () {
          return {
            dialogVisible: false
          };
        },
        methods: {
          showDialog () {
            this.dialogVisible = true;
          },
          closeDialog () {
            this.dialogVisible = false;
          },
          toggleDialog () {
            this.dialogVisible = !this.dialogVisible;
          }
        }
      }
    }
  };
</script>

<style lang="scss" module src="./style.scss"/>
