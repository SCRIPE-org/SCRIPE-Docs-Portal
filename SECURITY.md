# Security Policy

The **SCRIPE Platform** engineering team is dedicated to delivering sports operations infrastructure that adheres to enterprise-grade security standards. This policy outlines our vulnerability disclosure process, supported versions, and expectations for responsible reporting.

---

## 1. Supported Versions

We provide active security maintenance and rapid patch releases for the current release stream of the documentation portal and related platform assets:

| Version | Supported | Status | Release Date |
|:---|:---:|:---|:---|
| `v2.4.x` (Current LTS) | :white_check_mark: | Active Security Maintenance | October 2026 |
| `v2.3.x` | :white_check_mark: | Critical Security Fixes Only | August 2026 |
| `< v2.3` | :x: | End of Life (EOL) | Prior Releases |

If you are using an older version, we strongly recommend upgrading to the latest release to ensure all security patches are applied.

---

## 2. Reporting a Vulnerability

If you discover a security vulnerability, flaw, or data leakage in `SCRIPE-Docs-Portal` or the documentation content, **do NOT create a public GitHub issue, pull request, or discussion**.

Please report all security vulnerabilities privately through one of the following channels:

1. **GitHub Private Vulnerability Reporting:**
   Navigate to the [Security Advisory](https://github.com/SCRIPE-org/SCRIPE-Docs-Portal/security/advisories/new) tab of this repository and submit a draft advisory.
2. **Security Team Direct Email:**
   Send an encrypted email to `security@scripe.org` or `seif.moustafa516@gmail.com`.

### What to Include in Your Report

To help us validate and triage your report quickly, please include:
- A clear description of the vulnerability and its potential impact.
- Affected URL, route, component, or file path.
- Step-by-step reproduction instructions or a minimal Proof of Concept (PoC).
- Screenshots, HTTP request/response dumps, or command outputs if applicable.
- Any suggested remediation or patches, if known.

---

## 3. Vulnerability Response Timeline & SLA

We follow a strict, coordinated vulnerability management lifecycle:

- **Initial Acknowledgment:** Within **24 hours** of submission.
- **Triage & Reproducibility Assessment:** Within **72 hours**.
- **Remediation & Patch Target:** Within **7 business days** for critical severity (`CVSS >= 9.0`), and **14 business days** for high/medium severity.
- **Public Disclosure:** Coordinated with the reporter after the fix is merged and released to production.

---

## 4. Documentation Content Invariants

As an architectural and commercial documentation portal:
- **Zero Secrets Policy:** Never commit secrets, real connection strings, private API keys, JWT signing keys, or database credentials. All examples must use explicit dummy placeholders (e.g. `CHANGE-THIS-PER-DEPLOYMENT`, `00000000-0000-0000-0000-000000000000`, `user@example.com`).
- **Sanitized Configurations:** All code snippets must adhere to defense-in-depth principles (PBAC authorization, input validation, SQL injection prevention, and tenant isolation).
- **Automated Secret Scanning:** All commits are scanned for accidentally committed credentials and tokens prior to deployment.

---

## 5. Safe Harbor

If you conduct vulnerability research in good faith and in compliance with this policy:
- We consider your research authorized and will not initiate legal action against you.
- We will work cooperatively with you to understand and resolve the issue promptly.
- We will acknowledge your contribution in our security release notes (unless you prefer anonymity).

We ask that you:
- Avoid privacy violations, destruction of data, and interruption or degradation of our services (e.g., DoS/DDoS attacks).
- Give us reasonable time to correct the issue before disclosing it publicly.
