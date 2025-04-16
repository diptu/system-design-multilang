# Introduction to Node.js and Express

??? info "What is Node.js?"
    Node.js is an **open-source** and **cross-platform** runtime environment for executing JavaScript code outside of a web browser. It is commonly used to build **back-end services**, also known as **APIs**.

    Node.js is particularly well-suited for building:
  
    * Highly **scalable** applications
    * **Data-intensive** applications
    * **Real-time** back-end services that power client applications


??? success "Why Node?"

    Node.js has become a preferred choice for backend development due to several compelling reasons:

    * **JavaScript Everywhere:** It allows you to use **JavaScript** for both your frontend and backend, simplifying development and enabling easier transitions between roles.
    * **Scalability:** Node.js facilitates the **easy scaling** of applications, making it suitable for large-scale professional projects with growing user bases.
    * **Performance:** Its **fast and non-blocking** nature, driven by its asynchronous event-driven architecture, ensures efficient handling of concurrent requests.
    * **Community and Ecosystem:** Node.js boasts a **vibrant community** of developers and a **rich ecosystem** of readily available packages and libraries (primarily through npm - Node Package Manager).

??? Question "How to Install Node.js"

    Follow these steps to install Node.js on your system:

    1.  **Download the Installer:** Visit the official [Node.js website](https://nodejs.org/) and download the appropriate installer for your operating system (Mac or Windows).
    2.  **Choose the LTS Version:** It is generally recommended to download and install the **Long-Term Support (LTS)** version, which is usually displayed on the left side of the download page.
    3.  **Run the Installer:** Once the download is complete, run the installer and follow the on-screen prompts. You will likely need to click the "NEXT" button multiple times and accept the default installation settings.
    4.  **Verify Installation:** To confirm that Node.js has been installed correctly, open your terminal (or command prompt on Windows) and run the following command:

        ```bash
        node --version
        ```

        If the installation was successful, this command will output the installed version of Node.js. On Windows, you might need to restart your command prompt after installation before running this command.

??? note "What is Express?" 

    Express is a **fast**, **unopinionated**, and **minimalist** web backend or server-side web framework for Node.js. Essentially, Express simplifies the process of building APIs and web applications with Node.js by providing a set of robust features and tools with less code.

    Key aspects of Express:

    * It is a **framework built on top of Node.js**.
    * It enables you to **create your backend with ease**, providing structure and conventions for handling routing, middleware, and more.
    * It can be used in conjunction with frontend frameworks like **React**, **Angular**, or **Vue** to build complete **full-stack applications**.

??? Success "Why do You Need Express?"

    Express offers significant advantages for Node.js web development:

    * **Simplified Development:** It makes building web applications with Node.js **much easier** by abstracting away low-level details and providing a more intuitive API.
    * **Lightweight and Fast:** Express is **extremely light**, **fast**, and **free**, contributing to the overall performance of your application.
    * **Versatility:** It is suitable for building both **server-rendered applications** (where HTML is generated on the server) as well as **API/Microservices** (for data exchange with frontend applications).
    * **Popularity and Community Support:** Express is the **most popular** Node.js web framework, benefiting from a large and active community that provides extensive documentation, tutorials, and support.
    * **Full Control:** It gives you **full control over requests and responses**, allowing for highly customized application logic.

??? Question "Prerequisites"

    Before you begin working with Node.js and Express, ensure you have the following:

    * **Basic knowledge of JavaScript:** A fundamental understanding of JavaScript syntax, concepts, and asynchronous programming is essential.
    * **Node.js Installed:** You need to have successfully downloaded and installed **Node.js** on your computer as described in the installation section.
    * **Postman (Recommended):** While not strictly required for development, **Postman** is a valuable tool for testing and interacting with your backend APIs. You can download it from the [Postman website](https://www.postman.com/downloads/).
  
## Crud-api
??? note "projrct structure"    
    create a directory called server aand move into server directory.
    ```bash
    mkdir server
    cd server
    ```
??? info "View npm Version Information"
    * `npm` stands for **Node Package Manager**. It is the default package manager for the Node.js JavaScript runtime environment.
    * `-v` is a common command-line flag that typically stands for "**version**".

    When you execute `npm -v`, the terminal will output the version number of the npm client that is installed on your machine.

    ## Example Output

    The provided output shows the following:
    10.9.2

??? Example "Initialize a new Node.js project"
    Inside server directory run the following command to initialize a Node.js project.
    ```bash
    npm init -y
    ```
    The command `npm init -y` is used within a Node.js project to **initialize a new `package.json` file**. This file is a fundamental part of any Node.js project managed with npm (Node Package Manager).

    ```json title="package.json"
    {
    "name": "server",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "description": ""
    }
    ```
    !!! note "Project Structure:"
    ```plain
     server
        └── ./server/package.json
    ```

!!! info "Install Express.js"
    ```bash
    `npm i express`
    ```



    ??? info "Why use express?"

        Installing Express allows us to:

        * **Quickly set up a web server:** Express simplifies the process of creating and configuring HTTP servers in Node.js.
        * **Define routes for your application:** It provides a clear and organized way to handle different HTTP requests (like GET, POST, PUT, DELETE) to specific URLs (routes) in your application.
        * **Implement middleware:** Express allows you to use middleware functions to perform various tasks before or after handling a request, such as logging, authentication, and data parsing.
        * **Build APIs:** It is a popular choice for building RESTful APIs that can be consumed by frontend applications or other services.
        * **Render dynamic web pages:** Express can be used with templating engines to generate HTML content dynamically on the server.

        !!! note "Project Structure:"
        ```plain
        server
            └── ./server/package.json
            └── ./server/node_modules
        ```
        ```json title="package.json"
        "dependencies": {
        "express": "^5.1.0"
        }
        ```

# Setting Up code Directory

## Creating the Source Directory

The first step is to create a directory that will house all your project's source code files. A common convention is to name this directory `src` (short for "source").

```bash
mkdir src
```
Next, we'll typically want to create a main JavaScript file where our application's entry point will reside. A common name for this file is `index.js`

```bash
touch src/index.js
```
### Creating a Basic Express Server

```javascript title="index.js" linenums="1"
const express = require('express');
const app = express()

app.listen(3000, ()=>{
    console.log(`server running on http://localhost:3000`);
})
```
### Running the Node.js Server

```bash
node src/index.js
```
## Package Installation
1. [Nodemon](#nodemon)
2. [morgan](#morgan)

??? info " Why Use Nodemon?"
    * **Automatic Restarts:** The primary benefit of Nodemon is its ability to **automatically restart** your Node.js server upon saving changes to your files. This saves you valuable development time and allows you to focus on coding.
    * **No Code Changes Required:** Nodemon is designed to be a seamless replacement for the `node` command. You **don't need to modify your existing Node.js code** to use it.
    * **Improved Development Experience:** By automating the server restart process, Nodemon provides a smoother and more efficient development experience.


    We can easily install Nodemon as a development dependency for your project using npm (Node Package Manager):

    ```bash
    npm install --save-dev nodemon
    ```

??? info " Why Use Morgan?"

    Morgan is a popular Node.js logging middleware that provides a simple way to log HTTP requests and responses.
    * **HTTP Request and Response Logging:** Morgan logs HTTP requests and responses, making it easier to monitor and debug your application.
  
    ```bash
    npm install --save-dev morgan
    ```


```json title="package.json" linenums="14" hl_lines="2-3"
    "devDependencies": {
        "morgan": "^1.10.0",
        "nodemon": "^3.1.9"
}
```
Add the following lines to script section:
```json title="package.json" linenums="5" hl_lines="2-3"
"scripts": {
    "start" : "node ./src/index.js",
    "dev" : "nodemon ./src/index.js",  
    },
```
### Running the Production Application

```bash
npm run start
```
will run the commad `node ./src/index.js`
### Running the Development Application with Nodemon

```bash
npm run dev
```
will run the commad `nodemon ./src/index.js`


### Create a HTTP request

```javascript title="index.js" linenums="1" hl_lines="4-10"
const express = require('express');
const app = express()

app.get('/products', (req, res) => {
    res.status(200).send(
         {
            'success': true,
            'msg':'products is returned'}
        );
  })
app.listen(3000, ()=>{
    console.log(`server is running on http://localhost:3000`);
})
```

Now let's the Development Application with Nodemon

```bash
npm run dev
```
now we can visit [http://localhost:3000/products](http://localhost:3000/products) in our browser to see the response.

```javascript title="package.json" linenums="1" hl_lines="4-6"
const express = require('express');
const app = express()

const morgan = require('morgan')
// setup the logger
app.use(morgan('dev'))
app.get('/products', (req, res) => {
    res.status(200).send(
         {
            'success': true,
            'msg':'products is returned'}
        );
  })
app.listen(3000, ()=>{
    console.log(`server running on http://localhost:3000`);
})
```
now if we send any request to server e,g [http://localhost:3000/products](http://localhost:3000/products) we'll see logs in the terminal.


??? info "Express Middleware"

    Express middleware are functions that have access to the request object (`req`), the response object (`res`) and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named `next`.

    Middleware functions can perform the following tasks:<br>

    - Execute any code.<br>
    -  Make changes to the request and the response objects.<br>
    - End the request-response cycle.<br>
    - Call the next middleware function in the stack.<br>
    - If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.<br>
