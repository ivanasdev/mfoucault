import ModuloBase from './ModuloBase';

// eslint-disable-next-line no-unused-vars
import React from 'react';

// ── Fábrica de módulos simples ─────────────────────────────────────────────────
// Cada módulo define solo sus columnas; el resto lo maneja ModuloBase.

function makeModulo({ titulo, descripcion, columnas }) {
  return function Modulo() {
    return <ModuloBase titulo={titulo} descripcion={descripcion} columnas={columnas} />;
  };
}

export { default as Noticias } from './Noticias';
export { default as Seminarios } from './Seminarios';
export { default as Usuarios } from './Usuarios';
export { default as Biblioteca } from './Biblioteca';

export const Eventos = makeModulo({
  titulo: 'Eventos',
  descripcion: 'Conferencias, presentaciones y actividades del Colegio.',
  columnas: [
    { key: 'titulo',       label: 'Título' },
    { key: 'fecha_inicio', label: 'Fecha' },
    { key: 'lugar',        label: 'Lugar' },
    { key: 'modalidad',    label: 'Modalidad' },
    { key: 'publicado',    label: 'Estado', render: v => v ? 'Publicado' : 'Borrador' },
  ],
});

export const Programas = makeModulo({
  titulo: 'Programas Académicos',
  descripcion: 'Licenciaturas, maestrías, diplomados y cursos.',
  columnas: [
    { key: 'tipo',      label: 'Tipo' },
    { key: 'titulo',    label: 'Título' },
    { key: 'duracion',  label: 'Duración' },
    { key: 'modalidad', label: 'Modalidad' },
    { key: 'precio',    label: 'Precio' },
    { key: 'activo',    label: 'Activo', render: v => v ? '✓' : '—' },
  ],
});

export const Inscripciones = makeModulo({
  titulo: 'Inscripciones',
  descripcion: 'Solicitudes recibidas de programas y seminarios.',
  columnas: [
    { key: 'nombre',   label: 'Nombre' },
    { key: 'email',    label: 'Correo' },
    { key: 'tipo_ref', label: 'Tipo' },
    { key: 'estado',   label: 'Estado' },
    { key: 'created_at', label: 'Fecha' },
  ],
});

export const Docentes = makeModulo({
  titulo: 'Docentes y Analistas',
  descripcion: 'Perfiles de analistas, docentes e investigadores.',
  columnas: [
    { key: 'titulo_academico', label: 'Título' },
    { key: 'nombre',           label: 'Nombre' },
    { key: 'rol',              label: 'Rol' },
    { key: 'especialidad',     label: 'Especialidad' },
    { key: 'activo',           label: 'Activo', render: v => v ? '✓' : '—' },
  ],
});

export const Publicaciones = makeModulo({
  titulo: 'Publicaciones Editoriales',
  descripcion: 'Artículos, ensayos, tesis y textos académicos.',
  columnas: [
    { key: 'tipo',             label: 'Tipo' },
    { key: 'titulo',           label: 'Título' },
    { key: 'fecha_publicacion', label: 'Fecha' },
    { key: 'publicado',        label: 'Estado', render: v => v ? 'Publicado' : 'Borrador' },
  ],
});

export const Multimedia = makeModulo({
  titulo: 'Multimedia',
  descripcion: 'Videos, entrevistas, conferencias y galerías.',
  columnas: [
    { key: 'tipo',      label: 'Tipo' },
    { key: 'titulo',    label: 'Título' },
    { key: 'fecha',     label: 'Fecha' },
    { key: 'publicado', label: 'Estado', render: v => v ? 'Publicado' : 'Borrador' },
  ],
});

export const Clinica = makeModulo({
  titulo: 'Clínica',
  descripcion: 'Consultas recibidas y servicios de la clínica.',
  columnas: [
    { key: 'nombre',        label: 'Nombre' },
    { key: 'email',         label: 'Correo' },
    { key: 'tipo_consulta', label: 'Tipo' },
    { key: 'estado',        label: 'Estado' },
    { key: 'created_at',    label: 'Fecha' },
  ],
});

export const Comunidad = makeModulo({
  titulo: 'Comunidad — Grupos de Lectura',
  descripcion: 'Grupos de lectura e investigación del Colegio.',
  columnas: [
    { key: 'nombre',        label: 'Nombre del grupo' },
    { key: 'horario',       label: 'Horario' },
    { key: 'participantes', label: 'Participantes' },
    { key: 'activo',        label: 'Activo', render: v => v ? '✓' : '—' },
  ],
});

export const Investigacion = makeModulo({
  titulo: 'Líneas de Investigación',
  descripcion: 'Líneas y proyectos de investigación del Colegio.',
  columnas: [
    { key: 'titulo',      label: 'Título' },
    { key: 'descripcion', label: 'Descripción' },
    { key: 'activo',      label: 'Activa', render: v => v ? '✓' : '—' },
  ],
});

