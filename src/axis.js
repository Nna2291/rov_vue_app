window.addEventListener("axis", function (e) {
    console.log(e.index, e.speed, e.reverse);
    switch (e.index) {
      case "lag":
        var namee = "МАРШ";
        var id1 = 4;
        var id2 = 6;
        break;
      case "glubina":
        var namee = "ГЛУБИНА";
        var id1 = 1;
        var id2 = 2;
        break;
      case "march":
        var namee = "МАРШ";
        var id1 = 5;
        var id2 = 4;
        break;
    }
    var div = document.createElement("div");
    if (e.speed == 0) {
      div.className = "log error";
      off(id1, id2);
      var namee = `${namee} движение отключено`;
    } else {
      div.className = "log success";
      var namee = `${namee} движение ${e.speed}%`;
      on(id1, id2, e.reverse, e.reverse, e.speed);
    }
  
    div.innerHTML = `<h4>${namee}</h4>`;
    el = document.getElementById("logs");
    el.prepend(div);
  });
  
  
  
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
  
  function on_test(id1, reverse1, speed) {
    axios.post(link + "/api/engine/on", {
      id1: id1,
      reverse1: reverse1,
      speed: speed,
    });
  }
  