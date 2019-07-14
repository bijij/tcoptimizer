// Helper Functions

function range(size) {
    return size ? range(size - 1).concat(size - 1) : []
}

function n_permutations(xs, r) {
    if (!r) return [];
    return xs.reduce(function (memo, cur, i) {
        var others = xs.slice(0, i).concat(xs.slice(i + 1)),
            perms = n_permutations(others, r - 1),
            newElms = !perms.length ? [[cur]] :
                perms.map(function (perm) { return [cur].concat(perm) });
        return memo.concat(newElms);
    }, []);
}

function decay(wood, stone, metal_fragements, high_quality_metal) {
    return Object.freeze({
        "Wood": wood || 0,
        "Stone": stone || 0,
        "Metal Fragments": metal_fragements || 0,
        "High Quality Metal": high_quality_metal || 0
    });
}

// Function to determine optimal Tool Cupboard

function optimal_layout(wood, stone, metal_fragements, high_quality_metal) {
    var daily_decay = decay(wood, stone, metal_fragements, high_quality_metal);

    var best_layout = new ToolCupboard(decay(), []);
    permutations = n_permutations(range(6 * 4), Materials.length);
    for (var i = 0; i < permutations.length; i++) {
        var stack_counts = permutations[i];
        if (stack_counts.reduce((a, b) => a + b) == 6 * 4) {
            var slots = [];
            for (var j = 0; j < Materials.length; j++) {
                var material = Materials[j];
                slots = slots.concat(Array(stack_counts[j]).fill(new Stack(material, material.stack_limit)));
            }
            var tool_cupboard = new ToolCupboard(daily_decay, slots);
            if (tool_cupboard.decay_time() > best_layout.decay_time()) {
                best_layout = tool_cupboard;
            }
        }
    }

    return best_layout;
}