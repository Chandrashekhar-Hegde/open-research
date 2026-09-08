#!/usr/bin/env python3
"""Enumerate pure Nash equilibria in a finite two-player 2×2 game."""
import argparse
import json
import math
from pathlib import Path

EXAMPLES = {
    'prisoners-dilemma': [[[3, 3], [0, 5]], [[5, 0], [1, 1]]],
    'coordination': [[[2, 2], [0, 0]], [[0, 0], [1, 1]]],
    'matching-pennies': [[[1, -1], [-1, 1]], [[-1, 1], [1, -1]]],
}


def pure_equilibria(payoffs):
    if not isinstance(payoffs, list) or len(payoffs) != 2:
        raise ValueError('Expected a 2×2 array of [row payoff, column payoff] pairs.')
    for row in payoffs:
        if not isinstance(row, list) or len(row) != 2:
            raise ValueError('Expected two columns in each row.')
        for pair in row:
            if not isinstance(pair, list) or len(pair) != 2:
                raise ValueError('Each cell needs two payoffs.')
            if any(type(x) not in (int, float) or not math.isfinite(x) for x in pair):
                raise ValueError('Payoffs must be finite numbers, not booleans or text.')
    return [[r, c] for r in range(2) for c in range(2)
            if payoffs[r][c][0] >= payoffs[1-r][c][0]
            and payoffs[r][c][1] >= payoffs[r][1-c][1]]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    source = parser.add_mutually_exclusive_group()
    source.add_argument('--example', choices=EXAMPLES, default='prisoners-dilemma')
    source.add_argument('--input', type=Path, help='JSON payoff array, never executable expressions')
    args = parser.parse_args()
    try:
        if args.input and args.input.stat().st_size > 65536:
            raise ValueError('A 2×2 payoff file must be at most 64 KiB.')
        payoffs = json.loads(args.input.read_text(encoding='utf-8')) if args.input else EXAMPLES[args.example]
        equilibria = pure_equilibria(payoffs)
    except (OSError, ValueError, OverflowError) as exc:
        parser.error(str(exc))
    print(json.dumps({'kind': 'mathematical model; payoffs are assumptions',
                      'payoffs': payoffs, 'pure_equilibria_zero_based': equilibria,
                      'limits': 'Only pure strategies checked. An empty list does not rule out mixed equilibria. No empirical behavior predicted.'},
                     indent=2, allow_nan=False))


if __name__ == '__main__':
    main()
