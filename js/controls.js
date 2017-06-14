var myTrack = document.getElementById('myTrack');
var playButton = document.getElementById('playButton');
var muteButton = document.getElementById('muteButton');

var duration = document.getElementById('fullDuration');
var currentTime = document.getElementById('currentTime');

/* laiko kintamieji pasiverciam sekundes i (minutes ir sekundes) */
var minutes = parseInt(myTrack.duration / 60);
var seconds = pad(parseInt(myTrack.duration % 60));
/* papildomai dar suformatuojam 01 02 ... */
duration.innerHTML = minutes + ':' + seconds;

/* audio juostos kintamieji */
var barSize = 640;
/* kai stilizuosim audio player nepamirst cia pikseliu pakeist */
var bar = document.getElementById('defaultBar');
var progressBar = document.getElementById('progressBar');

/* pridedam 'pasiklausimus' kada paspaudziami mygtukai ar audio juosta */
playButton.addEventListener('click', playOrPause, false);
muteButton.addEventListener('click', muteOrUnmute, false);
bar.addEventListener('click', clickedBar, false);

function playOrPause() { /* paleis/sustabdys takeli kai spausime play mygtuka ir pakeis ikona atitinkamai*/
    if (!myTrack.paused && !myTrack.ended) {
        myTrack.pause();
        playButton.style.backgroundImage = 'url("/img/play.png")';
        window.clearInterval(updateTime);
        /* sustabdo laiko atnaujinima */
    } else {
        myTrack.play();
        playButton.style.backgroundImage = 'url("/img/pause.png")';
        updateTime = setInterval(update, 500);
        /* 500 yra milisekundes */
        /* iskviecia funkcija update kad atnaujintu laika */
    }
}

function muteOrUnmute() { /* toggle garso mygtukas */
    if (myTrack.muted) {
        myTrack.muted = false;
        muteButton.style.backgroundImage = 'url("/img/speaker.png")';
    } else {
        myTrack.muted = true;
        muteButton.style.backgroundImage = 'url("/img/muted.png")';
    }
}

function update() { /*atnaujina laika dabartini */
    if (!myTrack.ended) {
        /* isivedam kintamuosius kad normaliai atvaizduotu minutes ir sekundes laiko atnaujinime */
        var playedMinutes = parseInt(myTrack.currentTime / 60);
        var playedSeconds = pad(parseInt(myTrack.currentTime % 60));
        /* pad apgaubiame, kad suformatuotu 01 02 .. */
        currentTime.innerHTML = playedMinutes + ':' + playedSeconds;
        /* apskaiciuojam audio juostos uzsipildymo dydi procentaliai grojimo metu */
        var size = parseInt(myTrack.currentTime * barSize / myTrack.duration);
        progressBar.style.width = size + "px";
        /* px kad CSS suprastu */
    } else {
        currentTime.innerHTML = "0.00";
        /* nustato kad pasibaigus trackui laikas griztu i 0.00 */
        playButton.style.backgroundImage = 'url("/img/play.png")';
        /*ir pasikeistu is pauses i play buttonas */
        progressBar.style.width = "0px";
        /* baigus groti audio juostos uzsipildymo plotis bus 0 kad CSS suprastu */
        window.clearInterval(updateTime);
        /* ir sustabdom laiko atnaujinima */
    }
}
/* paspaudus ant audio juostos iskvieciama si funkcija kuri permes i tam tikra dainos laika */
function clickedBar(e) {
    if (!myTrack.ended) {
        var mouseX = e.pageX - bar.offsetLeft;
        /* prisiskiriam X asy kur paspaudem i kintamaji */
        var newTime = mouseX * myTrack.duration / barSize;
        /* apskaiciuojam i kuri laika persokam procentaliai; */
        myTrack.currentTime = newTime;
        /* atnaujinam laika */
        progressBar.style.width = mouseX + "px";
        /*ir progress juostos padeti */
    }
}

/* si funkcija suformatuoja sekundes po minuciu ne 1,2,3, o 01 02 03 */
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}
