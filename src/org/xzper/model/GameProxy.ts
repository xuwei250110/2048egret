

/// <reference path="../../../lib/puremvc-typescript-standard-1.0.d.ts"/>
/// <reference path="common/CommonData.ts"/>

module game {

	export class GameProxy extends puremvc.Proxy implements puremvc.IProxy{
		public static NAME:string = "GameProxy";

		/**
		 * 分数更新 , body  {totalScore:int , addScore:int}
		 */
		public static UPDATE_SCORE:string = "update_score";
		
		public static GAME_RESULT:string = "game_result";
		
		public static RESET_SCORE:string = "reset_score";
		
		private _score:number = 0;

		private won:boolean = false;
		private over:boolean = false;
		
		
		public constructor(){
			super(GameProxy.NAME);
		}
		
		/**
		 * 游戏分数
		 */
		public get score():number{
			return this._score;
		}
		
		/**
		 * 重置游戏数据
		 */
		public reset():void{
			this._score = 0;
			this.won = false;
			this.over = false;
			CommonData.isRunning = true;
			this.sendNotification(GameProxy.RESET_SCORE);
		}

		/**
		 * 更新分数
		 */
		public updateScore(addScore:number):void{
			if(addScore != 0){
				this._score += addScore;
				this.sendNotification(GameProxy.UPDATE_SCORE , {"totalScore":this.score , "addScore":addScore});
			}
		}
		
		/**
		 * 游戏是否胜利
		 */
		public setResult(b:boolean):void{
			if(b){
				this.won = true;
			}else{
				this.over = true;
			}
			CommonData.isRunning = false;
			this.sendNotification(GameProxy.GAME_RESULT , b);
		}
	}
}