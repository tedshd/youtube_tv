<?php
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2015-04-05 19:07:42
 */

include_once "Mobile_Detect.php";

$mobile_detect = new Mobile_Detect;
$mobile = $mobile_detect->isMobile();

if ($mobile) {
    require_once "mobile_page.php";
} else {
    require_once "pc_page.php";
}

?>