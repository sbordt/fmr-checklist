# Validity Checklist for Foundation Model Research

Source of the website at **https://fmr-checklist.github.io/**: a checklist for
authors and reviewers of foundation model research, filled in step by step.

* Nine questions, one per page: the research question, then statistical
  validity, then the approximation strategies of the experiment (proxy models,
  proxy treatments, proxy outcomes, observational data, units within a single
  training run, theoretical controls, other approximations).
* A [Yes] asks which parts of the experiments use the strategy and unfolds the
  validity threats it gives rise to, key threats first, each with a description
  and one example, and a box asking how the paper addresses the threat.
* The summary exports the result as Markdown or JSON; answers are kept in the
  browser only.

The questions, descriptions, and examples are taken from the paper *A Framework
and Checklist for Validity Threats in Foundation Model Research* (under review).
Text shown in pink on the page was added while drafting and is not from the
paper; it is marked so that it can be reviewed.

## Files

| File | Contents |
|---|---|
| `index.html` | The page. No external dependencies. The strategy-to-threat graph is the `THREATS` table in the script; terms the checklist defines are underlined and show their definition on hover (the `GLOSSARY` table). |
| `checklist.md` | The checklist as plain Markdown, in the form of the paper's appendix (Part A and Part B). |

## Development

The site is static: open `index.html` in a browser, or serve the folder with
`python3 -m http.server`. GitHub Pages publishes the `main` branch from the
repository root.
