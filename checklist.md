# A Checklist for Foundation Model Research

Here we present the full checklist for authors and reviewers.

**How to use this checklist**

- **Part A** of the checklist identifies the approximation strategies used in a paper or experiment. For the most common approximation strategies, authors are asked to answer whether this strategy is used in the paper.
- **Part B** of the checklist is used to identify and discuss threats to the validity of the respective approximation strategies. Every paper is required to *properly discuss* these threats: it might name them and argue them away, test them, bound them, or limit its claims.
- **Authors** must discuss all relevant threats to the validity of the employed research strategies. **Reviewers** may instead indicate whether a paper does or does not discuss a particular threat. To do so, reviewers can assign [Yes]/[No]/[Partly] labels to the questions in Part B of the checklist.

## Part A — Research Question and Approximation Strategies

Please detail the methodology that is used in the paper.

### A1. What is the research question?

**Research question:** [one sentence naming treatment, outcome, and target model]
**Conclusions:** [list the main conclusions that the paper draws from its experiments]

Guidelines:
- The **treatment** is the change to the training recipe or data whose effect the paper wants to know (e.g., adding math data to the pre-training mix, lowering the learning rate, including a document in the training set). The **control** is the same setup without that change.
- The **outcome** is the property measured to see the effect (e.g., a benchmark score, the training loss, how well a document is memorized).
- The **target model** is the model that the paper's *conclusions* are about. It may be larger, or trained differently, than the model that the paper actually trains. There can be multiple target models, for example, when a paper claims that transformers can perform length generalization.
- A **unit** is the thing that does or does not receive the treatment and on which the outcome is measured. This can be a training run, a dataset, a document, or a token. Usually, there are multiple units in a single experiment. Units with the treatment form the **treatment group**, units without it the **control group**.
- Example: How does the MMLU benchmark score (outcome) of Olmo 3 32B (target model) change when we remove all math competition data from its pretraining data (treatment)?

### A2. Do the experiments involve proxy models?

**Answer:** [Yes] / [No]
**If [Yes]:** [which experiments are performed with proxy models?]

Guidelines:
- A proxy model is a model that is smaller or cheaper to train than the target model, and that stands in for it in the experiments.
- Example: A single 1B parameter model is used instead of a 32B parameter model, or a series of smaller models and a scaling law are used to predict behavior at larger scale.
- If the answer is [Yes], then the external validity of the proxy models has to be addressed in Part B.

### A3. Do the experiments involve proxy treatments?

**Answer:** [Yes] / [No]
**If [Yes]:** [which experiments are performed with proxy treatments?]

Guidelines:
- A proxy treatment replaces the expensive treatment that the paper cares about with a stand-in that is cheaper to compute, observe or implement.
- Example: A model is fine-tuned on private data instead of pretrained on it, or per-domain loss is used as a stand-in for unobserved data-mixture weights.
- If the answer is [Yes], then the construct validity of the treatment has to be addressed in Part B.

### A4. Do the experiments involve proxy outcomes?

**Answer:** [Yes] / [No]
**If [Yes]:** [which proxy outcomes does the paper measure?]

Guidelines:
- A proxy outcome replaces the outcome the paper cares about with a cheaper stand-in.
- Example: The validation loss stands in for performance on a task that we care about, or a small subset of benchmark questions stand in for the full benchmark.
- If the answer is [Yes], then the construct validity of the outcome has to be addressed in Part B.

### A5. Do the experiments involve observational data?

**Answer:** [Yes] / [No]
**If [Yes]:** [which experiments involve observational data?]

Guidelines:
- Data is *experimental* if the researchers decided which units receive the treatment (they ran the training runs, ablations, or hyperparameter sweeps themselves). It is *observational* if the training runs already existed and someone else made those decisions, so the researchers did not control and do not know how the treatment was assigned.
- Example: Relating recipe choices to benchmark scores across publicly released models; analyzing released checkpoints of an existing model suite; using leaderboards or model cards.
- If the answer is [Yes], then *all* validity types have to be addressed in Part B.

### A6. Do the experiments treat elements of a single training run as independent units?

**Answer:** [Yes] / [No]
**If [Yes]:** [which experiments, and what are the units?]

Guidelines:
- This strategy emulates two or more training runs from a single run: elements of the run (documents, tokens, subwords, …) are treated as independently treatable units, each with its own treatment status and outcome.
- Example: Documents in the training set form the treatment group, held-out documents the control group, and the model's loss on each document is its outcome.
- If the answer is [Yes], then internal and external validity have to be addressed in Part B.

### A7. Do the experiments use theoretical controls?

**Answer:** [Yes] / [No]
**If [Yes]:** [which experiments use theoretical controls?]

Guidelines:
- A theoretical control is an outcome that was not measured but computed from theory: the paper analytically approximates what the outcome *would have been* under the treatment or under the control, and compares against that.
- Example: Influence functions analytically approximating "what if this data point were not in the training data".
- If the answer is [Yes], then external validity and construct validity have to be addressed in Part B.

### A8. Do the experiments involve other approximations?

**Answer:** [Yes] / [No]
**If [Yes]:** [which other approximations are performed?]

Guidelines:
- List any way in which the design deviates from the ideal experiment that is not covered by the previous questions.
- Example: Measuring the outcome only at coarse checkpoint intervals; analyzing a subsample of the units; having access to a dataset that is iid. but not included in the training data.
- If the answer is [Yes], address any validity types that the approximations threaten in Part B. If you are unsure about the validity types, you can use the field at the end of Part B.

## Part B — Validity

Please answer how the paper addresses the validity threats that arise from the approximation strategies identified in Part A. The guidelines provide details about the validity threats that are associated with different approximation strategies. A label such as [A5-IV1] names the Part A question that makes the bullet point applicable, the validity type, and a running number; the labels are those of the paper.

### SV. Statistical validity

**Question:** How does the paper discuss and establish that its main result reflects a real effect, and is not due to noise, a poorly fitted curve, or picking the best of many comparisons?
**Answer:**

Guidelines:
- **All papers have to address this question.**
- The paper needs to report error bars and say which source of randomness they capture.
- The critical question is what would come out if all models were re-trained with different random seeds. Example: The difference between two training recipes can be smaller than the seed-to-seed variation within one training recipe.
- If the paper reports the best of many noisy comparisons (arms, benchmarks, checkpoints), then the result may look strong by chance. Example: Evaluating many model variants on benchmark data before publishing the best score.
- If the paper relies on multiple units that are not independent, then the estimate is less precise than what the raw sample count suggests. Example: Multiple fine-tunes of one base model are not independent units.
- If the paper fits a functional form (for example, linear regression or a power-law), then the paper needs to justify or test the assumed form, and report the quality of the fit. Example: Scaling laws often use a power-law relationship, and this functional form has been validated in multiple papers. [A2, proxy models]
- If the experiments involve observational data from public training runs, then the paper needs to establish that the sample size is large enough, and account for noise in the estimate. Example: The number of frontier training runs is small. [A5-SV1]
- If the experiments use theoretical controls, then the paper needs to discuss the statistical assumptions of the approximation. In general, theoretical controls are approximations that often rely on strong statistical assumptions. Example: Influence functions accurately capture the leave-one-out retraining effect for simple models like linear or logistic regression, but the same might not be true for transformers. [A7-SV1]

### IV. Internal validity

**Question:** How does the paper discuss and establish that its main result is a genuine causal effect of the treatment?
**Answer:**

Guidelines:
- If treatments are assigned to separate, independent training runs and treatment and control groups differ in nothing but the treatment, then the measured effect reflects a *causal* effect of the treatment.
- If there is some other difference between the treatment and control groups or an influence of individual units on each other, then the association between treatment and outcome is only causal under *identifying assumptions*.
- If the experiments involve observational data, then the paper needs to establish that treatment and control groups do not differ systematically in anything other than the treatment. This may fail due to *confounders* (third factors that influence both which units get the treatment and their outcome) or *selection bias* (units enter the sample in a way that depends on treatment and outcome, e.g., only the best-performing models are published). The paper may adjust for measured confounders, which requires that groups are comparable once those confounders are held fixed. Example: Architecture and training data composition are confounded by calendar time. Therefore, an observed correlation between architecture and benchmark score may actually be caused by data composition. [A5-IV1]
- If the experiments involve observational data, then the paper needs to establish that every treatment value the paper draws conclusions about occurs in the sample among otherwise comparable units. When other variables are adjusted for, this has to be the case within every combination of those variables. Effects of treatment values that no unit received can only be extrapolated, not estimated. Example: If a document is not included in any training run in the sample, we cannot estimate its effect. [A5-IV2]
- If the experiments involve observational data, then the paper needs to establish that each unit's outcome depends only on its own treatment, not on the treatments other units received. Example: This might not be the case when units share training data or evaluation pools across training runs. [A5-IV3]
- If the experiments involve observational data, then the paper needs to establish that all treated units received the same version of the treatment. Example: "Document is in the training set" hides deduplication, number of epochs, and data ordering. [A5-IV3]
- If the experiments use theoretical controls or treat elements of a single training run as independent units, then the paper needs to establish that each unit's outcome depends only on its own treatment, not on the treatments other units received. In particular, the paper needs to establish that the outcome of control units is not affected by the presence of the treatments. Example: When we add additional documents to the training data, this can change the final loss of documents that were previously in the training data. Example: Training on canary i may affect the outcome for canary j. [A6-IV2] [A7-IV1]
- If the experiments treat elements of a single training run as independent units, then the paper needs to establish that the treated and the control units do not differ systematically. Example: The within-run estimate overestimates memorization when the treated units are sampled randomly, and the untreated units reflect near training duplicates, a particular domain (code), or especially hard examples. [A6-IV1]
- If the paper uses difference-in-differences estimators, instrumental variables, or a regression discontinuity design, then the paper needs to discuss the assumptions of that strategy. Example: Difference-in-differences assumes parallel trends, that is, that treated and untreated units would have developed alike without the treatment. [A6-IV1]

### EV. External validity

**Question:** If the paper draws conclusions about a target model or setting that are different from what is studied, how does the paper discuss and establish the validity of the conclusions about the target setting?
**Answer:**

Guidelines:
- This could be addressed by verification in the target setting, an argument about established behavior (for example, the scaling behavior of the quantity is known from the literature), or claims explicitly limited to what is studied.
- If the experiments involve proxy models, then the paper needs to argue why its conclusions also hold for the target model. In general, effects measured on proxy models can change in size, or even in sign, as the model size or the amount of training data is being increased. Example: The optimal learning rate often decreases with model size; the best value at 1B can be wrong at 70B. [A2-EV1]
- If the target setting involves models trained with a different training recipe, then the paper needs to argue why the measured effect holds for the target training recipe as well. In general, any measured effect can critically depend on factors that were held fixed in the experiments. If such a factor is changed, then the size, or even the sign, of the effect can change as well. Example: The conclusions from a data-selection experiment can flip when the architecture or other hyperparameters are changed. [A2-EV2]
- If the experiments involve observational data and pool data from many model families, then the measured effect is an average over the pooled recipes, and the effect for the target training recipe could be different. Example: Scaling law coefficients change with the pretraining data composition. [A5-EV1]
- If the paper measures an average effect, then this effect could hide that individual units or subgroups react differently to the treatment. Example: A small average memorization effect for a group of documents is compatible with strong memorization of individual documents. [A6-EV1]
- If the training recipe is modified to obtain a theoretical control, then the measured effect applies to the modified recipe rather than the target training recipe. Example: Injecting "canary" data modifies the training recipe, so any estimate applies to the modified recipe rather than the target training recipe. [A7-EV1]

### CV. Construct validity

**Question:** If the implemented treatment or the measured outcome differs from the treatment or outcome named in the conclusions, how does the paper discuss and establish whether findings about the one carry over to the other?
**Answer:**

Guidelines:
- This could be addressed by an argument that the effects coincide (treatment) or that the two outcomes move together (outcome), or claims aligned with what was implemented and measured.
- The critical question is whether the treatment as implemented and the outcome as measured really capture the concepts named in the research question and conclusions. The concrete implementation of a concept is its *operationalization* (for example, a paper might operationalize the concept "reasoning ability" by measuring a benchmark score).
- If the experiments involve proxy treatments, then the paper needs to argue that the proxy acts on the outcome in the same way that the original treatment would. In general, two treatments that look alike can act on the outcome in different ways, so the effect measured under the proxy may be different from the one that would be measured under the original treatment. Example: Multi-epoch fine-tuning memorizes far more than single-epoch pre-training. Therefore, multi-epoch fine-tuning is not a good proxy to measure privacy leakage during pre-training. [A3-CV1]
- If the experiments involve proxy outcomes, then the paper needs to argue that the proxy reacts to the treatment in the same way that the original outcome would. In general, the treatment may affect the measured outcome but not the outcome of interest, or vice versa. Example: An improvement in the validation loss after pretraining is not always guaranteed to improve performance after post-training. Therefore, the validation loss after pretraining is an imperfect proxy for post-training performance. [A4-CV1]
- If the experiments involve observational data, then they might implicitly involve proxy outcomes or proxy treatments, because the treatment and outcome of interest are often not documented. If this is the case, then the construct validity of the proxies needs to be addressed. [A5-CV1]
- If the experiments use theoretical controls, then the approximation might implicitly involve proxy treatments. If this is the case, then the construct validity of the proxy needs to be addressed. Example: Influence functions replace the effect of "removing one data point" with "reducing the weight of one data point". [A7-CV1]

### OT. Other threats

**Question:** Does the validity of the paper's conclusions require other assumptions, including assumptions that do not result from approximating the ideal experiment?
**Answer:** [Yes] / [No]
**If [Yes]:** [which other assumptions are required, and does the paper discuss these assumptions?]

Guidelines:
- Here you can list any assumption or threat to the validity of the paper's conclusions.
- Use this field if the paper uses a novel approximation strategy and you are unsure about the validity types.
