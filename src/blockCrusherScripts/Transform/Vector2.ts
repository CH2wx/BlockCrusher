class Vector2 {
	public x:number;
	public y:number;

	public constructor(x:number, y:number) {
		this.x = x;
		this.y = y;
	}

	/**
	 * 设置坐标的位置
	 */
	public setPos(x:number, y:number):void
	{
		this.x = x;
		this.y = y;
	}

	/**
	 * 计算两个点之间的距离
	 * 返回一个number类型的值
	 */
	public static Distance(point1:Vector2, point2:Vector2):number
	{
		let offsetX:number = point1.x - point2.x;
		let offsetY:number = point1.y - point2.y;
		let distance = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
		return distance;
	}

	/**
	 * 计算起点（point1）到终点（point2）的方向向量
	 * 返回一个Vector2类型的值
	 */
	public static Direction(point1:Vector2, point2:Vector2):Vector2
	{
		let offsetX:number = point2.x - point1.x;
		let offsetY:number = point2.y - point1.y;
		let dir:Vector2 = new Vector2(offsetX, offsetY);
		return dir;
	}

	/**
	 * 对方向向量dir进行归一化处理，让目标以speed的速度向dir方向移动
	 * 归一化：将向量dir等比例缩放为单位矢量，在计算时我们无需考虑具体的模长所带来的影响，只考虑向量的方向
	 * 返回一个Vector2类型的值
	 */
	public static MoveForDir(x:number, y:number, dir:Vector2, speed:number):Vector2
	{
		let normal:number = Math.sqrt(Math.pow(dir.x, 2) + Math.pow(dir.y, 2));
		let classDir:Vector2 = new Vector2(dir.x / normal, dir.y / normal);		//Vector2中两个参数及归一化处理
		x += classDir.x * speed;
		y += classDir.y * speed;
		return new Vector2(x, y);
	}
}