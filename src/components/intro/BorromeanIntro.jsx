import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Typography } from '@mui/material';

// ── Geometría RSI ──────────────────────────────────────────────────────────────
// Triángulo equilátero: I arriba, R abajo-izquierda, S abajo-derecha.
// Cada aro se inclina ligeramente para crear el cruce sobre/bajo borromeo:
//   - I  (top)   : bascula hacia el espectador por la parte superior
//   - R  (b-izq) : bascula hacia el espectador por el cuadrante izq-inferior
//   - S  (b-der) : bascula hacia el espectador por el cuadrante der-inferior
// El eje de la basculación de cada aro apunta PERPENDICULARMENTE al radio
// que une su centro con el centroide, de modo que el cruce con el aro
// adyacente en sentido horario queda siempre "por delante" (+Z).

const D      = 0.50;   // circunradio del triángulo
const R_MAJ  = 0.72;   // radio mayor del toro
const R_TUB  = 0.065;  // radio del tubo
const TILT   = 0.13;   // ~7.5° de inclinación

// Centros en el triángulo
const CX_I  =  0;
const CY_I  =  D;
const CX_R  = -D * Math.sin(Math.PI / 3);
const CY_R  = -D / 2;
const CX_S  =  D * Math.sin(Math.PI / 3);
const CY_S  = -D / 2;

// Ejes perpendiculares al radio (eje de la inclinación borromea):
//   Para aro en dirección (ux, uy), el eje de rotación es (-uy, ux, 0).
// Representamos la inclinación como euler [rx, ry, rz] = TILT * (-uy, ux, 0).
const mkTilt = (cx, cy) => {
  const len = Math.sqrt(cx * cx + cy * cy);
  const ux = cx / len, uy = cy / len;
  return [-uy * TILT, ux * TILT, 0];
};

const RINGS = [
  {
    id: 'I',
    letter: 'I',
    name: 'Imaginario',
    color: '#4a9e55',
    pos: [CX_I, CY_I, 0],
    rot: mkTilt(CX_I || 0.001, CY_I),  // I está arriba → inclina hacia espectador arriba
    delay: 0.15,
  },
  {
    id: 'R',
    letter: 'R',
    name: 'Real',
    color: '#c04040',
    pos: [CX_R, CY_R, 0],
    rot: mkTilt(CX_R, CY_R),
    delay: 0.65,
  },
  {
    id: 'S',
    letter: 'S',
    name: 'Simbólico',
    color: '#3a82b8',
    pos: [CX_S, CY_S, 0],
    rot: mkTilt(CX_S, CY_S),
    delay: 1.15,
  },
];

// ── Componentes Three.js ───────────────────────────────────────────────────────

function Ring({ color, pos, rot, delay }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    if (t < delay) { ref.current.scale.setScalar(0); return; }
    const s = Math.min(1, (t - delay) * 1.3);
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref} position={pos} rotation={rot} scale={0}>
      <torusGeometry args={[R_MAJ, R_TUB, 28, 220]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.32}
        metalness={0.38}
        roughness={0.42}
      />
    </mesh>
  );
}


function Scene() {
  const group = useRef();

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    // Oscilación suave: parece un diagrama que se examina ligeramente
    group.current.rotation.y = Math.sin(t * 0.30) * 0.20;
    group.current.rotation.x = Math.sin(t * 0.18) * 0.06 - 0.04;
  });

  return (
    <group ref={group}>
      {RINGS.map((r) => (
        <Ring key={r.id} color={r.color} pos={r.pos} rot={r.rot} delay={r.delay} />
      ))}

    </group>
  );
}

// ── Labels CSS posicionadas cerca de cada aro ──────────────────────────────────
// Calculadas a partir de la proyección aproximada con camera z=5, fov=42.
// No siguen la rotación (la oscilación es muy pequeña), pero son precisas
// en la pose frontal que se ve durante la mayor parte del intro.

const LABEL_STYLES = {
  I: {
    top: '11%',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
  },
  R: {
    bottom: '17%',
    left: '20%',
    textAlign: 'left',
  },
  S: {
    bottom: '17%',
    right: '20%',
    textAlign: 'right',
  },
};

// ── Componente principal ───────────────────────────────────────────────────────

export default function BorromeanIntro({ onComplete }) {
  const [fading,   setFading]  = useState(false);
  const [gone,     setGone]    = useState(false);
  const [labelsIn, setLabels]  = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLabels(true),  2000);
    const t2 = setTimeout(() => setFading(true),  6800);
    const t3 = setTimeout(() => { setGone(true); onComplete(); }, 7200);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onComplete]);

  if (gone) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        bgcolor: '#090909',
        opacity: fading ? 0 : 1,
        transition: 'opacity 1.4s ease',
        overflow: 'hidden',
      }}
    >
      {/* Canvas Three.js */}
      <Box sx={{ position: 'absolute', inset: 0 }}>
        <Canvas
          camera={{ position: [0, 0.06, 5.0], fov: 42 }}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.11} />
          <pointLight position={[3, 5, 4]}  intensity={1.5} color="#ffffff" />
          <pointLight position={[-3, -2, 3]} intensity={0.45} color="#c8bead" />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </Box>

      {/* Etiquetas R / S / I posicionadas cerca de cada aro */}
      {RINGS.map(({ id, letter, name, color }) => (
        <Box
          key={id}
          sx={{
            position: 'absolute',
            ...LABEL_STYLES[id],
            opacity: labelsIn ? 1 : 0,
            transition: 'opacity 1.5s ease',
            pointerEvents: 'none',
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontSize: { xs: '1.6rem', md: '2.1rem' },
              color,
              lineHeight: 1,
              mb: 0.5,
              fontWeight: 400,
            }}
          >
            {letter}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.5rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'rgba(200,190,173,0.3)',
            }}
          >
            {name}
          </Typography>
        </Box>
      ))}

      {/* Etiqueta central: objet a */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          opacity: labelsIn ? 1 : 0,
          transition: 'opacity 1.8s ease 0.6s',
          pointerEvents: 'none',
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: { xs: '0.62rem', md: '0.72rem' },
            color: 'rgba(200,190,173,0.35)',
            fontStyle: 'italic',
            letterSpacing: '0.04em',
          }}
        >
          objet <em>a</em>
        </Typography>
      </Box>

      {/* Pie: nombre del colegio */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '6%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          opacity: labelsIn ? 1 : 0,
          transition: 'opacity 1.8s ease 0.4s',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: { xs: '0.78rem', md: '0.92rem' },
            color: 'rgba(200,190,173,0.45)',
            letterSpacing: '0.07em',
          }}
        >
          Colegio Michel Foucault
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.48rem',
            letterSpacing: '0.30em',
            textTransform: 'uppercase',
            color: 'rgba(200,190,173,0.17)',
            mt: 0.6,
          }}
        >
          Crítica · Política · Poética
        </Typography>
      </Box>
    </Box>
  );
}
