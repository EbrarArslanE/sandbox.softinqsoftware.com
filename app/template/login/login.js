async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/kullanicilar/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      e_kullanici_adi: username,
      e_sifre: password
    })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  Swal.fire({
    title: "Giriş Başarılı!",
    icon: "success",
    showConfirmButton: false,   
    timer: 1500,                
    timerProgressBar: true
  }).then(() => {
    window.location.href = "/anasayfa";
  });

  console.log(data.user);
}
