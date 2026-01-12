document.addEventListener("DOMContentLoaded", () => {
  kullaniciListele();
  projeListele();
  gorevListele();
});

async function kullaniciListele() {
  try {
    const res = await fetch("/kullanicilar/kullaniciListele");
    const users = await res.json();

    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = "";

    users.forEach((user) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${user.e_kullanici_adi}</td>
        <td>${user.e_ad_soyad}</td>
        <td>${user.e_mail}</td>
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
    const projects = await res.json();

    const tbody = document.getElementById("projeTableBody");
    tbody.innerHTML = "";

    projects.forEach((project) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${project.e_proje_adi}</td>
        <td>${project.e_proje_turu}</td>
        <td>${new Date(project.e_baslangic_tarihi).toLocaleDateString()}</td>
        <td>${project.e_bitis_tarihi ? new Date(project.e_bitis_tarihi).toLocaleDateString() : "-"}</td>
      `;
      tbody.appendChild(tr);
    });

  } catch (err) {
    console.error("Projeler alınamadı:", err);
  }


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
        `;

        tbody.appendChild(tr);
      });

    } catch (err) {
      console.error("Kullanıcılar alınamadı:", err);
    }
  }
