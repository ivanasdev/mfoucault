import { Box, Container, Typography, Avatar, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SectionLabel from '../ui/SectionLabel';
import { useInView } from '../../hooks/useInView';

const faculty = [

  {
    initials: 'MR',
    name: 'Dr. Marco Ramírez Guerrero',
    role: 'Rector General del Colegio Michel Foucault',
    specialty: 'Psicoanálisis lacaniano · Clínica',
    bio: `Fundador y Rector General del Colegio Michel Foucault.

    Doctor en Psicoanálisis por el Colegio de Psicoanálisis Lacaniano.

    Maestro en Psicoanálisis Freud-Lacan por el Colegio de Psicoanálisis Lacaniano.

    Maestro en Criminología por el Instituto Nacional de Ciencias Penales (INACIPE).

    Licenciado en Psicología por la Universidad Nacional Autónoma de México (UNAM).`,
    color: '#9b2525',
  },


  {
    initials: 'RM',
    name: 'Dr. Juan Valdemar',
    role: 'Coordinador de Criminología',
    specialty: 'Criminología crítica · Abolicionismo',
    bio: 'Doctor en Ciencias Sociales. Especialista en criminología crítica latinoamericana, políticas penales y violencias estatales. Miembro de la Red Latinoamericana de Criminología Crítica.',
    color: '#1a3a4a',
  },
  {
    initials: 'SC',
    name: 'Mtra. Sofía Cienfuegos',
    role: 'Docente-investigadora',
    specialty: 'Clínica de las psicosis · Psicosis ordinaria',
    bio: 'Psicoanalista con práctica privada e institucional. Especializada en el tratamiento de la psicosis desde la perspectiva lacaniana. Formación en Francia con la Nueva Escuela Lacaniana.',
    color: '#2a3a20',
  },
  {
    initials: 'AV',
    name: 'Dr. Andrés Vallecillo',
    role: 'Docente-investigador',
    specialty: 'Filosofía · Teoría social · Crítica',
    bio: 'Doctor en Filosofía por la UAM. Investigador del pensamiento de la Escuela de Frankfurt y sus articulaciones con el postestructuralismo. Traductor de Adorno y Horkheimer al español.',
    color: '#3a2a4a',
  },
  {
    initials: 'CD',
    name: 'Mtra. Carmen Delgado',
    role: 'Docente-investigadora',
    specialty: 'Psicología crítica · Género · Feminismos',
    bio: 'Psicóloga y teórica feminista. Investigadora de las intersecciones entre psicoanálisis, género y violencia. Coordinadora del Grupo de Estudio "Psicoanálisis y feminismos" del Colegio.',
    color: '#4a3020',
  },
  {
    initials: 'LI',
    name: 'Dr. Luis Ibáñez Torres',
    role: 'Docente-investigador',
    specialty: 'Teoría crítica · Marxismo · Política',
    bio: 'Doctor en Teoría Política por la FLACSO. Especialista en el pensamiento de Adorno, Marcuse y sus resonancias contemporáneas. Autor de trabajos sobre capitalismo tardío y subjetividad política.',
    color: '#1a3020',
  },
];

const readingGroups = [
  { name: 'Grupo de lectura: Seminarios de Lacan', members: 24, meeting: 'Jueves 18:00h' },
  { name: 'Taller permanente de casos clínicos', members: 18, meeting: 'Viernes 17:00h' },
  { name: 'Círculo de estudios: Escuela de Frankfurt', members: 16, meeting: 'Miércoles 19:00h' },
  { name: 'Grupo de investigación: Criminología crítica', members: 12, meeting: 'Lunes 18:00h' },
];

export default function Community() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [ref, inView] = useInView(0.06);

  return (
    <Box
      id="comunidad"
      ref={ref}
      sx={{
        bgcolor: 'background.paper',
        py: { xs: 10, md: 16 },
        borderTop: `1px solid ${theme.palette.divider}`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.9s ease, transform 0.9s ease',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 8 } }}>
        <SectionLabel>07 — Comunidad Académica</SectionLabel>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            mb: { xs: 8, md: 10 },
            gap: 3,
          }}
        >
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '1.9rem', md: '2.8rem' }, color: 'text.primary', lineHeight: 1.15 }}
          >
            Quiénes pensamos aquí
          </Typography>
          <Typography
            sx={{
              fontSize: '0.85rem',
              color: 'text.secondary',
              maxWidth: 320,
              lineHeight: 1.75,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Docentes, investigadores y clínicos comprometidos con la producción
            colectiva de pensamiento crítico.
          </Typography>
        </Box>

        {/* Faculty grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
            gap: 0,
            border: `1px solid ${theme.palette.divider}`,
            mb: { xs: 8, md: 12 },
          }}
        >
          {faculty.map((member, i) => (
            <FacultyCard key={member.name} member={member} index={i} isDark={isDark} theme={theme} />
          ))}
        </Box>

        {/* Reading groups */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 5 }}>
            <Box sx={{ width: 28, height: '1px', bgcolor: 'secondary.main' }} />
            <Typography
              sx={{
                fontSize: '0.68rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'text.secondary',
                fontFamily: '"Inter", sans-serif',
                fontWeight: 500,
              }}
            >
              Grupos de lectura e investigación
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 0,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            {readingGroups.map((group, i) => (
              <Box
                key={group.name}
                tabIndex={0}
                role="article"
                sx={{
                  p: { xs: 3, md: 3.5 },
                  borderRight: i % 2 === 0 ? `1px solid ${theme.palette.divider}` : 'none',
                  borderBottom: i < 2 ? `1px solid ${theme.palette.divider}` : 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: { xs: '0.95rem', md: '1.05rem' },
                    color: 'text.primary',
                    lineHeight: 1.3,
                    mb: 1.5,
                  }}
                >
                  {group.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontFamily: '"Inter", sans-serif' }}>
                    {group.members} participantes
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontFamily: '"Inter", sans-serif' }}>
                    {group.meeting}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function FacultyCard({ member, index, isDark, theme }) {
  const total = 6;
  const cols = 3;
  const isLastRow = index >= total - (total % cols || cols);
  const isLastCol = (index + 1) % cols === 0;

  return (
    <Box
      tabIndex={0}
      role="article"
      sx={{
        p: { xs: 3.5, md: 4 },
        borderRight: !isLastCol ? `1px solid ${theme.palette.divider}` : 'none',
        borderBottom: !isLastRow ? `1px solid ${theme.palette.divider}` : 'none',
        cursor: 'pointer',
        transition: 'background-color 0.25s',
        '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.02)' },
        '&:hover .member-name': { color: isDark ? 'rgba(221,211,191,0.95)' : 'rgba(26,21,16,0.95)' },
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2.5 }}>
        <Avatar
          sx={{
            width: 44,
            height: 44,
            bgcolor: `${member.color}22`,
            border: `1px solid ${member.color}44`,
            color: isDark ? `${member.color}cc` : member.color,
            fontFamily: '"Playfair Display", serif',
            fontSize: '0.95rem',
            fontWeight: 500,
            flexShrink: 0,
          }}
        >
          {member.initials}
        </Avatar>
        <Box>
          <Typography
            className="member-name"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontSize: { xs: '0.92rem', md: '0.97rem' },
              color: 'text.primary',
              lineHeight: 1.2,
              mb: 0.4,
              transition: 'color 0.2s',
            }}
          >
            {member.name}
          </Typography>
          <Typography
            sx={{
              fontSize: '0.68rem',
              color: 'text.secondary',
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '0.05em',
            }}
          >
            {member.role}
          </Typography>
        </Box>
      </Box>

      <Chip
        label={member.specialty}
        size="small"
        sx={{
          bgcolor: 'transparent',
          border: `1px solid ${member.color}44`,
          color: isDark ? `${member.color}bb` : member.color,
          fontSize: '0.6rem',
          letterSpacing: '0.06em',
          height: 20,
          mb: 2,
          borderRadius: 1,
          maxWidth: '100%',
          '& .MuiChip-label': { overflow: 'hidden', textOverflow: 'ellipsis' },
        }}
      />

      <Typography
        variant="body2"
        sx={{
          fontSize: '0.78rem',
          color: 'text.secondary',
          lineHeight: 1.75,
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {member.bio}
      </Typography>
    </Box>
  );
}
