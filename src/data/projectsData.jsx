import React from 'react';

export const PatientManagementDiagram = () => {
  const links = [
    { d: 'M80,95 L125,95', color: '#38BDF8', dur: 2.4, begin: 0 },
    { d: 'M205,88 L265,36', color: '#34D399', dur: 2.6, begin: 0.4 },
    { d: 'M205,95 L265,100', color: '#8B5CF6', dur: 2.2, begin: 0.8 },
    { d: 'M190,115 L237,150', color: '#FF9900', dur: 2.4, begin: 1.2 },
    { d: 'M269,167 L295,167', color: '#FF9900', dur: 1.2, begin: 2 },
  ];

  return (
    <svg viewBox="0 0 360 200" role="img" aria-label="Architecture: API Gateway to Patient Service to PostgreSQL; gRPC to Billing; Kafka to Analytics">
      <g stroke="rgba(56,189,248,.45)" strokeWidth="1.3" fill="none" strokeDasharray="3 4">
        {links.map((link, idx) => (
          <path key={idx} d={link.d} />
        ))}
      </g>

      {/* Gateway Box */}
      <g>
        <rect x="10" y="75" width="70" height="40" rx="8" fill="#0B1224" stroke="#38BDF8" strokeOpacity="0.7" />
        <text x="45" y="93" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fontWeight="700" fill="#F8FAFC">API</text>
        <text x="45" y="105" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7.5" fill="#A7B4CC">Gateway</text>
      </g>

      {/* Patient Service */}
      <g>
        <rect x="125" y="70" width="80" height="50" rx="8" fill="#0B1224" stroke="#38BDF8" strokeOpacity="0.7" />
        <text x="165" y="93" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fontWeight="700" fill="#F8FAFC">PATIENT</text>
        <text x="165" y="105" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7.5" fill="#A7B4CC">Service</text>
      </g>

      {/* Postgres Database */}
      <g>
        <rect x="265" y="15" width="85" height="40" rx="8" fill="#0B1224" stroke="#34D399" strokeOpacity="0.7" />
        <text x="307" y="33" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fontWeight="700" fill="#F8FAFC">POSTGRES</text>
        <text x="307" y="45" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7.5" fill="#A7B4CC">Database</text>
      </g>

      {/* Billing Service */}
      <g>
        <rect x="265" y="80" width="85" height="40" rx="8" fill="#0B1224" stroke="#8B5CF6" strokeOpacity="0.7" />
        <text x="307" y="98" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fontWeight="700" fill="#F8FAFC">BILLING</text>
        <text x="307" y="110" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7.5" fill="#A7B4CC">Service</text>
      </g>

      {/* Kafka */}
      <g>
        <rect x="205" y="148" width="64" height="38" rx="8" fill="#0B1224" stroke="#FF9900" strokeOpacity="0.7" />
        <text x="237" y="166" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fontWeight="700" fill="#F8FAFC">KAFKA</text>
        <text x="237" y="178" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7.5" fill="#A7B4CC">Events</text>
      </g>

      {/* Analytics Service */}
      <g>
        <rect x="295" y="148" width="60" height="38" rx="8" fill="#0B1224" stroke="#8B5CF6" strokeOpacity="0.7" />
        <text x="325" y="166" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fontWeight="700" fill="#F8FAFC">ANALYTICS</text>
        <text x="325" y="178" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7.5" fill="#A7B4CC">Service</text>
      </g>

      <text x="235" y="82" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#8B5CF6">gRPC</text>
      <text x="40" y="68" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fill="#A7B4CC">JWT</text>

      {/* Animated Pulses */}
      {links.map((link, idx) => (
        <circle key={idx} r="3.2" fill={link.color} color={link.color} className="pkt">
          <animateMotion dur={`${link.dur}s`} begin={`${link.begin}s`} repeatCount="indefinite" path={link.d} />
        </circle>
      ))}
      <circle r="3.2" fill="#8B5CF6" color="#8B5CF6" className="pkt">
        <animateMotion dur="2.2s" begin="1.9s" repeatCount="indefinite" path="M265,100 L205,95" />
      </circle>
    </svg>
  );
};

export const KrushiKendraDiagram = () => {
  const rows = [
    { name: 'Paracetamol 500mg', count: '120', color: '#34D399', ratio: 0.8 },
    { name: 'Amoxicillin 250mg', count: '18', color: '#FF9900', ratio: 0.2 },
    { name: 'Vitamin C tablets', count: '64', color: '#34D399', ratio: 0.55 },
    { name: 'ORS sachets', count: '9', color: '#f87171', ratio: 0.1 },
  ];

  return (
    <svg viewBox="0 0 360 200" role="img" aria-label="Inventory dashboard with product rows, database and SNS notification flow">
      <text x="14" y="22" fontFamily="JetBrains Mono, monospace" fontSize="8.5" letterSpacing="1" fill="#38BDF8">
        INVENTORY
      </text>

      {rows.map((row, i) => {
        const y = 34 + i * 34;
        return (
          <g key={i}>
            <rect x="14" y={y} width="210" height="28" rx="6" fill="#0B1224" stroke="rgba(120,150,200,.25)" />
            <text x="24" y={y + 18} fontFamily="Inter, sans-serif" fontSize="9.5" fill="#F8FAFC">{row.name}</text>
            <rect x="140" y={y + 11} width="50" height="6" rx="3" fill="rgba(120,150,200,.2)" />
            <rect x="140" y={y + 11} width={50 * row.ratio} height="6" rx="3" fill={row.color} />
            <text x="214" y={y + 18} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#A7B4CC">{row.count}</text>
          </g>
        );
      })}

      {/* MySQL cylinder */}
      <g transform="translate(262 40)">
        <ellipse cx="30" cy="10" rx="28" ry="9" fill="#0B1224" stroke="#34D399" />
        <path d="M2 10 v34 a28 9 0 0 0 56 0 v-34" fill="#0B1224" stroke="#34D399" />
        <ellipse cx="30" cy="27" rx="28" ry="9" fill="none" stroke="#34D399" strokeOpacity="0.4" />
        <text x="30" y="68" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#F8FAFC">MySQL</text>
      </g>

      <path d="M224 62 L262 72" stroke="rgba(52,211,153,.5)" strokeDasharray="3 4" fill="none" />
      <path d="M290 112 L290 140" stroke="rgba(255,153,0,.6)" strokeDasharray="3 4" fill="none" />

      {/* SNS Box */}
      <g transform="translate(250 142)">
        <rect width="80" height="40" rx="9" fill="#0B1224" stroke="#FF9900" />
        <path d="M26 26 a6 6 0 0 1 12 0 v4 h-12z M32 32 v2" stroke="#FF9900" fill="none" />
        <text x="58" y="19" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" fill="#F8FAFC">SNS</text>
        <text x="58" y="30" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fill="#A7B4CC">payment reminder</text>
      </g>

      {/* Animated Packets */}
      <circle r="3.2" fill="#34D399" color="#34D399" className="pkt">
        <animateMotion dur="2s" begin="0s" repeatCount="indefinite" path="M224,62 L262,72" />
      </circle>
      <circle r="3.2" fill="#FF9900" color="#FF9900" className="pkt">
        <animateMotion dur="1.6s" begin="0.8s" repeatCount="indefinite" path="M290,112 L290,140" />
      </circle>
    </svg>
  );
};

export const Degree2StartupDiagram = () => {
  const cards = [
    { x: 20, y: 24, color: '#38BDF8', label: 'Opportunity' },
    { x: 20, y: 86, color: '#8B5CF6', label: 'Opportunity' },
    { x: 20, y: 148, color: '#FF9900', label: 'Opportunity' },
  ];

  return (
    <svg viewBox="0 0 360 200" role="img" aria-label="Startup dashboard with opportunity cards connected to a recommendation engine and a documents panel">
      {cards.map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={c.y} width="100" height="40" rx="8" fill="#0B1224" stroke={c.color} strokeOpacity="0.7" />
          <text x={c.x + 10} y={c.y + 17} fontFamily="JetBrains Mono, monospace" fontSize="8.5" fontWeight="700" fill="#F8FAFC">{c.label}</text>
          <rect x={c.x + 10} y={c.y + 25} width={50 + i * 12} height="4" rx="2" fill="rgba(120,150,200,.3)" />
          <path d={`M120 ${c.y + 20} L170 100`} stroke="rgba(56,189,248,.45)" strokeDasharray="3 4" fill="none" />
        </g>
      ))}

      {/* Center Match node */}
      <circle cx="190" cy="100" r="26" fill="rgba(56,189,248,.12)" stroke="#38BDF8" />
      <text x="190" y="98" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fontWeight="700" fill="#F8FAFC">MATCH</text>
      <text x="190" y="109" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fill="#A7B4CC">profile</text>

      <path d="M216 100 L250 100" stroke="rgba(56,189,248,.45)" strokeDasharray="3 4" fill="none" />

      {/* Documents Panel */}
      <rect x="250" y="40" width="92" height="120" rx="10" fill="#0B1224" stroke="#34D399" strokeOpacity="0.7" />
      <text x="262" y="60" fontFamily="JetBrains Mono, monospace" fontSize="8.5" fontWeight="700" fill="#F8FAFC">DOCUMENTS</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="262" y={72 + i * 20} width="10" height="12" rx="2" fill="none" stroke="#34D399" />
          <rect x="278" y={76 + i * 20} width={44 - i * 5} height="4" rx="2" fill="rgba(120,150,200,.3)" />
        </g>
      ))}

      {/* Pulses */}
      <circle r="3.2" fill="#38BDF8" color="#38BDF8" className="pkt">
        <animateMotion dur="2.2s" begin="0s" repeatCount="indefinite" path="M120,44 L170,100" />
      </circle>
      <circle r="3.2" fill="#8B5CF6" color="#8B5CF6" className="pkt">
        <animateMotion dur="2s" begin="0.6s" repeatCount="indefinite" path="M120,106 L170,100" />
      </circle>
      <circle r="3.2" fill="#34D399" color="#34D399" className="pkt">
        <animateMotion dur="1.4s" begin="1s" repeatCount="indefinite" path="M216,100 L250,100" />
      </circle>
    </svg>
  );
};

export const projects = [
  {
    id: 0,
    number: '01',
    title: 'Patient Management System',
    category: 'MICROSERVICES • BACKEND ENGINEERING',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Apache Kafka', 'gRPC', 'Docker', 'JWT', 'Spring Cloud Gateway'],
    description: 'Developed a healthcare management application using Spring Boot microservices to manage patient information through REST APIs. Integrated JWT authentication and Spring Cloud Gateway for request security and routing.',
    features: [
      'Patient management using REST APIs.',
      'gRPC communication between Patient and Billing services.',
      'Kafka-based asynchronous communication with the Analytics service.',
      'PostgreSQL for persistent data.',
      'Docker-based containerized deployment.',
    ],
    problemStatement: 'Patient data needs consistent, secured access, while billing and analytics are separate concerns. The project explores splitting these into services that communicate in the way that suits each interaction.',
    architecture: [
      'API Gateway receives requests, checks JWTs, and routes them.',
      'Patient Service handles patient records through REST APIs and stores them in PostgreSQL.',
      'Patient Service calls Billing Service over gRPC.',
      'Patient Service publishes events to Kafka, which the Analytics Service consumes.',
      'Each service is packaged as a Docker container.',
    ],
    learningOutcomes: [
      'Choosing synchronous (gRPC) versus asynchronous (Kafka) communication between services.',
      'Centralizing authentication and routing at a gateway.',
      'Packaging multiple services with Docker.',
    ],
    caption: 'ARCHITECTURE VISUALIZATION · NOT A LIVE SYSTEM',
    DiagramComponent: PatientManagementDiagram,
  },
  {
    id: 1,
    number: '02',
    title: 'Krushi Kendra Medicine Management System',
    category: 'INVENTORY MANAGEMENT • AWS SNS',
    tech: ['Java', 'MySQL', 'Amazon SNS'],
    description: 'Developed a medicine inventory management system to maintain product records and track available inventory, with Amazon SNS integration for payment reminder notifications.',
    features: [
      'Medicine and product record management.',
      'Inventory tracking.',
      'MySQL database integration.',
      'Amazon SNS notification integration.',
    ],
    problemStatement: 'A medicine shop needs a reliable record of products and available stock, plus a way to remind customers about payments.',
    architecture: [
      'A Java application manages product and inventory records.',
      'Records are stored in a MySQL database.',
      'Payment reminders are published through Amazon SNS.',
    ],
    learningOutcomes: [
      'Working with a relational database from Java.',
      'Integrating a managed AWS notification service into an application.',
    ],
    caption: 'DASHBOARD ILLUSTRATION · EXAMPLE DATA',
    DiagramComponent: KrushiKendraDiagram,
  },
  {
    id: 2,
    number: '03',
    title: 'Degree2Startup',
    category: 'STARTUP DISCOVERY • WEB APPLICATION',
    tech: ['Java', 'Spring Boot', 'MySQL', 'REST APIs'],
    description: 'Developed a web application that provides personalized startup recommendations and helps users identify relevant startup opportunities and required documents.',
    features: [
      'Startup recommendation functionality.',
      'REST API integration.',
      'CRUD operations.',
      'Startup and document information management.',
    ],
    problemStatement: 'Graduates who want to start a company often do not know which opportunities fit them or which documents they need. The application points them to both.',
    architecture: [
      'A Spring Boot application exposes REST APIs.',
      'Startup and document information is managed with CRUD operations in MySQL.',
      'A recommendation feature matches users to relevant startup opportunities.',
    ],
    learningOutcomes: [
      'Designing REST APIs and CRUD workflows with Spring Boot.',
      'Structuring data so recommendations can be generated from it.',
    ],
    caption: 'ILLUSTRATION · EXAMPLE DATA',
    DiagramComponent: Degree2StartupDiagram,
  },
];
