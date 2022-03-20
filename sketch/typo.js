const canvasSketch = require('canvas-sketch');

const settings = {
	dimensions: [1080, 1080]
};

let manager;
let text = 'A';
let fontSize = 1200;
let fontFamily = 'serif';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
	const cell = 20;
	const cols = Math.floor(width / cell);
	const rows = Math.floor(height / cell);
	const numCells = cols * rows;

	typeContext.width = cols;
	typeContext.height = rows;

	return ({ context, width, height }) => {
		typeContext.fillStyle = 'black';
		typeContext.fillRect(0, 0, cols, rows);

		fontSize = cols;

		typeContext.fillStyle = 'white';
		typeContext.font = fontSize + 'px ' + fontFamily;
		typeContext.textBaseline = 'top';

		const metrics = typeContext.measureText(text);
		const mx = metrics.actualBoundingBoxLeft * -1;
		const my = metrics.actualBoundingBoxAscent * -1;
		const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
		const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

		const tx = (cols - mw) * 0.5 - mx;
		const ty = (rows - mh) * 0.5 - my;
		// console.log(metrics);
		typeContext.save();

		typeContext.translate(tx, ty);
		typeContext.beginPath();
		typeContext.rect(mx, my, mw, mh);
		typeContext.stroke();
		typeContext.fillText(text, 0, 0);
		typeContext.restore();

		const typeData = typeContext.getImageData(0, 0, cols, rows).data;

		context.fillStyle = 'black';
		context.fillRect(0, 0, width, height);

		context.drawImage(typeCanvas, 0, 0);

		for (let i = 0; i < numCells; i++) {
			const col = i % cols;
			const row = Math.floor(i / cols);

			const x = col * cell;
			const y = row * cell;

			const r = typeData[i * 4 + 0];
			const g = typeData[i * 4 + 1];
			const b = typeData[i * 4 + 2];
			const a = typeData[i * 4 + 3];

			const glyph = getGlyph(r);

			context.font = `${cell * 2}px ${fontFamily}`;

			context.fillStyle = `rgba(${r} , ${g} , ${b} , ${a})`;
			context.save();
			context.translate(x, y);
			context.translate(cell * 0.5, cell * 0.5);

			// context.beginPath();
			// context.arc(0, 0, cell * 0.5, 0, 2 * Math.PI);
			// context.fill();

			context.fillText(glyph, 0, 0);

			context.restore();
		}
	};
};

const onKeyUp = (e) => {
	text = e.key.toUpperCase();
	console.log(text);
	manager.render();
};

document.addEventListener('keyup', onKeyUp);

const start = async () => {
	manager = await canvasSketch(sketch, settings);
};

start();
