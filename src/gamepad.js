var last = {
  buttons: [],
  axes: [],
};

ass = function () {
  var pad = navigator.getGamepads()[0];

  for (i = 0; i < pad.buttons.length; i++) {
    var btn = pad.buttons[i];

    var value = Math.round(btn.value * 100);
    value= Math.round(value / 10) * 10;

    if (last.buttons[i] != undefined && value != last.buttons[i]) {
      var e = new Event("btn");
        e.index = i;
        e.gamepad = pad;
        e.pressed = btn.pressed;
        e.value = value;
        last.buttons[i] = value;
        if (value >= 30 || value == 0){
          window.dispatchEvent(e);
        }
    } 
    if (last.buttons[i] == undefined) {
      last.buttons[i] = value;
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
      console.log(i)
      switch (i) {
        case 1:
          e.index = "glubina";
          break;
        case 0:
          e.index = "lag";
          break
        case 3:
          e.index = "march";
          break;
      }
      e.speed = Math.abs(axis);
      e.reverse = reverse;
      last.axes[i] = axis;
      if (e.index && (e.speed >= 30 || e.speed == 0)) {
        window.dispatchEvent(e);
      }
    }
    if (last.axes[i] == undefined) {
      last.axes[i] = axis;
    }
  }
};

const link = "http://raspberrypi.local:8000";




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
    .catch(function (error) { })
    .finally(function () { });
}, 3000);
