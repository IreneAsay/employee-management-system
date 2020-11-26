# Employee Management System

## Project Description 
This **Employee Management System** is a content management tool that utilizes node, inquirer, and MySQL to manage a company's employees. This interface is designed to make it easy for non-developers to view and interact with information stored in databases.

![Screenshot](assets/screenshot.png)

## Table of Content

  - [Project Description](#project-description)
  - [User Story](#user-story)
  - [Criteria](#criteria)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Questions](#questions)
  - [License](#license)

## User Story

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

## Criteria

  This command-line application allows users to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles
  
  * Update employee managers

  * View employees by manager

  * Delete employees


## Installation

This application was designed to work with [Node.js](https://nodejs.org/en/). For the application to run properly, please also run `npm install` to install all modules listed as dependencies in `package.json` before invoking the application. Finally, run `npm install inquirer` to prompt the user for their email, id, and specific information based on their role with the company. 


## Usage

This application utilizes the following packages:

* [MySQL](https://www.npmjs.com/package/mysql) NPM package is used to connect to the MySQL database and perform queries.

* [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) NPM package is used to interact with the user via the command-line.

* [console.table](https://www.npmjs.com/package/console.table)  is used to print MySQL rows to the console. There is a built-in version of `console.table`

## Questions

For your reference, here is a [demo video]() to walk through the entire process of running this app.

More questions? Connect with me and we can chat more!

Github: <a href="https://github.com/IreneAsay" target="_blank">IreneAsay</a> 

Email Address: irene.hsu.asay@gmail.com


## License

© Irene Asay. All Rights Reserved. Under the [MIT/](./LICENSE) license.