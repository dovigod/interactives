const cursor = document.getElementById('cursor');


const cb = (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
}
window.addEventListener('mousemove' , cb)