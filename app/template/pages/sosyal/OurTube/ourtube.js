  let player;
  let progressInterval;

  function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
      height: "360",
      width: "640",
      videoId: "",
      playerVars: {
        controls: 0,
        modestbranding: 1,
        rel: 0
      },
      events: {
        onReady: () => {
          toastr.success("Player hazır kanka 🚀");
        },
        onStateChange: onPlayerStateChange
      }
    });
  }
  
  function onPlayerStateChange(e) {
    if (e.data === YT.PlayerState.PLAYING) {
      startProgress();
    } else {
      stopProgress();
    }
  }

  function startProgress() {
    stopProgress();
    progressInterval = setInterval(() => {
      const current = player.getCurrentTime();
      const total = player.getDuration();

      if (total > 0) {
        const percent = (current / total) * 100;
        updateProgressBar(percent);
      }
    }, 500);
  }

  function stopProgress() {
    clearInterval(progressInterval);
  }

  function updateProgressBar(percent) {
    const bar = document.getElementById("progressBar");
    if (bar) bar.style.width = percent + "%";
  }

  function ytLoad() {
  const link = document.getElementById("ytLink").value;
  let id;

  if (link.includes("v="))
    id = link.split("v=")[1].split("&")[0];
  else if (link.includes("youtu.be"))
    id = link.split("youtu.be/")[1].split("?")[0];
  else {
    toastr.warning("Kanka doğru link ver 😄");
    return;
  }

  if (!player) {
    toastr.error("Player hazır değil kanka");
    return;
  }

  player.loadVideoById(id);
  toastr.success("Video yüklendi 🔥");
}
 function selectVideo(videoId, title) {
    if (!player) {
      toastr.error("Player hazır değil kanka");
      return;
    }

    player.loadVideoById(videoId);
    toastr.info(`Oynatılıyor: ${title}`);
  }
  function renderQueue(videos) {
  const list = document.getElementById("queueList");
  list.innerHTML = "";

  videos.forEach(v => {
    const item = document.createElement("div");
    item.className = "queue-item";

    item.innerHTML = `
      <img src="${v.thumbnail}">
      <div>
        <h4>${v.title}</h4>
        <p>${v.channel}</p>
      </div>
      <button class="queue-play">
        ▶
      </button>
    `;

    item.querySelector(".queue-play").onclick = () => {
      player.loadVideoById(v.id);
      toastr.info(`Sıradan çalıyor: ${v.title}`);
    };

    list.appendChild(item);
  });
}



