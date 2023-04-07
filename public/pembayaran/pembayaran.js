document.formPembayaran.onsubmit = async (event) => {
  event.preventDefault();
  const namaLengkap = document.formPembayaran.namaLengkap.value;
  const noHp = document.formPembayaran.noHp.value;
  const email = document.formPembayaran.email.value;
  const harga = document.formPembayaran.harga.value;
  await fetch("/api/getpembayaran/:id", {
    method: "GET",
    body: JSON.stringify({
        namaLengkap,
        noHp,
        email,
        harga
    })
  }).then(async (response) => {
    const a = document.createElement("p");
    a.textContent = response.nama_lengkap
    console.log(a);

  });
};
