# CI/CD Preverjanje Aplikacij — Seminar Report

Author: Benjamin Salkic

Date: 2025-11-15

---

## Abstract

This report documents a compact demonstration of automated CI/CD security
checks for applications. The project contains a minimal Node.js web
application, GitHub Actions workflows for static (CodeQL) and dynamic (OWASP
ZAP) testing, a Dependabot configuration, and a GitLab CI include for SAST and
DAST. We describe the implementation, verification steps, findings and
remediation, and give recommendations for integrating these checks into a
development pipeline.

## Introduction

The seminar assignment requires demonstrating the following capabilities:

- Iskanje znanih varnostnih lukenj (dependency scanning)
- Statično preverjanje kode (SAST)
- Dinamično testiranje na testnem okolju (DAST)
- Automatizacije procesov (CI/CD)
- Prikaz rezultatov (reporting)

This repository was created to satisfy those requirements with a small,
reproducible scaffold you can push to GitHub or GitLab to run the provided
workflows.

## Background

Short descriptions of the techniques used:

- Dependency scanning checks third-party packages against vulnerability
  advisories.
- SAST inspects source code for vulnerable patterns without executing the
  application.
- DAST interacts with a running application to reveal runtime issues.

## Implementation

Files added to the repository:

- `index.js` — minimal Express app (two endpoints: `/` and `/vulnerable`).
- `package.json` — declares `express` and `lodash` dependencies.
- `.github/dependabot.yml` — Dependabot configuration.
- `.github/workflows/codeql.yml` — CodeQL SAST workflow.
- `.github/workflows/dast-zap.yml` — OWASP ZAP DAST workflow.
- `.gitlab-ci.yml` — includes GitLab SAST/DAST templates.
- `README.md` and `REPORT.md` — documentation.

The app initially used `lodash@4.17.20` to demonstrate detection; it was
upgraded to `4.17.21` to remove the advisory as part of the verification.

## CI/CD Security Automation

### Dependabot

Dependabot is configured to run weekly and open PRs to update npm
dependencies.

### CodeQL (SAST)

The CodeQL workflow initializes a database, builds the project, and runs a
JavaScript analysis. Results appear in GitHub's Code scanning interface.

### OWASP ZAP (DAST)

The DAST workflow starts the app and runs a full ZAP scan against
`http://localhost:3000`. Reports are uploaded as workflow artifacts.

### GitLab CI

The `.gitlab-ci.yml` includes `Security/SAST.gitlab-ci.yml` and
`Security/DAST.gitlab-ci.yml` to enable equivalent scans in GitLab.

## Verification and Results

Local commands executed to verify the demo:

```
npm install
npm audit --json
nohup node index.js > /tmp/seminar_app.log 2>&1 &
curl http://localhost:3000
curl http://localhost:3000/vulnerable
```

Results summary:

- The app served the expected responses.
- Initial `npm audit` showed a high severity advisory for `lodash` (<=
  4.17.20).
- After updating to `lodash@4.17.21` and running `npm install`, `npm audit`
  showed zero vulnerabilities.

## Discussion

Automated scans provide broad coverage but require triage and workflow
integration. Practical recommendations:

- Gate merges for high/critical findings where appropriate.
- Automate patch/minor upgrades and have reviewers handle major bumps.
- Run DAST against an isolated test environment to avoid impacting
  production data.

## Conclusion

The demo repository implements the required checks and shows a complete
detect-and-remediate cycle for a dependency advisory. It is a suitable
starting point for classroom demos and basic CI/CD security pipelines.

## References

- GitLab SAST: https://docs.gitlab.com/ee/user/application_security/sast/
- GitHub Dependabot quickstart: https://docs.github.com/en/code-security/getting-started/dependabot/quickstart-guide
