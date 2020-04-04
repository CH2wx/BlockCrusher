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
//# sourceMappingURL=GameRect.js.map