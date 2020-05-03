/**
 * 微信开放数据域
 * 使用 Canvas2DAPI 在 SharedCanvas 渲染一个排行榜，
 * 并在主域中渲染此 SharedCanvas
 */






/**
 * 资源加载组，将所需资源地址以及引用名进行注册
 * 之后可通过assets.引用名方式进行获取
 */
const assetsUrl = {
  icon: "openDataContext/assets/icon.png",
  box: "openDataContext/assets/box.png",
  panel: "openDataContext/assets/panel.png",
  button: "openDataContext/assets/button.png",
  title: "openDataContext/assets/rankingtitle.png"
};

/**
 * 资源加载组，将所需资源地址以及引用名进行注册
 * 之后可通过assets.引用名方式进行获取
 */
let assets = {};
/**
 * canvas 大小
 * 这里暂时写死
 * 需要从主域传入
 */
let canvasWidth;
let canvasHeight;



//获取canvas渲染上下文
const context = sharedCanvas.getContext("2d");
context.globalCompositeOperation = "source-over";

var userInfoList = [];

/**
 * 创建排行榜
 */
function drawRankPanel() {
  //绘制背景
  context_drawImage(assets.panel, offsetX_rankToBorder, offsetY_rankToBorder, rankWidth, rankHeight);
  //绘制标题
  const title = assets.title;
  //根据title的宽高计算一下位置;
  const titleX = offsetX_rankToBorder + (rankWidth - title.width) / 2;
  const titleY = offsetY_rankToBorder + title.height + 40;
  context_drawImage(title, titleX, titleY);
  //获取当前要渲染的数据组

  //起始id
  const startID = perPageMaxNum * page;
  currentGroup = userInfoList.slice(startID, startID + perPageMaxNum);
  //创建头像Bar
  drawRankByGroup(currentGroup);
  //创建按钮
  drawButton();
  //绘制最高分
  setCurRoundScore();
}

/**
 * 根据屏幕大小初始化所有绘制数据
 */
function init() {
  //排行榜绘制数据初始化,可以在此处进行修改
  rankWidth = stageWidth * 4 / 5;
  rankHeight = stageHeight * 4 / 5;
  barWidth = rankWidth * 4 / 5;
  barHeight = rankWidth / perPageMaxNum;
  offsetX_rankToBorder = (stageWidth - rankWidth) / 2;
  offsetY_rankToBorder = (stageHeight - rankHeight) / 2;
  preOffsetY = (rankHeight - barHeight) / (perPageMaxNum + 1);
  fontSize = Math.floor(stageWidth / 25);
  startX = offsetX_rankToBorder + (rankWidth - barWidth) / 2;
  startY = offsetY_rankToBorder + preOffsetY;
  avatarSize = barHeight - 10;
  intervalX = barWidth / 20;
  textOffsetY = (barHeight + fontSize) / 2;
  textMaxSize = barWidth / 3;
  indexWidth = context.measureText("99").width;

  //按钮绘制数据初始化
  buttonWidth = barWidth / 3;
  buttonHeight = barHeight / 2;
  buttonOffset = rankWidth / 3;
  lastButtonX = offsetX_rankToBorder + buttonOffset - buttonWidth;
  nextButtonX = offsetX_rankToBorder + 2 * buttonOffset;
  nextButtonY = lastButtonY = offsetY_rankToBorder + rankHeight - 50 - buttonHeight;
  let data = wx.getSystemInfoSync();
  canvasWidth = data.windowWidth;
  canvasHeight = data.windowHeight;
}

/**
 * 创建两个点击按钮
 */
function drawButton() {
  context_drawImage(assets.button, nextButtonX, nextButtonY, buttonWidth, buttonHeight, "下一页");
  context_drawImage(assets.button, lastButtonX, lastButtonY, buttonWidth, buttonHeight, "上一页");
}


/**
 * 根据当前绘制组绘制排行榜
 */
function drawRankByGroup(currentGroup) {
  for (let i = 0; i < currentGroup.length; i++) {
    const data = currentGroup[i];
    drawByData(data, i);
  }
}

/**
 * 根据绘制信息以及当前i绘制元素
 */
function drawByData(data, i) {
  let x = startX;
  let headX = startX + indexWidth + intervalX;
  //绘制序号
  context.fillStyle = "#888489";
  if (i == 0) {
    context.fillStyle = "#FC670A";
  } else if (i == 1) {
    context.fillStyle = "#FF004C";
  } else if (i == 2) {
    context.fillStyle = "#0019FF";
  }

  // context.font = "34px Microsoft YaHei";
  context.font = Math.floor(stageWidth / 25) + "px Microsoft YaHei";
  context.fillText(data.key + "", x, startY + i * preOffsetY + textOffsetY, 50);
  x += indexWidth + intervalX;
  //绘制头像
  let img = wx.createImage();
  img.src = data.url;
  img.onload = function () {
    context.save();
    context.beginPath(); //开始绘制
    context.arc(headX + (avatarSize / 2), startY + i * preOffsetY + (barHeight - avatarSize) / 2 + (avatarSize / 2), avatarSize / 2, 0, Math.PI * 2, false);
    context.clip();
    context.drawImage(img, headX, startY + i * preOffsetY + (barHeight - avatarSize) / 2, avatarSize, avatarSize);
    context.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 还可以继续绘制
  }
  x += avatarSize + intervalX;
  //绘制名称
  context.fillStyle = "#888489";
  context.font = Math.floor(stageWidth / 28) + "px Arial";
  context.fillText(data.name + "", x, startY + i * preOffsetY + textOffsetY, textMaxSize);
  x += textMaxSize + intervalX;
  //绘制分数
  context.fillStyle = "#09E0EF";
  context.font = Math.floor(stageWidth / 25) + "px Microsoft YaHei";
  context.fillText(data.scroes + "", x, startY + i * preOffsetY + textOffsetY, textMaxSize);
}

/**
 * 点击处理
 */
function onTouchEnd(event) {
  let x = event.clientX * sharedCanvas.width / canvasWidth;
  let y = event.clientY * sharedCanvas.height / canvasHeight;
  if (x > lastButtonX && x < lastButtonX + buttonWidth &&
    y > lastButtonY && y < lastButtonY + buttonHeight) {
    //在last按钮的范围内
    if (page > 0) {
      buttonClick(0);
    }
  }
  if (x > nextButtonX && x < nextButtonX + buttonWidth &&
    y > nextButtonY && y < nextButtonY + buttonHeight) {
    //在next按钮的范围内
    if ((page + 1) * perPageMaxNum < userInfoList.length) {
      buttonClick(1);
    }
  }
}
/**
 * 根据传入的buttonKey 执行点击处理
 * 0 为上一页按钮
 * 1 为下一页按钮
 */
function buttonClick(buttonKey) {
  let old_buttonY;
  if (buttonKey == 0) {
    //上一页按钮
    old_buttonY = lastButtonY;
    lastButtonY += 10;
    page--;
    renderDirty = true;
    console.log('上一页' + page);
    setTimeout(() => {
      lastButtonY = old_buttonY;
      //重新渲染必须标脏
      renderDirty = true;
    }, 100);
  } else if (buttonKey == 1) {
    //下一页按钮
    old_buttonY = nextButtonY;
    nextButtonY += 10;
    page++;
    renderDirty = true;
    console.log('下一页' + page);
    setTimeout(() => {
      nextButtonY = old_buttonY;
      //重新渲染必须标脏
      renderDirty = true;
    }, 100);
  }

}

/////////////////////////////////////////////////////////////////// 相关缓存数据

///////////////////////////////////数据相关/////////////////////////////////////

/**
 * 渲染标脏量
 * 会在被标脏（true）后重新渲染
 */
let renderDirty = true;

/**
 * 当前绘制组
 */
let currentGroup = [];
/**
 * 每页最多显示个数
 */
let perPageMaxNum = 5;
/**
 * 当前页数,默认0为第一页
 */
let page = 0;
///////////////////////////////////绘制相关///////////////////////////////
/**
 * 舞台大小
 */
let stageWidth;
let stageHeight;
/**
 * 排行榜大小
 */
let rankWidth;
let rankHeight;

/**
 * 每个头像条目的大小
 */
let barWidth;
let barHeight;
/**
 * 条目与排行榜边界的水平距离
 */
let offsetX_barToRank
/**
 * 绘制排行榜起始点X
 */
let startX;
/**
 * 绘制排行榜起始点Y
 */
let startY;
/**
 * 每行Y轴间隔offsetY
 */
let preOffsetY;
/**
 * 按钮大小
 */
let buttonWidth;
let buttonHeight;
/**
 * 上一页按钮X坐标
 */
let lastButtonX;
/**
 * 下一页按钮x坐标
 */
let nextButtonX;
/**
 * 上一页按钮y坐标
 */
let lastButtonY;
/**
 * 下一页按钮y坐标
 */
let nextButtonY;
/**
 * 两个按钮的间距
 */
let buttonOffset;

/**
 * 字体大小
 */
let fontSize;
/**
 * 文本文字Y轴偏移量
 * 可以使文本相对于图片大小居中
 */
let textOffsetY;
/**
 * 头像大小
 */
let avatarSize;
/**
 * 名字文本最大宽度，名称会根据
 */
let textMaxSize;
/**
 * 绘制元素之间的间隔量
 */
let intervalX;
/**
 * 排行榜与舞台边界的水平距离
 */
let offsetX_rankToBorder;
/**
 * 排行榜与舞台边界的竖直距离
 */
let offsetY_rankToBorder;
/**
 * 绘制排名的最大宽度
 */
let indexWidth;

//////////////////////////////////////////////////////////
/**
 * 监听点击
 */
wx.onTouchEnd((event) => {
  const l = event.changedTouches.length;
  for (let i = 0; i < l; i++) {
    onTouchEnd(event.changedTouches[i]);
  }
});
/**
 * 根据绘制信息以及当前i绘制元素
 */
function drawByData(data, i) {
  let x = startX;
  let headX = startX + indexWidth + intervalX;
  //绘制序号
  context.fillStyle = "#888489";
  if (i == 0) {
    context.fillStyle = "#FC670A";
  } else if (i == 1) {
    context.fillStyle = "#FF004C";
  } else if (i == 2) {
    context.fillStyle = "#0019FF";
  }

  // context.font = "34px Microsoft YaHei";
  context.font = Math.floor(stageWidth / 25) + "px Microsoft YaHei";
  context.fillText(data.key + "", x, startY + i * preOffsetY + textOffsetY, 50);
  x += indexWidth + intervalX;
  //绘制头像
  let img = wx.createImage();
  img.src = data.url;
  img.onload = function () {
    context.save();
    context.beginPath(); //开始绘制
    context.arc(headX + (avatarSize / 2), startY + i * preOffsetY + (barHeight - avatarSize) / 2 + (avatarSize / 2), avatarSize / 2, 0, Math.PI * 2, false);
    context.clip();
    context.drawImage(img, headX, startY + i * preOffsetY + (barHeight - avatarSize) / 2, avatarSize, avatarSize);
    context.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 还可以继续绘制
  }
  x += avatarSize + intervalX;
  //绘制名称
  context.fillStyle = "#888489";
  context.font = Math.floor(stageWidth / 28) + "px Arial";
  context.fillText(data.name + "", x, startY + i * preOffsetY + textOffsetY, textMaxSize);
  x += textMaxSize + intervalX;
  //绘制分数
  context.fillStyle = "#09E0EF";
  context.font = Math.floor(stageWidth / 25) + "px Microsoft YaHei";
  context.fillText(data.scroes + "", x, startY + i * preOffsetY + textOffsetY, textMaxSize);
}

/**
 * 是否加载过资源的标记量
 */
let hasLoadRes;

/**
 * 资源加载
 */
function preloadAssets() {
  let preloaded = 0;
  let count = 0;
  for (let asset in assetsUrl) {
    count++;
    const img = wx.createImage();
    img.onload = () => {
      preloaded++;
      if (preloaded == count) {
        // console.log("加载完成");
        hasLoadRes = true;
      }
    }
    img.src = assetsUrl[asset];
    assets[asset] = img;
  }
}

/**
 * 绘制屏幕
 * 这个函数会在加载完所有资源之后被调用
 */
function createScene() {
  // if (sharedCanvas.width && sharedCanvas.height) {
    stageWidth = sharedCanvas.width;
    stageHeight = sharedCanvas.height;
    init();
    return true;
  // } else {
  //   console.log('创建开放数据域失败，请检查是否加载开放数据域资源');
  //   return false;
  // }
}

function getKVValueByKey(kvDataList, key) {
  for (let kvData of kvDataList) {
    if (kvData.key == key) {
      return kvData.value;
    }
  }
}


//记录requestAnimationFrame的ID
let requestAnimationFrameID;
let hasCreateScene;

/**
 * 增加来自主域的监听函数
 */
function addOpenDataContextListener() {
  wx.onMessage((data) => {
    if (data.command == 'open') {
      curScore.score = ~~data.curScore;
      wx.getUserCloudStorage({
        keyList: ["score"],
        success: function (callBackData) {
          //获取玩家数据成功
          let kvDataList = callBackData.KVDataList;
          let oldScore = ~~getKVValueByKey(kvDataList, "score");
          if (oldScore < curScore.score) {
            //破纪录
            curScore.isMax = true;
            wx.setUserCloudStorage({
              KVDataList: [{
                key: "score",
                value: curScore.score.toString()
              }],
              success: handleFriends()
            })
          } else {
            curScore.isMax = false;
            handleFriends();
          }
        }
      })
    } else if (data.command == 'close' && requestAnimationFrameID) {
      cancelAnimationFrame(requestAnimationFrameID);
      requestAnimationFrameID = null
    } else if (data.command == 'loadRes' && !hasLoadRes) {
      /**
       * 加载资源函数
       * 只需要加载一次
       */
      preloadAssets();
    }
  });
}

addOpenDataContextListener();

var curScore = {isMax:false, score:0};
/**
 * 最高分
 */
function setCurRoundScore() {
  // if (!curScore.isMax)
  //   return;
  let maxSocreX = offsetX_rankToBorder + rankWidth * 0.25; //最高分的x坐标
  let maxSocreY = offsetY_rankToBorder + 50;
  context.fillStyle = "#FF0000";
  context.font = Math.floor(stageWidth / 18) + "px Microsoft YaHei";
  context.fillText((curScore.isMax ? "打破记录：" : "本轮获得分数：") + curScore.score.toString() + "！", maxSocreX, maxSocreY);
}

function handleFriends() {
  wx.getFriendCloudStorage({
    keyList: ["score"],
    success: function (callBackData) {
      userInfoList = [];
      let data = callBackData.data;
      //获取同玩数据成功
      for (let i = 0; i < data.length; i++) {
        let userData = data[i];

        // console.log("unionId = " + userData.unionId);
        console.log(userData);

        let avatarUrl = userData.avatarUrl;
        let nickname = userData.nickname;
        let curScore = 0;
        let KVDataList = userData.KVDataList;
        for (let kvData of KVDataList) {
          if (kvData.key == "score") {
            curScore = ~~kvData.value;
          }
        }
        let playerData = {
          key: 0,
          name: "",
          url: assets.icon,
          scroes: 0
        }

        playerData.key = i + 1;
        playerData.name = nickname;
        playerData.url = avatarUrl;
        playerData.scroes = curScore;
        userInfoList.push(playerData);
      }

      let compare = function (a, b) {//比较函数
        if (a.scroes < b.scroes) {
          return 1;
        } else if (a.scroes > b.scroes) {
          return -1;
        } else {
          return 0;
        }
      }
      userInfoList.sort(compare);
      for (let i = 0; i < userInfoList.length; i++) {
        let userInfo = userInfoList[i];
        userInfo.key = i + 1;
      }

      if (!hasCreateScene) {
        //创建并初始化
        hasCreateScene = createScene();
      }
      requestAnimationFrameID = requestAnimationFrame(loop);

      context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
      drawRankPanel();
    }
  });
}

/**
 * 循环函数
 * 每帧判断一下是否需要渲染
 * 如果被标脏，则重新渲染
 */
function loop() {
  if (renderDirty) {
    // console.log(`stageWidth :${stageWidth}   stageHeight:${stageHeight}`)
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
    drawRankPanel();
    renderDirty = false;
  }
  requestAnimationFrameID = requestAnimationFrame(loop);
}

/**
 * 图片绘制函数
 */
function context_drawImage(image, x, y, width, height, txtContent = "") {
  if (image.width != 0 && image.height != 0 && context) {
    if (width && height) {
      context.drawImage(image, x, y, width, height);
    } else {
      context.drawImage(image, x, y);
    }
    if (txtContent != null && txtContent != "")
    {
      context.fillText(txtContent, x + image.width / 2, y + height / 2);
    }
  }
}