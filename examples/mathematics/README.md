# Verified symbolic mathematics

This example computes derivatives, integrals, roots, and a linear system with
SymPy. It checks exact expected values and substitutes solutions back into
the original equations. It runs locally with no AI or API key.

```sh
python -m venv .venv
```

Activate it with `source .venv/bin/activate` on macOS/Linux or
`.venv\Scripts\Activate.ps1` in PowerShell, then:

```sh
python -m pip install -r examples/mathematics/requirements.txt
python examples/mathematics/verify.py
```

Expected: derivative `10`, integral `1/3`, roots `-sqrt(2)` and `sqrt(2)`,
linear solution `[2, 1]`, and `verified: true`. The requirements pin SymPy 1.14.0;
this optional environment is separate from the dependency-free core.

Read [the calculation](verify.py) and [math workflow](../../docs/mathematics.md).
These are exact mathematical demonstrations, not empirical research findings.
Changing the problem requires new assumptions and independent checks.
