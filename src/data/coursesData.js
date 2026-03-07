/* ============================================
   Courses Data - Narayana IIT-JEE Coaching
   Course configurations and details
   ============================================ */

export const coursesData = [
  {
    id: 'tycp',
    name: 'Two-Year Classroom Programme (TYCP)',
    shortName: '2-Year Programme (TYCP)',
    target: 'Class 11 Students',
    duration: '2 Years',
    description: 'For students preparing for IIT-JEE Main & Advanced alongside XII Boards. 8 units across 2 academic sessions with comprehensive revision and mock tests.',
    features: ['Board + JEE Syllabus Coverage', 'Micro-Schedule & Test Planners', 'All India Test Series', 'Up to 90% Scholarship via NACST & NSAT'],
    frequency: '3-4 days/week (12-16 hrs/week)',
    badge: 'Most Popular',
    icon: 'mdi:clock-time-eight',
  },
  {
    id: 'apex',
    name: 'Apex/Spark Integrated Programme',
    shortName: 'Apex/Spark',
    target: 'Class 11 Students',
    duration: '2 Years',
    description: 'Extensive IIT-JEE Main & Advanced coverage with 14,000+ hours of teaching across four phases. Includes detailed teaching, practice sessions, and review classes.',
    features: ['14,000+ Teaching Hours', 'Four Phase Programme', 'Intensive Practice Sessions', 'Grand Success Package'],
    frequency: '3-4 days/week (12-16 hrs/week)',
    badge: 'Premium',
    icon: 'mdi:rocket-launch',
  },
  {
    id: 'oycp',
    name: 'One-Year Classroom Programme (OYCP)',
    shortName: '1-Year Programme (OYCP)',
    target: 'Class 11 → 12 Students',
    duration: '1 Year',
    description: 'Specifically designed for students moving from XI to XII grade. Meticulously crafted curriculum covering IIT-JEE and Board exam syllabus.',
    features: ['Complete JEE + Board Coverage', 'Starting April/May', 'Systematic Testing', 'Review Classes'],
    frequency: '3-4 days/week (12-16 hrs/week)',
    badge: null,
    icon: 'mdi:calendar-clock',
  },
  {
    id: 'repeater',
    name: 'Dropper/Repeater Programme',
    shortName: 'Repeater Course',
    target: 'XII Passed Students',
    duration: '1 Year',
    description: 'Dedicated programme for XII-passed students focusing solely on IIT-JEE entrance preparation. Comprehensive study materials, test series, and mock tests.',
    features: ['100% Entrance Focused', 'Speed & Accuracy Training', 'Daily All-Subject Classes', 'Concept Strengthening'],
    frequency: '4-5 days/week (all subjects daily)',
    badge: null,
    icon: 'mdi:refresh-circle',
  },
];

export default {
  coursesData,
};
