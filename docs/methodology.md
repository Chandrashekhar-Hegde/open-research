# Choose and conduct a study

Start with the answer you need, not the software or paper format. This is a
practical map of major study families, not complete training in every discipline.
A method specialist and the relevant institutional process remain necessary for
work that exceeds your expertise or involves regulated activities.

## The order and its purpose

1. **Research:** define a bounded question, who needs the answer, prior evidence,
   and what observation would change your understanding. An exploratory question
   is legitimate; do not relabel it as a prior hypothesis after seeing results.
2. **Plan:** choose a design, define units and outcomes, sampling, permissions,
   measurement and analysis. Pilot feasibility without treating the pilot as
   definitive confirmation. Record exclusions and stopping rules before results.
3. **Inspect:** acquire permitted observations or sources, preserve originals,
   document provenance and units, and record quality problems before analysis.
4. **Analyze:** execute the specified calculation or interpretive procedure,
   inspect assumptions, compare alternatives and retain negative findings.
5. **Write:** connect each claim to the actual evidence and method. Explain the
   practical implication, uncertainty and what the design cannot establish.
6. **Review and share:** check source fidelity, rerun code, seek appropriate
   independent review, resolve discrepancies, and publish permitted artifacts.

You may return to earlier stages. Date changes and explain whether outcomes were
already visible. A saved file is not preregistration; use a registry when a
registered plan is appropriate. [COS explains preregistration and transparent
changes](https://www.cos.io/initiatives/prereg). Research without new participants
can still be real research: secondary analysis, synthesis and mathematical work
have different evidence requirements.

## Controlled experiment

**Use when:** you can ethically manipulate an intervention to estimate an effect
or understand factor interactions. Define the causal contrast and independent
experimental unit before choosing a test.

**Prepare:** operational outcomes and units, factors and levels, a control or
comparison, sampling frame, feasible independent replication, expected variability
and a precision/power rationale. Do not count repeated readings as new units.

**Conduct:** pilot the apparatus and measurement; randomize at the appropriate
unit; block known nuisance variation where justified; conceal allocation and blind
measurement where feasible; retain allocation, deviations, missingness and harms.
Use a protocol-defined stopping rule. Analyze according to the design, account
for blocks/clusters/repeated measurements, estimate effects and uncertainty, and
inspect interactions and sensitivity rather than selecting a favorable p-value.

**Deliver:** protocol, allocation schedule, dictionary, observations, analysis,
uncertainty and review. The factorial teaching code makes a schedule; it does not
recruit, measure, choose sample size or establish causality by itself.
[NIST design guidance](https://www.itl.nist.gov/div898/handbook/pri/section3/pri3.htm)
explains objectives, factors and alternative designs. Clinical trials additionally
need their applicable protocol, registration and reporting requirements; consult
[EQUATOR](https://www.equator-network.org/) for SPIRIT/CONSORT resources.

## Observational study and secondary data analysis

**Use when:** you observe existing exposures or reuse data rather than assign an
intervention. Choose a descriptive, associational, predictive or causal target
explicitly. These targets are not interchangeable.

**Prepare:** population, sampling frame, cohort/case-control/cross-sectional or
longitudinal design, time ordering, measurement definitions, selection and access
conditions. For secondary data, inspect why and how they were originally collected.

**Conduct:** preserve a snapshot, check coverage and missingness, define exclusions,
and assess selection and measurement error. For causal claims, supply a defensible
identification argument and confounding assumptions; a regression alone is
insufficient. For prediction, separate model development from appropriately grouped
or temporal validation. For descriptive questions, a transparent summary may suffice.

**Deliver:** source provenance, dictionary, executed analysis, sensitivity and
limits on generalization. [The NOAA study](../examples/noaa-co2/README.md) shows a
real descriptive reanalysis with code. [STROBE](https://www.strobe-statement.org/)
helps report epidemiological cohort, case-control and cross-sectional studies;
it explicitly is not a design prescription or a quality-scoring instrument.

## Qualitative study

**Use when:** the question concerns meaning, experience, practice or context.
Choose an interpretive tradition that fits the question; a generic coding tool
does not decide the epistemology or establish credibility.

**Prepare:** researcher position, setting, purposive/theoretical sampling rationale,
recruitment, consent, interview/observation procedure, privacy and secure storage.
Justify adequacy of material in the chosen tradition rather than borrowing a
statistical power calculation or claiming saturation without explaining it.

**Conduct:** collect permitted material, document field notes and transcription,
maintain an audit trail of coding or interpretation, examine disconfirming cases
and reflect on researcher influence. Use team discussion or other credibility
procedures when consistent with the method; do not impose agreement scores on
all qualitative traditions. Support interpretations with contextualized excerpts
that can legally and ethically be shared.

**Deliver:** rationale, collection record, analytic memos, interpretations, context,
reflexivity and transferability limits. [SRQR via EQUATOR](https://www.equator-network.org/reporting-guidelines/srqr/)
is reporting guidance. Code here organizes evidence and records; it does not
conduct an interview or replace interpretation.

## Evidence synthesis and review

**Use when:** the research question concerns a body of existing evidence. A review
can be an actual study without new measurements, but a fluent summary is not
necessarily a systematic review.

**Prepare:** choose systematic, scoping or explicitly narrative purpose; define
eligibility, information sources, exact search strings, dates and screening rules.
Write the protocol before decisions depend on attractive findings. Match any
registration and reporting guidance to the review type.

**Conduct:** search and retain records, deduplicate transparently, screen with
recorded reasons and the planned reviewer/disagreement process, extract data and
source locations, appraise bias with a suitable instrument, and assess whether
studies can answer the same question. Pool effects only with a justified estimand,
model, dependency handling and heterogeneity assessment. Otherwise provide an
explicit narrative or structured synthesis. Report missing and contradictory evidence.

**Deliver:** protocol, search log, flow counts, extraction/bias tables, synthesis,
certainty rationale and limitations. [Cochrane's handbook](https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-01)
guides review planning; [PRISMA 2020](https://www.prisma-statement.org/prisma-2020)
provides reporting resources. A completed PRISMA flow is not proof of low bias.
The evidence-synthesis skill is a procedure, not an automated literature database.

## Computational, mathematical and simulation study

**Use when:** the result is a theorem, numerical estimate, algorithm, model behavior
or benchmark. State which kind of result is claimed.

**Prepare:** definitions, domains, assumptions, units, equations, boundary conditions,
algorithm, baseline, input sources, precision and tolerances. For simulation,
define the generating mechanism and parameter scenarios; simulations are not
observations of the real population.

**Conduct:** derive the result or implement the algorithm, use analytic/known-answer
cases, check residuals and invariants, vary precision/step size and assess convergence,
record seeds and environment, and examine sensitivity to assumptions. For benchmarks,
separate development from evaluation data and report resource budgets and failures.
A symbolic package's answer is not a proof unless its conditions are established.

**Deliver:** derivation, executable code, environment, inputs, output and test evidence.
[Mathematics guide](mathematics.md) and [checked symbolic examples](../examples/mathematics/README.md)
connect to [SymPy's official tutorial](https://docs.sympy.org/latest/tutorials/intro-tutorial/index.html).
Model fit alone does not establish external validity.

## Game-theory study

**Use when:** outcomes depend on the choices of interacting decision makers.
Start with the phenomenon and why strategic interaction is necessary.

**Prepare:** players, feasible actions, timing, information, beliefs where relevant,
and payoff functions. Mark payoffs as assumed, measured or estimated and justify
that basis. Choose an appropriate solution concept; do not apply simultaneous
complete-information reasoning to every sequential or uncertain setting.

**Conduct:** solve the specified game, check unilateral deviations or the relevant
sequential conditions, report multiple or absent solutions, and vary payoff and
information assumptions. Separate mathematical equilibrium from a behavioral
prediction that would require empirical validation.

**Deliver:** formal game, payoff provenance, solution checks, sensitivity and bounded
implications. [MIT's course](https://ocw.mit.edu/courses/14-126-game-theory-spring-2016/)
provides deeper theory. [The executable example](../examples/game-theory/README.md)
checks pure equilibria in finite two-player matrices only; it does not solve all games.

## Mixed methods and other disciplines

Specify why combining methods answers the question, their sequence and relative
priority, and how findings will be integrated when they disagree. Do not just
attach interviews to a survey. For diagnostic accuracy, historical/archival,
ethnographic, engineering safety or other specialist designs, use this record
structure with the discipline's actual methodological literature. The editor's
broad categories are entry points, not a claim to cover every method.

See [research areas and 20 design patterns](study-designs.md) for selection criteria,
subsections, work sequences and the connected example library.

## Subject and paper paths

Use [the eight guide paths](guide-paths.md) for field-specific records and work
sequences, and [manuscript formats](manuscript-formats.md) for research/review
scaffolds in Markdown or Quarto. The same catalog is available locally with
`python research.py guides --path chemistry`.
