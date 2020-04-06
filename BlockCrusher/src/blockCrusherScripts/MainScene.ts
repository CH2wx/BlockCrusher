class MainScene extends eui.Component implements eui.UIComponent {
	public bg:eui.Image;
	public gameName:eui.Label;		//游戏名
	public player:eui.Image;		//游戏控制的滑块
	public startBtn:eui.Image;		//开始游戏的按钮
	public ball:eui.Image;			//小球
	public score:eui.Label;			//游戏分数
	public scoreGroup:eui.Group;	//分数所在的组

	public overPanel:eui.Panel;		//游戏结束的面板
	public overScore:eui.Label;		//游戏结束时显示的分数

	public rectContainer:eui.Group;	//加载方块的容器

	/**
     * 排行榜遮罩，为了避免点击开放数据域影响到主域，在主域中建立一个遮罩层级来屏蔽点击事件.
     * 根据自己的需求来设置遮罩的 alpha 值 0~1.
     */
	private rankingListMask: egret.Shape;
	private isRankClick:boolean = false;
	private bitmap:egret.Bitmap;

	//游戏最初数据
	private ballPos:Vector2;
	private playerPos:Vector2;

	//需要用到的变量
	private ballRect:egret.Rectangle;
	private playerRect:egret.Rectangle;
	private config:Config;
	private hitCount:number;
	private rectArr:Array<GameRect> = new Array<GameRect>();
	
	public left:boolean;
	public up:boolean;
	public right:boolean;
	
	public constructor() {
		super();
	}

	/**
	 * 在创建场景后，显示开始界面，并将开始游戏的方法注册到按钮点击事件中
	 */
	protected childrenCreated():void
	{
		super.childrenCreated();
		//在开始调用类时，将开始按钮和标题文字打开，并将开始游戏的方法注册进按钮点击事件中
		this.initGameScene();
	}

	/**
	 * 游戏开始之前初始化场景的函数
	 */
	private initGameScene():void
	{
		this.bg.width = this.stage.stageWidth;
		this.bg.height = this.stage.stageHeight;
		this.overPanel.width = this.stage.stageWidth;
		this.overPanel.height = this.stage.stageHeight;
		let centerX:number = this.stage.stageWidth / 2 - this.player.width / 2;
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
	}

	/**
	 * 关闭游戏结束面板的逻辑代码
	 * 注：它的域是以overPanel为跟对象来执行的
	 */
	private closeOverPanel():void
	{
		this.visible = false;
		console.log("点击排行榜");
        let plathform:any = window.platform;
        if(!this.isRankClick) 
		{
         	//处理遮罩,避免开放域数据影响主域
            this.rankingListMask = new egret.Shape();
            this.rankingListMask.graphics.beginFill(0x000000,1);
            this.rankingListMask.graphics.drawRect(0,0,this.stage.width,this.stage.height);
			this.rankingListMask.graphics.endFill();
			this.rankingListMask.alpha = 0.4;
			//设置为true,以免触摸到下面的按钮
			this.rankingListMask.touchEnabled = true;
            this.addChildAt(this.rankingListMask,999);
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
        else 
		{
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
	}

	/**
	 * 点击开始游戏时调用该方法并开始游戏
	 */
	private startGame():void
	{
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
	}

	/**
	 * 游戏结束时调用的方法，并重置游戏场景
	 */
	private gameOver():void
	{
		this.showDisplayObject(false);
		this.overScore.text = "本局获得分数：" + this.config.score.toString();
		this.overPanel.visible = true;
		this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchedHandle, this);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.ballAction, this);
	}

	/**
	 * 显示或隐藏游戏中的显示对象
	 * @param isStart 
	 */
	private showDisplayObject(isStart:boolean = true):void
	{
		this.score.text = this.config.score.toString();
		this.rectContainer.visible = isStart;
		this.scoreGroup.visible = isStart;
		this.player.visible = isStart;
		this.ball.visible = isStart;
		this.gameName.visible = !isStart;
		this.startBtn.visible = !isStart;
		if (!isStart)
		{
			this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
		}
		else
		{
			this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
		}
	}

	/**
	 * 游戏开始时初始化数据
	 */
	private initData():void
	{
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
	}

	/**
	 * 创建游戏所需方块
	 */
	private createGameBlock():void
	{
		let i:number;
		let rect:GameRect;
		let row:number, col:number;
		for (i = 0; i < this.rectArr.length; i++)
		{
			if (this.rectArr[i] != null)
			{
				this.rectArr[i].visible = false;
				this.rectArr[i].currentState = "destory";
			}
		}
		for	(i = 0; i < this.config.rectCount; i++)
		{
			if (this.rectArr[i] == null)
			{
				rect = new GameRect();
				this.rectContainer.addChild(rect);
				row = i % 10;
				col = Math.floor(i / 10);
				rect.x = row * 64;
				rect.y = col * rect.height + 150;
				this.rectArr[i] = rect;
			}
			else
			{
				this.rectArr[i].visible = true;
				this.rectArr[i].currentState = "start";
			}
		}
	}

	/**
	 * 小球碰到方块计算分数
	 */
	private getscore():void
	{
		let hitscore:number = this.config.level * 1;	//得到击中的分数
		this.config.score += hitscore;
		this.score.text = this.config.score.toString();

		this.hitCount++;
		//如果把本难度的方块全部击中，难度增加
		if (this.hitCount == this.config.rectCount)
		{
			this.hitCount = 0;
			this.config.level++;
			this.config.ballSpeed += 5;
			this.config.rectCount += 10;
			this.createGameBlock();
		}
	}

	/**--------------------------------------  以下为监听函数 ------------------------------------------ */

	/**
	 * 手指滑动的监听函数
	 */
	private onTouchedHandle(e:egret.TouchEvent):void
	{
		if (e.stageX + this.player.width > this.width)
			return;
		this.player.x = e.stageX;
	}
	/**
	 * 小球的行为函数
	 */
	private ballAction():void
	{
		//获取球体和滑块的坐标值
		this.ballRect.x = this.ball.x;
		this.ballRect.y = this.ball.y;
		this.playerRect.x = this.player.x;
		this.playerRect.y = this.player.y;
		//如果小球与滑块发生碰撞，则根据碰撞点和目标点计算反方向向量，并让小球按照反方向向量移动
		if (this.ballRect.intersects(this.playerRect))
		{
			//获得滑板的位置
			let point:Vector2 = new Vector2(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2);
			this.config.ballDir = Vector2.Direction(point, new Vector2(this.ball.x, this.ball.y));
			this.config.ballPos.setPos(this.ball.x, this.ball.y);
			this.setMoveState();
		}
		//如果小球与左边墙壁发生碰撞，且向左的状态可以移动，根据方向向量进行偏移（如果是OP，偏移偏移x，如果是PO，偏移y；O为上一次反弹时记录的小球位置，P为当前小球所在的位置）
		else if (this.ball.x <= 0 && this.left)
		{
			let point:Vector2 = new Vector2(this.ball.x, this.ball.y);
			this.config.ballDir = Vector2.Direction(this.config.ballPos, point);		//得到小球上一次所在点到本次点的方向向量
			this.config.ballDir.x -= this.config.ballDir.x * 2;							//偏移y轴坐标即可得到反弹后的方向向量
			this.config.ballPos.setPos(this.ball.x, this.ball.y);
			this.setMoveState(this.config.directionType[0]);							//禁止向左移动
		}
		else if (this.ball.x + this.ball.width >= this.width && this.right)					//如果小球与右边墙壁发生碰撞
		{
			let point:Vector2 = new Vector2(this.ball.x, this.ball.y);
			this.config.ballDir = Vector2.Direction(point, this.config.ballPos);		//得到小球本次所在点与上一次所在点的方向向量
			this.config.ballDir.y -= this.config.ballDir.y * 2;							//偏移x轴坐标即可得到反弹后的方向向量
			this.config.ballPos.setPos(this.ball.x, this.ball.y);
			this.setMoveState(this.config.directionType[1]);							//禁止向右移动
		}
		else if (this.ball.y <= 0 && this.up)								//如果小球与顶部相撞
		{
			let point:Vector2 = new Vector2(this.ball.x, this.ball.y);
			this.config.ballDir = Vector2.Direction(this.config.ballPos, point);		//得到小球上一次所在点到本次点的方向向量
			this.config.ballDir.y -= this.config.ballDir.y * 2;								//偏移y轴坐标即可得到反弹后的方向向量
			this.config.ballPos.setPos(this.ball.x, this.ball.y);
			this.setMoveState(this.config.directionType[2]);							//禁止向上移动
		}
		else
		{
			//小球与砖块发生碰撞
			for (var i:number = 0; i < this.rectArr.length; i++)
			{
				if (this.rectArr[i].currentState != "destory")
				{
					let objRect:egret.Rectangle = this.rectArr[i].getBounds();	//得到砖块的碰撞区域
					objRect.x = this.rectArr[i].x;
					objRect.y = this.rectArr[i].y;
					if (this.ballRect.intersects(objRect))	//如果此时小球的碰撞区域与砖块的碰撞区域接触
					{
						let point:Vector2 = new Vector2(this.ball.x, this.ball.y);
						this.config.ballDir = Vector2.Direction(point, this.config.ballPos);
						if (point.x >= this.rectArr[i].x && point.x <= this.rectArr[i].x + this.rectArr[i].width)	//该小球击中了方块的底部或顶部，给予一个Y的偏移
						{
							this.config.ballDir.x -= this.config.ballDir.x * 2;
						}
						else	//击中的是小球的其他部位
						{
							this.config.ballDir.y -= this.config.ballDir.y * 2;			//击中侧部，给予一个y的偏移
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
		if (this.ball.y >= this.stage.stageHeight )
		{
			this.gameOver();
			return;
		}
		//让小球移动
		let ballpoint:Vector2 = Vector2.MoveForDir(this.ball.x, this.ball.y, this.config.ballDir, this.config.ballSpeed);
		this.ball.x = ballpoint.x;
		this.ball.y = ballpoint.y;
	}

	/**
	 * 设置可以移动方向的状态
	 * @param forbidType 禁止移动的方向类型，默认为"none"
	 */
	private setMoveState(forbidType:string = "none"):void
	{
		this.left = forbidType != this.config.directionType[0] ;
		this.right = forbidType != this.config.directionType[1];
		this.up = forbidType != this.config.directionType[2];
	}

	//显示微信排行榜
	private obBtnRankingClick():void
	{
        console.log("点击排行榜");
        let plathform:any = window.platform;
        if(!this.isRankClick) 
		{
         	//处理遮罩,避免开放域数据影响主域
            this.rankingListMask = new egret.Shape();
            this.rankingListMask.graphics.beginFill(0x000000,1);
            this.rankingListMask.graphics.drawRect(0,0,this.stage.width,this.stage.height);
			this.rankingListMask.graphics.endFill();
			this.rankingListMask.alpha = 0.4;
			//设置为true,以免触摸到下面的按钮
			this.rankingListMask.touchEnabled = true;
            this.addChildAt(this.rankingListMask,999);
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
        else 
		{
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
	}
}