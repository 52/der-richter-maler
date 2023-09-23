var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

//
// The beng-proxy JavaScript library.
//
// Author: Max Kellermann <mk@cm4all.com>
//

function beng_widget_uri(base_uri, session_id, frame, focus, mode,
                         path, translate, view) {
    function _beng_proxy_escape(x)
    {
        return encodeURIComponent(x).replace(/%/g, '$');
    }

    if (base_uri == null ||
        (mode != null && mode != "focus" && mode != "frame" &&
         mode != "partial" && mode != "save"))
        return null;

    let params = "";

    if (translate != null)
        params += "&translate=" + _beng_proxy_escape(translate);

    if (focus != null) {
        if (mode == "frame")
            mode = "partial";

        params += "&focus=" + _beng_proxy_escape(focus);
        if (mode == "partial" || mode == "save")
            frame = focus;

        if (frame != null) {
            params += "&frame=" + _beng_proxy_escape(frame);

            if (view != null)
                params += "&view=" + _beng_proxy_escape(view);
        }

        if (path != null) {
            let query_string = null;
            let qmark = path.indexOf("?");
            if (qmark >= 0) {
                query_string = path.substring(qmark);
                path = path.substring(0, qmark);
            }
            params += "&path=" + _beng_proxy_escape(path);
            if (query_string != null)
                params += query_string;
        }
    }

    if (!params)
        return base_uri;

    return base_uri.concat(";", params.slice(1));
}

(window.cm4all && window.cm4all.widgets) || (function() {
    window.cm4all = window.cm4all || {};
    window.cm4all.widgets = window.cm4all.widgets || {};
    window.cm4all.widgets.register = window.cm4all.widgets.register || function(base, session, frame, path) {
        window.cm4all.widgets[path] = {
            url: function(pathInfo, options) {
                options = options || {};
                return beng_widget_uri(base, session, frame, path, options.mode || "partial", pathInfo || '');
            }
        };
    };
})();


}
/*
     FILE ARCHIVED ON 12:49:04 Jul 28, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 15:59:11 Sep 23, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 5561.711
  exclusion.robots: 0.207
  exclusion.robots.policy: 0.196
  cdx.remote: 0.082
  esindex: 0.013
  LoadShardBlock: 1840.734 (3)
  PetaboxLoader3.resolve: 1426.345 (5)
  PetaboxLoader3.datanode: 552.995 (5)
  load_resource: 485.614 (2)
*/