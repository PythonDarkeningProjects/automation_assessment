
- [Automation Assessment](#automation-assessment)
  - [Pre requisites](#pre-requisites)
    - [Node](#node)
    - [TestCafe](#testcafe)
  - [How to run the test cases](#how-to-run-the-test-cases)
    - [One by one](#one-by-one)
    - [All at the same time](#all-at-the-same-time)
  - [Project Structure](#project-structure)
- [Author](#author)


____

<a name="automation-assessment"></a>
# Automation Assessment


____

<a name="pre-requisites"></a>
## Pre requisites

<a name="node"></a>
### Node

Install [Node](https://nodejs.org/en/download/) version >= `v16.15.0 LTS`


<a name="test-cafe"></a>
### TestCafe

Install [TestCafe](https://testcafe.io/documentation/402635/getting-started#install-testcafe)


____

<a name="how-to-run-the-test-cases"></a>
## How to run the test cases

<a name="one-by-one"></a>
### One by one

The sintaxis to run a test case is:


> testcafe BROWSER tests/TESTNAME.js

*Where*:

- **BROWSER**: is the desired browser on your local machine to run the test cases
- **TESTNAME**: is the name of the test case to be run

Example:

```bash
testcafe chrome tests/test_1.js
```


<a name="all-at-the-same-time"></a>
### All at the same time

Type the following command on terminal:

```bash
testcafe chrome tests/*.js
```

Example of the test output:

```bash
Using locally installed version of TestCafe.
 Running tests in:
 - Chrome 108.0.0.0 / Ventura 13

 Automation Assessment -> Scenario 1
 ✓ API call test

 Automation Assessment -> Scenario 2
 ✓ Create New Device

 Automation Assessment -> Scenario 3
 ✓ Update First Device

 Automation Assessment -> Scenario 4
 ✓ Delete and element from the list


 4 passed (20s)
```

____

<a name="project-structure"></a>
## Project Structure

```bash
├── LICENSE
├── README.md
├── constants.js
├── selectors
│   ├── DeviceAddSelector.js
│   └── HomeSelector.js
├── tests
│   ├── test_1.js
│   ├── test_2.js
│   ├── test_3.js
│   └── test_4.js
└── utilities
    └── common.js
```

- **constants.js**: contains the constants used in the test cases
- **selectors folder**: contains the selectors used in the test cases
- **tests folder**: contains the test cases
- **utilities folder**: contains the utilities used in the test cases

____

<a name="author"></a>
# Author

- Name: **Humberto Israel Perez Rodriguez**
- Email: humbertoisraelrodriguez@gmail.com
- Linkedin: https://www.linkedin.com/in/humberto-israel-perez-rodriguez