import type { StudyGuide } from './study-guide';

export const FRONT_END: Record<string, StudyGuide> = {
  'angular': {
    overview: 'Angular is Google\'s TypeScript framework for building single-page applications. It ships routing, forms, an HTTP client, dependency injection and testing support as one integrated platform, and compiles templates ahead of time into efficient JavaScript. Modern Angular (v17+) favours standalone components, signals and built-in control flow over NgModules and zone-based change detection.',
    concepts: [
      { term: 'Components and templates', detail: 'A component is a TypeScript class decorated with @Component that owns a template and styles. Data flows in through input() and out through output(); templates bind with {{ }}, [property], (event) and [(two-way)].' },
      { term: 'Standalone components', detail: 'Components declare their own imports instead of belonging to an NgModule. This makes dependencies explicit and lets the router lazy-load a single component with loadComponent.' },
      { term: 'Dependency injection', detail: 'Services are provided at the root, a route or a component, and requested with inject(). The injector hierarchy decides which instance a component gets, which is how scoping and test doubles work.' },
      { term: 'Change detection', detail: 'Angular re-renders a view when its data may have changed. OnPush limits that to input changes, events and signal reads; zoneless apps rely entirely on signals and explicit notifications instead of Zone.js patching async APIs.' },
      { term: 'Control flow and @defer', detail: '@if, @for (with a required track expression) and @switch replace *ngIf/*ngFor. @defer lazily loads a block\'s dependencies on a trigger such as viewport, idle or a condition.' },
      { term: 'Routing', detail: 'provideRouter(routes) maps URLs to components, with lazy loading, guards, resolvers and route parameters, which withComponentInputBinding() can pass straight to component inputs.' },
    ],
    questions: [
      { question: 'What is the difference between a component, a directive and a pipe?', answer: 'A directive adds behaviour to an existing element; a component is a directive with its own template; a pipe transforms a value for display in a template. Pure pipes only re-run when their input reference changes.' },
      { question: 'How does OnPush change detection work, and why use it?', answer: 'With OnPush, Angular checks a component only when an input reference changes, an event fires in it, an async pipe emits, or a signal it reads changes. It skips whole subtrees otherwise, which improves performance and forces immutable data flow.' },
      { question: 'Which component lifecycle hooks do you use most, and for what?', answer: 'ngOnInit for setup that needs inputs, ngOnChanges to react to input changes, ngAfterViewInit for view queries, and ngOnDestroy (or DestroyRef / takeUntilDestroyed) for cleanup. With signals, computed() and effect() replace much of ngOnChanges.' },
      { question: 'How do you share data between components?', answer: 'Parent to child with inputs, child to parent with outputs, and between unrelated components with an injectable service holding signals or observables. This app shares the selected tab between the menu, dashboard and study guide pages through a root service.' },
      { question: 'How would you improve the load time of a large Angular app?', answer: 'Lazy-load routes and @defer heavy blocks, use OnPush or zoneless change detection, track items in @for, keep bundles lean with budgets, optimise images with NgOptimizedImage, and consider SSR with hydration.' },
    ],
    pitfalls: [
      'Subscribing manually and never unsubscribing, causing memory leaks; prefer the async pipe, toSignal or takeUntilDestroyed.',
      'Mutating an object or array in place and expecting an OnPush component to update.',
      'Putting heavy logic or function calls in templates, which run on every change detection pass.',
    ],
    learnMore: { label: 'angular.dev', url: 'https://angular.dev/overview' },
  },
  'angular-material': {
    overview: 'Angular Material is the Angular team\'s component library implementing Google\'s Material Design 3. It provides accessible, themeable UI components such as buttons, form fields, dialogs, tables and tabs, and a Sass theming API that exposes design tokens as --mat-sys-* CSS variables.',
    concepts: [
      { term: 'mat.theme()', detail: 'A Sass mixin that takes colour palettes, typography and density and emits system tokens as CSS custom properties, so components and your own styles share one source of truth.' },
      { term: 'System tokens', detail: 'Variables such as --mat-sys-primary, --mat-sys-surface and --mat-sys-on-surface describe roles rather than colours, so light and dark schemes swap automatically.' },
      { term: 'Component overrides', detail: 'Per-component token mixins (or setting tokens like --mat-card-outlined-outline-color) customise one component without fragile deep selectors.' },
      { term: 'MatDialog and overlays', detail: 'Dialogs, menus and tooltips render in the CDK overlay container outside the component tree, with focus trapping and Escape handling built in.' },
    ],
    questions: [
      { question: 'How do you theme Angular Material in v17+?', answer: 'Call mat.theme() in a global stylesheet with a colour palette (often generated by ng generate @angular/material:theme-color), then use --mat-sys-* variables in your own styles. Dark mode comes from the color-scheme property or a second theme block.' },
      { question: 'How do you customise a Material component\'s look?', answer: 'Prefer the component\'s token override mixin or CSS custom properties. Avoid ::ng-deep and internal class names, which break between releases.' },
      { question: 'How do you pass data into and out of a MatDialog?', answer: 'Open it with dialog.open(Component, { data }), inject MAT_DIALOG_DATA in the dialog, and close with dialogRef.close(result). The caller reads the result from afterClosed().' },
      { question: 'What does Angular Material give you for accessibility?', answer: 'Keyboard interaction, focus management, ARIA roles and states, and high-contrast support. You still own labels, alt text and colour contrast of your own content.' },
    ],
    pitfalls: [
      'Styling internal .mat-mdc-* classes, which change between versions.',
      'Forgetting to import the component module into a standalone component, which produces unknown-element errors.',
      'Hard-coding colours instead of using system tokens, so dark mode looks wrong.',
    ],
    learnMore: { label: 'material.angular.dev', url: 'https://material.angular.dev/guide/theming' },
  },
  'angular-cdk': {
    overview: 'The Component Dev Kit is the unstyled foundation underneath Angular Material. It provides behaviour primitives (overlays, drag and drop, virtual scrolling, accessibility utilities, layout observers) that you can use to build your own components without adopting Material\'s visual design.',
    concepts: [
      { term: 'BreakpointObserver', detail: 'Observes media queries and emits whether they match, which drives responsive behaviour in TypeScript rather than only in CSS.' },
      { term: 'Overlay', detail: 'Creates floating panels positioned relative to an element or the viewport, with scroll strategies and backdrops. Menus, dialogs and tooltips are built on it.' },
      { term: 'A11y module', detail: 'FocusTrap, FocusMonitor, LiveAnnouncer and ListKeyManager handle focus and screen reader announcements correctly.' },
      { term: 'Virtual scrolling', detail: 'cdk-virtual-scroll-viewport renders only the visible items of a long list, keeping the DOM small.' },
    ],
    questions: [
      { question: 'When would you use the CDK instead of Angular Material?', answer: 'When you need the behaviour, such as overlays, drag and drop or focus management, but your own design system, so you build styled components on CDK primitives.' },
      { question: 'How does virtual scrolling improve performance?', answer: 'It renders only the rows in and near the viewport and recycles them as you scroll, so a list of ten thousand items costs about the same as a list of twenty.' },
      { question: 'How would you make a custom dropdown accessible?', answer: 'Use an Overlay for the panel, ListKeyManager or ActiveDescendantKeyManager for arrow-key navigation, correct ARIA roles (listbox, option, aria-expanded) and return focus to the trigger on close.' },
    ],
    pitfalls: [
      'Using BreakpointObserver for purely visual changes that a CSS media query handles more simply.',
      'Forgetting the CDK overlay prebuilt styles when using overlays without Material.',
      'Using virtual scroll with variable-height items without a strategy that supports it.',
    ],
    learnMore: { label: 'Component Dev Kit', url: 'https://material.angular.dev/cdk/categories' },
  },
  'angular-reactive-forms': {
    overview: 'Reactive Forms model a form explicitly in TypeScript as a tree of FormControl, FormGroup and FormArray objects. The model is the source of truth, synchronous to read, strongly typed since Angular 14, and easy to test without rendering a template.',
    concepts: [
      { term: 'FormControl, FormGroup, FormArray', detail: 'A control holds one value and its validation state; a group holds named controls; an array holds a dynamic list. FormBuilder (or NonNullableFormBuilder) creates them concisely.' },
      { term: 'Validators', detail: 'Synchronous validators (Validators.required, maxLength, pattern or your own function) return an error map or null. Async validators return an observable, for example to check a username on the server.' },
      { term: 'State flags', detail: 'valid/invalid, pending, touched/untouched and dirty/pristine drive when to show errors. Showing errors only once touched avoids shouting at users.' },
      { term: 'valueChanges and statusChanges', detail: 'Observables that emit on every change, useful for dependent fields, auto-save and debounced searches.' },
    ],
    questions: [
      { question: 'Reactive forms versus template-driven forms?', answer: 'Template-driven forms build the model implicitly from ngModel directives and suit simple forms. Reactive forms define the model in code, are typed, synchronous and easier to test and compose, so they suit complex or dynamic forms.' },
      { question: 'How do you write a cross-field validator?', answer: 'Attach a validator to the FormGroup that reads both controls, for example password and confirmPassword, and returns an error such as { mismatch: true } on the group.' },
      { question: 'What is the difference between value and getRawValue()?', answer: 'value omits disabled controls; getRawValue() includes them.' },
      { question: 'How do you prevent a double submit?', answer: 'Disable the submit button while a saving flag is true, ignore submits while pending, and only re-enable once the request completes or fails.' },
    ],
    pitfalls: [
      'Trusting client-side validation alone; the server must validate again, as this app\'s API does with Bean Validation.',
      'Setting the disabled attribute in the template on a reactive control instead of calling disable().',
      'Subscribing to valueChanges without cleaning up.',
    ],
    learnMore: { label: 'Reactive forms guide', url: 'https://angular.dev/guide/forms/reactive-forms' },
  },
  'angular-signals': {
    overview: 'Signals are Angular\'s fine-grained reactive primitive. A signal wraps a value and tracks who reads it, so when it changes Angular knows exactly which computations and views depend on it. They enable zoneless change detection and simpler state code than observables for synchronous state.',
    concepts: [
      { term: 'signal()', detail: 'A writable value read by calling it, as in count(), and changed with set() or update().' },
      { term: 'computed()', detail: 'A read-only signal derived from others. It is lazy and memoised: it recalculates only when a dependency changes and someone reads it.' },
      { term: 'effect()', detail: 'Runs side effects, such as logging, storage or imperative DOM work, whenever the signals it reads change. Use it sparingly; derived state belongs in computed().' },
      { term: 'Signal inputs and model()', detail: 'input() and input.required() make component inputs signals; model() creates two-way bindable signals.' },
      { term: 'RxJS interop', detail: 'toSignal() turns an observable into a signal and toObservable() goes the other way, so streams and state can meet.' },
    ],
    questions: [
      { question: 'Signals or observables: when do you use which?', answer: 'Signals for synchronous state that the UI reads; observables for asynchronous events over time such as HTTP, WebSockets, debounced input and complex stream composition. Convert at the boundary with toSignal.' },
      { question: 'Why should you avoid setting signals inside computed()?', answer: 'computed() must be a pure derivation. Writing state inside it creates hidden side effects and can cause cycles, so Angular disallows it.' },
      { question: 'What is untracked() for?', answer: 'It reads a signal inside an effect or computed without registering a dependency, so the effect does not re-run when that signal changes. This app uses it so loading account details depends only on sign-in status.' },
      { question: 'How do signals enable zoneless Angular?', answer: 'Because Angular knows which views read which signals, a signal change marks exactly those views for checking. There is no need for Zone.js to guess that something may have changed after every async task.' },
    ],
    pitfalls: [
      'Using effect() to copy one signal into another instead of using computed().',
      'Mutating an object held in a signal in place; set a new object so equality checks notice.',
      'Reading a signal without calling it, as in count instead of count(), which binds the function itself.',
    ],
    learnMore: { label: 'Signals guide', url: 'https://angular.dev/guide/signals' },
  },
  'typescript': {
    overview: 'TypeScript is a typed superset of JavaScript from Microsoft. It adds a structural static type system that is checked at compile time and erased at runtime, catching whole classes of bugs before the code runs and powering editor tooling such as autocompletion and refactoring.',
    concepts: [
      { term: 'Structural typing', detail: 'Types are compatible if their shapes match, regardless of names. An object with the right properties satisfies an interface without declaring that it implements it.' },
      { term: 'Unions and narrowing', detail: 'A union such as \'up\' | \'down\' | \'checking\' lists the allowed values; typeof, instanceof, in and discriminant checks narrow it inside a branch.' },
      { term: 'Generics', detail: 'Type parameters let functions and classes work over many types while keeping them precise, as in Array<T> or a typed HTTP get<User>().' },
      { term: 'Utility types', detail: 'Partial, Required, Pick, Omit, Record, ReturnType and Readonly derive new types from existing ones.' },
      { term: 'unknown versus any', detail: 'any turns off checking; unknown forces you to narrow before use, so it is the safe type for untrusted data.' },
    ],
    questions: [
      { question: 'What is the difference between an interface and a type alias?', answer: 'Both describe object shapes. Interfaces can be reopened and merged and read well for public contracts; type aliases can also name unions, tuples, primitives and mapped or conditional types. Pick one convention and be consistent.' },
      { question: 'What does strict mode enable?', answer: 'strictNullChecks, noImplicitAny, strictFunctionTypes, strictPropertyInitialization and others. strictNullChecks matters most: null and undefined are no longer assignable to every type.' },
      { question: 'Does TypeScript validate data at runtime?', answer: 'No. Types are erased when compiled, so API responses must be validated at runtime (for example with a schema library) if you cannot trust them.' },
      { question: 'What is a discriminated union?', answer: 'A union of object types that share a literal property, such as kind: \'circle\' | \'square\'. Switching on that property narrows to the exact type, and a never check makes the switch exhaustive.' },
    ],
    pitfalls: [
      'Reaching for any or the non-null assertion (!) to silence errors instead of fixing the types.',
      'Assuming a type assertion (as User) converts or checks the value; it only tells the compiler to trust you.',
      'Confusing optional properties (x?: T) with properties of type T | undefined.',
    ],
    learnMore: { label: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
  },
  'rxjs': {
    overview: 'RxJS is a library for composing asynchronous and event-based programs with observables: lazy streams of values over time. Operators transform, combine and control those streams declaratively, which is why Angular\'s HttpClient, router events and forms expose observables.',
    concepts: [
      { term: 'Observable, Observer, Subscription', detail: 'An observable does nothing until subscribed. The observer receives next, error and complete notifications; the subscription lets you unsubscribe.' },
      { term: 'Cold versus hot', detail: 'A cold observable, such as an HTTP call, starts fresh work for each subscriber. A hot one, such as a Subject or DOM events, shares one source among subscribers.' },
      { term: 'Higher-order mapping', detail: 'switchMap cancels the previous inner observable (ideal for search), mergeMap runs them concurrently, concatMap queues them in order, and exhaustMap ignores new ones while busy (ideal for submit buttons).' },
      { term: 'Subjects', detail: 'Subject multicasts to subscribers; BehaviorSubject holds a current value; ReplaySubject replays past values to late subscribers.' },
      { term: 'Sharing', detail: 'shareReplay and share turn a cold source hot so that several subscribers do not trigger duplicate HTTP requests.' },
    ],
    questions: [
      { question: 'How do switchMap, mergeMap, concatMap and exhaustMap differ?', answer: 'All map each value to an inner observable. switchMap keeps only the latest, mergeMap keeps all in parallel, concatMap runs them one after another, and exhaustMap drops new values until the current inner completes.' },
      { question: 'How do you avoid memory leaks with subscriptions?', answer: 'Let the async pipe or toSignal manage them, use takeUntilDestroyed() in components, or use operators like take(1) and first() for one-shot values. HTTP observables complete on their own.' },
      { question: 'How would you implement a typeahead search?', answer: 'Take valueChanges, then debounceTime(300), distinctUntilChanged(), filter short terms, and switchMap to the HTTP call so stale requests are cancelled. Use catchError inside the switchMap so one failure does not kill the stream.' },
      { question: 'How would you poll an endpoint every 30 seconds?', answer: 'timer(0, 30000).pipe(switchMap(() => http.get(url)), ...), handling errors inside the inner observable so polling continues. This app\'s API status check works this way.' },
    ],
    pitfalls: [
      'Nesting subscribe calls instead of using a flattening operator.',
      'Putting catchError on the outer stream, which completes it after the first error.',
      'Subscribing to a cold HTTP observable several times and making several requests.',
    ],
    learnMore: { label: 'rxjs.dev', url: 'https://rxjs.dev/guide/overview' },
  },
  'sass': {
    overview: 'Sass is a CSS preprocessor that adds variables, nesting, mixins, functions and modules to CSS, then compiles to plain CSS. Its SCSS syntax is a superset of CSS, so every CSS file is valid SCSS. Angular Material\'s theming API is written in Sass.',
    concepts: [
      { term: '@use and @forward', detail: 'The module system that replaced @import. @use loads a file once with a namespace, as in mat.theme(), avoiding global name collisions.' },
      { term: 'Mixins and functions', detail: '@mixin emits reusable blocks of declarations via @include; @function computes and returns values.' },
      { term: 'Sass variables versus CSS custom properties', detail: 'Sass $variables exist only at compile time; CSS --variables exist in the browser, cascade and can change at runtime, which is how a theme can switch without recompiling.' },
      { term: 'Nesting and &', detail: 'Selectors nest to mirror structure, and & refers to the parent selector for modifiers and states such as &:hover.' },
    ],
    questions: [
      { question: 'Why did Sass deprecate @import?', answer: '@import made everything global, loaded files repeatedly and made it hard to tell where names came from. @use namespaces members and loads each module once.' },
      { question: 'When do you use a Sass variable versus a CSS custom property?', answer: 'Sass variables for build-time constants and calculations; CSS custom properties for anything that changes at runtime, such as themes, or must be read by components.' },
      { question: 'How do Angular component styles stay scoped?', answer: 'With the default emulated view encapsulation, Angular adds unique attributes to a component\'s elements and rewrites its selectors to match, so styles do not leak out. :host targets the component element itself.' },
    ],
    pitfalls: [
      'Deep nesting that produces long, over-specific selectors.',
      'Expecting a Sass variable to change at runtime.',
      'Using ::ng-deep to reach into child components, which is deprecated and leaks styles.',
    ],
    learnMore: { label: 'sass-lang.com', url: 'https://sass-lang.com/guide/' },
  },
  'svg': {
    overview: 'Scalable Vector Graphics is an XML-based format for two-dimensional vector images. Shapes are described mathematically, so they stay sharp at any size, and inline SVG elements are part of the DOM, so CSS and JavaScript can style and animate them.',
    concepts: [
      { term: 'viewBox', detail: 'Defines the internal coordinate system (min-x, min-y, width, height) that is scaled to the element\'s rendered size, which is what makes SVG resolution independent.' },
      { term: 'Basic shapes and path', detail: 'rect, circle, line and polygon cover simple shapes; path draws anything with commands such as M (move), L (line), C (curve) and Z (close).' },
      { term: 'currentColor', detail: 'Using fill or stroke="currentColor" makes the graphic inherit the CSS text colour, so icons follow the theme.' },
      { term: 'Inline versus img', detail: 'An <img src="x.svg"> is isolated from page CSS and scripts; inline <svg> can be styled and scripted but adds to the DOM.' },
    ],
    questions: [
      { question: 'When would you choose SVG over PNG?', answer: 'For icons, logos, charts and illustrations that must scale crisply, be styled by CSS or stay small. Choose a raster format for photographs.' },
      { question: 'How do you make an SVG accessible?', answer: 'Give a meaningful graphic role="img" with a <title> or aria-label; mark a decorative one aria-hidden="true" and, in an img, alt="".' },
      { question: 'What are the security concerns with SVG?', answer: 'SVG can contain scripts and external references, so never inline untrusted SVG without sanitising it. Angular sanitises bound content by default.' },
    ],
    pitfalls: [
      'Omitting the viewBox, so the graphic does not scale.',
      'Hard-coding fill colours that ignore dark mode.',
      'Inlining very large SVGs repeatedly and bloating the DOM.',
    ],
    learnMore: { label: 'SVG on MDN', url: 'https://developer.mozilla.org/docs/Web/SVG' },
  },
  'material-icons-and-lato': {
    overview: 'Material Icons is Google\'s icon set delivered as a ligature font: typing the word home in that font renders the home icon. Lato is an open-source sans-serif typeface. Both load from Google Fonts with a stylesheet link, and web font loading has real effects on performance and layout stability.',
    concepts: [
      { term: 'Ligature icon fonts', detail: 'The font maps words to glyphs, so <mat-icon>menu</mat-icon> draws the menu icon and scales and colours like text.' },
      { term: 'font-display', detail: 'Controls what the browser shows while a font loads. swap shows fallback text immediately and swaps when ready; block hides text briefly.' },
      { term: 'FOUT, FOIT and layout shift', detail: 'A flash of unstyled or invisible text, and the layout shift when metrics change, affect Core Web Vitals. Preconnecting to the font host and matching fallback metrics reduce them.' },
      { term: 'Icon accessibility', detail: 'An icon font\'s ligature text is read aloud by screen readers, so decorative icons need aria-hidden and icon-only buttons need an aria-label.' },
    ],
    questions: [
      { question: 'Icon font versus SVG icons?', answer: 'Icon fonts are simple and style like text but load the whole set and can render the ligature word if the font fails. SVG icons are crisper, tree-shakable and individually accessible, at the cost of more markup.' },
      { question: 'How do you speed up web font loading?', answer: 'Preconnect to the font origin, load only the weights you use, use font-display: swap, subset the font, and self-host when it saves a connection.' },
    ],
    pitfalls: [
      'Icon-only buttons without an accessible name.',
      'Loading many unused weights and styles.',
      'Not planning for the font failing to load.',
    ],
    learnMore: { label: 'Google Fonts', url: 'https://fonts.google.com/icons' },
  },
  'vitest': {
    overview: 'Vitest is a fast unit test runner built on Vite, with a Jest-compatible API (describe, it, expect, vi.fn). Angular 21 makes it the default runner, replacing Karma and Jasmine. Tests run in Node against a simulated DOM such as jsdom, or in a real browser.',
    concepts: [
      { term: 'describe, it, expect', detail: 'Group tests with describe, write a case with it or test, and assert with expect matchers such as toBe, toEqual and toHaveBeenCalledWith.' },
      { term: 'Mocks and spies', detail: 'vi.fn() creates a mock function, vi.spyOn() wraps an existing method, and vi.mock() replaces a whole module.' },
      { term: 'TestBed', detail: 'Angular\'s testing module configures providers and creates components, so you can swap real services for fakes as this app does for AuthService.' },
      { term: 'Async testing', detail: 'await fixture.whenStable(), vi.waitFor() and fake timers (vi.useFakeTimers) control asynchronous behaviour deterministically.' },
    ],
    questions: [
      { question: 'What makes a good unit test?', answer: 'It is fast, isolated, deterministic and tests behaviour rather than implementation: arrange, act, assert, one reason to fail, with a name that describes the behaviour.' },
      { question: 'How do you test a component that calls an HTTP API?', answer: 'Either inject a fake service, or use provideHttpClientTesting with HttpTestingController to expect a request, flush a response, and verify there are no outstanding requests.' },
      { question: 'Mock, stub, spy or fake: what is the difference?', answer: 'A stub returns canned answers; a spy records calls; a mock is a stub with expectations about how it is called; a fake is a working lightweight implementation, such as an in-memory repository.' },
      { question: 'What is jsdom and what can it not do?', answer: 'A JavaScript implementation of the DOM for Node. It has no layout engine, so sizes, scrolling and real rendering do not work; those need browser mode or end-to-end tests.' },
    ],
    pitfalls: [
      'Tests that depend on each other\'s order or shared state; reset in beforeEach.',
      'Asserting on private implementation details so refactors break tests.',
      'Forgetting to await async work, so a test passes before the assertion runs.',
    ],
    learnMore: { label: 'vitest.dev', url: 'https://vitest.dev/guide/' },
  },
  'angular-cli': {
    overview: 'The Angular CLI (ng) scaffolds, builds, serves, tests and updates Angular projects. Its application builder uses esbuild for production bundles and Vite for the development server, configured through angular.json.',
    concepts: [
      { term: 'angular.json', detail: 'Workspace configuration: projects, build targets, configurations (development, production), budgets, assets and file replacements.' },
      { term: 'ng generate and schematics', detail: 'Schematics generate and transform code, such as components or Material themes, and ng update runs migrations when upgrading.' },
      { term: 'Production optimisations', detail: 'Ahead-of-time compilation, tree shaking, minification, hashed file names for cache busting, and bundle-size budgets that fail the build when exceeded.' },
      { term: 'Dev server proxy', detail: 'A proxy configuration forwards /api calls from ng serve to a local backend, avoiding CORS during development.' },
    ],
    questions: [
      { question: 'What is AOT compilation and why does it matter?', answer: 'Ahead-of-time compilation turns templates into JavaScript at build time. Apps start faster, the compiler is not shipped, and template errors surface at build time.' },
      { question: 'How do you upgrade an Angular app across major versions?', answer: 'Go one major version at a time with ng update @angular/core @angular/cli, follow the update guide at angular.dev/update-guide, and let the automatic migrations rewrite code.' },
      { question: 'How do you handle environment-specific configuration?', answer: 'File replacements per build configuration, or a runtime config file fetched at start-up so one build can deploy to several environments.' },
    ],
    pitfalls: [
      'Raising bundle budgets instead of investigating why the bundle grew.',
      'Putting secrets in environment files; anything in the front-end bundle is public.',
      'Skipping versions when running ng update.',
    ],
    learnMore: { label: 'Angular CLI reference', url: 'https://angular.dev/tools/cli' },
  },
  'nodejs-and-npm': {
    overview: 'Node.js runs JavaScript outside the browser on Google\'s V8 engine, with a single-threaded, non-blocking event loop. npm is its package manager and registry; package.json declares dependencies and scripts, and package-lock.json pins the exact tree.',
    concepts: [
      { term: 'Event loop', detail: 'One thread runs JavaScript while I/O happens asynchronously. Callbacks, promises (the microtask queue) and timers are scheduled in phases, so CPU-heavy work blocks everything.' },
      { term: 'Semantic versioning ranges', detail: '^1.2.3 allows minor and patch updates, ~1.2.3 only patches, and an exact version pins. MAJOR.MINOR.PATCH signals breaking, feature and fix changes.' },
      { term: 'npm install versus npm ci', detail: 'npm install resolves ranges and may update the lockfile; npm ci installs exactly what the lockfile says from a clean slate, which is what CI should use.' },
      { term: 'dependencies versus devDependencies', detail: 'Runtime packages versus build and test tools. For a bundled front end the distinction matters less, but it documents intent.' },
    ],
    questions: [
      { question: 'Why commit package-lock.json?', answer: 'So every developer and CI build installs the same dependency tree, making builds reproducible and changes reviewable.' },
      { question: 'How does Node handle concurrency with one thread?', answer: 'It offloads I/O to the operating system and libuv\'s thread pool and processes completions through the event loop. For CPU-bound work you use worker threads or separate processes.' },
      { question: 'How do you deal with vulnerable dependencies?', answer: 'Run npm audit, update to patched versions, use overrides for transitive dependencies when needed, and automate updates with tools such as Dependabot.' },
    ],
    pitfalls: [
      'Using npm install in CI, which can drift from the lockfile.',
      'Running npm audit fix --force blindly, which can apply breaking major upgrades.',
      'Blocking the event loop with synchronous work in a server.',
    ],
    learnMore: { label: 'nodejs.org', url: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs' },
  },
};
