// src/dev/quick-test-samples/valid-inputs.ts

/**
 * Development-only YINI samples.
 *
 * These inputs are used for quick manual testing during development
 * via src/dev/quick-test-samples/main.ts. They are NOT part of the automated test suite.
 *
 * All real testing belongs in /tests/.
 */

export const validConfigShort = `
^ App
name = 'Hello'
`

export const validConfigBasic = `
^ App
name = "My Application"
version = 1.0
features = ["search", "logging"]

    // Nested sub-section under App
    ^^ Database
    host = "localhost"
    port = 5432
`

export const validConfigWithObjects = `
^ App
  name = "Demo"
  version = "1.0.0"
  features = [ "search", "dark-mode" ]

^ Database
  host = "localhost"
  port = 5432
  auth = { user: "admin", pass: "secret" }
`

/**
 * Covers booleans, nulls, number formats, and deeper nesting
 */
export const validConfigAdvanced = `
^ Server
  enabled = ON
  timeout = 3.5
  retries = 5
  threshold = 1e-3
  fallback = null

  ^^ Logging
     level = "info"
     output = { file: "app.log", rotate: true }
`

/**
 * Covers arrays of objects and realistic structure
 */
export const validConfigComplex = `
^ App
  services = [
    { name: "api",  port: 8080 },
    { name: "web",  port: 3000 },
    { name: "auth", port: 9000 }
  ]

^ Security
  roles = ["admin", "user", "guest"]
  enabled = true
`

/*
  Covers:
  - Sections & deep nesting
  - Real-world domain structure
  - Objects in arrays
  - Arrays of objects
  - Scalars of every type
  - Complex policy logic
  - Auth & security modeling
  - Unicode in strings.
  - Large but readable
 */
export const validConfigComplexBigA = `
@YINI

// Example A: Corporate SaaS Platform.

^ App
name = "Acme Platform"    // Example Platform
description = 'The word “Acme” has been used for over 100 years in technical and business examples.'
meaning = "It comes from Greek akmḗ (ἀκμή), meaning “the highest point” or “best”."
version = "2.3.1"
debug = OFF
environment = "production"
maintainers = ["ops@acme.com", "dev@acme.com"]

    ^^ Features
    enableSearch = true
    enablePayments = true
    enableAnalytics = false
    experimental = ["new-ui", "streaming-api"]

    ^^ Limits
    maxUsers = 50000
    requestTimeoutMs = 3500
    retryPolicy = { maxRetries: 5, backoff: "exponential" }

    ^^ Database
    engine = "postgres"
    host = "db.internal.acme.com"
    port = 5432
    ssl = true
    pool = { min: 5, max: 50 }

        ^^^ Credentials
        username = "app_user"
        password = "****"
        rotateEveryDays = 90

    ^^ API
    baseUrl = "https://api.acme.com"
    publicEndpoints = ["/health", "/status"]
    internalEndpoints = ["/admin", "/metrics"]

        ^^^ Auth
        provider = "oauth2"
        tokenTTLSeconds = 3600
        scopes = ["read", "write", "admin"]

            ^^^^ Clients
            web = { clientId: "web-123", redirectUri: "https://acme.com/callback" }
            mobile = { clientId: "mob-456", redirectUri: "acme://auth" }

^ Logging
level = "info"
format = "json"
outputs = ["stdout", "file"]

    ^^ File
    path = "/var/log/acme/app.log"
    maxSizeMB = 100
    rotate = true
    keepFiles = 10

    ^^ Metrics
    enabled = true
    endpoint = "/metrics"
    sampleRate = 0.25

^ Services
enabled = true

    ^^ Email
    provider = "smtp"
    host = "smtp.acme.com"
    port = 587
    secure = false
    from = "no-reply@acme.com"

        ^^^ Credentials
        user = "mailer"
        pass = "mailer-secret"

    ^^ Cache
    type = "redis"
    host = "cache.internal.acme.com"
    port = 6379
    ttlSeconds = 600

        ^^^ Cluster
        nodes = [
          { host: "cache-1.internal", port: 6379 },
          { host: "cache-2.internal", port: 6379 },
          { host: "cache-3.internal", port: 6379 }
        ]

^ Observability
tracing = true
tracingProvider = "opentelemetry"
traceSampleRate = 0.1

    ^^ Exporters
    jaeger = { enabled: true, endpoint: "http://jaeger:14268/api/traces" }
    prometheus = { enabled: true, endpoint: "http://prom:9090" }

^ Security
allowedIPs = ["10.0.0.0/8", "192.168.0.0/16"]
blockedCountries = ["KP", "SD"]

    ^^ Policies
    passwordMinLength = 14
    require2FA = true
    sessionTTLMinutes = 120

        ^^^ Lockout
        maxAttempts = 5
        lockoutMinutes = 30
`

/*
  Example B covers:
  - Nested arrays inside inline objects
  - Sections & deep nesting
  - Real-world domain structure
  - Objects in arrays
  - Arrays of objects
  - Scalars of every type
  - Complex policy logic
  - Auth & security modeling
  - Unicode in strings.
  - Large but readable
 */
export const validConfigComplexBigB = `
@YINI

// Example B: High-Security Distributed Control System.

^ App
name = "Nebula Control Suite"
description = "A distributed operations platform for autonomous systems and edge analytics."
meaning = "Nebula comes from Latin 'nebula' meaning mist or cloud."
version = "5.0.0-rc.4"
debug = ON
environment = "staging"
maintainers = ["infra@nebula.io", "platform@nebula.io", "secops@nebula.io"]

    ^^ Features
    enableSearch = false
    enablePayments = false
    enableAnalytics = true
    experimental = ["vector-engine", "adaptive-ui", "ai-routing"]

    ^^ Limits
    maxUsers = 120000
    requestTimeoutMs = 7200
    retryPolicy = {
        maxRetries: 9,
        backoff: "fibonacci",
        retryOn: ["timeout", "5xx", "throttle"],
        schedule: [
            { attempt: 1, delayMs: 80 },
            { attempt: 2, delayMs: 160 },
            { attempt: 3, delayMs: 320 },
            { attempt: 4, delayMs: 640 },
            { attempt: 5, delayMs: 1280 }
        ]
    }

    ^^ Database
    engine = "cockroachdb"
    host = "cluster.db.nebula.io"
    port = 26257
    ssl = true
    pool = {
        min: 12,
        max: 120,
        warmup: {
            enabled: true,
            strategy: "aggressive",
            steps: [10, 25, 50, 75, 100],
            healthChecks: [
                { name: "connectivity", timeoutMs: 300 },
                { name: "replication", maxLagMs: 200 },
                { name: "quorum", minNodes: 3 }
            ]
        }
    }

        ^^^ Credentials
        username = "nebula_app"
        password = "****"
        rotateEveryDays = 45
        history = [
            { rotatedAt: "2025-05-10", reason: "scheduled" },
            { rotatedAt: "2025-03-02", reason: "key-compromise" },
            { rotatedAt: "2024-12-15", reason: "policy-change" }
        ]

    ^^ API
    baseUrl = "https://api.nebula.io"
    publicEndpoints = ["/health", "/status", "/version"]
    internalEndpoints = ["/admin", "/metrics", "/orchestrator", "/scheduler"]

        ^^^ Auth
        provider = "oidc"
        tokenTTLSeconds = 5400
        scopes = ["read", "write", "deploy", "audit"]

            ^^^^ Clients
            web = {
                clientId: "nebula-web-prod",
                redirectUri: "https://nebula.io/auth/callback",
                allowedOrigins: ["https://nebula.io", "https://console.nebula.io"],
                secrets: [
                    { id: "alpha", value: "QX7faP9", active: true },
                    { id: "beta", value: "LM8KdW2", active: true },
                    { id: "legacy", value: "OLD-KEY-DO-NOT-USE", active: false }
                ]
            }

            mobile = {
                clientId: "nebula-mobile",
                redirectUri: "nebula://auth",
                platforms: [
                    { name: "ios", minVersion: "15.2", enabled: true },
                    { name: "android", minVersion: "11", enabled: true },
                    { name: "harmonyos", minVersion: "4", enabled: false }
                ],
                refreshPolicy: {
                    enabled: true,
                    limits: { perHour: 60, perDay: 600 },
                    audit: [
                        { event: "refresh", severity: "info" },
                        { event: "suspicious-location", severity: "warning" },
                        { event: "credential-stuffing", severity: "critical" }
                    ]
                }
            }

^ Logging
level = "debug"
format = "ndjson"
outputs = ["stdout", "file", "syslog"]

    ^^ File
    path = "/srv/log/nebula/nebula.log"
    maxSizeMB = 250
    rotate = true
    keepFiles = 30

    ^^ Metrics
    enabled = true
    endpoint = "/internal/metrics"
    sampleRate = 0.75

^ Services
enabled = true

    ^^ Email
    provider = "ses"
    host = "email.nebula.io"
    port = 465
    secure = true
    from = "system@nebula.io"

        ^^^ Credentials
        user = "mailer-nebula"
        pass = "MAIL-SEC-9921"

    ^^ Cache
    type = "keydb"
    host = "cache.nebula.internal"
    port = 6380
    ttlSeconds = 1800

        ^^^ Cluster
        nodes = [
            { host: "cache-a.nebula", port: 6380, role: "primary", zones: ["eu-north-1a"] },
            { host: "cache-b.nebula", port: 6380, role: "replica", zones: ["eu-north-1b"] },
            { host: "cache-c.nebula", port: 6380, role: "replica", zones: ["eu-north-1c"] },
            { host: "cache-d.nebula", port: 6380, role: "observer", zones: ["eu-north-1a"] }
        ]

        ^^^ Failover
        strategy = {
            mode: "predictive",
            thresholds: { errorRate: 0.08, latencyMs: 180 },
            actions: [
                { step: "drain-traffic", timeoutMs: 1500 },
                { step: "promote-replica", timeoutMs: 2000 },
                { step: "resync", propagate: true },
                { step: "notify", channels: ["pagerduty", "slack", "email"] }
            ]
        }

^ Observability
tracing = true
tracingProvider = "tempo"
traceSampleRate = 0.35

    ^^ Exporters
    jaeger = {
        enabled: false,
        endpoint: "http://jaeger.internal/api/traces",
        tags: {
            region: "eu-north",
            environment: "staging",
            build: { version: "5.0.0-rc.4", commit: "c8f91d2", dirty: true }
        }
    }

    prometheus = {
        enabled: true,
        endpoint: "http://prometheus.nebula:9090",
        scrapeIntervals: [2, 5, 10, 30],
        retention: { days: 90, maxSeries: 3500000 }
    }

^ Security
allowedIPs = ["172.16.0.0/12", "100.64.0.0/10"]
blockedCountries = ["KP", "NG", "BY"]

    ^^ Policies
    passwordMinLength = 18
    require2FA = true
    sessionTTLMinutes = 45

        ^^^ Lockout
        maxAttempts = 4
        lockoutMinutes = 60
        escalation = {
            enabled: true,
            notify: ["security@nebula.io", "ciso@nebula.io"],
            rules: [
                { attempts: 3, action: "captcha" },
                { attempts: 4, action: "temporary-block", minutes: 120 },
                { attempts: 6, action: "account-freeze" },
                { attempts: 9, action: "permanent-block" }
            ]
        }
`
