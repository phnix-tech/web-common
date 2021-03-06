/**
 * 过滤空（字符串）值， empty string, undefined, null
 * 主要用于处理后端没有把空字符串当做查询全部结果的情况
 */
function delemptyval (obj?: Record<string, unknown>) {
  if (!obj) {
    return {};
  }

  Object.keys(obj).forEach(key => {
    const val = obj[key];
    if (
      val === "" ||
      val === undefined ||
      val === null
    ) {
      delete obj[key];
    }
  });

  return obj;
}

export default delemptyval;