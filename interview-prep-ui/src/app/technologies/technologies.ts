/** A dashboard card: shows `logo` (a local SVG in public/logos) or, when no licensed logo is bundled, a Material `icon`. Its study guide is in study-guides, loaded only with the guide page. */
export interface Technology {
  slug: string;
  name: string;
  logo?: string;
  icon?: string;
  description: string;
  /** How this app uses it, which doubles as a talking point in an interview. */
  usage: string;
}

export interface TechnologyGroup {
  label: string;
  icon: string;
  technologies: Technology[];
}

export const TECHNOLOGY_GROUPS: TechnologyGroup[] = [
  {
    label: 'Front-end',
    icon: 'web',
    technologies: [
      {
        slug: 'angular', name: 'Angular', logo: 'logos/angular.svg', description: 'Front-end framework',
        usage: 'Builds the app screens and keeps the navigation, account details, and API status in sync with application state.',
      },
      {
        slug: 'angular-material', name: 'Angular Material', logo: 'logos/angularmaterial.svg', description: 'Material Design 3 components and theming',
        usage: 'Provides the toolbar, navigation drawer, dialogs, cards, buttons, and theme-aware controls; its theme-color schematic generated every palette from the single #2E7D32 primary.',
      },
      {
        slug: 'angular-cdk', name: 'Angular CDK', logo: 'logos/angularmaterial.svg', description: 'Component Dev Kit behavior primitives',
        usage: 'Watches screen-size breakpoints so the navigation drawer docks on wide screens and overlays on narrow ones, and auto-sizes the read-only Email field so long addresses wrap.',
      },
      {
        slug: 'angular-reactive-forms', name: 'Angular Reactive Forms', logo: 'logos/angular.svg', description: 'Typed, validated form state',
        usage: 'Powers the registration and account details forms, validating required fields and lengths before submitting.',
      },
      {
        slug: 'angular-signals', name: 'Angular Signals', logo: 'logos/angular.svg', description: 'Reactive application state',
        usage: 'Hold the sign-in status, account details, theme brightness, selected tab, and drawer state, so the screens update automatically whenever any of them change.',
      },
      {
        slug: 'typescript', name: 'TypeScript', logo: 'logos/typescript.svg', description: 'Typed application code',
        usage: 'Defines types for account data and services so mistakes can be caught during development.',
      },
      {
        slug: 'rxjs', name: 'RxJS', logo: 'logos/rxjs.svg', description: 'Reactive HTTP and async handling',
        usage: 'Handles asynchronous UI events and the repeating API health check.',
      },
      {
        slug: 'sass', name: 'Sass', logo: 'logos/sass.svg', description: 'Theme and component styling',
        usage: 'Styles the responsive layout and generates colors for the adjustable light-to-dark theme.',
      },
      {
        slug: 'svg', name: 'SVG', icon: 'grid_on', description: 'Inline vector graphics',
        usage: 'Draws the toolbar\'s pixel mosaic inline, filled with the theme\'s primary and secondary colors so it follows light/dark mode and the brightness slider.',
      },
      {
        slug: 'material-icons-and-lato', name: 'Material Icons & Lato', icon: 'font_download', description: 'Icon font and typeface from Google Fonts',
        usage: 'Loads the Material Icons font used for every icon in the app and the Lato typeface used for its text from Google Fonts.',
      },
      {
        slug: 'vitest', name: 'Vitest', logo: 'logos/vitest.svg', description: 'Front-end unit tests',
        usage: 'Runs the component and service tests in a jsdom browser environment, including account requests and the API health indicator.',
      },
      {
        slug: 'angular-cli', name: 'Angular CLI', logo: 'logos/angular.svg', description: 'Front-end build and dev server',
        usage: 'Builds the production bundle with esbuild, runs the tests, and serves the app locally through a Vite dev server with a proxy to the account API.',
      },
      {
        slug: 'nodejs-and-npm', name: 'Node.js & npm', logo: 'logos/nodejs.svg', description: 'JavaScript runtime and package manager',
        usage: 'Runs the Angular CLI and installs the front-end dependencies listed in package.json.',
      },
    ],
  },
  {
    label: 'Back-end',
    icon: 'dns',
    technologies: [
      {
        slug: 'java', name: 'Java', logo: 'logos/java.svg', description: 'Back-end language',
        usage: 'Implements the server-side account API and its validation and persistence logic.',
      },
      {
        slug: 'spring-boot', name: 'Spring Boot', logo: 'logos/spring.svg', description: 'Account REST API',
        usage: 'Runs the backend, exposes the account endpoints, and loads configuration from environment variables or a local, untracked .env file.',
      },
      {
        slug: 'spring-security', name: 'Spring Security', logo: 'logos/spring.svg', description: 'OAuth2 resource server validating Cognito tokens',
        usage: 'Protects account endpoints by validating Cognito identity tokens before allowing requests.',
      },
      {
        slug: 'spring-data-jpa', name: 'Spring Data JPA', logo: 'logos/spring.svg', description: 'Database access and schema validation',
        usage: 'Provides repository access to account records; Hibernate validates the tables in the app\'s own schema, set by DATABASE_SCHEMA, at startup.',
      },
      {
        slug: 'bean-validation', name: 'Bean Validation', logo: 'logos/hibernate.svg', description: 'Request validation with Hibernate Validator',
        usage: 'Rejects account updates with missing names or over-length fields before they reach the database.',
      },
      {
        slug: 'spring-boot-actuator', name: 'Spring Boot Actuator', logo: 'logos/spring.svg', description: 'Health monitoring',
        usage: 'Exposes the public health check endpoint that drives the API status indicator in the footer.',
      },
      {
        slug: 'swagger-ui', name: 'Swagger UI', logo: 'logos/swagger.svg', description: 'Interactive API documentation via springdoc-openapi',
        usage: 'Generates OpenAPI docs from the account controller so endpoints can be explored and tried with a Cognito token.',
      },
      {
        slug: 'junit-and-mockito', name: 'JUnit & Mockito', logo: 'logos/junit.svg', description: 'Back-end unit tests',
        usage: 'Tests the account service, controller, security rules, and API docs without needing a database or Cognito.',
      },
      {
        slug: 'maven', name: 'Maven', logo: 'logos/maven.svg', description: 'Back-end build and dependency management',
        usage: 'Downloads Java dependencies and builds and tests the Spring Boot API.',
      },
      {
        slug: 'spring-boot-devtools', name: 'Spring Boot DevTools', logo: 'logos/spring.svg', description: 'Development-time restarts',
        usage: 'Restarts the API automatically when code changes during development; it is excluded from production builds.',
      },
      {
        slug: 'postgresql', name: 'PostgreSQL', logo: 'logos/postgresql.svg', description: 'Account data storage',
        usage: 'Stores account records so profile changes remain available across sessions.',
      },
      {
        slug: 'sql-migrations', name: 'SQL migrations', logo: 'logos/postgresql.svg', description: 'Versioned database schema scripts',
        usage: 'Scripts in db/migrations create the app\'s schema and users table, with the unique Cognito subject and email constraints the account API expects; scripts/apply-migrations.ps1 runs them.',
      },
    ],
  },
  {
    label: 'Cloud',
    icon: 'cloud',
    technologies: [
      {
        slug: 'aws-amplify', name: 'AWS Amplify', logo: 'logos/aws-amplify.svg', description: 'Cognito client library for the browser',
        usage: 'Registers and confirms new users in the app, redirects to Cognito for sign-in, exchanges the returned code for tokens, and provides the session token for API requests.',
      },
      {
        slug: 'amazon-cognito', name: 'Amazon Cognito', logo: 'logos/amazon-cognito.svg', description: 'Sign-in and registration',
        usage: 'Manages user accounts, emails registration confirmation codes, and hosts the managed login page styled in the app\'s colors; its identity tokens authorize account API requests.',
      },
      {
        slug: 'neon', name: 'Neon', logo: 'logos/neon.svg', description: 'Hosted serverless PostgreSQL',
        usage: 'Hosts the PostgreSQL database shared by these apps without a locally managed database server; each app keeps its tables in its own schema.',
      },
      {
        slug: 'aws-lambda', name: 'AWS Lambda', icon: 'bolt', description: 'Serverless API hosting',
        usage: 'Runs the Spring Boot API on Java 21 (arm64) through aws-serverless-java-container, with SnapStart to cut cold starts and a live alias behind a function URL.',
      },
      {
        slug: 'amazon-cloudfront', name: 'Amazon CloudFront', icon: 'public', description: 'Content delivery and HTTPS',
        usage: 'Serves the UI and the API from one distribution at the app domain over HTTPS, caching the UI files and passing the API paths straight to Lambda.',
      },
      {
        slug: 'amazon-s3', name: 'Amazon S3', icon: 'storage', description: 'Object storage',
        usage: 'Holds the built UI files in a private bucket that only CloudFront can read, and stages the API package for Lambda deployments.',
      },
      {
        slug: 'aws-certificate-manager', name: 'AWS Certificate Manager', icon: 'verified_user', description: 'Free TLS certificates',
        usage: 'Issues and auto-renews one certificate for the root domain and its subdomains, shared by every app and validated through DNS records in Route 53.',
      },
      {
        slug: 'amazon-cloudwatch-logs', name: 'Amazon CloudWatch Logs', icon: 'receipt_long', description: 'API logging',
        usage: 'Collects the Lambda function\'s log output, for troubleshooting the API.',
      },
    ],
  },
  {
    label: 'Tools',
    icon: 'build',
    technologies: [
      {
        slug: 'claude', name: 'Claude', icon: 'smart_toy', description: 'AI coding agent by Anthropic',
        usage: 'Generated this application from the angular-app and spring-boot-app agents and templates provided by Adam Combs.',
      },
      {
        slug: 'powershell-scripts', name: 'PowerShell scripts', icon: 'terminal', description: 'Setup, tests, start-up, and deployment',
        usage: 'scripts/start-all.ps1 installs dependencies, builds and tests both apps, then starts the API and UI; scripts/provision.ps1 sets up AWS from project.json through the CDK stack in infra/, and GitHub Actions builds, tests, and deploys each push to main; the site was created from template-0 with its scripts/new-app.ps1.',
      },
      {
        slug: 'aws-cli', name: 'AWS CLI', icon: 'keyboard', description: 'Command-line access to AWS',
        usage: 'Runs the AWS steps in the setup and deploy scripts, from requesting the certificate and deploying the CDK stack to uploading the UI and publishing new Lambda versions.',
      },
    ],
  },
];

/** The technology with this slug, and the index of the group it belongs to. */
export function findTechnology(slug: string): { technology: Technology; groupIndex: number } | undefined {
  for (const [groupIndex, group] of TECHNOLOGY_GROUPS.entries()) {
    const technology = group.technologies.find((t) => t.slug === slug);
    if (technology) return { technology, groupIndex };
  }
  return undefined;
}
