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
 
var UPDATE_DIV_SELECTOR = '#updateImg';

function WidgetUpdater() {
  var reader = new InfoPlistReader();
  
  this.updateURL = reader.get('oldUpdateSite');
  this.currentVersion = reader.get('CFBundleShortVersionString');
  this.downloadURL = reader.get('oldDownloadUpdateSite');
}

WidgetUpdater.prototype.checkForUpdate = function() {
  var self = this;
  $.ajax({
    url: this.updateURL,
    success: function(data) {
      self.gotVersion(data);
    }, 
    error: function(request, textStatus, errorThrown) {
      self.handleError(request, textStatus, errorThrown);
    }
  });
}

WidgetUpdater.prototype.handleError = function(request, textStatus, errorThrown) {
  // log error
  alert(textStatus + ' ' + errorThrown);
}

WidgetUpdater.prototype.gotVersion = function(version) {
  if (version != this.currentVersion) {
    $(UPDATE_DIV_SELECTOR).show();
  } else {
    $(UPDATE_DIV_SELECTOR).hide();
  }
}

WidgetUpdater.prototype.getDownloadURL = function() {
  return this.downloadURL;
}