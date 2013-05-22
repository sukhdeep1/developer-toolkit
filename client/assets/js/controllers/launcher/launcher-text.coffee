launchTemplate = (corespringUrl, apiClientId, options) ->
  out = """
<html>
<body>
<div id="my-div"></div>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="#{corespringUrl}/player.js?apiClientId=#{apiClientId}&options=#{options}"></script>
<script type="text/javascript">
    $(document).ready(function () {

        var log = function (msg) {
            var $box = $(".message-box")
            $box.html($box.html() + "<p>" + msg + "</p>");
        };

        var options = {
            assessmentId: "",
            sessionId: "",
            itemId: "",
            mode: "preview",
            width: "600px",
            autoHeight: true,
            onItemSessionCreated: function (sessionId) {
                log("item session created.. " + sessionId);
            },
            onItemSessionRetrieved: function (sessionId) {
                log("item session retrieved.. " + sessionId);
            },
            onItemSessionCompleted: function (sessionId) {
                log("item session completed.. " + sessionId);
            }
        };

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