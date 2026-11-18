
The conventions for this tests directory are:

- Start test case names with a capital letter where it reads naturally.
- Make each test easy to follow with numbered steps:

```ts
// 1. Arrange.
...code...

// 2. Act.
...code...

// 3. Assert.
...code...
```

- Check the parsed result explicitly, in both lenient and strict mode where applicable.