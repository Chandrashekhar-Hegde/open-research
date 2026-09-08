# Mathematics that can be checked

Choose the mathematical question first: exact algebra, symbolic calculus,
linear systems, numerical approximation, optimization, or statistical inference.
State domains, assumptions, units, constraints, and the required precision.
A language model can help formulate code; use mathematical software to compute.

## Run the exact example

Follow [the SymPy example](../examples/mathematics/README.md). It checks:

- derivative of `x³ − 2x` at `x = 2`: `10`;
- integral of `x²` on `[0, 1]`: `1/3`;
- real roots of `x² − 2`: `−√2` and `√2`;
- a two-variable linear system, verified by substitution.

[SymPy's calculus tutorial](https://docs.sympy.org/latest/tutorials/intro-tutorial/calculus.html)
documents differentiation and integration. The example uses explicit symbolic
objects and exact rationals. It does not evaluate arbitrary user expressions.

## Work beyond the example

For symbolic work, name variable assumptions and inspect singularities, domains,
and branches. Verify a derivative by an independent identity or suitable numeric
check; verify roots and linear systems by substitution, including constraints.
For numerical work, record algorithms, tolerances, convergence, conditioning,
and an error or sensitivity check. Keep units consistent; a unitless calculator
does not establish a meaningful physical result.

For statistics, choose a method from the study design, not the appearance of
the data. [SciPy](https://docs.scipy.org/doc/scipy/tutorial/stats.html) offers
statistical functionality; using it does not automatically justify assumptions
or interpretation. Ask a domain expert where appropriate.

Use the [mathematical-analysis skill](../skills/mathematical-analysis/SKILL.md)
to formulate, compute and verify a bounded problem. Preserve code, versions,
inputs, outputs, assumptions and an explanation connecting the answer to the
research question. Distinguish symbolic exactness from empirical certainty.
