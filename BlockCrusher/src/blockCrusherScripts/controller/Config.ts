//创建一个用于储存全局变量的配置类
class Config {
	//配置该类的单例模式
	private static _instance:Config;

	//游戏中用到的常量
	private DIRECTION_TYPE:Array<string> = ["left", "right", "up"];

	//全局变量
	public rectCount:number;
	public ballSpeed:number;
	public level:number;	//游戏的等级
	public score:number;	//游戏的分数

	private _ballDir:Vector2;
	private _ballPos:Vector2;

	public constructor() {
		
	}

	public resetData():void
	{
		this.rectCount = 20;
		this.ballSpeed = 15;
		this.level = 1;
		this.score = 0;
		this.ballDir.setPos(0, 1);
		this.ballPos.setPos(0, 0);
	}

	public static get instance():Config
	{
		if (this._instance == null)
		{
			this._instance = new Config();
		}
		return this._instance;
	}

	/**
	 * 得到小球移动的方向类型
	 * 0-左，1-右，2-上
	 */
	public get directionType():Array<string>
	{
		return this.DIRECTION_TYPE;
	}

	/**
	 * 小球的方向向量（移动的方向）
	 */
	public get ballDir():Vector2
	{
		if (this._ballDir == null)
		{
			this._ballDir = new Vector2(0, 1);
		}
		return this._ballDir;
	}

	public set ballDir(vct2:Vector2)
	{
		this._ballDir = vct2;
	}

	/**.
	 * 小球的位置
	 */
	public get ballPos():Vector2
	{
		if (this._ballPos == null)
		{
			this._ballPos = new Vector2(0, 0);
		}
		return this._ballPos;
	}

	public set ballPos(vct2:Vector2)
	{
		this._ballPos = vct2;
	}
}