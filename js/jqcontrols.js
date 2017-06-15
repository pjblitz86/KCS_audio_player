// isskleidzia/sutraukia playlista kai paspaudziam ant mygtuko
$(document).ready(function () {
    $("#playListButton").click(function () {
        $("#playList").slideToggle("slow");
    });
    $("#playButton").click(function () {
        $(".gif").show();
    })


   /*$('#myTrack').on('ended', function () {
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
*/
});

// playlisto sukurimas, kuria spausime daina, ta paleis
var audio;
var playlist;
var tracks;
var current;
var len;
var link;
var par;

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
        update();

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
        update();
    });
}
function groti(link, player) {

    player.src = link.attr('href');
    par = link.parent();
    par.addClass('active').siblings().removeClass('active');
    audio[0].load();
    playOrPause(); update(); clickedBar();
    audio[0].play();

}


// neatvaizduoja pilno laiko naujai uzkrautoms dainoms iskyrus pirma daina

