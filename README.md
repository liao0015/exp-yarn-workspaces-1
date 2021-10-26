# yarn workspaces project (#1)

A simple monorepo using yarn workspaces.  

## run

1. run `yarn install` from the project root
2. run main package: `node packages/main/index.js`
3. run tests: `yarn test`

## dependencies

- there are two packages: 'main' and 'shared'
- 'main' package has one dependency: 'shared'
- Jest is installed as dev dependency into 'shared' package

├── workspace-root
|   ├── node_modules
|   ├── package.json
|   ├── yarn.lock
|   ├── workspace-a (main)
|   |   ├── package.json
|   |   ├── node_modules
|   ├── workspace-b (shared)
|   |   ├── package.json
|   |   ├── node_modules

## from scratch

If you would like to create and run this monorepo from scratch, you can go through the followings:

### setup yarn workspace with two packages

1. create folders and files

```sh
# create two packages, main & shared
mkdir packages
mkdir packages/main
mkdir packages/shared
# add index.js files into each of the two packages
touch packages/main/index.js
touch packages/shared/index.js
# create a package.json in root
touch package.json
# create a package.json in main package
cd packages/main/
yarn init -y
cd ../../
# create a package.json in shared package
cd packages/shared/
yarn init -y
cd ../../
```

2. update `package.json` in the project root:

```json
{
  "private": true,
  "workspaces":["packages/*"]
}
```

3. add the following into `packages/shared/index.js`:

```js
module.exports = (a, b) => {
  return a + b;
};
```

4. add the following into `packages/main/index.js`:

```js
const addition = require("shared");

const sum = addition(1, 2);
console.log(sum);
```

5. and update the `package.json` in `packages/main`:

```json
{
  ...
    "dependencies": {
      "shared": "1.0.0"
  }
}
```

6. run `yarn install` in the root directory and run `ls node_modules/`, you will see `main` & `shared` are listed

7. to confirm that the `main` is able to use the function from `shared` package, run `node packages/main/index.js` and you should see `3` in console

### setup Jest for unit testing

1. install `jest` as dev dependency inside `shared` package.

```sh
cd packages/shared/
yarn add --dev jest
```

Note: you can inspect the `/node_modules` in root directory and the one inside `packages/shared/` to see how yarn workspaces works

2. create `index.test.js` for `shared` package:

```js
const sum = require("./index");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

3. create `index.test.js` for `main` package:

```js
const sum = require("./index");

test("adds 2 + 2 to equal 4", () => {
  expect(sum(2, 2)).toBe(4);
});
```

4. update `package.json` in root directory:

```json
{
  ...
  "scripts": {
    "test": "jest"
  }
}
```

5. run `yarn test` from the root directory, you will see that two tests passed with two tests in total in the console