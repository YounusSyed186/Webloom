'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * Webloom3DStudioCanvas
 * ---------------------
 * High-performance Three.js 3D Background Flow:
 * - 9-Waypoint 3D Camera Rig travelling dynamically with scroll
 * - 12 Textured 3D Polaroids & Website Showcase Cards in deep space
 * - Procedural 3D Botanical pressed-flower petals & drifting studio dust motes
 * - Golden 3D spatial spline ribbon connecting the landing sections
 * - Interactive 9-Scene Studio Rangefinder HUD
 */

interface CameraWaypoint {
  t: number;
  pos: [number, number, number];
  look: [number, number, number];
  sceneCode: string;
  sceneName: string;
  targetSelector: string;
}

const CAMERA_WAYPOINTS: CameraWaypoint[] = [
  {
    t: 0.0,
    pos: [0.0, 0.25, 9.2],
    look: [0.0, 0.0, 0.0],
    sceneCode: '01',
    sceneName: 'Sunlit Studio Desk',
    targetSelector: 'body',
  },
  {
    t: 0.14,
    pos: [0.0, -0.4, 5.2],
    look: [0.0, -0.55, -2.8],
    sceneCode: '02',
    sceneName: 'Torn-Paper Archive',
    targetSelector: '#product',
  },
  {
    t: 0.3,
    pos: [-0.55, -1.75, 1.6],
    look: [-0.2, -2.15, -6.4],
    sceneCode: '03',
    sceneName: '3D Browser Exhibition',
    targetSelector: '#templates',
  },
  {
    t: 0.46,
    pos: [0.5, -3.3, -1.8],
    look: [0.15, -3.7, -9.8],
    sceneCode: '04',
    sceneName: 'Atelier Setup Steps',
    targetSelector: '#setup-steps',
  },
  {
    t: 0.6,
    pos: [-0.35, -4.4, -4.2],
    look: [0.0, -4.8, -12.0],
    sceneCode: '05',
    sceneName: 'Field Ledger & QR Pass',
    targetSelector: '#insights-ledger',
  },
  {
    t: 0.72,
    pos: [-0.75, -5.4, -6.2],
    look: [-0.95, -5.8, -14.2],
    sceneCode: '06',
    sceneName: '3D Paper Diorama',
    targetSelector: '#explore',
  },
  {
    t: 0.84,
    pos: [0.0, -6.6, -8.2],
    look: [0.0, -6.9, -16.2],
    sceneCode: '07',
    sceneName: 'Studio Membership',
    targetSelector: '#pricing',
  },
  {
    t: 0.93,
    pos: [0.15, -7.2, -9.4],
    look: [0.0, -7.4, -17.4],
    sceneCode: '08',
    sceneName: 'Stationery Notes FAQ',
    targetSelector: '#faq',
  },
  {
    t: 1.0,
    pos: [0.0, -7.7, -10.4],
    look: [0.0, -7.8, -18.5],
    sceneCode: '09',
    sceneName: 'Lavender Finale',
    targetSelector: '#finale-ribbon',
  },
];

function sampleWaypoints(scrollT: number) {
  const clamped = Math.max(0, Math.min(1, scrollT));
  for (let i = 0; i < CAMERA_WAYPOINTS.length - 1; i++) {
    const a = CAMERA_WAYPOINTS[i];
    const b = CAMERA_WAYPOINTS[i + 1];
    if (clamped >= a.t && clamped <= b.t) {
      const span = b.t - a.t || 1;
      const local = (clamped - a.t) / span;
      const s = local * local * (3 - 2 * local);
      return {
        px: a.pos[0] + (b.pos[0] - a.pos[0]) * s,
        py: a.pos[1] + (b.pos[1] - a.pos[1]) * s,
        pz: a.pos[2] + (b.pos[2] - a.pos[2]) * s,
        lx: a.look[0] + (b.look[0] - a.look[0]) * s,
        ly: a.look[1] + (b.look[1] - a.look[1]) * s,
        lz: a.look[2] + (b.look[2] - a.look[2]) * s,
        activeWaypoint: local < 0.5 ? a : b,
        waypointIdx: local < 0.5 ? i : i + 1,
      };
    }
  }
  const last = CAMERA_WAYPOINTS[CAMERA_WAYPOINTS.length - 1];
  return {
    px: last.pos[0],
    py: last.pos[1],
    pz: last.pos[2],
    lx: last.look[0],
    ly: last.look[1],
    lz: last.look[2],
    activeWaypoint: last,
    waypointIdx: CAMERA_WAYPOINTS.length - 1,
  };
}

export function Webloom3DStudioCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hudState, setHudState] = useState({
    code: '01',
    name: 'Sunlit Studio Desk',
    depthMeters: 0,
    idx: 0,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfaf6ee, 0.032);

    const camera = new THREE.PerspectiveCamera(
      44,
      window.innerWidth / window.innerHeight,
      0.1,
      50
    );

    // 1. Warm Natural Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfaf6ee, 1.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff1cc, 1.4);
    sunLight.position.set(-7, 9, 11);
    scene.add(sunLight);

    // 2. Load Artwork Textures onto 3D Polaroid & Website Cards along the corridor
    const textureLoader = new THREE.TextureLoader();
    const artworkPaths = [
      '/generated/photo-mountain.jpg',
      '/generated/photo-sunset.jpg',
      '/generated/photo-coastal.jpg',
      '/generated/thumb-landscape.jpg',
      '/generated/thumb-monogram.jpg',
      '/generated/thumb-daisy.jpg',
      '/generated/thumb-wave.jpg',
      '/generated/villa-courtyard.jpg',
    ];
    const loadedTextures = artworkPaths.map((url) => {
      const tex = textureLoader.load(url);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    });

    const polaroidGroup = new THREE.Group();
    scene.add(polaroidGroup);

    interface FloatingPolaroid {
      group: THREE.Group;
      basePos: THREE.Vector3;
      baseRot: THREE.Euler;
      offsetPos: THREE.Vector3;
      speed: number;
      phase: number;
    }

    const floatingPolaroids: FloatingPolaroid[] = [];

    const polaroidConfigs: Array<{
      pos: [number, number, number];
      rot: [number, number, number];
      scale: number;
      texIdx: number;
      tint: number;
    }> = [
      { pos: [-4.6, -0.55, 3.8], rot: [0.12, 0.46, -0.15], scale: 1.05, texIdx: 0, tint: 0xfcf9f2 },
      { pos: [4.75, -0.95, 2.7], rot: [-0.1, -0.44, 0.14], scale: 1.0, texIdx: 1, tint: 0xfbf8f1 },
      { pos: [-4.9, -1.45, 0.8], rot: [0.16, 0.38, -0.11], scale: 1.1, texIdx: 2, tint: 0xf7efe0 },
      { pos: [4.55, -2.15, -0.9], rot: [-0.14, -0.42, 0.16], scale: 1.12, texIdx: 3, tint: 0xf4ead9 },
      { pos: [-4.65, -2.85, -2.6], rot: [0.18, 0.4, -0.14], scale: 1.04, texIdx: 4, tint: 0xf6e6d6 },
      { pos: [4.7, -3.65, -4.4], rot: [-0.12, -0.38, 0.12], scale: 1.08, texIdx: 5, tint: 0xe4ecd9 },
      { pos: [-4.5, -4.25, -5.9], rot: [0.14, 0.36, -0.16], scale: 1.02, texIdx: 6, tint: 0xede3f0 },
      { pos: [4.65, -4.95, -7.4], rot: [-0.15, -0.35, 0.13], scale: 1.06, texIdx: 7, tint: 0xfcf9f2 },
      { pos: [-4.8, -5.75, -9.2], rot: [0.1, 0.32, -0.1], scale: 1.05, texIdx: 0, tint: 0xf4ead9 },
      { pos: [4.6, -6.55, -11.0], rot: [-0.12, -0.36, 0.14], scale: 1.04, texIdx: 3, tint: 0xf7efe0 },
      { pos: [-4.55, -7.25, -12.6], rot: [0.14, 0.38, -0.12], scale: 1.0, texIdx: 2, tint: 0xede3f0 },
      { pos: [4.45, -7.85, -14.0], rot: [-0.1, -0.34, 0.1], scale: 1.02, texIdx: 4, tint: 0xfcf9f2 },
    ];

    const frameGeo = new THREE.BoxGeometry(1.18, 1.38, 0.028);
    const photoGeo = new THREE.PlaneGeometry(1.02, 0.96);
    const tapeGeo = new THREE.PlaneGeometry(0.36, 0.12);
    const shadowGeo = new THREE.PlaneGeometry(1.24, 1.44);

    const tapeMat = new THREE.MeshBasicMaterial({
      color: 0xe2c88a,
      transparent: true,
      opacity: 0.72,
      side: THREE.DoubleSide,
    });
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x261c12,
      transparent: true,
      opacity: 0.12,
    });

    polaroidConfigs.forEach((cfg, idx) => {
      const itemGroup = new THREE.Group();
      itemGroup.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      itemGroup.rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2]);
      itemGroup.scale.setScalar(cfg.scale);

      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
      shadowMesh.position.set(0.05, -0.06, -0.04);
      itemGroup.add(shadowMesh);

      const frameMat = new THREE.MeshStandardMaterial({
        color: cfg.tint,
        roughness: 0.88,
        metalness: 0.02,
        transparent: true,
        opacity: 0.86,
      });
      const frameMesh = new THREE.Mesh(frameGeo, frameMat);
      itemGroup.add(frameMesh);

      const photoMat = new THREE.MeshBasicMaterial({
        map: loadedTextures[cfg.texIdx % loadedTextures.length],
        transparent: true,
        opacity: 0.9,
      });
      const photoMesh = new THREE.Mesh(photoGeo, photoMat);
      photoMesh.position.set(0, 0.11, 0.017);
      itemGroup.add(photoMesh);

      const tapeMesh = new THREE.Mesh(tapeGeo, tapeMat);
      tapeMesh.position.set(0, 0.69, 0.02);
      tapeMesh.rotation.z = idx % 2 === 0 ? -0.08 : 0.08;
      itemGroup.add(tapeMesh);

      polaroidGroup.add(itemGroup);
      floatingPolaroids.push({
        group: itemGroup,
        basePos: new THREE.Vector3(cfg.pos[0], cfg.pos[1], cfg.pos[2]),
        baseRot: new THREE.Euler(cfg.rot[0], cfg.rot[1], cfg.rot[2]),
        offsetPos: new THREE.Vector3(0, 0, 0),
        speed: 0.65 + (idx % 4) * 0.16,
        phase: idx * 0.95,
      });
    });

    // 3. Tumbling 3D Botanical Petals
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(0.09, 0.09, 0.11, 0.24, 0, 0.34);
    petalShape.bezierCurveTo(-0.11, 0.24, -0.09, 0.09, 0, 0);
    const petalGeo = new THREE.ShapeGeometry(petalShape, 6);

    const petalColors = [0xe3969e, 0x89a678, 0xe8c56b, 0xc8b5d8, 0xd99b82];
    const petalGroup = new THREE.Group();
    scene.add(petalGroup);

    interface FloatingPetal {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      swaySpeed: number;
      phase: number;
    }

    const floatingPetals: FloatingPetal[] = [];
    for (let i = 0; i < 32; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: petalColors[i % petalColors.length],
        roughness: 0.75,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65,
      });
      const mesh = new THREE.Mesh(petalGeo, mat);
      const side = i % 2 === 0 ? -1 : 1;
      const bx = side * (2.8 + Math.random() * 3.2);
      const by = -Math.random() * 9.5 + 1.2;
      const bz = -Math.random() * 22 + 6.5;

      mesh.position.set(bx, by, bz);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const s = 0.65 + Math.random() * 0.65;
      mesh.scale.setScalar(s);

      petalGroup.add(mesh);
      floatingPetals.push({
        mesh,
        baseX: bx,
        baseY: by,
        baseZ: bz,
        rotSpeedX: (Math.random() - 0.5) * 0.9,
        rotSpeedY: (Math.random() - 0.5) * 1.1,
        rotSpeedZ: (Math.random() - 0.5) * 0.7,
        swaySpeed: 0.6 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // 4. Golden 3D Ribbon Winding Along the Journey
    const curvePointsA = [
      new THREE.Vector3(-3.2, 0.4, 5.0),
      new THREE.Vector3(3.1, -1.1, 1.2),
      new THREE.Vector3(-2.9, -2.5, -2.4),
      new THREE.Vector3(3.0, -3.9, -6.0),
      new THREE.Vector3(-2.8, -5.4, -9.8),
      new THREE.Vector3(2.6, -6.8, -13.2),
      new THREE.Vector3(-2.2, -7.9, -16.5),
    ];
    const splineA = new THREE.CatmullRomCurve3(curvePointsA);
    const tubeGeoA = new THREE.TubeGeometry(splineA, 90, 0.012, 5, false);
    const tubeMatA = new THREE.MeshBasicMaterial({
      color: 0xc89d54,
      transparent: true,
      opacity: 0.28,
    });
    const tubeMeshA = new THREE.Mesh(tubeGeoA, tubeMatA);
    scene.add(tubeMeshA);

    // 5. Sunlit Studio Dust Motes
    const particleCount = 65;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = -Math.random() * 10 + 1.8;
      positions[i * 3 + 2] = -Math.random() * 24 + 7;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe6be5a,
      size: 0.065,
      transparent: true,
      opacity: 0.48,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let targetScrollT = 0;
    let currentScrollT = 0;
    let prevScrollT = 0;
    let scrollVelocity = 0;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const updateScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      targetScrollT = Math.max(0, Math.min(1, window.scrollY / maxScroll));
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    let rafId = 0;
    let lastHudUpdate = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = window.requestAnimationFrame(animate);
      if (document.hidden) return;

      const elapsed = clock.getElapsedTime();

      prevScrollT = currentScrollT;
      currentScrollT += (targetScrollT - currentScrollT) * 0.08;
      const rawVel = (currentScrollT - prevScrollT) * 60;
      scrollVelocity += (rawVel - scrollVelocity) * 0.14;

      currentMouseX += (targetMouseX - currentMouseX) * 0.08;
      currentMouseY += (targetMouseY - currentMouseY) * 0.08;

      const camSample = sampleWaypoints(currentScrollT);

      camera.position.set(
        camSample.px + currentMouseX * 0.32,
        camSample.py - currentMouseY * 0.2,
        camSample.pz
      );
      camera.lookAt(
        camSample.lx + currentMouseX * 0.16,
        camSample.ly - currentMouseY * 0.1,
        camSample.lz
      );

      // Animate 3D Floating Polaroids
      for (let i = 0; i < floatingPolaroids.length; i++) {
        const p = floatingPolaroids[i];
        const floatY = Math.sin(elapsed * p.speed + p.phase) * 0.12;
        const floatRotZ = Math.cos(elapsed * (p.speed * 0.85) + p.phase) * 0.035;

        p.group.position.set(
          p.basePos.x,
          p.basePos.y + floatY,
          p.basePos.z
        );
        p.group.rotation.set(
          p.baseRot.x + currentMouseY * 0.06,
          p.baseRot.y + currentMouseX * 0.1,
          p.baseRot.z + floatRotZ
        );
      }

      // Animate Tumbling Botanical Petals
      for (let i = 0; i < floatingPetals.length; i++) {
        const pt = floatingPetals[i];
        pt.mesh.position.x = pt.baseX + Math.sin(elapsed * pt.swaySpeed + pt.phase) * 0.2;
        pt.mesh.position.y = pt.baseY + Math.cos(elapsed * (pt.swaySpeed * 0.8) + pt.phase) * 0.15;
        pt.mesh.rotation.x += pt.rotSpeedX * 0.01;
        pt.mesh.rotation.y += pt.rotSpeedY * 0.01;
        pt.mesh.rotation.z += pt.rotSpeedZ * 0.01;
      }

      particles.rotation.y = elapsed * 0.015;

      if (elapsed - lastHudUpdate > 0.12) {
        lastHudUpdate = elapsed;
        const depthM = Math.round((9.2 - camSample.pz) * 10);
        setHudState((prev) => {
          if (
            prev.code === camSample.activeWaypoint.sceneCode &&
            prev.depthMeters === depthM
          ) {
            return prev;
          }
          return {
            code: camSample.activeWaypoint.sceneCode,
            name: camSample.activeWaypoint.sceneName,
            depthMeters: depthM,
            idx: camSample.waypointIdx,
          };
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      frameGeo.dispose();
      photoGeo.dispose();
      tapeGeo.dispose();
      shadowGeo.dispose();
      tapeMat.dispose();
      shadowMat.dispose();
      petalGeo.dispose();
      tubeGeoA.dispose();
      tubeMatA.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      loadedTextures.forEach((t) => t.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleJumpToScene = (selector: string) => {
    if (selector === 'body') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      <div
        ref={mountRef}
        aria-hidden="true"
        className="hidden md:block fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      />

      <aside
        aria-label="3D Studio Camera Navigator"
        className="hidden xl:flex fixed bottom-5 right-5 z-40 items-center gap-3 px-3.5 py-2 rounded-full bg-[#FAF6EE]/90 backdrop-blur-md border border-[#D8CBB8] shadow-[0_10px_28px_rgba(32,24,14,0.14)] text-[#1F1A16] select-none"
      >
        <div className="flex items-center gap-2 pr-2.5 border-r border-[#DFD2BD]">
          <span className="w-2 h-2 rounded-full bg-[#5B7A47] animate-pulse" />
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#786D5F] font-semibold leading-none">
              <span>SCENE {hudState.code}/09</span>
              <span>·</span>
              <span className="font-mono text-[9.5px] text-[#9C7248]">
                Z:-{String(hudState.depthMeters).padStart(3, '0')}m
              </span>
            </div>
            <span className="font-serif text-[12px] text-[#1F1A16] font-medium leading-tight mt-0.5 min-w-[122px]">
              {hudState.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {CAMERA_WAYPOINTS.map((wp, i) => {
            const isActive = hudState.idx === i;
            return (
              <button
                key={wp.sceneCode}
                type="button"
                onClick={() => handleJumpToScene(wp.targetSelector)}
                title={`Fly camera to ${wp.sceneCode}: ${wp.sceneName}`}
                className={`transition-all rounded-full ${
                  isActive
                    ? 'w-5 h-2 bg-[#1F1A16] shadow-2xs'
                    : 'w-2 h-2 bg-[#CBBBA4] hover:bg-[#8C7A64] hover:scale-125'
                }`}
              />
            );
          })}
        </div>
      </aside>
    </>
  );
}
