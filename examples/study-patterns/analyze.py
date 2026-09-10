#!/usr/bin/env python3
"""Bounded teaching calculations. Inputs are synthetic or mathematical, never study observations."""
import argparse
from bisect import bisect_left
import hashlib
import json
import math
from pathlib import Path
from statistics import mean

ROOT = Path(__file__).resolve().parent
KINDS = ('diagnostic', 'prediction', 'benchmark', 'simulation')


def number(value):
    if type(value) not in (int, float) or not math.isfinite(value):
        raise ValueError('Expected a finite number, not text or a boolean')
    return value


def diagnostic(data):
    counts = data['counts']
    if not isinstance(counts, dict) or set(counts) != {'tp', 'fp', 'tn', 'fn'}:
        raise ValueError('Expected tp, fp, tn and fn counts')
    if any(type(x) is not int or x < 0 for x in counts.values()):
        raise ValueError('Counts must be nonnegative integers')
    tp, fp, tn, fn = (counts[k] for k in ('tp', 'fp', 'tn', 'fn'))
    def ratio(a, b):
        return a / b if b else None
    return {'table': counts, 'n': tp + fp + tn + fn,
            'sensitivity': ratio(tp, tp + fn), 'specificity': ratio(tn, tn + fp),
            'positive_predictive_value': ratio(tp, tp + fp),
            'negative_predictive_value': ratio(tn, tn + fn),
            'limits': 'Synthetic counts, no clinical validation or uncertainty interval. Null means undefined denominator. Predictive values depend on the sampled prevalence.'}


def prediction(data):
    rows = data['rows']
    if not isinstance(rows, list) or not rows:
        raise ValueError('Prediction rows must be a nonempty list')
    ids = set()
    for row in rows:
        if not isinstance(row, dict) or set(row) != {'id', 'actual', 'predicted', 'baseline'}:
            raise ValueError('Each prediction row needs id, actual, predicted and baseline')
        if not isinstance(row['id'], str) or not row['id'] or row['id'] in ids:
            raise ValueError('Prediction IDs must be nonempty and unique')
        ids.add(row['id'])
        for key in ('actual', 'predicted', 'baseline'):
            number(row[key])
    model = mean(abs(r['predicted'] - r['actual']) for r in rows)
    baseline = mean(abs(r['baseline'] - r['actual']) for r in rows)
    return {'n': len(rows), 'model_mae': model, 'baseline_mae': baseline,
            'mae_reduction': baseline - model,
            'limits': 'Synthetic supplied predictions in arbitrary units; no model was trained. This arithmetic does not establish a valid split, calibration, generalization or benefit.'}


def benchmark(data):
    values, queries = data['values'], data['queries']
    if not isinstance(values, list) or not isinstance(queries, list) or not queries:
        raise ValueError('Expected values and nonempty queries lists')
    for value in values + queries:
        number(value)
    if values != sorted(set(values)):
        raise ValueError('Benchmark values must be sorted and unique')
    results = []
    for query in queries:
        linear_count, linear_result = 0, None
        for value in values:
            linear_count += 1
            if value == query:
                linear_result = value
                break
        lo, hi, binary_count, binary_result = 0, len(values) - 1, 0, None
        while lo <= hi:
            mid = (lo + hi) // 2
            binary_count += 1
            if values[mid] == query:
                binary_result = values[mid]
                break
            if values[mid] < query:
                lo = mid + 1
            else:
                hi = mid - 1
        index = bisect_left(values, query)
        expected = values[index] if index < len(values) and values[index] == query else None
        if linear_result != expected or binary_result != expected:
            raise ValueError('Search correctness failed against standard-library reference')
        results.append({'query': query, 'found': expected is not None,
                        'linear_probes': linear_count, 'binary_probes': binary_count})
    return {'n': len(values), 'queries': results,
            'total_linear_probes': sum(r['linear_probes'] for r in results),
            'total_binary_probes': sum(r['binary_probes'] for r in results),
            'limits': 'A probe inspects one array element, not one CPU operation. Deterministic synthetic workload; no elapsed-time or general-performance claim. Sorting costs are excluded.'}


def simulation(data):
    initial, rate, duration = (number(data[k]) for k in ('initial', 'rate', 'duration'))
    steps = data['steps']
    if initial <= 0 or rate <= 0 or duration <= 0 or type(steps) is not int or not 1 <= steps <= 100000:
        raise ValueError('Use positive values and 1–100000 integer steps')
    if rate * duration / steps >= 1:
        raise ValueError('Choose a smaller step so this decay demonstration stays positive')
    exact = initial * math.exp(-rate * duration)
    def euler(n):
        y = initial
        for _ in range(n):
            y -= rate * y * duration / n
        return y
    coarse, fine = euler(steps), euler(2 * steps)
    return {'equation': 'dy/dt = -rate*y', 'exact_final': exact,
            'steps': steps, 'euler_final': coarse, 'half_step_final': fine,
            'absolute_error': abs(coarse - exact), 'half_step_error': abs(fine - exact),
            'limits': 'Mathematical decay model with assumed parameters; no empirical validation. This one convergence check does not validate another solver or model.'}


def calculate(data):
    if not isinstance(data, dict) or data.get('kind') not in KINDS:
        raise ValueError('Unknown teaching calculation')
    try:
        result = {'kind': data['kind'], 'evidence_type': 'synthetic or mathematical demonstration',
                  **{'diagnostic': diagnostic, 'prediction': prediction, 'benchmark': benchmark, 'simulation': simulation}[data['kind']](data)}
        json.dumps(result, allow_nan=False)
        return result
    except (KeyError, TypeError, OverflowError) as exc:
        raise ValueError(f'Invalid calculation inputs: {exc}') from exc


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    source = parser.add_mutually_exclusive_group()
    source.add_argument('--example', choices=KINDS)
    source.add_argument('--input', type=Path)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    if args.check and args.input:
        parser.error('--check compares bundled examples only')
    kind = args.example or 'diagnostic'
    path = args.input or ROOT / 'inputs' / (kind + '.json')
    try:
        if path.stat().st_size > 1024 * 1024:
            raise ValueError('Input must be at most 1 MiB')
        content = path.read_bytes()
        result = {**calculate(json.loads(content)), 'input_sha256': hashlib.sha256(content).hexdigest()}
        if args.check:
            expected = json.loads((ROOT / 'results' / (kind + '.json')).read_text(encoding='utf-8'))
            same = expected.keys() == result.keys() and all(
                math.isclose(value, expected[key], rel_tol=1e-12, abs_tol=1e-12)
                if kind == 'simulation' and type(value) is float and type(expected[key]) is float
                else value == expected[key] for key, value in result.items())
            if not same:
                raise ValueError('Computed result differs from frozen teaching result')
            print('PASS: ' + kind + ' teaching calculation and input hash match')
        else:
            print(json.dumps(result, indent=2, allow_nan=False))
    except (OSError, ValueError, UnicodeError) as exc:
        parser.exit(1, f'Cannot analyze: {exc}\n')


if __name__ == '__main__':
    main()
