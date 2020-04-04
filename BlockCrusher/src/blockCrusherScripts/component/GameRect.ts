class GameRect extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string = "..\\resource\\skins\\GameRect", instance:any = null):void
	{
		super.partAdded(partName, instance)
	}
	// protected partAdded(partName:string,instance:any):void
	// {
	// 	super.partAdded(partName,instance);
	// }

	protected childrenCreate():void
	{
		super.childrenCreated();
	}
}