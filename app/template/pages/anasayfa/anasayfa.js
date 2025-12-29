document.addEventListener("DOMContentLoaded", loadUsers);

async function loadUsers() {
  try {
    const res = await fetch("/kullanicilar/kullaniciListele");
    const users = await res.json();

    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = "";

    users.forEach((user, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${user.e_ad_soyad}</td>
        <td>${user.e_mail}</td>
        <td>
          <span class="badge bg-${user.e_rol === "admin" ? "danger" : "secondary"}">
            ${user.e_rol}
          </span>
        </td>
        <td>
          <span class="badge bg-${user.e_durum === "aktif" ? "success" : "warning"}">
            ${user.e_durum}
          </span>
        </td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="editUser('${user._id}')">
            Düzenle
          </button>
          <button class="btn btn-sm btn-danger" onclick="deleteUser('${user._id}')">
            Sil
          </button>
        </td>
      `;

      tbody.appendChild(tr);
    });

  } catch (err) {
    console.error("Kullanıcılar alınamadı:", err);
  }
}