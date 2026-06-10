# Application Prompts — Reference Folder

This folder contains the **canonical application prompt templates** used by the
"Contact & Apply" section of the site. The deeplink generator (Cursor / Claude)
and the email composer read these templates at request time and fill the
`{{placeholder}}` fields with the applicant's form input.

| File                | Purpose                              |
| ------------------- | ------------------------------------ |
| `application.en.md` | English application prompt template  |
| `application.tr.md` | Turkish application prompt template  |

## Placeholders

| Placeholder        | Filled with                         |
| ------------------ | ----------------------------------- |
| `{{name}}`         | Applicant full name                 |
| `{{email}}`        | Applicant email                     |
| `{{role}}`         | Role / company                      |
| `{{experience}}`   | Experience summary                  |
| `{{cohort}}`       | Preferred cohort                    |
| `{{motivation}}`   | Motivation statement                |

## Program facts (single source of truth)

- Cohort 1 starts **July 1, 2026**
- Cohort 2 starts **September 2026**
- Maximum capacity: **25 seats per cohort**
- Applications: **academy@masterfabric.co**

Editing a template here changes what every future deeplink and email draft
contains — no rebuild needed, the templates are read per request.
