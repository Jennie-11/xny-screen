// socket对象
let websock = null;
// 成功回调
let messageCallback = null;
// 失败回调
let errorCallback = null;
// 要连接的 URL；这应该是 WebSocket 服务器将响应的 URL
let wsUrl = "";
// 重连时间
let tryTime = 0;

// 接收ws后端返回的数据
function websocketonmessage(e) {
  messageCallback(e.data);
}
export const random = (start, stop) => {
  return parseInt(Math.random() * (stop - start) + start);
};
// 判断的是否是JSON字符串
export function type(str) {
  if (typeof str == "string") {
    try {
      var obj = JSON.parse(str);
      // 等于这个条件说明就是JSON字符串 会返回true
      if (typeof obj == "object" && obj) {
        return true;
      } else {
        //不是就返回false
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}

// webSock连接成功，连接读卡器

export function connectReadCarder() {
  if (websock && websock.readyState && websock.readyState == 1) {
    websock.send(
      '{"module":"idcard","msgid":"123456789","function":"getsam","parameter":{"dev":"1"}}'
    );
  }
}

/**
 * 发起websocket连接
 * @param {Object} agentData 需要向后台传递的参数数据
 */
function websocketSend(agentData) {
  // console.log('发起websocket连接');
  // 加延迟是为了尽量让ws连接状态变为OPEN
  setTimeout(() => {
    // 添加状态判断，当为OPEN时，发送消息
    if (websock && websock.readyState && websock.readyState === websock.OPEN) {
      // websock.OPEN = 1
      // 发给后端的数据需要字符串化
      websock.send(JSON.stringify(agentData));
    }
    if (
      websock &&
      websock.readyState &&
      websock.readyState === websock.CLOSED
    ) {
      // websock.CLOSED = 3
      console.log("websock.readyState=3");
      // Message.error('ws连接异常，请稍候重试')
      errorCallback();
    }
  }, 800);
}

// 关闭ws连接
function websocketclose(e) {
  // e.code === 1000  表示正常关闭。 无论为何目的而创建, 该链接都已成功完成任务。
  // e.code !== 1000  表示非正常关闭。
  if (e && e.code !== 1000) {
    // Message.error('ws连接异常，请稍候重试')
    errorCallback();
    // // 如果需要设置异常重连则可替换为下面的代码，自行进行测试
    if (tryTime < 3) {
      setTimeout(function () {
        websock = null;
        tryTime++;
        initWebSocket();
        // console.log(`第${tryTime}次重连`)
      }, 3 * 1000);
    } else {
      setTimeout(() => {
        // Message.error('重连失败！请稍后重试')
      }, 1000);
    }
  }
}
// 建立ws连接
function websocketOpen() {
  console.log("ws连接成功");
  // 向服务端推送信息
  websock.send(
    '{"module":"idcard","msgid":"123456789","function":"autoreadcard","parameter":{"dev":"1","repeat":"1","readtype":"1"}}'
  );
  websock.send(
    '{"module":"idcard","msgid":"123456789","function":"getsam","parameter":{"dev":"1"}}'
  );
}

// 初始化weosocket
function initWebSocket() {
  // console.log('初始化weosocket');
  if (typeof WebSocket === "undefined") {
    this.$message({
      title: "您的浏览器不支持WebSocket，无法获取数据",
      //将值设置为 success 或者直接不用写icon这个参数
      icon: "error",
      //显示持续时间为 2秒
      // duration: 1000,
    });
    // Message.error('您的浏览器不支持WebSocket，无法获取数据')
    return false;
  }

  // const token = 'JWT=' + getToken()
  // ws请求完整地址
  const requstWsUrl = wsUrl;

  // 使用 WebSocket() 构造函数来构造一个 WebSocket
  websock = new WebSocket(requstWsUrl);

  // 用于指定当从服务器接受到信息时的回调函数
  websock.onmessage = function (e) {
    // console.log(e,);
    websocketonmessage(e);
  };
  // 用于指定连接成功后的回调函数
  websock.onopen = function () {
    // console.log("请求状态");
    websocketOpen();
  };
  // 用于指定连接失败后的回调函数
  websock.onerror = function () {
    // Message.error('ws连接异常，请稍候重试')
    errorCallback();
  };
  // 用于指定连接关闭后的回调函数
  websock.onclose = function (e) {
    websocketclose(e);
  };
}

/**
 * 发起websocket请求函数
 * @param {string} url ws连接地址
 * @param {Object} agentData 传给后台的参数
 * @param {function} successCallback 接收到ws数据，对数据进行处理的回调函数
 * @param {function} errCallback ws连接错误的回调函数
 */
export function sendWebsocket(url, agentData, successCallback, errCallback) {
  wsUrl = url;
  initWebSocket();
  messageCallback = successCallback;
  errorCallback = errCallback;
  websocketSend(agentData);
}

/**
 * 关闭websocket函数
 */
export function closeWebsocket() {
  if (websock) {
    console.log("主动关闭websocket");

    websock.close(); // 主动关闭websocket
  }
}

export function sendMessage(type) {
  websock.send(type);
}
