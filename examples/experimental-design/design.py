#!/usr/bin/env python3
"""Two-factor, two-level blocked design; optional explicitly synthetic responses."""
import argparse
from itertools import product
import json
import random
from statistics import mean


def make_design(blocks=3, seed=42):
    if type(blocks) is not int or not 2 <= blocks <= 100:
        raise ValueError('Use 2–100 blocks; this bound is not a power calculation.')
    rng = random.Random(seed)
    rows = []
    for block in range(1, blocks + 1):
        treatments = list(product((-1, 1), repeat=2))
        rng.shuffle(treatments)
        for a, b in treatments:
            rows.append({'run': len(rows) + 1, 'block': block, 'a': a, 'b': b})
    return rows


def synthetic_responses(rows):
    return [{**r, 'response': 10 + 2*r['a'] + 3*r['b'] + r['a']*r['b'] + r['block']}
            for r in rows]


def effects(rows):
    """High-minus-low contrasts for this balanced complete design only."""
    result = {}
    for term in ('a', 'b', 'ab'):
        sign = lambda r: r['a'] * r['b'] if term == 'ab' else r[term]
        result[term] = mean(r['response'] for r in rows if sign(r) == 1) - mean(
            r['response'] for r in rows if sign(r) == -1)
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--blocks', type=int, default=3)
    parser.add_argument('--seed', type=int, default=42)
    parser.add_argument('--demo', action='store_true', help='add synthetic outcomes, never observed data')
    args = parser.parse_args()
    try:
        rows = make_design(args.blocks, args.seed)
    except ValueError as exc:
        parser.error(str(exc))
    result = {'kind': 'synthetic demonstration' if args.demo else 'planned run order; no observations',
              'seed': args.seed, 'blocks': args.blocks, 'runs': rows,
              'limits': 'Define physical levels and independent experimental units. No power or significance claim.'}
    if args.demo:
        result['runs'] = synthetic_responses(rows)
        result['effects_high_minus_low'] = effects(result['runs'])
        result['generating_equation'] = '10 + 2*a + 3*b + a*b + block; no random error'
    print(json.dumps(result, indent=2, allow_nan=False))


if __name__ == '__main__':
    main()
