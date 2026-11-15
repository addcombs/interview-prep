import type { StudyGuide } from './study-guide';

export const BACK_END: Record<string, StudyGuide> = {
  'java': {
    overview: 'Java is a statically typed, object-oriented language that compiles to bytecode for the Java Virtual Machine, which JIT-compiles hot code and manages memory with garbage collection. Its long-term-support releases (17, 21, 25) bring records, sealed types, pattern matching and virtual threads.',
    concepts: [
      { term: 'JVM, JRE and JDK', detail: 'The JVM runs bytecode; the JRE is the JVM plus the standard libraries; the JDK adds the compiler and tools. HotSpot JIT-compiles frequently run code to native code.' },
      { term: 'Memory and garbage collection', detail: 'Objects live on the heap and are reclaimed by a garbage collector such as G1 or ZGC; each thread has its own stack for frames and local variables.' },
      { term: 'Collections', detail: 'List (ArrayList, LinkedList), Set (HashSet, TreeSet) and Map (HashMap, TreeMap, ConcurrentHashMap), with different ordering, complexity and thread-safety guarantees.' },
      { term: 'equals and hashCode', detail: 'Objects that are equal must have equal hash codes, or hash-based collections lose them. Records generate both from their components.' },
      { term: 'Modern Java', detail: 'Records for immutable data, sealed interfaces for closed hierarchies, switch pattern matching, Optional, streams and lambdas, and virtual threads (Java 21) for cheap blocking concurrency.' },
    ],
    questions: [
      { question: 'What is the contract between equals() and hashCode()?', answer: 'If a.equals(b) then a.hashCode() == b.hashCode(). Overriding one without the other breaks HashMap and HashSet, which use the hash to find the bucket and equals to find the entry.' },
      { question: 'How does HashMap work?', answer: 'It hashes the key to an array bucket and stores entries in a linked list, or a balanced tree once a bucket gets large. Lookups average O(1). It resizes when the load factor (0.75) is exceeded and is not thread-safe.' },
      { question: 'Checked versus unchecked exceptions?', answer: 'Checked exceptions extend Exception and must be declared or caught; unchecked ones extend RuntimeException and need not be. Spring favours unchecked exceptions and translates persistence errors into its DataAccessException hierarchy.' },
      { question: 'What are virtual threads?', answer: 'Lightweight threads scheduled by the JVM onto a few carrier threads. Blocking I/O parks the virtual thread instead of an OS thread, so thread-per-request code scales to very many concurrent requests.' },
      { question: 'Why make objects immutable?', answer: 'Immutable objects are thread-safe without locks, safe as map keys, and easier to reason about. Use final fields, no setters, defensive copies, or simply records.' },
    ],
    pitfalls: [
      'Comparing strings with == instead of equals().',
      'Mutating a collection while iterating it, causing ConcurrentModificationException.',
      'Returning null where Optional or an empty collection would be clearer.',
    ],
    learnMore: { label: 'dev.java', url: 'https://dev.java/learn/' },
  },
  'spring-boot': {
    overview: 'Spring Boot is an opinionated way to build production-ready Spring applications quickly. Auto-configuration sets up beans based on what is on the classpath, starters bundle compatible dependencies, and externalised configuration lets one build run in every environment.',
    concepts: [
      { term: 'Inversion of control and dependency injection', detail: 'The Spring container creates beans and wires their dependencies, ideally through constructor injection, so classes do not construct their own collaborators.' },
      { term: 'Auto-configuration', detail: '@SpringBootApplication enables component scanning and auto-configuration. Conditional beans (@ConditionalOnClass, @ConditionalOnMissingBean) back off when you define your own.' },
      { term: 'Stereotypes', detail: '@Component, @Service, @Repository and @RestController mark beans by role; @Repository also translates persistence exceptions.' },
      { term: 'Externalised configuration', detail: 'application.properties or YAML, profiles, environment variables and @ConfigurationProperties bind settings, with a well-defined precedence order.' },
      { term: 'REST controllers', detail: '@GetMapping, @PostMapping and friends map requests; @PathVariable, @RequestParam and @RequestBody bind input; ResponseEntity and @ControllerAdvice shape responses and errors.' },
    ],
    questions: [
      { question: 'Why prefer constructor injection over field injection?', answer: 'Dependencies are explicit and can be final, the class can be tested without Spring, and missing dependencies fail at start-up rather than as null pointers later.' },
      { question: 'What are bean scopes?', answer: 'singleton (the default, one per container), prototype (new each time), and in web apps request and session. Singletons must therefore be stateless or thread-safe.' },
      { question: 'How does @Transactional work?', answer: 'Spring wraps the bean in a proxy that begins a transaction before the method and commits after, rolling back on unchecked exceptions. Calls from within the same class bypass the proxy, so the annotation has no effect on them.' },
      { question: 'How do you handle errors consistently in a REST API?', answer: 'Throw domain exceptions and map them in a @RestControllerAdvice to status codes and a consistent body, such as RFC 9457 ProblemDetail.' },
      { question: 'How does Spring Boot pick configuration values?', answer: 'From a precedence order where command-line arguments and environment variables override profile-specific files, which override application.properties. That is how this app reads its database URL from the environment.' },
    ],
    pitfalls: [
      'Self-invocation of @Transactional or @Async methods, which skips the proxy.',
      'Storing per-request state in a singleton bean.',
      'Committing secrets to application.properties instead of injecting them from the environment.',
    ],
    learnMore: { label: 'Spring Boot reference', url: 'https://docs.spring.io/spring-boot/index.html' },
  },
  'spring-security': {
    overview: 'Spring Security is the authentication and authorisation framework for Spring applications. It works as a chain of servlet filters in front of your controllers. As an OAuth2 resource server it validates bearer JWTs, checking the signature against the issuer\'s published keys, plus the expiry and audience, before a request reaches the API.',
    concepts: [
      { term: 'SecurityFilterChain', detail: 'A bean that configures which requests need authentication, how they authenticate, CORS, CSRF and session policy.' },
      { term: 'Authentication versus authorisation', detail: 'Authentication establishes who the caller is; authorisation decides what they may do, via request matchers or @PreAuthorize.' },
      { term: 'JWT resource server', detail: 'oauth2ResourceServer().jwt() fetches the issuer\'s JWKS, verifies each token\'s signature and claims, and exposes the claims as a Jwt principal.' },
      { term: 'Stateless sessions', detail: 'APIs authenticated by bearer tokens keep no server session, which suits Lambda and horizontal scaling.' },
    ],
    questions: [
      { question: 'How is a JWT validated?', answer: 'Decode the header and payload, look up the signing key by kid in the issuer\'s JWKS, verify the signature, then check exp, nbf, iss and aud (or client_id), and token_use for Cognito.' },
      { question: 'Why can a token-based API disable CSRF protection?', answer: 'CSRF exploits credentials the browser sends automatically, such as cookies. A bearer token in the Authorization header is added explicitly by the app, so a forged cross-site request cannot include it.' },
      { question: 'How do you get the current user in a controller?', answer: 'Inject @AuthenticationPrincipal Jwt jwt and read claims such as sub, or use SecurityContextHolder. This API keys account records on the Cognito sub claim.' },
      { question: 'What is the difference between 401 and 403?', answer: '401 Unauthorized means not authenticated (missing or invalid credentials); 403 Forbidden means authenticated but not allowed.' },
    ],
    pitfalls: [
      'Trusting a JWT without checking issuer and audience.',
      'Leaving actuator or documentation endpoints open unintentionally, or locking out the health check you need.',
      'Using permissive CORS (any origin with credentials).',
    ],
    learnMore: { label: 'Spring Security reference', url: 'https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html' },
  },
  'spring-data-jpa': {
    overview: 'JPA (Jakarta Persistence) is the standard Java API for object-relational mapping, and Hibernate is its most common implementation. Spring Data JPA removes boilerplate: you declare a repository interface and get CRUD operations, derived queries and paging generated for you.',
    concepts: [
      { term: 'Entities and the persistence context', detail: '@Entity classes map to tables. Within a transaction the persistence context tracks loaded entities and flushes changes automatically (dirty checking).' },
      { term: 'Repositories', detail: 'JpaRepository<T, ID> provides save, findById, findAll and delete; methods like findByEmail are derived from their names; @Query handles anything else.' },
      { term: 'Fetching', detail: 'Associations load LAZY or EAGER. Lazy loading outside a transaction fails, and loading in a loop causes the N+1 query problem.' },
      { term: 'ddl-auto', detail: 'validate checks that the schema matches the entities, which this app uses with migrations owning the schema; update and create are for prototypes only.' },
    ],
    questions: [
      { question: 'What is the N+1 query problem and how do you fix it?', answer: 'Loading N parents and then lazily loading each one\'s children makes N+1 queries. Fix it with a fetch join, an @EntityGraph, batch fetching, or a DTO projection query.' },
      { question: 'What is the difference between save() and saveAndFlush()?', answer: 'save() persists or merges into the persistence context and writes at flush or commit; saveAndFlush() forces the SQL immediately, surfacing constraint violations sooner.' },
      { question: 'Should you expose entities directly from a REST API?', answer: 'Usually not. DTOs decouple the API contract from the schema, avoid lazy-loading and serialisation surprises, and prevent mass assignment of fields clients should not set.' },
      { question: 'How do you handle concurrent updates to the same row?', answer: 'Optimistic locking with a @Version column makes the second writer fail with an exception it can retry; pessimistic locking (SELECT ... FOR UPDATE) blocks instead.' },
    ],
    pitfalls: [
      'Using ddl-auto=update in production instead of versioned migrations.',
      'EAGER fetching everywhere, which loads far more than needed.',
      'Using entities with generated IDs in HashSets before they are saved, when equals and hashCode rely on the ID.',
    ],
    learnMore: { label: 'Spring Data JPA reference', url: 'https://docs.spring.io/spring-data/jpa/reference/' },
  },
  'bean-validation': {
    overview: 'Jakarta Bean Validation defines constraints as annotations on fields and parameters, and Hibernate Validator is the reference implementation. In Spring, @Valid on a request body validates it automatically and turns violations into a 400 Bad Request.',
    concepts: [
      { term: 'Built-in constraints', detail: '@NotNull, @NotBlank, @NotEmpty, @Size, @Email, @Pattern, @Min, @Max, @Positive and @Past cover most needs.' },
      { term: '@Valid and @Validated', detail: '@Valid triggers validation of a request body or nested object; @Validated on a class enables method-parameter validation and validation groups.' },
      { term: 'Custom constraints', detail: 'Define an annotation with @Constraint and a ConstraintValidator implementation for rules the built-ins do not cover.' },
      { term: 'Error handling', detail: 'Failed body validation throws MethodArgumentNotValidException, which a @RestControllerAdvice can turn into field-level error messages.' },
    ],
    questions: [
      { question: 'What is the difference between @NotNull, @NotEmpty and @NotBlank?', answer: '@NotNull rejects null only; @NotEmpty also rejects empty strings and collections; @NotBlank also rejects strings that are only whitespace.' },
      { question: 'Why validate on the server if the UI already validates?', answer: 'Clients can be bypassed with any HTTP tool, so the server is the only place validation is guaranteed. Client-side validation is for user experience.' },
      { question: 'How do you validate that two fields agree?', answer: 'With a class-level custom constraint whose validator reads both fields, or by checking in the service layer.' },
    ],
    pitfalls: [
      'Forgetting @Valid, so annotations are silently ignored.',
      'Letting column lengths and @Size limits drift apart.',
      'Returning raw exception messages to clients instead of clean field errors.',
    ],
    learnMore: { label: 'Hibernate Validator', url: 'https://hibernate.org/validator/documentation/' },
  },
  'spring-boot-actuator': {
    overview: 'Actuator adds production-ready endpoints to a Spring Boot app: health, info, metrics, environment and more. Health indicators report the state of dependencies such as the database, and metrics flow through Micrometer to monitoring systems.',
    concepts: [
      { term: 'Endpoints and exposure', detail: 'Endpoints exist but are only reachable over HTTP once exposed with management.endpoints.web.exposure.include. Only health is exposed by default.' },
      { term: 'Health indicators', detail: 'Auto-configured indicators check the database, disk space and more; custom ones implement HealthIndicator. Groups support liveness and readiness probes.' },
      { term: 'Micrometer metrics', detail: 'A vendor-neutral metrics facade with counters, timers and gauges, exportable to CloudWatch, Prometheus and others.' },
    ],
    questions: [
      { question: 'Liveness versus readiness: what is the difference?', answer: 'Liveness says the process is alive (restart it if not); readiness says it can serve traffic (stop routing to it if not). A slow database should fail readiness but not liveness.' },
      { question: 'Which actuator endpoints are risky to expose?', answer: 'env, configprops, heapdump, threaddump and loggers can leak secrets or allow changes. Expose them only on a protected management port, if at all.' },
    ],
    pitfalls: [
      'Exposing every endpoint with include=*.',
      'Health checks that call slow downstream services on every request.',
      'Showing health details to anonymous callers.',
    ],
    learnMore: { label: 'Actuator reference', url: 'https://docs.spring.io/spring-boot/reference/actuator/index.html' },
  },
  'swagger-ui': {
    overview: 'OpenAPI is the standard, machine-readable description of an HTTP API: its paths, parameters, schemas and security. springdoc-openapi generates that description from Spring controllers at runtime, and Swagger UI renders it as interactive documentation where you can send real requests.',
    concepts: [
      { term: 'OpenAPI specification', detail: 'A JSON or YAML document describing endpoints, request and response schemas, and authentication schemes. It can generate clients, mocks and tests.' },
      { term: 'Code-first versus design-first', detail: 'Code-first generates the spec from annotated code, as springdoc does; design-first writes the spec first and generates server stubs and clients from it.' },
      { term: 'Annotations', detail: '@Operation, @ApiResponse, @Schema and @Tag enrich generated documentation with summaries, examples and error responses.' },
      { term: 'Security schemes', detail: 'A bearer JWT scheme adds an Authorize button so requests from Swagger UI carry a token.' },
    ],
    questions: [
      { question: 'Why document an API with OpenAPI?', answer: 'It is a contract that humans and tools can read: it drives documentation, generated clients, contract tests and gateway configuration, and makes breaking changes visible in review.' },
      { question: 'How do you version a REST API?', answer: 'Commonly with a URL prefix such as /v1, or a header or media type. Prefer additive, backward-compatible changes and deprecate before removing.' },
    ],
    pitfalls: [
      'Docs drifting from behaviour when the spec is maintained by hand.',
      'Exposing internal or admin endpoints in public documentation.',
      'Missing error response documentation, which leaves clients guessing.',
    ],
    learnMore: { label: 'springdoc-openapi', url: 'https://springdoc.org/' },
  },
  'junit-and-mockito': {
    overview: 'JUnit 5 (Jupiter) is the standard Java testing framework, and Mockito creates mocks of dependencies so a class can be tested in isolation. Spring Boot adds test slices such as @WebMvcTest and @DataJpaTest that start only part of the application context.',
    concepts: [
      { term: 'JUnit 5 basics', detail: '@Test, @BeforeEach, @AfterEach, @DisplayName, @Nested, and @ParameterizedTest with @ValueSource or @CsvSource; assertions such as assertEquals and assertThrows.' },
      { term: 'Mockito', detail: 'mock() or @Mock creates a test double, when(...).thenReturn(...) stubs it, and verify(...) checks interactions. ArgumentCaptor captures arguments for assertions.' },
      { term: 'Spring test slices', detail: '@WebMvcTest loads controllers and MockMvc; @DataJpaTest loads JPA with an embedded or test database; @SpringBootTest loads everything.' },
      { term: 'Test pyramid', detail: 'Many fast unit tests, fewer integration tests, and a handful of end-to-end tests.' },
    ],
    questions: [
      { question: 'When do you mock and when do you not?', answer: 'Mock slow, external or non-deterministic dependencies such as HTTP clients, clocks and Cognito. Do not mock value objects or the class under test, and prefer real collaborators when they are cheap.' },
      { question: 'How do you test a secured endpoint?', answer: 'Use MockMvc with spring-security-test, for example .with(jwt().jwt(j -> j.subject("abc"))) for an authenticated call, and assert 401 without a token.' },
      { question: 'Unit versus integration test?', answer: 'A unit test checks one class in isolation with doubles; an integration test checks components working together, such as the controller through to a real database (often with Testcontainers).' },
    ],
    pitfalls: [
      'Over-mocking so tests pass while the real wiring is broken.',
      'Using @SpringBootTest for everything, which makes the suite slow.',
      'Verifying every interaction, which couples tests to implementation.',
    ],
    learnMore: { label: 'JUnit 5 User Guide', url: 'https://junit.org/junit5/docs/current/user-guide/' },
  },
  'maven': {
    overview: 'Apache Maven is a build tool built on convention over configuration. A pom.xml declares coordinates, dependencies and plugins, and Maven runs a standard lifecycle of phases (validate, compile, test, package, verify, install, deploy).',
    concepts: [
      { term: 'Coordinates', detail: 'groupId:artifactId:version identifies every artifact; SNAPSHOT versions are mutable development builds.' },
      { term: 'Lifecycle and plugins', detail: 'Running a phase runs every earlier phase; plugin goals, such as the Surefire plugin\'s test goal, are bound to phases.' },
      { term: 'Dependency scopes', detail: 'compile (the default), provided, runtime and test control which classpaths a dependency is on.' },
      { term: 'Transitive dependencies and BOMs', detail: 'Dependencies bring their own; nearest-wins resolves conflicts. A BOM in dependencyManagement, such as Spring Boot\'s parent, aligns versions.' },
    ],
    questions: [
      { question: 'What happens when you run mvn package?', answer: 'Maven runs validate, compile, test-compile and test, then package, which produces the jar. This project packages the API for Lambda.' },
      { question: 'How do you resolve a dependency version conflict?', answer: 'Inspect with mvn dependency:tree, then pin the version in dependencyManagement or exclude the unwanted transitive dependency.' },
      { question: 'Maven or Gradle?', answer: 'Maven is declarative and highly standardised; Gradle is more flexible and faster with incremental builds and its build cache. Both use the same repositories.' },
    ],
    pitfalls: [
      'Skipping tests with -DskipTests habitually.',
      'Depending on SNAPSHOT versions in releases.',
      'Hard-coding versions that a BOM already manages.',
    ],
    learnMore: { label: 'Maven guides', url: 'https://maven.apache.org/guides/getting-started/index.html' },
  },
  'spring-boot-devtools': {
    overview: 'Spring Boot DevTools speeds up the development loop. It restarts the application automatically when classes change, using two classloaders so only your code reloads, and applies development-friendly defaults such as disabling template caching.',
    concepts: [
      { term: 'Automatic restart', detail: 'A base classloader holds unchanging third-party jars and a restart classloader holds your code, so restarts are much faster than a cold start.' },
      { term: 'Development defaults', detail: 'Caching is turned off and logging is more verbose, making changes visible immediately.' },
      { term: 'Excluded from production', detail: 'DevTools disables itself when the app runs from a fully packaged jar, and it is marked optional so it is not passed on to other projects.' },
    ],
    questions: [
      { question: 'Restart versus hot swap: what is the difference?', answer: 'A restart reloads the application context in a fresh classloader; hot swap replaces method bodies in the running JVM without restarting, which is faster but limited to small changes.' },
      { question: 'Why must DevTools never run in production?', answer: 'It changes caching and behaviour, adds overhead, and its remote-update feature would be a security risk.' },
    ],
    pitfalls: [
      'Including DevTools in a production jar.',
      'Confusing restarts with a bug when static state disappears between reloads.',
    ],
    learnMore: { label: 'DevTools reference', url: 'https://docs.spring.io/spring-boot/reference/using/devtools.html' },
  },
  'postgresql': {
    overview: 'PostgreSQL is an open-source relational database known for standards compliance, reliability and extensibility. It provides ACID transactions through multi-version concurrency control (MVCC), rich types such as JSONB and arrays, and a capable query planner.',
    concepts: [
      { term: 'ACID', detail: 'Atomicity, consistency, isolation and durability: a transaction applies entirely or not at all, keeps constraints true, is isolated from other transactions, and survives crashes once committed.' },
      { term: 'MVCC', detail: 'Writers create new row versions instead of overwriting, so readers never block writers. VACUUM reclaims old versions.' },
      { term: 'Indexes', detail: 'B-tree (the default) for equality and ranges, GIN for JSONB and full-text search, and partial and composite indexes. EXPLAIN ANALYZE shows whether a query uses them.' },
      { term: 'Constraints', detail: 'Primary keys, foreign keys, UNIQUE, NOT NULL and CHECK enforce integrity in the database itself, as the unique Cognito subject and email do here.' },
      { term: 'Schemas', detail: 'Namespaces inside one database. These apps share a Neon database with each one\'s tables in its own schema.' },
    ],
    questions: [
      { question: 'What are the SQL transaction isolation levels?', answer: 'Read uncommitted, read committed (PostgreSQL\'s default), repeatable read and serializable, each preventing more anomalies (dirty reads, non-repeatable reads, phantoms, serialisation anomalies) at a cost in concurrency.' },
      { question: 'How would you find out why a query is slow?', answer: 'Run EXPLAIN ANALYZE to see the plan and real timings, look for sequential scans on large tables, bad row estimates or sorts spilling to disk, then add an index, rewrite the query or update statistics.' },
      { question: 'What is the difference between INNER JOIN and LEFT JOIN?', answer: 'INNER JOIN returns only rows with matches in both tables; LEFT JOIN returns every row from the left table, with nulls where the right has no match.' },
      { question: 'What is normalisation, and when would you denormalise?', answer: 'Normalisation removes redundancy by splitting data into related tables (up to third normal form). You denormalise deliberately for read performance, accepting more complex writes.' },
      { question: 'How do you prevent SQL injection?', answer: 'Always use parameterised queries or prepared statements, which JPA does, never string concatenation, and grant the application user only the privileges it needs.' },
    ],
    pitfalls: [
      'Missing indexes on foreign keys and frequently filtered columns.',
      'Opening a new connection per request instead of pooling.',
      'Relying on application checks instead of database constraints for uniqueness.',
    ],
    learnMore: { label: 'PostgreSQL documentation', url: 'https://www.postgresql.org/docs/current/tutorial.html' },
  },
  'sql-migrations': {
    overview: 'Schema migrations are versioned, ordered SQL scripts that move a database from one schema version to the next. Kept in source control and applied the same way in every environment, they make database changes reviewable, repeatable and auditable, as tools like Flyway and Liquibase do.',
    concepts: [
      { term: 'Versioned and ordered', detail: 'Each script has a version, such as V2__add_users.sql, and runs exactly once in order; a history table records what has been applied.' },
      { term: 'Forward-only changes', detail: 'Applied migrations are never edited; fixes are new migrations, which keeps every environment\'s history identical.' },
      { term: 'Expand and contract', detail: 'For zero-downtime changes, add the new structure first, deploy code that uses both, migrate data, then remove the old structure in a later release.' },
      { term: 'Idempotency', detail: 'Guards such as CREATE TABLE IF NOT EXISTS make scripts safe to re-run where a tool does not track history.' },
    ],
    questions: [
      { question: 'How do you rename a column without downtime?', answer: 'Add the new column, write to both, backfill, switch reads to the new column, stop writing the old one, and finally drop it, across several deployments.' },
      { question: 'Why not let Hibernate generate the schema?', answer: 'Generated DDL is not reviewable or reversible, cannot migrate data, and may make destructive changes. Migrations make every change explicit, with Hibernate set to validate.' },
      { question: 'How do you roll back a bad migration?', answer: 'Usually by writing a new forward migration that undoes it; some tools support undo scripts. Take backups or snapshots before risky changes.' },
    ],
    pitfalls: [
      'Editing a migration that has already run somewhere.',
      'Long-running locks from adding indexes on large tables; use CREATE INDEX CONCURRENTLY.',
      'Coupling a schema change and the code that depends on it into one non-backward-compatible deploy.',
    ],
    learnMore: { label: 'Flyway documentation', url: 'https://documentation.red-gate.com/flyway' },
  },
};
