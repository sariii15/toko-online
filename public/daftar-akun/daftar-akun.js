document.formDaftar.onsubmit = async (event) => {
    event.preventDefault();
    const namaLengkap = document.formDaftar.namaLengkap.value;
    const email = document.formDaftar.email.value;
    const password = document.formDaftar.password.value;

    await fetch("/api/daftarakun", {
        method: "POST",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            namaLengkap,
            email,
            password
        })
    }).then(async(response) => {
        if(response.ok) {
            alert(await response.text());
            location.href = "../"
        }
    });
};