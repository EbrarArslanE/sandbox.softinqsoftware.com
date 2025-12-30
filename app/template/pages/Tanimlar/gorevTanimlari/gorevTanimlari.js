document.addEventListener("DOMContentLoaded", gorevListele);

  const modalGorevTanimlari = document.getElementById("modalGorevTanimlari");
  const modalKullaniciTanimlari = document.getElementById("modalKullaniciTanimlari");
  const modalProjeTanimlari = document.getElementById("modalProjeTanimlari");

  function gorevTanimlariModal() {
    modalGorevTanimlari.classList.remove("hidden");
    modalGorevTanimlari.classList.add("show");
  }
  
  function kullaniciTanimlariModal() {
    modalKullaniciTanimlari.classList.remove("hidden");
    modalKullaniciTanimlari.classList.add("show");
  }

  function projeTanimlariModal() {
    modalProjeTanimlari.classList.remove("hidden");
    modalProjeTanimlari.classList.add("show");
  }

  function gorevTanimlariModalKapat() {
    modalGorevTanimlari.classList.remove("show");
    setTimeout(() => modalGorevTanimlari.classList.add("hidden"), 300);
  }

  function kullaniciTanimlariModalKapat() {
    modalKullaniciTanimlari.classList.remove("show");
    setTimeout(() => modalKullaniciTanimlari.classList.add("hidden"), 300);
  }

  function projeTanimlariModalKapat() {
    modalProjeTanimlari.classList.remove("show");
    setTimeout(() => modalProjeTanimlari.classList.add("hidden"), 300);
  }

  async function gorevListele() {
  try {
    const res = await fetch("/gorevler/gorevListele");
    const users = await res.json();

    const tbody = document.getElementById("gorevlerTableBody");
    tbody.innerHTML = "";

    users.forEach((user, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
      <td>${user.e_proje_adi}</td>
      <td>${user.e_gorev_baslik}</td>
        <td>${user.e_atanan_kullanici.e_durum}</td>
        <td>${user.e_olusturan_kullanici}</td>
        <td class="">${new Date(user.e_baslangic_tarihi).toLocaleDateString()}</td>
        <td class="">${user.e_bitis_tarihi ? new Date(user.e_bitis_tarihi).toLocaleDateString() : "-"}</td>
        <td> ${user.e_durum} - ${user.e_oncelik} </td>
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
      `;

      tbody.appendChild(tr);
    });

  } catch (err) {
    console.error("Kullanıcılar alınamadı:", err);
  }
  }

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
      `;

      tbody.appendChild(tr);
    });

  } catch (err) {
    console.error("Kullanıcılar alınamadı:", err);
  }
  }

  async function gorevEkle() {
  // Burada direk modal başlığını değiştir
  const modalHeader = document.getElementById("modal-header");
  if (modalHeader) {
    modalHeader.textContent = "Kullanıcı Ekleme Formu";
  }

  const e_gorev_aciklama      = document.getElementById("e_gorev_aciklama").value;
  const e_atanan_kullanici    = document.getElementById("e_atanan_kullanici").value;
  const e_olusturan_kullanici = document.getElementById("e_olusturan_kullanici").value;
  const e_proje_id            = document.getElementById("e_proje_id").value;
  const e_oncelik             = document.getElementById("e_oncelik").value;
  const e_durum               = document.getElementById("e_durum").value;
  const e_baslangic_tarihi    = document.getElementById("e_baslangic_tarihi").value;
  const e_bitis_tarihi        = document.getElementById("e_bitis_tarihi").value;

  if (!e_ad_soyad || !e_mail || !e_sifre) {
    alert("Ad Soyad, Email ve Şifre zorunlu!");
    return;
  }

  try {
    const res = await fetch("/gorevler/gorevEkle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        e_gorev_aciklama,
        e_atanan_kullanici,
        e_olusturan_kullanici,
        e_proje_id,
        e_oncelik,
        e_durum,
        e_baslangic_tarihi,
        e_bitis_tarihi 
      })
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
    document.getElementById("e_id").value                   =  "";
    document.getElementById("e_gorev_aciklama").value       =  "";
    document.getElementById("e_atanan_kullanici").value     =  "";
    document.getElementById("e_olusturan_kullanici").value  =  "";
    document.getElementById("e_proje_id").value             =  "";
    document.getElementById("e_oncelik").value              =  "";
    document.getElementById("e_durum").value                =  "";
    document.getElementById("e_baslangic_tarihi").value     =  "";
    document.getElementById("e_bitis_tarihi").value         =  "";
  }

  async function kullaniciDuzenle(id) {
    try {
      // Kullanıcıyı getir
      const resUsers = await fetch("/gorevler/gorevListele");
      const gorevler = await resUsers.json();
      const gorev = gorevler.find(u => u._id === id);

      if (!gorev) {
        alert("Kullanıcı bulunamadı!");
        return;
      }

      // Modal başlığını değiştir
     const modalHeader = document.getElementById("modal-header");
      if (modalHeader) {
        modalHeader.textContent = "Kullanıcı Düzenleme Formu";
      }

      // Modal form inputlarını doldur
      document.getElementById("e_id").value                   = gorev._id;
      document.getElementById("e_gorev_aciklama").value       = gorev.e_gorev_aciklama;
      document.getElementById("e_atanan_kullanici").value     = gorev.e_atanan_kullanici;
      document.getElementById("e_olusturan_kullanici").value  = gorev.e_olusturan_kullanici;
      document.getElementById("e_proje_id").value             = gorev.e_proje_id;
      document.getElementById("e_oncelik").value              = gorev.e_oncelik;
      document.getElementById("e_durum").value                = gorev.e_durum;
      document.getElementById("e_baslangic_tarihi").value     = gorev.e_baslangic_tarihi || "";
      document.getElementById("e_bitis_tarihi").value         = gorev.e_bitis_tarihi || "";
      // Modalı aç
      gorevTanimlariModal();

    } catch (err) {
      console.error(err);
      alert("Hata: " + err.message);
    }
  }

  async function kullaniciSil(id) {
    if (!confirm("Bu kullanıcıyı silmek istediğine emin misin?")) return;

    try {
      const res = await fetch(`/gorevler/gorevSil/${id}`, {
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
    const e_gorev_aciklama      = document.getElementById("e_gorev_aciklama").value;
    const e_atanan_kullanici    = document.getElementById("e_atanan_kullanici").value;
    const e_olusturan_kullanici = document.getElementById("e_olusturan_kullanici").value;
    const e_proje_id            = document.getElementById("e_proje_id").value;
    const e_oncelik             = document.getElementById("e_oncelik").value;
    const e_durum               = document.getElementById("e_durum").value;
    const e_baslangic_tarihi    = document.getElementById("e_baslangic_tarihi").value;
    const e_bitis_tarihi        = document.getElementById("e_bitis_tarihi").value;

    if (!e_ad_soyad || !e_mail || (!id && !e_sifre)) {
      // Eğer id yoksa (yeni kullanıcı) şifre zorunlu, düzenlemede zorunlu değil diyelim
      alert("Ad Soyad, Email ve Şifre (yeni kullanıcı için) zorunlu!");
      return;
    }

    try {
      let res;
      if (id) {
        // Düzenleme (PUT)
        const bodyData = {
          e_gorev_aciklama,
          e_atanan_kullanici,
          e_olusturan_kullanici,
          e_proje_id,
          e_oncelik,
          e_durum,
          e_baslangic_tarihi,
          e_bitis_tarihi
          };

        res = await fetch(`/gorevler/gorevDuzenle/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData)
        });
      } else {
        // Yeni kullanıcı ekleme (POST)
        res = await fetch("/gorevler/gorevEkle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            e_gorev_aciklama,
            e_atanan_kullanici,
            e_olusturan_kullanici,
            e_proje_id,
            e_oncelik,
            e_durum,
            e_baslangic_tarihi,
            e_bitis_tarihi
          })
        });
      }

      if (!res.ok) throw new Error(id ? "Güncelleme başarısız!" : "Kullanıcı eklenemedi!");

      alert(id ? "Kullanıcı güncellendi." : "Kullanıcı başarıyla eklendi.");
      temizleForm();
      gorevListele();
      closeModal();

    } catch (err) {
      console.error(err);
      alert("Hata: " + err.message);
    }
  }

