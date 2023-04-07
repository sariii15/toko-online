document.formPembelian.onsubmit = async (event) => {
  event.preventDefault();
  const namaLengkap = document.formPembelian.namaLengkap.value;
  const noHp = document.formPembelian.noHp.value;
  const email = document.formPembelian.email.value;
  const harga = document.formPembelian.harga.value;
  const beliBerapa = document.formPembelian.beliBerapa.value;
  await fetch("/api/tambahpembelian", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      namaLengkap,
      noHp,
      email,
      harga,
      beliBerapa,
    }),
  }).then(async (response) => {
    if (response.ok) {
      alert(await response.text());
      location.href = "../pembayaran/pembayaran.html";
    }
  });
};
