var audio;
var playlist;
var tracks;
var current;
var len;
var link;
var par;

$(document).ready(function () {
paleistiPlaylist();
function paleistiPlaylist() {
    current = 0;
    audio = $('audio');
    playlist = $('#playList');
    tracks = playlist.find('li a');
    len = tracks.length;
    playlist.find('a').click(function (e) { // kai paspaudziam ant dainos nuorodos playliste
        e.preventDefault();
        link = $(this);
        current = link.parent().index(); // nustato kuris dabartinis indeksas masyve
        groti(link, audio[0]); // paleidzia groti funkcija
    });
    audio[0].addEventListener('ended', function (e) {
        //console.log("groju sekanti");
        current++;
        if (current == len) { // jei paskutine daina baigiasi persoka i pirma is saraso
            current = 0;
            link = playlist.find('a')[0];
        } else {
            link = playlist.find('a')[current];
        }
        groti($(link), audio[0]); // paleidzia groti funkcija
    });

    function groti(link, player) {
        player.src = link.attr('href');
        par = link.parent();
        par.addClass('active').siblings().removeClass('active');
        audio[0].load();
        playOrPause();
        clickedBar();
        audio[0].play();
    }
}

    function toggleGif() {
        if (arPasleptasPlay) {
            $(".gif").fadeOut(3000)
        } else {
            $(".gif").fadeIn(1000);
        }
        arPasleptasPlay = !arPasleptasPlay;
    }

    $("#playListButton").click(function () {
        $("#playList").slideToggle("slow");
    });
    var arPasleptasPlay = false;
    $("#playButton").click(function () {
        toggleGif();
    });
    var arPasleptasMute = false;
    $("#muteButton").click(function () {
        if (arPasleptasMute) {
            $(".gif").show();
        } else {
            $(".gif").hide();
        }
        arPasleptasMute = !arPasleptasMute;
    });
    $("#playList").find('li').click(function () {
        $(".gif").fadeIn(1000);
    });
    // NEVEIKIA ABI FUNKCIJOS
    $("#previousTrack").click(function () {
        link = playlist.find('a')[current];
        if (current == 0) {
            link = link.length;
            groti(link, audio[0]);
        } else {
            groti((link - 1), audio[0]);
        }
    });

    $("#nextTrack").click(function () {
        link = playlist.find('a')[current];
        if (current == link.length) {
            link = 0;
            groti(link, audio[0]);
        } else {
            groti((link + 1), audio[0]);
        }
    });

});


// neatvaizduoja pilno laiko naujai uzkrautoms dainoms iskyrus pirma daina

