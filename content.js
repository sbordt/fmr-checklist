// ============================================================================
// content.js: every text of the checklist website. Edit this file; index.html
// only renders it. Reload the page to see a change (locally and online).
//
// Rules of the file:
//   * Every text stands between backticks: `...`. Quotes and apostrophes
//     need no escaping. A backtick inside a text is the only thing that breaks
//     the file. Line breaks inside a text are allowed.
//   * Texts are plain text; only the intro bullets allow HTML (<em>).
//     Words between double brackets, [[like this]], are shown in pink: new
//     wording that still has to be reviewed. Remove the brackets to accept it.
//   * Keep the keys (question:, example:, ...) as they are; the page looks
//     them up by name.
//   * Terms of the glossary (at the end) are underlined where they are used
//     (the first time on a page); "defines" names the terms that a page, a
//     threat, or a guideline defines itself, so that they are not underlined
//     there.
//
// After editing, a quick check that the file still parses:
//   node --check content.js
// ============================================================================

const CONTENT = {

  // ---- First page ---------------------------------------------------------
  intro: {
    title: `A Checklist for Foundation Model Research`,
    lead: `Training foundation models is expensive. Researchers therefore work with approximations: smaller models, cheaper stand-ins for the measurements of interest, models that others have trained, and multiple treatments inside a single training run. Each of these approximations relies on assumptions. This checklist helps authors and reviewers identify the approximations that a paper makes. It also asks how central assumptions behind these approximations are addressed.`,
    bullets: [
      `The checklist consists of 10 question with individual follow-ups.`,
      `The questions are about different approximation strategies and their implicit assumptions.`,
      `There is also a general question about statistical methodology.`,
      `When the checklist is completed, an overview is generated and the results can be exported.`,
      `Disclaimer: Completing this checklist does not guarantee that a research result is valid.`
    ],
    exampleLink: `Load a filled example`,
    exampleNote: `(the case study of Ruan et al., 2024, from the paper). This replaces your answers.`,
    allYesLink: `For debugging: answer every question with Yes`,
    allYesNote: `and click through the pages to inspect all texts.`
  },

  // ---- The overview page after Start: what this checklist is about ---------
  // Sentences from the paper (introduction, Section 2, the opening paragraphs
  // of Sections 3-5 and Appendix F), with a few connecting words. Each
  // section has a heading and paragraphs; add or remove sections freely.
  // A section can also have subsections (each with a heading and paragraphs);
  // they are shown one level below, after the paragraphs of the section.
  about: {
    title: `What this checklist is about`,
    sections: [
      {
        heading: `The ideal experiment`,
        paragraphs: [
          `Most research questions about foundation models are interventional: they ask what would happen to model behavior if some aspect of the training recipe were changed. Up to some uncontrollable random variation, the training recipe determines the foundation model along with a range of outcome measures. This includes upstream outcomes like the training loss, and downstream outcomes such as benchmark scores. The research question asks about the effect of a treatment on the outcomes for a particular training recipe. For example, would decreasing the learning rate improve downstream performance? `,
          `The ideal way to answer these research questions is a controlled experiment with several full training runs. However, the ideal experiment is often computationally infeasible, which gives rise to the need for approximative research strategies.`
        ]
      },
      {
        heading: `Research strategies`,
        paragraphs: [
          `In recent years, the community has developed various approximation strategies that study model behavior on a compute budget. What these strategies have in common is that they aim to estimate the treatment effect of the ideal experiment without actually performing the ideal experiment. Estimating treatment effects in this way is, however, only possible under assumptions.`
        ],
        subsections: [
          {
            heading: `Proxy models and scaling laws`,
            paragraphs: [
              `Proxy models replace the target recipe with a proxy recipe that is cheaper to train, and the controlled experiment is performed with the proxy. The proxy recipe can have fewer parameters, fewer training tokens, or both. In its simplest form, this strategy assumes that the treatment effect does not depend on the considered scale. The more interesting scenario, however, is when the treatment effect depends on the scale in a way that is predictable. In this case, treatment effects and outcomes can be estimated with scaling laws.`
            ]
          },
          {
            heading: `Proxy treatments`,
            paragraphs: [
              `Proxy treatments keep the target recipe but replace the treatment with a stand-in that is cheaper to compute, observe or implement. One example of a proxy treatment is to fine-tune a model instead of re-training it from scratch.`
            ]
          },
          {
            heading: `Proxy outcomes`,
            paragraphs: [
              `Proxy outcomes replace the outcome with a cheaper stand-in. One example of a proxy outcome is to use a subset of a benchmark to estimate the full benchmark score, or the validation loss instead of task performance.`
            ]
          },
          {
            heading: `Observational data`,
            paragraphs: [
              `The observational approach avoids training new models altogether and instead analyzes the meta-data of existing training runs. In recent works, it has been employed to derive scaling laws, to improve the pretraining data mix, and to predict benchmark performance from fewer samples.`
            ]
          },
          {
            heading: `Units within a single training run`,
            paragraphs: [
              `This strategy approximates the treatment effect with a single training run, by emulating several treatment and control runs from it. It regards the training run as containing a set of independently treatable units with separate outcomes, thereby allowing us to form treatment and control populations within a single run. For example, to estimate the average effect of training on a document on the document’s loss, each document is regarded as a separate unit that can be independently assigned to the treatment group (the training data) or the control group (the validation data).`
            ]
          },
          {
            heading: `Theoretical controls`,
            paragraphs: [
              `Theoretical controls derive the control outcomes analytically instead of measuring them. One instance of this are influence functions, which are used to approximate the contribution of individual training examples to a particular prediction. Another is to inject signals into the training run that can be used to derive a mathematically guaranteed control: in privacy auditing, for example, “canary” data is randomly assigned to the training or validation set.`
            ]
          }
        ]
      },
      {
        heading: `Validity threats`,
        paragraphs: [
          `Violations of necessary assumptions in the estimation of treatment effects pose threats to the validity of research results. For example, if the results from smaller proxy experiments do not generalize across scale, then it is invalid to conclude from small-scale experiments about large-scale behavior. For this reason, it is important that the assumptions that underlie different research strategies are explicitly discussed.`,
          `At a high level, there are four types of validity that can be threatened. Statistical validity asks whether an estimate from a finite, noisy sample reliably reflects the true effect; internal validity, whether a reliable estimate reflects a genuine causal effect; external validity, whether a genuine causal effect transfers to the recipe that we care about; and construct validity, whether the operationalization of treatment and outcome actually reflects the constructs in the research question. Every research strategy rests on its own assumptions, and each assumption, if violated, affects one of these types of validity.`
        ]
      }
    ]
  },

  // ---- Page 1: the research question (A1 of the paper) --------------------
  // rq and concl are the labels of the two boxes.
  A1: {
    title: `What is the research question?`,
    rq: `Research question: one sentence naming treatment, outcome, and target model`,
    concl: `Conclusions: list the main conclusions that the paper draws from its experiments`,
    // Each guideline defines a term; "defines" keeps that term from being underlined in its own definition.
    guidelines: [
      { text: `The treatment is the change to the training recipe or data whose effect the paper wants to know (e.g., adding math data to the pre-training mix, lowering the learning rate, including a document in the training set). The control is the same setup without that change.`,
        defines: ['treatment'] },
      { text: `The outcome is the property measured to see the effect (e.g., a benchmark score, the training loss, how well a document is memorized).`,
        defines: ['outcome'] },
      { text: `The target model is the model that the paper’s conclusions are about. It may be larger, or trained differently, than the model that the paper actually trains. There can be multiple target models, for example, when a paper claims that transformers can perform length generalization.`,
        defines: ['target model'] },
      { text: `A unit is the thing that does or does not receive the treatment and on which the outcome is measured. This can be a training run, a dataset, a document, or a token. Usually, there are multiple units in a single experiment. Units with the treatment form the treatment group, units without it the control group.`,
        defines: ['unit', 'treatment group', 'control group'] }
    ],
    example: `How does the MMLU benchmark score (outcome) of Olmo 3 32B (target model) change when we remove all math competition data from its pretraining data (treatment)?`
  },

  // ---- Pages 2 to 8: the approximation strategies (A2 to A8) --------------
  // question: the Yes/No question; ifYes: the label of the box after a Yes;
  // description and example: shown above the Yes/No; note: an optional line
  // shown after a Yes, under the ifYes box and above the follow-up boxes.
  // The order of the keys is the order of the pages.
  questions: {
    A2: {
      question: `Do the experiments involve proxy models?`,
      ifYes: `Which experiments are performed with proxy models?`,
      description: `A proxy model is a model that is smaller or cheaper to train than the target model, and that stands in for it in the experiments.`,
      example: `A 1B parameter model is used instead of a 32B parameter model, or a series of smaller models and a scaling law are used to predict behavior at larger scale.`,
      defines: ['proxy model']
    },
    A3: {
      question: `Do the experiments involve proxy treatments?`,
      ifYes: `Which experiments are performed with proxy treatments?`,
      description: `A proxy treatment replaces the treatment that the paper cares about with a stand-in that is cheaper to compute, observe or implement.`,
      example: `Training data ablation experiments often use fine-tuning or continual pretraining instead of training a model from scratch.`,
      defines: ['proxy treatment']
    },
    A4: {
      question: `Do the experiments involve proxy outcomes?`,
      ifYes: `Which proxy outcomes does the paper measure?`,
      description: `A proxy outcome replaces the outcome the paper cares about with a stand-in that is cheaper to compute, observe or implement.`,
      example: `The cross-validation loss stands in for performance on a task that we care about. A small subset of benchmark questions stand in for the full benchmark.`,
      defines: ['proxy outcome']
    },
    A5: {
      question: `Do the experiments involve observational data?`,
      ifYes: `Which experiments involve observational data?`,
      description: `Data is experimental if the researchers decided which units receive the treatment, meaning they performed the training runs, ablationns or hyperparameter sweeps themselves. In contrast, data is observational if the training runs already existed, meaning that the researchers did not control and do not know how the treatment was assigned.`,
      example: `Researchers collect the architecture choices and benchmark scores of all publicly released models, use leaderboards or model cards.`,
      defines: ['observational data']
    },
    A6: {
      question: `Do the experiments treat elements of a single training run as independent units?`,
      ifYes: `Which experiments, and what are the units?`,
      description: `This strategy emulates two or more training runs from a single run: elements of the run (documents, tokens, subwords, …) are treated as independently treatable units, each with its own treatment status and outcome.`,
      example: `Documents in the training set form the treatment group, held-out documents the control group, and the model’s loss on each document is its outcome.`
    },
    A7: {
      question: `Do the experiments use theoretical controls?`,
      ifYes: `Which experiments use theoretical controls?`,
      description: `A theoretical control is an outcome that was not measured but computed from theory: the paper analytically approximates what the outcome would have been under the treatment or under the control, and compares against that.`,
      example: `Influence functions analytically approximating “what if this data point were not in the training data”.`,
      defines: ['theoretical control']
    },
    A8: {
      question: `Do the experiments involve other approximations?`,
      ifYes: `Which other approximations are performed?`,
      description: `List any way in which the design deviates from the ideal experiment that is not covered by the previous questions.`,
      example: `Measuring the outcome only at coarse checkpoint intervals; analyzing a subsample of the units; having access to a dataset that is iid. but not included in the training data.`
    }
  },

  // ---- The four validity types of Part B ----------------------------------
  // The question is shown under "other approximations" (A8), one box per type.
  validity: {
    SV: {
      name: `Statistical validity`,
      question: `How does the paper discuss and establish that its main result reflects a real effect, and is not due to noise, a poorly fitted curve, or picking the best of many comparisons?`
    },
    IV: {
      name: `Internal validity`,
      question: `How does the paper discuss and establish that its main result is a genuine causal effect of the treatment?`
    },
    EV: {
      name: `External validity`,
      question: `If the paper draws conclusions about a target model or setting that are different from what is studied, how does the paper discuss and establish the validity of the conclusions about the target setting?`
    },
    CV: {
      name: `Construct validity`,
      question: `If the implemented treatment or the measured outcome differs from the treatment or outcome named in the conclusions, how does the paper discuss and establish whether findings about the one carry over to the other?`
    }
  },

  // ---- The threats: one entry per bullet point of Part B of the paper ----
  // page: the page whose Yes unfolds the threat (A2 ... A7), or SV for the
  //       threats that every paper has to address (page 9).
  // type: SV, IV, EV, or CV. name: the title of the card.
  // label: the label of the bullet point in the paper (not shown).
  // items: the bullet point(s) of the paper, each with its example.
  // question: on page 9, a short question shown as the heading; the texts
  //       are then the explanation below it (without it, the first text is
  //       the heading).
  // gate: a Yes/No question for a threat that may or may not occur; the
  //       answer box appears only after a Yes. gate: true asks Yes/No right
  //       after the texts, without a question of its own. boxOn: 'No' opens
  //       the box after a No instead.
  // The question above the answer box is "How does the paper address <name>?"
  // unless ask (replaces <name>) or box (replaces the whole question) is given.
  // The order of the entries is the order of the cards on a page.
  threats: [
    {
      id: `A2-EV1`,
      page: `A2`,
      type: `EV`,
      name: `External validity across scale`,
      label: `A2-EV1`,
      items: [
        {
          text: `The paper needs to justify why the conclusions also hold for the target model. In general, effects measured on proxy models can change in size, or even in sign, as the model size or the amount of training data is being increased.`,
          example: `The optimal learning rate often depends on the model size, a naive extrapolation from 1B to 70B could be wrong.`
        }
      ]
    },
    {
      id: `A2-EV2`,
      page: `A2`,
      type: `EV`,
      name: `External validity across training recipes`,
      label: `A2-EV2`,
      items: [
        {
          text: `If the target setting involves models trained with a different training recipe, then the paper needs to argue why the measured effect holds for the target training recipe as well. In general, any measured effect can critically depend on factors that were held fixed in the experiments. If such a factor is changed, then the size, or even the sign, of the effect can change as well.`,
          example: `The conclusions from a data-selection experiment can flip when the architecture or other hyperparameters are changed.`
        }
      ]
    },
    {
      id: `A2-SV`,
      page: `A2`,
      type: `SV`,
      name: `Functional form`,
      gate: true,
      box: `How does the paper justify or test the assumed form, and does it report the quality of the fit?`,
      items: [
        {
          text: `Does the paper fit a functional form (for example, linear regression or a power-law)?`,
          example: `Scaling laws often use a power-law relationship, and this functional form has been validated in multiple papers.`
        }
      ]
    },
    {
      id: `A3-CV1`,
      page: `A3`,
      type: `CV`,
      name: `Construct validity of the proxy treatment`,
      label: `A3-CV1`,
      items: [
        {
          text: `The paper needs to argue that the proxy acts on the outcome in the same way that the original treatment would. In general, two treatments that look alike can act on the outcome in different ways, so the effect measured under the proxy may be different from the one that would be measured under the original treatment.`,
          example: `Multi-epoch fine-tuning memorizes far more than single-epoch pre-training. Therefore, multi-epoch fine-tuning is not a good proxy to measure privacy leakage during pretraining.`
        }
      ]
    },
    {
      id: `A4-CV1`,
      page: `A4`,
      type: `CV`,
      name: `Construct validity of the outcome`,
      label: `A4-CV1`,
      items: [
        {
          text: `The paper needs to argue that the proxy reacts to the treatment in the same way that the original outcome would. In general, the treatment may affect the measured outcome but not the outcome of interest, or vice versa.`,
          example: `An improvement in the cross-validation loss after pretraining is not always guaranteed to improve performance after post-training. Therefore, the cross-validation loss after pretraining is an imperfect proxy for post-training performance.`
        }
      ]
    },
    {
      id: `A5-SV1`,
      page: `A5`,
      type: `SV`,
      name: `Sample size and noise`,
      label: `A5-SV1`,
      box: `How does the paper establish this?`,
      items: [
        {
          text: `The paper needs to establish that the sample size is large enough, and account for noise in the estimate.`,
          example: `The number of frontier training runs is small.`
        }
      ]
    },
    {
      id: `A5-IV1`,
      page: `A5`,
      type: `IV`,
      name: `Exchangeability`,
      label: `A5-IV1`,
      defines: ['exchangeability'],
      items: [
        {
          text: `The paper needs to establish that treatment and control groups do not differ systematically in anything other than the treatment. This may fail due to confounders or selection bias. The paper may adjust for measured confounders, which requires that groups are comparable once those confounders are held fixed.`,
          example: `Architecture and training data composition are confounded by calendar time. Therefore, an observed correlation between architecture and benchmark score may actually be caused by data composition.`
        }
      ]
    },
    {
      id: `A5-IV2`,
      page: `A5`,
      type: `IV`,
      name: `Positivity`,
      label: `A5-IV2`,
      defines: ['positivity'],
      items: [
        {
          text: `The paper needs to establish that every treatment value the paper draws conclusions about occurs in the sample among otherwise comparable units. When other variables are adjusted for, this has to be the case within every combination of those variables. Effects of treatment values that no unit received can only be extrapolated, not estimated.`,
          example: `If a document is not included in any training run in the sample, we cannot estimate its effect.`
        }
      ]
    },
    {
      id: `A5-IV3`,
      page: `A5`,
      type: `IV`,
      name: `SUTVA`,
      label: `A5-IV3`,
      defines: ['SUTVA', 'interference', 'consistency'],
      items: [
        {
          text: `The paper needs to establish that each unit’s outcome depends only on its own treatment, not on the treatments other units received. In addition, the paper needs to establish that all treated units received the same version of the treatment.`,
          example: `SUTVA might be violated when units share training data or evaluation pools across training runs.`
        }
      ]
    },
    {
      id: `A5-EV1`,
      page: `A5`,
      type: `EV`,
      name: `External validity across training recipes`,
      label: `A5-EV1`,
      items: [
        {
          text: `If the experiments pool data from many model families, then the measured effect is an average over the pooled recipes, and the effect for the target training recipe could be different.`,
          example: `Scaling law coefficients change with the pretraining data composition.`
        }
      ]
    },
    {
      id: `A5-CV1`,
      page: `A5`,
      type: `CV`,
      name: `Construct validity`,
      label: `A5-CV1`,
      gate: `Do the experiments implicitly involve proxy outcomes or proxy treatments?`,
      box: `How does the paper address the construct validity of the proxies?`,
      items: [
        {
          text: `Experiments with observational data might implicitly involve proxy outcomes or proxy treatments, because the treatment and outcome of interest are often not documented. If this is the case, then the construct validity of the proxies needs to be addressed.`
        }
      ]
    },
    {
      id: `A6-IV1`,
      page: `A6`,
      type: `IV`,
      name: `Exchangeability`,
      label: `A6-IV1`,
      defines: ['exchangeability', 'parallel trends'],
      items: [
        {
          text: `The paper needs to establish that the treated and the control units do not differ systematically. If the paper uses difference-in-differences estimators, instrumental variables, or a regression discontinuity design, then the paper needs to discuss the assumptions of that strategy.`,
          example: `The within-run estimate overestimates memorization when the treated units are sampled randomly, and the untreated units reflect near training duplicates, a particular domain (code), or especially hard examples.`
        }
      ]
    },
    {
      id: `A6-IV2`,
      page: `A6`,
      type: `IV`,
      name: `No interference`,
      label: `A6-IV2`,
      ask: `interference between units`,
      defines: ['interference'],
      items: [
        {
          text: `The paper needs to establish that each unit’s outcome depends only on its own treatment, not on the treatments other units received. In particular, the paper needs to establish that the outcome of control units is not affected by the presence of the treatments.`,
          example: `When we add additional documents to the training data, this can change the final loss of documents that were previously in the training data.`
        }
      ]
    },
    {
      id: `A6-EV1`,
      page: `A6`,
      type: `EV`,
      name: `External validity across units`,
      label: `A6-EV1`,
      items: [
        {
          text: `If the paper measures an average effect, then this effect could hide that individual units or subgroups react differently to the treatment.`,
          example: `A small average memorization effect for a group of documents is compatible with strong memorization of individual documents.`
        }
      ]
    },
    {
      id: `A7-IV1`,
      page: `A7`,
      type: `IV`,
      name: `No interference`,
      label: `A7-IV1`,
      ask: `interference between units`,
      defines: ['interference'],
      items: [
        {
          text: `The paper needs to establish that each unit’s outcome depends only on its own treatment, not on the treatments other units received. In particular, the paper needs to establish that the outcome of control units is not affected by the presence of the treatments.`,
          example: `Training on canary i may affect the outcome for canary j.`
        }
      ]
    },
    {
      id: `A7-SV1`,
      page: `A7`,
      type: `SV`,
      name: `Statistical validity`,
      label: `A7-SV1`,
      box: `How does the paper discuss the statistical assumptions of the approximation?`,
      items: [
        {
          text: `Theoretical controls are approximations that often rely on strong statistical assumptions. The paper needs to discuss these assumptions.`,
          example: `Influence functions accurately capture the leave-one-out retraining effect for simple models like linear or logistic regression, but the same might not be true for transformers.`
        }
      ]
    },
    {
      id: `A7-EV1`,
      page: `A7`,
      type: `EV`,
      name: `External validity across models`,
      label: `A7-EV1`,
      items: [
        {
          text: `If the training recipe is modified to obtain a theoretical control, then the measured effect applies to the modified recipe rather than the target training recipe.`,
          example: `Injecting “canary” data modifies the training recipe, so any estimate applies to the modified recipe rather than the target training recipe.`
        }
      ]
    },
    {
      id: `A7-CV1`,
      page: `A7`,
      type: `CV`,
      name: `Construct validity of the treatment`,
      label: `A7-CV1`,
      gate: `Does the approximation implicitly involve a proxy treatment?`,
      box: `How does the paper address the construct validity of the proxy?`,
      items: [
        {
          text: `The approximation might implicitly involve proxy treatments. If this is the case, then the construct validity of the proxy needs to be addressed.`,
          example: `Influence functions replace the effect of “removing one data point” with “reducing the weight of one data point”.`
        }
      ]
    },
    {
      id: `SV-noise`,
      page: `SV`,
      type: `SV`,
      name: `Random Noise and Error Bars`,
      gate: true,
      boxOn: `No`,
      box: `Which source of randomness is not addressed in the paper?`,
      items: [
        {
          text: `Does the paper report error bars and say which source of randomness they capture?`,
          example: `The difference between two training recipes can be smaller than the seed-to-seed variation within one training recipe.`
        }
      ]
    },
    {
      id: `SV-best`,
      page: `SV`,
      type: `SV`,
      name: `Best of Many Comparisons`,
      question: `Does the paper report the best of many comparisons?`,
      gate: true,
      box: `How does the paper address picking the best of many comparisons?`,
      items: [
        {
          text: `If the paper reports the best of many noisy comparisons (arms, benchmarks, checkpoints), then the result may look strong by chance.`,
          example: `Evaluating many model variants on benchmark data before publishing the best score.`
        }
      ]
    },
    {
      id: `SV-units`,
      page: `SV`,
      type: `SV`,
      name: `Dependent Units`,
      question: `Does the paper rely on units that are not independent?`,
      gate: true,
      box: `How does the paper account for the dependence between the units?`,
      items: [
        {
          text: `If the paper relies on multiple units that are not independent, then the estimate is less precise than what the raw sample count suggests.`,
          example: `Multiple fine-tunes of one base model are not independent units.`
        }
      ]
    }
  ],

  // ---- Page 9: statistical validity ---------------------------------------
  // The question of SV is validity.SV.question above; the cards are the
  // threats with page: 'SV'.
  // note: an optional line under the question (empty: nothing is shown).
  statistical: {
    title: `Statistical validity`,
    note: ``
  },

  // ---- Page 10: other threats (OT) ----------------------------------------
  other: {
    title: `Other threats`,
    question: `Does the validity of the paper’s conclusions require other assumptions, including assumptions that do not result from approximating the ideal experiment?`,
    ifYes: `Which other assumptions are required, and does the paper discuss these assumptions?`,
    guidelines: [
      `Here you can list any assumption or threat to the validity of the paper’s conclusions.`,
      `Use this question if the paper uses a novel approximation strategy and you are unsure about the validity types.`
    ]
  },

  // ---- The summary page ---------------------------------------------------
  // strategies: the row names of Part A in the summary box.
  summary: {
    title: `Checklist Summary`,
    partA: `Part A — Approximation Strategies`,
    partB: `Part B — Validity Threats`,
    strategies: {
      A2: `Proxy models`,
      A3: `Proxy treatments`,
      A4: `Proxy outcomes`,
      A5: `Observational data`,
      A6: `Single-run units`,
      A7: `Theoretical controls`,
      A8: `Other approximations`
    },
    statistical: `Statistical validity`,
    other: `Other threats`,
    missing: `[missing]`
  },

  // ---- The glossary page (opens in its own tab from the header) ----------
  glossaryPage: {
    title: `Glossary`
  },

  // ---- Glossary: shown on hover where a term is used, and on the glossary page
  // Style: a precise definition, then "For example, ...". The keys are
  // written in lower case; the glossary page capitalizes the first letter.
  glossary: {
    treatment: `The change to the training recipe whose effect we want to know. For example, adding math data to the pre-training mix. The control is the same setup without that change.`,
    outcome: `The property that we measured to see the effect of the treatment. For example, a benchmark score, the training loss, or whether a document is memorized.`,
    'target model': `The model that the paper’s conclusions are about. It may be larger, or trained differently, than the model that the paper actually trains. For example, a paper trains 1B models but draws conclusions about 32B models.`,
    unit: `The thing that does or does not receive the treatment and on which the outcome is measured. For example, a training run, a dataset, a document, or a token. Usually, there are multiple units in a single experiment.`,
    'treatment group': `The units that received the treatment. For example, the documents in the training set.`,
    'control group': `The units that did not receive the treatment. For example, held-out documents that are not in the training set.`,
    'training recipe': `All controllable parts of model training, including the architecture, the training data, and the optimizer. The recipe determines the model and its outcomes up to random variation.`,
    'model family': `Models that share central parts of their training recipe. For example, the Pythia models.`,
    'proxy model': `A model that is smaller or cheaper to train than the target model, and that stands in for it in the experiments. For example, a 1B model instead of a 32B model, or a series of smaller models used to fit a scaling law.`,
    'proxy treatment': `A stand-in for the treatment that the paper cares about that is cheaper to compute, observe or implement. For example, fine-tuning a model on private data instead of pretraining on it.`,
    'proxy outcome': `A cheaper stand-in for the outcome the paper cares about. For example, the validation loss instead of performance on a downstream task, or a subset of a benchmark instead of the full benchmark.`,
    'scaling law': `A parametric function of scale, fitted to the outcomes or treatment effects of several proxy models of increasing scale, and used to predict them at the target scale. For example, the validation loss as a function of model and dataset size.`,
    'observational data': `Data from training runs that already existed, so the researchers did not control and do not know how the treatment was assigned. For example, the benchmark scores and architectures of publicly released models.`,
    'theoretical control': `A control outcome that was not measured but computed from theory, by analytically approximating what the outcome would have been under the control. For example, influence functions, or canaries with a known distribution.`,
    canary: `Data with known statistical properties injected into training, so that the control outcome follows from the distribution of the canaries. For example, Gaussian noise canaries, or canary sequences randomly assigned to the training or validation set in privacy auditing.`,
    exchangeability: `Treatment and control groups do not differ systematically in anything other than the treatment. It holds by design in a controlled experiment and may fail in observational data through confounders or selection bias.`,
    confounder: `A third factor that causes both the treatment and the outcome, so that the two are associated even without a causal effect. For example, calendar time, which confounds architecture and training data composition.`,
    'selection bias': `A non-causal association between treatment and outcome induced by how observations enter the sample. For example, only the best-performing models are published.`,
    positivity: `Every treatment value that the paper draws conclusions about occurs in the sample among otherwise comparable units. Effects of treatment values that no unit received can only be extrapolated, not estimated.`,
    SUTVA: `Stable unit treatment value assumption, with two parts: no interference between units, and consistency between observed and potential outcomes.`,
    interference: `A unit’s outcome depends on the treatments other units received, not only on its own treatment. For example, training on one document changes the loss of a near-duplicate document.`,
    consistency: `All treated units received the same version of the treatment, so the observed outcome is the outcome of the treatment the paper names. For example, “document is in the training set” hides deduplication, number of epochs, and data ordering.`,
    'potential outcome': `The outcome a unit would have under a given treatment, whether or not it actually received it. The causal effect is the difference between the potential outcomes under treatment and under control.`,
    'identifying assumptions': `The assumptions under which the association between treatment and outcome is a causal effect. For example, exchangeability, positivity, and SUTVA, or parallel trends in a difference-in-differences design.`,
    // Entries that are switched off (remove the // to show them again):
    // 'difference-in-differences': `A design that compares the change over time in treated units to that in untreated units. It replaces exchangeability with the parallel trends assumption.`,
    // 'parallel trends': `Treated and untreated units would have developed alike without the treatment; the assumption behind difference-in-differences.`,
    // 'regression discontinuity': `Treatment is determined by a cutoff; potential outcomes are assumed to vary continuously across it, so units just above and below the cutoff are exchangeable in the limit.`,
    operationalization: `The concrete implementation of a concept. For example, a paper might operationalize the concept “reasoning ability” by measuring a benchmark score.`,
    'statistical validity': `Whether the estimate from a finite, noisy sample reliably reflects the true underlying quantity. The threats are noise, a poorly fitted curve, and picking the best of many comparisons.`,
    'internal validity': `Whether a reliable estimate reflects a genuine causal effect of the treatment, rather than some other difference between the compared groups or an influence of the units on each other. For example, when recent models with a new architecture achieve better outcomes, that does not mean that the architecture caused the improvements.`,
    'external validity': `Whether a genuine causal effect transfers from the setting in which it was measured to the target model or setting that the conclusions are about. For example, whether an effect measured on a 1B model also holds for a 70B model.`,
    'construct validity': `Whether the treatment as implemented and the outcome as measured really capture the concepts named in the research question and conclusions. For example, fine-tuning on private data instead of pretraining on it may threaten construct validity.`
  },

  // ---- Which words of the texts are glossary terms -------------------------
  // [glossary key, pattern]: the pattern is a regular expression that matches
  // the term in the texts (plural forms etc.); specific patterns come first.
  terms: [
    ['difference-in-differences', 'difference-in-differences'],
    ['regression discontinuity', 'regression discontinuity(?: designs?)?'],
    ['parallel trends', 'parallel(?: outcome)? trends'],
    ['identifying assumptions', 'identifying assumptions?'],
    ['statistical validity', 'statistical validity'],
    ['internal validity', 'internal validity'],
    ['external validity', 'external validity'],
    ['construct validity', 'construct validity'],
    ['theoretical control', 'theoretical controls?'],
    ['proxy treatment', 'proxy treatments?'],
    ['proxy outcome', 'proxy outcomes?'],
    ['proxy model', 'proxy models?'],
    ['target model', 'target models?'],
    ['treatment group', 'treatment groups?'],
    ['control group', 'control groups?'],
    ['training recipe', '(?:training )?recipes?'],
    ['model family', 'model famil(?:y|ies)'],
    ['potential outcome', 'potential outcomes?'],
    ['scaling law', 'scaling laws?'],
    ['observational data', 'observational(?: data)?'],
    ['canary', 'canar(?:y|ies)'],
    ['selection bias', 'selection bias'],
    ['confounder', 'confounders?|confounding|confounded'],
    ['exchangeability', 'exchangeab(?:ility|le)'],
    ['positivity', 'positivity'],
    ['SUTVA', 'SUTVA'],
    ['interference', '(?:no )?interference'],
    ['consistency', 'consistency'],
    ['operationalization', 'operationaliz(?:ation|e)'],
    ['unit', 'units?'],
    ['outcome', 'outcomes?'],
    ['treatment', 'treatments?']
  ]
};
