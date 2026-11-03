/**
 * Simplified architecture diagrams for each case study.
 * Every node and connection reflects documented scope (résumé / public repo);
 * nothing here depicts a real interface or confidential detail.
 *
 * Coordinates are [x, y, w, h]: `wide` for a ~1000-unit canvas, `tall` for a
 * ~420-unit canvas on small screens. The viewBox is cropped to content automatically.
 * kind → client | service | external | data | pipeline
 * labelTall / subTall optionally shorten text for narrow nodes in the tall layout.
 */

export const diagrams = {
  ams: {
    description:
      'Simplified architecture: web and mobile clients call the AMS backend, a Java and Spring Boot REST service running in Docker and documented with Swagger, which integrates third-party flight-scheduling and terminal-management APIs.',
    groups: [
      { label: 'docker container', wide: [330, 112, 340, 216], tall: [20, 144, 380, 206] },
    ],
    nodes: {
      web: { label: 'Web app', sub: 'Web client', kind: 'client', wide: [40, 92, 190, 72], tall: [20, 20, 180, 66] },
      mobile: { label: 'Mobile app', sub: 'Mobile client', kind: 'client', wide: [40, 276, 190, 72], tall: [220, 20, 180, 66] },
      api: {
        label: 'AMS backend',
        sub: 'Java · Spring Boot',
        kind: 'service',
        chips: ['REST APIs', 'Swagger docs'],
        wide: [360, 160, 280, 120],
        tall: [44, 184, 332, 128],
      },
      flight: { label: 'Flight scheduling', sub: 'Third-party API', kind: 'external', wide: [770, 92, 190, 72], tall: [20, 438, 185, 72] },
      terminal: { label: 'Terminal mgmt.', sub: 'Third-party API', kind: 'external', wide: [770, 276, 190, 72], tall: [215, 438, 185, 72] },
    },
    edges: [
      { from: 'web', to: 'api', label: 'REST' },
      { from: 'mobile', to: 'api', label: 'REST' },
      { from: 'api', to: 'flight', label: 'integrate' },
      { from: 'api', to: 'terminal', label: 'integrate' },
    ],
  },

  auth: {
    description:
      'Simplified architecture: a client application requests tokens from a Spring Authorization Server implementing OAuth 2.0 and OpenID Connect, which manages client registrations and issues JWTs to stateless microservices. Maven and Jenkins automate its build and deployment.',
    groups: [],
    nodes: {
      client: { label: 'Client app', sub: 'Requests access', kind: 'client', wide: [30, 154, 190, 72], tall: [20, 20, 166, 66] },
      ci: { label: 'Maven → Jenkins', sub: 'Build & deploy', kind: 'pipeline', wide: [355, 346, 250, 64], tall: [200, 20, 200, 66] },
      auth: {
        label: 'Spring Authorization Server',
        sub: 'OAuth 2.0 · OpenID Connect',
        kind: 'service',
        chips: ['Client registration', 'JWT expiry & logout'],
        wide: [330, 118, 300, 144],
        tall: [20, 156, 380, 140],
      },
      s1: { label: 'Microservice', labelTall: 'Service', sub: 'Stateless · JWT', subTall: 'JWT', kind: 'data', wide: [780, 40, 190, 72], tall: [20, 400, 118, 72] },
      s2: { label: 'Microservice', labelTall: 'Service', sub: 'Stateless · JWT', subTall: 'JWT', kind: 'data', wide: [780, 154, 190, 72], tall: [151, 400, 118, 72] },
      s3: { label: 'Microservice', labelTall: 'Service', sub: 'Stateless · JWT', subTall: 'JWT', kind: 'data', wide: [780, 268, 190, 72], tall: [282, 400, 118, 72] },
    },
    edges: [
      { from: 'client', to: 'auth', label: 'token request' },
      { from: 'auth', to: 's1' },
      { from: 'auth', to: 's2', label: 'signed JWT' },
      { from: 'auth', to: 's3' },
      { from: 'ci', to: 'auth', dashed: true },
    ],
  },

  tunehub: {
    description:
      'Simplified architecture: the browser renders Thymeleaf views from a Java 17 Spring Boot application with authentication, playlist, music-library and subscription modules. It persists data in MySQL through Spring Data JPA and takes premium payments through Razorpay.',
    groups: [],
    nodes: {
      browser: { label: 'Browser', sub: 'Thymeleaf views', kind: 'client', wide: [30, 184, 190, 72], tall: [120, 20, 180, 66] },
      app: {
        label: 'TuneHub',
        sub: 'Java 17 · Spring Boot',
        kind: 'service',
        chips: ['Auth & registration', 'Playlists', 'Music library', 'Subscriptions'],
        wide: [320, 140, 340, 160],
        tall: [20, 150, 380, 160],
      },
      db: { label: 'MySQL', sub: 'Spring Data JPA', kind: 'data', wide: [780, 116, 190, 72], tall: [20, 410, 185, 72] },
      pay: { label: 'Razorpay', sub: 'Payment gateway', kind: 'external', wide: [780, 252, 190, 72], tall: [215, 410, 185, 72] },
    },
    edges: [
      { from: 'browser', to: 'app', label: 'HTTP' },
      { from: 'app', to: 'db', label: 'JPA' },
      { from: 'app', to: 'pay', label: 'premium' },
    ],
  },
};
