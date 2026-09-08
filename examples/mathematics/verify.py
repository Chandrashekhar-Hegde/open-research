#!/usr/bin/env python3
"""Exact symbolic calculations with independent expected answers. No string eval."""
import json
try:
    import sympy as sp
except ImportError:
    raise SystemExit('Install the optional math dependency: python -m pip install -r examples/mathematics/requirements.txt')


def calculate():
    x = sp.Symbol('x', real=True)
    derivative = sp.diff(x**3 - 2*x, x).subs(x, 2)
    integral = sp.integrate(x**2, (x, 0, 1))
    roots = sp.solve(x**2 - 2, x)
    matrix, rhs = sp.Matrix([[2, 1], [1, -1]]), sp.Matrix([5, 1])
    solution = matrix.inv() * rhs
    if derivative != 10 or integral != sp.Rational(1, 3):
        raise ValueError('Calculus verification failed')
    if set(roots) != {-sp.sqrt(2), sp.sqrt(2)} or any(sp.simplify(r**2-2) != 0 for r in roots):
        raise ValueError('Root verification failed')
    if solution != sp.Matrix([2, 1]) or matrix * solution != rhs:
        raise ValueError('Linear-system verification failed')
    return {'sympy': sp.__version__, 'domain': 'real x', 'derivative_at_2': str(derivative),
            'integral_0_to_1': str(integral), 'roots': [str(r) for r in roots],
            'linear_solution': [str(v) for v in solution], 'verified': True}


if __name__ == '__main__':
    print(json.dumps(calculate(), indent=2))
