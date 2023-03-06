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
        if (axis < 0){
            reverse = false;
		} else {
            reverse = true;
        }

        if (last.axes[i] != undefined && axis != last.axes[i]) {
            var e = new Event("axis");
            switch(i){
                case(1):
                    e.index = 'glubina';
                    break
                case(3):
                    e.index = 'march';
                    break   
            }
            e.speed = Math.abs(axis);
            e.reverse = reverse;
            last.axes[i] = axis;
            if (e.index){
                window.dispatchEvent(e);
            }                   
        }
        if (last.axes[i] == undefined) {
            last.axes[i] = axis;
        }
    }
};