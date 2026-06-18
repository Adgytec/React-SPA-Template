# AGENTS.md

## Purpose

This repository contains a React frontend application built using shared internal libraries, React Aria, Material 3 design tokens, and TanStack tooling.

When making changes, prioritize consistency with existing project patterns, reuse existing abstractions, and consult available documentation before introducing new implementations.

---

# Requirements Gathering

## Assumptions

* Never assume requirements.
* Never assume desired UX behavior.
* Never assume API contracts.
* Never assume translation content.
* Never assume styling requirements.
* Never assume accessibility requirements.
* Never assume business logic.

## Clarification

* When requirements are unclear, ask clarifying questions before making changes.
* If multiple valid implementation approaches exist, present the options and request guidance instead of arbitrarily choosing one.
* Do not infer missing requirements from similar code unless explicitly instructed.
* Prefer asking for clarification over introducing behavior that was not requested.
* If documentation and implementation disagree, ask which should be treated as the source of truth.

---

# Technology Stack

## Core

* React (latest)
* TypeScript
* TanStack Router
* TanStack Query

## Internationalization

* react-i18next

## UI

* react-aria
* react-aria-components

## Validation

* zod

## Hooks

* usehooks-ts

## Animations

* react-transition-group

## Icons

* lucide-react
* Shared `Icon` component from `@adgytec/adgytec-web-ui-components`

---

# Internal Libraries

The application relies heavily on shared internal packages.

## UI Components

Package:

```txt
@adgytec/adgytec-web-ui-components
```

Repository:

```txt
https://github.com/Adgytec/adgytec-web-ui-components
```

## Utilities

Package:

```txt
@adgytec/adgytec-web-utils
```

Repository:

```txt
https://github.com/Adgytec/adgytec-web-utils
```

---

# Documentation

Before implementing functionality:

1. Check whether the functionality already exists in internal libraries.
2. Review the relevant package documentation.
3. Review any `.md` files within the relevant package folders.
4. Follow documented patterns and APIs.

## Documentation Sources

* https://github.com/Adgytec/adgytec-web-ui-components
* https://github.com/Adgytec/adgytec-web-utils

Every folder within these repositories may contain documentation describing intended usage patterns.

---

# Design System

The application uses Material 3 based design tokens.

Token definitions are located in:

```txt
src/styles/core/
```

## Styling Rules

* Prefer existing design tokens over hardcoded values.
* Reuse existing color, typography, spacing, shape, elevation, and motion tokens.
* Follow existing Material 3 patterns.
* Avoid introducing arbitrary values when an existing token is available.
* Prefer CSS logical properties when applicable.

---

# Components

## Reuse Existing Components

Before creating new components:

1. Check `@adgytec/adgytec-web-ui-components`.
2. Check existing application components.
3. Review documentation.

Avoid duplicating functionality already available through shared libraries.

## React Aria

* Prefer existing React Aria patterns already used within the project.
* Follow accessibility patterns established by React Aria and existing project components.
* Reuse existing wrappers and abstractions when available.

---

# Icons

Preferred icon sources:

* Shared `Icon` component from `@adgytec/adgytec-web-ui-components`
* `lucide-react`

Follow existing project conventions when rendering icons.

---

# Internationalization

Translations are handled using:

```txt
react-i18next
```

## Translation Rules

* All user-facing text must be translatable.
* Do not hardcode user-visible strings.
* Follow existing namespace and key structures.
* Preserve interpolation syntax.
* Preserve formatting placeholders.
* Reuse existing translation keys whenever possible.

---

# Validation

Validation should use:

```txt
zod
```

## Guidelines

* Reuse existing schemas when available.
* Keep validation logic consistent with surrounding code.
* Avoid duplicating schemas.

---

# Routing

Routing is managed through:

```txt
TanStack Router
```

## Guidelines

* Follow existing route organization.
* Follow existing navigation patterns.
* Reuse route helpers and abstractions when available.

---

# Data Fetching

Data fetching is managed through:

```txt
TanStack Query
```

## Guidelines

* Follow existing query key conventions.
* Follow existing cache invalidation patterns.
* Follow existing loading and error handling patterns.
* Reuse established hooks whenever possible.

---

# General Development Guidelines

## Always

* Follow existing project architecture.
* Follow existing coding patterns.
* Reuse existing abstractions.
* Read documentation before implementing functionality.
* Keep changes focused on the requested task.
* Maintain consistency with surrounding code.
* Prefer extending existing solutions over introducing new patterns.

## Avoid

* Creating duplicate abstractions.
* Introducing new dependencies without justification.
* Refactoring unrelated code.
* Introducing alternative patterns when an established project pattern already exists.
* Making assumptions about intended behavior.

---

# Version Control

Do not perform version control operations unless explicitly requested.

This includes:

* git commit
* git push
* git pull
* git rebase
* git reset
* git stash
* branch operations
* tag operations
* force operations

Never assume permission for history-altering or destructive operations.

---

# Agent Expectations

Agents working in this repository should:

* prioritize consistency
* reuse shared libraries
* follow documented patterns
* ask questions instead of making assumptions
* maintain accessibility standards
* maintain i18n support
* follow Material 3 design token usage
* avoid unnecessary churn
* keep implementations aligned with existing project architecture
