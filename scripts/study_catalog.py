"""Shared design guidance and validation; no method is selected automatically."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = json.loads((ROOT / 'catalog/study-designs.json').read_text(encoding='utf-8'))


def classify(value, method=None):
    if not isinstance(value, dict) or set(value) != {'domain', 'subarea', 'goal', 'pattern'}:
        raise ValueError('classification needs domain, subarea, goal and pattern')
    if any(not isinstance(v, str) for v in value.values()):
        raise ValueError('classification choices must be text IDs')
    domain, subarea, goal, pattern = (value[k] for k in ('domain', 'subarea', 'goal', 'pattern'))
    if domain not in CATALOG['domains'] or goal not in CATALOG['goals']:
        raise ValueError('Unknown research area or goal')
    if subarea != 'undecided' and subarea not in CATALOG['domains'][domain]['subareas']:
        raise ValueError('Subsection does not belong to the research area')
    if pattern != 'undecided':
        chosen = CATALOG['patterns'].get(pattern)
        if not chosen or chosen['goal'] != goal or (method is not None and chosen['family'] != method):
            raise ValueError('Study pattern does not match the goal or method')
    return value


def candidates(domain='undecided', goal='undecided'):
    if domain not in CATALOG['domains'] or goal not in CATALOG['goals']:
        raise ValueError('Unknown research area or goal')
    # Domain orders relevant examples; it never excludes a cross-disciplinary method.
    choices = [(key, value) for key, value in CATALOG['patterns'].items()
               if goal == 'undecided' or value['goal'] == goal]
    choices.sort(key=lambda item: domain not in item[1]['domains'])
    return [{'id': key, **value} for key, value in choices]


def classification_text(value):
    classify(value)
    domain = CATALOG['domains'][value['domain']]
    return (f"Research area: {domain['label']}\n"
            f"Subsection: {domain['subareas'].get(value['subarea'], 'Not selected')}\n"
            f"Goal: {CATALOG['goals'][value['goal']]['label']}\n"
            f"Study pattern: {CATALOG['patterns'].get(value['pattern'], {}).get('label', 'Not selected')}")
