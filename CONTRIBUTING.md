# Contributing to SpeakFlow

Thank you for your interest in contributing to **SpeakFlow**! This document provides guidelines and instructions for contributing to the project.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Project Setup](#project-setup)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Commit Message Conventions](#commit-message-conventions)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)
- [Code Review Expectations](#code-review-expectations)

---

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [support@speakflow.app](mailto:support@speakflow.app).

---

## Project Setup

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later
- PostgreSQL 14+ (for API development)
- Git

### Local Development

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/speakflow.git
cd speakflow

# 2. Install frontend dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Set up the API
cd api
npm install
cp .env.example .env
# Configure DATABASE_URL, AI_API_KEY, AI_ENDPOINT, and AI_MODEL

# 5. Initialize the database
npx prisma generate
npx prisma db push

# 6. Start development servers
# Terminal 1 (from project root)
npm run dev

# Terminal 2 (from api/)
cd api && npm run dev
```

### Verify Your Setup

- Frontend: `http://localhost:5173`
- API health: `http://localhost:3000/api/scripts`

---

## Coding Standards

### TypeScript

- Use **strict TypeScript** — avoid `any` unless absolutely necessary.
- Define shared types in `src/types.ts` (frontend) or `api/src/types/` (backend).
- Prefer `interface` for object shapes and `type` for unions and aliases.

### React

- Use **functional components** with hooks.
- Keep components focused — extract reusable logic into custom hooks.
- Co-locate view components in `src/components/views/`.
- Use the `cn()` utility for conditional Tailwind classes.

### Styling

- Use **Tailwind CSS** utility classes — avoid inline styles except for dynamic values.
- Follow the existing design token system in `src/index.css`.
- Maintain consistency with the glassmorphism UI patterns.
- Ensure both light and dark themes render correctly.

### API

- Follow RESTful conventions for route naming.
- Return consistent JSON response shapes.
- Handle errors with appropriate HTTP status codes.
- Keep business logic in services, not controllers.

### General

- Run `npm run lint` before submitting a PR.
- Do not commit secrets, `.env` files, or `node_modules/`.
- Keep PRs focused — one feature or fix per pull request.
- Add comments only for non-obvious business logic.

---

## Pull Request Process

1. **Fork** the repository and create a branch from `main`.
2. **Make your changes** following the coding standards above.
3. **Test locally** — verify both frontend and API work as expected.
4. **Run the linter** — `npm run lint` (frontend) must pass.
5. **Update documentation** if your change affects setup, features, or API behavior.
6. **Push** your branch and open a Pull Request against `main`.
7. **Fill out the PR template** with a clear description, screenshots (for UI changes), and a test plan.
8. **Address review feedback** promptly and respectfully.

### PR Checklist

- [ ] Code follows project conventions and passes linting
- [ ] Changes are tested locally (frontend + API if applicable)
- [ ] Documentation updated (README, docs/, or inline comments)
- [ ] No secrets or environment files committed
- [ ] Commit messages follow the convention below
- [ ] PR description explains the **why**, not just the **what**

---

## Commit Message Conventions

We follow a simplified [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, missing semicolons, etc. (no code change) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `chore` | Build process, dependencies, tooling |

### Examples

```
feat(teleprompter): add mirror mode toggle

fix(api): handle missing topic in script creation endpoint

docs: update deployment guide with Vercel env vars

refactor(ui): extract Button variants into shared component
```

---

## Issue Reporting

### Bug Reports

When reporting a bug, please include:

1. **Description** — Clear summary of the issue
2. **Steps to reproduce** — Numbered steps to trigger the bug
3. **Expected behavior** — What should happen
4. **Actual behavior** — What actually happens
5. **Environment** — OS, browser, Node.js version
6. **Screenshots** — If applicable
7. **Console errors** — Any relevant browser or server logs

Use the [Bug Report template](https://github.com/okaadyx/speakflow/issues/new) when available.

### Security Issues

**Do not** open public issues for security vulnerabilities. See [SECURITY.md](SECURITY.md) for responsible disclosure instructions.

---

## Feature Requests

We welcome feature ideas! When proposing a feature:

1. **Search existing issues** to avoid duplicates.
2. **Describe the problem** — What user need does this address?
3. **Propose a solution** — How should it work?
4. **Consider alternatives** — What other approaches did you consider?
5. **Provide context** — Mockups, wireframes, or examples are helpful.

Feature requests that align with the [project roadmap](README.md#roadmap) are prioritized.

---

## Code Review Expectations

### For Contributors

- Be open to feedback — reviews improve code quality for everyone.
- Respond to comments within a reasonable timeframe.
- Keep discussions constructive and focused on the code.
- Squash fixup commits before merge if requested.

### For Reviewers

- Review within 3–5 business days when possible.
- Provide specific, actionable feedback.
- Approve when the code is correct, tested, and documented.
- Use suggestion comments for minor fixes.

---

## Questions?

- Open a [GitHub Discussion](https://github.com/okaadyx/speakflow/discussions) for general questions.
- Email [support@speakflow.app](mailto:support@speakflow.app) for other inquiries.

Thank you for helping make SpeakFlow better! 🎤
