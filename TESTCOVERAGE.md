(I forgot about this until right after the lab was due)

You should create a TESTCOVERAGE.md document where you outline:

1. The key behaviors you tested via your E2E tests
>Beyond modifying the user-list tests to be related to todos and changing relevant fields, I added in the todo-list.e2e an e2e test to type in the body filter and a test to filter by body and status and owner.
>I also made e2e tests in fry.e2e.spec that did things like filter by body and status (2 tests with different inputs), and one test to navigate to Fry's page and then do filtering. 
1. Why and where you tested those behaviors
>todo-list.e2e-spec.ts: First test does filtering by owner because the todos page should be able to filter by owner by just typing. The second test does the same for body. The third test was done to show that all the fields could be filled and return the right information.
>fry.e2e-spec.ts: First test was done to not just show a combination of filtering, but that Fry's page could be successfully navigated to from a different page. The last two tests are just shallow testing of multiple fields because that's also needed. 

