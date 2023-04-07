fetch("/api/history").then(async(response) => response.json()).then((data) => {
    const tbodyHistory = document.querySelector("tbody");
    for(let a = 0; a < data.length; a++) {
        const tr = document.createElement("tr");

        const no = document.createElement("td");
        no.textContent = `${a+1}.`;
        tr.appendChild(no);

        const tdNama = document.createElement("td");
        tdNama.textContent = data[a].nama_pembeli;
        tr.appendChild(tdNama);

        const tdNoHp = document.createElement("td");
        tdNoHp.textContent = data[a].no_hp;
        tr.appendChild(tdNoHp);

        const tdEmail = document.createElement("td");
        tdEmail.textContent = data[a].email;
        tr.appendChild(tdEmail);

        const tdHarga = document.createElement("td");
        tdHarga.textContent = data[a].harga;
        tr.appendChild(tdHarga);

        tbodyHistory.appendChild(tr);
    }
});