# Design before measurement

Question for this teaching example: how do two controlled factors affect a
response, and does the effect of one depend on the level of the other?

```sh
python examples/experimental-design/design.py --blocks 3 --seed 42
python examples/experimental-design/design.py --demo
python -m unittest discover -s tests -p test_methods.py -v
```

The first command generates **12 planned runs and no measured outcomes**.
Each block contains all four combinations of coded factors A and B (−1,+1).
Order is randomized within a block. Save the generated allocation and runtime
version; a seed is not a substitute for the actual schedule. Map codes to safe,
feasible physical levels before using this pattern.

The second command adds explicitly synthetic outcomes from
`y = 10 + 2A + 3B + AB + block`, without random error. The high-minus-low
contrasts are A = **4**, B = **6**, AB = **2**; regression coefficients for
the coded factors are half these contrasts. This is a known-answer calculation,
not evidence for a real intervention. Changing the seed changes order, not
these synthetic contrasts.

Design rationale: [NIST §5.3.3.3](https://www.itl.nist.gov/div898/handbook/pri/section3/pri333.htm)
describes full factorial designs; [§5.3.3.2](https://www.itl.nist.gov/div898/handbook/pri/section3/pri332.htm)
describes blocking to account for nuisance variation. Here the block represents
a batch or day. There must be a distinct experimental unit for each run; repeat
measurements of one unit do not create independent replicates.

Before a real experiment: specify the unit of randomization, primary outcome
and units, factor levels, blocking rationale, independent replication, blinding
where possible, exclusion rules and stopping rule. Choose replication from an
effect/precision target and variability information. Three blocks is only a
demonstration choice. If treatment interacts with block, runs interfere, or
factor levels cannot be randomized freely, this design/analysis needs revision.

The `effects` function is deliberately limited to the balanced synthetic design;
it is not an arbitrary-data analysis tool. It supplies no confidence intervals,
power, or p-values. Plan a design-appropriate model and sensitivity analysis for
real outcomes. See [study design and analysis](../../docs/design-and-analysis.md).
