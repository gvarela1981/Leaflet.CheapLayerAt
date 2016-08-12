
L.Map.include({

	getLayerAtLatLng: function(lat, lng) {
		latlng = L.latLng(lat, lng);
		return this.getLayerAt(this.latLngToContainerPoint(latlng).x, this.latLngToContainerPoint(latlng).y);
	},

	getLayerAt: function(point, y) {
		point = L.point(point, y);

		// Ignore points outside the map
		if (!this.getSize().contains(point)) {
			return;
		}

		var mapPos = this._container.getBoundingClientRect();

		var viewportPoint = L.point(mapPos.left, mapPos.top).add(point);

		var el = document.elementFromPoint(viewportPoint.x, viewportPoint.y);

		return this._getLayerFromDOMElement(el);
	},

	_getLayerFromDOMElement: function(el) {
		if (el === this._container) {
			return;
		}

		var id = L.stamp(el);
		if (id in this._targets) {

			/// TODO: Extra logic for canvas, maybe another call to getLayerAt

			return this._targets[id];
		}

		return this._getLayerFromDOMElement(el.parentElement);
	}

});
