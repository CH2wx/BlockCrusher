var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
//# sourceMappingURL=Vector2.js.map