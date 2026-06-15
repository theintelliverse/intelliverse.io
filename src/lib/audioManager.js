"use client";

// ===========================================================================
//  🎵 AUDIO MANAGER - Sound Maker (Generates sounds with code!)
//
//  This script makes sound effects and background music directly in your browser.
//  It does NOT load any MP3 or WAV files. Instead, it uses code to create sounds from scratch.
//
//  What it does:
//  - Evolving Music: A peaceful, cinematic chord progression that plays in the background.
//  - Hover Sound: A quick, glass-like chime when you hover over things.
//  - Click Sound: A crisp, realistic click when you press buttons.
//  - Transition: A sweeping sound when moving between pages.
//  - Scroll Sweep: A gentle wind sound when scrolling.
//  - Boot Sound: A massive, deep movie-theater style sound when the site loads.
//  - Chat Sound: A double-chirp notification when a chat message arrives.
// ===========================================================================

class AudioManager {
  constructor() {
    this.ctx = null;               // This is the "audio engine" provided by the browser (AudioContext)
    this.ambientNodes = [];        // Keeps track of music nodes so we can stop or change them later
    this.muted = true;            // True if the user wants silence, False if they want sound
    this.initialized = false;      // Keeps track of whether the audio engine has started up yet
    this.masterGain = null;        // The master volume knob (affects all music and sound effects)
    this.ambientGain = null;       // The music volume knob (only affects background music)
    this.sfxGain = null;           // The sound effects volume knob (only affects clicks and hovers)
    this.reverbNode = null;        // An effect that adds echo, making sounds feel like they are in a big room
    this.reverbGain = null;        // Controls how much of that big room echo you hear
    this.delayNode = null;         // An effect that repeats sounds (like an echo in the mountains)
    this.delayGain = null;         // Controls how loud the repeated echoes are
    this.lastScrollSweepTime = 0;  // Keeps track of when we last played the scroll sound so it doesn't play too often

    // Background music state
    this.chordInterval = null;     // A timer that switches chords every few seconds
    this.padOscs = [];            // The sound generators (oscillators) playing the background music
    this.padPanners = [];          // Panners that distribute the music to left and right speakers
    this.currentChordIndex = 0;    // Keeps track of which chord in the music list is currently playing
  }

  // ─── START THE AUDIO ENGINE ────────────────────────────────────────────
  // We call this function on the first user interaction (like clicking, scrolling, or pressing a key)
  // because browsers block audio from playing automatically before the user interacts with the page.
  init() {
    if (this.initialized || typeof window === "undefined") return;

    try {
      // Get the browser's built-in sound system
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      this.ctx = new AudioContext();

      // ── MASTER GAIN NODE (Master Volume Knob) ──────────────────────────
      // This is the final volume control before sound goes to your speakers.
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0; // Start at 0 volume so it can fade in smoothly
      this.masterGain.connect(this.ctx.destination); // Connect it to the speakers

      // ── MUSIC VOLUME CONTROL ─────────────────────────────────────────────
      // This node controls only the background music volume.
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.value = 0.9; // Set to 90% volume
      this.ambientGain.connect(this.masterGain); // Connect it to the master volume knob

      // ── SOUND EFFECTS VOLUME CONTROL ─────────────────────────────────────
      // This node controls only the volume of clicks, hovers, etc.
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 1.0; // Set to 100% volume
      this.sfxGain.connect(this.masterGain); // Connect it to the master volume knob

      // ── CONVOLUTION STEREO REVERB (Big Room Echo Effect) ───────────────
      // We generate a "space" simulation (reverb) so that sound effects feel deep.
      this.reverbNode = this.createReverb(2.2, 2.5); // 2.2 seconds of echo decay
      this.reverbGain = this.ctx.createGain();
      this.reverbGain.gain.value = 0.35; // Set mix level to 35% wet
      if (this.reverbNode) {
        this.reverbNode.connect(this.reverbGain);
        this.reverbGain.connect(this.masterGain);
      }

      // ── STEREO FEEDBACK DELAY LINE (Mountain Echo Effect) ───────────────
      // This repeats sounds at regular intervals, like a bouncing echo.
      this.delayNode = this.createDelay(0.3, 0.25, 1500); // 0.3s delay time, 25% feedback
      this.delayGain = this.ctx.createGain();
      this.delayGain.gain.value = 0.2; // Set echo volume to 20%
      if (this.delayNode) {
        this.delayNode.connect(this.delayGain);
        this.delayGain.connect(this.masterGain);
      }

      // Build and start the background music
      this.setupCinematicAmbient();
      this.initialized = true;

      // Smoothly fade in the overall sound from silence to full volume over 2.5 seconds
      if (!this.muted) {
        this.masterGain.gain.setTargetAtTime(1.0, this.ctx.currentTime, 0.8);
      }

      // If the browser paused our sound system, tell it to resume playing
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    } catch (e) {
      console.warn("Web Audio API not supported or blocked:", e);
    }
  }

  // ─── SPATIAL AUDIO EFFECTS CREATORS ────────────────────────────────────

  // This function makes a "room echo" (reverb) effect.
  // It does this by creating "white noise" (random static sound) that slowly dies away,
  // making the computer think it's the sound of a large room reflecting sound.
  createReverb(duration = 2.0, decay = 2.0) {
    if (!this.ctx) return null;
    try {
      const sampleRate = this.ctx.sampleRate;
      const length = sampleRate * duration;
      // Create an empty audio buffer (like a blank cassette tape) for left and right speakers
      const impulse = this.ctx.createBuffer(2, length, sampleRate);
      const left = impulse.getChannelData(0);
      const right = impulse.getChannelData(1);

      // Fill the buffer with random noise that fades out exponentially (very quickly at first, then slower)
      for (let i = 0; i < length; i++) {
        const percent = i / length;
        const envelope = Math.pow(1 - percent, decay); // This fades out the sound
        // Generate random static numbers between -1 and 1
        left[i] = (Math.random() * 2 - 1) * envelope;
        right[i] = (Math.random() * 2 - 1) * envelope;
      }

      // The Convolver node takes this noise and blends it with other sounds to create the echo
      const convolver = this.ctx.createConvolver();
      convolver.buffer = impulse;
      return convolver;
    } catch (e) {
      console.warn("Failed to generate custom reverb impulse:", e);
      return null;
    }
  }

  // This function creates an echo effect (like a voice repeating: hello... hello... hello...).
  // It also filters out high-pitched frequencies so each repeat sounds a bit warmer and darker.
  createDelay(delayTime = 0.25, feedback = 0.3, lowpassFreq = 1200) {
    if (!this.ctx) return null;
    try {
      // Create the delay node and set how long to wait before repeating (e.g., 0.25 seconds)
      const delay = this.ctx.createDelay(1.0);
      delay.delayTime.setValueAtTime(delayTime, this.ctx.currentTime);

      // Create a gain knob to control how much of the sound loops back (feedback)
      const feedbackGain = this.ctx.createGain();
      feedbackGain.gain.setValueAtTime(feedback, this.ctx.currentTime);

      // Create a filter to cut off harsh high sounds from the echo repeats
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(lowpassFreq, this.ctx.currentTime);

      // Connect them in a circle: Delay -> Filter -> Feedback Gain -> Back to Delay
      delay.connect(filter);
      filter.connect(feedbackGain);
      feedbackGain.connect(delay);

      return delay;
    } catch (e) {
      console.warn("Failed to generate delay feedback line:", e);
      return null;
    }
  }

  // ─── EVOLVING AMBIENT CINEMATIC PAD ────────────────────────────────────
  // This creates the background music. It has:
  // 1. A low sub-bass hum (like a giant engine idling) to feel modern/futuristic.
  // 2. A 6-note synthesizer chord that slowly changes every 25 seconds.
  // 3. Modulations (wobbles) to make the sound feel alive and breathing.
  setupCinematicAmbient() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // --- SUB-BASS DRONE ENGINE ---
    // A very deep bass note (A1 at 55Hz) that wobbles slowly up and down.
    const subDrone = ctx.createOscillator();
    subDrone.type = "sine"; // sine wave is a clean, pure tone with no buzz
    subDrone.frequency.setValueAtTime(55, now);

    // This LFO (Low Frequency Oscillator) acts like a slow hand turning the pitch knob
    const droneLfo = ctx.createOscillator();
    const droneLfoGain = ctx.createGain();
    droneLfo.frequency.value = 0.05; // Wobbles once every 20 seconds
    droneLfoGain.gain.value = 1.0;   // Wobbles the pitch by 1 Hertz up and down
    droneLfo.connect(droneLfoGain);
    droneLfoGain.connect(subDrone.frequency);
    droneLfo.start();

    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.15; // Set volume very low so it doesn't hurt your ears
    subDrone.connect(droneGain);
    droneGain.connect(this.ambientGain);
    subDrone.start();

    // --- EVOLVING 4-CHORD SYNTHESIZER PAD ---
    // We define four beautiful, wide chords that cycle in a loop.
    // Each chord is a list of frequencies (in Hertz) for 6 notes.
    const chords = [
      [65.41, 98.00, 164.81, 246.94, 293.66, 392.00],   // Chord 1 (Cmaj9)
      [110.00, 164.81, 261.63, 392.00, 493.88, 659.26], // Chord 2 (Am9)
      [87.31, 130.81, 220.00, 329.63, 392.00, 493.88],  // Chord 3 (Fmaj9#11)
      [98.00, 146.83, 196.00, 261.63, 440.00, 587.33]   // Chord 4 (Gsus4 add9)
    ];

    this.currentChordIndex = 0;
    this.padOscs = [];
    this.padPanners = [];

    const firstChord = chords[this.currentChordIndex];
    firstChord.forEach((freq, idx) => {
      // Create a sound generator for each note in the chord
      const osc = ctx.createOscillator();
      // Alternate between a smooth wave (sine) and a flute-like wave (triangle)
      osc.type = idx % 2 === 0 ? "sine" : "triangle";

      // Detune the note slightly (pitch it up or down by a fraction)
      // This makes the sound wider and richer, like multiple instruments playing at once.
      const detune = (Math.random() - 0.5) * 5; // ±2.5 cents
      osc.frequency.setValueAtTime(freq + detune, now);

      // Add a tiny, unique pitch wobble to this specific note
      const wobbleLfo = ctx.createOscillator();
      const wobbleLfoGain = ctx.createGain();
      wobbleLfo.frequency.value = 0.04 + idx * 0.02; // slow, organic wobble speed
      wobbleLfoGain.gain.value = 1.3; // wobble intensity
      wobbleLfo.connect(wobbleLfoGain);
      wobbleLfoGain.connect(osc.frequency);
      wobbleLfo.start();

      // Lower notes are louder, higher notes are softer to sound balanced
      const voiceGain = ctx.createGain();
      voiceGain.gain.value = [0.28, 0.22, 0.18, 0.15, 0.10, 0.08][idx];

      // Pan notes to different positions (left, right, center) for 3D sound
      const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      if (panner) {
        const panValue = [-0.7, 0.7, -0.3, 0.3, -0.1, 0.1][idx]; // -1 is full left, 1 is full right
        panner.pan.setValueAtTime(panValue, now);

        osc.connect(voiceGain);
        voiceGain.connect(panner);
        panner.connect(this.ambientGain);
        this.padPanners.push(panner);
      } else {
        osc.connect(voiceGain);
        voiceGain.connect(this.ambientGain);
      }

      osc.start();
      this.padOscs.push({ osc, wobbleLfo, detune });
      this.ambientNodes.push(osc, wobbleLfo);
    });

    // Make the entire music volume gently breath/swell up and down over 28 seconds
    const breathLfo = ctx.createOscillator();
    const breathLfoGain = ctx.createGain();
    breathLfo.frequency.value = 0.035; // Very slow cycle
    breathLfoGain.gain.value = 0.2; // Adjust volume by 20%
    breathLfo.connect(breathLfoGain);
    breathLfoGain.connect(this.ambientGain.gain);
    this.ambientGain.gain.value = 0.95;
    breathLfo.start();

    // Shaping Equalizers (EQs) to mold the final sound:
    // Boost warm bass frequencies
    const warmLP = ctx.createBiquadFilter();
    warmLP.type = "lowshelf";
    warmLP.frequency.value = 400;
    warmLP.gain.value = 4.0;

    // Reduce harsh high frequencies to keep it pleasant and ambient
    const airHP = ctx.createBiquadFilter();
    airHP.type = "highshelf";
    airHP.frequency.value = 5000;
    airHP.gain.value = -6.0;

    // Add warmth in the lower-mid frequencies
    const resPeak = ctx.createBiquadFilter();
    resPeak.type = "peaking";
    resPeak.frequency.value = 180;
    resPeak.Q.value = 1.5;
    resPeak.gain.value = 2.0;

    // Connect all the EQs in a chain: Music -> Bass Boost -> Mid Boost -> High Cut -> Speakers
    this.ambientGain.disconnect();
    this.ambientGain.connect(warmLP);
    warmLP.connect(resPeak);
    resPeak.connect(airHP);
    airHP.connect(this.masterGain);

    this.ambientNodes.push(subDrone, droneGain, droneLfo, droneLfoGain, breathLfo, breathLfoGain, warmLP, resPeak, airHP);

    // Automatically transition to the next chord every 25 seconds
    if (this.chordInterval) clearInterval(this.chordInterval);
    this.chordInterval = setInterval(() => {
      if (!this.ctx || this.muted) return;
      this.currentChordIndex = (this.currentChordIndex + 1) % chords.length;
      const nextChord = chords[this.currentChordIndex];
      const t = this.ctx.currentTime;

      // Glide the pitch of each note slowly over 3.5 seconds (like sliding a finger up a guitar string)
      this.padOscs.forEach((item, idx) => {
        item.osc.frequency.setTargetAtTime(nextChord[idx] + item.detune, t, 3.5);
      });
    }, 25000);
  }

  // ─── MUTE / UNMUTE ─────────────────────────────────────────────────────
  // Turns sound on or off. Fades the volume in or out smoothly so it doesn't pop.
  setMute(isMuted) {
    this.muted = isMuted;
    if (!this.initialized) this.init();

    if (this.ctx && this.masterGain) {
      if (this.ctx.state === "suspended") this.ctx.resume();
      const targetGain = this.muted ? 0 : 1;
      // Smoothly fade volume to the target (0 for silence, 1 for full volume) over 0.4 seconds
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.4);
    }
  }

  // Toggles mute state and returns the new status
  toggleMute() {
    this.setMute(!this.muted);
    return this.muted;
  }

  // =====================================================================
  //  🎮 SCI-FI INTERACTIVE SOUND EFFECTS
  // =====================================================================

  // ── HOVER: Futuristic Glass Chime ──────────────────────────────────────
  // Plays a beautiful, glass-like chime when you hover over cards or buttons.
  playHover() {
    if (!this.initialized || this.muted || !this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Part 1: Click sound (very fast, high-pitched noise to simulate physical touch)
      const bufferSize = this.ctx.sampleRate * 0.005; // 5 milliseconds of noise
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1; // fill with static

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = "highpass"; // only keep super high sounds
      noiseFilter.frequency.setValueAtTime(6000, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.06, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.004); // fade out in 4ms

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.sfxGain);
      noise.start(now);

      // Part 2: Chime tone (bell synthesizer sound using two sine waves)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(980, now);
      osc1.frequency.exponentialRampToValueAtTime(1200, now + 0.05); // slide the pitch up
      gain1.gain.setValueAtTime(0.24, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.09); // fade out in 90ms

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(2160, now); // super high harmonic chime
      gain2.gain.setValueAtTime(0.08, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.05); // fades out very quickly

      // Pan to a random stereo position (slightly left or right)
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      const panVal = (Math.random() - 0.5) * 0.4;

      if (panner) {
        panner.pan.setValueAtTime(panVal, now);
        osc1.connect(gain1);
        osc2.connect(gain2);
        gain1.connect(panner);
        gain2.connect(panner);
        panner.connect(this.sfxGain);

        // Send a portion of the sound to the reverb echo chamber
        if (this.reverbNode) {
          const revSend = this.ctx.createGain();
          revSend.gain.setValueAtTime(0.22, now);
          panner.connect(revSend);
          revSend.connect(this.reverbNode);
        }
      } else {
        osc1.connect(gain1);
        osc2.connect(gain2);
        gain1.connect(this.sfxGain);
        gain2.connect(this.sfxGain);

        if (this.reverbNode) {
          const revSend = this.ctx.createGain();
          revSend.gain.setValueAtTime(0.22, now);
          gain1.connect(revSend);
          revSend.connect(this.reverbNode);
        }
      }

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.12);
      osc2.stop(now + 0.08);
    } catch (e) { }
  }

  // ── CLICK: Premium Tactile Button Click ────────────────────────────────
  // Plays a satisfying mechanical click when you click a button.
  playClick() {
    if (!this.initialized || this.muted || !this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Part 1: Bass Thump (gives the click a solid "heavy" feel)
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(130, now);
      subOsc.frequency.exponentialRampToValueAtTime(40, now + 0.06); // drops down to sub bass
      subGain.gain.setValueAtTime(0.45, now);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      subOsc.connect(subGain);
      subGain.connect(this.sfxGain);
      subOsc.start(now);
      subOsc.stop(now + 0.1);

      // Part 2: High Tick (the sharp click sound of a switch)
      const bufSize = this.ctx.sampleRate * 0.004;
      const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = this.ctx.createBufferSource();
      noise.buffer = buf;
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = "bandpass"; // focus on a specific frequency range
      noiseFilter.frequency.setValueAtTime(7500, now);
      noiseFilter.Q.value = 2.0;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.12, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.0035);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.sfxGain);
      noise.start(now);

      // Part 3: Mid-tone Body (resembles the sound of wood or hard plastic knocking)
      const midOsc = this.ctx.createOscillator();
      const midGain = this.ctx.createGain();
      midOsc.type = "triangle";
      midOsc.frequency.setValueAtTime(420, now);
      midGain.gain.setValueAtTime(0.2, now);
      midGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      midOsc.connect(midGain);
      midGain.connect(this.sfxGain);
      midOsc.start(now);
      midOsc.stop(now + 0.04);

      // Connect to the reverb to make it sound like it's clicking in a physical room
      if (this.reverbNode) {
        const revSend = this.ctx.createGain();
        revSend.gain.setValueAtTime(0.18, now);
        midGain.connect(revSend);
        subGain.connect(revSend);
        revSend.connect(this.reverbNode);
      }
    } catch (e) { }
  }

  // ── TRANSITION: Sweeping Cinematic Filter Swell ────────────────────────
  // Plays a sci-fi sweep sound when you switch sections or open menus.
  playTransition() {
    if (!this.initialized || this.muted || !this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const duration = 0.9; // Plays for 0.9 seconds

      // Create a sweeping bandpass filter (opens up from low-pitch to high-pitch)
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + 0.6); // sweep up
      filter.Q.value = 1.2;

      // Control the volume swell (fades in, peaks, then fades out)
      const swellGain = this.ctx.createGain();
      swellGain.gain.setValueAtTime(0.001, now);
      swellGain.gain.linearRampToValueAtTime(0.3, now + 0.4); // swell up to 30% volume
      swellGain.gain.exponentialRampToValueAtTime(0.0001, now + duration); // fade out

      // Pan the sound from Left to Right speaker during the sweep
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      if (panner) {
        panner.pan.setValueAtTime(-0.8, now); // start far left
        panner.pan.linearRampToValueAtTime(0.8, now + 0.6); // sweep to far right
      }

      let dest = this.sfxGain;
      if (panner) {
        swellGain.connect(panner);
        panner.connect(this.sfxGain);
        dest = panner;
      } else {
        swellGain.connect(this.sfxGain);
      }

      // Add reverb to make the swell sound massive
      if (this.reverbNode) {
        const revSend = this.ctx.createGain();
        revSend.gain.setValueAtTime(0.35, now);
        swellGain.connect(revSend);
        revSend.connect(this.reverbNode);
      }

      // Three oscillators detuned slightly (makes a C-major triad chord: C3, G3, D4)
      const freqs = [130.81, 196.00, 293.66];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        osc.type = "sawtooth"; // buzzing synthesizer waveform
        osc.frequency.setValueAtTime(freq + (idx - 1) * 3, now); // detune
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.6); // bend pitch upwards

        osc.connect(filter);
        filter.connect(swellGain);

        osc.start(now);
        osc.stop(now + duration);
      });
    } catch (e) { }
  }

  // ── SCROLL SWEEP: Quiet Atmospheric Wind Whoosh ────────────────────────
  // Plays a subtle wind/air whoosh sound when you scroll down the page.
  // This is rate-limited so it won't play constantly and become annoying.
  playScrollSweep() {
    if (!this.initialized || this.muted || !this.ctx) return;

    const now = this.ctx.currentTime;
    if (now - this.lastScrollSweepTime < 1.5) return; // wait at least 1.5 seconds between sweeps
    this.lastScrollSweepTime = now;

    try {
      // Create a 0.3 second noise buffer (static sound)
      const bufSize = this.ctx.sampleRate * 0.3;
      const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

      const src = this.ctx.createBufferSource();
      src.buffer = buf;

      // Filter sweeps down and up to simulate air moving past your ears
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(250, now);
      filter.frequency.exponentialRampToValueAtTime(1000, now + 0.12);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.28);
      filter.Q.value = 1.0;

      // Soft swell gain (fades in and out quickly)
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      // Sweep the pan direction randomly (either Left-to-Right or Right-to-Left)
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      if (panner) {
        const panDir = Math.random() > 0.5 ? 1 : -1;
        panner.pan.setValueAtTime(-0.6 * panDir, now);
        panner.pan.linearRampToValueAtTime(0.6 * panDir, now + 0.28);

        src.connect(filter);
        filter.connect(gain);
        gain.connect(panner);
        panner.connect(this.sfxGain);
      } else {
        src.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);
      }

      // Add a little reverb to blend it in
      if (this.reverbNode) {
        const revSend = this.ctx.createGain();
        revSend.gain.setValueAtTime(0.12, now);
        gain.connect(revSend);
        revSend.connect(this.reverbNode);
      }

      src.start(now);
    } catch (e) { }
  }

  // ── PRELOADER EXIT: PlayStation/THX-Style Cinematic Boot Sequence ──────
  // Plays a giant, epic sound when the website preloader finishes.
  // It starts with a heavy bass rumble and builds into a beautiful chime cascade.
  playPreloaderExit() {
    if (!this.initialized || this.muted || !this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Part 1: Deep Sub-Bass Rumble (like a spaceship engine booting up)
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(55, now);
      subOsc.frequency.linearRampToValueAtTime(32, now + 2.2); // slides down into sub territory

      subGain.gain.setValueAtTime(0.001, now);
      subGain.gain.linearRampToValueAtTime(0.38, now + 0.8); // swell to 38% volume
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5); // fade out over 2.5s

      subOsc.connect(subGain);
      subGain.connect(this.sfxGain);
      subOsc.start(now);
      subOsc.stop(now + 2.6);

      // Part 2: Cinematic Chord Swell
      const chordFreqs = [65.41, 98.00, 130.81, 196.00, 293.66]; // Triad chord notes
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(100, now);
      filter.frequency.exponentialRampToValueAtTime(3500, now + 1.8); // filter sweeps wide open
      filter.Q.value = 1.5;

      const swellGain = this.ctx.createGain();
      swellGain.gain.setValueAtTime(0.001, now);
      swellGain.gain.linearRampToValueAtTime(0.24, now + 1.2);
      swellGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      filter.connect(swellGain);
      swellGain.connect(this.sfxGain);

      // Send the swell to reverb to make it sound huge and spacious
      if (this.reverbNode) {
        const revSend = this.ctx.createGain();
        revSend.gain.setValueAtTime(0.45, now);
        swellGain.connect(revSend);
        revSend.connect(this.reverbNode);
      }

      chordFreqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        osc.type = "sawtooth";
        const detune = (Math.random() - 0.5) * 4;
        osc.frequency.setValueAtTime(freq + detune, now);
        osc.frequency.linearRampToValueAtTime(freq * 1.01, now + 1.8); // slow pitch drift

        osc.connect(filter);
        osc.start(now);
        osc.stop(now + 2.9);
      });

      // Part 3: Shimmering Bell/Chime Cascade (arpeggio playing from left to right)
      const chimeNotes = [659.26, 783.99, 987.77, 1174.66, 1318.51, 1567.98]; // high chime frequencies
      chimeNotes.forEach((freq, i) => {
        const triggerTime = now + 0.6 + i * 0.12; // stagger the notes by 120 milliseconds

        const chimeOsc = this.ctx.createOscillator();
        const chimeGain = this.ctx.createGain();
        chimeOsc.type = "sine";
        chimeOsc.frequency.setValueAtTime(freq, triggerTime);

        chimeGain.gain.setValueAtTime(0.001, triggerTime);
        chimeGain.gain.linearRampToValueAtTime(0.18 - i * 0.02, triggerTime + 0.02);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, triggerTime + 1.6);

        // Sweep the chime notes across the stereo field (Left to Right)
        const chimePanner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
        if (chimePanner) {
          const panVal = ((i / (chimeNotes.length - 1)) * 2 - 1) * 0.7; // calculate pan position
          chimePanner.pan.setValueAtTime(panVal, triggerTime);

          chimeOsc.connect(chimeGain);
          chimeGain.connect(chimePanner);
          chimePanner.connect(this.sfxGain);

          // Connect to feedback delay for rhythmic echo
          if (this.delayNode) {
            const delaySend = this.ctx.createGain();
            delaySend.gain.setValueAtTime(0.28, triggerTime);
            chimePanner.connect(delaySend);
            delaySend.connect(this.delayNode);
          }
          // Connect to reverb for space
          if (this.reverbNode) {
            const revSend = this.ctx.createGain();
            revSend.gain.setValueAtTime(0.38, triggerTime);
            chimePanner.connect(revSend);
            revSend.connect(this.reverbNode);
          }
        } else {
          chimeOsc.connect(chimeGain);
          chimeGain.connect(this.sfxGain);

          if (this.delayNode) {
            const delaySend = this.ctx.createGain();
            delaySend.gain.setValueAtTime(0.28, triggerTime);
            chimeGain.connect(delaySend);
            delaySend.connect(this.delayNode);
          }
          if (this.reverbNode) {
            const revSend = this.ctx.createGain();
            revSend.gain.setValueAtTime(0.38, triggerTime);
            chimeGain.connect(revSend);
            revSend.connect(this.reverbNode);
          }
        }

        chimeOsc.start(triggerTime);
        chimeOsc.stop(triggerTime + 1.8);
      });
    } catch (e) { }
  }

  // ── CHAT BUBBLE: Cyber Double-Chirp Notification ──────────────────
  // Plays a modern double-chirp notification when a chatbot message is received.
  playChatBubble() {
    if (!this.initialized || this.muted || !this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Chirp 1: quick rising frequency (520Hz to 680Hz)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(520, now);
      osc1.frequency.exponentialRampToValueAtTime(680, now + 0.08);
      gain1.gain.setValueAtTime(0.25, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc1.connect(gain1);
      gain1.connect(this.sfxGain);
      osc1.start(now);
      osc1.stop(now + 0.14);

      // Chirp 2: higher rising frequency (680Hz to 920Hz) playing 90ms later
      const t2 = now + 0.09;
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(680, t2);
      osc2.frequency.exponentialRampToValueAtTime(920, t2 + 0.08);
      gain2.gain.setValueAtTime(0.25, t2);
      gain2.gain.exponentialRampToValueAtTime(0.0001, t2 + 0.16);

      osc2.connect(gain2);
      gain2.connect(this.sfxGain);
      osc2.start(t2);
      osc2.stop(t2 + 0.18);

      // Send both to reverb so they sound spacious
      if (this.reverbNode) {
        const revSend = this.ctx.createGain();
        revSend.gain.setValueAtTime(0.25, now);
        gain1.connect(revSend);
        gain2.connect(revSend);
        revSend.connect(this.reverbNode);
      }
    } catch (e) { }
  }
}

const audioManagerInstance = new AudioManager();
export default audioManagerInstance;
