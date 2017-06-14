// isskleidzia/sutraukia playlista kai paspaudziam ant mygtuko
$(document).ready(function () {
    $("#playListButton").click(function () {
        $("#playList").slideToggle("slow");
    });

    $('#myTrack').on('ended', function () {
        console.log("groju sekanti");
        current++;
        if (current == len) { // jei paskutine daina baigiasi persoka i pirma is saraso
            current = 0;
            link = playlist.find('a')[0];
        } else {
            link = playlist.find('a')[current];
        }
        groti($(link), audio[0]); // paleidzia grojimo funkcija
    });
});

// playlisto sukurimas, kuria spausime daina, ta paleis
var audio;
var playlist;
var tracks;
var current;

paleistiPlaylist();
function paleistiPlaylist() {
    current = 0;
    audio = $('audio');
    playlist = $('#playList');
    tracks = playlist.find('li a');
    len = tracks.length - 1; // nes nuo 0 pradeda skaiciuot indeksus
    playlist.find('a').click(function (e) {
        e.preventDefault();
        link = $(this);
        current = link.parent().index();
        groti(link, audio[0]); // paleidzia grojimo funkcija
    });
    audio[0].addEventListener('onended', function (e) {
        console.log("groju sekanti");
        current++;
        if (current == len) { // jei paskutine daina baigiasi persoka i pirma is saraso
            current = 0;
            link = playlist.find('a')[0];
        } else {
            link = playlist.find('a')[current];
        }
        groti($(link), audio[0]); // paleidzia grojimo funkcija
    });
}
function groti(link, player) {
    player.src = link.attr('href');
    par = link.parent();
    par.addClass('active').siblings().removeClass('active');
    audio[0].load();
    update();
    audio[0].play();
}


