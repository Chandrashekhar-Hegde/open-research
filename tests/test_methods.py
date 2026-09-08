import importlib.util
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]


def load(relative):
    spec = importlib.util.spec_from_file_location(relative, ROOT / relative)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


design = load('examples/experimental-design/design.py')
game = load('examples/game-theory/analyze.py')


class MethodExamples(unittest.TestCase):
    def test_design_balance_randomization_and_known_contrasts(self):
        rows = design.make_design()
        self.assertEqual(len(rows), 12)
        self.assertEqual(rows, design.make_design())
        self.assertNotEqual(rows, design.make_design(seed=1))
        for block in range(1, 4):
            self.assertEqual({(r['a'], r['b']) for r in rows if r['block'] == block},
                             {(-1, -1), (-1, 1), (1, -1), (1, 1)})
        self.assertTrue(all('response' not in r for r in rows))
        self.assertEqual(design.effects(design.synthetic_responses(rows)), {'a': 4, 'b': 6, 'ab': 2})
        for blocks in (1, 101, True, 2.5):
            with self.assertRaises(ValueError):
                design.make_design(blocks)

    def test_games_with_one_several_and_no_pure_equilibria(self):
        self.assertEqual(game.pure_equilibria(game.EXAMPLES['prisoners-dilemma']), [[1, 1]])
        self.assertEqual(game.pure_equilibria(game.EXAMPLES['coordination']), [[0, 0], [1, 1]])
        self.assertEqual(game.pure_equilibria(game.EXAMPLES['matching-pennies']), [])
        self.assertEqual(game.pure_equilibria([[[0, 0], [0, 0]], [[0, 0], [0, 0]]]),
                         [[0, 0], [0, 1], [1, 0], [1, 1]])
        self.assertEqual(game.pure_equilibria([[[3, 3], [0, 2]], [[2, 0], [1, 1]]]), [[0, 0], [1, 1]])

    def test_invalid_payoffs(self):
        for payoffs in (None, [], [[1, 2], [3, 4]], [[[True, 0]]*2]*2,
                        [[[float('nan'), 0]]*2]*2, [[[float('inf'), 0]]*2]*2,
                        [[['1', 0]]*2]*2):
            with self.assertRaises(ValueError):
                game.pure_equilibria(payoffs)


if __name__ == '__main__':
    unittest.main()
