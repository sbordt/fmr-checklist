# Validity Checklist for Foundation Model Research

**How to use this checklist**

- **Part A** states the research question and identifies the approximation strategies of the experiment. A [Yes] in Part A makes specific Part B threats applicable, so [NA] is not allowed for those questions; the last guideline of each Part A question says which.
- **Part B** asks, for each of the four types of validity, whether the paper *properly discusses* the threats to it: names them and argues them away, tests them, bounds them, or limits its claims accordingly. It does not ask whether the assumptions hold. A [No] is not disqualifying; it flags threats the paper should discuss.
- **Answers** are [Yes] / [No], and [NA] where the guidelines allow it. [NA] means the threat cannot arise in this design. If it is applicable but undiscussed, answer [No].
- **Justification:** one or two sentences pointing to the supporting section, quote, or figure.

## Part A — Research Question and Approximation Strategies

### A1. What is the research question?

**Research question:** [one sentence naming treatment, outcome, and target models]
**Conclusions:** [free text]

Guidelines:
- The **treatment** is the change to the training process or data whose effect the paper wants to know (e.g., adding math data to the pre-training mix, lowering the learning rate, including a document in the training set). The **control** is the same setup without that change.
- The **outcome** is the property measured to see the effect (e.g., a benchmark score, the training loss, how well a document is memorized).
- The **target models** are the models the paper's *conclusions* are about. They may be larger, or trained differently, than the models the paper actually trains.
- A **unit** is the thing that does or does not receive the treatment and on which the outcome is measured. Usually a unit is one training run; in some designs it is a document, token, or subword within one run. Units with the treatment form the **treatment group**, units without it the **control group**.
- Example: How does the MMLU benchmark score (outcome) of Olmo 3 32B (target model) change when we remove all math competition data from its pretraining data (treatment)?
- List the main conclusions the paper draws from this experiment; Part B refers back to them.

### A2. Do the experiments involve proxy models?

**Answer:** [Yes] / [No]
**Justification:**

Guidelines:
- A proxy model is a model that is smaller or cheaper to train than the target models the claims are about, and that stands in for them in the experiment.
- Example: 1B models standing in for 32B models; a series of small models fitted with a scaling law to predict behavior at a larger size.
- Note: If the answer is [Yes], the threat to external validity is applicable and thus [NA] is not allowed for question EV.

### A3. Do the experiments involve proxy treatments?

**Answer:** [Yes] / [No]
**Justification:**

Guidelines:
- A proxy treatment replaces the treatment the paper cares about with a cheaper stand-in, or only observes a proxy of it instead of implementing it.
- Example: fine-tuning on private data instead of pre-training on it; per-domain loss as a stand-in for the true data-mixture weights.
- Note: If the answer is [Yes], the threat to construct validity (of the treatment) is applicable and thus [NA] is not allowed for question CV.

### A4. Do the experiments involve proxy outcomes?

**Answer:** [Yes] / [No]
**Justification:**

Guidelines:
- A proxy outcome replaces the outcome the paper cares about with a cheaper stand-in.
- Example: "training loss" as stand-in for "benchmark score"; a small subset of benchmark questions as stand-in for the full benchmark.
- Note: If the answer is [Yes], the threat to construct validity (of the outcome) is applicable and thus [NA] is not allowed for question CV.

### A5. Do the experiments involve observational data?

**Answer:** [Yes] / [No]
**Justification:**

Guidelines:
- Data is *experimental* if the researchers decided which units receive the treatment (they ran the training runs, ablations, or sweeps themselves). It is *observational* if the runs already existed and someone else made those decisions, so the researchers did not control and do not know how the treatment was assigned.
- Example: relating recipe choices to benchmark scores across publicly released models; analyzing released checkpoints of an existing model suite; using leaderboards or model cards.
- Note: If the answer is [Yes], the threat to internal validity is applicable and thus [NA] is not allowed for question IV.

### A6. Do the experiments treat elements of a single training run as independent units?

**Answer:** [Yes] / [No]
**Justification:**

Guidelines:
- This strategy emulates two or more training runs from a single run: elements of the run (documents, tokens, subwords, …) are treated as independently treatable units, each with its own treatment status and outcome.
- Example: documents in the training set form the treatment group, held-out documents the control group, and the model's loss on each document is its outcome.
- Note: If the answer is [Yes], the threat to internal validity is applicable and thus [NA] is not allowed for question IV.

### A7. Do the experiments use theoretical controls?

**Answer:** [Yes] / [No]
**Justification:**

Guidelines:
- A theoretical control is an outcome that was not measured but computed from theory: the paper analytically approximates what the outcome *would have been* under the treatment or under the control, and compares against that.
- Example: influence functions analytically approximating "what if this data point were not in the training data".
- Note: If the answer is [Yes], the threats to internal validity and to construct validity (of the treatment) are applicable and thus [NA] is not allowed for questions IV and CV.

### A8. Do the experiments involve other approximations?

**Answer:** [Yes + description] / [No]
**Justification:**

Guidelines:
- Any way in which the design deviates from the ideal experiment that is not covered by A2 to A7.
- Example: measuring the outcome only at coarse checkpoint intervals; analyzing a subsample of the units.
- Note: If the answer is [Yes], name the validity types that the approximation threatens; [NA] is not allowed for those questions.

## Part B — Validity

Each question asks whether the paper properly discusses the threats to one type of validity. The guidelines explain the type and list the assumptions that have to be established for it.

### SV. Statistical validity (All papers)

**Question:** Does the paper discuss and establish that its main result reflects a real effect, and is not due to noise, a poorly fitted curve, or picking the best of many comparisons?
**Answer:** [Yes] / [No]
**Justification:**

Guidelines:
- When you estimate an effect from a finite, noisy sample, it might not reliably measure the true underlying quantity. What would come out if the experiment were repeated?
- Does the paper report error bars and say which source of randomness they capture? Observed outcomes may vary due to random initialization, data ordering, sampled evaluation subset, and so on. Example: the difference between two different training recipes can be smaller than the seed-to-seed variation within one training recipe.
- If the paper fits a functional form (for example, linear regression or a power-law), then it should justify or test the assumed form, and report the quality of the fit. [A2, proxy models]
- If the analysis relies on a few units, or units that are not independent, it makes the estimate less precise than what the raw sample count suggests. Example: multiple fine-tunes of one base model are not independent units.
- Does the paper report the best of many noisy comparisons (arms, benchmarks, checkpoints), which may look strong by chance?

### IV. Internal validity (A5, A6, A7)

**Question:** Does the paper discuss and establish that its estimate reflects a genuine causal effect of the treatment? For example, does the paper establish exchangeability, positivity, and SUTVA?
**Answer:** [Yes] / [No] / [NA]
[NA] is not allowed if A5, A6, or A7 = Yes. [NA] means the experimenter assigned the treatment to separate, independent training runs and the groups differ in nothing but the treatment; the assumptions below then hold by design.
**Justification:**

Guidelines:
- Internal validity asks whether a reliable estimate reflects a genuine *causal* effect of the treatment, rather than some other difference between the compared groups or an influence of the units on each other. An association between treatment and outcome is causal only under *identifying assumptions*, which the paper has to establish:
  - *Exchangeability:* treatment and control groups do not differ systematically in anything other than the treatment. It fails through *confounders* (third factors that influence both which units get the treatment and their outcome) and *selection bias* (units enter the sample in a way that depends on treatment and outcome, e.g., only the best-performing models are published). Adjusting for measured confounders relaxes this to *conditional* exchangeability: the groups are comparable once those confounders are held fixed. Example: architecture and training data composition are confounded by calendar time; a correlation between architecture and benchmark score may actually be caused by data composition.
  - *Positivity:* every treatment value the paper draws conclusions about occurs in the sample, among otherwise comparable units; when other variables are adjusted for, within every combination of those variables. Effects of treatment values that no unit received can only be extrapolated, not estimated. Example: if a document is not included in any training run in the sample, we cannot estimate its effect.
  - *SUTVA* (stable unit treatment value assumption), which has two parts. *No interference:* each unit's outcome depends only on its own treatment, not on the treatments other units received. It is strained whenever units share something through which a treatment can spread (training data or evaluation pools across runs, model parameters within a run). Example: many released models are fine-tuned on synthetic data generated by one model, so a change to that model's recipe also changes the outcomes of the models trained on its outputs. *Consistency:* the treatment is well defined, that is, all treated units received the same version of it, so the observed outcome is the outcome of the treatment the paper names. Example: "document is in the training set" hides deduplication, number of epochs, and ordering.
  - *Other identification strategies:* if the paper does not compare treatment and control groups directly but uses difference-in-differences (comparing the change over time in treated units to that in untreated units), instrumental variables, or a regression discontinuity design, the assumptions of that strategy have to be discussed. Example: difference-in-differences assumes parallel trends, that is, that treated and untreated units would have developed alike without the treatment.
- A [Yes] requires the paper to name each applicable assumption and argue for it, test it, bound its violation, or limit its claims. Answer [No] if any applicable assumption is undiscussed, and name it.

### EV. External validity (A2, A6)

**Question:** If the paper makes claims about a target model or setting that is different from what is being studied, does the paper discuss and establish the validity of the claims about the target setting?
**Answer:** [Yes] / [No] / [NA]
**Justification:**

Guidelines:
- Answering [Yes] requires verification in the target setting, an argument from established behavior (e.g., known scaling behavior of the quantity), or claims explicitly limited to what was studied. Answer [No] if any applicable transfer is undiscussed, and name it. [NA] means that the experiment is run at the scale, with the training recipes, model families, and units, and at the aggregation level that the claims are about.
- Effects measured on smaller proxy models can change in size, or even in sign, as we scale the size of the model or the amount of training data. Example: the optimal learning rate often decreases with model size; the best value at 1B can be wrong at 70B. [A2, external validity across scale]
- The measured effect could critically depend on factors that were held fixed in the experiments. If such a factor is changed, then the size, or even the sign, of the effect can change as well. Example: The conclusions from a data-selection experiment can flip when the architecture or learning rate schedule are changed. [A2, external validity across training recipes]
- If the paper measures an average effect, then this effect could hide that individual units or subgroups react differently to the treatment. Example: An average memorization effect near zero is compatible with strong memorization of particular documents. [A6, external validity across units]

### CV. Construct validity (A3, A4, A7)

**Question:** If the implemented treatment or the measured outcome differs from the treatment or outcome named in the conclusions, does the paper discuss whether findings about the one carry over to the other?
**Answer:** [Yes] / [No] / [NA]
**Justification:**

Guidelines:
- [NA] is not allowed if A3, A4, or A7 = Yes. [NA] means treatment and outcome are implemented exactly as stated in the research question.
- Construct validity asks whether the treatment as implemented and the outcome as measured really capture the concepts named in the research question. The concrete implementation of a concept (fine-tuning on private data for "pre-training on private data"; one benchmark score for "reasoning ability") is its *operationalization*. Two gaps can open:
  - *Treatment:* two treatments that look alike can act on the outcome in different ways, so the measured effect may be a different effect than the one claimed. Example: multi-epoch fine-tuning memorizes far more than single-epoch pre-training, so it overestimates privacy leakage.
  - *Outcome:* the treatment may affect the measured outcome but not the outcome of interest, or vice versa. Example: improvement in "validation loss" does not necessarily reflect improvement in "reasoning capabilities".
- A [Yes] requires an argument that the effects coincide (treatment) or that the two outcomes move together (outcome), or claims aligned with what was implemented and measured. Answer [No] if either applicable gap is undiscussed, and name it.
