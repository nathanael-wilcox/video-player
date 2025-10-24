const progress = document.querySelector('.progress');
const skipper = document.querySelector('.skipper');
const bar = document.querySelector('.bar');
const popup = document.querySelector('.popup');

const video = document.getElementById('video');
const videoImg = document.getElementById('videoImg');

const muteBtn = document.getElementById('mute');
const unmuteBtn = document.getElementById('unmute');

const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');

const upSpeedBtn = document.getElementById('upSpeed');
const downSpeedBtn = document.getElementById('downSpeed');
const speedDisplay = document.getElementById('speed');

const upSkipBtn = document.getElementById('upSkip');
const downSkipBtn = document.getElementById('downSkip');
const skipDisplay = document.getElementById('skip');

const fullscreenBtn = document.getElementById("fullscreen");
const smallscreenBtn = document.getElementById("smallscreen");

let skipSpeed = 10;

function changeButtonState() {
    if (video.paused || video.ended) {
        playBtn.classList.remove('hidden');
        pauseBtn.classList.add('hidden');
    } else {
        pauseBtn.classList.remove('hidden');
        playBtn.classList.add('hidden');
    }
}

function timeUpdate(e) {
    if (e.offsetX) {
        video.currentTime = e.offsetX/document.querySelector('.progress').clientWidth*video.duration;
    }
    bar.style.width = document.querySelector('.progress').clientWidth*video.currentTime/video.duration + 'px';
    document.querySelector('.current-time').innerText = `${Math.floor(video.currentTime/60)}:${Math.floor(video.currentTime).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`;
}

function setVideo(e) {
    e.offsetX > 90 ? e.offsetX < video.clientWidth - videoImg.clientWidth + 90 ? videoImg.style.left = (e.offsetX - 90) + 'px' : videoImg.style.left = (video.clientWidth - videoImg.clientWidth) + 'px' : videoImg.style.left = '0px';
    document.querySelector('.frame-video').currentTime = skipper.clientWidth/document.querySelector('.progress').clientWidth*video.duration;
}

bar.style.width = '0px';

let drag = false;

video.onloadedmetadata = function() {
    document.querySelector('.full-time').innerText = `${Math.floor(video.duration/60)}:${Math.floor(video.duration).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`;
}

video.addEventListener('play', () => {
    changeButtonState();
});

video.addEventListener('pause', () => {
    changeButtonState();
});

video.addEventListener('timeupdate', () => {
    timeUpdate(false)
})

playBtn.addEventListener('click', () => {
    video.play();
});

pauseBtn.addEventListener('click', () => {
    video.pause();
});

muteBtn.addEventListener('click', () => {
    video.volume = 0;
    unmuteBtn.classList.remove('hidden');
    muteBtn.classList.add('hidden');
    document.querySelector('.volume-ball').style.right = '80px';
})

unmuteBtn.addEventListener('click', () => {
    video.volume = 1;
    muteBtn.classList.remove('hidden');
    unmuteBtn.classList.add('hidden');
    document.querySelector('.volume-ball').style.right = '0px'
})

progress.addEventListener('mousedown', (e) => {
    drag = true;
    timeUpdate(e);
});

progress.addEventListener('mousemove', (e) => {
    skipper.style.width = e.offsetX + 'px';
    if (drag) {
        timeUpdate(e);
    }
    setVideo(e);
});

document.addEventListener('mouseup', (e) => {
    drag = false;
});

popup.addEventListener('mousedown', (e) => {
    drag = true;
    e.offsetX > 18 ? e.offsetX < 90 ? document.querySelector('.volume-ball').style.right = (90-e.offsetX) + 'px' : document.querySelector('.volume-ball').style.right = '0px' : document.querySelector('.volume-ball').style.right = '80px';
    video.volume = 1 - Number(document.querySelector('.volume-ball').style.right.slice(0,-2)) * .0125;
    if (video.volume == 0) {
        unmuteBtn.classList.remove('hidden');
        muteBtn.classList.add('hidden');
    } else {
        muteBtn.classList.remove('hidden');
        unmuteBtn.classList.add('hidden');
    }
});

popup.addEventListener('mousemove', (e) => {
    if (drag) {
        e.offsetX > 18 ? e.offsetX < 90 ? document.querySelector('.volume-ball').style.right = (90-e.offsetX) + 'px' : document.querySelector('.volume-ball').style.right = '0px' : document.querySelector('.volume-ball').style.right = '80px';
        video.volume = 1 - Number(document.querySelector('.volume-ball').style.right.slice(0,-2)) * .0125;
    }
    if (video.volume == 0) {
        unmuteBtn.classList.remove('hidden');
        muteBtn.classList.add('hidden');
    } else {
        muteBtn.classList.remove('hidden');
        unmuteBtn.classList.add('hidden');
    }
});

fullscreenBtn.addEventListener('click', () => {
    if (document.querySelector(".video").requestFullscreen) {
        document.querySelector(".video").requestFullscreen();
        smallscreenBtn.classList.remove('hidden');
        fullscreenBtn.classList.add('hidden');
    } else if (document.querySelector(".video").webkitRequestFullscreen) {
        document.querySelector(".video").webkitRequestFullscreen();
        smallscreenBtn.classList.remove('hidden');
        fullscreenBtn.classList.add('hidden');
    } else if (document.querySelector(".video").msRequestFullscreen) {
        document.querySelector(".video").msRequestFullscreen();
        smallscreenBtn.classList.remove('hidden');
        fullscreenBtn.classList.add('hidden');
    }
})

smallscreenBtn.addEventListener('click', () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
        fullscreenBtn.classList.remove('hidden');
        smallscreenBtn.classList.add('hidden');
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        fullscreenBtn.classList.remove('hidden');
        smallscreenBtn.classList.add('hidden');
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        fullscreenBtn.classList.remove('hidden');
        smallscreenBtn.classList.add('hidden');
    }
})

upSpeedBtn.addEventListener('click', () => {
    if (video.playbackRate < 2.5) {
        video.playbackRate += 0.5;
        speedDisplay.innerText = video.playbackRate;
    }
})

downSpeedBtn.addEventListener('click', () => {
    if (video.playbackRate > 0.5) {
        video.playbackRate -= 0.5;
        speedDisplay.innerText = video.playbackRate;
    }
})

upSkipBtn.addEventListener('click', () => {
    if (skipSpeed < 30) {
        skipSpeed += 5;
        skipDisplay.innerText = skipSpeed;
    }
})

downSkipBtn.addEventListener('click', () => {
    if (skipSpeed > 5) {
        skipSpeed -= 5;
        skipDisplay.innerText = skipSpeed;
    }
})

document.addEventListener('keydown', (e) => {
    if (e.key == ' ') {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    } else if (e.key == 'ArrowLeft') {
        video.currentTime -= skipSpeed;
        timeUpdate();
    } else if (e.key == 'ArrowRight') {
        video.currentTime += skipSpeed;
        timeUpdate();
    }
})

window.onresize = timeUpdate;