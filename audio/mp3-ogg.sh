#! /bin/bash

mplayer -vo null -vc dummy -af resample=44100 -ao pcm:waveheader $1;
oggenc -m 256 audiodump.wav;
mv audiodump.ogg "`basename "$1" .mp3`.ogg";
rm audiodump.wav;
chmod 755 "`basename "$1" .mp3`.ogg";

#ffmpeg -i "$1" -ab $(mplayer -frames 0 -identify "$1" 2>/dev/null | grep -m 1 'ID_AUDIO_BITRATE' | cut -d '=' -f 2) "${1%.mp3}.ogg"