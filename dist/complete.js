/**
 * DocData - NPM package for web app
 * @version v0.0.1
 * @link http://www.drevidence.com
 * @license 
 */
(function() {
  (function() {
    var Doc, thisGlobal, _ref, _ref1;
    thisGlobal = (_ref = typeof global !== 'undefined' && global) != null ? _ref : {
      global: (_ref1 = typeof window !== 'undefined') != null ? _ref1 : {
        window: this
      }
    };
    Doc = thisGlobal.OJ;
    return thisGlobal.Doc = Doc;
  })();

}).call(this);

(function() {


}).call(this);

(function() {
  (function() {
    var subNav;
    return subNav = function(owner, props) {
      var ret, ul;
      ({
        defaults: {
          active: '',
          menu: [
            {
              name: '',
              href: ''
            }
          ]
        }
      });
      Dre.extend(defaults, props);
      ret = Dre.component(owner, 'dre-sidebar-subnav');
      ul = ret.ul({
        attr: {
          "class": 'animated fadeIn'
        }
      });
      return Dre.each(defaults.menu, function(val, key) {
        var li;
        if (val.name === defaults.active) {
          li = ul.li({
            attr: {
              "class": 'active'
            }
          });
        } else {
          li = ul.li;
        }
        li.a({
          attr: {
            href: val.href
          }.text(val.name)
        });
      });
    };
  })();

}).call(this);

(function() {


}).call(this);
