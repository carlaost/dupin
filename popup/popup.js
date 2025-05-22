console.log("This is a popup!")

chrome.storage.local.get(null, function(items) {
  console.log(items);
});
