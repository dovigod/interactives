const canvas = document.getElementById('mycanvas');

const ctx = canvas.getContext('2d');



const container = document.getElementById('container');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let audioSource;
let analyser;


const starting = (e) =>{

    const audioContext = new AudioContext();
   


    audio1.play();
    audioSource = audioContext.createMediaElementSource(audio1);
    analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 64;
    const bufferLength = analyser.frequencyBinCount;

    const dataArray  = new Uint8Array(bufferLength);

    const barWidth = canvas.width / bufferLength;
    let barHeight;
    let x = 0;

    const animate = () =>{
        x= 0;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualiser(bufferLength , x ,barWidth, barHeight , dataArray);

        requestAnimationFrame(animate);

    }

    animate();

}

const file = document.getElementById('fileUpload');

container.addEventListener('click', starting);

const handleFile = (e) =>{
    const files = this.file;
    const audio1 = document.getElementById('audio1');
    audio1.src = URL.createObjectURL(files[0]);
    audio1.load();
    audio1.play();

    audioSource = audioContext.createMediaElementSource(audio1);
    analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 64;
    const bufferLength = analyser.frequencyBinCount;

    const dataArray  = new Uint8Array(bufferLength);

    const barWidth = canvas.width / bufferLength;
    let barHeight;
    let x = 0;

    const animate = () =>{
        x= 0;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        analyser.getByteFrequencyData(dataArray);

        for(let i= 0 ; i < bufferLength ; i++){
            barHeight = dataArray[i];
            ctx.fillstyle = 'red';
            ctx.fillRect(x,canvas.height - barHeight , barWidth , barHeight)
            x += barWidth;
        }

        requestAnimationFrame(animate);

    }

    animate();
}
file.addEventListener('change' , handleFile);



const drawVisualiser = (bufferLength, x,barWidth, barHeight , dataArray) =>{

    for(let i = 0 ; i < bufferLength ; i++){
        barHeight = dataArray[i] *2;
        ctx.save();
        ctx.translate(canvas.width/2 , canvas.height/2);
        const red = i * barHeight /30;
        const green = i /2;
        const blue = barHeight;

        ctx.fillstyle = 'white';
        ctx.fillRect(x,canvas.height - barHeight - 30 , barWidth ,15);
        ctx.fillstyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
    
        ctx.fillRect(x,canvas.height - barHeight , barWidth , barHeight);
        x += barWidth;
        }
}