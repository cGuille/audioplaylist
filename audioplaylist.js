document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var audioPlayer = document.getElementById('player');
    var playlist = document.getElementById('playlist');
    var defaultTrack = document.querySelector('#default-track a');
    var activeTrack = null;

    playlist.addEventListener('click', function (event) {
        event.preventDefault();
        activate(event.target);
    }, false);

    audioPlayer.addEventListener('ended', function () {
        var nextListItem = activeTrack.parentNode.nextElementSibling;
        var nextTrack = nextListItem ? nextListItem.firstElementChild : null;
        if (nextTrack) {
            activate(nextTrack);
        }
    }, false);

    if (defaultTrack) {
        activate(defaultTrack, { silent: true });
    }

    function activate(track, options) {
        if (!options) {
            options = { silent: false };
        }
        if (track === activeTrack) {
            if (activeTrack && audioPlayer.paused && !options.silent) {
                audioPlayer.play();
            }
            return;
        }
        audioPlayer.pause();
        audioPlayer.src = track.href;
        if (activeTrack) {
            activeTrack.parentNode.classList.remove('active');
        }
        activeTrack = track;
        activeTrack.parentNode.classList.add('active');
        if (!options.silent) {
            audioPlayer.play();
        }
    }
});
