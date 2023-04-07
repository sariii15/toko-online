document.formUpdate.onsubmit = async (event) => {
  event.preventDefault();
  const email = document.formUpdate.email.value;
  const password = document.formUpdate.password.value;

  await fetch("/api/update", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(async (response) => {
    if (response.ok) {
      alert(await response.text());
      location.href = "../";
    }
  });
};

document.querySelector(".button-delete").onclick = async (event) => {
  event.preventDefault();
  await fetch("/api/delete", {
    method: "DELETE",
  }).then(async (response) => {
    if (response.ok) {
      alert(await response.text());
      location.href = "../";
    }
  });
};
