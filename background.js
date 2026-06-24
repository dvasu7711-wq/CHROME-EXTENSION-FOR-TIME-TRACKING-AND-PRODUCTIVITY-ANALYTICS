let activeTab = "";
let startTime = Date.now();

const productiveSites = ["github.com", "stackoverflow.com", "geeksforgeeks.org"];
const unproductiveSites = ["facebook.com", "instagram.com", "youtube.com", "twitter.com"];

function classify(url) {
  if (!url) return "neutral";
  if (productiveSites.some(site => url.includes(site))) return "productive";
  if (unproductiveSites.some(site => url.includes(site))) return "unproductive";
  return "neutral";
}

async function sendData(site, timeSpent) {
  const category = classify(site);

  await fetch("http://localhost:3000/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      site,
      time: timeSpent,
      category
    })
  });
}

async function updateTab(tabId) {
  let tab = await chrome.tabs.get(tabId);
  if (!tab.url) return;

  let endTime = Date.now();
  let timeSpent = (endTime - startTime) / 1000;

  if (activeTab) {
    await sendData(activeTab, timeSpent);
  }

  activeTab = tab.url;
  startTime = Date.now();
}

chrome.tabs.onActivated.addListener((activeInfo) => {
  updateTab(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.url) {
    updateTab(tabId);
  }
});