#!/usr/bin/env python3
"""Describe eight synthetic pairs. Default prints JSON; --check never overwrites."""
import argparse
import csv
import json
from pathlib import Path
import statistics
import sys

HERE = Path(__file__).resolve().parent


def analyze(path):
    with Path(path).open(encoding='utf-8', newline='') as stream:
        reader = csv.DictReader(stream)
        if reader.fieldnames != ['item', 'before', 'after']:
            raise ValueError('expected item,before,after columns')
        rows = list(reader)
    if not rows:
        raise ValueError('no measurements')
    ids = set()
    changes = []
    for row in rows:
        if None in row or not row['item'] or row['item'] in ids:
            raise ValueError('malformed row or missing/duplicate item')
        ids.add(row['item'])
        try:
            before, after = int(row['before']), int(row['after'])
        except (TypeError, ValueError) as exc:
            raise ValueError('before/after must be complete integer measurements') from exc
        changes.append(after - before)
    return {
        'synthetic': True,
        'n_pairs': len(changes),
        'mean_change': statistics.mean(changes),
        'median_change': statistics.median(changes),
        'min_change': min(changes),
        'max_change': max(changes),
        'positive_pairs': sum(change > 0 for change in changes),
        'zero_pairs': changes.count(0),
        'negative_pairs': sum(change < 0 for change in changes),
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    try:
        result = analyze(HERE / 'data' / 'raw.csv')
        if args.check:
            expected = json.loads((HERE / 'results' / 'summary.json').read_text(encoding='utf-8'))
            if result != expected:
                print(f'Reproduction mismatch: observed {result}, expected {expected}', file=sys.stderr)
                return 1
            print('PASS: 8 synthetic pairs; mean change 2.0 units; committed result reproduced.')
        else:
            print(json.dumps(result, indent=2, sort_keys=True))
    except (OSError, ValueError, csv.Error) as exc:
        print(f'Analysis failed: {exc}', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
