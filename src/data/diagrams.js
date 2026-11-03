/**
 * Simplified architecture diagrams for each case study.
 * Every node and connection reflects documented scope (current résumé / public repo);
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
      'Simplified architecture: web and mobile applications call the AMS backend — Java, Spring Boot and Apache Struts, deployed with Docker — which provides airport operations, ground handling, contract management and audit logging modules, integrates third-party APIs, and stores data in Oracle and Redis.',
    groups: [
      { label: 'docker container', wide: [330, 100, 340, 240], tall: [20, 144, 380, 230] },
    ],
    nodes: {
      web: { label: 'Web app', sub: 'Web client', kind: 'client', wide: [40, 92, 190, 72], tall: [20, 20, 180, 66] },
      mobile: { label: 'Mobile app', sub: 'Mobile client', kind: 'client', wide: [40, 276, 190, 72], tall: [220, 20, 180, 66] },
      api: {
        label: 'AMS backend',
        sub: 'Java · Spring Boot · Struts',
        kind: 'service',
        chips: ['Airport ops', 'Ground handling', 'Contracts', 'Audit logging'],
        wide: [360, 146, 280, 148],
        tall: [44, 186, 332, 158],
      },
      ext: { label: 'Third-party APIs', sub: 'Integrations', kind: 'external', wide: [770, 92, 190, 72], tall: [20, 462, 185, 72] },
      db: { label: 'Oracle · Redis', sub: 'Data stores', kind: 'data', wide: [770, 276, 190, 72], tall: [215, 462, 185, 72] },
    },
    edges: [
      { from: 'web', to: 'api', label: 'REST' },
      { from: 'mobile', to: 'api', label: 'REST' },
      { from: 'api', to: 'ext', label: 'integrate' },
      { from: 'api', to: 'db', label: 'data' },
    ],
  },

  auth: {
    description:
      'Simplified architecture: a client application signs in through a Spring Authorization Server implementing OAuth2 and OpenID Connect, with login, registration and token management APIs, refresh tokens and role-based access control. It issues signed JWTs that protected APIs validate.',
    groups: [],
    nodes: {
      client: { label: 'Client app', sub: 'Login · register', kind: 'client', wide: [30, 154, 190, 72], tall: [120, 20, 180, 66] },
      auth: {
        label: 'Spring Authorization Server',
        sub: 'OAuth2 · OpenID Connect',
        kind: 'service',
        chips: ['Login & registration', 'Refresh tokens', 'Role-based access'],
        wide: [330, 112, 300, 156],
        tall: [20, 150, 380, 156],
      },
      s1: { label: 'Protected API', labelTall: 'API', sub: 'JWT · RBAC', subTall: 'JWT', kind: 'data', wide: [780, 40, 190, 72], tall: [20, 400, 118, 72] },
      s2: { label: 'Protected API', labelTall: 'API', sub: 'JWT · RBAC', subTall: 'JWT', kind: 'data', wide: [780, 154, 190, 72], tall: [151, 400, 118, 72] },
      s3: { label: 'Protected API', labelTall: 'API', sub: 'JWT · RBAC', subTall: 'JWT', kind: 'data', wide: [780, 268, 190, 72], tall: [282, 400, 118, 72] },
    },
    edges: [
      { from: 'client', to: 'auth', label: 'OAuth2 / OIDC' },
      { from: 'auth', to: 's1' },
      { from: 'auth', to: 's2', label: 'signed JWT' },
      { from: 'auth', to: 's3' },
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
