const http = require("http");
const fs = require("fs");
const port = process.env.PORT || 3000;
const users = [];

const server = http.createServer((req, res) => {
  const { url, method } = req;
  if (url === "/") {
    res.write(`
            <html>
                <h1> Welcome, user ! </h1>
                <form action="/create-user" method="POST">
                    <label for="username"> Username <label>
                    <input type="text" name="username">
                    <button type="submit"> Send </button>
                </form>
            </html>
        `);
    return res.end();
  }

  if (url === "/users") {
    res.write("<html>");
    res.write("<ul>");
    for (let user of users) {
      res.write(`<li> ${user.username} </li>`);
    }
    res.write("</ul>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      const user = { username: message };
      users.push(user);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.end();
});

server.listen(port);
