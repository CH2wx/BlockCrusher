var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super.call(this) || this;
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
        if (this.ball.y >= this.height || this.ball.y >= this.stage.height) {
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
    return MainScene;
}(eui.Component));
__reflect(MainScene.prototype, "MainScene", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=MainScene.js.map