"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Background3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    let isMounted = true;
    let isMobile = false;
    let scene, camera, renderer;
    let clock = new THREE.Clock();
    let animationFrameId;
    let cleanupFn = null; // Closure variable to capture the unmount cleanup handler

    // --- Scene Component Groups ---
    const boardGroup = new THREE.Group();        // Motherboard & SMDs
    const heatSinkGroup = new THREE.Group();     // Heat Sink Cooling Fins
    const armGroup = new THREE.Group();          // Articulated Industrial Robotic Arm
    const glassGroup = new THREE.Group();        // Floating Glassmorphic Shapes (Concept 2)
    const monitorGroup = new THREE.Group();      // Holographic Glass Workstation (Services)
    const serverGroup = new THREE.Group();       // Realistic Server Enclosures (IT Architecture)
    const cosmicGroup = new THREE.Group();       // Starfield & Data Coordinates

    // Lists for cleanup & tracking
    const geometriesToDispose = [];
    const materialsToDispose = [];

    // Subcomponents for animation tracking
    let baseMotherboard;
    let siliconCore;
    let chromeCap;
    let socketMesh;
    let motherboardPins = [];
    let circuitLines = [];
    let smdMeshes = [];
    let finMeshes = [];                          // Individual heat sink fins

    // Robotic arm limbs
    let baseTurntable, gearTeeth = [];
    let joint1, joint2, upperArmGroup, forearmGroup, wristGroup;
    let pistonCylinder, pistonRod;
    let clawLeft, clawRight;
    let laserBeam;
    let cablesMesh1, cablesMesh2;                // Procedural wire harnesses

    // Blinking Server LEDs
    let serverLEDs = [];

    // Camera Keyframes (Scroll Interpolation)
    const keyframes = [
      { t: 0.0, pos: new THREE.Vector3(-1.6, 1.8, 9.5), lookAt: new THREE.Vector3(0.8, 0.4, 0) },      
      { t: 0.28, pos: new THREE.Vector3(3.0, -0.4, 8.5), lookAt: new THREE.Vector3(-1.0, -1.8, 0) }, 
      { t: 0.55, pos: new THREE.Vector3(-3.8, -2.0, 3.2), lookAt: new THREE.Vector3(1.2, -3.0, -6.5) }, 
      { t: 0.8, pos: new THREE.Vector3(0, 3.0, -22), lookAt: new THREE.Vector3(0, 1.5, -34) },     
      { t: 1.0, pos: new THREE.Vector3(0, 12, 13), lookAt: new THREE.Vector3(0, -1.5, -10) }      
    ];

    const interpolateCamera = (scrollVal) => {
      if (scrollVal <= 0.0) return { pos: keyframes[0].pos.clone(), lookAt: keyframes[0].lookAt.clone() };
      if (scrollVal >= 1.0) return { pos: keyframes[keyframes.length - 1].pos.clone(), lookAt: keyframes[keyframes.length - 1].lookAt.clone() };

      let k1 = keyframes[0];
      let k2 = keyframes[1];
      for (let i = 0; i < keyframes.length - 1; i++) {
        if (scrollVal >= keyframes[i].t && scrollVal <= keyframes[i + 1].t) {
          k1 = keyframes[i];
          k2 = keyframes[i + 1];
          break;
        }
      }
      const tLocal = (scrollVal - k1.t) / (k2.t - k1.t);
      const tSmooth = tLocal * tLocal * (3 - 2 * tLocal); // Smoothstep

      const currentPos = new THREE.Vector3().lerpVectors(k1.pos, k2.pos, tSmooth);
      const currentLookAt = new THREE.Vector3().lerpVectors(k1.lookAt, k2.lookAt, tSmooth);
      return { pos: currentPos, lookAt: currentLookAt };
    };

    const registerGeo = (geo) => { geometriesToDispose.push(geo); return geo; };
    const registerMat = (mat) => { materialsToDispose.push(mat); return mat; };

    const initThree = () => {
      if (!isMounted) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // ─── 1. SCENE SETUP ──────────────────────────────────────────────────
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x121212, 0.016); // Sterile lab fog

      // ─── 2. CAMERA SETUP ─────────────────────────────────────────────────
      isMobile = width < 768;
      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      const aspect = width / height;
      if (aspect < 1.0) {
        camera.fov = 60 + (1.0 - aspect) * 35; // Dynamically increase FOV on narrow screens
      } else {
        camera.fov = 60;
      }
      camera.updateProjectionMatrix();
      camera.position.copy(keyframes[0].pos);
      camera.lookAt(keyframes[0].lookAt);

      // ─── 3. RENDERER SETUP (TRANSPARENT WebGL Canvas for CSS Gradients) ───
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setSize(width, height);
      renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0); // Transparent background to reveal the radial gradient CSS
      renderer.shadowMap.enabled = !isMobile; // Disable shadows on mobile to remove lag!
      renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }

      // ─── 4. LIGHTING ─────────────────────────────────────────────────────
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.22);
      scene.add(ambientLight);

      const blueKeyLight = new THREE.DirectionalLight(0x007BFF, 3.2);
      blueKeyLight.position.set(6, 12, 6);
      blueKeyLight.castShadow = true;
      blueKeyLight.shadow.mapSize.width = 1024;
      blueKeyLight.shadow.mapSize.height = 1024;
      blueKeyLight.shadow.camera.near = 0.5;
      blueKeyLight.shadow.camera.far = 25;
      blueKeyLight.shadow.camera.left = -6;
      blueKeyLight.shadow.camera.right = 6;
      blueKeyLight.shadow.camera.top = 6;
      blueKeyLight.shadow.camera.bottom = -6;
      blueKeyLight.shadow.bias = -0.0005; 
      scene.add(blueKeyLight);

      const whiteFillLight = new THREE.DirectionalLight(0xffffff, 2.2);
      whiteFillLight.position.set(-6, 8, -6);
      scene.add(whiteFillLight);

      const corePointLight = new THREE.PointLight(0x00e5ff, 3.0, 10);
      corePointLight.position.set(0, 0.8, 0);
      scene.add(corePointLight);

      // Add groups to scene
      scene.add(boardGroup);
      scene.add(heatSinkGroup);
      scene.add(armGroup);
      scene.add(glassGroup);
      scene.add(monitorGroup);
      scene.add(serverGroup);
      scene.add(cosmicGroup);

      // Material catalog
      const darkSlateMetal = registerMat(new THREE.MeshStandardMaterial({ color: 0x1f1f23, metalness: 0.85, roughness: 0.22 }));
      const chromePolished = registerMat(new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1.0, roughness: 0.02 }));
      const goldPlate = registerMat(new THREE.MeshStandardMaterial({ color: 0xe5c158, metalness: 0.95, roughness: 0.12 }));
      const greenFiberboard = registerMat(new THREE.MeshStandardMaterial({ color: 0x142018, metalness: 0.5, roughness: 0.45 }));
      const redPlastic = registerMat(new THREE.MeshStandardMaterial({ color: 0xcc2222, metalness: 0.3, roughness: 0.2 }));
      const blackRubber = registerMat(new THREE.MeshStandardMaterial({ color: 0x111113, metalness: 0.1, roughness: 0.8 }));

      const glowingCyan = registerMat(new THREE.MeshStandardMaterial({
        color: 0x002233,
        emissive: 0x00e5ff,
        emissiveIntensity: 2.2,
        roughness: 0.08
      }));
      const glowingBlue = registerMat(new THREE.MeshStandardMaterial({
        color: 0x001133,
        emissive: 0x007BFF,
        emissiveIntensity: 1.2,
        roughness: 0.1
      }));

      // =====================================================================
      // MODULE 1: MICROPROCESSOR Motherboard (boardGroup & heatSinkGroup)
      // =====================================================================
      const motherboardGeo = registerGeo(new THREE.BoxGeometry(4.4, 0.12, 4.4));
      baseMotherboard = new THREE.Mesh(motherboardGeo, greenFiberboard);
      baseMotherboard.receiveShadow = true;
      boardGroup.add(baseMotherboard);

      const tracePaths = [
        [-1.6, -1.6, 1.2, 0.05], [1.6, -1.6, 1.2, 0.05],
        [-1.6, 1.6, 1.2, 0.05], [1.6, 1.6, 1.2, 0.05],
        [-1.2, -1.2, 0.05, 0.8], [1.2, -1.2, 0.05, 0.8],
        [-1.2, 1.2, 0.05, 0.8], [1.2, 1.2, 0.05, 0.8],
      ];
      
      tracePaths.forEach(([x, z, w, h]) => {
        const traceGeo = registerGeo(new THREE.BoxGeometry(w, 0.02, h));
        const traceMesh = new THREE.Mesh(traceGeo, glowingBlue);
        traceMesh.position.set(x, 0.07, z);
        traceMesh.userData.originalX = x;
        traceMesh.userData.originalZ = z;
        boardGroup.add(traceMesh);
        circuitLines.push(traceMesh);
      });

      const pinGridCount = 7;
      const pinGeo = registerGeo(new THREE.CylinderGeometry(0.04, 0.04, 0.28, 8));
      
      motherboardPins = [];
      for (let xIdx = 0; xIdx < pinGridCount; xIdx++) {
        for (let zIdx = 0; zIdx < pinGridCount; zIdx++) {
          if (Math.abs(xIdx - 3) < 2 && Math.abs(zIdx - 3) < 2) continue;
          
          const pin = new THREE.Mesh(pinGeo, goldPlate);
          pin.position.set(-1.8 + xIdx * 0.6, -0.16, -1.8 + zIdx * 0.6);
          pin.castShadow = true;
          baseMotherboard.add(pin); // Nested child of baseMotherboard
          motherboardPins.push(pin);
        }
      }

      const socketGeo = registerGeo(new THREE.BoxGeometry(2.1, 0.1, 2.1));
      socketMesh = new THREE.Mesh(socketGeo, darkSlateMetal);
      socketMesh.position.y = 0.08; // relative to baseMotherboard
      socketMesh.castShadow = true;
      socketMesh.receiveShadow = true;
      baseMotherboard.add(socketMesh); // Nested child of baseMotherboard

      const siliconGeo = registerGeo(new THREE.BoxGeometry(1.8, 0.16, 1.8));
      siliconCore = new THREE.Mesh(siliconGeo, glowingCyan);
      siliconCore.position.y = 0.18;
      siliconCore.castShadow = true;
      siliconCore.receiveShadow = true;
      boardGroup.add(siliconCore);

      const capGeo = registerGeo(new THREE.BoxGeometry(1.3, 0.08, 1.3));
      chromeCap = new THREE.Mesh(capGeo, chromePolished);
      chromeCap.position.y = 0.1; // relative to siliconCore (0.18 + 0.1 = 0.28 absolute)
      chromeCap.castShadow = true;
      chromeCap.receiveShadow = true;
      siliconCore.add(chromeCap); // Nested child of siliconCore

      // --- SURFACE MOUNTED DEVICES (SMDs) - UPGRADED TO STRUCTURED CAD GRID ---
      smdMeshes = [];
      const smdColors = [chromePolished, darkSlateMetal, redPlastic, goldPlate];

      // Define grid coordinates around the outer margins (avoiding the 2.6x2.6 center socket)
      const smdGridPositions = [];

      // Left Bank Resistors (X = -1.6, Z ranges from -1.0 to 1.0)
      for (let zVal = -0.9; zVal <= 0.9; zVal += 0.3) {
        smdGridPositions.push({ x: -1.6, z: zVal, w: 0.16, h: 0.05, d: 0.08, colorIdx: 0 }); // chrome resistor
      }

      // Right Bank Resistors (X = 1.6, Z ranges from -1.0 to 1.0)
      for (let zVal = -0.9; zVal <= 0.9; zVal += 0.3) {
        smdGridPositions.push({ x: 1.6, z: zVal, w: 0.16, h: 0.05, d: 0.08, colorIdx: 0 }); // chrome resistor
      }

      // Top Row Capacitors (Z = -1.6, X ranges from -1.0 to 1.0)
      for (let xVal = -0.9; xVal <= 0.9; xVal += 0.3) {
        smdGridPositions.push({ x: xVal, z: -1.6, w: 0.08, h: 0.06, d: 0.16, colorIdx: 2 }); // red capacitor
      }

      // Bottom Row Capacitors (Z = 1.6, X ranges from -1.0 to 1.0)
      for (let xVal = -0.9; xVal <= 0.9; xVal += 0.3) {
        smdGridPositions.push({ x: xVal, z: 1.6, w: 0.08, h: 0.06, d: 0.16, colorIdx: 3 }); // gold capacitor
      }

      // Inner Left Decoders (X = -1.25, Z from -0.6 to 0.6)
      for (let zVal = -0.6; zVal <= 0.6; zVal += 0.4) {
        smdGridPositions.push({ x: -1.25, z: zVal, w: 0.10, h: 0.05, d: 0.06, colorIdx: 1 }); // dark metal gate
      }

      // Inner Right Decoders (X = 1.25, Z from -0.6 to 0.6)
      for (let zVal = -0.6; zVal <= 0.6; zVal += 0.4) {
        smdGridPositions.push({ x: 1.25, z: zVal, w: 0.10, h: 0.05, d: 0.06, colorIdx: 1 }); // dark metal gate
      }

      smdGridPositions.forEach(({ x, z, w, h, d, colorIdx }) => {
        const smdGeo = registerGeo(new THREE.BoxGeometry(w, h, d));
        const mat = smdColors[colorIdx];
        const smd = new THREE.Mesh(smdGeo, mat);
        smd.position.set(x, 0.08, z);
        smd.userData.originalX = x;
        smd.userData.originalY = 0.08;
        smd.userData.originalZ = z;
        smd.castShadow = true;
        smd.receiveShadow = true;
        boardGroup.add(smd);
        smdMeshes.push(smd);
      });

      // Add 4 microchip packages (black logic gates with silver pins)
      const icBodyGeo = registerGeo(new THREE.BoxGeometry(0.7, 0.08, 0.5));
      const icLegGeo = registerGeo(new THREE.CylinderGeometry(0.015, 0.015, 0.06, 6));

      const icPositions = [
        [-1.5, 1.4], [1.5, 1.4],
        [-1.5, -1.4], [1.5, -1.4]
      ];

      icPositions.forEach(([x, z], icIdx) => {
        const icBody = new THREE.Mesh(icBodyGeo, darkSlateMetal);
        icBody.position.set(x, 0.1, z);
        icBody.userData.originalX = x;
        icBody.userData.originalY = 0.1;
        icBody.userData.originalZ = z;
        icBody.rotation.y = icIdx % 2 === 0 ? 0 : Math.PI / 2;
        icBody.castShadow = true;
        icBody.receiveShadow = true;
        boardGroup.add(icBody);
        smdMeshes.push(icBody);

        for (let legIdx = 0; legIdx < 3; legIdx++) {
          const zOffset = -0.18 + legIdx * 0.18;
          
          const legL = new THREE.Mesh(icLegGeo, chromePolished);
          legL.position.set(-0.36, -0.04, zOffset);
          legL.rotation.z = -0.3;
          legL.castShadow = true;
          icBody.add(legL);

          const legR = new THREE.Mesh(icLegGeo, chromePolished);
          legR.position.set(0.36, -0.04, zOffset);
          legR.rotation.z = 0.3;
          legR.castShadow = true;
          icBody.add(legR);
        }
      });

      // --- MODULE 1B: MULTI-TIERED COOLING HEAT SINK (heatSinkGroup) ---
      finMeshes = [];
      const finCount = 20;
      const finWidth = 0.04;
      const finHeight = 0.5;
      const finLength = 1.35;
      const finGeo = registerGeo(new THREE.BoxGeometry(finWidth, finHeight, finLength));

      for (let i = 0; i < finCount; i++) {
        const fin = new THREE.Mesh(finGeo, chromePolished);
        const xPos = -0.6 + (i / (finCount - 1)) * 1.2;
        fin.position.set(xPos, 0.57, 0); // resting exactly on the cap
        fin.castShadow = true;
        fin.receiveShadow = true;
        heatSinkGroup.add(fin);
        finMeshes.push(fin);
      }
      boardGroup.add(heatSinkGroup);

      // =====================================================================
      // MODULE 2: INDUSTRIAL ARTICULATED ROBOTIC ARM (armGroup)
      // =====================================================================
      const tableBaseGeo = registerGeo(new THREE.CylinderGeometry(0.7, 0.8, 0.2, 24));
      baseTurntable = new THREE.Mesh(tableBaseGeo, darkSlateMetal);
      baseTurntable.castShadow = true;
      baseTurntable.receiveShadow = true;
      armGroup.add(baseTurntable);

      const tableBaseLowerGeo = registerGeo(new THREE.CylinderGeometry(0.8, 0.9, 0.1, 24));
      const tableBaseLower = new THREE.Mesh(tableBaseLowerGeo, darkSlateMetal);
      tableBaseLower.position.y = -0.15;
      tableBaseLower.castShadow = true;
      tableBaseLower.receiveShadow = true;
      baseTurntable.add(tableBaseLower);

      const toothGeo = registerGeo(new THREE.BoxGeometry(0.06, 0.16, 0.06));
      gearTeeth = [];
      const gearToothCount = 28;
      
      for (let i = 0; i < gearToothCount; i++) {
        const tooth = new THREE.Mesh(toothGeo, chromePolished);
        const theta = (i / gearToothCount) * Math.PI * 2;
        tooth.position.set(Math.cos(theta) * 0.76, 0, Math.sin(theta) * 0.76);
        tooth.rotation.y = -theta;
        tooth.castShadow = true;
        baseTurntable.add(tooth);
        gearTeeth.push(tooth);
      }

      const shoulderGeo = registerGeo(new THREE.BoxGeometry(0.12, 0.8, 0.35));
      const shPlateL = new THREE.Mesh(shoulderGeo, darkSlateMetal);
      shPlateL.position.set(-0.25, 0.45, 0);
      shPlateL.castShadow = true;
      shPlateL.receiveShadow = true;
      baseTurntable.add(shPlateL);

      const shPlateR = new THREE.Mesh(shoulderGeo, darkSlateMetal);
      shPlateR.position.set(0.25, 0.45, 0);
      shPlateR.castShadow = true;
      shPlateR.receiveShadow = true;
      baseTurntable.add(shPlateR);

      // Joint 1: Main pivot pin (Shoulder)
      const jointPinGeo = registerGeo(new THREE.CylinderGeometry(0.08, 0.08, 0.58, 12));
      joint1 = new THREE.Mesh(jointPinGeo, chromePolished);
      joint1.position.set(0, 0.65, 0);
      joint1.rotation.z = Math.PI / 2;
      joint1.castShadow = true;
      baseTurntable.add(joint1);

      // Decoupled upperArmGroup
      upperArmGroup = new THREE.Group();
      upperArmGroup.position.set(0, 0.65, 0); 
      baseTurntable.add(upperArmGroup);

      const strutGeo = registerGeo(new THREE.CylinderGeometry(0.04, 0.04, 1.9, 8));
      const strutL = new THREE.Mesh(strutGeo, darkSlateMetal);
      strutL.position.set(0.13, 0.95, 0);
      strutL.castShadow = true;
      strutL.receiveShadow = true;
      upperArmGroup.add(strutL);

      const strutR = new THREE.Mesh(strutGeo, darkSlateMetal);
      strutR.position.set(-0.13, 0.95, 0);
      strutR.castShadow = true;
      strutR.receiveShadow = true;
      upperArmGroup.add(strutR);

      const braceGeo = registerGeo(new THREE.BoxGeometry(0.32, 0.03, 0.15)); // width increased to 0.32
      const brace1 = new THREE.Mesh(braceGeo, chromePolished);
      brace1.position.set(0, 0.5, 0);
      brace1.rotation.y = 0.5;
      brace1.castShadow = true;
      upperArmGroup.add(brace1);

      const brace2 = new THREE.Mesh(braceGeo, chromePolished);
      brace2.position.set(0, 1.4, 0);
      brace2.rotation.y = -0.5;
      brace2.castShadow = true;
      upperArmGroup.add(brace2);

      // Piston mounting axle (connects the two parallel struts structurally)
      const pistonAxleGeo = registerGeo(new THREE.CylinderGeometry(0.02, 0.02, 0.30, 8)); // length increased to 0.30
      const pistonAxle = new THREE.Mesh(pistonAxleGeo, chromePolished);
      pistonAxle.position.set(0, 0.4, 0.15);
      pistonAxle.rotation.z = Math.PI / 2;
      pistonAxle.castShadow = true;
      upperArmGroup.add(pistonAxle);

      // Centering spacers on piston axle
      const spacerGeo = registerGeo(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 8));
      const spacerL = new THREE.Mesh(spacerGeo, darkSlateMetal);
      spacerL.position.set(0.08, 0.4, 0.15);
      spacerL.rotation.z = Math.PI / 2;
      spacerL.castShadow = true;
      upperArmGroup.add(spacerL);

      const spacerR = new THREE.Mesh(spacerGeo, darkSlateMetal);
      spacerR.position.set(-0.08, 0.4, 0.15);
      spacerR.rotation.z = Math.PI / 2;
      spacerR.castShadow = true;
      upperArmGroup.add(spacerR);

      // Piston cylinder
      const cylinderGeo = registerGeo(new THREE.CylinderGeometry(0.07, 0.07, 0.8, 10));
      pistonCylinder = new THREE.Mesh(cylinderGeo, darkSlateMetal);
      pistonCylinder.position.set(0, 0.4, 0.15);
      pistonCylinder.rotation.x = 0.2;
      pistonCylinder.castShadow = true;
      pistonCylinder.receiveShadow = true;
      upperArmGroup.add(pistonCylinder);

      const rodGeo = registerGeo(new THREE.CylinderGeometry(0.035, 0.035, 1.2, 10));
      pistonRod = new THREE.Mesh(rodGeo, chromePolished);
      pistonRod.position.y = 0.95; 
      pistonRod.castShadow = true;
      pistonCylinder.add(pistonRod);

      // Collar/Bracket at top of the piston rod for realistic hydraulic coupling
      const collarGeo = registerGeo(new THREE.CylinderGeometry(0.055, 0.055, 0.1, 10));
      const collar = new THREE.Mesh(collarGeo, darkSlateMetal);
      collar.position.y = 0.6;
      collar.rotation.z = Math.PI / 2;
      collar.castShadow = true;
      pistonRod.add(collar);

      // Joint 2: Elbow pivot pin (length extended to cross/connect the struts)
      const elbowCogGeo = registerGeo(new THREE.CylinderGeometry(0.18, 0.18, 0.32, 12));
      joint2 = new THREE.Mesh(elbowCogGeo, chromePolished);
      joint2.position.set(0, 1.9, 0); 
      joint2.rotation.z = Math.PI / 2;
      joint2.castShadow = true;
      upperArmGroup.add(joint2); 

      // Decoupled forearmGroup
      forearmGroup = new THREE.Group();
      forearmGroup.position.set(0, 1.9, 0);
      upperArmGroup.add(forearmGroup);

      const forearmStrutGeo = registerGeo(new THREE.CylinderGeometry(0.045, 0.045, 1.5, 8));
      const forearmStrut = new THREE.Mesh(forearmStrutGeo, darkSlateMetal);
      forearmStrut.position.y = 0.75;
      forearmStrut.castShadow = true;
      forearmStrut.receiveShadow = true;
      forearmGroup.add(forearmStrut);

      // Hydraulic attachment brackets on forearm (clevis design to avoid piston collar clipping)
      const forearmBracketGeo = registerGeo(new THREE.BoxGeometry(0.025, 0.12, 0.16));
      const forearmBracketL = new THREE.Mesh(forearmBracketGeo, darkSlateMetal);
      forearmBracketL.position.set(0.065, 0.3, 0.12);
      forearmBracketL.castShadow = true;
      forearmBracketL.receiveShadow = true;
      forearmGroup.add(forearmBracketL);

      const forearmBracketR = new THREE.Mesh(forearmBracketGeo, darkSlateMetal);
      forearmBracketR.position.set(-0.065, 0.3, 0.12);
      forearmBracketR.castShadow = true;
      forearmBracketR.receiveShadow = true;
      forearmGroup.add(forearmBracketR);

      const forearmPinGeo = registerGeo(new THREE.CylinderGeometry(0.02, 0.02, 0.16, 8));
      const forearmPin = new THREE.Mesh(forearmPinGeo, chromePolished);
      forearmPin.position.set(0, 0.3, 0.12);
      forearmPin.rotation.z = Math.PI / 2;
      forearmPin.castShadow = true;
      forearmGroup.add(forearmPin);

      // Wrist joint
      const wristGeo = registerGeo(new THREE.SphereGeometry(0.13, 12, 12));
      wristGroup = new THREE.Mesh(wristGeo, chromePolished);
      wristGroup.position.y = 1.5;
      wristGroup.castShadow = true;
      forearmGroup.add(wristGroup);

      // Claw gripper
      const clawBaseGeo = registerGeo(new THREE.BoxGeometry(0.24, 0.08, 0.24));
      const clawBase = new THREE.Mesh(clawBaseGeo, darkSlateMetal);
      clawBase.position.y = 0.15;
      clawBase.castShadow = true;
      clawBase.receiveShadow = true;
      wristGroup.add(clawBase);

      const fingerGeo = registerGeo(new THREE.BoxGeometry(0.04, 0.26, 0.08));
      clawLeft = new THREE.Mesh(fingerGeo, chromePolished);
      clawLeft.position.set(-0.08, 0.13, 0);
      clawLeft.castShadow = true;
      clawBase.add(clawLeft);

      clawRight = new THREE.Mesh(fingerGeo, chromePolished);
      clawRight.position.set(0.08, 0.13, 0);
      clawRight.castShadow = true;
      clawBase.add(clawRight);

      // Outward-pointing laser beam
      const laserConeGeo = registerGeo(new THREE.ConeGeometry(0.48, 4.2, 16, 1, true));
      laserConeGeo.rotateX(Math.PI);    
      laserConeGeo.translate(0, 2.1, 0); 
      const laserConeMat = registerMat(new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      }));
      laserBeam = new THREE.Mesh(laserConeGeo, laserConeMat);
      laserBeam.position.y = 0.2;
      clawBase.add(laserBeam);

      // Procedural wires
      const curve1 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.1, 0.4),
        new THREE.Vector3(0.3, 0.3, 0.6),
        new THREE.Vector3(0.1, 0.7, 0.4)
      ]);
      const tubeGeo1 = registerGeo(new THREE.TubeGeometry(curve1, 16, 0.035, 8, false));
      cablesMesh1 = new THREE.Mesh(tubeGeo1, blackRubber);
      cablesMesh1.castShadow = true;
      baseTurntable.add(cablesMesh1);

      const curve2 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.18, 0.4, 0.05),
        new THREE.Vector3(0.25, 1.05, 0.2),
        new THREE.Vector3(0.18, 1.7, 0.05)
      ]);
      const tubeGeo2 = registerGeo(new THREE.TubeGeometry(curve2, 16, 0.025, 8, false));
      cablesMesh2 = new THREE.Mesh(tubeGeo2, blackRubber);
      cablesMesh2.castShadow = true;
      upperArmGroup.add(cablesMesh2);

      // Aligned Position near Motherboard to track CPU core
      armGroup.position.set(2.8, -0.25, 1.0);

      // =====================================================================
      // MODULE 3: FLOATING GLASSMORPHIC CONCEPT 2 SHAPES (glassGroup)
      // =====================================================================
      const glassMat = registerMat(new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.96, 
        opacity: 0.9,
        transparent: true,
        roughness: 0.14,
        metalness: 0.02,
        thickness: 1.6,
        ior: 1.54,
        side: THREE.DoubleSide,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08
      }));

      // Faceted, technical glass shapes to avoid circular components in background
      const glassBoxGeo = registerGeo(new THREE.BoxGeometry(0.9, 0.9, 0.9));
      const glassBox = new THREE.Mesh(glassBoxGeo, glassMat);
      glassBox.position.set(1.6, 3.2, -1.0);
      glassGroup.add(glassBox);

      const glassOctahedronGeo = registerGeo(new THREE.OctahedronGeometry(0.9));
      const glassOctahedron = new THREE.Mesh(glassOctahedronGeo, glassMat);
      glassOctahedron.position.set(-1.8, 2.5, -1.8);
      glassOctahedron.rotation.set(0.4, 0.15, 0.75);
      glassGroup.add(glassOctahedron);

      const glassDodecahedronGeo = registerGeo(new THREE.DodecahedronGeometry(0.6));
      const glassDodecahedron = new THREE.Mesh(glassDodecahedronGeo, glassMat);
      glassDodecahedron.position.set(0, 4.0, -2.4);
      glassGroup.add(glassDodecahedron);

      // =====================================================================
      // MODULE 4: HOLOGRAPHIC GLASS WORKSTATION (monitorGroup)
      // =====================================================================
      const screenPaneGeo = registerGeo(new THREE.BoxGeometry(5.0, 3.2, 0.04));
      const screenPaneMat = registerMat(new THREE.MeshPhysicalMaterial({
        color: 0x007BFF,
        emissive: 0x002288,
        emissiveIntensity: 0.9,
        transparent: true,
        opacity: 0.35,
        roughness: 0.1,
        metalness: 0.1,
        transmission: 0.9,
        ior: 1.52,
        side: THREE.DoubleSide
      }));
      const screenPane = new THREE.Mesh(screenPaneGeo, screenPaneMat);
      monitorGroup.add(screenPane);

      const bezelMat = registerMat(new THREE.MeshStandardMaterial({
        color: 0x0c0c0e,
        emissive: 0x007BFF,
        emissiveIntensity: 0.4,
        metalness: 0.95,
        roughness: 0.15
      }));
      
      const topBottomGeo = registerGeo(new THREE.BoxGeometry(5.2, 0.1, 0.08));
      const leftRightGeo = registerGeo(new THREE.BoxGeometry(0.1, 3.4, 0.08));

      const bezelTop = new THREE.Mesh(topBottomGeo, bezelMat);
      bezelTop.position.set(0, 1.65, 0);
      monitorGroup.add(bezelTop);

      const bezelBottom = new THREE.Mesh(topBottomGeo, bezelMat);
      bezelBottom.position.set(0, -1.65, 0);
      monitorGroup.add(bezelBottom);

      const bezelLeft = new THREE.Mesh(leftRightGeo, bezelMat);
      bezelLeft.position.set(-2.55, 0, 0);
      monitorGroup.add(bezelLeft);

      const bezelRight = new THREE.Mesh(leftRightGeo, bezelMat);
      bezelRight.position.set(2.55, 0, 0);
      monitorGroup.add(bezelRight);

      // Solid stand (Z-aligned completely behind screen at -0.11)
      const standPoleGeo = registerGeo(new THREE.CylinderGeometry(0.06, 0.06, 1.2, 12));
      const standPole = new THREE.Mesh(standPoleGeo, chromePolished);
      standPole.position.set(0, -2.1, -0.11); 
      standPole.castShadow = true;
      monitorGroup.add(standPole);

      const standPlateGeo = registerGeo(new THREE.BoxGeometry(1.8, 0.06, 1.2));
      const standPlate = new THREE.Mesh(standPlateGeo, darkSlateMetal);
      standPlate.position.set(0, -2.7, -0.11); 
      standPlate.receiveShadow = true;
      monitorGroup.add(standPlate);

      // Back bracket connecting screen to pole (thickness increased to 0.18 to prevent Z-fighting)
      const bracketGeo = registerGeo(new THREE.BoxGeometry(0.4, 0.4, 0.18));
      const bracketMat = registerMat(new THREE.MeshStandardMaterial({
        color: 0x1f1f23,
        metalness: 0.85,
        roughness: 0.22
      }));
      const bracket = new THREE.Mesh(bracketGeo, bracketMat);
      bracket.position.set(0, -1.4, -0.11);
      bracket.castShadow = true;
      monitorGroup.add(bracket);

      // Translucent UI panels
      const uiPlateMat = registerMat(new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        emissive: 0x00a8cc,
        emissiveIntensity: 1.5,
        transparent: true,
        opacity: 0.18,
        roughness: 0.05
      }));

      const uiLineMat = registerMat(new THREE.LineBasicMaterial({ color: 0x00e5ff }));

      const uiPanels = [
        { w: 4.6, h: 0.4, y: 1.2 },    
        { w: 2.4, h: 1.4, x: -1.0, y: 0.1 },  
        { w: 1.6, h: 1.4, x: 1.4, y: 0.1 }    
      ];

      uiPanels.forEach(({ w, h, x = 0, y }) => {
        const boxGeo = registerGeo(new THREE.BoxGeometry(w, h, 0.01));
        const plate = new THREE.Mesh(boxGeo, uiPlateMat);
        plate.position.set(x, y, 0.03); 
        monitorGroup.add(plate);

        const edgesGeo = registerGeo(new THREE.EdgesGeometry(boxGeo));
        const outline = new THREE.LineSegments(edgesGeo, uiLineMat);
        outline.position.copy(plate.position);
        monitorGroup.add(outline);
      });

      monitorGroup.position.set(0, -15, 0);
      monitorGroup.scale.set(0.001, 0.001, 0.001);

      // =====================================================================
      // MODULE 5: SERVER RACKS (serverGroup)
      // =====================================================================
      serverLEDs = [];
      const serverSlabGeo = registerGeo(new THREE.BoxGeometry(1.2, 3.6, 1.4));

      [-1.8, 0, 1.8].forEach((xPos) => {
        const cabinet = new THREE.Mesh(serverSlabGeo, darkSlateMetal);
        cabinet.position.set(xPos, 0.5, 0);
        cabinet.castShadow = true;
        cabinet.receiveShadow = true;
        serverGroup.add(cabinet);

        const doorGeo = registerGeo(new THREE.BoxGeometry(1.0, 3.2, 0.05));
        const doorMat = registerMat(new THREE.MeshStandardMaterial({
          color: 0x0c0c0e,
          metalness: 0.9,
          roughness: 0.15
        }));
        const door = new THREE.Mesh(doorGeo, doorMat);
        door.position.set(0, 0, 0.7); 
        door.castShadow = true;
        cabinet.add(door);

        const ledGeo = registerGeo(new THREE.SphereGeometry(0.045, 8, 8));
        const rows = 12;

        for (let row = 0; row < rows; row++) {
          const isBlue = Math.random() > 0.45;
          const ledMat = registerMat(new THREE.MeshStandardMaterial({
            color: 0x111111,
            emissive: isBlue ? 0x007BFF : 0x00e5ff,
            emissiveIntensity: 1.5
          }));
          const led = new THREE.Mesh(ledGeo, ledMat);
          led.position.set(0.4, -1.4 + row * 0.25, 0.03);
          door.add(led);

          serverLEDs.push({
            mesh: led,
            baseIntensity: 1.2 + Math.random() * 2.2,
            blinkSpeed: 2.0 + Math.random() * 3.5,
            phase: Math.random() * Math.PI
          });
        }
      });

      // Floor plinth base connecting all three server cabinets structurally
      const serverBaseGeo = registerGeo(new THREE.BoxGeometry(4.9, 0.1, 1.5));
      const serverBase = new THREE.Mesh(serverBaseGeo, darkSlateMetal);
      serverBase.position.set(0, -1.35, 0);
      serverBase.castShadow = true;
      serverBase.receiveShadow = true;
      serverGroup.add(serverBase);

      // Overhead chrome support rails (lifted to y = 2.33 to rest flush on top)
      const railGeo = registerGeo(new THREE.CylinderGeometry(0.03, 0.03, 4.8, 8));
      const railFront = new THREE.Mesh(railGeo, chromePolished);
      railFront.position.set(0, 2.33, 0.6);
      railFront.rotation.z = Math.PI / 2;
      railFront.castShadow = true;
      serverGroup.add(railFront);

      const railBack = new THREE.Mesh(railGeo, chromePolished);
      railBack.position.set(0, 2.33, -0.6);
      railBack.rotation.z = Math.PI / 2;
      railBack.castShadow = true;
      serverGroup.add(railBack);

      serverGroup.position.set(0, -15, -34);
      serverGroup.scale.set(0.001, 0.001, 0.001);

      // =====================================================================
      // MODULE 6: STARFIELD & GRID COORDINATES (cosmicGroup)
      // =====================================================================
      const coordGeo = registerGeo(new THREE.BufferGeometry());
      const starsCount = 350;
      const positions = new Float32Array(starsCount * 3);
      const speeds = [];

      for (let i = 0; i < starsCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 90;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 90 - 10;
        speeds.push(0.015 + Math.random() * 0.035);
      }

      coordGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const coordMat = registerMat(new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.045,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
      }));
      const fieldPoints = new THREE.Points(coordGeo, coordMat);
      cosmicGroup.add(fieldPoints);

      const floorGrid = new THREE.GridHelper(60, 30, 0x007BFF, 0x222226);
      floorGrid.position.y = -6.0;
      floorGrid.material.transparent = true;
      floorGrid.material.opacity = 0.22;
      registerGeo(floorGrid.geometry);
      registerMat(floorGrid.material);
      scene.add(floorGrid);

      // --- 8. MOUSE & SCROLL STATE CONTROLLER ──────────────────────────────
      const mouse = new THREE.Vector2(0, 0);
      const targetMouse = new THREE.Vector2(0, 0);

      let scrollY = 0;
      let targetScrollY = 0;
      let lastScrollY = 0;
      let lastScrollTime = performance.now();
      let scrollVelocity = 0;
      let targetVelocity = 0;
      let lastTime = 0;

      const handleMouseMove = (e) => {
        targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      };

      const handleScroll = () => {
        const now = performance.now();
        const currentScrollY = window.scrollY;
        const dt = now - lastScrollTime;

        if (dt > 0) {
          const dy = Math.abs(currentScrollY - lastScrollY);
          targetVelocity = dy / dt;
        }

        lastScrollY = currentScrollY;
        lastScrollTime = now;
        targetScrollY = currentScrollY;
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("scroll", handleScroll, { passive: true });

      // --- 9. WEBGL ANIMATION LOOP ─────────────────────────────────────────
      const animate = () => {
        if (!isMounted) return;
        animationFrameId = requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();
        const deltaTime = elapsedTime - lastTime;
        lastTime = elapsedTime;

        // Inertia tracking
        mouse.x += (targetMouse.x - mouse.x) * 0.08;
        mouse.y += (targetMouse.y - mouse.y) * 0.08;
        scrollY += (targetScrollY - scrollY) * 0.08;
        scrollVelocity += (targetVelocity - scrollVelocity) * 0.12;
        targetVelocity *= 0.88;

        const maxScrollHeight = typeof document !== "undefined"
          ? Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
          : 3000;
        const scrollPercent = Math.min(1.0, Math.max(0.0, scrollY / maxScrollHeight));

        // Camera lerp
        const targetCam = interpolateCamera(scrollPercent);
        let camX = targetCam.pos.x + mouse.x * 1.8;
        let camY = targetCam.pos.y + mouse.y * 1.4;
        let camZ = targetCam.pos.z + Math.sin(elapsedTime * 0.2) * 0.2;

        let lookAtX = targetCam.lookAt.x;
        let lookAtY = targetCam.lookAt.y;
        let lookAtZ = targetCam.lookAt.z;

        if (isMobile) {
          // On mobile, center the stage 0 camera to keep microprocessor in the middle
          if (scrollPercent < 0.28) {
            const factor = 1.0 - (scrollPercent / 0.28);
            camX += 1.6 * factor;
            lookAtX -= 0.8 * factor;
          }
          camY += 0.8; // Shift camera slightly up on mobile to nudge graphics to top half
          camZ += 1.2; // Shift camera slightly back to fit the full setup
        }

        camera.position.set(camX, camY, camZ);
        camera.lookAt(lookAtX, lookAtY, lookAtZ);

        // ─── STAGE INTERPOLATIONS ───

        // 1. Motherboard & Heat Sink Fins (dismantling on scroll)
        if (scrollPercent < 0.45) {
          boardGroup.visible = true;
          const dismantleT = Math.min(1.0, scrollPercent / 0.28);

          // Board slides down (socketMesh and motherboardPins follow hierarchically)
          baseMotherboard.position.y = -dismantleT * 2.8;
          
          // Silicon core slides up (chromeCap follows hierarchically)
          siliconCore.position.y = 0.18 + dismantleT * 2.2;
          
          // Silicon core (and chromeCap) rotates only when dismantling (dismantleT > 0)
          siliconCore.rotation.y += 0.005 * (1.0 + scrollVelocity * 2.0) * dismantleT;

          // Traces & SMDs expand outward radially and float
          circuitLines.forEach((line) => {
            line.position.x = line.userData.originalX + line.userData.originalX * dismantleT * 0.4;
            line.position.z = line.userData.originalZ + line.userData.originalZ * dismantleT * 0.4;
            line.position.y = 0.07 - dismantleT * 1.4;
          });
          smdMeshes.forEach((smd) => {
            smd.position.x = smd.userData.originalX + smd.userData.originalX * dismantleT * 0.3;
            smd.position.z = smd.userData.originalZ + smd.userData.originalZ * dismantleT * 0.3;
            smd.position.y = smd.userData.originalY - dismantleT * 2.4;
          });

          // Heat Sink cooling fins dismantle individually in a swirling spiral (wave is suppressed at dismantleT = 0)
          finMeshes.forEach((fin, idx) => {
            const angle = (idx / finCount) * Math.PI * 2.0;
            const spiralX = Math.cos(angle) * dismantleT * 2.0;
            const spiralZ = Math.sin(angle) * dismantleT * 2.0;
            
            fin.position.x = fin.userData.originalX !== undefined 
              ? fin.userData.originalX 
              : (fin.userData.originalX = fin.position.x);

            fin.position.set(
              fin.userData.originalX + spiralX,
              0.57 + dismantleT * 3.0 + Math.sin(elapsedTime + idx) * 0.2 * dismantleT,
              spiralZ
            );
            fin.rotation.set(
              dismantleT * Math.cos(elapsedTime + idx),
              dismantleT * Math.sin(elapsedTime + idx),
              dismantleT * 0.5
            );
          });

          const opacity = 1.0 - (scrollPercent / 0.45);
          greenFiberboard.opacity = opacity;
          chromePolished.opacity = opacity;
          glowingCyan.emissiveIntensity = opacity * 3.5;
        } else {
          boardGroup.visible = false;
        }

        // 2. Glassmorphic floating shapes (Concept 2)
        glassGroup.rotation.y += 0.003;
        glassGroup.rotation.z += 0.0015;

        glassBox.position.y = 3.2 + Math.sin(elapsedTime * 0.7) * 0.25;
        glassBox.rotation.x += 0.004;
        glassBox.rotation.y += 0.005;

        glassOctahedron.rotation.y += 0.006;
        glassOctahedron.rotation.z += 0.003;

        glassDodecahedron.rotation.x += 0.008;
        glassDodecahedron.rotation.y += 0.004;

        if (scrollPercent < 0.28) {
          glassGroup.position.set(0, 0, 0);
          glassGroup.scale.setScalar(1.0);
        } else if (scrollPercent < 0.55) {
          const t = (scrollPercent - 0.28) / 0.27;
          glassGroup.position.x = THREE.MathUtils.lerp(0, -2.4, t);
          glassGroup.position.y = THREE.MathUtils.lerp(0, -1.8, t);
          glassGroup.position.z = THREE.MathUtils.lerp(0, -4.0, t);
        } else if (scrollPercent < 0.8) {
          const t = (scrollPercent - 0.55) / 0.25;
          glassGroup.position.x = THREE.MathUtils.lerp(-2.4, 0, t);
          glassGroup.position.y = THREE.MathUtils.lerp(-1.8, 1.0, t);
          glassGroup.position.z = THREE.MathUtils.lerp(-4.0, -32, t);
          glassGroup.scale.setScalar(THREE.MathUtils.lerp(1.0, 0.7, t));
        }

        // 3. Robotic Arm (armGroup)
        let turntableTargetRotY = 0;
        let shoulderTargetRotX = 0.0;
        let elbowTargetRotX = 0.45;
        let armBaseTargetPos = new THREE.Vector3(2.8, -0.25, 1.0);

        // Angle interpolation helper using shortest path to prevent full-rotation snapping
        const lerpAngle = (a, b, tVal) => {
          const diff = b - a;
          const shortDiff = Math.atan2(Math.sin(diff), Math.cos(diff));
          return a + shortDiff * tVal;
        };

        if (scrollPercent < 0.28) {
          // Stage 0: Turntable scanning CPU die
          const t = scrollPercent / 0.28;
          const tSmooth = t * t * (3 - 2 * t);
          armBaseTargetPos.set(2.8, -0.25, 1.0);
          
          // Lock turntable to point towards CPU base angle, with a scanning sway that dampens as scroll occurs
          const scanTurntable = Math.atan2(-2.8, -1.0) + Math.sin(elapsedTime * 0.8) * 0.15;
          const scanShoulder = 0.45 + Math.sin(elapsedTime * 0.6) * 0.1;
          const scanElbow = 0.7 + Math.cos(elapsedTime * 0.6) * 0.08;

          turntableTargetRotY = lerpAngle(scanTurntable, Math.atan2(-2.8, -1.0), tSmooth);
          shoulderTargetRotX = THREE.MathUtils.lerp(scanShoulder, 0.45, tSmooth);
          elbowTargetRotX = THREE.MathUtils.lerp(scanElbow, 0.7, tSmooth);

          laserBeam.visible = true;
          laserBeam.material.opacity = (0.18 + Math.sin(elapsedTime * 4.0) * 0.04) * (1.0 - tSmooth);
        } else if (scrollPercent < 0.55) {
          // Stage 1: Moving left side to project monitor screen
          const t = (scrollPercent - 0.28) / 0.27;
          const tSmooth = t * t * (3 - 2 * t);
          armBaseTargetPos.lerpVectors(
            new THREE.Vector3(2.8, -0.25, 1.0),
            new THREE.Vector3(-0.8, -4.2, -6.0),
            tSmooth
          );
          
          // Smoothly transition turntable and joint angles (no snapping)
          turntableTargetRotY = lerpAngle(Math.atan2(-2.8, -1.0), Math.PI * 0.58, tSmooth);
          shoulderTargetRotX = THREE.MathUtils.lerp(0.45, 0.5, tSmooth);
          elbowTargetRotX = THREE.MathUtils.lerp(0.7, 0.8, tSmooth);

          laserBeam.visible = true;
          laserBeam.material.opacity = tSmooth * (0.68 + Math.sin(elapsedTime * 5.0) * 0.08); // pulsing laser
        } else if (scrollPercent < 0.8) {
          // Stage 2: Moving back behind server racks
          const t = (scrollPercent - 0.55) / 0.25;
          const tSmooth = t * t * (3 - 2 * t);
          armBaseTargetPos.lerpVectors(
            new THREE.Vector3(-0.8, -4.2, -6.0),
            new THREE.Vector3(3.0, 0.4, -33.5),
            tSmooth
          );
          
          // Smoothly transition turntable and joints (no snapping)
          turntableTargetRotY = lerpAngle(Math.PI * 0.58, -Math.PI * 0.5, tSmooth);
          
          const targetShoulder = 0.2 + Math.sin(elapsedTime) * 0.12 * tSmooth;
          const targetElbow = 0.45 + Math.cos(elapsedTime) * 0.06 * tSmooth;
          shoulderTargetRotX = THREE.MathUtils.lerp(0.5, targetShoulder, tSmooth);
          elbowTargetRotX = THREE.MathUtils.lerp(0.8, targetElbow, tSmooth);

          laserBeam.visible = false;
        } else {
          // Stage 3: Dissolving out into space
          const t = Math.min(1.0, (scrollPercent - 0.8) / 0.2);
          const tSmooth = t * t * (3 - 2 * t);
          armBaseTargetPos.lerpVectors(
            new THREE.Vector3(3.0, 0.4, -33.5),
            new THREE.Vector3(8.0, -3.6, -33.5),
            tSmooth
          );
          
          turntableTargetRotY = -Math.PI * 0.5;
          shoulderTargetRotX = 0.2;
          elbowTargetRotX = 0.45;
          laserBeam.visible = false;
        }

        // Apply configurations to groups
        armGroup.position.copy(armBaseTargetPos);
        baseTurntable.rotation.y = turntableTargetRotY;
        upperArmGroup.rotation.x = shoulderTargetRotX; 
        forearmGroup.rotation.x = elbowTargetRotX;

        // Exact hydraulic piston kinematics (cylinder tilts and rod translates dynamically)
        const yOffset = 0.3 * Math.cos(elbowTargetRotX) - 0.12 * Math.sin(elbowTargetRotX);
        const zOffset = 0.3 * Math.sin(elbowTargetRotX) + 0.12 * Math.cos(elbowTargetRotX);
        const dy = 1.9 + yOffset - 0.4;
        const dz = zOffset - 0.15; // matching base axle Z
        const pistonAngle = Math.atan2(dz, dy);
        pistonCylinder.rotation.x = pistonAngle;
        const pistonDist = Math.sqrt(dy * dy + dz * dz);
        pistonRod.position.y = pistonDist - 0.6; // exact collar alignment

        // Claw grip clamp breathing
        clawLeft.position.x = -0.08 - Math.sin(elapsedTime * 1.8) * 0.025;
        clawRight.position.x = 0.08 + Math.sin(elapsedTime * 1.8) * 0.025;

        // 4. Holographic Glass Workstation Monitor (monitorGroup)
        if (scrollPercent >= 0.35 && scrollPercent < 0.72) {
          monitorGroup.visible = true;
          const tIn = Math.min(1.0, (scrollPercent - 0.35) / 0.15);
          const tOut = Math.min(1.0, (0.72 - scrollPercent) / 0.12);
          const scale = tIn * tOut;

          monitorGroup.scale.setScalar(scale);
          monitorGroup.position.set(1.4, -3.2, -6.5);
          monitorGroup.rotation.y = -Math.PI * 0.08 + Math.sin(elapsedTime * 0.4) * 0.04;
          monitorGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.02;
        } else {
          monitorGroup.visible = false;
        }

        // 5. Server cabinets (serverGroup)
        if (scrollPercent >= 0.58 && scrollPercent < 0.95) {
          serverGroup.visible = true;
          const tIn = Math.min(1.0, (scrollPercent - 0.58) / 0.18);
          const tOut = Math.min(1.0, (0.95 - scrollPercent) / 0.15);
          const scale = tIn * tOut;

          serverGroup.scale.setScalar(scale);
          serverGroup.position.set(0, 0.8, -34);

          // LED blink loop
          serverLEDs.forEach(led => {
            const glowVal = Math.sin(elapsedTime * led.blinkSpeed + led.phase) * 0.5 + 0.5;
            led.mesh.material.emissiveIntensity = led.baseIntensity * glowVal;
          });
        } else {
          serverGroup.visible = false;
        }

        // 6. Coordinates starfield drift
        const pointsArr = coordGeo.attributes.position.array;
        for (let i = 0; i < starsCount; i++) {
          pointsArr[i * 3 + 2] += speeds[i] * (1.0 + scrollVelocity * 2.2);
          if (pointsArr[i * 3 + 2] > 40) pointsArr[i * 3 + 2] = -40;
        }
        coordGeo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!isMounted) return;
        const w = window.innerWidth;
        const h = window.innerHeight;
        isMobile = w < 768;

        camera.aspect = w / h;
        const aspectVal = w / h;
        if (aspectVal < 1.0) {
          camera.fov = 60 + (1.0 - aspectVal) * 35;
        } else {
          camera.fov = 60;
        }
        camera.updateProjectionMatrix();

        renderer.setSize(w, h);
        renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.5));
      };

      window.addEventListener("resize", handleResize);

      // --- WebGL Disposal & Cleanup ---
      cleanupFn = () => {
        isMounted = false;
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);

        if (containerRef.current && renderer?.domElement) {
          try {
            containerRef.current.removeChild(renderer.domElement);
          } catch (e) {}
        }

        geometriesToDispose.forEach(geo => geo.dispose());
        materialsToDispose.forEach(mat => mat.dispose());

        if (renderer) renderer.dispose();
      };
    };

    // Load after document font check
    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (isMounted) setTimeout(initThree, 100);
      });
    } else {
      initThree();
    }

    return () => {
      isMounted = false;
      if (cleanupFn) {
        cleanupFn(); // Clean up everything properly if initialized
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="persistent-bg"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        background: "radial-gradient(circle at center, #16161a 0%, #0c0c0e 100%)",
        overflow: "hidden",
      }}
    />
  );
}
