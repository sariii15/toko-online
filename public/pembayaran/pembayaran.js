fetch("/api/getpembayaran").then((response) => response.json()).then((data) => {
  document.formPembayaran.namaLengkap.value = data.nama_pembeli;
  document.formPembayaran.noHp.value = data.no_hp;
  document.formPembayaran.email.value = data.email;
  document.formPembayaran.totalHarga.value = data.harga;
  // console.log(data);
});
