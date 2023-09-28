import * as Sentry from "@sentry/react";

function init() {
  Sentry.init({
    dsn:
      "https://6a302dde72b89f1a9256ff3d121bad92@o4505951700058112.ingest.sentry.io/4505951782764544",
    integrations: [
      new Sentry.BrowserTracing({
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: [
          "localhost",
          /^https:\/\/yourserver\.io\/api/,
        ],
      }),
      new Sentry.Replay(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}
function log(error) {
  Sentry.captureException(error);
}
const logger = {
  init,
  log,
};

export default logger;
