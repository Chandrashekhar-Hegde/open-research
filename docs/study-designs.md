# Choosing a study design

Choose a research area, describe the goal, then compare suitable designs. Areas
change examples and context; they do not determine or restrict the method.
These are starting patterns, not a validated decision algorithm or an exhaustive taxonomy.

The catalog was informed by the sources below. Reporting standards help document
work; they cannot establish a valid design, sample size, approval or conclusion.

## Research areas

### Medical & health

Clinical / patient care, Public health / epidemiology, Biomedical / laboratory, Health services.

Define the population, clinically meaningful outcome, data access and applicable participant review. A laboratory study and a patient trial need different procedures.

### Engineering

Materials / manufacturing, Energy / mechanical systems, Civil / infrastructure, Electronics / devices.

Define physical units, calibration, operating conditions, independent test units and acceptable failure or safety limits.

### Materials science

Metals and alloys, Polymers and composites, Ceramics and functional materials, Surfaces and interfaces.

Connect processing, structure, properties and performance. Track independent batches, specimen history and characterization; repeated scans are not independent specimens.

### Chemistry

Organic chemistry, Physical chemistry, Experimental and analytical chemistry.

Choose the chemical claim first: identity, yield, mechanism, rate or measurement performance. Preserve sample identity, conditions, calibration and raw characterization.

### Experimental physics

Optics and spectroscopy, Condensed matter, Nuclear and particle measurements, Instrumentation and metrology.

Define the measurand, instrument response and uncertainty model. Separate random variation, drift, background and calibration effects.

### Mathematics

Pure mathematics, Applied / numerical mathematics, Game theory / decision models.

State domains and assumptions. Separate a proof, numerical evidence and an empirical claim about a real system.

### Software & computing

Software / systems, AI / machine learning, Human–computer interaction, Security / networks.

Specify software versions, workload or dataset, baseline, leakage controls, hardware and the claim the evaluation can support.

### Social & behavioral

Education, Psychology / behavior, Policy / organizations, Economics / decision-making.

Describe the setting, sampling, measurement meaning, participant protections and researcher relationship to the material.

### Environment & agriculture

Climate / earth systems, Ecology / conservation, Agriculture / food, Water / environmental monitoring.

Record spatial and temporal coverage, calibration, seasonality, site selection and dependence between observations.

### Other / interdisciplinary

Across multiple disciplines, Humanities / interpretive work, Another area.

Name the discipline and combine relevant methods explicitly. These starting patterns do not cover every specialized research tradition.

## Test whether a change makes a difference

You want to compare an intervention, policy, treatment or controlled factor.

### Randomized comparison

**Use when:** You can assign independent units to alternatives by chance.

**Requires:** A justified comparison, allocation process, feasible independent units and an outcome measured consistently.

**Watch for:** If assignment is infeasible, consider a quasi-experiment; if nothing is assigned, consider observation.

**Example question:** Does a reminder improve appointment attendance compared with usual communication?

**Work sequence:**

1. Define outcome and comparison.
2. Justify sample precision and obtain applicable permissions.
3. Generate and retain allocation.
4. Collect outcomes and deviations.
5. Estimate effect and sensitivity.

**Analysis:** Estimate the declared between-group effect and uncertainty, accounting for clusters, repeated measures and missing outcomes. Do not select a test from outcome type alone.

**Decisions to record:**

- What is randomized?: Specify people, sites or test units; conceal the allocation where relevant.
- Which effect will you estimate?: Specify the outcome, follow-up, assignment-based analysis and handling of nonadherence.

CLI: `python research.py designs --pattern randomized`

### Factorial experiment

**Use when:** You can vary two or more factors and want to learn about their interactions.

**Requires:** Physical or operational levels, a balanced or justified design, random run order and independent replication.

**Watch for:** A long list of factors with too few runs may confound effects; repeated readings are not replication.

**Example question:** How do temperature and feed rate affect the yield of a manufacturing process?

**Work sequence:**

1. Set objective and operating range.
2. Choose factors, levels and blocks.
3. Randomize and pilot measurements.
4. Collect independent runs.
5. Estimate contrasts and model checks.

**Analysis:** Estimate factor and interaction contrasts using the actual design; account for blocks and inspect residuals. A noiseless demonstration cannot supply uncertainty for a real process.

**Decisions to record:**

- Map coded factors to real levels: Give low/high values and units; never use coded -1/+1 as unexplained physical settings.
- Which interactions matter?: Prespecify contrasts, blocks, aliasing if fractional, and independent replication.

CLI: `python research.py designs --pattern factorial`

### Quasi-experiment

**Use when:** A change happens without random assignment, and a credible comparison is available.

**Requires:** Timing, a comparison strategy and an explicit identification argument.

**Watch for:** A simple before/after difference alone does not separate the change from time trends.

**Example question:** Did a new service policy change waiting times relative to comparable services?

**Work sequence:**

1. Describe change and comparison.
2. Specify identification assumptions.
3. Inspect pre-change evidence.
4. Estimate the declared contrast.
5. Challenge assumptions and explain limits.

**Analysis:** Choose analysis for the identification design; inspect pre-trends when relevant, alternative specifications and uncertainty. Preserve concurrent explanations.

**Decisions to record:**

- Why is the comparison credible?: State the assignment mechanism and the assumptions for discontinuity, differences-in-differences or another design.
- How will assumptions be challenged?: Record pre-periods, concurrent changes, placebo checks and dependence.

CLI: `python research.py designs --pattern quasi`

## Describe patterns in existing observations

You measure what happens without assigning the exposure.

### Cross-sectional snapshot

**Use when:** You need prevalence, characteristics or associations in a defined time window.

**Requires:** A sampling frame, denominators, a time window and comparable measurements.

**Watch for:** A snapshot generally cannot establish whether exposure preceded outcome.

**Example question:** What proportion of sampled households report a service interruption this month?

**Work sequence:**

1. Define population and window.
2. Select sampling and measures.
3. Record participation and missingness.
4. Estimate descriptive quantities.
5. Explain selection and time-order limits.

**Analysis:** Report estimates with denominators and sampling uncertainty where justified; account for survey design and missingness. Keep association separate from causation.

**Decisions to record:**

- Who is in the denominator?: Define eligibility, response rate, weighting and exclusions.
- What does the snapshot cover?: Record the observation period and whether variables refer to the same window.

CLI: `python research.py designs --pattern cross-sectional`

### Cohort / follow-up study

**Use when:** You follow a defined group from exposure or baseline to later outcomes.

**Requires:** Time origin, eligibility, follow-up, exposure definitions and attrition records.

**Watch for:** Outcome-based sampling calls for another design; unequal follow-up can bias simple proportions.

**Example question:** How does return-to-work over six months differ across baseline job conditions?

**Work sequence:**

1. Define cohort and time origin.
2. Specify exposures and confounders.
3. Record outcomes and follow-up.
4. Analyze risk or event timing.
5. Assess attrition and alternative explanations.

**Analysis:** Estimate risks, rates or time-to-event quantities suited to follow-up. Account for censoring and confounding; sensitivity matters more than a causal label.

**Decisions to record:**

- Set time zero and follow-up: Define entry, exposure timing, censoring, loss to follow-up and outcome ascertainment.
- Plan confounding control: Choose covariates from the causal question; avoid adjusting indiscriminately for post-exposure variables.

CLI: `python research.py designs --pattern cohort`

### Case–control study

**Use when:** You start with people or units with an outcome and sample controls from its source population.

**Requires:** Case definition, control selection mechanism and exposure information from the relevant period.

**Watch for:** The sampled case fraction does not estimate population disease prevalence.

**Example question:** Is a prior workplace exposure associated with a rare health outcome?

**Work sequence:**

1. Define cases and source population.
2. Select controls with a justified scheme.
3. Ascertain prior exposures.
4. Analyze respecting sampling and matching.
5. Assess recall and selection bias.

**Analysis:** Estimate a sampling-appropriate association, often an odds ratio, accounting for matching and confounding. State conditions before interpreting it as another risk measure.

**Decisions to record:**

- How are controls selected?: Explain the source population, sampling time and matching, if any.
- How is prior exposure measured?: Specify records, recall period, blinding and differential measurement risks.

CLI: `python research.py designs --pattern case-control`

### Time-series / repeated monitoring

**Use when:** The same system is measured repeatedly and temporal patterns matter.

**Requires:** Timestamps, coverage, units, missing periods and known changes in measurement.

**Watch for:** Treating dependent time points as independent samples gives misleading uncertainty.

**Example question:** How did monthly concentration at one monitoring station change between two years?

**Work sequence:**

1. Bound system and time window.
2. Check measurement continuity.
3. Inspect missingness and seasonality.
4. Compute the declared summary or time model.
5. Assess sensitivity and scope.

**Analysis:** Plot and inspect time ordering, trend and seasonality; use a model suitable for dependence if making inference. A frozen descriptive difference needs no invented p-value.

**Decisions to record:**

- Define time resolution and coverage: State aggregation, missing intervals, station or system changes and the time window.
- How will trends and seasonality be handled?: Distinguish a descriptive comparison, forecasting and intervention analysis.

CLI: `python research.py designs --pattern time-series`

### Survey / questionnaire study

**Use when:** You need structured responses about attitudes, practices or characteristics.

**Requires:** An instrument, target population, sampling frame, piloting and nonresponse plan.

**Watch for:** Convenience responses are not automatically representative; a questionnaire is a collection method, not proof of causality.

**Example question:** Which data-management practices do researchers in a defined institution report using?

**Work sequence:**

1. Define constructs and population.
2. Develop and pilot instrument.
3. Sample and record invitations.
4. Analyze with design-aware denominators.
5. Assess measurement and nonresponse limits.

**Analysis:** Analyze responses in relation to the sampling and measurement design. Report denominators and nonresponse, and avoid treating ordinal responses as interval data without justification.

**Decisions to record:**

- How are questions and constructs justified?: Use appropriate existing measures or document development and cognitive piloting.
- How will participation bias be assessed?: Define invitations, denominators, response rate, missing items and weighting if warranted.

CLI: `python research.py designs --pattern survey`

## Evaluate a test or predict an outcome

You need to assess diagnostic accuracy or predictions on separate evidence.

### Diagnostic accuracy study

**Use when:** You compare an index test against an appropriate reference standard.

**Requires:** The target condition, prespecified threshold, reference method and representative sampling.

**Watch for:** Accuracy in selected cases may not transfer to screening populations; prediction is a different question.

**Example question:** At a prespecified threshold, how often does a test agree with a reference condition?

**Work sequence:**

1. Define target condition and threshold.
2. Recruit the intended spectrum.
3. Apply index and reference procedures.
4. Count outcomes including failures.
5. Estimate accuracy and investigate bias.

**Analysis:** Retain the 2×2 table, calculate sensitivity and specificity with justified intervals, and report predictive values in context of prevalence. A synthetic table does not validate a test.

**Decisions to record:**

- Define the reference and threshold: Specify independent assessment, timing, masking, indeterminate cases and verification.
- Who receives both tests?: Record participant spectrum, test failures and exclusions; avoid selective verification.

CLI: `python research.py designs --pattern diagnostic`

### Prediction / model validation

**Use when:** You need to predict outcomes in data that were not used to fit or tune the model.

**Requires:** A defined prediction time, target, baseline, split strategy and independent evaluation units.

**Watch for:** Leakage or repeated tuning on the test set invalidates the claimed held-out evaluation.

**Example question:** Does a prediction model reduce absolute error compared with a prespecified baseline on held-out cases?

**Work sequence:**

1. Define deployment target and time.
2. Separate train, validation and test units.
3. Fit preprocessing using training only.
4. Evaluate once with baseline.
5. Inspect failures, shift and calibration.

**Analysis:** Compare with a declared baseline on the same held-out units; report uncertainty, calibration or error distribution and failures. Association or accuracy alone does not establish clinical or social benefit.

**Decisions to record:**

- What stays unseen during fitting?: Define grouping or temporal splitting, preprocessing, tuning and a protected test set.
- Which metrics and failure cases matter?: Choose calibration, discrimination or error metrics appropriate to the task and subgroup coverage.

CLI: `python research.py designs --pattern prediction`

## Build or compare a tool or system

You need to evaluate an artifact against a baseline or requirement.

### Comparative benchmark

**Use when:** You compare implementations on a declared set of workloads and metrics.

**Requires:** Correctness checks, identical inputs, versions, environment and a fair baseline.

**Watch for:** One small workload or operation count cannot establish general speed or real-user benefit.

**Example question:** How many key comparisons do linear and binary search need on the same sorted inputs?

**Work sequence:**

1. Bound performance claim.
2. Specify workloads and baselines.
3. Check implementation correctness.
4. Measure declared metrics.
5. Report distribution, failures and scope.

**Analysis:** Check correctness first; summarize paired performance over workloads and repeats. Distinguish counted operations from elapsed time; retain outliers and failures.

**Decisions to record:**

- Which workloads represent the claim?: Define sizes, distributions, failed queries, warm-up and repeat strategy for timing.
- How is the comparison kept fair?: Use equal inputs, verified correctness, versions, hardware and resource limits.

CLI: `python research.py designs --pattern benchmark`

### Build-and-evaluate artifact

**Use when:** You create a tool, process or design and evaluate whether it meets a demonstrated need.

**Requires:** Stakeholder requirements, design rationale, baseline and a credible evaluation context.

**Watch for:** A screenshot or implemented feature alone does not show usefulness or effectiveness.

**Example question:** Can a new inspection tool identify specified defects under realistic operating constraints?

**Work sequence:**

1. Establish problem and requirements.
2. Develop a traceable design.
3. Choose an evaluation method.
4. Test against baselines.
5. Revise and retain failure evidence.

**Analysis:** Evaluate against requirements and alternatives using justified bench tests, field evidence or user methods. Report tradeoffs and negative cases; choose an empirical design for each claim.

**Decisions to record:**

- What evidence defines success?: Map each requirement to a measurable acceptance criterion and stakeholder need.
- How will the artifact be evaluated?: Specify comparator, test cases or user study, failures and iteration records.

CLI: `python research.py designs --pattern artifact`

## Understand experiences or a specific case

You need context and interpretation from interviews, documents or observations.

### Qualitative interviews / observation

**Use when:** You need accounts, practices and contextual meaning rather than only a numerical outcome.

**Requires:** A justified sampling strategy, permitted recordings or field notes and an interpretive approach.

**Watch for:** Code frequency alone is not thematic understanding; do not fabricate quotations or saturation.

**Example question:** How do researchers describe barriers when moving a study plan into actual analysis?

**Work sequence:**

1. Bound phenomenon and researcher position.
2. Recruit and collect permitted material.
3. Develop interpretations through documented analysis.
4. Seek contradictory cases.
5. Connect claims to contextual excerpts.

**Analysis:** Apply the chosen interpretive method to source material, retaining context, reflexivity and negative cases. Agreement statistics are not mandatory for every qualitative tradition.

**Decisions to record:**

- Whose perspectives are needed?: State purposive or other sampling rationale, access and relevant variation.
- How will interpretation stay traceable?: Name the analytic approach, reflexive memos, source excerpts and contradictory cases.

CLI: `python research.py designs --pattern interviews`

### Contextual case study

**Use when:** You examine a bounded case in its real setting using multiple sources.

**Requires:** Case boundaries, selection rationale, access and a chain linking evidence to interpretation.

**Watch for:** One case is not a representative sample of every setting; case studies can use quantitative evidence too.

**Example question:** How did one engineering team introduce a new inspection practice, and what shaped its use?

**Work sequence:**

1. Define case and question.
2. Plan evidence sources.
3. Collect and retain a chain of evidence.
4. Compare explanations.
5. Report boundaries and transfer limits.

**Analysis:** Build a case account with triangulated evidence and alternative explanations. State the basis for analytical transfer rather than statistical generalization.

**Decisions to record:**

- What bounds the case?: Define organization, event or system, time span and rationale for selection.
- How will sources be compared?: Specify documents, interviews or measures, conflicting evidence and alternative explanations.

CLI: `python research.py designs --pattern case-study`

## Find out what existing research supports

You need a documented review or a map of a research area.

### Systematic review

**Use when:** You need a reproducible answer to a focused question from eligible studies.

**Requires:** A protocol, searchable sources, eligibility, screening, extraction and risk-of-bias appraisal.

**Watch for:** Pooling is optional and requires compatible estimands and defensible assumptions.

**Example question:** What do controlled studies show about reminders and missed appointments?

**Work sequence:**

1. Write protocol and eligibility.
2. Search and retain queries.
3. Screen with reasons.
4. Extract and appraise.
5. Synthesize with coverage and bias limits.

**Analysis:** Synthesize findings with bias and certainty limits; justify any meta-analysis and investigate heterogeneity. Record exclusions and avoid counting papers as votes.

**Decisions to record:**

- Which studies can answer this question?: Define population, intervention/exposure, outcomes, designs and exclusions before screening.
- How will evidence be combined?: Specify appraisal, duplicate handling, narrative or quantitative synthesis and heterogeneity.

CLI: `python research.py designs --pattern systematic`

### Scoping review / evidence map

**Use when:** You want to map concepts, methods and gaps across a broad area.

**Requires:** A bounded scope, systematic search and selection, and a charting framework.

**Watch for:** A map of available literature does not by itself establish intervention effectiveness.

**Example question:** Which methods are used to evaluate research-planning tools, and what outcomes are measured?

**Work sequence:**

1. Bound concepts and context.
2. Search and screen transparently.
3. Chart methods and outcomes.
4. Map gaps without inventing absence.
5. Report coverage and deviations.

**Analysis:** Map the distribution of concepts and evidence with a transparent charting process. Do not present publication counts as quality or effectiveness.

**Decisions to record:**

- What concepts and settings are included?: Define the population or source type, concept and context.
- What will be charted?: Define categories, iterative changes, screening and coverage limitations.

CLI: `python research.py designs --pattern scoping`

## Prove, simulate or model decisions

You work with explicit mathematical assumptions, models or algorithms.

### Computational simulation

**Use when:** You study a system by executing an explicit model under controlled scenarios.

**Requires:** Equations or rules, parameters, numerical method, seeds and checks against known behavior.

**Watch for:** A model run is not an observation of the real system; calibration is not validation.

**Example question:** How does time-step size affect Euler approximation of exponential decay?

**Work sequence:**

1. Define model and domain.
2. Choose numerical method.
3. Verify known cases.
4. Run scenarios and sensitivity.
5. Compare with real evidence only if available.

**Analysis:** Compare with analytical or independently verified cases, test convergence and vary assumptions. Report discretization and model uncertainty separately.

**Decisions to record:**

- What system and assumptions are represented?: Define equations, parameters, units, initial and boundary conditions.
- How will numerical and model error be separated?: Specify analytic checks, convergence, sensitivity and any external validation data.

CLI: `python research.py designs --pattern simulation`

### Mathematical proof / derivation

**Use when:** The claim follows from definitions and assumptions and needs a logically complete argument.

**Requires:** A precise statement, domains, definitions and valid inference steps.

**Watch for:** Numerical agreement or symbolic software output alone is not a proof of a general claim.

**Example question:** Under what assumptions does a proposed recurrence have the claimed closed form?

**Work sequence:**

1. Formalize the statement.
2. Choose proof strategy.
3. Establish lemmas and steps.
4. Check boundary cases and counterexamples.
5. State scope of the proven claim.

**Analysis:** Check each implication, boundary case and assumption; use symbolic or numerical tools as aids with their domains explicit. Distinguish a verified identity from an empirical conclusion.

**Decisions to record:**

- State the exact claim and domain: List quantified variables, assumptions and exceptional cases.
- What proof strategy and checks will you use?: Record lemmas, induction or construction, boundary cases and possible counterexamples.

CLI: `python research.py designs --pattern proof`

### Game-theory model

**Use when:** Outcomes depend on decisions by interacting players with specified incentives.

**Requires:** Players, feasible strategies, payoffs, information, timing and a solution concept.

**Watch for:** Assumed payoffs and equilibrium calculations do not establish how people actually behave.

**Example question:** Which pure-strategy equilibria exist under an explicitly stated two-player payoff matrix?

**Work sequence:**

1. Define players and rules.
2. Specify payoff basis.
3. Solve declared equilibrium conditions.
4. Check deviations and sensitivity.
5. Separate model conclusions from behavioral claims.

**Analysis:** Check unilateral deviations or the chosen equilibrium condition and vary payoffs. Report multiple or absent pure equilibria; do not rule out mixed solutions without checking.

**Decisions to record:**

- Where do incentives come from?: Separate assumed payoffs, measured estimates and institutional rules.
- What deviations must be checked?: Specify pure or mixed strategies, information assumptions and alternative solution concepts.

CLI: `python research.py designs --pattern game`

## Connect measurements with experiences

Your question needs quantitative and qualitative evidence integrated together.

### Mixed-methods study

**Use when:** The question needs both measurements and contextual accounts, with an explicit connection.

**Requires:** A rationale for both components, sequence or concurrency and an integration plan.

**Watch for:** Collecting a survey and interviews without integrating findings is not sufficient.

**Example question:** Where does a planning tool cause delays, and how do users explain those delays?

**Work sequence:**

1. State why both forms of evidence are needed.
2. Plan sampling and connection.
3. Collect and analyze each component.
4. Integrate results and contradictions.
5. Explain combined and separate limitations.

**Analysis:** Analyze each component with its own justified method, then integrate at the prespecified points. Keep discrepancies visible and bound combined inferences.

**Decisions to record:**

- How are the components connected?: Specify sequential or concurrent design, sampling links and which component informs the other.
- How will agreement and disagreement be interpreted?: Plan a joint display or other integration; retain conflicting findings and limits of each component.

CLI: `python research.py designs --pattern mixed`

## Sources and scope

Catalog guidance is an implementation choice; these sources have not evaluated
the selector. Use relevant domain and methodological expertise for the actual study.

- [NIST: choosing experimental designs](https://www.itl.nist.gov/div898/handbook/pri/section3/pri3.htm)
- [NIH: clinical research basics](https://www.nih.gov/health-information/nih-clinical-research-trials-you/basics)
- [EQUATOR: reporting by study type](https://www.equator-network.org/reporting-guidelines/)
- [ACM SIGSOFT: empirical standards](https://www2.sigsoft.org/EmpiricalStandards/)
- [PRISMA: review reporting](https://www.prisma-statement.org/prisma-2020)
- [FDA: diagnostic-test result reporting](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/statistical-guidance-reporting-results-studies-evaluating-diagnostic-tests-guidance-industry-and-fda)
- [MIT: numerical methods for differential equations](https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/pages/unit-i-first-order-differential-equations/numerical-methods/)
- [MIT: Mathematics for Computer Science](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/)
- [BIPM / JCGM — measurement uncertainty and modelling](https://www.bipm.org/en/committees/jc/jcgm/publications)
- [Royal Society of Chemistry — experimental reporting](https://www.rsc.org/publishing/publish-with-us/publish-a-journal-article/experimental-reporting)
- [ICMJE — manuscript preparation](https://icmje.org/recommendations/browse/manuscript-preparation/preparing-for-submission.html)
- [APS — author guidance and journal requirements](https://journals.aps.org/authors)
- [Quarto — rendering Word documents](https://quarto.org/docs/output-formats/ms-word.html)
- [MIT OpenCourseWare — Nash equilibrium and game representation](https://ocw.mit.edu/courses/14-12-economic-applications-of-game-theory-fall-2025/resources/lecture-notes/)

[Implementation plan](study-design-plan.md) · [Methodology](methodology.md)
