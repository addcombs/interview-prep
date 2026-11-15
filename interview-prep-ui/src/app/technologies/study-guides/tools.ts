import type { StudyGuide } from './study-guide';

export const TOOLS: Record<string, StudyGuide> = {
  'claude': {
    overview: 'Claude is Anthropic\'s family of large language models, and Claude Code is its agentic coding tool: it reads a codebase, runs commands, edits files and tests its own changes from the terminal or an IDE. Interviewers increasingly ask how candidates use AI assistants responsibly in day-to-day engineering.',
    concepts: [
      { term: 'Agentic coding', detail: 'The model plans, uses tools (file reads, edits, shell commands, tests) and iterates on results, rather than only completing code in an editor.' },
      { term: 'Context and instructions', detail: 'Project files such as CLAUDE.md, custom agents and templates give the model conventions to follow, which is how this app was generated consistently.' },
      { term: 'Human review', detail: 'The developer remains responsible for design, correctness and security: reviewing diffs, running tests and understanding what ships.' },
      { term: 'Prompting well', detail: 'Clear goals, constraints, examples and acceptance criteria produce better results than vague requests.' },
    ],
    questions: [
      { question: 'How do you use AI coding tools in your work?', answer: 'For scaffolding, refactors, test writing, exploring unfamiliar code and drafting documentation, while I own the design and review every change. I give it project conventions up front and verify its output with tests.' },
      { question: 'What are the risks of AI-generated code, and how do you manage them?', answer: 'Subtle bugs, outdated or invented APIs, security issues and licence concerns. I manage them with code review, tests, static analysis and by not accepting code I do not understand.' },
      { question: 'How would you introduce AI tools to a team?', answer: 'Start with clear guidelines on data handling and review, share effective prompts and project instructions, measure the effect on cycle time and defects, and keep humans accountable for merged code.' },
    ],
    pitfalls: [
      'Accepting generated code without reading or testing it.',
      'Pasting secrets or confidential data into prompts.',
      'Being unable to explain code you shipped in a review or interview.',
    ],
    learnMore: { label: 'Claude Code (Anthropic)', url: 'https://claude.com/claude-code' },
  },
  'powershell-scripts': {
    overview: 'PowerShell is Microsoft\'s cross-platform shell and scripting language built on .NET. Unlike text-based shells, its pipeline passes structured objects, which makes automation such as building, testing and deploying more robust. Together with GitHub Actions it forms this project\'s CI/CD.',
    concepts: [
      { term: 'Objects in the pipeline', detail: 'Cmdlets emit .NET objects, so Where-Object and Select-Object filter by property instead of parsing text.' },
      { term: 'Error handling', detail: '$ErrorActionPreference = \'Stop\' and try/catch turn errors into failures; native executables report through $LASTEXITCODE, which scripts must check.' },
      { term: 'Idempotent scripts', detail: 'Setup scripts check whether a resource exists before creating it, so they are safe to re-run.' },
      { term: 'CI/CD', detail: 'Continuous integration builds and tests every change; continuous delivery deploys it automatically, as GitHub Actions does here on each push to main.' },
    ],
    questions: [
      { question: 'What does a CI/CD pipeline you have built look like?', answer: 'On each push: install dependencies, build, run unit tests, package, then deploy (upload the UI to S3 and invalidate CloudFront; publish a new Lambda version and move the live alias), failing fast at any step and keeping secrets in the CI secret store or OIDC roles.' },
      { question: 'How do you make infrastructure scripts safe to re-run?', answer: 'Check for existing resources before creating them, use declarative tools (CloudFormation, CDK, Terraform) where possible, and make each step converge on the desired state.' },
      { question: 'How should CI authenticate to AWS?', answer: 'With OpenID Connect federation to an IAM role with least-privilege permissions, giving short-lived credentials instead of long-lived access keys stored as secrets.' },
    ],
    pitfalls: [
      'Ignoring $LASTEXITCODE so a failed native command does not stop the script.',
      'Storing long-lived cloud keys in CI secrets.',
      'Scripts that only work on one developer\'s machine.',
    ],
    learnMore: { label: 'PowerShell documentation (Microsoft Learn)', url: 'https://learn.microsoft.com/powershell/scripting/overview' },
  },
  'aws-cli': {
    overview: 'The AWS Command Line Interface controls every AWS service from a terminal or script through one consistent command structure. It signs API requests with credentials resolved from a provider chain and outputs JSON that scripts can filter with --query.',
    concepts: [
      { term: 'Credential provider chain', detail: 'Credentials come from command options, environment variables, the shared config and credentials files (profiles, SSO, aws login), and finally instance or container roles.' },
      { term: 'Profiles and regions', detail: '--profile and --region, or AWS_PROFILE and AWS_REGION, select the account, role and region for a command.' },
      { term: '--query and --output', detail: 'JMESPath expressions in --query extract fields from the JSON response, and --output text makes values easy to capture in scripts.' },
      { term: 'IAM least privilege', detail: 'Every call is authorised by IAM; grant only the actions and resources a script needs, and prefer roles with temporary credentials.' },
    ],
    questions: [
      { question: 'How does the CLI decide which credentials to use?', answer: 'It walks the provider chain in order, using the first source that provides credentials: explicit options, environment variables, the configured profile, then the compute environment\'s role.' },
      { question: 'What is the principle of least privilege, and how do you apply it on AWS?', answer: 'Give each identity only the permissions it needs. Scope IAM policies to specific actions and resource ARNs, use conditions, separate roles per task, and review with IAM Access Analyzer.' },
      { question: 'IAM users or IAM roles?', answer: 'Roles. They provide temporary credentials and can be assumed by people (through IAM Identity Center), services and CI; long-lived user access keys should be avoided.' },
    ],
    pitfalls: [
      'Running commands against the wrong account or region because of a stale default profile.',
      'Long-lived access keys on developer machines.',
      'Parsing table output in scripts instead of using --query with JSON or text.',
    ],
    learnMore: { label: 'AWS CLI User Guide', url: 'https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html' },
  },
};
