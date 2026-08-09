import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles, Play, Pause, Radio } from 'lucide-react';

export default function LofiSoundscape() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [preset, setPreset] = useState('rain'); // 'rain', 'fire', 'lounge'
  const [grainEnabled, setGrainEnabled] = useState(true);

  const audioCtxRef = useRef(null);
  const noiseNodeRef = useRef(null);
  const gainNodeRef = useRef(null);
  const synthOscsRef = useRef([]);

  // Initialize Web Audio API on first user interaction
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const stopSound = () => {
    if (noiseNodeRef.current) {
      try {
        noiseNodeRef.current.stop();
        noiseNodeRef.current.disconnect();
      } catch (e) {}
      noiseNodeRef.current = null;
    }
    synthOscsRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    synthOscsRef.current = [];
  };

  const startSound = (type) => {
    if (!audioCtxRef.current) return;
    stopSound();

    const ctx = audioCtxRef.current;
    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(volume, ctx.currentTime);
    mainGain.connect(ctx.destination);
    gainNodeRef.current = mainGain;

    // Buffer size for noise generation (2 seconds buffer)
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    if (type === 'rain') {
      // Pink/Brown lowpass filter for gentle mountain rain
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      const subFilter = ctx.createBiquadFilter();
      subFilter.type = 'highpass';
      subFilter.frequency.setValueAtTime(120, ctx.currentTime);

      noise.connect(filter);
      filter.connect(subFilter);
      subFilter.connect(mainGain);
      noise.start();
      noiseNodeRef.current = noise;
    } else if (type === 'fire') {
      // Lowpass + crackle filter for fireplace hearth
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      noise.connect(filter);
      filter.connect(mainGain);
      noise.start();
      noiseNodeRef.current = noise;
    } else {
      // Lo-Fi Lounge: Synthesize warm relaxing C maj7 / Am9 chord ambient pads
      const frequencies = [130.81, 164.81, 196.00, 246.94]; // C3, E3, G3, B3
      frequencies.forEach((freq) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.08, ctx.currentTime);

        // Subtle LFO modulation for warm vinyl wobble vibe
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.25, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(1.2, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        osc.connect(oscGain);
        oscGain.connect(mainGain);
        osc.start();
        synthOscsRef.current.push(osc, lfo);
      });
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  const togglePlay = () => {
    initAudio();
    if (isPlaying) {
      stopSound();
      setIsPlaying(false);
    } else {
      startSound(preset);
      setIsPlaying(true);
    }
  };

  const changePreset = (newPreset) => {
    setPreset(newPreset);
    if (isPlaying) {
      initAudio();
      startSound(newPreset);
    }
  };

  const toggleGrain = () => {
    setGrainEnabled((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.remove('grain-off');
      } else {
        document.documentElement.classList.add('grain-off');
      }
      return next;
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 bg-[#FAF5EE]/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#D9C6B4]/60 shadow-sm text-sm text-[#2C221E]">
      {/* Soundscape Play/Pause button */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause ambient lo-fi soundscape' : 'Play ambient lo-fi soundscape'}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-medium transition-all duration-300 ${
          isPlaying
            ? 'bg-[#C87A53] text-white shadow-md'
            : 'bg-[#EFE8DC] text-[#2C221E] hover:bg-[#E5DBCB]'
        }`}
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4 animate-pulse" />
            <span>Soundscape Playing</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-current ml-0.5" />
            <span>Lo-Fi Soundscape</span>
          </>
        )}
      </button>

      {/* Preset Selector */}
      <div className="hidden sm:flex items-center gap-1 bg-[#EFE8DC] p-1 rounded-full text-xs">
        <button
          onClick={() => changePreset('rain')}
          className={`px-2.5 py-1 rounded-full transition ${
            preset === 'rain' ? 'bg-[#2C221E] text-white' : 'text-[#6B5B52] hover:text-[#2C221E]'
          }`}
          title="Mist & Mountain Rain"
        >
          🌧️ Rain
        </button>
        <button
          onClick={() => changePreset('fire')}
          className={`px-2.5 py-1 rounded-full transition ${
            preset === 'fire' ? 'bg-[#2C221E] text-white' : 'text-[#6B5B52] hover:text-[#2C221E]'
          }`}
          title="Fireside Crackle"
        >
          🔥 Fireplace
        </button>
        <button
          onClick={() => changePreset('lounge')}
          className={`px-2.5 py-1 rounded-full transition ${
            preset === 'lounge' ? 'bg-[#2C221E] text-white' : 'text-[#6B5B52] hover:text-[#2C221E]'
          }`}
          title="Lo-Fi Ambient Chords"
        >
          ☕ Chill
        </button>
      </div>

      {/* Volume Control */}
      {isPlaying && (
        <div className="hidden md:flex items-center gap-2 px-2">
          {volume === 0 ? <VolumeX className="w-4 h-4 text-[#6B5B52]" /> : <Volume2 className="w-4 h-4 text-[#C87A53]" />}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 h-1 bg-[#D9C6B4] rounded-lg appearance-none cursor-pointer accent-[#C87A53]"
            aria-label="Lo-Fi Soundscape Volume"
          />
        </div>
      )}

      {/* Film Grain Toggle */}
      <button
        onClick={toggleGrain}
        aria-label={grainEnabled ? 'Disable Lo-Fi Film Grain texture' : 'Enable Lo-Fi Film Grain texture'}
        className={`p-1.5 rounded-full transition ${
          grainEnabled ? 'bg-[#4A5D4E] text-white' : 'bg-[#EFE8DC] text-[#6B5B52]'
        }`}
        title={grainEnabled ? 'Grain Texture: Enabled' : 'Grain Texture: Disabled'}
      >
        <Sparkles className="w-4 h-4" />
      </button>
    </div>
  );
}
