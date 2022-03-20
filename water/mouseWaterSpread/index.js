const screen = document.getElementById('background')

const screenSize = {
    width : screen.clientWidth,
    height: screen.clientHeight
}
const div= document.createElement('div');

let index = 2;


const createRippleElement = (number) => {
    const ripple = document.createElement('div')
    ripple.classList.add('wave');
    ripple.classList.add('wave' + number);

    return ripple;
}

const createWaveElement = () => {
    
    console.dir(wave)
    return wave;
}

const removeWave = (idx) => {
    let target =null;
    for(let i = 0 ; i < screen.children.length ; i++){
        if(screen.children[i].classList[1]=== 'water'+idx){
            target = screen.children[i]
            break;
        }
    }
    target.remove();
}
const waveSet = (x, y , idx) => {
    const waveBundle = document.createElement('div');

    const wave = document.createElement('div');

    for(let i = 0 ; i < 6 ; i++){
        wave.appendChild(createRippleElement(i));
    }


    waveBundle.classList.add('waveWrapper');
    waveBundle.classList.add('water'+idx);
    waveBundle.style.zIndex = idx;
    waveBundle.style.top = y+'px';
    waveBundle.style.left = x+'px';
    waveBundle.appendChild(wave);
    return waveBundle
}

const appendWave =  (x, y , idx) => {
    screen.appendChild(waveSet(x,y,idx));
    setTimeout(()=>removeWave(idx) , 3000);
}
const generateRipple =  (e) => {
    e.preventDefault();
    const coordinate = {
        x: e.offsetX,
        y: e.offsetY
    }
    index += 1
    appendWave(coordinate.x, coordinate.y , index);
}





window.onload = () => {
    screen.addEventListener('click' , generateRipple);
}


