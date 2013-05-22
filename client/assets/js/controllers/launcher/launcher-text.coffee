launchTemplate = (corespringUrl, apiClientId, options, overrides, raw) ->
  out = """
<html>
<body>
<div id="my-div"></div>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<!-- requested options: 
#{raw}
-->
<script src="#{corespringUrl}/player.js?apiClientId=#{apiClientId}&options=#{options}"></script>
<script type="text/javascript">
    $(document).ready(function () {

        var log = function (msg) {
            var $box = $(".message-box")
            $box.html($box.html() + "<p>" + msg + "</p>");
        };
        //Here are the client side overridden options
        var options = #{overrides};
        options.width =  "600px";
        options.autoHeight = true;
        options.onItemSessionCreated = function (sessionId) {
          console.log("item session created.. " + sessionId);
        };
        options.onItemSessionRetrieved = function (sessionId) {
          console.log("item session retrieved.. " + sessionId);
        };
        options.onItemSessionCompleted = function (sessionId) {
          console.log("item session completed.. " + sessionId);
        }


        var onError = function (err) {
            throw "Error loading test player: " + err.msg;
        };

        new com.corespring.players.ItemPlayer('#my-div', options, onError);
    });</script>
</body>
</html>
"""
  out

angular.module("developer-toolkit")
  .factory('LauncherText', ->
     template : launchTemplate
  )