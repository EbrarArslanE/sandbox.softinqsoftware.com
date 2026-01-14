function ytLoad() {
  const link = document.getElementById("ytLink").value;
  const frame = document.getElementById("ytFrame");

  let id;

  if (link.includes("v="))
    id = link.split("v=")[1].split("&")[0];
  else if (link.includes("youtu.be"))
    id = link.split("youtu.be/")[1].split("?")[0];
  else {
    alert("Kanka doğru link ver 😄");
    return;
  }

  frame.src = "https://www.youtube.com/embed/" + id;
}

async function ytSearch() {
  const q = document.getElementById("ytSearch").value.trim();
  const resultBox = document.getElementById("ytResults");

  if (!q) {
    Swal.fire("Kanka boş arama olmaz 😄");
    return;
  }

  try {
    const res = await fetch(`/ourtube/videoAra?q=${encodeURIComponent(q)}`);
    const data = await res.json();

    // Burada data.items yoksa veya boşsa uyar
if (!data.videos || data.videos.length === 0) {
  Swal.fire("Video bulunamadı kanka 😢");
  return;
}


    resultBox.innerHTML = ""; // Temizle

    data.items.forEach(v => {
      // videoId farklı olabilir, onu kontrol edelim:
      const videoId = v.id.videoId || v.id;
      const title = v.snippet.title;
      const thumb = v.snippet.thumbnails?.medium?.url || "";

      const card = document.createElement("div");
      card.className = "video-card";
      card.innerHTML = `
        <img src="${thumb}" alt="${title}">
        <h4>${title}</h4>
      `;

      card.onclick = () => {
        selectVideo(videoId, title);
      };

      resultBox.appendChild(card);
    });
  } catch (err) {
    Swal.fire("Bir hata oluştu kanka, tekrar dene 😕");
    console.error(err);
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
  const frame = document.getElementById("ytFrame");
  frame.src = "https://www.youtube.com/embed/" + videoId;
  Swal.fire(`Kanka seçtin: ${title}`);
}
