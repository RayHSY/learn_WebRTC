const playerEL = document.getElementById('player');
const replayerEL = document.getElementById('replayer');
const recordEL = document.getElementById('record');
const playEL = document.getElementById('play');
const downloadEL = document.getElementById('download');

let buffer = [];
let mediaRecorder;

function handleDataAvailable(e) {
    if (e && e.data && e.data.size > 0) {
        buffer.push(e.data);
    }
}

function startRecord() {
    buffer = [];

    // 设置录制下来的多媒体格式
    const options = {
        mimeType: 'video/webm;codecs=vp8',
    }

    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not supported!`);
        return;
    }

    try {
        mediaRecorder = new MediaRecorder(playerEL.srcObject, options);
        mediaRecorder.addEventListener('dataavailable', handleDataAvailable)
        mediaRecorder.start(10);
    } catch(e) {
        console.error(e);
    }
}

function stopRecord() {
    if (mediaRecorder) {
        mediaRecorder.stop();
    }
}

function start() {
    const constraints = {
        video: {
            width: 1280,
            height: 720,
        },
        audio: true,
    };

    try {
        if (navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia(constraints)
                .then((stream) => {
                    playerEL.srcObject = stream;
                })
                .catch((e) => {
                    throw e;
                })
        }

        // 录制
        recordEL.addEventListener('click', () => {
            if (recordEL.textContent === 'start record') {
                startRecord();
                recordEL.textContent = 'stop record';
                playEL.disabled = true;
                downloadEL.disabled = true;
            } else {
                stopRecord();
                recordEL.textContent = 'start record';
                playEL.disabled = false;
                downloadEL.disabled = false;
            }
        })

        // 播放
        playEL.addEventListener('click', () => {
            const blob = new Blob(buffer, { type: 'video/webm' });
            replayerEL.src = window.URL.createObjectURL(blob);
            replayerEL.srcObject = null;
            replayerEL.play();
        })

        // 下载
        downloadEL.addEventListener('click', () => {
            const blob = new Blob(buffer, { type: 'video/webm' });
            const aEL = document.createElement('a');
            aEL.href = window.URL.createObjectURL(blob);
            aEL.download = 'aaa.webm';
            aEL.click();
        })
    } catch(e) {
        console.error(e);
    }
}

start();