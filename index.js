const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const csv = require("csv-parser");
let idscache = [];
let mentionscache = [];
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const jsonData = await scrapeGoogleSheet();
  res.json(jsonData);
});

app.get("/json", async (req, res) => {
  const jsonData = await scrapeGoogleSheet();
  res.json(jsonData);
});

app.get("/csv", async (req, res) => {
  const csvData = await scrapeGoogleSheetCSV();
  res.send(csvData);
});

app.get("/ids", async (req, res) => {
  if (idscache.toString() == "") {
    await scrapeGoogleSheet();
  }
  res.send(idscache);
});

app.get("/mentions", async (req, res) => {
  if (mentionscache.toString() == "") {
    await scrapeGoogleSheet();
  }
  res.send(mentionscache);
});

async function scrapeGoogleSheet() {
  let mentions = [];
  let usernames = [];
  let reasons = [];
  let addeds = [];
  let proofs = [];
  try {
    const response = await axios.get(
      "https://docs.google.com/spreadsheets/d/1t3Prko-nEoxpBnNotYUS3fsYeZli-ASr9mXwXYRj96U/edit#gid=0",
    );
    const $ = cheerio.load(response.data);

    const data = [];
    $("table tbody tr:gt(0)").each((index, row) => {
      // Exclude the first row
      const columns = $(row).find("td");
      const mention = columns.eq(0).text().trim();
      const username = columns.eq(1).text().trim();
      const reason = columns.eq(2).text().trim();
      const added = columns.eq(3).text().trim();
      const proof = columns.eq(4).text().trim();
      mentions.push(mention);
      usernames.push(username);
      reasons.push(reason);
      addeds.push(added);
      proofs.push(proof);
    });
    mentions.shift();
    usernames.shift();
    reasons.shift();
    addeds.shift();
    proofs.shift();
    mentions = mentions.map((item) =>
      item.replace(
        "Quotes are not sourced from all markets and may be delayed up to 20 minutes. Information is provided 'as is' and solely for informational purposes, not for trading purposes or advice.Disclaimer",
        "",
      ),
    );
    mentions = mentions.filter((item) => item !== "");

    usernames = usernames.filter((item) => item !== "");
    reasons = reasons.filter((item) => item !== "");
    addeds = addeds.filter((item) => item !== "");
    proofs = proofs.filter((item) => item !== "");
    idscache = mentions.map((item) => item.replace("<@", "").replace(">", ""));

    mentionscache = mentions;
    data.push({
      mentions: mentions,
      usernames: usernames,
      reasons: reasons,
      addeds: addeds,
      proofs: proofs,
    });
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
}

async function scrapeGoogleSheetCSV() {
  const jsonData = await scrapeGoogleSheet();
  const csvData = jsonData.map((entry) => Object.values(entry).join(","));
  return csvData.join("\n");
}

async function scrapeTile(tile) {
  try {
    const response = await axios.get(
      `https://docs.google.com/spreadsheets/d/1t3Prko-nEoxpBnNotYUS3fsYeZli-ASr9mXwXYRj96U/edit#gid=0`,
    );
    const $ = cheerio.load(response.data);
    const tileData = $(`#${tile}`).text().trim();
    return tileData;
  } catch (error) {
    console.error("Error:", error.message);
    return "";
  }
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
