<?php

ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
'oauth_access_token' => "535048902-X2uGr0MgTqrsixMpDfp8DlD6g9lanHFhb1zsLDkV",
'oauth_access_token_secret' => "w6CijjuW69IQ4CHuFUUdLFwF731b2QvnfFrPhcTmUaKuR",
'consumer_key' => "ooJvnAPty4xHdr4WK6jQyq1SD",
'consumer_secret' => "i37AgEbJyXaqCu6Uj0qM0zH5xF6LF4bkzO9MUZHybhKOhEE8tu"
);

/** Perform a GET request and echo the response **/
/** Note: Set the GET field BEFORE calling buildOauth(); **/
$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
$requestMethod = 'GET';
$getfield = '?screen_name=giathinh910';
$twitter = new TwitterAPIExchange($settings);
$result = json_decode($twitter->setGetfield($getfield)->buildOauth($url, $requestMethod)->performRequest(), true);
// var_dump($result[0]);

function twitter_time($a) {
	//get current timestampt
	$b = strtotime("now"); 
	//get timestamp when tweet created
	$c = strtotime($a);
	//get difference
	$d = $b - $c;
	//calculate different time values
	$minute = 60;
	$hour = $minute * 60;
	$day = $hour * 24;
	$week = $day * 7;
	
	if(is_numeric($d) && $d > 0) {
		//if less then 3 seconds
		if($d < 3) return "right now";
		//if less then minute
		if($d < $minute) return floor($d) . " seconds ago";
		//if less then 2 minutes
		if($d < $minute * 2) return "about 1 minute ago";
		//if less then hour
		if($d < $hour) return floor($d / $minute) . " minutes ago";
		//if less then 2 hours
		if($d < $hour * 2) return "about 1 hour ago";
		//if less then day
		if($d < $day) return floor($d / $hour) . " hours ago";
		//if more then day, but less then 2 days
		if($d > $day && $d < $day * 2) return "yesterday";
		//if less then year
		if($d < $day * 365) return floor($d / $day) . " days ago";
		//else return more than a year
		return "over a year ago";
	}
}