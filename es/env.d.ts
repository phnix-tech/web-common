declare type EnvValue = string | undefined;
interface Env {
    /**
     * 注意：如果前后端都依赖PUBLIC_PATH，请用VUE_APP/REACT_APP形式环境变量
     * 因为vue cli、create react app只会传递特定前缀的环境变量到前端
     * process.env.PUBLIC_PATH环境变量只用于后端，如果前端使用PUBLIC_PATH获取不到环境变量设置的值
     * webpack public path，可用于配置CDN发布地址
     */
    PUBLIC_PATH: EnvValue;
    /**
     * http request baseURL
     */
    BASE_URL: EnvValue;
    getValue(key: string): EnvValue;
    setValue(key: string, val: EnvValue): void;
}
declare const _env: Env;
export default _env;
