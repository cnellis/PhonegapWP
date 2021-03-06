<?php
/*
 
	Plugin Name: Phonegap
	Author: Adam
 
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Login
function already_logged_in()
{
    echo "User is already Logged In";
    die();
}
 
function login()
{
    $creds = array();
    $creds['user_login'] = $_GET["username"];
    $creds['user_password'] = $_GET["password"];
 
    $user = wp_signon($creds, false);
    if (is_wp_error($user))
    {
        echo "FALSE";
        die();
    }
     
    echo "TRUE";
    die();
}
 
add_action("wp_ajax_login", "already_logged_in");
add_action("wp_ajax_nopriv_login", "login");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Get Posts
function posts2()  {

    header("Content-Type: application/json");
 
    $posts_array = array();
 
    $args = array("post_type" => "post", "orderby" => "date", "order" => "DESC", "post_status" => "publish", "posts_per_page" => "10");
 
    $posts = new WP_Query($args);
     
    if($posts->have_posts()):
        while($posts->have_posts()): 
            $posts->the_post();
             
            $post_array = array(get_the_title(), get_the_permalink(), get_the_date(), wp_get_attachment_url(get_post_thumbnail_id()), get_the_excerpt(), get_the_author(), get_comments_number());

            array_push($posts_array, $post_array);
             
        endwhile;
        else:
            echo "{'posts' = []}";
            die();
    endif;
     
    echo json_encode($posts_array);
 
    die();
}

add_action("wp_ajax_posts2", "posts2");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Get Pages
function posts3()
{
    header("Content-Type: application/json");
 
    $posts_array = array();
 
    $args = array("post_type" => "page", "orderby" => "date", "order" => "DESC", "post_status" => "publish", "posts_per_page" => "10");
 
    $posts = new WP_Query($args);
     
    if($posts->have_posts()):
        while($posts->have_posts()): 
            $posts->the_post();
             
            $post_array = array(get_the_title(), get_the_permalink(), get_the_date(), wp_get_attachment_url(get_post_thumbnail_id()));
            array_push($posts_array, $post_array);
             
        endwhile;
        else:
            echo "{'posts' = []}";
            die();
    endif;
     
    echo json_encode($posts_array);
 
    die();
}

add_action("wp_ajax_posts3", "posts3");

 //////////////////////////////////////////////////////////////////////////// End
function no_posts()
{
    echo "Please login";
    die();
}
 
add_action("wp_ajax_nopriv_posts", "no_posts");
?>