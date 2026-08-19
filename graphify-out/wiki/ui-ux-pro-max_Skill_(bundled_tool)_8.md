# ui-ux-pro-max Skill (bundled tool)

> 21 nodes · cohesion 0.14

## Key Concepts

- **BM25** (16 connections) — `.claude/skills/ui-ux-pro-max/scripts/core.py`
- **.tokenize()** (9 connections) — `.claude/skills/ui-ux-pro-max/scripts/core.py`
- **TestTokenizer** (8 connections) — `.claude/skills/ui-ux-pro-max/scripts/tests/test_core.py`
- **_suggest_terms()** (7 connections) — `.claude/skills/ui-ux-pro-max/scripts/core.py`
- **.score()** (5 connections) — `.claude/skills/ui-ux-pro-max/scripts/core.py`
- **.vocabulary()** (5 connections) — `.claude/skills/ui-ux-pro-max/scripts/core.py`
- **_query_coverage()** (5 connections) — `.claude/skills/ui-ux-pro-max/scripts/core.py`
- **.fit()** (4 connections) — `.claude/skills/ui-ux-pro-max/scripts/core.py`
- **_passes_threshold()** (4 connections) — `.claude/skills/ui-ux-pro-max/scripts/core.py`
- **.test_boundary_safe_nav_normalization_preserves_existing_words()** (2 connections) — `.claude/skills/ui-ux-pro-max/scripts/tests/test_core.py`
- **.test_punctuation_and_uk_variants_normalize_to_canonical_tokens()** (2 connections) — `.claude/skills/ui-ux-pro-max/scripts/tests/test_core.py`
- **.test_short_domain_terms_are_kept()** (2 connections) — `.claude/skills/ui-ux-pro-max/scripts/tests/test_core.py`
- **.test_stopwords_removed()** (2 connections) — `.claude/skills/ui-ux-pro-max/scripts/tests/test_core.py`
- **.test_synonym_normalization()** (2 connections) — `.claude/skills/ui-ux-pro-max/scripts/tests/test_core.py`
- **.__init__()** (1 connections) — `.claude/skills/ui-ux-pro-max/scripts/core.py`
- **BM25 ranking algorithm for text search** (1 connections) — `.claude/skills/ui-ux-pro-max/scripts/core.py`
- **Lowercase, normalize synonyms, split, remove punctuation, filter stopwords** (1 connections) — `.claude/skills/ui-ux-pro-max/scripts/core.py`
- **Build BM25 index from documents** (1 connections) — `.claude/skills/ui-ux-pro-max/scripts/core.py`
- **Score all documents against query** (1 connections) — `.claude/skills/ui-ux-pro-max/scripts/core.py`
- **All indexed terms, for suggestion/typo-recovery purposes.** (1 connections) — `.claude/skills/ui-ux-pro-max/scripts/core.py`
- **Nearest known vocabulary terms for a query that returned 0 hits,     so the call** (1 connections) — `.claude/skills/ui-ux-pro-max/scripts/core.py`

## Relationships

- [ui-ux-pro-max Skill (bundled tool)](ui-ux-pro-max_Skill_%28bundled_tool%29.md) (18 shared connections)
- [design Skill (bundled tool)](design_Skill_%28bundled_tool%29.md) (2 shared connections)

## Source Files

- `.claude/skills/ui-ux-pro-max/scripts/core.py`
- `.claude/skills/ui-ux-pro-max/scripts/tests/test_core.py`

## Audit Trail

- EXTRACTED: 78 (98%)
- INFERRED: 2 (2%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*