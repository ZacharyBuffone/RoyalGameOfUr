import babylonmp3 from './audio/babylon.mp3';
import stoneonstonemp3 from './audio/stoneonstone.mp3'
import LinkedList from './LinkedList.js'

class SoundManager {
    constructor() {
        this.sounds_playing = new LinkedList();
        this.id_count = 0;
        this.volume = .3;

        this.Sounds = Object.freeze({
            background_music: babylonmp3,
            move_marker: stoneonstonemp3
        })

        //play background music by default
        this.playSound(this.Sounds.background_music, true);

        return;
    }


    playSound(sound, loop) {
        var audio = new Audio(sound);

        if(typeof loop !== "undefined") {
            audio.loop = loop;
        }

        this.sounds_playing.push({
            audio: audio,
            id: this.id_count
        })
        audio.addEventListener('ended', () => {

        });

        audio.volume = this.volume;

        audio.play();

        this.id_count++;
        return this.id_count - 1;
    }


    stopSound(id) {
        for(var i = 0; i < this.sounds_playing.lenght; i++) {
            if(this.sounds_playing.atIndex(i).id === id) {
                this.sounds_playing.atIndex(i).audio.stop();
                this.sounds_playing.removeAtIndex();
            }
        }
    }

}


const soundManager = new SoundManager();
export default soundManager;