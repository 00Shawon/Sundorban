// Synthesized Web Audio Ambient Mangrove & Ocean Wave Soundscape
// Zero external mp3/audio file dependencies - 100% reliable and lightweight

let audioCtx = null;
let masterGain = null;
let isAudioRunning = false;
let noiseNode = null;
let lfo = null;

export const toggleAmbientSound = (enable) => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return false;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (enable) {
      if (isAudioRunning && masterGain) {
        masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
        masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 1.5);
        return true;
      }

      // Master Gain
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 2);
      masterGain.connect(audioCtx.destination);

      // Pink Noise Buffer Generation for realistic ocean surf
      const bufferSize = audioCtx.sampleRate * 3;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      noiseNode = audioCtx.createBufferSource();
      noiseNode.buffer = noiseBuffer;
      noiseNode.loop = true;

      // Lowpass Filter for wave swelling
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, audioCtx.currentTime);
      filter.Q.setValueAtTime(3.0, audioCtx.currentTime);

      // LFO for slow tidal swell (6.5 second cycle)
      lfo = audioCtx.createOscillator();
      lfo.frequency.setValueAtTime(0.15, audioCtx.currentTime);
      const lfoGain = audioCtx.createGain();
      lfoGain.gain.setValueAtTime(180, audioCtx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      noiseNode.connect(filter);
      filter.connect(masterGain);

      noiseNode.start();
      lfo.start();
      isAudioRunning = true;
      return true;
    } else {
      if (masterGain && audioCtx) {
        masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
        masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
        setTimeout(() => {
          if (!isAudioRunning && noiseNode) {
            try {
              noiseNode.stop();
              lfo.stop();
            } catch (e) {
              // Ignore if already stopped
            }
          }
        }, 1300);
      }
      isAudioRunning = false;
      return false;
    }
  } catch (err) {
    console.warn('Ambient audio could not start:', err);
    return false;
  }
};

