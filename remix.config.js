/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "cjs",
  tailwind: true,
  postcss: true,
  serverDependenciesToBundle: [
    "bcryptjs",
    "jsonwebtoken",
    "mysql2",
    /^react-icons/
  ],
  browserNodeBuiltinsPolyfill: {
    modules: {
      events: true,
      process: true,
      net: true,
      tls: true,
      timers: true,
      stream: true,
      buffer: true,
      string_decoder: true,
      crypto: true,
      zlib: true,
      util: true,
      url: true
    }
  },
  future: {
    v3_fetcherPersist: true,
    v3_lazyRouteDiscovery: true,
    v3_relativeSplatPath: true,
    v3_singleFetch: true,
    v3_throwAbortReason: true
  },
  serverBuildTarget: "node-cjs",
  serverMinify: false,
  target: "es2020"
}; 