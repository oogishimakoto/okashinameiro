function lord_create(){ 
	
    this.load.on('complete', function () {
		
		// 次のScene移行に移る
		this.loadComplete = true;
		setTimeout(() => {
		  this.scene.start(change_scene);

		  //ローディング画面を消す
		setTimeout(() => {
			const loader = document.querySelector(".loader");
			loader.classList.add("loaded");
	  
			const content = document.querySelector(".content");
		  }, 1);
		}, 1300);  // ロード終了後秒待つ秒数(ms)
	  }, this);
  
	  this.load.start();
}