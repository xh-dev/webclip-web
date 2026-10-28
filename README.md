# Webclip2

Angular web client for [webclip2-server](https://hub.docker.com/r/xethhung/webclip2-server), a temporary in-memory "clipboard over the web".

## Features

- **Create**: post a message and receive a 6-digit code and a 3-letter secret.
- **Retrieve**: enter the code and secret to read the message once; the server then deletes it.
  - Wrong secrets are limited by the server (3 attempts), and messages expire after 30 minutes.
- **Copy helpers**: copy the code, the secret, the message, or a **Copy URL**.
  - Copy URL copies a direct API link, e.g. `http://localhost:8080/msg/retrieve?code=123456&secret=???`. Replace `???` with the real secret.
- The UI link `/get?id=123456&secret=ABC` pre-fills the retrieve form.
- Responsive, mobile-friendly layout.

## Configuration

The server base URL is set in `src/environments/environment.ts` (dev) and `environment.prod.ts` (prod) via `host`, default `http://localhost:8080`.

The server API used: `POST /msg/create` (`{msg}` -> `{id, secret}`), `POST /msg/retrieve` (`{code, secret}` -> `{msg}`), `GET /version`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
