import type { StudyGuide } from './study-guide';

export const CLOUD: Record<string, StudyGuide> = {
  'aws-amplify': {
    overview: 'AWS Amplify is a set of tools for building web and mobile apps on AWS. Its JavaScript libraries, used here, wrap services such as Cognito with a simple client API: signUp, confirmSignUp, signInWithRedirect and fetchAuthSession. They handle the OAuth flow, token storage and refresh for you.',
    concepts: [
      { term: 'Amplify.configure', detail: 'Supplies the user pool ID, app client ID, Cognito domain and redirect URLs once at start-up.' },
      { term: 'Hosted UI redirect flow', detail: 'signInWithRedirect sends the user to Cognito\'s managed login; Cognito returns to the app with an authorisation code, which Amplify exchanges for tokens using PKCE.' },
      { term: 'fetchAuthSession', detail: 'Returns the current ID and access tokens, refreshing them with the refresh token when they have expired.' },
      { term: 'Hub events', detail: 'Amplify publishes auth events such as signedIn, signedOut and tokenRefresh that the app can listen to.' },
    ],
    questions: [
      { question: 'What is PKCE and why is it used in browser apps?', answer: 'Proof Key for Code Exchange: the app sends a hash of a random verifier with the authorisation request and the verifier itself with the token request. A stolen code is useless without the verifier, so public clients need no client secret.' },
      { question: 'Where should a browser app store tokens?', answer: 'Every option has trade-offs. Local storage is readable by any script on the page, so XSS defences matter; memory is safest but lost on reload; HttpOnly cookies set by a backend avoid script access but need CSRF protection.' },
      { question: 'ID token versus access token: which should an API accept?', answer: 'Access tokens are designed for authorising API calls, carrying scopes; ID tokens describe the user to the client. This app sends the ID token to read profile claims, which works but is less conventional.' },
    ],
    pitfalls: [
      'Redirect URLs that do not exactly match those configured in Cognito.',
      'Calling APIs with a cached token without letting Amplify refresh it.',
      'Assuming the front end can keep a client secret.',
    ],
    learnMore: { label: 'Amplify JavaScript docs', url: 'https://docs.amplify.aws/javascript/build-a-backend/auth/' },
  },
  'amazon-cognito': {
    overview: 'Amazon Cognito provides customer identity for apps. User pools are user directories that handle sign-up, sign-in, MFA and federation and issue OpenID Connect tokens; identity pools exchange those tokens for temporary AWS credentials.',
    concepts: [
      { term: 'User pools versus identity pools', detail: 'A user pool authenticates users and issues JWTs; an identity pool authorises access to AWS services directly with IAM credentials.' },
      { term: 'Tokens', detail: 'The ID token holds user claims, the access token holds scopes and groups, and the refresh token obtains new ones. ID and access tokens default to a one-hour lifetime.' },
      { term: 'App clients', detail: 'Each front end or service gets an app client with its allowed OAuth flows, scopes, callback URLs and token lifetimes.' },
      { term: 'Managed login', detail: 'A hosted, brandable sign-in page on a Cognito domain, used instead of building login screens yourself.' },
      { term: 'Lambda triggers', detail: 'Functions that run at points such as pre sign-up, post confirmation and pre token generation to customise behaviour.' },
    ],
    questions: [
      { question: 'How does the OAuth 2.0 authorisation code flow work?', answer: 'The app redirects the user to the authorisation server, the user signs in, the server redirects back with a short-lived code, and the app exchanges the code (with PKCE) at the token endpoint for tokens.' },
      { question: 'How does an API trust a Cognito token without calling Cognito?', answer: 'It verifies the token\'s signature with the public keys published at the pool\'s JWKS URL and checks the issuer, audience or client ID, expiry and token_use. The keys are cached, so there is no call per request.' },
      { question: 'Authentication, authorisation and federation: how do they differ?', answer: 'Authentication proves who someone is; authorisation decides what they may do; federation lets an external identity provider, such as Google or a corporate SAML IdP, do the authentication.' },
    ],
    pitfalls: [
      'Using the user pool\'s sub as a display identifier; it is opaque and stable, so use it as a key but show the email or name.',
      'Not validating token_use and client ID, which lets tokens meant for other clients through.',
      'Revoking access only in the app while long-lived refresh tokens remain valid.',
    ],
    learnMore: { label: 'Cognito Developer Guide', url: 'https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html' },
  },
  'neon': {
    overview: 'Neon is a serverless PostgreSQL service that separates storage from compute. Compute scales up with load and down to zero when idle, and its copy-on-write storage makes instant database branches possible for development and testing.',
    concepts: [
      { term: 'Separation of storage and compute', detail: 'Stateless Postgres compute nodes read pages from a shared storage layer, so compute can start, stop and resize independently.' },
      { term: 'Scale to zero', detail: 'Idle compute suspends to save cost; the first query after that has a short cold start.' },
      { term: 'Branching', detail: 'A branch is an instant, copy-on-write clone of a database at a point in time, useful for preview environments and safe migration testing.' },
      { term: 'Connection pooling', detail: 'A built-in PgBouncer endpoint multiplexes many short-lived connections, which suits serverless clients like Lambda.' },
    ],
    questions: [
      { question: 'Why is connection management hard with serverless functions?', answer: 'Each concurrent function instance opens its own connections, which can exhaust the database\'s connection limit during a spike. Use a pooler (PgBouncer, RDS Proxy), small pools per instance, and reuse connections across invocations.' },
      { question: 'What would you weigh when choosing Neon over Amazon RDS or Aurora?', answer: 'Neon offers scale-to-zero cost, branching and simple setup; RDS and Aurora offer private VPC networking, deeper AWS integration and predictable performance without cold starts.' },
    ],
    pitfalls: [
      'Opening a new database connection on every Lambda invocation.',
      'Forgetting that a suspended compute adds latency to the first request.',
      'Using the direct endpoint instead of the pooled one from highly concurrent clients.',
    ],
    learnMore: { label: 'Neon docs', url: 'https://neon.com/docs/introduction' },
  },
  'aws-lambda': {
    overview: 'AWS Lambda runs code in response to events without servers to manage. You pay per request and per millisecond of compute, scaling is automatic, and each concurrent request is handled by its own execution environment.',
    concepts: [
      { term: 'Execution environment lifecycle', detail: 'Init (start the runtime and run static set-up), Invoke (run the handler), Shutdown. Environments are reused between invocations, so work done during init is amortised.' },
      { term: 'Cold starts and SnapStart', detail: 'A cold start is an invocation that needs a new environment. SnapStart snapshots an initialised Java environment and restores it, cutting cold starts from seconds to a fraction of one.' },
      { term: 'Concurrency', detail: 'One environment serves one request at a time. Reserved concurrency caps a function; provisioned concurrency keeps environments warm.' },
      { term: 'Versions and aliases', detail: 'A published version is immutable; an alias such as live points at a version and can shift traffic between two for canary releases.' },
      { term: 'Triggers', detail: 'Function URLs, API Gateway, SQS, S3, EventBridge, DynamoDB Streams and many more. Synchronous and asynchronous invocations retry differently.' },
    ],
    questions: [
      { question: 'How do you reduce Lambda cold starts?', answer: 'Use SnapStart for Java, keep the deployment package small, avoid heavy initialisation or do it lazily, choose arm64, raise memory (which also raises CPU), and use provisioned concurrency for strict latency needs.' },
      { question: 'When is Lambda the wrong choice?', answer: 'Long-running jobs over fifteen minutes, steady high-throughput loads where containers are cheaper, very latency-sensitive workloads that cannot tolerate cold starts, and anything needing persistent local state or long-lived connections.' },
      { question: 'How does memory configuration affect a function?', answer: 'CPU is allocated in proportion to memory, so more memory often runs faster and can even cost less. Measure with Lambda Power Tuning.' },
      { question: 'How do you make an event-driven Lambda safe to retry?', answer: 'Make it idempotent, for example with an idempotency key stored in a table, and send messages that keep failing to a dead-letter queue or failure destination.' },
    ],
    pitfalls: [
      'Creating clients and connections inside the handler instead of during init.',
      'Relying on unique state in /tmp or memory across invocations.',
      'SnapStart restoring the same random seed or stale connections; refresh them after restore.',
    ],
    learnMore: { label: 'Lambda Developer Guide', url: 'https://docs.aws.amazon.com/lambda/latest/dg/welcome.html' },
  },
  'amazon-cloudfront': {
    overview: 'Amazon CloudFront is AWS\'s content delivery network. It serves content from hundreds of edge locations close to users, terminates TLS, caches responses according to policies, and forwards misses to origins such as S3 buckets, load balancers or Lambda function URLs.',
    concepts: [
      { term: 'Distributions, origins and behaviours', detail: 'A distribution has one or more origins; cache behaviours route path patterns to an origin with their own caching and header policies.' },
      { term: 'Cache key and TTLs', detail: 'The cache key (path plus chosen headers, cookies and query strings) decides what counts as the same object; TTLs and Cache-Control decide how long it is kept.' },
      { term: 'Origin Access Control', detail: 'OAC lets CloudFront sign requests to a private S3 bucket so the bucket is never publicly readable.' },
      { term: 'Invalidations and versioned files', detail: 'Invalidations purge cached paths; hashed file names avoid needing them for assets, leaving only index.html to invalidate.' },
      { term: 'Edge functions', detail: 'CloudFront Functions and Lambda@Edge rewrite URLs, add security headers or run auth at the edge.' },
    ],
    questions: [
      { question: 'How do you deploy a single-page app behind CloudFront without serving stale files?', answer: 'Upload hashed assets with long cache lifetimes, upload index.html with no-cache or a short TTL, and invalidate /index.html after each deploy. Handle deep links either with a 403/404-to-index.html error response or with hash routing, as this app does.' },
      { question: 'Why put CloudFront in front of an API that is not cached?', answer: 'For TLS on a custom domain, a single domain for UI and API (avoiding CORS), edge connection termination that lowers latency, and WAF and DDoS protection.' },
      { question: 'What does a CDN cache hit ratio tell you, and how do you raise it?', answer: 'The share of requests served from the edge. Raise it by keeping the cache key minimal (no unnecessary headers or query strings), using long TTLs for immutable assets and enabling Origin Shield.' },
    ],
    pitfalls: [
      'Forwarding all headers and cookies, which destroys the cache hit ratio.',
      'Leaving the S3 origin public instead of using OAC.',
      'Forgetting that ACM certificates for CloudFront must be in us-east-1.',
    ],
    learnMore: { label: 'CloudFront Developer Guide', url: 'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html' },
  },
  'amazon-s3': {
    overview: 'Amazon Simple Storage Service is object storage with eleven nines of durability. Objects are stored in buckets under keys, with storage classes that trade retrieval speed for cost, and strong read-after-write consistency.',
    concepts: [
      { term: 'Buckets, keys and prefixes', detail: 'A flat namespace of keys; slashes in keys only look like folders. Each prefix scales to thousands of requests per second.' },
      { term: 'Access control', detail: 'Block Public Access, IAM policies and bucket policies decide access; ACLs are disabled by default and best left that way.' },
      { term: 'Storage classes and lifecycle rules', detail: 'Standard, Intelligent-Tiering, Infrequent Access and the Glacier classes; lifecycle rules move or expire objects automatically.' },
      { term: 'Presigned URLs', detail: 'Time-limited URLs that let a client upload or download one object directly without AWS credentials.' },
      { term: 'Versioning and replication', detail: 'Versioning keeps every version to protect against overwrites and deletes; replication copies objects to another bucket or region.' },
    ],
    questions: [
      { question: 'How do you let users upload large files securely?', answer: 'The API authorises the user and returns a presigned PUT URL (or multipart upload URLs) for a specific key; the browser uploads directly to S3, keeping the file off your servers.' },
      { question: 'How do you host a static site privately behind CloudFront?', answer: 'Keep Block Public Access on, give CloudFront an Origin Access Control, and allow only that distribution in the bucket policy, as this app does.' },
      { question: 'How would you reduce S3 costs?', answer: 'Use lifecycle rules or Intelligent-Tiering, expire old versions and incomplete multipart uploads, and serve hot content through CloudFront.' },
    ],
    pitfalls: [
      'Accidentally public buckets.',
      'Treating S3 as a file system with renames and appends; objects are replaced whole.',
      'Versioning without a lifecycle rule, so old versions grow forever.',
    ],
    learnMore: { label: 'S3 User Guide', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html' },
  },
  'aws-certificate-manager': {
    overview: 'AWS Certificate Manager issues and manages public TLS certificates for AWS services such as CloudFront, load balancers and API Gateway at no charge. It proves domain ownership through DNS or email validation and renews certificates automatically.',
    concepts: [
      { term: 'DNS validation', detail: 'ACM gives you a CNAME record to create; while it exists, ACM can prove control of the domain and renew without intervention.' },
      { term: 'Integrated services only', detail: 'ACM public certificates cannot be exported; they attach to CloudFront, Elastic Load Balancing, API Gateway and similar services.' },
      { term: 'Region rules', detail: 'Certificates for CloudFront must be requested in us-east-1; others must be in the same region as the resource.' },
      { term: 'SANs and wildcards', detail: 'One certificate can cover several names (subject alternative names) or a wildcard such as *.example.com.' },
    ],
    questions: [
      { question: 'What happens during a TLS handshake?', answer: 'The client and server agree on a protocol version and cipher, the server presents its certificate, the client verifies it against trusted authorities and the hostname, and they derive shared session keys (with ECDHE in TLS 1.3) for symmetric encryption.' },
      { question: 'Why prefer DNS validation over email validation?', answer: 'It renews automatically for as long as the record exists, needs no human to click a link, and can be scripted, as these apps\' setup scripts do.' },
    ],
    pitfalls: [
      'Requesting a CloudFront certificate outside us-east-1.',
      'Deleting the validation CNAME, which makes renewal fail later.',
      'Expecting to export an ACM public certificate to a server.',
    ],
    learnMore: { label: 'ACM User Guide', url: 'https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html' },
  },
  'amazon-cloudwatch-logs': {
    overview: 'Amazon CloudWatch Logs collects, stores and searches log data from AWS services and applications. Lambda sends anything written to standard output there automatically, and Logs Insights queries those logs with a purpose-built query language.',
    concepts: [
      { term: 'Log groups and streams', detail: 'A log group, such as /aws/lambda/my-function, holds streams; each Lambda execution environment writes its own stream.' },
      { term: 'Retention', detail: 'Logs are kept forever by default; setting a retention period controls cost.' },
      { term: 'Logs Insights', detail: 'Queries such as fields @timestamp, @message | filter @message like /ERROR/ | sort @timestamp desc search and aggregate logs quickly.' },
      { term: 'Metric filters and alarms', detail: 'Turn log patterns into metrics, such as an error count, and alarm on them.' },
      { term: 'Structured logging', detail: 'JSON log lines make fields queryable; correlation IDs tie together all the lines for one request.' },
    ],
    questions: [
      { question: 'How would you troubleshoot an intermittent 500 error in a Lambda API?', answer: 'Find the request in Logs Insights by time or request ID, read the stack trace, check the Duration, Errors and Throttles metrics for patterns such as timeouts or cold starts, and add structured context to the logs if they are not enough.' },
      { question: 'What are the three pillars of observability?', answer: 'Logs (discrete events), metrics (numeric measurements over time) and traces (the path of a request across services, as with X-Ray).' },
    ],
    pitfalls: [
      'Never setting retention, so storage costs grow forever.',
      'Logging secrets, tokens or personal data.',
      'Unstructured log lines that are hard to search.',
    ],
    learnMore: { label: 'CloudWatch Logs User Guide', url: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html' },
  },
};
