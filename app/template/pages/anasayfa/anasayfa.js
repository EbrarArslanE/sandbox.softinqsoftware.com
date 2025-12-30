document.addEventListener("DOMContentLoaded", () => {
  kullaniciListele();
  projeListele();
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
