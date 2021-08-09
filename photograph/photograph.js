const videoPlayer = document.querySelector('#player');
const canvas = document.querySelector('#picture');
const ctx = canvas.getContext('2d');
const btn = document.querySelector('.take_photo');
const saveBtn = document.querySelector('.save');

const constraints = {
    video: {
        width: 1280,
        height: 720,
        frameRate: 15,
    },
    audio: false,
}

function gotMediaStream(stream) {
    videoPlayer.srcObject = stream;
}

function handleError(err) {
    console.error(err);
}

function takePhoto(e) {
    ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
}

function savePhoto(url) {
    const aElement = document.createElement('a');
    aElement.download = new Date().valueOf();
    aElement.href = url;
    aElement.click();
    aElement.remove();
}

function start() {
    btn.addEventListener('click', takePhoto);
    saveBtn.addEventListener('click', () => {
        const imageUrl = canvas.toDataURL('image/png');
        savePhoto(imageUrl);
    });

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(gotMediaStream)
            .catch(handleError);
    }
}

start();