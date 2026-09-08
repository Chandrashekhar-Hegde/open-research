#!/usr/bin/env python3
"""Open Research: local tools for the daily research workflow."""
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parent / 'scripts'))
from research import main
if __name__ == '__main__':
    sys.exit(main())
