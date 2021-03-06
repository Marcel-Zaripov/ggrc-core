/*
    Copyright (C) 2018 Google Inc.
    Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
*/

export default can.Model('GGRC.Models.Search', {
  findOne: 'GET /search',
  init: function () {
    let _findOne;
    if (this._super) {
      this._super(...arguments);
    }
    _findOne = this.findOne;

    this.findOne = function () {
      return _findOne.apply(this, arguments).then(function (data) {
        if (data.results.entries) {
          data.attr('entries', data.results.entries);
        }
        if (data.results.counts) {
          data.attr('counts', data.results.counts);
        }
        data.removeAttr('results');
        return data;
      });
    };
  },
  search: function (str, params) {
    return this.findOne($.extend({
      q: this._escapeSymbols(str),
    }, params));
  },
  search_for_types: function (str, types, params) {
    // This returns a Search instance, NOT a model instance.
    let result = this.findOne($.extend({
      q: this._escapeSymbols(str),
      types: types.join(','),
    }, params));
    return result;
  },
  counts: function (str, params) {
    return this.findOne($.extend({
      q: this._escapeSymbols(str),
      counts_only: true,
    }, params));
  },
  counts_for_types: function (str, types, params, extra_columns) {
    return this.findOne(
      $.extend({
        q: this._escapeSymbols(str),
        types: types.join(','),
        counts_only: true,
        extra_columns: extra_columns && extra_columns.join(','),
      }, params));
  },
  _escapeSymbols: function (str) {
    return str.replace(/(\\|%|_)/g, '\\$1');
  },
}, {
  getResultsForType: function (model_name) {
    let entries;

    if (!(this.entries instanceof Array ||
      this.entries instanceof can.Observe.List)) {
      entries = this.entries[model_name] || [];
    } else {
      entries = can.map(this.entries, function (v) {
        if (v.type === model_name) {
          return v;
        }
      });
    }

    return entries;
  },
  getCountFor: function (type) {
    let result;

    if (type && type.shortName) {
      type = type.shortName;
    }
    if (!this.counts[type]) {
      result = 0;
    } else {
      result = this.counts[type];
    }
    return result;
  },
});
