# Contributing to DST_FIGMA

First off, thank you for considering contributing to DST_FIGMA! It's people like you that make this platform such a great tool for DST investors. Whether you're fixing bugs, adding features, or improving documentation, your contributions are welcome.

This document provides guidelines and steps for contributing. Following these guidelines helps communicate that you respect the time of the developers managing and developing this open source project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pre-push Checklist](#pre-push-checklist)
- [Pull Request Process](#pull-request-process)
- [Your First Contribution](#your-first-contribution)

## Code of Conduct

This project and everyone participating in it is governed by the DST_FIGMA Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **pnpm** - Run `npm install -g pnpm` to install
- **PostgreSQL** - Either:
  - Local installation - [Download](https://www.postgresql.org/download/)
  - [Neon Database](https://neon.tech/) account (for serverless PostgreSQL)

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork locally**
   ```bash
   git clone https://github.com/YOUR-USERNAME/DST_FIGMA.git
   cd DST_FIGMA
   ```
3. **Add the original repo as a remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/DST_FIGMA.git
   ```
4. **Install dependencies**
   ```bash
   pnpm install
   ```
5. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Fill in the required environment variables
6. **Start the development server**
   ```bash
   pnpm dev
   ```
7. **Visit `http://localhost:5173` in your browser**

## Development Workflow

1. Create a new branch for your feature or bugfix
2. Make your changes
3. Run checks (TypeScript, linting)
4. Commit your changes following the [commit message guidelines](#commit-message-guidelines)
5. Push your branch and submit a pull request
6. Wait for review and address any feedback

## Branch Naming Convention

Use the following formats for branch names:

- For new features: `feat/<short-description>`
- For bug fixes: `fix/<short-description>`
- For documentation, chores, etc.: `chore/<description>`

Examples:
```
feat/investor-dashboard
fix/login-validation
chore/update-readme
```

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages:

```
<type>: <description>

[optional body]

[optional footer]
```

Types include:
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring (no functional changes)
- **perf**: Performance improvements
- **test**: Adding or modifying tests
- **chore**: Changes to the build process, tooling, etc.

Examples:
```
feat: add investor accreditation verification
fix: resolve issue with login form validation
docs: update API documentation
```

## Pre-push Checklist

Before pushing your changes, make sure to:

1. **Run TypeScript check**
   ```bash
   pnpm check
   ```
2. **Run linting**
   ```bash
   pnpm lint
   ```
3. **Ensure tests pass** (Note: Testing infrastructure is currently being developed)
   ```bash
   # When available:
   # pnpm test
   ```

## Pull Request Process

1. **Fill out the PR template** completely, including:
   - Clear description of changes
   - Screenshots or GIFs demonstrating UI changes
   - Link to related issue(s)
   - Checklist confirmation that you've tested edge cases
2. **Update documentation** if necessary
3. **Ensure CI passes** - GitHub Actions will automatically run checks
4. **Request review** from maintainers
5. **Address feedback** and make requested changes

Note: GitHub Actions will automatically run TypeScript checks and ESLint on your pull request. Please make sure these pass before requesting a review.

## Your First Contribution

New to open source? No worries! Here are some resources to help you get started:

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [First Contributions](https://github.com/firstcontributions/first-contributions)

Not sure where to start? Look for issues labeled `good first issue` or `help wanted`. These are specifically curated for new contributors!

Don't hesitate to ask questions. Everyone is a beginner at first, and learning is a continuous process. We're here to help you succeed!

---

Thank you for contributing to DST_FIGMA! Your efforts help make DST investing more accessible and transparent for everyone.