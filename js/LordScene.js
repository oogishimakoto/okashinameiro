class LordScene extends Phaser.Scene {
	constructor() {
		super({ key: 'LordScene' });
	}

	preload() {
		load_prelode.call(this);
	}

	create() {
		lord_create.call(this);
	}
}
