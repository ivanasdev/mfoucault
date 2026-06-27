-- ============================================================
--  COLEGIO MICHEL FOUCAULT — Base de datos
--  MySQL 8.0+  |  ENGINE: InnoDB  |  CHARSET: utf8mb4
-- ============================================================

CREATE DATABASE IF NOT EXISTS colegio_foucault
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE colegio_foucault;

-- ============================================================
--  MÓDULO 0 — ADMINISTRACIÓN INTERNA
-- ============================================================

CREATE TABLE tb_roles (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(60)  NOT NULL,
  descripcion VARCHAR(255)
);

INSERT INTO tb_roles (nombre, descripcion) VALUES
  ('superadmin', 'Acceso total al sistema'),
  ('editor',     'Puede crear y editar contenido'),
  ('lector',     'Solo lectura del panel');

CREATE TABLE tb_usuarios (
  id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre         VARCHAR(120) NOT NULL,
  email          VARCHAR(180) NOT NULL UNIQUE,
  password_hash  VARCHAR(255) NOT NULL,
  rol_id         INT UNSIGNED NOT NULL,
  activo         TINYINT(1)   NOT NULL DEFAULT 1,
  ultimo_acceso  DATETIME,
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (rol_id) REFERENCES tb_roles(id)
);

CREATE TABLE tb_permisos (
  id      INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre  VARCHAR(100) NOT NULL UNIQUE,
  modulo  VARCHAR(60)  NOT NULL
);

CREATE TABLE tb_roles_permisos (
  rol_id     INT UNSIGNED NOT NULL,
  permiso_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (rol_id, permiso_id),
  FOREIGN KEY (rol_id)     REFERENCES tb_roles(id)    ON DELETE CASCADE,
  FOREIGN KEY (permiso_id) REFERENCES tb_permisos(id) ON DELETE CASCADE
);

-- ============================================================
--  MÓDULO 1 — NOTICIAS Y DIFUSIÓN
-- ============================================================

CREATE TABLE tb_noticias (
  id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo            VARCHAR(255) NOT NULL,
  slug              VARCHAR(255) NOT NULL UNIQUE,
  resumen           TEXT,
  contenido         LONGTEXT,
  imagen_portada    VARCHAR(255),
  destacado         TINYINT(1)   NOT NULL DEFAULT 0,
  publicado         TINYINT(1)   NOT NULL DEFAULT 0,
  fecha_publicacion DATETIME,
  fecha_expiracion  DATETIME,
  usuario_id        INT UNSIGNED,
  created_at        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES tb_usuarios(id) ON DELETE SET NULL,
  INDEX idx_publicado (publicado, fecha_publicacion)
);

CREATE TABLE tb_eventos (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo       VARCHAR(255) NOT NULL,
  slug         VARCHAR(255) NOT NULL UNIQUE,
  descripcion  LONGTEXT,
  fecha_inicio DATETIME     NOT NULL,
  fecha_fin    DATETIME,
  lugar        VARCHAR(255),
  modalidad    ENUM('presencial','en_linea','hibrido') NOT NULL DEFAULT 'presencial',
  imagen       VARCHAR(255),
  enlace_zoom  VARCHAR(500),
  publicado    TINYINT(1)   NOT NULL DEFAULT 0,
  created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_fecha (fecha_inicio)
);

CREATE TABLE tb_banners (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo       VARCHAR(255),
  imagen       VARCHAR(255) NOT NULL,
  enlace       VARCHAR(500),
  orden        TINYINT UNSIGNED NOT NULL DEFAULT 0,
  activo       TINYINT(1)   NOT NULL DEFAULT 1,
  fecha_inicio DATE,
  fecha_fin    DATE
);

-- ============================================================
--  MÓDULO 2 — ACADÉMICO
-- ============================================================

CREATE TABLE tb_programas (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tipo         ENUM('licenciatura','maestria','doctorado','diplomado','seminario','curso','taller')
               NOT NULL,
  titulo       VARCHAR(255) NOT NULL,
  slug         VARCHAR(255) NOT NULL UNIQUE,
  descripcion  LONGTEXT,
  duracion     VARCHAR(60),
  modalidad    ENUM('presencial','en_linea','semipresencial') NOT NULL DEFAULT 'presencial',
  precio       DECIMAL(10,2),
  requisitos   LONGTEXT,
  imagen       VARCHAR(255),
  color_acento VARCHAR(10)  DEFAULT '#9b2525',
  activo       TINYINT(1)   NOT NULL DEFAULT 1,
  orden        TINYINT UNSIGNED NOT NULL DEFAULT 0,
  created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE tb_seminarios (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo       VARCHAR(255) NOT NULL,
  slug         VARCHAR(255) NOT NULL UNIQUE,
  descripcion  LONGTEXT,
  horario      VARCHAR(120),
  fecha_inicio DATE,
  fecha_fin    DATE,
  lugar        VARCHAR(255),
  modalidad    ENUM('presencial','en_linea','hibrido') NOT NULL DEFAULT 'presencial',
  precio       DECIMAL(10,2),
  cupo_maximo  SMALLINT UNSIGNED,
  imagen       VARCHAR(255),
  activo       TINYINT(1)   NOT NULL DEFAULT 1,
  created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tb_inscripciones (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tipo_ref    ENUM('programa','seminario') NOT NULL,
  ref_id      INT UNSIGNED NOT NULL,
  nombre      VARCHAR(180) NOT NULL,
  email       VARCHAR(180) NOT NULL,
  telefono    VARCHAR(30),
  mensaje     TEXT,
  estado      ENUM('pendiente','confirmada','cancelada') NOT NULL DEFAULT 'pendiente',
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_ref    (tipo_ref, ref_id),
  INDEX idx_estado (estado)
);

CREATE TABLE tb_materiales (
  id       INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tipo_ref ENUM('programa','seminario') NOT NULL,
  ref_id   INT UNSIGNED NOT NULL,
  titulo   VARCHAR(255) NOT NULL,
  archivo  VARCHAR(255),
  tipo     ENUM('pdf','video','enlace','imagen') NOT NULL DEFAULT 'pdf',
  orden    TINYINT UNSIGNED NOT NULL DEFAULT 0
);

-- ============================================================
--  MÓDULO 3 — ANALISTAS Y DOCENTES
-- ============================================================

CREATE TABLE tb_docentes (
  id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre           VARCHAR(180) NOT NULL,
  titulo_academico VARCHAR(60),
  rol              VARCHAR(120),
  especialidad     VARCHAR(255),
  biografia        LONGTEXT,
  fotografia       VARCHAR(255),
  email            VARCHAR(180),
  modalidades      SET('presencial','en_linea'),
  activo           TINYINT(1)   NOT NULL DEFAULT 1,
  orden            TINYINT UNSIGNED NOT NULL DEFAULT 0,
  created_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE tb_programas_docentes (
  programa_id INT UNSIGNED NOT NULL,
  docente_id  INT UNSIGNED NOT NULL,
  rol         VARCHAR(80),
  PRIMARY KEY (programa_id, docente_id),
  FOREIGN KEY (programa_id) REFERENCES tb_programas(id) ON DELETE CASCADE,
  FOREIGN KEY (docente_id)  REFERENCES tb_docentes(id)  ON DELETE CASCADE
);

CREATE TABLE tb_seminarios_docentes (
  seminario_id INT UNSIGNED NOT NULL,
  docente_id   INT UNSIGNED NOT NULL,
  PRIMARY KEY (seminario_id, docente_id),
  FOREIGN KEY (seminario_id) REFERENCES tb_seminarios(id) ON DELETE CASCADE,
  FOREIGN KEY (docente_id)   REFERENCES tb_docentes(id)   ON DELETE CASCADE
);

-- ============================================================
--  MÓDULO 4 — EDITORIAL
-- ============================================================

CREATE TABLE tb_categorias (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(120) NOT NULL,
  slug        VARCHAR(120) NOT NULL UNIQUE,
  modulo      ENUM('editorial','biblioteca','multimedia') NOT NULL DEFAULT 'editorial',
  descripcion VARCHAR(255)
);

CREATE TABLE tb_etiquetas (
  id     INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL,
  slug   VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE tb_publicaciones (
  id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo            VARCHAR(255) NOT NULL,
  slug              VARCHAR(255) NOT NULL UNIQUE,
  resumen           TEXT,
  contenido         LONGTEXT,
  archivo_pdf       VARCHAR(255),
  tipo              ENUM('articulo','ensayo','tesis','resena','entrevista') NOT NULL DEFAULT 'articulo',
  imagen_portada    VARCHAR(255),
  publicado         TINYINT(1)   NOT NULL DEFAULT 0,
  fecha_publicacion DATE,
  usuario_id        INT UNSIGNED,
  created_at        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES tb_usuarios(id) ON DELETE SET NULL,
  FULLTEXT INDEX ft_publicaciones (titulo, resumen, contenido)
);

CREATE TABLE tb_publicaciones_autores (
  publicacion_id INT UNSIGNED NOT NULL,
  docente_id     INT UNSIGNED NOT NULL,
  orden          TINYINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (publicacion_id, docente_id),
  FOREIGN KEY (publicacion_id) REFERENCES tb_publicaciones(id) ON DELETE CASCADE,
  FOREIGN KEY (docente_id)     REFERENCES tb_docentes(id)      ON DELETE CASCADE
);

CREATE TABLE tb_publicaciones_categorias (
  publicacion_id INT UNSIGNED NOT NULL,
  categoria_id   INT UNSIGNED NOT NULL,
  PRIMARY KEY (publicacion_id, categoria_id),
  FOREIGN KEY (publicacion_id) REFERENCES tb_publicaciones(id) ON DELETE CASCADE,
  FOREIGN KEY (categoria_id)   REFERENCES tb_categorias(id)    ON DELETE CASCADE
);

CREATE TABLE tb_publicaciones_etiquetas (
  publicacion_id INT UNSIGNED NOT NULL,
  etiqueta_id    INT UNSIGNED NOT NULL,
  PRIMARY KEY (publicacion_id, etiqueta_id),
  FOREIGN KEY (publicacion_id) REFERENCES tb_publicaciones(id) ON DELETE CASCADE,
  FOREIGN KEY (etiqueta_id)    REFERENCES tb_etiquetas(id)     ON DELETE CASCADE
);

-- ============================================================
--  MÓDULO 5 — MULTIMEDIA
-- ============================================================

CREATE TABLE tb_multimedia (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo      VARCHAR(255) NOT NULL,
  descripcion TEXT,
  tipo        ENUM('video','entrevista','conferencia','transmision','galeria') NOT NULL,
  url_video   VARCHAR(500),
  archivo     VARCHAR(255),
  miniatura   VARCHAR(255),
  duracion    VARCHAR(20),
  publicado   TINYINT(1)   NOT NULL DEFAULT 0,
  fecha       DATE,
  orden       TINYINT UNSIGNED NOT NULL DEFAULT 0,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_tipo (tipo, publicado)
);

CREATE TABLE tb_galerias (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo      VARCHAR(255) NOT NULL,
  descripcion TEXT,
  portada     VARCHAR(255),
  publicado   TINYINT(1)   NOT NULL DEFAULT 0,
  fecha       DATE,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tb_galeria_imagenes (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  galeria_id INT UNSIGNED NOT NULL,
  imagen     VARCHAR(255) NOT NULL,
  pie_foto   VARCHAR(255),
  orden      TINYINT UNSIGNED NOT NULL DEFAULT 0,
  FOREIGN KEY (galeria_id) REFERENCES tb_galerias(id) ON DELETE CASCADE
);

-- ============================================================
--  MÓDULO — BIBLIOTECA Y ARCHIVO
-- ============================================================

CREATE TABLE tb_biblioteca (
  id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo         VARCHAR(255) NOT NULL,
  autor          VARCHAR(255),
  descripcion    TEXT,
  archivo_pdf    VARCHAR(255),
  imagen_portada VARCHAR(255),
  tipo           ENUM('libro','articulo','tesis','documento','revista') NOT NULL DEFAULT 'libro',
  anio           YEAR,
  disponible     TINYINT(1)   NOT NULL DEFAULT 1,
  categoria_id   INT UNSIGNED,
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (categoria_id) REFERENCES tb_categorias(id) ON DELETE SET NULL,
  FULLTEXT INDEX ft_biblioteca (titulo, autor, descripcion)
);

-- ============================================================
--  MÓDULO — LÍNEAS DE INVESTIGACIÓN
-- ============================================================

CREATE TABLE tb_lineas_investigacion (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo       VARCHAR(255) NOT NULL,
  descripcion  LONGTEXT,
  color_acento VARCHAR(10)  DEFAULT '#9b2525',
  activo       TINYINT(1)   NOT NULL DEFAULT 1,
  orden        TINYINT UNSIGNED NOT NULL DEFAULT 0
);

CREATE TABLE tb_lineas_proyectos (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  linea_id    INT UNSIGNED NOT NULL,
  titulo      VARCHAR(255) NOT NULL,
  descripcion TEXT,
  estado      ENUM('activo','concluido','suspendido') NOT NULL DEFAULT 'activo',
  anio        YEAR,
  FOREIGN KEY (linea_id) REFERENCES tb_lineas_investigacion(id) ON DELETE CASCADE
);

CREATE TABLE tb_lineas_docentes (
  linea_id   INT UNSIGNED NOT NULL,
  docente_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (linea_id, docente_id),
  FOREIGN KEY (linea_id)   REFERENCES tb_lineas_investigacion(id) ON DELETE CASCADE,
  FOREIGN KEY (docente_id) REFERENCES tb_docentes(id)             ON DELETE CASCADE
);

-- ============================================================
--  MÓDULO — COMUNIDAD (grupos de lectura)
-- ============================================================

CREATE TABLE tb_grupos_lectura (
  id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre         VARCHAR(255) NOT NULL,
  descripcion    TEXT,
  horario        VARCHAR(120),
  participantes  SMALLINT UNSIGNED DEFAULT 0,
  coordinador_id INT UNSIGNED,
  activo         TINYINT(1)   NOT NULL DEFAULT 1,
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (coordinador_id) REFERENCES tb_docentes(id) ON DELETE SET NULL
);

-- ============================================================
--  MÓDULO — CLÍNICA
-- ============================================================

CREATE TABLE tb_clinica_servicios (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo       VARCHAR(255) NOT NULL,
  tag          VARCHAR(80),
  descripcion  LONGTEXT,
  detalle      VARCHAR(120),
  color_acento VARCHAR(10)  DEFAULT '#9b2525',
  orden        TINYINT UNSIGNED NOT NULL DEFAULT 0,
  activo       TINYINT(1)   NOT NULL DEFAULT 1
);

CREATE TABLE tb_clinica_principios (
  id    INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(120) NOT NULL,
  texto TEXT         NOT NULL,
  orden TINYINT UNSIGNED NOT NULL DEFAULT 0
);

CREATE TABLE tb_clinica_consultas (
  id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre         VARCHAR(180) NOT NULL,
  email          VARCHAR(180) NOT NULL,
  telefono       VARCHAR(30),
  tipo_consulta  ENUM('individual','preliminar','supervision','institucional') NOT NULL DEFAULT 'individual',
  mensaje        TEXT,
  estado         ENUM('pendiente','atendida','cancelada') NOT NULL DEFAULT 'pendiente',
  notas_internas TEXT,
  created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_estado (estado)
);

-- ============================================================
--  MÓDULO — CONTENIDO ESTÁTICO (manifiesto, hero, contacto)
-- ============================================================

CREATE TABLE tb_contenido_estatico (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  seccion    VARCHAR(60)  NOT NULL UNIQUE,
  titulo     VARCHAR(255),
  subtitulo  VARCHAR(255),
  contenido  LONGTEXT,
  updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO tb_contenido_estatico (seccion, titulo) VALUES
  ('manifiesto', 'Manifiesto'),
  ('hero',       'Hero principal'),
  ('contacto',   'Información de contacto');

-- ============================================================
--  MÓDULO — CONFIGURACIÓN GENERAL DEL SITIO
-- ============================================================

CREATE TABLE tb_configuracion (
  clave       VARCHAR(80) NOT NULL PRIMARY KEY,
  valor       TEXT,
  descripcion VARCHAR(255)
);

INSERT INTO tb_configuracion (clave, valor, descripcion) VALUES
  ('nombre_sitio',           'Colegio Michel Foucault',           'Nombre del sitio'),
  ('tagline',                'Crítica · Política · Poética',      'Tagline del sitio'),
  ('email_clinica',          'clinica@colegiomichelfoucault.mx',  'Correo de la clínica'),
  ('email_contacto',         'contacto@colegiomichelfoucault.mx', 'Correo general'),
  ('telefono',               '',                                  'Teléfono de contacto'),
  ('ciudad',                 'Ciudad de México',                  'Ciudad'),
  ('redes_instagram',        '',                                  'URL Instagram'),
  ('redes_facebook',         '',                                  'URL Facebook'),
  ('redes_youtube',          '',                                  'URL YouTube'),
  ('inscripciones_abiertas', '1',                                 '1 = abiertas, 0 = cerradas');
