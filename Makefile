.PHONY: check test demo
check:
	python3 scripts/check_repo.py

test:
	python3 -m unittest discover -s tests -v

demo:
	python3 examples/paired-measurements/analyze.py --check
	python3 research.py check examples/paired-measurements --release

site-test:
	node --test tests/site.test.mjs

math:
	python3 examples/mathematics/verify.py
