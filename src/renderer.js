var last = {
  buttons: [],
  axes: [],
};

ass = function () {
  var pad = navigator.getGamepads()[0];

  for (i = 0; i < pad.buttons.length; i++) {
    var btn = pad.buttons[i];

    if (last.buttons[i] != undefined) {
      if (btn.pressed != last.buttons[i]) {
        var e = new Event("btn");
        e.index = i;
        e.gamepad = pad;
        e.pressed = btn.pressed;
        last.buttons[i] = btn.pressed;
        window.dispatchEvent(e);
      }
    } else {
      last.buttons[i] = btn.pressed;
    }
  }

  for (i = 0; i < pad.axes.length; i++) {
    var axis = Math.round(pad.axes[i] * 100);
    axis = Math.round(axis / 10) * 10;
    var reverse = false;
    if (axis < 0) {
      reverse = false;
    } else {
      reverse = true;
    }

    if (last.axes[i] != undefined && axis != last.axes[i]) {
      var e = new Event("axis");
      switch (i) {
        case 1:
          e.index = "glubina";
          break;
        case 3:
          e.index = "march";
          break;
      }
      e.speed = Math.abs(axis);
      e.reverse = reverse;
      last.axes[i] = axis;
      if (e.index) {
        window.dispatchEvent(e);
      }
    }
    if (last.axes[i] == undefined) {
      last.axes[i] = axis;
    }
  }
};

const link = "http://raspberrypi.local:8000";
// const link = 'http://127.0.0.1:8000'

window.addEventListener("gamepadconnected", function (e) {
  var div = document.createElement("div");
  div.className = "log warning";
  var namee = `Геймпад для управления подключен`;
  div.innerHTML = `<h4>${namee}</h4>`;
  el = document.getElementById("logs");
  el.prepend(div);

  console.log(
    "Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index,
    e.gamepad.id,
    e.gamepad.buttons.length,
    e.gamepad.axes.length
  );
  setInterval(ass, 80);
});

//document.addEventListener("keypress", function onPress(event) {
//  if (event.key === "w") {
//      on(3, 4, false, false, 50);
//  }
// if (event.key === "s") {
//    off(3, 4);
//  }
//  if (event.key === "c") {
//      on(1, 2, false, false, 50);
//  }
//  if (event.key === "v") {
//    off(1, 2);

//}
//});

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

setInterval(() => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  axios
    .get(link + "/api/telemetry")
    .then(function (response) {
      replaceText("depth", response.data["depth"]);
      replaceText("temp", response.data["temp"]);
    })
    .catch(function (error) {})
    .finally(function () {});
}, 3000);

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
