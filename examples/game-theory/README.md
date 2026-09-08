# A strategic model you can inspect

```sh
python examples/game-theory/analyze.py
python examples/game-theory/analyze.py --example coordination
python examples/game-theory/analyze.py --example matching-pennies
python -m unittest discover -s tests -p test_methods.py -v
```

Each cell is `[row player's payoff, column player's payoff]`. Indices start at
zero. A pure Nash equilibrium has no profitable unilateral deviation. The
script checks both players' alternative at every cell, including ties.

| Example | Pure equilibria | How to verify |
| --- | --- | --- |
| Prisoner's dilemma | `[1,1]` | Each player gets 1 instead of 0 by staying; each would prefer mutual cooperation's 3 |
| Coordination | `[0,0]`, `[1,1]` | Switching alone from either diagonal gives 0 |
| Matching pennies | none | At every cell one player gains by switching |

Matching pennies has a mixed equilibrium with each action played with
probability 1/2. This tiny script does **not** compute mixed equilibria. Use
[Gambit](https://www.gambit-project.org/) for larger, extensive-form, or mixed
strategy problems. This example is an educational check, not a new solver
framework.

To inspect your own assumptions, save a 2×2 JSON array of payoff pairs and run
`python examples/game-theory/analyze.py --input my-game.json`. For example:

```json
[[[3,3],[0,5]],[[5,0],[1,1]]]
```

Specify players, actions, information, timing, and what payoffs represent before
calculating. This model assumes two players choose simultaneously with known
payoffs and each maximizes their own payoff. It does not model repeated play,
learning, communication, incomplete information, or moral judgments. An
equilibrium is not necessarily desirable, unique, or a prediction of behavior.

Sensitivity exercise: change both off-diagonal 5s to 2s. Mutual cooperation
`[0,0]` becomes an additional pure equilibrium; `[1,1]` remains. Explain which
real mechanism could justify the change and what data would estimate it.
Toy payoffs are not measured incentives. To test behavioral predictions, design
a separate empirical study and inspect departures from the model's assumptions.

Scientific incentives are one possible topic: Smaldino and McElreath's
[research model](https://arxiv.org/abs/1605.09511) investigates selection pressures
on methods. This 2×2 example is **not a replication** of that population model.
See [study design and analysis](../../docs/design-and-analysis.md).
