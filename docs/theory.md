# Theoretical research

Theoretical work is an approach across disciplines. Choose the subject area in Plan and define whether you need a proof, a model or a numerical calculation.

This is a practical starting path. Confirm the methods, local requirements and
current venue instructions for your actual study; this is not an exhaustive standard.

## Choose your route

- A universal mathematical claim needs stated assumptions and a proof or counterexample.
- A numerical model needs equations, boundary/initial conditions, approximation error and convergence checks.
- Strategic interaction needs players, actions, information, payoffs and a solution concept; choose game theory only when those features answer the question.

## Records you need

- Definitions, variable domains, units where relevant, assumptions and the precise claim.
- Derivations and dependency on prior theorems with inspected sources.
- Versioned symbolic/numerical code, precision, seeds, boundary cases and counterexamples.

## Study flow

1. State the problem and known results.
2. Choose formal assumptions and derive consequences step by step.
3. Test simple and degenerate cases; seek counterexamples.
4. Verify the proof or computation and check sensitivity to assumptions.
5. Explain the scope; distinguish mathematical truth within a model from empirical adequacy.

## Analysis checks

- A finite set of successful computations does not prove a universal theorem.
- Check unilateral deviations for claimed Nash equilibria; inspect sensitivity to assumed payoffs and multiple solutions.

## Reporting and formatting

- Introduce notation before use, state theorem assumptions together, and separate proof from interpretation.
- Number equations, label approximations, and provide runnable code for computed claims. Attach validation records rather than reporting a tool response as proof.

## What counts as done

An inspectable derivation or executed calculation can be research without collecting participants. It must still answer a substantive question and disclose its assumptions.

## Use the tools

`python research.py guides --path theory` returns this path as JSON.

[Manuscript commands and formats](manuscript-formats.md) · [All paths](guide-paths.md)

## Primary guidance

- [MIT: Mathematics for Computer Science](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/)
- [MIT: numerical methods for differential equations](https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/pages/unit-i-first-order-differential-equations/numerical-methods/)
- [MIT OpenCourseWare — Nash equilibrium and game representation](https://ocw.mit.edu/courses/14-12-economic-applications-of-game-theory-fall-2025/resources/lecture-notes/)
