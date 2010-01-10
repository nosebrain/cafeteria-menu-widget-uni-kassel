function Updater() {
  reader = new InfoPlistReader();
  
  this.updateURL = reader.get("oldUpdateSite");
  this.currentVersion = reader.get("CFBundleShortVersionString");
  this.downloadURL = reader.get("oldDownloadUpdateSite");
}

Updater.prototype.checkForUpdate = function() {
  var request = new XMLHttpRequest();
  
  var self = this;  
  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      // "OK"
      if (this.status == 200) {
        if (this.responseText != self.currentVersion) {
          showElement(UPDATE_DIV_ID);
        } else {
          hideElement(UPDATE_DIV_ID);
        }
      }
    }
  };
    
  request.open("GET", this.updateURL, true);
  request.send(null);
}

Updater.prototype.getDownloadURL = function() {
  return this.downloadURL;
}