fetch("/api/getpembayaran").then((response) => response.json()).then((data) => {
  for(let a = 0; a < data.length; a++) {
    document.formPembayaran.namaLengkap.value = data[a].nama_pembeli;
    document.formPembayaran.noHp.value = data[a].no_hp;
    document.formPembayaran.email.value = data[a].email;
    document.formPembayaran.totalHarga.value = data[a].harga;
  }
});
