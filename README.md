# Challenge Automation 2026 - Cypress + JUnit


Repo: https://github.com/maestrobooz-boop/challenge-2026Crwdr


Cypress es JavaScript y JUnit es Java: este proyecto usa **JUnit 5 (Maven) como orquestador** que ejecuta los specs de **Cypress** por CLI, valida el resultado y genera el reporte **XML JUnit** (Surefire).

- Casos de prueba: [`docs/casos-de-prueba.pdf`](docs/casos-de-prueba.pdf)
- Web: https://www.saucedemo.com/ · API: `GET https://www.mercadolibre.com.ar/menu/departments`

## Requisitos
Java 17+, Maven 3.9+, Node 18+ y Google Chrome.

## Instalación
```bash
cd cypress-tests && npm install && cd ..
```

## Ejecución
```bash
mvn test                              # Chrome, sin ventana
mvn test -Dheaded=true                # ver el navegador en vivo
mvn test -Dbrowser=firefox            # otro navegador (requiere Firefox instalado)
```

En modo `-Dheaded=true` cada ventana queda abierta 4 s al terminar su spec. Se cambia con `-DholdMs=<milisegundos>` (p. ej. `-DholdMs=2000`).

## Resultados
- Reporte XML JUnit: `target/surefire-reports/TEST-*.xml` (uno por clase)
- Capturas de fallos: `target/screenshots/` (la ruta también queda en el XML, en `system-out`)
- XML JUnit por spec de Cypress: `target/cypress-junit/`

`IntentionalFailureTest` falla **a propósito** (punto 4), por eso la ejecución muestra 1 test fallido.
