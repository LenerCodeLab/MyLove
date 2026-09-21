import { useEffect, useRef, useState } from "react";
import { content } from "../data/content";

type Props = {
  canPlay: boolean;
};

export function MusicPlayer({ canPlay }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(() => localStorage.getItem("yl.music.playing") === "true");
  const [volume, setVolume] = useState(() => Number(localStorage.getItem("yl.music.volume") ?? "0.42"));

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    localStorage.setItem("yl.music.volume", String(volume));
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !canPlay) return;

    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }

    localStorage.setItem("yl.music.playing", String(playing));
  }, [playing, canPlay]);

  return (
    <div className="music-player">
      <audio ref={audioRef} src={content.song} loop preload="auto" />
      <button type="button" onClick={() => setPlaying((state) => !state)} aria-label={playing ? "Pausar musica" : "Reproducir musica"}>
        {playing ? "♫" : "♪"}
      </button>
      <input aria-label="Volumen" type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => setVolume(Number(event.target.value))} />
    </div>
  );
}
