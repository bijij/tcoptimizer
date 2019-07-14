// Material Types

const Wood = Object.freeze({
    "name": "Wood",
    "stack_limit": 1000
});

const Stone = Object.freeze({
    "name": "Stone",
    "stack_limit": 1000
});

const Metal_Fragements = Object.freeze({
    "name": "Metal Fragments",
    "stack_limit": 1000
});

const High_Quality_Metal = Object.freeze({
    "name": "High Quality Metal",
    "stack_limit": 100
});


const Materials = [
    Wood, Stone, Metal_Fragements, High_Quality_Metal
];

// Stack Object
class Stack {
    constructor(material, count) {
        this.material = material;
        this.count = count || 0;
    }

    static Empty = new Stack(null);
}

// Tool Cupboard Object
class ToolCupboard {
    constructor(decay, slots) {
        this.decay = decay;
        this.slots = slots;
    }

    count_material(material) {
        var count = 0;
        for (var i = 0; i < this.slots.length; i++) {
            var stack = this.slots[i];
            if (stack.material == material) {
                count += stack.count;
            }
        }
        return count;
    }

    decay_time() {
        var decay_times = [];
        for (var i = 0; i < Materials.length; i++) {
            var material = Materials[i];
            if (this.decay[material.name] > 0) {
                decay_times.push(this.count_material(material) / this.decay[material.name]);
            }
        }
        if (decay_times.length == 0) {
            return 0;
        }
        return Math.min(...decay_times) * (24 * 60 * 60);
    }
}