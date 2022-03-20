const canvasSketch = require('canvas-sketch');
import utils from './utils';
import { random } from 'canvas-sketch-util';

const settings = {
	dimensions: [2000, 2000]
};

const degToRad = (angle) => {
	return (angle / 180) * Math.PI;
};

const data = [];
let cnt = 0;

const arcData = [];

// const animate = () => {
// 	for (let i = 0; i < data.length; i++) {
// 		if (i == 0) {
// 			context.clearRect(0, 0, width, height);
// 		}
// 		data[i].draw();
// 		arcData[i].draw();
// 		data[i].update();
// 		arcData[i].update();
// 	}
// 	requestAnimationFrame(animate);
// };
const sketch = () => {
	return ({ context, width, height }) => {
		class Arcs {
			constructor(x, y, angle, lineWidth, maxArcStart, maxArcTo, maxThick) {
				this.cx = x;
				this.cy = y;
				this.angle = angle;
				this.lineWidth = lineWidth;
				this.maxArcStart = maxArcStart;
				this.maxArcTo = maxArcTo;
				this.maxThick = maxThick;

				this.arcStart = random.range(0, this.maxArcStart);
				this.arcTo = random.range(0, this.maxArcTo);
				this.thickness = random.range(0, this.maxThick);

				this.arcStartVector = true;
				this.arcToVector = true;
				this.thicknessVector = true;

				this.arcStartVelocity = random.range(0.01, 0.04);
				this.arcToVelocity = random.range(0.01, 0.04);
				this.thicknessVelocity = random.range(0.01, 0.04);
			}
			update() {
				if (this.arcStartVector) {
					this.arcStart += this.arcStartVelocity;
					if (this.arcStart >= this.maxArcStart) {
						this.arcStartVector = false;
					}
				} else {
					this.arcStartVector -= this.arcStartVelocity;
					if (this.arcStart <= 0) {
						this.arcStartVector = true;
					}
				}

				if (this.arcToVector) {
					this.arcTo += this.arcToVelocity;
					if (this.arcTo >= this.maxArcTo) {
						this.arcToVector = false;
					}
				} else {
					this.arcToVector -= this.arcToVelocity;
					if (this.arcTo <= 0) {
						this.arcToVector = true;
					}
				}

				if (this.thicknessVector) {
					this.thickness += this.thicknessVelocity;
					if (this.thickness >= this.maxThick) {
						this.thicknessVector = false;
					}
				} else {
					this.thicknessVector -= this.thicknessVelocity;
					if (this.thickness <= 0) {
						this.thicknessVector = true;
					}
				}
			}

			draw() {
				context.save();
				context.translate(this.cx, this.cy);
				context.rotate(-this.angle);
				context.lineWidth = this.lineWidth;
				context.beginPath();
				context.arc(0, 0, this.arcStart, this.arcTo, this.thickness);
				context.stroke();
				context.restore();
			}
		}
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

				if (cnt <= 100) {
					cnt += 1;
					console.log(this.dw);
				}
			}
		}
		const animate = () => {
			for (let i = 0; i < data.length; i++) {
				if (i == 0) {
					context.clearRect(0, 0, width, height);
				}
				data[i].draw();
				//arcData[i].draw();
				data[i].update();
				// arcData[i].update();
			}
			requestAnimationFrame(animate);
		};

		context.fillStyle = 'white';
		context.fillRect(0, 0, width, height);

		context.fillStyle = 'black';

		const cx = width * 0.5;
		const cy = height * 0.5;
		const w = width * 0.01;
		const h = height * 0.1;
		let x, y;

		const radius = width * 0.3;
		const center = {
			x: width / 2,
			y: height / 2
		};

		const num = 20;

		for (let i = 0; i < num; i++) {
			const slice = utils.degToRad(360 / num);
			const angle = slice * i;

			x = cx + radius * Math.sin(angle);
			y = cy + radius * Math.cos(angle);

			// context.save();
			// context.translate(x, y);
			// context.rotate(-angle);
			// context.scale(utils.randomRange(0.1, 2), utils.randomRange(0.2, 0.5));

			// context.beginPath();
			// context.rect(-w * 0.5, utils.randomRange(0, -h / 2), w, h);
			// context.fill();
			// context.restore();

			// context.save();

			// context.translate(cx, cy);
			// context.rotate(-angle);

			// context.lineWidth = utils.randomRange(5, 20);
			// context.beginPath();
			// context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(1, -8), slice * random.range(1, 5));
			// context.stroke();
			// context.restore();

			//(x, y, angle, lineWidth, maxArcStart, maxArcTo, maxThick)

			const Arc = new Arcs(
				cx,
				cy,
				angle,
				utils.randomRange(5, 20),
				radius * random.range(0.7, 1.3),
				slice * random.range(1, -8),
				slice * random.range(1, 5)
			);

			const vertical = new Verticals(
				angle,
				-w * 0.5,
				utils.randomRange(0, -h / 2),
				x,
				y,
				utils.randomRange(0.1, 2),
				utils.randomRange(0.2, 0.5)
			);

			//arcData.push(Arc);
			data.push(vertical);
		}

		animate();
	};
};

canvasSketch(sketch, settings);
