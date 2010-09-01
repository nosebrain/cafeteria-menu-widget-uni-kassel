/**
 * Cafeteria Widget - University of Kassel
 *
 *
 * Copyright 2009 - 2010, Daniel Zoller
 *                        http://nosebrain.de
 *
 * This widget is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This widget is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this widget; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA 
 *
 *
 * @author Daniel Zoller<nosebrain@gmx.net>
 */

function WidgetUpdater() {
  reader = new InfoPlistReader();
  
  this.updateURL = reader.get("oldUpdateSite");
  this.currentVersion = reader.get("CFBundleShortVersionString");
  this.downloadURL = reader.get("oldDownloadUpdateSite");
}

WidgetUpdater.prototype.checkForUpdate = function() {
  var request = new XMLHttpRequest();
  
  var self = this;  
  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      // "OK"
      if (this.status == 200) {
        if (this.responseText != self.currentVersion) {
          ElementUtils.show(UPDATE_DIV_ID);
        } else {
          ElementUtils.hide(UPDATE_DIV_ID);
        }
      }
    }
  };
    
  request.open("GET", this.updateURL, true);
  request.send(null);
}

WidgetUpdater.prototype.getDownloadURL = function() {
  return this.downloadURL;
}