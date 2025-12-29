// Elements
const player = document.getElementById('player');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const replayBtn = document.getElementById('replayBtn');

playBtn.addEventListener('click', () => player.play());
pauseBtn.addEventListener('click', () => player.pause());
replayBtn.addEventListener('click', () => {
  player.currentTime = 0;
  player.play();
});


// State
let photoURL = null;
let audioURL = null;

// Load photo
photoInput?.addEventListener('change', (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    alert('Please upload an image file (jpg, png, etc.).');
    photoInput.value = '';
    return;
  }

  if (photoURL) URL.revokeObjectURL(photoURL);
  photoURL = URL.createObjectURL(file);
  userPhoto.src = photoURL;
  userPhoto.style.opacity = '1';
});

// Load audio
audioInput?.addEventListener('change', (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const isAudio = file.type.startsWith('audio/');
  if (!isAudio) {
    alert('Please upload an audio file (mp3, wav, etc.).');
    audioInput.value = '';
    return;
  }

  if (audioURL) URL.revokeObjectURL(audioURL);
  audioURL = URL.createObjectURL(file);
  player.src = audioURL;
  player.load();
});

// Start the experience (requires a user gesture)
startBtn?.addEventListener('click', async () => {
  // Encourage the song to start after user gesture; browsers block autoplay otherwise.
  if (!player.src) {
    alert('Upload a song to start the magic.');
    return;
  }
  try {
    await player.play();
  } catch (err) {
    // Some browsers still need an explicit tap on play
    console.log('Autoplay blocked, press Play.');
  }
});

// Controls
playBtn?.addEventListener('click', () => player.play());
pauseBtn?.addEventListener('click', () => player.pause());
replayBtn?.addEventListener('click', () => {
  player.currentTime = 0;
  player.play();
});

// Clean up object URLs when leaving the page
window.addEventListener('beforeunload', () => {
  if (photoURL) URL.revokeObjectURL(photoURL);
  if (audioURL) URL.revokeObjectURL(audioURL);
});
startBtn.addEventListener('click', async () => {
  try { await player.play(); } catch {}
});
