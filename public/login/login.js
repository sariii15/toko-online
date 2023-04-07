document.formLogin.onsubmit = async (event) => {
    event.preventDefault();
    const email = document.formLogin.email.value;
    const password = document.formLogin.password.value;
    fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then(async(response) => {
        if(response.ok) {
            alert(await response.text());
            location.href = "../beranda/beranda.html";
        }
        else{
            alert(await response.text());
            location.reload();
        }
    })
};