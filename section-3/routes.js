const fs = require("fs");

const requestHandler = (request, response) => {
  const { url, method } = request;
  if (url === "/") {
    response.write("<html>");
    response.write("<head><title> Enter message </title></head>");
    response.write(
      `<body>
              <form action='/message' method='POST'>
                <input type='text' name='message'>
                <button type="submit"> Send </button>
              </form>
             </body>`
    );
    response.write("</html>");
    return response.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    request.on("data", (chunk) => {
      body.push(chunk);
    });

    return request.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        response.statusCode = 302;
        response.setHeader("Location", "/");
        return response.end();
      });
    });
  }

  response.setHeader("Content-Type", "text/html");
  response.write("<html><h1>Hello, World!</h1></html>");
  response.end();
};

module.exports = requestHandler;
