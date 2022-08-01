const got = require("got");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
// require("dotenv").config(); 


const PORT = 8088;
let jwt_token;

app.use(cors());
app.use(express.json());

//Serve index.html and all static files in public folder
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.use(express.static("public"));


app.get("/api/jwt", async (req, res) => {
  let voicegainApiUrl = new URL("https://api.voicegain.ai/v1/security/jwt");
  const bearer = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2FwaS52b2ljZWdhaW4uYWkvdjEiLCJzdWIiOiI1ZDQzZTdhNS02NmIzLTRlZWEtODEzYi1lMjE3YTBlZTVhY2YifQ.KPAuWZJDXUlrC8lVp0yo3uG16dzjYq4F97pbQ8XehBo";

  const options = {
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    searchParams: {
      aud: "localhost:8088",
      expInSec: 3600,
    },
  };

  try {
    const jwtResponse = await got(voicegainApiUrl.toString(), options);
    jwt_token = jwtResponse.body;
    return res.send({ jwtToken: jwt_token });
  } catch (err) {
    console.log(err)
    return res.status(err.response.statusCode).send(err.response.body);
  }
});

// app.get("/", (_, res) => res.sendFile(__dirname + "/index.html"));

app.listen(PORT, () => {
  console.log(`Demo App listening at: http://localhost:${PORT}`)
});


/*
JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2FwaS52b2ljZWdhaW4uYWkvdjEiLCJzdWIiOiI1ZDQzZTdhNS02NmIzLTRlZWEtODEzYi1lMjE3YTBlZTVhY2YifQ.KPAuWZJDXUlrC8lVp0yo3uG16dzjYq4F97pbQ8XehBo
Secret: iskc06/WZeERf4a4tizrJqxz1x6Fmzxfcg4iIZsjYiE=
*/