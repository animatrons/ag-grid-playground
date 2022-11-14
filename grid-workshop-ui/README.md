# GridWork

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Generate Feature Store Schematic Cmd:

- Generate Store:
```
ng generate store <StateName> -m many-grids/feature/<feature-dir>/<feature-module> --state-path many-grids/feature/<feature-dir>/store/
```
- Generates feature set:
```
ng generate feature many-grids/feature/<feature-dir>/store/<feature-name> -g -m many-grids/feature/<feature-dir>/<feature.module> -r ../../../../store/reducers/index.ts -a true --skip-tests
```

