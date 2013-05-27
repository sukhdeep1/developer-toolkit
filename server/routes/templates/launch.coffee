exports.template = (
      url = "\#{url}",
      clientId = "\#{clientId}",
      encrypted = "\#{encrypted}",
      overrides = "\#{overrides}",
      unencrypted = "\#{unencrypted}") ->

  out = """
        <html>
          <body>
            <div id="my-div"></div>
            <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
            <!-- your unencrypted options:
              #{unencrypted}
            -->
            <script type="text/javascript" src="#{url}/player.js?apiClientId=#{clientId}&options=#{encrypted}"></script>
            <script type="text/javascript">
              $(document).ready(function () {
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
            });
            </script>
          </body>
        </html>
        """
  out

