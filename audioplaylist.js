document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var players = document.querySelectorAll('.audioplaylist');

    Array.prototype.forEach.call(players, function (player) {
        var audioPlayer = player.querySelector('audio');
        var playlist = player.querySelector('ul');
        var defaultTrack = player.querySelector('.default-track');
        var activeTrack = null;

        playlist.addEventListener('click', function (event) {
            event.preventDefault();
            activate(event.target.parentNode);
        }, false);

        audioPlayer.addEventListener('ended', function () {
            var nextTrack = activeTrack.nextElementSibling;
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
            var trackLink = track.querySelector('a');
            if (!trackLink) {
                console.error('No track link found.', track);
                return;
            }
            audioPlayer.pause();
            audioPlayer.src = trackLink.href;
            if (activeTrack) {
                activeTrack.classList.remove('active');
            }
            activeTrack = track;
            activeTrack.classList.add('active');
            if (!options.silent) {
                audioPlayer.play();
            }
        }
    });
});
