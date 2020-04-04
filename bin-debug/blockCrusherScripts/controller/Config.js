var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
//# sourceMappingURL=Config.js.map