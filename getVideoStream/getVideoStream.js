const videoPlayer = document.querySelector('video#player');

const constraints = {
    video: {
        width: 1280,
        height: 720,
        frameRate: 15,
        facingMode: 'enviroment'
    },
    audio: false,
}

function gotMediaStream(stream) {
    videoPlayer.srcObject = stream;
}

function handleError(error) {
    console.error(error)
}

if (navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia(constraints)
        .then(gotMediaStream)
        .catch(handleError)
}