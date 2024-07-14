const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", async () => {
  try {
    const place_id = document.getElementById("form-place-id").value;
    const lat = document.getElementById("form-lat").value;
    const lng = document.getElementById("form-lng").value;
    const label = document.getElementById("form-label").value;
    const name = document.getElementById("form-name").value;
    const address = document.getElementById("form-address").value;
    const link = document.getElementById("form-link").textContent;
    let response;

    if (label && name && address && link) {
      if (submitButton.textContent == "Add") {
        response = await axios.post(
          `${clientBaseUrl}/place/`,
          JSON.stringify({
            user_id: "1",
            place_id: place_id,
            lat: lat,
            lng: lng,
            label: label,
            name: name,
            address: address,
            link: link,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        response = await axios.patch(
          `${clientBaseUrl}/place/${place_id}`,
          JSON.stringify({
            user_id: "1",
            place_id: place_id,
            lat: lat,
            lng: lng,
            label: label,
            name: name,
            address: address,
            link: link,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (response.status == 200 || response.status == 201) {
        const result = await response;
        alert(`Message: ${result.data.message}`);
        window.location.reload(true);
      }
    } else {
      alert("Please fill out all fields.");
    }
  } catch (error) {
    console.log(error);
    alert(
      `Error: ${
        error.response.data == undefined
          ? "Failed to add. Please try again later."
          : error.response.data.message
      }`
    );
  }
});

document.getElementById("delete-button").addEventListener("click", async () => {
  try {
    const place_id = document.getElementById("form-place-id").value;
    const lat = document.getElementById("form-lat").value;
    const lng = document.getElementById("form-lng").value;
    const label = document.getElementById("form-label").value;
    const name = document.getElementById("form-name").value;
    const address = document.getElementById("form-address").value;
    const link = document.getElementById("form-link").textContent;

    const response = await axios.delete(
      `${clientBaseUrl}/place/${place_id}`,
      JSON.stringify({
        user_id: "1",
        lat: lat,
        lng: lng,
        label: label,
        name: name,
        address: address,
        link: link,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response);

    if (response.status == 200 || response.status == 201) {
      const result = await response;
      alert(`Message: ${result.data.message}`);
      window.location.reload(true);
    }
  } catch (error) {
    // console.log(error);
    alert(
      `Error: ${
        error.response.data == undefined
          ? "Failed to add. Please try again later."
          : error.response.data.message
      }`
    );
  }
});
