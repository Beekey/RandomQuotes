$(document).ready(function() {
  // Array of partial background image addresses
  var backgroundUrls = ["v1466640152/background2j_ilelgw.jpg", "v1466672011/02backgroundj_nad0na.jpg", "v1466688535/03backgroundj2_w6c0ru.jpg", "v1466680631/04backgroundj2_fj4yts.jpg", "v1466678694/05backgroundj_s01dpi.jpg", "v1466683000/06backgroundj_hwahyw.jpg", "v1466684886/07backgroundj_sqlu5n.jpg", "v1466687237/08backgroundj_i52qfo.jpg", "v1466693540/09backgroundj_i4rgbf.jpg"];
  // Get quote from:
  // Quotes on Design
  // http://quotesondesign.com/api-v4-0/
  function getNewQuote() {

    var url = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=" + new Date().getTime()
    if (window.location.protocol === "https:") url = "https://cors-anywhere.herokuapp.com/" + url;
    $.getJSON(url, function(json) {

      var title = json[0].title;
      var content = json[0].content;
      //  Clean up quote text for page
      content = content.replace(/<p>|<\/p>|\n/g, "");
      var html = "<p class='quo'>" + content + "</p>" + "<p id='author'>" + title + "</p>";
      $(".quote").html(html);
      // Randomly select and hange background image
      var newBackground = backgroundUrls[Math.floor(Math.random() * 9)];
      newBackground = "url('http://res.cloudinary.com/beekey/image/upload/" + newBackground + "')";
      $("body").css("background-image", newBackground)
        // Forming Twitter text
      var href = content.concat(" ").concat(title);
      // Cleaning up text for Twitter
      href = href.replace(/\&\#8216\;|\&\#8217\;|\&\#8220\;|\&\#8221\;/g, "'");
      href = href.replace(/\&\#8211\;|\&\#8212\;/g, "-");
      href = href.replace(/\&\#8230\;/g, "...");
      href = href.replace(/<em>|<\/em>|<strong>|<\/strong>|\%/g, "");
      href = href.replace(/<br\s\/>/g, " ");
      href = href.replace(/\;/g, ",");
      // Create Twitter link 
      href = "https://twitter.com/intent/tweet?text=".concat(href);
      $("#tweetHref").prop("href", href);
    });
  };
  // Get initial quote
  getNewQuote();

  // Get a new quote on request
  $("#getQuote").on("click", function() {
    getNewQuote()
  });

}); // End of $(document).ready