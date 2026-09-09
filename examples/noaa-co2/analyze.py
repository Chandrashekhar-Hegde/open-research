#!/usr/bin/env python3
"""Describe two complete years of NOAA monthly CO2; no causal or significance claim."""
import argparse
import csv
from decimal import Decimal
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def analyze(path, years=(2024, 2025)):
    if len(set(years)) != 2:
        raise ValueError('Choose two distinct years in comparison order')
    raw = Path(path).read_bytes()
    rows = csv.DictReader(line for line in raw.decode('utf-8').splitlines() if not line.startswith('#'))
    required = {'year', 'month', 'average', 'deseasonalized', 'ndays', 'sdev', 'unc'}
    if not required.issubset(rows.fieldnames or []):
        raise ValueError('Missing NOAA columns')
    selected = {}
    for row in rows:
        year = int(row['year'])
        if year not in years:
            continue
        month = int(row['month'])
        if month not in range(1, 13) or (year, month) in selected:
            raise ValueError('Invalid or duplicate month')
        values = [Decimal(row[key]) for key in ('average', 'deseasonalized', 'sdev', 'unc')]
        if any(not x.is_finite() or x < 0 for x in values) or int(row['ndays']) <= 0:
            raise ValueError('Missing, interpolated or nonfinite input; inspect the source')
        selected[year, month] = values
    expected = {(year, month) for year in years for month in range(1, 13)}
    if set(selected) != expected:
        raise ValueError('Each year must have all 12 months')
    means = {year: [sum(selected[year, m][i] for m in range(1, 13)) / 12 for i in (0, 1)] for year in years}
    change = means[years[1]][0] - means[years[0]][0]
    monthly = [selected[years[1], m][0] - selected[years[0], m][0] for m in range(1, 13)]
    def number(value):
        return float(round(value, 4))
    return {'input_sha256': hashlib.sha256(raw).hexdigest(), 'years': list(years), 'months_per_year': 12,
            'equal_month_mean_ppm': {str(y): number(means[y][0]) for y in years},
            'difference_ppm': number(change),
            'deseasonalized_difference_ppm': number(means[years[1]][1] - means[years[0]][1]),
            'same_month_difference_range_ppm': [number(min(monthly)), number(max(monthly))],
            'interpretation': 'Descriptive difference between equal-weight monthly means in this frozen station record.',
            'limits': ['Not a global mean or a causal effect.', 'Months are time-dependent, not independent experimental replicates.',
                       'No confidence interval or significance test is claimed.', 'NOAA may revise its data; this result uses a dated snapshot.',
                       'Equal weighting of monthly means is not a day-weighted annual estimator.']}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--input', type=Path, default=ROOT / 'data/monthly.csv')
    parser.add_argument('--years', type=int, nargs=2, default=[2024, 2025])
    parser.add_argument('--output', type=Path)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    try:
        result = analyze(args.input, tuple(args.years))
        if args.check:
            expected = json.loads((ROOT / 'results/summary.json').read_text(encoding='utf-8'))
            if result != expected:
                raise ValueError('Result or input differs from the frozen study; inspect the change')
            print('PASS: frozen NOAA reanalysis and source checksum match')
        elif args.output:
            args.output.parent.mkdir(parents=True, exist_ok=True)
            with args.output.open('x', encoding='utf-8') as stream:
                stream.write(json.dumps(result, indent=2) + '\n')
            print(f'Wrote {args.output}')
        else:
            print(json.dumps(result, indent=2))
    except (OSError, ValueError, csv.Error, ArithmeticError, KeyError, TypeError) as error:
        parser.exit(1, f'Cannot analyze: {error}\n')


if __name__ == '__main__':
    main()
