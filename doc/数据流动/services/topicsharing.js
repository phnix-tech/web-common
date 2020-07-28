import Topic from "../models/Topic";
import Post from "../models/Post";

export default {
  /**
   * @param {number|string} topicId
   * @return {Promise}
   */
  topic (topicId) {
    if (topicId) {
      // 访问后端接口
      // return axios.get(`${AppContext.contextPath().social}/topic/${topicId}?_=${Date.now()}`)
      //   .then(resp => new Topic(resp.data));
    }

    return Promise.resolve(new Topic({
      name: "想健身先从[跑步]开始，掌握跑步关键点",
      hot: "124287",
      desc: "基础期对于马拉松选手来说尤为重要。它是基础期对于马拉松选手来说尤为重要。它是为了dasdsad打造稳健的有氧基础，强化身体组，的心率配置还是没有掌基础期对于马拉松选手来说尤为重要。它是为了dasdsad打造稳健的有氧基础，强化身体组，的心率配置还是没有掌为了dasdsad打造稳健的有氧基础，强化身体组，的心率配置还是没有掌",
      img: "ARTICLE53219780764160--b8feaf02-5b80-43cf-a94b-4e4e58a6bdaf.jpg"
    }));
  },

  posts (topicId) {
    if (topicId) {
      // return axios.get(`${AppContext.contextPath().social}/topic/${topicId}/post?_=${Date.now()}`)
      //   .then(resp => resp.data.map(post => new Post(post)));
    }

    return Promise.resolve([
      new Post({
        avatar: "https://gcatest.garmin.com.tw/images/profile/12--cc739d17-cca4-4bef-9061-5745159ef96b.jpg",
        username: "Maggie Padilla",
        level: 12,
        content: "这&周>的自主训练做完了，但是对于里面的心率配置还是没有掌握好，想问问大家有特别推荐的方式吗",
        images: [
          "https://gcatest.garmin.com.tw/images/frame/ARTICLE118--da898be5-db42-44ea-9e17-b73b08466a03.jpg",
          "https://gcatest.garmin.com.tw/images/frame/ARTICLE60719105274368--78f114be-d78f-40c8-837a-63abb34797b8.jpg",
          "https://gcatest.garmin.com.tw/images/frame/ARTICLE102--79fa5577-feba-4fec-a060-a44231bd12f5.jpg",
          "https://gcatest.garmin.com.tw/images/frame/CMP155--16c9dee7-d683-45da-baf4-1af2964c6515.jpg",
          "https://gcatest.garmin.com.tw/images/frame/CPT154--63e28b74-1b6b-45ea-b649-af4239741468.jpg"
        ],
        datetime: Date.now() - 1000 * 60 * 2,
        like: 30,
        comment: 8,
        card: {
          type: "ACTIVITY",
          id: 94213750,
          title: "上午跑步",
          imageUrl: "WORKOUT60825381--f7d88a69-591b-42d1-b356-519994f819bd.jpg",
          activityType: "RUNNING",
          userId: 12,
          startTime: 1561335781000,
          distance: 31831,
          duration: 93313,
          speed: 3.411
        }
      }),
      new Post({
        avatar: "https://gcatest.garmin.com.tw/images/profile/12--cc739d17-cca4-4bef-9061-5745159ef96b.jpg",
        username: "Chou Samuel",
        level: 8,
        content: "这 this week 周的自主训练做完了，但是对于里面的心率配置还是没有掌握好，想问问大家有特别推荐的方式吗",
        datetime: Date.now() - 1000 * 60 * 60 * 10,
        like: 1500,
        comment: 136,
        card: {
          type: "GS_WORKOUT",
          id: 60825381,
          title: "我就是改了",
          imageUrl: "WORKOUT60825381--f7d88a69-591b-42d1-b356-519994f819bd.jpg",
          memberCount: 0,
          level: "你可能回家看789",
          distance: "50.0公里",
          calorie: "1000大卡"
        }
      }),
      new Post({
        avatar: "https://gcatest.garmin.com.tw/images/profile/12--cc739d17-cca4-4bef-9061-5745159ef96b.jpg",
        username: "YYY Jade",
        level: 5,
        content: "这周的自主训练做完嘻嘻嘻I嘻嘻嘻大叔大叔的数据库了，但是对于里面的心率配置还是没有掌握好，想问问大家有特别推荐的方式",
        datetime: new Date("2019/3/12 14:55"),
        like: 100,
        comment: 25,
        card: {
          type: "PLAN",
          id: 40,
          title: "TEST PLAN",
          imageUrl: "CPT1325--f84172c4-c200-4815-833f-6feaa8609351.jpg",
          memberCount: 39,
          campId: 135
        }
      }),
      new Post({
        avatar: "https://gcatest.garmin.com.tw/images/profile/12--cc739d17-cca4-4bef-9061-5745159ef96b.jpg",
        username: "CC World",
        level: 7,
        content: "这自主训练做完嘻嘻嘻嘻大helloworldlongworldxxxxxxxxxxxxxxxxxx周的嘻嘻I叔大叔的数据库了，但是对于里面的心率配置还是没有掌握好，想问问大家有特别推荐的方式超过260个字符测试笑笑笑笑笑的撒看到了撒看到了撒凯迪拉克萨拉丁快乐撒看到了撒看到了撒快点啦是肯定啦上看到了卡死啦的卡死了的卡了深刻的打开啦是的克拉斯看到啦是肯定啦上看到了凯萨琳的卡死了扩大凯迪拉克收到了卡死的撒大事大叔大叔大叔大叔大叔大叔大叔大叔大叔大叔的凯萨琳打开啦上课立刻大声的快乐撒快点啦是肯定啦是肯定啦上看到了{$%S}卡死了都卡洛斯的撒可怜的克拉斯看到啦斯柯达老师看到了了的",
        images: [
          "https://gcatest.garmin.com.tw/images/frame/TP71--cf2b9a37-ccc9-46ce-bc46-7c834392c2f9.jpg"
        ],
        datetime: new Date("2018/6/5 17:43"),
        like: 85,
        comment: 40,
        card: {
          type: "CAMP",
          id: 155,
          title: "成都SQA",
          imageUrl: "CMP155--16c9dee7-d683-45da-baf4-1af2964c6515.jpg",
          memberNum: 67,
          location: "四川/成都/双流"
        },
        mentionedUsers: [
          {fullName: "Test&"}
        ]
      })
    ]);
  }
};