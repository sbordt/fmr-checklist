# Validity Checklist for Foundation Model Research

Source of the website at **https://fmr-checklist.github.io/**: a checklist for
authors and reviewers of foundation model research. Part A identifies the
approximation strategies of a paper's experiment (proxy models, proxy treatments
and outcomes, observational data, units within a single training run,
theoretical controls); Part B asks whether the paper properly discusses the
threats to statistical, internal, external, and construct validity that come
with them.

The checklist text is reproduced from the appendix of the paper *A Framework and
Checklist for Validity Threats in Foundation Model Research* (under review).

## Files

| File | Contents |
|---|---|
| `index.html` | The interactive checklist: answers are stored in the browser (`localStorage`) and can be exported as Markdown or JSON. A [Yes] in Part A disables [NA] for the Part B questions it makes applicable. No external dependencies. |
| `checklist.md` | The same checklist as plain Markdown, for copying into a review or a paper. |

## Development

The site is static. Open `index.html` in a browser, or serve the folder with
`python3 -m http.server`. GitHub Pages publishes the `main` branch from the
repository root.
