function isScriptExisted (src: string) {
  let isExisted = false;
  const scripts = document.querySelectorAll("script");

  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];
    if (script.getAttribute("src") === src) {
      isExisted = true;
      break;
    }
  }

  return isExisted;
}

/**
 * 动态加载JS脚本
 * @param src
 * @returns Promise<*>
 */
function loadScript (src: string) {
  if (isScriptExisted(src)) {
    return new Promise(resolve => {
      resolve(undefined);
    });
  }

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;

  return new Promise((resolve, reject) => {
    script.onload = () => {
      resolve(undefined);
    };
    script.onerror = e => {
      reject(e);
    };
    document.body.appendChild(script);
  });
}

export default loadScript;