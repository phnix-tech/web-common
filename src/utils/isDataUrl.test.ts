import isDataUrl from "./isDataUrl";

describe("utils.isDataUrl", () => {
  const dataURLs = [
    // error  This line has a length of 197.
    // eslint-disable-next-line max-len
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC",
    // error  This line has a length of 209.
    // eslint-disable-next-line max-len
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAAFVBMVEXk5OTn5+ft7e319fX29vb5+fn///++GUmVAAAALUlEQVQIHWNICnYLZnALTgpmMGYIFWYIZTA2ZFAzTTFlSDFVMwVyQhmAwsYMAKDaBy0axX/iAAAAAElFTkSuQmCC",
    // error  This line has a length of 215.
    // eslint-disable-next-line max-len
    "   data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAAFVBMVEXk5OTn5+ft7e319fX29vb5+fn///++GUmVAAAALUlEQVQIHWNICnYLZnALTgpmMGYIFWYIZTA2ZFAzTTFlSDFVMwVyQhmAwsYMAKDaBy0axX/iAAAAAElFTkSuQmCC   ",
    " data:,Hello%2C%20World!",
    " data:,Hello World!",
    " data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D",
    " data:text/html,%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E",
    "data:,A%20brief%20note",
    "data:text/html;charset=US-ASCII,%3Ch1%3EHello!%3C%2Fh1%3E"
  ];

  const notDataURLs = [
    "dataxbase64",
    "data:HelloWorld",
    "data:text/html;charset=,%3Ch1%3EHello!%3C%2Fh1%3E",
    "data:text/html;charset,%3Ch1%3EHello!%3C%2Fh1%3E",
    // error  This line has a length of 241.
    // eslint-disable-next-line max-len
    "data:base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC",
    "",
    "http://wikipedia.org",
    "base64",
    // error  This line has a length of 176.
    // eslint-disable-next-line max-len
    "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC"
  ];

  dataURLs.forEach(url => {
    test(`${url}满足dataURL协议格式`, () => {
      expect(isDataUrl(url)).toBe(true);
    });
  });

  notDataURLs.forEach(url => {
    test(`${url}不满足dataURL协议格式`, () => {
      expect(isDataUrl(url)).toBe(false);
    });
  });
});