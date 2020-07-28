export default class Post {
  constructor(
    {
      avatar,
      username,
      level,
      content,
      images,
      datetime,
      like,
      comment,
      // backend dto
      publishTime,
      author = {},
      likeNum,
      commentNum
    } = {}
  ) {
    this._avatar = avatar || author.imageUrl;
    this._username = username || author.fullName;
    this._level = level || author.level || 0;
    this._content = content;
    this._images = images;
    this._datetime = datetime || publishTime;
    this._like = like || likeNum || 0;
    this._comment = comment || commentNum || 0;
  }

  avatar() {
    return this._avatar;
  }

  username() {
    return this._username;
  }

  level() {
    return "等级 " + this._level;
  }

  content() {
    let content = this._content || "",
      div = document.createElement("div");

    // html escape
    div.innerText = content;
    content = div.innerHTML;

    return content;
  }

  hasImages() {
    return !!this._images;
  }

  images() {
    return this._images;
  }

  datetime() {
    const date = new Date(this._datetime);
    // 2019/11/13 0:30:30
    return [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    ].join("/") + [
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ].join(":");
  }

  like() {
    return this._like;
  }

  comment() {
    return this._comment;
  }
}