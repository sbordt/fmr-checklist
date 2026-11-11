# Validity Checklist for Foundation Model Research

Source of the website at **https://sbordt.github.io/fmr-checklist/**: a checklist for
authors and reviewers of foundation model research, filled in step by step.

* Ten pages: the research question; the approximation strategies of the
  experiment, one Yes/No question each (proxy models, proxy treatments, proxy
  outcomes, observational data, units within a single training run, theoretical
  controls, other approximations); statistical validity, which all papers have
  to address; and other threats.
* A [Yes] asks which experiments use the strategy and unfolds the validity
  threats that come with it as numbered cards, each with the bullet point and
  the example of the paper's checklist and a box asking how the paper addresses
  the threat. Threats that may or may not occur (for example, the best of many
  comparisons) are asked with a Yes/No first.
* The summary exports the result as Markdown or JSON; answers are kept in the
  browser only.

The questions, descriptions, examples, and threats are taken from the checklist
appendix of the paper *A Framework and Checklist for Validity Threats in
Foundation Model Research* (under review). Text shown in pink on the page, if
any, was added while drafting and is not from the paper.

## Files

| File | Contents |
|---|---|
| `content.js` | **All texts of the checklist**: the questions, descriptions, and examples of the pages, the threats (one entry per bullet point of the paper's checklist, with its example and the question above the answer box), the texts of the summary, and the glossary shown on hover. Edit this file to change the wording; the page picks it up on reload. Every text stands between backticks, so quotes need no escaping. |
| `example.js` | The filled example (the case study of Ruan et al., 2024), loaded by the link on the first page or by opening the page with `?example`. |
| `index.html` | The page: layout, navigation, the hover glossary, the summary, and the export. It contains no checklist text. |
| `checklist.md` | The checklist as plain Markdown, in the form of the paper's appendix (Part A, Part B, other threats). |

## Development

The site is static: open `index.html` in a browser, or serve the folder with
`python3 -m http.server`. After editing `content.js`, `node --check content.js`
tells whether the file still parses (a stray backtick is the usual culprit). GitHub Pages publishes the `main` branch from the
repository root. Opening the page with `?reset` (for example
`https://sbordt.github.io/fmr-checklist/?reset`) clears the saved answers and
starts on the first page; "Start over" in the header does the same after a
confirmation.
