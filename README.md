# BSA Talents

## ℹ️ General Info

This is the repository responsible for BSA Talents apps.

## 🏭 Applications

-   [Backend](./backend) — BSA Talents application backend.

    _To work properly, fill in the **`.env`** file. Use the **`.env.example`** file as an example._

-   [Frontend](./frontend) — BSA Talents application frontend.

    _To work properly, fill in the **`.env`** file. Use the **`.env.example`** file as an example._

-   [Mobile](./mobile) — BSA Talents application mobile.

    _To work properly, fill in the **`.env`** file. Use the **`.env.example`** file as an example._

-   [Shared](./shared) — BSA Talents application common modules for reuse.

## 🖍 Requirements

-   [NodeJS](https://nodejs.org/en/) (18.x.x);
-   [NPM](https://www.npmjs.com/) (8.x.x);
-   [PostgreSQL](https://www.postgresql.org/) (15.2)
-   run **`npx simple-git-hooks`** at the root of the project, before the start (it will set the [pre-commit hook](https://www.npmjs.com/package/simple-git-hooks) for any commits).

### 💽 DB Schema

```mermaid

erDiagram

  users {
      varchar id PK
      dateTime created_at
      dateTime updated_at
      citext email
      enum role "talent employer admin"
      text password_hash

   }

  user_details ||--|| users : user_id
  user_details ||..|o files : photo_id
  user_details ||..|o files : company_logo_id
  user_details ||..|o files : cv_id
  user_details {
      varchar id PK
      dateTime created_at
      dateTime updated_at
      varchar user_id FK
      boolean is_approved
      varchar denied_reason
      boolean is_hired
      varchar profile_name
      int salary_expectation
      int hired_salary
      varchar job_title
      varchar location
      decimal experience_years
      text[] employment_type
      text description
      varchar english_level
      text[] not_considered
      text[] preferred_languages
      text[] project_links
      varchar photo_id FK
      varchar full_name
      varchar phone
      varchar linkedin_link
      varchar company_name
      varchar company_logo_id FK
      varchar company_website
      varchar employer_position
      varchar cv_id FK
      enum completed_step "profile bsa-badges skills-and-projects cv-and-contacts preview"
   }

  files {
      varchar id PK
      dateTime created_at
      dateTime update_at
      varchar url
      varchar etag
      varchar file_name
  }

  hard_skills{
      varchar id PK
      dateTime created_at
      dateTime update_at
      varchar name
  }

  talent_hard_skills }|..|o user_details : user_details_id
  talent_hard_skills }|..|| hard_skills : hard_skill_id
  talent_hard_skills{
      varchar id PK
      dateTime created_at
      dateTime update_at
      varchar user_details_id FK
      varchar hard_skill_id FK
  }

  bsa_badges{
      varchar id PK
      dateTime created_at
      dateTime update_at
      varchar name
      varchar type
      int max_score
  }

  talent_badges }|--|| users : user_id
  talent_badges }|--|o user_details : user_details_id
  talent_badges }|--|| bsa_badges : badge_id
  talent_badges{
      varchar id PK
      dateTime created_at
      dateTime update_at
      int score
      varchar level
      boolean is_shown
      varchar user_id FK
      varchar user_details_id FK
      varchar badge_id FK
  }

  chat_messages ||--|| user_details : user_id
  chat_messages{
      varchar id PK
      dateTime created_at
      dateTime update_at
      text message
      varchar sender_id FK
      varchar receiver_id FK
      varchar chat_id
      boolean isRead
  }

```

## 🏃‍♂️ Simple Start

1. **`npm install`** at the root
2. Fill ENVs
3. **`npx simple-git-hooks`** at the root
4. **`cd backend && npm run migrate:dev`** then **`npm run start:dev`**
5. **`cd frontend && npm run start:dev`**
6. Enjoy ❤️

### 🌑 Backend

-   [Fastify](https://www.fastify.io/) — a backend framework.
-   [Knex](https://knexjs.org/) — a query builder.
-   [Objection](https://vincit.github.io/objection.js/) — an ORM.

### 🌕 Frontend

-   [React](https://reactjs.org/) — a frontend library.
-   [Redux](https://redux.js.org/) + [Redux Toolkit](https://redux-toolkit.js.org/) — a state manager.

### 🥊 Code quality

-   [simple-git-hooks](https://www.npmjs.com/package/simple-git-hooks) — a tool that lets you easily manage git hooks.
-   [lint-staged](https://www.npmjs.com/package/lint-staged) — run linters on git staged files.
-   [dangerjs](https://danger.systems/js/) — automate common code review chores.
-   [commitlint](https://commitlint.js.org/) — helps your team adhere to a commit convention.
-   [editorconfig](https://editorconfig.org/) — helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
-   [prettier](https://prettier.io/) — an opinionated code formatter.
-   [ls-lint](https://ls-lint.org/) — file and directory name linter.
-   [eslint](https://eslint.org/) — find problems in your JS code.
-   [stylelint](https://stylelint.io/) — find and fix problems in your CSS code.

#### 🏅 Pull Request flow

```
<project-prefix>-<issue-number>: <ticket-title>
```

##### Example

-   `bt-5: Add auth`

#### 🌳 Branch flow

```
<type>/<project-prefix>-<issue-number>-<short-desc>
```

##### Types

-   task
-   fix

##### Examples

-   `task/bt-5-add-clinician-dashboard`
-   `task/bt-12-add-clinician-flow`
-   `fix/bt-16-fix-clinician-flow`

#### 🗂 Commit flow

```
<project-prefix>-<issue-number>: <modifier> <description>
```

##### Modifiers

-   `+` (add)
-   `*` (edit)
-   `-` (remove)

##### Examples

-   `bt-5: + title for dashboard`
-   `bt-12: * dashboard title`
-   `bt-16: - dashboard title`

## 📦 CI/CD

CI/CD implemented using [GitHub Actions](https://docs.github.com/en/actions)
