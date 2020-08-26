function isStyleSheetExisted (href) {
  let isExisted = false;
  const styleSheets = document.querySelectorAll("link");

  for (let i = 0; i < styleSheets.length; i++) {
    const styleSheet = styleSheets[i];
    if (styleSheet.getAttribute("href") === href) {
      isExisted = true;
      break;
    }
  }

  return isExisted;
}

/**
 * 动态加载样式文件
 * @param {string} href
 */
function addStyleSheet (href) {
  if (isStyleSheetExisted(href)) {
    return;
  }

  const link = document.createElement("link");
  const head = document.querySelector("head");
  const styleSheets = head.querySelectorAll("link");

  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = href;

  let nextSibling;
  if (
    styleSheets.length <= 0 ||
    !(nextSibling = styleSheets[styleSheets.length - 1].nextSibling)
  ) {
    head.appendChild(link);
    return;
  }

  // append after last link stylesheet
  head.insertBefore(link, nextSibling);
}

export default addStyleSheet;