import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TOPICS, MOLECULES, ATOMS, MOLECULE_INFO } from './reactions.js';
import { THEMES } from './themes.js';
import { animateAtoms } from './animator.js';

let scene, camera, renderer, controls;
let currentMolecules = new THREE.Group();
let selectedReaction = null;
let currentTheme = THEMES.dark;
let currentView = 'reactants'; // track which side is shown
let isAnimating = false;

// ─── Init ────────────────────────────────────────────────────────────────────

function init() {
    const container = document.getElementById('canvas-container');
    document.getElementById('loading-overlay').style.display = 'none';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(currentTheme.sceneBg);

    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 10;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    scene.add(currentMolecules);

    window.addEventListener('resize', onWindowResize);
    setupUI();
    setupRaycasting();
    loop();
}

function onWindowResize() {
    const container = document.getElementById('canvas-container');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function loop() {
    requestAnimationFrame(loop);
    controls.update();
    renderer.render(scene, camera);
}

// ─── Themes ──────────────────────────────────────────────────────────────────

function getAtomColor(type) {
    if (type === 'C') return currentTheme.atomC;
    return ATOMS[type]?.color ?? 0xffffff;
}

function applyTheme(themeId) {
    const theme = THEMES[themeId];
    if (!theme) return;

    currentTheme = theme;
    document.body.dataset.theme = themeId;
    scene.background = new THREE.Color(theme.sceneBg);

    // Refresh displayed molecules with new C color
    if (selectedReaction) renderMolecules(currentView);

    // Update active button
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === themeId);
    });

    // Save preference
    localStorage.setItem('chem-theme', themeId);
}

// ─── UI ──────────────────────────────────────────────────────────────────────

function setupUI() {
    const topicSelect = document.getElementById('topic-select');
    const reactionSelect = document.getElementById('reaction-select');
    const animBtn = document.getElementById('animate-btn');

    // Populate topics
    TOPICS.forEach(topic => {
        const opt = document.createElement('option');
        opt.value = topic.id;
        opt.textContent = topic.title;
        topicSelect.appendChild(opt);
    });

    topicSelect.addEventListener('change', (e) => {
        reactionSelect.innerHTML = '<option value="">-- Оберіть реакцію --</option>';
        const topic = TOPICS.find(t => t.id === e.target.value);
        if (topic) {
            topic.reactions.forEach(r => {
                const opt = document.createElement('option');
                opt.value = r.id;
                opt.textContent = r.title;
                reactionSelect.appendChild(opt);
            });
            reactionSelect.disabled = false;
        } else {
            reactionSelect.disabled = true;
        }
    });

    reactionSelect.addEventListener('change', (e) => {
        const reactionId = e.target.value;
        if (!reactionId) return;
        const topic = TOPICS.find(t => t.reactions.some(r => r.id === reactionId));
        selectedReaction = topic.reactions.find(r => r.id === reactionId);
        updateReactionInfo();
        renderMolecules('reactants');
        currentView = 'reactants';
        hidePopup();
        // Show animate button and speed slider only if mapping exists
        const hasAnim = !!selectedReaction.atomMapping;
        animBtn.style.display = hasAnim ? 'block' : 'none';
        speedControl.style.display = hasAnim ? 'block' : 'none';
    });

    document.getElementById('show-reactants').addEventListener('click', () => {
        if (selectedReaction && !isAnimating) {
            renderMolecules('reactants');
            currentView = 'reactants';
        }
    });

    document.getElementById('show-products').addEventListener('click', () => {
        if (selectedReaction && !isAnimating) {
            renderMolecules('products');
            currentView = 'products';
        }
    });

    animBtn.addEventListener('click', () => {
        if (selectedReaction && !isAnimating) startAnimation();
    });

    // Show speed slider together with animate button
    const speedControl = document.getElementById('speed-control');

    // Theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
    });

    // Restore saved theme
    const saved = localStorage.getItem('chem-theme');
    if (saved && THEMES[saved]) applyTheme(saved);
}

const ATOM_NAMES = {
    H:  'Гідроген',
    O:  'Оксиген',
    C:  'Карбон',
    N:  'Нітроген',
    Na: 'Натрій',
    Mg: 'Магній',
};

function updateReactionInfo() {
    document.getElementById('reaction-title').textContent = selectedReaction.title;
    document.getElementById('reaction-equation').textContent = selectedReaction.equation;
    updateLegend();
}

function updateLegend() {
    // Collect unique atom types from all molecules in this reaction
    const allSubstances = [...selectedReaction.reactants, ...selectedReaction.products];
    const types = new Set();
    allSubstances.forEach(sub => {
        const mol = MOLECULES[sub.formula];
        if (mol) mol.atoms.forEach(a => types.add(a.type));
    });

    const legend = document.getElementById('atom-legend');
    const items = document.getElementById('legend-items');
    items.innerHTML = '';

    types.forEach(type => {
        const info = ATOMS[type];
        if (!info) return;
        // Convert numeric hex color to CSS string
        const hex = '#' + info.color.toString(16).padStart(6, '0');
        const item = document.createElement('div');
        item.className = 'legend-item';
        item.innerHTML = `<span class="legend-dot" style="background:${hex}"></span>${type} — ${ATOM_NAMES[type] ?? type}`;
        items.appendChild(item);
    });

    legend.style.display = 'block';
}

// ─── 3D Molecules ────────────────────────────────────────────────────────────

function createMolecule(formula) {
    const data = MOLECULES[formula];
    if (!data) return new THREE.Group();

    const group = new THREE.Group();
    group.userData.formula = formula;

    const atomMeshes = data.atoms.map(atomData => {
        const info = ATOMS[atomData.type];
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(info.radius, 32, 32),
            new THREE.MeshPhongMaterial({ color: getAtomColor(atomData.type), shininess: 100 })
        );
        mesh.position.set(...atomData.pos);
        mesh.userData.formula = formula; // tag for raycasting
        group.add(mesh);
        return mesh;
    });

    data.bonds.forEach(bond => {
        const start = atomMeshes[bond[0]].position;
        const end = atomMeshes[bond[1]].position;
        const count = bond[2] || 1;
        const dir = new THREE.Vector3().subVectors(end, start);
        const len = dir.length();

        // Single bond: thick, gray. Double: thinner + farther apart, yellow tint. Triple: even thinner + blue tint.
        const radius     = count === 1 ? 0.12 : count === 2 ? 0.07 : 0.06;
        const offsetStep = count === 2 ? 0.35 : 0.28;
        const color      = count === 1 ? 0xcccccc : count === 2 ? 0xdddd99 : 0x99ccff;

        for (let i = 0; i < count; i++) {
            const cyl = new THREE.Mesh(
                new THREE.CylinderGeometry(radius, radius, len, 8),
                new THREE.MeshPhongMaterial({ color })
            );
            cyl.position.addVectors(start, end).multiplyScalar(0.5);
            if (count > 1) {
                const offset = (i - (count - 1) / 2) * offsetStep;
                const perp = new THREE.Vector3(0, 1, 0).cross(dir).normalize().multiplyScalar(offset);
                if (perp.length() === 0) perp.set(1, 0, 0).multiplyScalar(offset);
                cyl.position.add(perp);
            }
            cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
            group.add(cyl);
        }
    });

    return group;
}

function clearMolecules() {
    while (currentMolecules.children.length > 0) {
        currentMolecules.remove(currentMolecules.children[0]);
    }
}

// Returns {x, y} group offset for a molecule instance in the layout grid
function getMoleculeOffset(substances, subIdx, instanceIdx) {
    const xBase = -(substances.length * 4) / 2;
    return {
        x: xBase + instanceIdx * 3,
        y: (subIdx - (substances.length - 1) / 2) * 3,
    };
}

function renderMolecules(type) {
    clearMolecules();
    const substances = selectedReaction[type];

    substances.forEach((sub, idx) => {
        for (let i = 0; i < sub.count; i++) {
            const mol = createMolecule(sub.formula);
            const { x, y } = getMoleculeOffset(substances, idx, i);
            mol.position.set(x, y, 0);
            currentMolecules.add(mol);
        }
    });

    fitCamera();
}

function fitCamera() {
    const box = new THREE.Box3().setFromObject(currentMolecules);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    controls.target.copy(center);
    camera.position.z = Math.max(size.x, size.y) * 1.5 + 5;
}

// ─── Molecule Popup ───────────────────────────────────────────────────────────

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function setupRaycasting() {
    renderer.domElement.addEventListener('click', (e) => {
        if (isAnimating) return;

        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x =  ((e.clientX - rect.left)  / rect.width)  * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        // Collect all atom meshes (tagged with userData.formula)
        const targets = [];
        currentMolecules.traverse(obj => {
            if (obj.isMesh && obj.userData.formula) targets.push(obj);
        });

        const hits = raycaster.intersectObjects(targets);
        if (hits.length > 0) {
            showPopup(hits[0].object.userData.formula, e.clientX, e.clientY);
        } else {
            hidePopup();
        }
    });

    document.getElementById('popup-close').addEventListener('click', hidePopup);
}

function showPopup(formula, clientX, clientY) {
    const info = MOLECULE_INFO[formula];
    if (!info) return;

    document.getElementById('popup-name').textContent = info.name;
    document.getElementById('popup-formula').textContent = formula;
    document.getElementById('popup-mass').textContent = `Молярна маса: ${info.molarMass} г/моль`;

    const popup = document.getElementById('mol-popup');
    popup.style.display = 'block';

    // Position near click, keep inside canvas
    const container = document.getElementById('canvas-container');
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left + 12;
    let y = clientY - rect.top + 12;
    if (x + 180 > rect.width)  x = clientX - rect.left - 180;
    if (y + 100 > rect.height) y = clientY - rect.top  - 100;

    popup.style.left = x + 'px';
    popup.style.top  = y + 'px';
}

function hidePopup() {
    document.getElementById('mol-popup').style.display = 'none';
}

// ─── Animation ───────────────────────────────────────────────────────────────

// Build a flat list of {type, worldPos} for all atoms in given substances
function buildFlatAtoms(substances) {
    const result = [];
    substances.forEach((sub, idx) => {
        const molData = MOLECULES[sub.formula];
        if (!molData) return;
        for (let i = 0; i < sub.count; i++) {
            const { x, y } = getMoleculeOffset(substances, idx, i);
            molData.atoms.forEach(atomData => {
                result.push({
                    type: atomData.type,
                    worldPos: new THREE.Vector3(
                        x + atomData.pos[0],
                        y + atomData.pos[1],
                        atomData.pos[2]
                    )
                });
            });
        }
    });
    return result;
}

function startAnimation() {
    if (!selectedReaction?.atomMapping || isAnimating) return;

    isAnimating = true;
    const animBtn = document.getElementById('animate-btn');
    animBtn.disabled = true;
    animBtn.textContent = '⏳ Анімація...';

    // Make sure we start from reactants view
    renderMolecules('reactants');

    const reactantAtoms = buildFlatAtoms(selectedReaction.reactants);
    const productAtoms = buildFlatAtoms(selectedReaction.products);

    // Remove molecule groups, add individual atom spheres instead
    clearMolecules();

    const meshes = reactantAtoms.map(({ type, worldPos }) => {
        const info = ATOMS[type];
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(info.radius, 32, 32),
            new THREE.MeshPhongMaterial({ color: getAtomColor(type), shininess: 100 })
        );
        mesh.position.copy(worldPos);
        scene.add(mesh);
        return mesh;
    });

    // Map each reactant atom to its target product position
    const targets = selectedReaction.atomMapping.map(([fromIdx, toIdx]) =>
        productAtoms[toIdx].worldPos
    );

    const speedMap = { 1: 4000, 2: 2000, 3: 800 };
    const duration = speedMap[document.getElementById('speed-slider').value] ?? 2000;

    animateAtoms(meshes, targets, duration, () => {
        // Cleanup temp meshes, show final product molecules
        meshes.forEach(m => scene.remove(m));
        renderMolecules('products');
        currentView = 'products';
        isAnimating = false;
        animBtn.disabled = false;
        animBtn.textContent = '▶ Анімувати реакцію';
    });
}

init();
