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
var RankingPanel = (function (_super) {
    __extends(RankingPanel, _super);
    function RankingPanel() {
        var _this = _super.call(this) || this;
        _this.isRankClick = false;
        return _this;
    }
    //显示微信排行榜
    RankingPanel.prototype.obBtnRankingClick = function (e) {
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
    return RankingPanel;
}(egret.Sprite));
__reflect(RankingPanel.prototype, "RankingPanel");
//# sourceMappingURL=RankingPanel.js.map