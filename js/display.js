var form = document.forms.namedItem("daily_decay");
var tool_cupboard_display = document.querySelector("#tc_display");

function seconds_to_string(seconds) {
    var numdays = Math.floor((seconds % 31536000) / 86400);
    var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
    return numdays + "d " + numhours + "h " + numminutes + "m " + numseconds + "s";
}

function update_display() {
    var optimal_tool_cupboard = optimal_layout(
        form.elements[0].value,
        form.elements[1].value,
        form.elements[2].value,
        form.elements[3].value,
    );

    tool_cupboard_display.innerHTML = null;

    // Display decay time
    decay_time = document.createElement("h3");
    decay_time.appendChild(document.createTextNode(`Decay Time: ${seconds_to_string(optimal_tool_cupboard.decay_time())}`));
    tool_cupboard_display.appendChild(decay_time);

    tool_cupboard_display.appendChild(document.createElement("br"));

    // Display tool cupboard layout
    for (var i = 0; i < optimal_tool_cupboard.slots.length; i++) {
        if (i != 0 && i % 6 == 0) {
            tool_cupboard_display.appendChild(document.createElement("br"));
        }
        var stack = optimal_tool_cupboard.slots[i];
        var material_image = document.createElement("img");
        material_image.setAttribute("class", "tc_img");
        material_image.setAttribute("src", `img/${stack.material.name}.png`);
        tool_cupboard_display.appendChild(material_image);
    }
}

form.addEventListener("change", (event) => {
    if (!form.checkValidity()) {
        form.querySelector("[type=submit]").click();
    } else {
        update_display();
    }
});

const entries = (new URLSearchParams(window.location.search)).entries();
let entry;
while (!(entry = entries.next()).done) {
    const [key, val] = entry.value;
    form.elements[key].value = val;
}

update_display();