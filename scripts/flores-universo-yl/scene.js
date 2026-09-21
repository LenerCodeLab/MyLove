import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const PLANET_RADIUS = 2.25;
const SURFACE_OFFSET = 0.035;
const isSmallScreen = () => window.innerWidth < 760;

export function initThreeUniverse({ config, openLetter }) {
  const mount = document.getElementById("threeStage");
  const loading = document.getElementById("loading");
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x07050d, 0.022);

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 180);
  camera.position.set(0, 3.4, 17.5);

  const renderer = new THREE.WebGLRenderer({ antialias: !isSmallScreen(), alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmallScreen() ? 1.35 : 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  mount.append(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.055;
  controls.enablePan = true;
  controls.panSpeed = 0.42;
  controls.rotateSpeed = 0.58;
  controls.zoomSpeed = 0.72;
  controls.minDistance = 4.2;
  controls.maxDistance = 18;
  controls.minPolarAngle = 0.22;
  controls.maxPolarAngle = Math.PI - 0.38;
  controls.target.set(0, 0, 0);
  controls.enabled = false;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 0.12;

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const clock = new THREE.Clock();
  const interactives = [];
  let hovered = null;
  let interactionResumeTimer = 0;
  let autoMotion = 0;
  let autoMotionTarget = 0;
  const pulseLights = [];

  addLights(scene);
  const starfield = createStarfield(isSmallScreen() ? 1800 : 4200);
  scene.add(starfield);
  scene.add(createNebula());

  const planet = createPlanet();
  scene.add(planet.group);
  interactives.push(planet.planet);
  pulseLights.push(planet.pulseLight);

  const flowerTextures = createSceneTextures(config);
  const ambientUniverse = createAmbientUniverse(flowerTextures);
  scene.add(ambientUniverse);
  addOrnamentalRelief(planet.surfaceGroup);
  addSurfaceGlowParticles(planet.surfaceGroup, flowerTextures.spark);

  const orbitalSystem = new THREE.Group();
  const labelOrbit = new THREE.Group();
  const discoveryOrbit = new THREE.Group();
  const flowerOrbit = new THREE.Group();
  const detailOrbit = new THREE.Group();
  orbitalSystem.add(labelOrbit, discoveryOrbit, flowerOrbit, detailOrbit);
  scene.add(orbitalSystem);

  const labelGroup = new THREE.Group();
  createSpaceLabels(config.phrases).forEach((label) => labelGroup.add(label));
  labelOrbit.add(labelGroup);

  const orbitGroup = createOrbitSystem(flowerTextures.heart, flowerTextures.sunflower);
  detailOrbit.add(orbitGroup);
  addDiscoveryObjects({ discoveryOrbit, flowerOrbit, detailOrbit }, config, flowerTextures, interactives);

  const yl = createTextSprite("Y ♥ L", {
    fontSize: 86,
    color: "#fff6ba",
    bg: "rgba(80, 34, 11, 0.28)",
    border: "rgba(255, 213, 91, 0.68)"
  });
  yl.position.set(0, PLANET_RADIUS + 1.05, 0.18);
  yl.scale.set(1.55, 0.48, 1);
  yl.userData.kind = "yl";
  scene.add(yl);
  interactives.push(yl);

  const intro = { t: 0, active: false, done: false };

  function animate() {
    const delta = clock.getDelta();
    const elapsed = clock.elapsedTime;

    if (intro.active && !intro.done) runIntro(camera, controls, intro, delta);
    autoMotion += (autoMotionTarget - autoMotion) * Math.min(delta * 2.4, 1);
    controls.autoRotate = controls.enabled && autoMotion > 0.06;
    controls.autoRotateSpeed = 0.12 * autoMotion;

    planet.planet.rotation.y += delta * 0.09;
    planet.surfaceGroup.rotation.y += delta * 0.045;
    planet.surfaceGroup.children.forEach((child, index) => {
      if (!child.userData.base) return;
      const lift = (Math.sin(elapsed * child.userData.speed + index) + 1) * 0.09;
      child.position.copy(child.userData.base).setLength(child.userData.base.length() + lift);
      child.material.opacity = 0.25 + Math.sin(elapsed * child.userData.speed + index) * 0.18 + 0.38;
    });
    planet.atmosphere.rotation.y -= delta * 0.03;
    labelOrbit.rotation.y += delta * 0.045 * autoMotion;
    labelOrbit.rotation.x = Math.sin(elapsed * 0.13) * 0.035;
    discoveryOrbit.rotation.y += delta * 0.032 * autoMotion;
    discoveryOrbit.rotation.x = Math.sin(elapsed * 0.11) * 0.05;
    flowerOrbit.rotation.y -= delta * 0.05 * autoMotion;
    flowerOrbit.rotation.z = Math.sin(elapsed * 0.16) * 0.035;
    detailOrbit.rotation.y += delta * 0.07 * autoMotion;
    detailOrbit.rotation.x = Math.sin(elapsed * 0.19) * 0.04;
    orbitGroup.children.forEach((child, index) => {
      child.rotation.y += delta * (0.08 + index * 0.018) * autoMotion;
      child.rotation.x += delta * (0.012 + index * 0.005) * autoMotion;
    });
    starfield.rotation.y += delta * 0.008;
    ambientUniverse.children.forEach((child, index) => {
      child.rotation.y += delta * (child.userData.rotY || 0.002 + index * 0.0003);
      child.rotation.x += delta * (child.userData.rotX || 0.0008);
      if (child.material && child.userData.twinkle) {
        child.material.opacity = child.userData.baseOpacity + Math.sin(elapsed * child.userData.twinkle + index) * child.userData.amp;
      }
    });

    labelGroup.children.forEach((label, index) => {
      label.lookAt(camera.position);
      label.position.y += Math.sin(elapsed * 1.2 + index) * 0.0018;
    });
    pulseLights.forEach((light, index) => {
      light.intensity = 0.7 + Math.sin(elapsed * 2.5 + index) * 0.18;
    });

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  function onPointerDown(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(interactives, true);
    if (!hits.length) return;
    const object = findInteractiveRoot(hits[0].object);
    if (object.userData.kind === "letterFlower" || object.userData.kind === "bouquet") {
      object.userData.clickPulse = 1;
      openLetter(object.userData.letter);
    }
    if (object.userData.kind === "yl") spawnHeartBurst(scene, flowerTextures.heart);
    if (object.userData.kind === "planet") planet.pulse();
  }

  function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(interactives, true);
    const next = hits.length ? findInteractiveRoot(hits[0].object) : null;
    if (hovered && hovered !== next && hovered.userData.baseScale) {
      hovered.scale.copy(hovered.userData.baseScale);
    }
    hovered = next && (next.userData.kind === "bouquet" || next.userData.kind === "letterFlower") ? next : null;
    if (hovered && hovered.userData.baseScale) {
      hovered.scale.copy(hovered.userData.baseScale).multiplyScalar(1.08);
    }
    renderer.domElement.style.cursor = hovered ? "pointer" : "grab";
  }

  function pauseAutomaticMotion() {
    if (interactionResumeTimer) window.clearTimeout(interactionResumeTimer);
    autoMotionTarget = 0;
  }

  function resumeAutomaticMotion() {
    if (interactionResumeTimer) window.clearTimeout(interactionResumeTimer);
    interactionResumeTimer = window.setTimeout(() => {
      autoMotionTarget = 1;
    }, 420);
  }

  renderer.domElement.addEventListener("pointerdown", onPointerDown);
  renderer.domElement.addEventListener("pointermove", onPointerMove);
  controls.addEventListener("start", pauseAutomaticMotion);
  controls.addEventListener("end", resumeAutomaticMotion);
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmallScreen() ? 1.35 : 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  setTimeout(() => loading.classList.add("is-hidden"), 900);
  animate();
  return {
    enter() {
      if (intro.active || intro.done) return;
      intro.active = true;
      controls.enabled = false;
      autoMotionTarget = 1;
    }
  };
}

function addLights(scene) {
  scene.add(new THREE.AmbientLight(0xffe7bf, 0.72));
  const key = new THREE.DirectionalLight(0xffd36b, 2.8);
  key.position.set(5.5, 6.5, 8);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffa0bd, 1.15);
  fill.position.set(-4, 2, 4);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xfff0a8, 1.55);
  rim.position.set(-6, -2, -4);
  scene.add(rim);
  const point = new THREE.PointLight(0xffc638, 4.4, 20);
  point.position.set(0, 2.2, 3.6);
  scene.add(point);
}

function createPlanet() {
  const group = new THREE.Group();
  const surfaceGroup = new THREE.Group();
  const geometry = new THREE.SphereGeometry(PLANET_RADIUS, 128, 96);
  const pos = geometry.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i += 1) {
    v.fromBufferAttribute(pos, i).normalize();
    const noise = Math.sin(v.x * 8.7 + v.y * 3.1) * 0.018
      + Math.sin(v.z * 11.3 + v.x * 2.4) * 0.014
      + Math.sin((v.x + v.y + v.z) * 17.0) * 0.008;
    pos.setXYZ(i, v.x * (PLANET_RADIUS + noise), v.y * (PLANET_RADIUS + noise), v.z * (PLANET_RADIUS + noise));
  }
  geometry.computeVertexNormals();
  const planet = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      map: createPlanetTexture(),
      roughness: 0.62,
      metalness: 0.04,
      emissive: new THREE.Color(0x4b2b09),
      emissiveIntensity: 0.23
    })
  );
  planet.userData.kind = "planet";

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(PLANET_RADIUS * 1.045, 96, 48),
    new THREE.MeshBasicMaterial({
      color: 0xffd766,
      transparent: true,
      opacity: 0.23,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.BackSide
    })
  );

  const pulseLight = new THREE.PointLight(0xffd35b, 0.75, 8);
  pulseLight.position.set(0, 0, 2.4);

  function pulse() {
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / 620, 1);
      atmosphere.material.opacity = 0.16 + Math.sin(p * Math.PI) * 0.28;
      pulseLight.intensity = 0.75 + Math.sin(p * Math.PI) * 2.1;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  group.add(planet, atmosphere, surfaceGroup, pulseLight);
  return { group, planet, atmosphere, surfaceGroup, pulseLight, pulse };
}

function addOrnamentalRelief(scene) {
  const stemMaterial = new THREE.MeshStandardMaterial({ color: 0xd7a932, roughness: 0.38, metalness: 0.28, emissive: 0x3f2605, emissiveIntensity: 0.14 });
  const leafMaterial = new THREE.MeshStandardMaterial({ color: 0xb9a23b, roughness: 0.46, metalness: 0.18, emissive: 0x2c2104, emissiveIntensity: 0.08, side: THREE.DoubleSide });
  const petalMaterial = new THREE.MeshStandardMaterial({ color: 0xffd65a, roughness: 0.34, metalness: 0.2, emissive: 0x513003, emissiveIntensity: 0.16, side: THREE.DoubleSide });
  const centerMaterial = new THREE.MeshStandardMaterial({ color: 0x5a3210, roughness: 0.52, metalness: 0.1 });

  const path = [];
  for (let i = 0; i < 34; i += 1) {
    const t = i / 33;
    path.push(surfacePoint(4.18 - t * 3.28 + Math.sin(t * Math.PI * 2) * 0.08, 2.2 - t * 1.35, 0.12));
  }
  const curve = new THREE.CatmullRomCurve3(path);
  const stem = new THREE.Mesh(new THREE.TubeGeometry(curve, 130, 0.025, 10, false), stemMaterial);
  scene.add(stem);

  [0.15, 0.26, 0.38, 0.52, 0.66, 0.78, 0.9].forEach((t, index) => {
    const point = curve.getPoint(t);
    const normal = point.clone().normalize();
    const tangent = curve.getTangent(t).normalize();
    const side = new THREE.Vector3().crossVectors(normal, tangent).normalize().multiplyScalar(index % 2 ? -1 : 1);
    scene.add(makeReliefLeaf(point, normal, side, leafMaterial, 0.28 + (index % 3) * 0.05));
    if (index % 2 === 0) {
      const branchEnd = point.clone().add(side.clone().multiplyScalar(0.38)).setLength(PLANET_RADIUS + 0.17);
      const branch = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([point, point.clone().add(side.clone().multiplyScalar(0.18)).setLength(PLANET_RADIUS + 0.14), branchEnd]), 24, 0.014, 8, false), stemMaterial);
      scene.add(branch);
    }
  });

  [
    { theta: 3.78, phi: 1.92, size: 0.42 },
    { theta: 2.55, phi: 1.34, size: 0.52 },
    { theta: 1.35, phi: 0.98, size: 0.38 }
  ].forEach((flower) => {
    scene.add(makeReliefFlower(flower.theta, flower.phi, flower.size, petalMaterial, centerMaterial));
  });
}

function surfacePoint(theta, phi, lift = 0.1) {
  return sphericalNormal(theta, phi).multiplyScalar(PLANET_RADIUS + lift);
}

function makeReliefLeaf(origin, normal, side, material, size) {
  const leaf = new THREE.Mesh(new THREE.CircleGeometry(size, 24), material);
  leaf.scale.set(0.48, 1.0, 1);
  leaf.position.copy(origin).add(side.clone().multiplyScalar(size * 0.55)).setLength(PLANET_RADIUS + 0.15);
  leaf.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
  leaf.rotateZ(side.x + side.y);
  return leaf;
}

function makeReliefFlower(theta, phi, size, petalMaterial, centerMaterial) {
  const group = new THREE.Group();
  const normal = sphericalNormal(theta, phi);
  const center = normal.clone().multiplyScalar(PLANET_RADIUS + 0.19);
  group.position.copy(center);
  group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
  for (let i = 0; i < 12; i += 1) {
    const petal = new THREE.Mesh(new THREE.CircleGeometry(size * 0.27, 18), petalMaterial);
    petal.scale.set(0.72, 1.8, 1);
    petal.position.set(Math.cos(i / 12 * Math.PI * 2) * size * 0.32, Math.sin(i / 12 * Math.PI * 2) * size * 0.32, 0.018);
    petal.rotateZ(i / 12 * Math.PI * 2);
    group.add(petal);
  }
  const centerMesh = new THREE.Mesh(new THREE.SphereGeometry(size * 0.16, 18, 12), centerMaterial);
  centerMesh.position.z = 0.035;
  group.add(centerMesh);
  return group;
}

function createPlanetTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#112414");
  gradient.addColorStop(0.22, "#244218");
  gradient.addColorStop(0.44, "#73581a");
  gradient.addColorStop(0.62, "#c29324");
  gradient.addColorStop(0.76, "#453419");
  gradient.addColorStop(1, "#120d08");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 620; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = 8 + Math.random() * 52;
    const alpha = 0.03 + Math.random() * 0.13;
    const palette = [
      `rgba(255, 213, 83, ${alpha})`,
      `rgba(26, 82, 35, ${alpha})`,
      `rgba(255, 151, 178, ${alpha * 0.72})`,
      `rgba(255, 243, 170, ${alpha * 0.7})`
    ];
    ctx.fillStyle = palette[i % palette.length];
    ctx.beginPath();
    ctx.ellipse(x, y, r * (0.8 + Math.random()), r * 0.35, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 90; i += 1) {
    ctx.fillStyle = `rgba(255, 224, 105, ${0.18 + Math.random() * 0.28})`;
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1 + Math.random() * 2.8, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function createSceneTextures(config) {
  const loader = new THREE.TextureLoader();
  const load = (src, kind) => {
    const texture = loader.load(src);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.userData.kind = kind;
    return texture;
  };
  return {
    sunflower: load(config.images.sunflower, "sunflower"),
    yellow: load(config.images.yellowRose, "yellowRose"),
    tulip: load(config.images.yellowTulip, "yellowTulip"),
    bouquetSunflower: load(config.images.sunflowerBouquet, "bouquet"),
    bouquetOne: load(config.images.bouquetOne, "bouquet"),
    bouquetMixed: load(config.images.bouquetMixed, "bouquet"),
    heart: makeTextTexture("♥", { color: "#ff9ab7", fontSize: 92, kind: "heart" }),
    spark: makeSparkTexture()
  };
}

function makeFlowerTexture({ petals, center, ring, kind }) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  ctx.translate(128, 128);
  for (let i = 0; i < 22; i += 1) {
    ctx.rotate((Math.PI * 2) / 22);
    ctx.fillStyle = petals;
    ctx.beginPath();
    ctx.ellipse(0, -63, 17, 54, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = ring;
    ctx.globalAlpha = 0.32;
    ctx.beginPath();
    ctx.ellipse(0, -66, 8, 42, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  const radial = ctx.createRadialGradient(0, 0, 4, 0, 0, 42);
  radial.addColorStop(0, "#0c0905");
  radial.addColorStop(0.6, center);
  radial.addColorStop(1, "#1f1005");
  ctx.fillStyle = radial;
  ctx.beginPath();
  ctx.arc(0, 0, 42, 0, Math.PI * 2);
  ctx.fill();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.userData.kind = kind;
  return texture;
}

function makeLeafTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 180;
  canvas.height = 180;
  const ctx = canvas.getContext("2d");
  ctx.translate(90, 90);
  ctx.fillStyle = "#53753d";
  ctx.beginPath();
  ctx.ellipse(0, 0, 28, 72, -0.75, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,210,0.25)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-24, 46);
  ctx.quadraticCurveTo(-2, 4, 28, -54);
  ctx.stroke();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.userData.kind = "leaf";
  return texture;
}

function makeSparkTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 96;
  canvas.height = 96;
  const ctx = canvas.getContext("2d");
  const glow = ctx.createRadialGradient(48, 48, 0, 48, 48, 46);
  glow.addColorStop(0, "rgba(255,255,230,1)");
  glow.addColorStop(0.28, "rgba(255,214,83,0.85)");
  glow.addColorStop(1, "rgba(255,214,83,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(48, 48, 46, 0, Math.PI * 2);
  ctx.fill();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.userData.kind = "spark";
  return texture;
}

function makeTextTexture(text, { color = "#fff", fontSize = 64, bg = "transparent", border = "transparent", kind = "text" } = {}) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 180;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = bg;
  roundRect(ctx, 18, 30, 476, 120, 42);
  ctx.fill();
  ctx.strokeStyle = border;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.font = `800 ${fontSize}px Georgia, serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(255, 207, 70, 0.55)";
  ctx.shadowBlur = 16;
  ctx.fillText(text, 256, 92);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.userData.kind = kind;
  return texture;
}

function createTextSprite(text, options) {
  const texture = makeTextTexture(text, options);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  return new THREE.Sprite(material);
}

function createSpaceLabels(phrases) {
  const positions = [
    [-5.8, 2.2, -3.7],
    [5.3, 1.55, 2.9],
    [-3.2, -1.85, 4.2],
    [4.7, -1.35, -3.6],
    [-1.4, 3.75, 2.6],
    [1.5, -3.2, -2.9],
    [-7.2, 3.6, -7.5],
    [7.4, 3.2, -6.8],
    [-7.8, -2.8, 2.4],
    [7.0, -3.0, 3.5],
    [-2.2, 5.1, -4.8],
    [2.8, -5.0, -4.2],
    [0.6, 4.6, 5.2],
    [-5.4, 0.7, 6.2],
    [5.6, 0.6, -7.2],
    [-1.2, -4.4, 6.6],
    [3.2, 2.6, 7.0],
    [-3.6, 2.9, -8.2],
    [6.3, -0.8, 6.0],
    [-6.5, -0.6, -5.8]
  ];
  return phrases.slice(0, positions.length).map((phrase, index) => {
    const sprite = createTextSprite(phrase, {
      fontSize: index % 3 === 0 ? 52 : 44,
      color: "#fff4bc",
      bg: index % 3 === 1 ? "rgba(0,0,0,0)" : "rgba(17, 9, 15, 0.22)",
      border: index % 3 === 1 ? "rgba(0,0,0,0)" : "rgba(255, 220, 108, 0.2)"
    });
    sprite.position.set(...positions[index]);
    const scale = index % 3 === 1 ? 1.28 : 1.5;
    sprite.scale.set(scale, scale * 0.34, 1);
    return sprite;
  });
}

function createStarfield(count) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const color = new THREE.Color();
  for (let i = 0; i < count; i += 1) {
    const radius = rand(24, 78);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(rand(-1, 1));
    const normal = sphericalNormal(theta, phi);
    positions.set([normal.x * radius, normal.y * radius, normal.z * radius], i * 3);
    color.set(Math.random() > 0.22 ? 0xfff3c0 : 0xffc94d);
    const intensity = rand(0.45, 1.25);
    colors.set([color.r * intensity, color.g * intensity, color.b * intensity], i * 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      size: isSmallScreen() ? 0.045 : 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
}

function createNebula() {
  const group = new THREE.Group();
  const shell = new THREE.Mesh(
    new THREE.SphereGeometry(34, 32, 16),
    new THREE.MeshBasicMaterial({
      color: 0xffa640,
      transparent: true,
      opacity: 0.035,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  group.add(shell);
  return group;
}

function createAmbientUniverse(textures) {
  const group = new THREE.Group();
  group.add(createLayeredStars(isSmallScreen() ? 1200 : 2800, 34, 88, 0.018, 0.58));
  group.add(createLayeredStars(isSmallScreen() ? 420 : 950, 18, 52, 0.035, 0.72));
  group.add(createLayeredStars(isSmallScreen() ? 80 : 180, 22, 68, 0.075, 0.86));
  group.add(createGalaxyField());
  group.add(createAmbientHearts(textures.heart));
  group.add(createAmbientDust(textures.spark));
  group.add(createCloseSparkles(textures.spark));
  return group;
}

function createLayeredStars(count, minRadius, maxRadius, size, opacity) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const color = new THREE.Color();
  for (let i = 0; i < count; i += 1) {
    const radius = rand(minRadius, maxRadius);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(rand(-1, 1));
    const normal = sphericalNormal(theta, phi);
    positions.set([normal.x * radius, normal.y * radius, normal.z * radius], i * 3);
    const palette = Math.random();
    color.set(palette < 0.58 ? 0xfff8dc : palette < 0.84 ? 0xffd76b : 0xffef9e);
    const intensity = rand(0.45, 1.4);
    colors.set([color.r * intensity, color.g * intensity, color.b * intensity], i * 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({
    size,
    vertexColors: true,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const points = new THREE.Points(geometry, material);
  points.userData.rotY = rand(0.001, 0.004);
  points.userData.rotX = rand(-0.001, 0.001);
  points.userData.twinkle = rand(0.4, 0.9);
  points.userData.baseOpacity = opacity;
  points.userData.amp = opacity * 0.08;
  return points;
}

function createGalaxyField() {
  const group = new THREE.Group();
  const textureA = makeNebulaTexture(["rgba(255,226,139,0.56)", "rgba(255,147,181,0.24)", "rgba(74,34,100,0.12)"]);
  const textureB = makeNebulaTexture(["rgba(255,244,203,0.42)", "rgba(255,178,82,0.22)", "rgba(255,118,164,0.14)"]);
  const nebulas = [
    { tex: textureA, pos: [-18, 8, -34], scale: [12, 6.5], opacity: 0.34, rot: 0.2 },
    { tex: textureB, pos: [20, -7, -38], scale: [14, 7], opacity: 0.28, rot: -0.45 },
    { tex: textureA, pos: [3, 13, -44], scale: [16, 8], opacity: 0.22, rot: 0.8 },
    { tex: textureB, pos: [-22, -11, -36], scale: [11, 5.4], opacity: 0.24, rot: -0.1 },
    { tex: textureA, pos: [28, 7, -48], scale: [18, 8.5], opacity: 0.18, rot: 0.4 }
  ];
  nebulas.forEach((item) => {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: item.tex,
      transparent: true,
      opacity: item.opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    }));
    sprite.position.set(...item.pos);
    sprite.scale.set(item.scale[0], item.scale[1], 1);
    sprite.material.rotation = item.rot;
    sprite.userData.twinkle = rand(0.12, 0.24);
    sprite.userData.baseOpacity = item.opacity;
    sprite.userData.amp = item.opacity * 0.08;
    group.add(sprite);
  });
  group.userData.rotY = 0.0005;
  return group;
}

function makeNebulaTexture(colors) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  ctx.translate(256, 128);
  for (let i = 0; i < 56; i += 1) {
    const x = rand(-190, 190);
    const y = rand(-70, 70);
    const r = rand(38, 118);
    const glow = ctx.createRadialGradient(x, y, 0, x, y, r);
    glow.addColorStop(0, colors[i % colors.length]);
    glow.addColorStop(0.55, colors[(i + 1) % colors.length].replace(/[\d.]+\)$/, "0.08)"));
    glow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.ellipse(x, y, r * rand(0.7, 1.6), r * rand(0.25, 0.62), rand(-0.8, 0.8), 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createAmbientHearts(texture) {
  const group = new THREE.Group();
  const count = isSmallScreen() ? 28 : 58;
  for (let i = 0; i < count; i += 1) {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: rand(0.22, 0.54),
      depthWrite: false,
      blending: THREE.AdditiveBlending
    }));
    const normal = sphericalNormal(Math.random() * Math.PI * 2, Math.acos(rand(-1, 1)));
    const radius = rand(8.5, 32);
    sprite.position.copy(normal.multiplyScalar(radius));
    if (sprite.position.length() < 7) sprite.position.setLength(8.5);
    sprite.scale.setScalar(rand(0.055, 0.16));
    sprite.material.rotation = rand(-0.7, 0.7);
    sprite.userData.twinkle = rand(0.5, 1.4);
    sprite.userData.baseOpacity = sprite.material.opacity;
    sprite.userData.amp = 0.08;
    group.add(sprite);
  }
  group.userData.rotY = -0.002;
  return group;
}

function createAmbientDust(texture) {
  const group = new THREE.Group();
  const count = isSmallScreen() ? 90 : 190;
  for (let i = 0; i < count; i += 1) {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: rand(0.16, 0.5),
      depthWrite: false,
      blending: THREE.AdditiveBlending
    }));
    const sideBias = Math.random() < 0.62 ? (Math.random() < 0.5 ? -1 : 1) : rand(-1, 1);
    sprite.position.set(sideBias * rand(5.5, 22), rand(-12, 12), rand(-20, 18));
    sprite.scale.setScalar(rand(0.025, 0.11));
    sprite.userData.twinkle = rand(0.7, 1.8);
    sprite.userData.baseOpacity = sprite.material.opacity;
    sprite.userData.amp = 0.1;
    group.add(sprite);
  }
  group.userData.rotY = 0.0015;
  group.userData.rotX = -0.0007;
  return group;
}

function createCloseSparkles(texture) {
  const group = new THREE.Group();
  const count = isSmallScreen() ? 22 : 46;
  for (let i = 0; i < count; i += 1) {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: rand(0.28, 0.72),
      depthWrite: false,
      blending: THREE.AdditiveBlending
    }));
    sprite.position.set(rand(-9, 9), rand(-5.5, 6.5), rand(4.5, 11));
    if (Math.abs(sprite.position.x) < 2.8 && Math.abs(sprite.position.y) < 2.4) sprite.position.x += sprite.position.x < 0 ? -3 : 3;
    sprite.scale.setScalar(rand(0.035, 0.13));
    sprite.userData.twinkle = rand(1.1, 2.4);
    sprite.userData.baseOpacity = sprite.material.opacity;
    sprite.userData.amp = 0.14;
    group.add(sprite);
  }
  group.userData.rotY = -0.001;
  return group;
}

function addSurfaceGlowParticles(surfaceGroup, texture) {
  const count = isSmallScreen() ? 28 : 54;
  for (let i = 0; i < count; i += 1) {
    const normal = sphericalNormal(Math.random() * Math.PI * 2, rand(0.35, Math.PI - 0.35));
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: rand(0.32, 0.78),
      depthWrite: false,
      blending: THREE.AdditiveBlending
    }));
    sprite.position.copy(normal).multiplyScalar(PLANET_RADIUS + rand(0.16, 0.48));
    sprite.scale.setScalar(rand(0.045, 0.12));
    sprite.userData.base = sprite.position.clone();
    sprite.userData.speed = rand(0.6, 1.4);
    surfaceGroup.add(sprite);
  }
}

function addDiscoveryObjects(groups, config, textures, interactives) {
  const letters = config.letters || [];
  const letterById = new Map(letters.map((letter) => [letter.id, letter]));
  const bouquetTextures = [textures.bouquetSunflower, textures.bouquetOne, textures.bouquetMixed];
  const bouquetPlans = [
    { pos: [-4.9, 1.35, 3.35], rot: [0.12, 0.42, -0.08], scale: 1.2, image: 0, letterId: "flores" },
    { pos: [4.6, 1.75, 2.55], rot: [-0.08, -0.55, 0.1], scale: 1.08, image: 1, letterId: "amor" },
    { pos: [-3.25, -2.4, -3.95], rot: [0.28, 0.15, -0.16], scale: 1.0, image: 2, letterId: "orgullo" },
    { pos: [3.7, -1.95, -4.5], rot: [0.18, -0.25, 0.14], scale: 1.06, image: 0, letterId: "doctora" },
    { pos: [0.55, 3.65, -2.85], rot: [-0.34, 0.05, 0.08], scale: 0.96, image: 1, letterId: "gracias" },
    { pos: [-0.75, -3.45, 2.95], rot: [0.38, -0.05, -0.05], scale: 1.0, image: 2, letterId: "universo" },
    { pos: [6.1, 0.15, -0.85], rot: [0.02, -0.9, 0.02], scale: 0.88, image: 0, letterId: "flores" },
    { pos: [-6.0, -0.1, -0.75], rot: [0.02, 0.9, -0.02], scale: 0.88, image: 1, letterId: "universo" },
    { pos: [-7.1, 2.85, -5.6], rot: [-0.18, 0.72, -0.12], scale: 0.76, image: 2, letterId: "amor" },
    { pos: [7.25, 2.55, -5.25], rot: [-0.12, -0.78, 0.08], scale: 0.78, image: 0, letterId: "orgullo" },
    { pos: [5.55, -3.35, 4.2], rot: [0.3, -0.44, 0.16], scale: 0.84, image: 1, letterId: "gracias" },
    { pos: [-5.7, -3.1, 4.7], rot: [0.3, 0.5, -0.14], scale: 0.84, image: 2, letterId: "doctora" }
  ];

  bouquetPlans.forEach((plan, index) => {
    const bouquet = createBouquetGroup(bouquetTextures[plan.image], letterById.get(plan.letterId) || letters[0], index);
    bouquet.position.set(...plan.pos);
    bouquet.rotation.set(...plan.rot);
    bouquet.scale.setScalar(plan.scale);
    bouquet.userData.baseScale = bouquet.scale.clone();
    groups.discoveryOrbit.add(bouquet);
    interactives.push(bouquet);
  });

  addIndividualFlowerField(groups.flowerOrbit, textures);
  addHeartConstellation(groups.detailOrbit, textures.heart);
  addGoldenDustCloud(groups.detailOrbit, textures.spark);
}

function addIndividualFlowerField(group, textures) {
  const items = [
    { texture: textures.sunflower, pos: [-2.7, 2.2, 4.9], scale: 0.52 },
    { texture: textures.yellow, pos: [2.9, 2.55, -3.7], scale: 0.42 },
    { texture: textures.tulip, pos: [-5.1, 2.8, -1.7], scale: 0.46 },
    { texture: textures.sunflower, pos: [5.0, -2.55, 1.8], scale: 0.48 },
    { texture: textures.yellow, pos: [1.7, -3.55, -3.0], scale: 0.38 },
    { texture: textures.tulip, pos: [-1.6, 3.7, 3.3], scale: 0.4 },
    { texture: textures.sunflower, pos: [0.2, 2.2, 6.0], scale: 0.44 },
    { texture: textures.yellow, pos: [-3.8, -1.1, 4.3], scale: 0.34 }
  ];
  items.forEach((item, index) => {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: item.texture,
      transparent: true,
      alphaTest: 0.1,
      opacity: 0.96,
      depthTest: true,
      depthWrite: false
    }));
    sprite.position.set(...item.pos);
    sprite.scale.setScalar(item.scale);
    sprite.material.rotation = rand(-0.28, 0.28);
    sprite.renderOrder = 18 + index;
    group.add(sprite);
  });
}

function createBouquetGroup(texture, letter, seed) {
  const group = new THREE.Group();
  group.userData.kind = "bouquet";
  group.userData.letter = letter;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    alphaTest: 0.08,
    opacity: 1,
    depthTest: true,
    depthWrite: false
  }));
  sprite.scale.set(1.35, 1.58, 1);
  sprite.material.rotation = rand(-0.1, 0.1) + seed * 0.015;
  sprite.renderOrder = 30 + seed;
  group.add(sprite);
  const glow = new THREE.PointLight(0xffd35b, 0.35, 2.6);
  glow.position.set(0, 0.12, 0.4);
  group.add(glow);
  return group;
}

function addHeartConstellation(scene, texture) {
  const group = new THREE.Group();
  group.position.set(2.8, 2.4, 4.6);
  for (let i = 0; i < 34; i += 1) {
    const t = (i / 34) * Math.PI * 2;
    const x = 0.16 * 16 * Math.pow(Math.sin(t), 3);
    const y = 0.16 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.9, depthWrite: false }));
    sprite.position.set(x, y, rand(-0.25, 0.25));
    sprite.scale.setScalar(rand(0.08, 0.16));
    group.add(sprite);
  }
  scene.add(group);
}

function addGoldenDustCloud(scene, texture) {
  const group = new THREE.Group();
  group.position.set(-2.5, 2.9, -4.8);
  for (let i = 0; i < 80; i += 1) {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: rand(0.22, 0.72), depthWrite: false, blending: THREE.AdditiveBlending }));
    sprite.position.set(rand(-1.5, 1.5), rand(-0.9, 0.9), rand(-1.1, 1.1));
    sprite.scale.setScalar(rand(0.03, 0.09));
    group.add(sprite);
  }
  scene.add(group);
}

function addResourceSprites(scene, config) {
  const loader = new THREE.TextureLoader();
  const resources = [
    { src: config.images.sunflowerBouquet, pos: [-8.5, -3.2, -8], scale: 2.4, opacity: 0.28, rot: 0.2 },
    { src: config.images.yellowFlowers, pos: [8.2, 3.1, -9.5], scale: 1.4, opacity: 0.24, rot: -0.3 }
  ];

  resources.forEach((item) => {
    loader.load(item.src, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: item.opacity,
        depthWrite: false
      }));
      sprite.position.set(...item.pos);
      sprite.scale.set(item.scale * 1.2, item.scale, 1);
      sprite.material.rotation = item.rot;
      scene.add(sprite);
    });
  });
}

function createOrbitSystem(heartTexture, flowerTexture) {
  const group = new THREE.Group();
  const goldOrbit = new THREE.Group();
  const flowerOrbit = new THREE.Group();
  goldOrbit.add(makeOrbitRing(3.35, 0xffd35b, 0.28, 0.22));
  flowerOrbit.add(makeOrbitRing(4.15, 0xff9ab7, 0.18, -0.34));
  for (let i = 0; i < 34; i += 1) {
    const angle = (i / 34) * Math.PI * 2;
    const radius = i % 2 ? 4.15 : 3.35;
    const texture = i % 5 === 0 ? flowerTexture : heartTexture;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
    sprite.position.set(Math.cos(angle) * radius, Math.sin(angle * 2) * 0.18, Math.sin(angle) * radius * 0.42);
    const size = i % 5 === 0 ? 0.28 : 0.18;
    sprite.scale.set(size, size, 1);
    (i % 2 ? flowerOrbit : goldOrbit).add(sprite);
  }
  for (let i = 0; i < 70; i += 1) {
    const angle = (i / 70) * Math.PI * 2;
    const spark = new THREE.Sprite(new THREE.SpriteMaterial({ map: heartTexture, transparent: true, opacity: 0.28, depthWrite: false, blending: THREE.AdditiveBlending }));
    spark.position.set(Math.cos(angle) * 3.35, rand(-0.08, 0.08), Math.sin(angle) * 3.35 * 0.42);
    spark.scale.setScalar(rand(0.045, 0.09));
    goldOrbit.add(spark);
  }
  goldOrbit.rotation.x = 0.38;
  flowerOrbit.rotation.x = -0.24;
  flowerOrbit.rotation.y = 0.68;
  group.add(goldOrbit, flowerOrbit);
  return group;
}

function makeOrbitRing(radius, color, opacity, yRot) {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.42, 0, Math.PI * 2);
  const points = curve.getPoints(180).map((point) => new THREE.Vector3(point.x, 0, point.y));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.LineLoop(
    geometry,
    new THREE.LineBasicMaterial({ color, transparent: true, opacity, blending: THREE.AdditiveBlending })
  );
  line.rotation.y = yRot;
  return line;
}

function spawnHeartBurst(scene, texture) {
  const group = new THREE.Group();
  for (let i = 0; i < 18; i += 1) {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
    const normal = sphericalNormal(Math.random() * Math.PI * 2, Math.random() * Math.PI);
    sprite.position.copy(normal.multiplyScalar(rand(2.5, 4.1)));
    sprite.scale.setScalar(rand(0.14, 0.28));
    group.add(sprite);
  }
  scene.add(group);
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / 1200, 1);
    group.children.forEach((child) => {
      child.position.multiplyScalar(1.006);
      child.material.opacity = 1 - p;
    });
    if (p < 1) requestAnimationFrame(step);
    else scene.remove(group);
  }
  requestAnimationFrame(step);
}

function runIntro(camera, controls, intro, delta) {
  intro.t += delta / 1.8;
  const t = Math.min(intro.t, 1);
  const eased = 1 - Math.pow(1 - t, 3);
  camera.position.set(0, 3.4 - eased * 1.35, 17.5 - eased * 9.2);
  controls.target.set(0, eased * 0.05, 0);
  if (t >= 1) {
    intro.done = true;
    controls.enabled = true;
  }
}

function findInteractiveRoot(object) {
  let current = object;
  while (current.parent && !current.userData.kind) current = current.parent;
  return current;
}

function pickTexture(textures) {
  const roll = Math.random();
  if (roll < 0.38) return textures.sunflower;
  if (roll < 0.62) return textures.yellow;
  if (roll < 0.74) return textures.white;
  if (roll < 0.84) return textures.pink;
  if (roll < 0.94) return textures.leaf;
  return textures.heart;
}

function pickCluster(clusters) {
  let roll = Math.random();
  for (const cluster of clusters) {
    roll -= cluster.weight;
    if (roll <= 0) return cluster;
  }
  return clusters[clusters.length - 1];
}

function sphericalNormal(theta, phi) {
  return new THREE.Vector3(
    Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta)
  ).normalize();
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
