var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        //加载资源文件
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        //加载资源文件
                        _a.sent();
                        //加载皮肤文件
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        //加载皮肤文件
                        _a.sent();
                        //加载资源组
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        //加载资源组
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        var gameScene = new MainScene();
        this.addChild(gameScene);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else if (typeof generateJSON !== 'undefined') {
            if (url.indexOf(".exml") > -1) {
                var dataPath = url.split("/");
                dataPath.pop();
                var dirPath = dataPath.join("/") + "_EUI.json";
                if (!generateJSON.paths[url]) {
                    RES.getResByUrl(dirPath, function (data) {
                        window["JSONParseClass"]["setData"](data);
                        egret.callLater(function () {
                            onSuccess.call(thisObject, generateJSON.paths[url]);
                        }, _this);
                    }, this, RES.ResourceItem.TYPE_JSON);
                }
                else {
                    egret.callLater(function () {
                        onSuccess.call(thisObject, generateJSON.paths[url]);
                    }, this);
                }
            }
            else {
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateJSON);
                }, this);
            }
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super.call(this) || this;
        _this.isRankClick = false;
        _this.rectArr = new Array();
        return _this;
    }
    /**
     * 在创建场景后，显示开始界面，并将开始游戏的方法注册到按钮点击事件中
     */
    MainScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        //在开始调用类时，将开始按钮和标题文字打开，并将开始游戏的方法注册进按钮点击事件中
        this.initGameScene();
    };
    /**
     * 游戏开始之前初始化场景的函数
     */
    MainScene.prototype.initGameScene = function () {
        this.bg.width = this.stage.stageWidth;
        this.bg.height = this.stage.stageHeight;
        this.overPanel.width = this.stage.stageWidth;
        this.overPanel.height = this.stage.stageHeight;
        var centerX = this.stage.stageWidth / 2 - this.player.width / 2;
        this.scoreGroup.x = centerX;
        this.ball.x = centerX;
        this.ball.y = this.stage.stageHeight / 2;
        this.player.x = centerX;
        this.player.y = this.stage.stageHeight - this.stage.stageHeight / 10;
        //隐藏储存方块的容器，并初始化方块数组
        this.rectContainer.visible = false;
        this.rectArr = new Array();
        //初始化游戏数据
        this.hitCount = 0;
        this.ballPos = new Vector2(this.ball.x, this.ball.y);
        this.playerPos = new Vector2(this.player.x, this.player.y);
        this.config = Config.instance;
        //初始化游戏结束面板的内容
        this.overPanel.visible = false;
        this.overPanel.closeButton.label = "确认";
        this.overPanel.close = this.closeOverPanel;
        this.initData();
        this.showDisplayObject(false);
    };
    /**
     * 关闭游戏结束面板的逻辑代码
     * 注：它的域是以overPanel为跟对象来执行的
     */
    MainScene.prototype.closeOverPanel = function () {
        this.visible = false;
        console.log("点击排行榜");
        var plathform = window.platform;
        if (!this.isRankClick) {
            //处理遮罩,避免开放域数据影响主域
            this.rankingListMask = new egret.Shape();
            this.rankingListMask.graphics.beginFill(0x000000, 1);
            this.rankingListMask.graphics.drawRect(0, 0, this.stage.width, this.stage.height);
            this.rankingListMask.graphics.endFill();
            this.rankingListMask.alpha = 0.4;
            //设置为true,以免触摸到下面的按钮
            this.rankingListMask.touchEnabled = true;
            this.addChildAt(this.rankingListMask, 999);
            //让排行榜按钮显示在容器内
            this.addChild(this.rankingListMask);
            //显示开放域数据
            this.bitmap = plathform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
            this.addChild(this.bitmap);
            //主域向子域发送数据
            plathform.openDataContext.postMessage({
                isRanking: this.isRankClick,
                text: "egret",
                year: (new Date()).getFullYear(),
                command: "open"
            });
            this.isRankClick = true;
        }
        else {
            this.bitmap.parent && this.bitmap.parent.removeChild(this.bitmap);
            this.rankingListMask.parent && this.rankingListMask.parent.removeChild(this.rankingListMask);
            this.isRankClick = false;
            plathform.openDataContext.postMessage({
                isRanking: this.isRankClick,
                text: "egret",
                year: (new Date()).getFullYear(),
                command: "close"
            });
        }
    };
    /**
     * 点击开始游戏时调用该方法并开始游戏
     */
    MainScene.prototype.startGame = function () {
        //对场景中的对象进行显示与隐藏
        this.initData();
        this.showDisplayObject(true);
        //为了进行碰撞检测，在此获得小球与滑块的碰撞区域
        this.ballRect = this.ball.getBounds();
        this.playerRect = this.player.getBounds();
        //为滑块添加监听事件，使其能够跟随手指的滑动进行移动
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchedHandle, this);
        //为小球添加行为事件，当游戏第一帧开始之后，小球开始行动
        this.addEventListener(egret.Event.ENTER_FRAME, this.ballAction, this);
    };
    /**
     * 游戏结束时调用的方法，并重置游戏场景
     */
    MainScene.prototype.gameOver = function () {
        this.showDisplayObject(false);
        this.overScore.text = "本局获得分数：" + this.config.score.toString();
        this.overPanel.visible = true;
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchedHandle, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.ballAction, this);
    };
    /**
     * 显示或隐藏游戏中的显示对象
     * @param isStart
     */
    MainScene.prototype.showDisplayObject = function (isStart) {
        if (isStart === void 0) { isStart = true; }
        this.score.text = this.config.score.toString();
        this.rectContainer.visible = isStart;
        this.scoreGroup.visible = isStart;
        this.player.visible = isStart;
        this.ball.visible = isStart;
        this.gameName.visible = !isStart;
        this.startBtn.visible = !isStart;
        if (!isStart) {
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
        }
        else {
            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
        }
    };
    /**
     * 游戏开始时初始化数据
     */
    MainScene.prototype.initData = function () {
        //初始化可触发事件的方向信息
        this.up = true;
        this.left = true;
        this.right = true;
        //初始化小球与滑块的位置
        this.ball.x = this.ballPos.x;
        this.ball.y = this.ballPos.y;
        this.player.x = this.playerPos.x;
        this.player.y = this.playerPos.y;
        //初始化分数和游戏的基本数值（速度、位置等）
        this.config.resetData();
        //创建方块
        this.createGameBlock();
    };
    /**
     * 创建游戏所需方块
     */
    MainScene.prototype.createGameBlock = function () {
        var i;
        var rect;
        var row, col;
        for (i = 0; i < this.rectArr.length; i++) {
            if (this.rectArr[i] != null) {
                this.rectArr[i].visible = false;
                this.rectArr[i].currentState = "destory";
            }
        }
        for (i = 0; i < this.config.rectCount; i++) {
            if (this.rectArr[i] == null) {
                rect = new GameRect();
                this.rectContainer.addChild(rect);
                row = i % 10;
                col = Math.floor(i / 10);
                rect.x = row * 64;
                rect.y = col * rect.height + 150;
                this.rectArr[i] = rect;
            }
            else {
                this.rectArr[i].visible = true;
                this.rectArr[i].currentState = "start";
            }
        }
    };
    /**
     * 小球碰到方块计算分数
     */
    MainScene.prototype.getscore = function () {
        var hitscore = this.config.level * 1; //得到击中的分数
        this.config.score += hitscore;
        this.score.text = this.config.score.toString();
        this.hitCount++;
        //如果把本难度的方块全部击中，难度增加
        if (this.hitCount == this.config.rectCount) {
            this.hitCount = 0;
            this.config.level++;
            this.config.ballSpeed += 5;
            this.config.rectCount += 10;
            this.createGameBlock();
        }
    };
    /**--------------------------------------  以下为监听函数 ------------------------------------------ */
    /**
     * 手指滑动的监听函数
     */
    MainScene.prototype.onTouchedHandle = function (e) {
        if (e.stageX + this.player.width > this.width)
            return;
        this.player.x = e.stageX;
    };
    /**
     * 小球的行为函数
     */
    MainScene.prototype.ballAction = function () {
        //获取球体和滑块的坐标值
        this.ballRect.x = this.ball.x;
        this.ballRect.y = this.ball.y;
        this.playerRect.x = this.player.x;
        this.playerRect.y = this.player.y;
        //如果小球与滑块发生碰撞，则根据碰撞点和目标点计算反方向向量，并让小球按照反方向向量移动
        if (this.ballRect.intersects(this.playerRect)) {
            //获得滑板的位置
            var point = new Vector2(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2);
            this.config.ballDir = Vector2.Direction(point, new Vector2(this.ball.x, this.ball.y));
            this.config.ballPos.setPos(this.ball.x, this.ball.y);
            this.setMoveState();
        }
        else if (this.ball.x <= 0 && this.left) {
            var point = new Vector2(this.ball.x, this.ball.y);
            this.config.ballDir = Vector2.Direction(this.config.ballPos, point); //得到小球上一次所在点到本次点的方向向量
            this.config.ballDir.x -= this.config.ballDir.x * 2; //偏移y轴坐标即可得到反弹后的方向向量
            this.config.ballPos.setPos(this.ball.x, this.ball.y);
            this.setMoveState(this.config.directionType[0]); //禁止向左移动
        }
        else if (this.ball.x + this.ball.width >= this.width && this.right) {
            var point = new Vector2(this.ball.x, this.ball.y);
            this.config.ballDir = Vector2.Direction(point, this.config.ballPos); //得到小球本次所在点与上一次所在点的方向向量
            this.config.ballDir.y -= this.config.ballDir.y * 2; //偏移x轴坐标即可得到反弹后的方向向量
            this.config.ballPos.setPos(this.ball.x, this.ball.y);
            this.setMoveState(this.config.directionType[1]); //禁止向右移动
        }
        else if (this.ball.y <= 0 && this.up) {
            var point = new Vector2(this.ball.x, this.ball.y);
            this.config.ballDir = Vector2.Direction(this.config.ballPos, point); //得到小球上一次所在点到本次点的方向向量
            this.config.ballDir.y -= this.config.ballDir.y * 2; //偏移y轴坐标即可得到反弹后的方向向量
            this.config.ballPos.setPos(this.ball.x, this.ball.y);
            this.setMoveState(this.config.directionType[2]); //禁止向上移动
        }
        else {
            //小球与砖块发生碰撞
            for (var i = 0; i < this.rectArr.length; i++) {
                if (this.rectArr[i].currentState != "destory") {
                    var objRect = this.rectArr[i].getBounds(); //得到砖块的碰撞区域
                    objRect.x = this.rectArr[i].x;
                    objRect.y = this.rectArr[i].y;
                    if (this.ballRect.intersects(objRect)) {
                        var point = new Vector2(this.ball.x, this.ball.y);
                        this.config.ballDir = Vector2.Direction(point, this.config.ballPos);
                        if (point.x >= this.rectArr[i].x && point.x <= this.rectArr[i].x + this.rectArr[i].width) {
                            this.config.ballDir.x -= this.config.ballDir.x * 2;
                        }
                        else {
                            this.config.ballDir.y -= this.config.ballDir.y * 2; //击中侧部，给予一个y的偏移
                        }
                        this.config.ballPos.setPos(this.ball.x, this.ball.y);
                        //隐藏当前方块
                        this.rectArr[i].visible = false;
                        this.rectArr[i].currentState = "destory";
                        //设置可移动方向
                        this.setMoveState();
                        //计算分数
                        this.getscore();
                        break;
                    }
                }
            }
        }
        if (this.ball.y >= this.stage.stageHeight) {
            this.gameOver();
            return;
        }
        //让小球移动
        var ballpoint = Vector2.MoveForDir(this.ball.x, this.ball.y, this.config.ballDir, this.config.ballSpeed);
        this.ball.x = ballpoint.x;
        this.ball.y = ballpoint.y;
    };
    /**
     * 设置可以移动方向的状态
     * @param forbidType 禁止移动的方向类型，默认为"none"
     */
    MainScene.prototype.setMoveState = function (forbidType) {
        if (forbidType === void 0) { forbidType = "none"; }
        this.left = forbidType != this.config.directionType[0];
        this.right = forbidType != this.config.directionType[1];
        this.up = forbidType != this.config.directionType[2];
    };
    //显示微信排行榜
    MainScene.prototype.obBtnRankingClick = function () {
        console.log("点击排行榜");
        var plathform = window.platform;
        if (!this.isRankClick) {
            //处理遮罩,避免开放域数据影响主域
            this.rankingListMask = new egret.Shape();
            this.rankingListMask.graphics.beginFill(0x000000, 1);
            this.rankingListMask.graphics.drawRect(0, 0, this.stage.width, this.stage.height);
            this.rankingListMask.graphics.endFill();
            this.rankingListMask.alpha = 0.4;
            //设置为true,以免触摸到下面的按钮
            this.rankingListMask.touchEnabled = true;
            this.addChildAt(this.rankingListMask, 999);
            //让排行榜按钮显示在容器内
            this.addChild(this.rankingListMask);
            //显示开放域数据
            this.bitmap = plathform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
            this.addChild(this.bitmap);
            //主域向子域发送数据
            plathform.openDataContext.postMessage({
                isRanking: this.isRankClick,
                text: "egret",
                year: (new Date()).getFullYear(),
                command: "open"
            });
            this.isRankClick = true;
        }
        else {
            this.bitmap.parent && this.bitmap.parent.removeChild(this.bitmap);
            this.rankingListMask.parent && this.rankingListMask.parent.removeChild(this.rankingListMask);
            this.isRankClick = false;
            plathform.openDataContext.postMessage({
                isRanking: this.isRankClick,
                text: "egret",
                year: (new Date()).getFullYear(),
                command: "close"
            });
        }
    };
    return MainScene;
}(eui.Component));
__reflect(MainScene.prototype, "MainScene", ["eui.UIComponent", "egret.DisplayObject"]);
var GameRect = (function (_super) {
    __extends(GameRect, _super);
    function GameRect() {
        return _super.call(this) || this;
    }
    GameRect.prototype.partAdded = function (partName, instance) {
        if (partName === void 0) { partName = "..\\resource\\skins\\GameRect"; }
        if (instance === void 0) { instance = null; }
        _super.prototype.partAdded.call(this, partName, instance);
    };
    // protected partAdded(partName:string,instance:any):void
    // {
    // 	super.partAdded(partName,instance);
    // }
    GameRect.prototype.childrenCreate = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return GameRect;
}(eui.Component));
__reflect(GameRect.prototype, "GameRect", ["eui.UIComponent", "egret.DisplayObject"]);
//创建一个用于储存全局变量的配置类
var Config = (function () {
    function Config() {
        //游戏中用到的常量
        this.DIRECTION_TYPE = ["left", "right", "up"];
    }
    Config.prototype.resetData = function () {
        this.rectCount = 20;
        this.ballSpeed = 15;
        this.level = 1;
        this.score = 0;
        this.ballDir.setPos(0, 1);
        this.ballPos.setPos(0, 0);
    };
    Object.defineProperty(Config, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new Config();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "directionType", {
        /**
         * 得到小球移动的方向类型
         * 0-左，1-右，2-上
         */
        get: function () {
            return this.DIRECTION_TYPE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "ballDir", {
        /**
         * 小球的方向向量（移动的方向）
         */
        get: function () {
            if (this._ballDir == null) {
                this._ballDir = new Vector2(0, 1);
            }
            return this._ballDir;
        },
        set: function (vct2) {
            this._ballDir = vct2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "ballPos", {
        /**.
         * 小球的位置
         */
        get: function () {
            if (this._ballPos == null) {
                this._ballPos = new Vector2(0, 0);
            }
            return this._ballPos;
        },
        set: function (vct2) {
            this._ballPos = vct2;
        },
        enumerable: true,
        configurable: true
    });
    return Config;
}());
__reflect(Config.prototype, "Config");
var Vector2 = (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * 设置坐标的位置
     */
    Vector2.prototype.setPos = function (x, y) {
        this.x = x;
        this.y = y;
    };
    /**
     * 计算两个点之间的距离
     * 返回一个number类型的值
     */
    Vector2.Distance = function (point1, point2) {
        var offsetX = point1.x - point2.x;
        var offsetY = point1.y - point2.y;
        var distance = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
        return distance;
    };
    /**
     * 计算起点（point1）到终点（point2）的方向向量
     * 返回一个Vector2类型的值
     */
    Vector2.Direction = function (point1, point2) {
        var offsetX = point2.x - point1.x;
        var offsetY = point2.y - point1.y;
        var dir = new Vector2(offsetX, offsetY);
        return dir;
    };
    /**
     * 对方向向量dir进行归一化处理，让目标以speed的速度向dir方向移动
     * 归一化：将向量dir等比例缩放为单位矢量，在计算时我们无需考虑具体的模长所带来的影响，只考虑向量的方向
     * 返回一个Vector2类型的值
     */
    Vector2.MoveForDir = function (x, y, dir, speed) {
        var normal = Math.sqrt(Math.pow(dir.x, 2) + Math.pow(dir.y, 2));
        var classDir = new Vector2(dir.x / normal, dir.y / normal); //Vector2中两个参数及归一化处理
        x += classDir.x * speed;
        y += classDir.y * speed;
        return new Vector2(x, y);
    };
    return Vector2;
}());
__reflect(Vector2.prototype, "Vector2");

;window.Main = Main;