# Validity Checklist for Foundation Model Research

Source of the website at **https://fmr-checklist.github.io/**: a checklist for
authors and reviewers of foundation model research.

* **Part A** states the research question and identifies the approximation
  strategies of the experiment: proxy models, proxy treatments, proxy outcomes,
  observational data, units within a single training run, theoretical controls,
  other approximations.
* **Part B** asks, for each of the four types of validity (statistical,
  internal, external, construct), whether the paper properly discusses the
  threats to it. The page lists under each validity type only the threats that
  follow from the strategies selected in Part A, each with a description and an
  example, and disables [NA] where a Part A answer makes the threat applicable.

The questions, descriptions, and examples are taken from the paper *A Framework
and Checklist for Validity Threats in Foundation Model Research* (under review).
Text shown in pink on the page was added while drafting and is not from the
paper; it is marked so that it can be reviewed.

## Files

| File | Contents |
|---|---|
| `index.html` | The page, as a step-by-step form: intro, A1 to A8 one per screen, then for each validity type one screen per applicable threat and one answer screen, and a summary with export as Markdown or JSON. Terms the checklist defines are underlined and show their definition on hover (the `GLOSSARY` table). Answers are kept in the browser (`localStorage`); nothing is sent anywhere. No external dependencies. The strategy-to-threat graph is the `THREATS` table in the script. |
| `checklist.md` | The checklist as plain Markdown, in the form of the paper's appendix. |

## Development

The site is static: open `index.html` in a browser, or serve the folder with
`python3 -m http.server`. GitHub Pages publishes the `main` branch from the
repository root.
