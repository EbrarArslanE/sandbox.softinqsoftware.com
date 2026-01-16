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
}

async function ytSearch() {
  const input = document.getElementById("ytSearch");
  const resultBox = document.getElementById("ytResults");

  const q = input.value.trim();

  if (!q) {
    toastr.warning("Kanka boş arama olmaz 😄");
    return;
  }

  try {
    const res = await fetch(`/ourtube/videoAra?q=${encodeURIComponent(q)}`);
    const data = await res.json();

    console.log("YT RAW:", data);

    if (!data.success || !Array.isArray(data.items)) {
      toastr.info("Video bulunamadı kanka 😢");
      return;
    }

    resultBox.innerHTML = "";

    data.items.forEach(v => {
      const videoId = v.id.videoId;
      const title = v.snippet.title;
      const thumb = v.snippet.thumbnails.medium.url;

      const card = document.createElement("div");
      card.className = "video-card";

      card.innerHTML = `
        <img src="${thumb}" alt="${title}">
        <h4>${title}</h4>
      `;

      card.onclick = () => selectVideo(videoId, title);
      resultBox.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    toastr.error("Bir hata oluştu kanka 😕");
  }
}



function renderQueue(videos) {
  const list = document.getElementById("queueList");
  list.innerHTML = "";

  videos.forEach(v => {
    const item = document.createElement("div");
    item.className = "queue-item";

    item.innerHTML = `
      <img src="${v.thumbnail}" alt="${v.title}">
      <div>
        <h4>${v.title}</h4>
        <p>${v.channel}</p>
      </div>
      <button class="queue-play">
        <i class="fa-solid fa-play"></i>
      </button>
    `;

    item.querySelector(".queue-play").onclick = () => {
      document.getElementById("ytFrame").src =
        "https://www.youtube.com/embed/" + v.id;
    };

    list.appendChild(item);
  });
}

// Video seçildiğinde çalışan fonksiyon, örnek olarak ekledim
function selectVideo(videoId, title) {
  if (!player) return;

  player.loadVideoById(videoId);
  Swal.fire(`Kanka seçtin: ${title}`);
}

