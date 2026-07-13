# Security Policy

## Supported Versions

SpeakFlow provides security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of SpeakFlow seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, report them via email:

**Security Contact:** [security@speakflow.app](mailto:security@speakflow.app) *(placeholder)*

Include the following in your report:

1. **Description** — A clear description of the vulnerability
2. **Impact** — What an attacker could achieve by exploiting it
3. **Steps to reproduce** — Detailed steps to demonstrate the issue
4. **Affected component** — Frontend, API, database, or deployment configuration
5. **Proof of concept** — If available (keep it minimal and non-destructive)
6. **Your contact information** — So we can follow up with questions

### Responsible Disclosure

We ask that you:

- **Give us reasonable time** to investigate and remediate before public disclosure (typically 90 days)
- **Do not exploit** the vulnerability beyond what is necessary to demonstrate it
- **Do not access, modify, or delete** data belonging to other users
- **Do not perform** denial-of-service attacks or social engineering
- **Act in good faith** to avoid privacy violations and service disruption

## Security Response Expectations

| Stage | Timeline |
|-------|----------|
| **Acknowledgment** | Within 48 hours of report receipt |
| **Initial assessment** | Within 5 business days |
| **Status update** | Every 7 days until resolved |
| **Fix deployment** | Depends on severity (see below) |
| **Public disclosure** | After fix is deployed and users are notified |

### Severity Levels

| Severity | Description | Target Response |
|----------|-------------|-----------------|
| **Critical** | Remote code execution, authentication bypass, data breach | 24–72 hours |
| **High** | Privilege escalation, significant data exposure | 7 days |
| **Medium** | CSRF, XSS with limited impact, information disclosure | 30 days |
| **Low** | Minor information leaks, best-practice violations | Next release cycle |

## Security Best Practices for Self-Hosting

If you deploy SpeakFlow yourself:

- **Never commit** `.env` files or API keys to version control
- **Use HTTPS** in production for all frontend and API traffic
- **Restrict database access** to trusted networks only
- **Rotate API keys** regularly and use environment-specific credentials
- **Keep dependencies updated** — run `npm audit` periodically
- **Enable CORS** only for trusted origins in production
- **Use strong PostgreSQL credentials** and limit connection privileges

## Recognition

We appreciate the security research community. With your permission, we will acknowledge responsible disclosures in our release notes and CHANGELOG.

Thank you for helping keep SpeakFlow and its users safe.
