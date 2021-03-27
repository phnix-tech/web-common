/**
 *
 * @param url - file url
 * @param fileName - file name
 * @param method - request method
 * @param params - request params
 * @param headers - request headers
 * @returns Promise<*>
 */
declare function downloadFile({ url, fileName, method, params, headers }: {
    url: string;
    fileName?: string;
    method?: "GET" | "POST" | "PUT" | "get" | "post" | "put";
    params?: unknown;
    headers?: Record<string, string>;
}): Promise<unknown>;
export default downloadFile;
