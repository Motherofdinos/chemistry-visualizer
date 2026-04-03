// Atom animation: smoothly moves meshes from current positions to target positions
// Uses easeInOutCubic for natural-looking movement

/**
 * @param {THREE.Mesh[]} meshes - atom meshes to animate
 * @param {THREE.Vector3[]} targets - target world positions (same order as meshes)
 * @param {number} duration - animation duration in ms
 * @param {Function} onComplete - called when animation finishes
 */
export function animateAtoms(meshes, targets, duration, onComplete) {
    const startPositions = meshes.map(m => m.position.clone());
    const startTime = performance.now();

    function tick() {
        const elapsed = performance.now() - startTime;
        const t = Math.min(elapsed / duration, 1);
        const ease = easeInOutCubic(t);

        meshes.forEach((mesh, i) => {
            mesh.position.lerpVectors(startPositions[i], targets[i], ease);
        });

        if (t < 1) {
            requestAnimationFrame(tick);
        } else {
            onComplete?.();
        }
    }

    requestAnimationFrame(tick);
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
