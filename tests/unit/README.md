\# Unit Tests Are Colocated



Unit tests are colocated with their source code files in `src/\*\*`.  

This ensures:



\- \*\*1:1 visibility\*\* between code and its tests.

\- \*\*Refactors are safer\*\*: moving or renaming a file moves its test alongside it.

\- \*\*Less chance of missing coverage\*\*: tests live where the code lives.

\- \*\*Easier maintenance\*\*: developers see the tests when editing the code.



\## Test locations and types



\- `src/\*\*` → \*\*unit tests\*\*

\- `tests/smoke/\*\*` → smoke tests

\- `tests/integration/\*\*` → integration tests

\- `tests/fixed-issues/\*\*` → regression/fixed-issue tests

\- `tests/golden/\*\*` → golden snapshot tests



