const canvasSketch = require('canvas-sketch');
import utils from './utils';

const settings = {
	dimensions: [2048, 2048]
};

const sketch = () => {
	return ({ context, width, height }) => {
		class Verticals {
			constructor(angle, maxWidth, maxHeight, x, y, scaleRangeX, scaleRangeY) {
				this.angle = angle;
				this.maxWidth = maxWidth;
				this.maxHeight = maxHeight;
				this.scaleRangeX = scaleRangeX;
				this.scaleRangeY = scaleRangeY;
				this.x = x;
				this.y = y;
				this.velocityDrawX = utils.randomRange(0.01, 0.05);
				this.velocityDrawY = utils.randomRange(0.01, 0.05);
				this.velocityScaleX = utils.randomRange(0.01, 0.05);
				this.velocityScaleY = utils.randomRange(0.01, 0.05);
				this.sw = random.range(0, scaleRangeX);
				this.sh = random.range(0, scaleRangeY);
				this.dw = random.range(0, maxWidth);
				this.dh = random.range(0, maxHeight);
				this.scaleVectorX = true;
				this.drawVectorX = true;
				this.drawVectorY = true;
				this.scaleVectorY = true;
			}

			draw() {
				context.clearRect(this.dw, this.dh, w, h);
				context.save();
				context.translate(this.x, this.y);
				context.rotate(-this.angle);
				context.scale(this.sw, this.sh);
				context.beginPath();
				context.rect(this.dw, this.dh, w, h);
				context.fill();
				context.restore();
			}

			update() {
				if (this.drawVectorX) {
					// dx
					this.dw += this.velocityDrawX;
					if (this.dw >= this.maxWidth) {
						this.drawVectorX = false;
					}
				} else {
					this.dw -= this.velocityDrawX;
					if (this.dw <= 0) {
						this.drawVectorX = true;
					}
				}

				if (this.drawVectorY) {
					// dy
					this.dh += this.velocityDrawY;
					if (this.dh >= this.maxHeight) {
						this.drawVectorY = false;
					}
				} else {
					this.dh -= this.velocityDrawY;
					if (this.dh <= 0) {
						this.drawVectorY = true;
					}
				}

				if (this.scaleVectorX) {
					// sw
					this.sw += this.velocityScaleX;

					if (this.sw >= this.scaleRangeX) {
						this.scaleVectorX = false;
					}
				} else {
					this.sw -= this.velocityScaleX;
					if (this.sw <= 0) {
						this.scaleVectorX = true;
					}
				}

				if (this.scaleVectorY) {
					// sy
					this.sh += this.velocityScaleY;
					if (this.sh >= this.scaleRangeY) {
						this.scaleVectorY = false;
					}
				} else if (this.scaleVectorY === false) {
					this.sh -= this.velocityScaleY;
					if (this.sh <= 0) {
						this.scaleVectorY = true;
					}
				}
			}
		}

		context.fillStyle = 'white';
		context.fillRect(0, 0, width, height);
		const numb = 12;
		const cx = width / 2;
		const cy = height / 2;
		let x;
		let y;
		const radius = width * 0.3;

		for (let i = 0; i < numb; i++) {
			const slice = utils.degToRad(360 / numb);
			const angle = slice * i;

			x = cx + radius * Math.sin(angle);
			y = cy + radius * Math.cos(angle);

			context.save();
			context.translate(x, y);
			context.rotate(-angle);
			context.fillStyle = 'black';
			context.beginPath();
			context.rect(0, 0, 50, 100);
			context.fill();
			context.restore();
		}
	};
};

canvasSketch(sketch, settings);
