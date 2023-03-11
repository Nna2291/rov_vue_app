async function downloadImage(imageSrc) {
  const image = await fetch(imageSrc)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)

  const link = document.createElement('a')
  link.href = imageURL

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let currentDate = `${day}-${month}-${year}__${hour}:${minutes}:${seconds}`;

  link.download = `${currentDate}.jpeg`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function on(id1, id2, reverse1, reverse2, speed) {
  axios.post(link + "/api/engine/on", {
    id1: id1,
    id2: id2,
    reverse1: reverse1,
    reverse2: reverse2,
    speed: speed,
  });
}

function off(id1, id2) {
  axios.post(link + "/api/engine/off", {
    id1: id1,
    id2: id2,
  });
}

window.addEventListener("btn", function (e) {
  if (e.index == 7) {
    var div = document.createElement("div");
    if (e.value == 0) {
      div.className = "log error";
      off(1, 2);
      var namee = `КРЕН движение отключено`;
    } else {
      div.className = "log success";
      var namee = `КРЕН движение ${e.value}%`;
      on(1, 2, true, false, e.value);
    }
    div.innerHTML = `<h4>${namee}</h4>`;
    el = document.getElementById("logs");
    el.prepend(div);
  } else if (e.index == 6){
    var div = document.createElement("div");
    if (e.value == 0) {
      div.className = "log error";
      off(1, 2);
      var namee = `КРЕН движение отключено`;
    } else {
      div.className = "log success";
      var namee = `КРЕН движение ${e.value}%`;
      on(1, 2, false, true, e.value);
    }
    div.innerHTML = `<h4>${namee}</h4>`;
    el = document.getElementById("logs");
    el.prepend(div);
  }
  if (e.pressed) {
    switch (e.index) {
      case 0:
        downloadImage('http://raspberrypi.local:8080/?action=snapshot')
        break
      case 3:
        el = document.getElementById("logs");
        el.innerHTML = ''
        break
    }
  }

})

