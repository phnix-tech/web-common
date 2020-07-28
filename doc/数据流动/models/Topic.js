export default class Topic {
  constructor(
    {
      name,
      hot,
      desc,
      img,
      // backend dto
      topicName,
      hotValue,
      description,
      imageUrl
    } = {}) {
    this._name = name || topicName;
    this._hot = hot || hotValue;
    this._desc = desc || description;
    this._img = img || imageUrl;
  }

  name() {
    return this._name;
  }

  hot() {
    return this._hot;
  }

  desc() {
    return this._desc;
  }

  img(isMobile) {
    return "https://gcatest.garmin.com.tw/images/" + (isMobile ? "" : "frame/") + this._img;
  }
}