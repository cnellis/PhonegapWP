////////////////////////////////////////////////////////////////////////////////////////////////// Login
function login()
{
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
 
 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://eshop.austinecommercedevelopers.com/wp-admin/admin-ajax.php?action=login&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
    xhr.onload = function(){
    
            fetch_and_display_posts2();
            $("#page_two_link").click();
       
    }   
    xhr.send();
}
 
function open_browser(link)
{
    window.open(link, '_blank', 'location=yes');
}

//////////////////////////////////////////////////////////////////////////////////////////////////Posts
function fetch_and_display_posts2()
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://eshop.austinecommercedevelopers.com/wp-admin/admin-ajax.php?action=posts2");
    xhr.onload = function(){
        var posts_array = JSON.parse(xhr.responseText);
 
        var html = "";
 
        for(var count = 0; count < posts_array.length; count++)
        {
            var title = posts_array[count][0];
            var link = posts_array[count][1];
            var date = posts_array[count][2];
            var image = posts_array[count][3];
            var excerpt = posts_array[count][4];
            var author = posts_array[count][5];
            var comments = posts_array[count][6];
 
            html = html + "<li>" + "<a href='javascript:open_browser(\"" + link + "\")'>" + "<img height='128' width='128' src='" + image + "'>" + "<h2>" + title + "</h2>" + "<p>" + excerpt + "</p>" + "<p>" + comments + "</p>" + "<p>" + author + "</p>" + "<p>" + date + "</p></a></li>";
        }
 
        document.getElementById("posts2").innerHTML = html;
        $("#posts2").listview("refresh");
    }
    xhr.send();
}

////////////////////////////////////////////////////////////////////////////////////////////////// Pages
function fetch_and_display_posts3()
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://eshop.austinecommercedevelopers.com/wp-admin/admin-ajax.php?action=posts3");
    xhr.onload = function(){
        var posts_array = JSON.parse(xhr.responseText);
 
        var html = "";
 
        for(var count = 0; count < posts_array.length; count++)
        {
            var title = posts_array[count][0];
            var link = posts_array[count][1];
            var date = posts_array[count][2];
            var image = posts_array[count][3];
 
            html = html + "<li>" + "<a href='javascript:open_browser(\"" + link + "\")'>" + "<img height='128' width='128' src='" + image + "'>" + "<h2>" + title + "</h2>" + "<p>" + date + "</p></a></li>";
        }
 
        document.getElementById("posts3").innerHTML = html;
        $("#posts3").listview("refresh");
    }
    xhr.send();
}

///////////////////////////////////////////////////////////// ONCLICK EVENTS

$( "#page2" ).click(function() {
  
    fetch_and_display_posts2();
     $("#page_two_link").click();
    
});


$( "#page3" ).click(function() {
        fetch_and_display_posts3();
      $("#page_three_link").click();
           
});
