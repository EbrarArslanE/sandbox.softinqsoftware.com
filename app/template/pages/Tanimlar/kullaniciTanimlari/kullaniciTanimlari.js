document.addEventListener("DOMContentLoaded", kullaniciListele);

  const modal = document.getElementById("glassModal");

  function openModal() {
    modal.classList.remove("hidden");
    modal.classList.add("show");
  }

  function closeModal() {
    modal.classList.remove("show");
    setTimeout(() => modal.classList.add("hidden"), 300);
  }

  // Opsiyonel: Overlay’e tıklayınca da kapansın
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

async function kullaniciListele() {
  try {
    const res = await fetch("/kullanicilar/kullaniciListele");
    const users = await res.json();

    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = "";

    users.forEach((user, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
      <td>${user.e_kullanici_adi}</td>
        <td>${user.e_ad_soyad}</td>
        <td>${user.e_mail}</td>
        <td>
          <span class="badge bg-${user.e_durum === "aktif" ? "success" : "warning"}">
            ${user.e_durum}
          </span>
        </td>
        <td>
        <div class="btn-group d-flex flex-row gap-12 w-100">
          <button class="btn-edit w-50" onclick="kullaniciDuzenle('${user._id}')">
            Düzenle <i class="fas fa-edit"></i>
          </button>

          <button class="btn-delete w-50" onclick="kullaniciSil('${user._id}')">
            Sil <i class="fas fa-trash"></i>
          </button>
        </div>
        </td>
      `;

      tbody.appendChild(tr);
    });

  } catch (err) {
    console.error("Kullanıcılar alınamadı:", err);
  }
}

async function kullaniciEkle() {
  // Burada direk modal başlığını değiştir
  const modalHeader = document.getElementById("modal-header");
  if (modalHeader) {
    modalHeader.textContent = "Kullanıcı Ekleme Formu";
  }

  const e_ad_soyad = document.getElementById("e_ad_soyad").value.trim();
  const e_mail = document.getElementById("e_mail").value.trim();
  const e_sifre = document.getElementById("e_sifre").value;
  const e_durum = document.getElementById("e_durum").value;
  const e_kullanici_adi = document.getElementById("e_kullanici_adi").value;

  if (!e_ad_soyad || !e_mail || !e_sifre) {
    alert("Ad Soyad, Email ve Şifre zorunlu!");
    return;
  }

  try {
    const res = await fetch("/kullanicilar/kullaniciEkle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ e_ad_soyad, e_mail, e_sifre, e_durum, e_kullanici_adi })
    });

    if (!res.ok) throw new Error("Kullanıcı eklenemedi!");

    alert("Kullanıcı başarıyla eklendi.");
    temizleForm();
    kullaniciListele();

  } catch (err) {
    console.error(err);
    alert("Hata oluştu: " + err.message);
  }
}


function temizleForm() {
  document.getElementById("e_ad_soyad").value = "";
  document.getElementById("e_mail").value = "";
  document.getElementById("e_sifre").value = "";
  document.getElementById("e_durum").value = "";
  document.getElementById("e_kullanici_adi").value = "";
}


async function kullaniciDuzenle(id) {
  try {
    // Kullanıcıyı getir
    const resUsers = await fetch("/kullanicilar/kullaniciListele");
    const users = await resUsers.json();
    const user = users.find(u => u._id === id);

    if (!user) {
      alert("Kullanıcı bulunamadı!");
      return;
    }

    // Modal başlığını değiştir
   const modalHeader = document.getElementById("modal-header");
    if (modalHeader) {
      modalHeader.textContent = "Kullanıcı Düzenleme Formu";
    }

    // Modal form inputlarını doldur
    document.getElementById("e_id").value = user._id;
    document.getElementById("e_ad_soyad").value = user.e_ad_soyad;
    document.getElementById("e_mail").value = user.e_mail;
    document.getElementById("e_kullanici_adi").value = user.e_kullanici_adi || "";
    document.getElementById("e_durum").value = user.e_durum || "";
    document.getElementById("e_sifre").value = ""; // Şifreyi boş bırak, opsiyonel güncelleme

    // Modalı aç
    openModal();

  } catch (err) {
    console.error(err);
    alert("Hata: " + err.message);
  }
}

async function kullaniciSil(id) {
  if (!confirm("Bu kullanıcıyı silmek istediğine emin misin?")) return;

  try {
    const res = await fetch(`/kullanicilar/kullaniciSil/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Silme işlemi başarısız");

    alert("Kullanıcı başarıyla silindi.");
    kullaniciListele(); // Listeyi güncelle
  } catch (err) {
    console.error(err);
    alert("Hata oluştu: " + err.message);
  }
}



async function islemiKaydet() {
  const id = document.getElementById("e_id").value.trim();
  const e_ad_soyad = document.getElementById("e_ad_soyad").value.trim();
  const e_mail = document.getElementById("e_mail").value.trim();
  const e_sifre = document.getElementById("e_sifre").value;
  const e_durum = document.getElementById("e_durum").value;
  const e_kullanici_adi = document.getElementById("e_kullanici_adi").value;

  if (!e_ad_soyad || !e_mail || (!id && !e_sifre)) {
    // Eğer id yoksa (yeni kullanıcı) şifre zorunlu, düzenlemede zorunlu değil diyelim
    alert("Ad Soyad, Email ve Şifre (yeni kullanıcı için) zorunlu!");
    return;
  }

  try {
    let res;
    if (id) {
      // Düzenleme (PUT)
      const bodyData = { e_ad_soyad, e_mail, e_durum, e_kullanici_adi };
      // Şifre güncellemek istersen bodyData'ya e_sifre ekle
      if (e_sifre) bodyData.e_sifre = e_sifre;

      res = await fetch(`/kullanicilar/kullaniciDuzenle/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
      });
    } else {
      // Yeni kullanıcı ekleme (POST)
      res = await fetch("/kullanicilar/kullaniciEkle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ e_ad_soyad, e_mail, e_sifre, e_durum, e_kullanici_adi })
      });
    }

    if (!res.ok) throw new Error(id ? "Güncelleme başarısız!" : "Kullanıcı eklenemedi!");

    alert(id ? "Kullanıcı güncellendi." : "Kullanıcı başarıyla eklendi.");
    temizleForm();
    kullaniciListele();
    closeModal();

  } catch (err) {
    console.error(err);
    alert("Hata: " + err.message);
  }
}

