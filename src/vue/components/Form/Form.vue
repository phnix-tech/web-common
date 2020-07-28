<template>
  <div :class="$style.container">
    <el-form
      ref="form"
      :model="model"
      :label-position="labelPosition"
      :label-width="labelWidth">
      <el-row>
        <el-col
          v-for="item in items()"
          :key="item.prop"
          :span="item.span || 6/8">
          <template v-if="item.slot">
            <slot
              :name="item.slot"
              :item="item"/>
          </template>
          <el-form-item
            v-else
            :class="item.classes"
            :required="item.required"
            :label="item.label"
            :prop="item.prop"
            :rules="item.rules">
            <el-date-picker
              v-if="/^(daterange|date)$/.test(item.type)"
              :class="$style.dateBox +
                ' ' + ($style[item.type] || '')"
              v-model="model[item.prop]"
              :disabled="item.disabled"
              :type="item.type"
              :value-format="item.valueFormat || 'yyyy-MM-dd'"
              :format="item.format"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"/>
            <el-select
              v-else-if="item.type === 'select'"
              v-model="model[item.prop]"
              :disabled="item.disabled"
              :filterable="item.filterable"
              :remote="item.remote"
              :remote-method="item.remoteMethod"
              :loading="item.loading">
              <el-option
                v-for="option in item.options"
                :key="option | optionValue"
                :value="option | optionValue"
                :label="option | optionLabel"/>
            </el-select>
            <el-input
              v-else
              v-model="model[item.prop]"
              :disabled="item.disabled"
              @input="() => { item.input && item.input(); }"
              @blur="() => { item.blur && item.blur(); }"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "Form",
    props: {
      labelPosition: {
        type: String,
        default: "right"
      },
      labelWidth: {
        type: String,
        default: "120px"
      },
      model: Object,

      /**
       * 表单条目函数
       * 条目对象属性如下：
       * {string} prop
       * {string} label
       * {enum} type: input, daterange, select
       * 默认input
       * {boolean} required
       * {boolean} disabled
       * {object|array<object>} rules
       * {number} span, el-col span, 默认值6/8
       * {*|function} default, 字段默认值可以为函数
       * {array<{value: *, label: *}>} options, select组件options
       * option类型为object或者只包含两个元素的array
       * 第一元素为value，第二个元素为label
       * {string} slot 插槽name
       * {boolean} filterable
       * {boolean} remote
       * {boolean} loading
       * {function} remoteMethod,
       * {string|array<string>} classes form item classes
       * {string} valueFormat 日期值格式化字符串，默认`yyyy-MM-dd`
       * {string} format 日期显示格式化字符串
       * {function} blur
       * {function} input
       */
      items: Function
    },
    filters: {
      optionValue (option) {
        if (Array.isArray(option) && option.length === 2) {
          // 两个元素数组，如["N", "未过卡"]
          return option[0];
        } else if (Object.keys(option).length === 1) {
          // 只有一个key的对象{"N": "未过卡"}
          // 只能支持字符串类型的value？
          return Object.keys(option)[0];
        }
        // {value: "N", label: "未过卡"}
        return option.value;
      },
      optionLabel (option) {
        if (Array.isArray(option) && option.length === 2) {
          return option[1];
        } else if (Object.keys(option).length === 1) {
          return option[Object.keys(option)[0]];
        }
        return option.label;
      }
    },
    methods: {
      resetFields () {
        return this.$refs.form.resetFields();
      },
      clearValidate () {
        return this.$refs.form.clearValidate();
      },
      validate () {
        return this.$refs.form.validate();
      }
    },

    defaultModel (items) {
      const model = {};
      if (!Array.isArray(items)) {
        return model;
      }

      items.forEach(item => {
        let dftVal = "";
        if (item.hasOwnProperty("default")) {
          dftVal = item.default;
          if (typeof dftVal === "function") {
            dftVal = dftVal();
          }
        }
        model[item.prop] = dftVal;
      });

      return model;
    }
  };
</script>

<style lang="scss" module src="./style.scss"/>
