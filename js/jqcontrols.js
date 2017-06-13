
// sukuriam dainu masyva pagal ju buvimo vieta
var playList = [
    "media/audio/Wagner-Valhalla.mp3",
    "media/audio/P.Grainger-CountryGardens"
];

$(document).ready(function () {
    $("#playListButton").click(function () {
        // playAudioList(0); // iskviecia sia funkcija 0 masyvo indekse
        $("#playList").slideToggle("slow");
    });
    var myTrack = document.getElementById("myTrack");

    function playAudioList(x) {
        var i = 0;
        myTrack.src = playAudioList[x]; // masyvo indeksas kuri gros
        myTrack.load(); // reikia kai keiciasi src
        myTrack.play();
        myTrack.onended = function () { // kai sugros 1a faila gros likusius
            i++;
            if (i > playList.length)  // kai sugroja paskutini loop per nauja nuo pirmo
                i = 0;
            }
            myTrack.src =playList[i];
            myTrack.load();
            myTrack.play();
        }

});

