document.addEventListener("DOMContentLoaded", projeListele);

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

async function projeListele() {
  try {
    const res = await fetch("/projeler/projeListele");
    const users = await res.json();

    const tbody = document.getElementById("projeTableBody");
    tbody.innerHTML = "";

    users.forEach((user, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td class="">${user.e_proje_adi}</td>
        <td class="">${user.e_proje_turu}</td>
        <td class="">${user.e_proje_yetkilisi}</td>
        <td class="">${new Date(user.e_baslangic_tarihi).toLocaleDateString()}</td>
        <td class="">${user.e_bitis_tarihi ? new Date(user.e_bitis_tarihi).toLocaleDateString() : "-"}</td>
        <td class="">${user.e_aciklama}</td>
        <td class="">${user.e_oncelik}</td>
        <td>
          <span class="badge bg-${user.e_durum === "aktif" ? "success" : "warning"}">
            ${user.e_durum}
          </span>
        </td>
        <td>
        <div class="btn-group d-flex flex-row gap-12 w-100">
            <button class="btn-edit w-100" onclick="projeDuzenle('${user._id}')">
                Detay <i class="fas fa-eye"></i>
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
{/* <button class="btn-edit w-50" onclick="projeDuzenle('${user._id}')">
  Düzenle <i class="fas fa-edit"></i>
</button> 
<button class="btn-delete w-50" onclick="projeSil('${user._id}')">
  Sil <i class="fas fa-trash"></i>
</button>
*/}
async function projeEkle() {
  // Burada direk modal başlığını değiştir
  const modalHeader = document.getElementById("modal-header");
  if (modalHeader) {
    modalHeader.textContent = "Proje Ekle";
  }

  const e_proje_adi         = document.getElementById("e_proje_adi").value.trim();
  const e_proje_turu        = document.getElementById("e_proje_turu").value.trim();
  const e_proje_yetkilisi   = document.getElementById("e_proje_yetkilisi").value;
  const e_durum             = document.getElementById("e_durum").value;
  const e_aciklama          = document.getElementById("e_aciklama").value;
  const e_baslangic_tarihi  = document.getElementById("e_baslangic_tarihi").value;
  const e_bitis_tarihi      = document.getElementById("e_bitis_tarihi").value;
  const e_oncelik           = document.getElementById("e_oncelik").value;

  // if (!e_ad_soyad || !e_mail || !e_sifre) {
  //   alert("Ad Soyad, Email ve Şifre zorunlu!");
  //   return;
  // }

  try {
    const res = await fetch("/projeler/projeEkle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        e_proje_adi,
        e_proje_turu,
        e_proje_yetkilisi,
        e_durum, 
        e_aciklama, 
        e_baslangic_tarihi, 
        e_bitis_tarihi, 
        e_oncelik 
       })
    });

    if (!res.ok) throw new Error("Kullanıcı eklenemedi!");

    alert("Kullanıcı başarıyla eklendi.");
    temizleForm();
    projeListele();

  } catch (err) {
    console.error(err);
    alert("Hata oluştu: " + err.message);
  }
}


function temizleForm() {
  document.getElementById("e_proje_adi").value = "";
  document.getElementById("e_proje_turu").value = "";
  document.getElementById("e_proje_yetkilisi").value = "";
  document.getElementById("e_aciklama").value = "";
  document.getElementById("e_baslangic_tarihi").value = "";
  document.getElementById("e_bitis_tarihi").value = "";
  document.getElementById("e_durum").value = "";
  document.getElementById("e_oncelik").value = "";
}


async function projeDuzenle(id) {
  try {
    // Kullanıcıyı getir
    const resUsers = await fetch("/projeler/projeListele");
    const users = await resUsers.json();
    const user = users.find(u => u._id === id);

    if (!user) {
      alert("Kullanıcı bulunamadı!");
      return;
    }

    // Modal başlığını değiştir
    document.getElementById("modal-header").textContent = "Kullanıcı Düzenle";

    // Modal form inputlarını doldur
    document.getElementById("e_id").value = user._id;
    document.getElementById("e_proje_adi").value = user.e_proje_adi;
    document.getElementById("e_proje_turu").value = user.e_proje_turu;
    document.getElementById("e_proje_yetkilisi").value = user.e_proje_yetkilisi || "";
    document.getElementById("e_aciklama").value = user.e_aciklama || "";
    document.getElementById("e_baslangic_tarihi").value = user.e_baslangic_tarihi || "";
    document.getElementById("e_bitis_tarihi").value = user.e_bitis_tarihi || "";
    document.getElementById("e_durum").value = user.e_durum || "";
    document.getElementById("e_oncelik").value = user.e_oncelik || "";
    // Modalı aç
    openModal();

  } catch (err) {
    console.error(err);
    alert("Hata: " + err.message);
  }
}

async function projeSil(id) {
  if (!confirm("Bu kullanıcıyı silmek istediğine emin misin?")) return;

  try {
    const res = await fetch(`/projeler/projeSil/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Silme işlemi başarısız");

    alert("Kullanıcı başarıyla silindi.");
    projeListele(); // Listeyi güncelle
  } catch (err) {
    console.error(err);
    alert("Hata oluştu: " + err.message);
  }
}



async function islemiKaydet() {
  const id = document.getElementById("e_id").value.trim();
  const e_proje_adi         = document.getElementById("e_proje_adi").value.trim();
  const e_proje_turu        = document.getElementById("e_proje_turu").value.trim();
  const e_proje_yetkilisi   = document.getElementById("e_proje_yetkilisi").value;
  const e_durum             = document.getElementById("e_durum").value;
  const e_aciklama          = document.getElementById("e_aciklama").value;
  const e_baslangic_tarihi  = document.getElementById("e_baslangic_tarihi").value;
  const e_bitis_tarihi      = document.getElementById("e_bitis_tarihi").value;
  const e_oncelik           = document.getElementById("e_oncelik").value;
  
  if (!e_proje_adi || !e_proje_turu || !e_proje_yetkilisi) {
    alert("Proje adı, türü ve yetkilisi zorunludur!");
    return;
  }

  try {
    let res;
    if (id) {
      // Düzenleme (PUT)
      const bodyData = { 
        e_proje_adi,
        e_proje_turu,
        e_proje_yetkilisi,
        e_durum,
        e_aciklama,
        e_baslangic_tarihi,
        e_bitis_tarihi,
        e_oncelik
      };

      res = await fetch(`/projeler/projeDuzenle/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
      });
    } else {
      // Yeni kullanıcı ekleme (POST)
      res = await fetch("/projeler/projeEkle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ e_proje_adi, e_proje_turu, e_proje_yetkilisi, e_durum, e_aciklama, e_baslangic_tarihi, e_bitis_tarihi, e_oncelik })
      });
    }

    if (!res.ok) throw new Error(id ? "Güncelleme başarısız!" : "Kullanıcı eklenemedi!");

    alert(id ? "Kullanıcı güncellendi." : "Kullanıcı başarıyla eklendi.");
    temizleForm();
    projeListele();
    closeModal();

  } catch (err) {
    console.error(err);
    alert("Hata: " + err.message);
  }
}

