/**
 * 过滤空（字符串）值， empty string, undefined, null
 * 主要用于处理后端没有把空字符串当做查询全部结果的情况
 */
declare function delemptyval(obj?: Record<string, unknown>): Record<string, unknown>;
export default delemptyval;
