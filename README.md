CI/CD & Application Security — Seminar demo

This repository is a minimal seminar demo for "CI/CD preverjanje aplikacij / Preverjanje varnosti aplikacij". It demonstrates the checklist items below and provides example GitHub and GitLab automation.

Checklist 
- Iskanje znanih varnostnih lukenj (dependency scanning via Dependabot / GitLab Dependency Scanning)
- Statično preverjanje kode (SAST) via GitHub CodeQL and GitLab SAST templates
- Dinamično testiranje na testnem okolju (DAST) via OWASP ZAP GitHub Action and GitLab DAST template
- Automatizacije procesov (GitHub Actions workflows, Dependabot config, GitLab CI include)
- Prikaz rezultatov (GitHub Code scanning & Security tab; GitLab Security Dashboard; SARIF upload via CodeQL)

References
- GitLab SAST: https://docs.gitlab.com/ee/user/application_security/sast/
- GitHub Dependabot quickstart: https://docs.github.com/en/code-security/getting-started/dependabot/quickstart-guide

Files added
- `index.js` — minimal Express app used as a demo target for DAST
- `package.json` — includes a deliberately out-of-date dependency to demonstrate Dependabot
- `.github/dependabot.yml` — Dependabot configuration for npm
- `.github/workflows/codeql.yml` — CodeQL SAST workflow
- `.github/workflows/dast-zap.yml` — OWASP ZAP DAST workflow (starts app and scans it)
- `.gitlab-ci.yml` — GitLab CI include for SAST and DAST templates

How this maps to your assignment

1) Iskanje znanih varnostnih lukenj
  - Dependabot will open PRs for vulnerable/outdated dependencies (see `.github/dependabot.yml`).
  - On GitLab, enabling Dependency Scanning will find known vulnerable packages.

2) Statično preverjanje kode
  - GitHub: CodeQL (`.github/workflows/codeql.yml`) runs on pushes/PRs and uploads results to GitHub Code scanning.
  - GitLab: `.gitlab-ci.yml` includes `Security/SAST.gitlab-ci.yml` template.

3) Dinamično testiranje na testnem okolju
  - GitHub: OWASP ZAP action starts the app in the workflow and runs a full scan against `http://localhost:3000`.
  - GitLab: includes DAST template `Security/DAST.gitlab-ci.yml`.

4) Automatizacije procesov
  - All workflows run automatically on pushes and pull/merge requests.

5) Prikaz rezultatov
  - GitHub: CodeQL results appear under the repository's Security > Code scanning alerts and Dependabot PRs appear in the repo.
  - GitLab: pipeline job artifacts and Security Dashboard show SAST/DAST findings.

Quick local demo
1. Install dependencies: `npm ci`
2. Start app: `npm start` (listens on port 3000)
3. Run a local dynamic scan with ZAP (you can use the ZAP desktop app and scan `http://localhost:3000`).

Notes and next steps
- This is a minimal scaffold. For production use, add authentication scanning, secret detection, custom rules, and gating policies.
- For a live demo, push this repo to GitHub and enable Actions & Code scanning; push to GitLab to try GitLab templates.

---
Created as a teaching/demo scaffold for a seminar.
