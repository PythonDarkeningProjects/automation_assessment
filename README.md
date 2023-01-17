
- [Automation Assessment](#automation-assessment)
  - [Pre requisites](#pre-requisites)
    - [Node](#node)
    - [TestCafe](#testcafe)
  - [How to run the test cases](#how-to-run-the-test-cases)
    - [Test output](#test-output)
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

```bash
testcafe chrome tests/all_test_cases.js
```

<a name="test-output"></a>
### Test output
Example of the test output:

```bash
Using locally installed version of TestCafe.
 Running tests in:
 - Chrome 108.0.0.0 / Ventura 13

 Automation Assessment -> Scenario 1
 ✓ Test #1 -> API call test
 ✓ Test #2 -> Create New Device
 ✓ Test #3 -> Update First Device
 ✓ Test #4 -> Delete and element from the list
```

____

<a name="project-structure"></a>
## Project Structure

```bash
├── LICENSE
├── README.md
├── constants.js
├── pages
│   ├── AddDevicePage.js
│   └── HomePage.js
├── selectors
│   ├── DeviceAddSelector.js
│   └── HomeSelector.js
├── tests
│   └── all_test_cases.js
└── utilities
    ├── common.js
    └── requests.js
```

- **constants.js**: contains the constants used in the test cases
- **pages** folder: contains the page objects used in the test cases
- **selectors folder**: contains the selectors used in the test cases
- **tests folder**: contains the test cases
- **utilities folder**: contains the utilities used in the test cases

____

<a name="author"></a>
# Author

- Name: **Humberto Israel Perez Rodriguez**
- Email: humbertoisraelrodriguez@gmail.com
- Linkedin: https://www.linkedin.com/in/humberto-israel-perez-rodriguez