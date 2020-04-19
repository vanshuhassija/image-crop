<?php
header('Access-Control-Allow-Origin:*');
define('AWS_S3_KEY', 'MY_ACCESS_KEY');
 define('AWS_S3_SECRET', 'MY_SECRET');
 define('AWS_S3_REGION', 'BUCKET_REGION');
 define('AWS_S3_BUCKET', 'BUCKET_NAME');
 define('AWS_S3_URL', 'http://s3.'.AWS_S3_REGION.'.amazonaws.com/'.AWS_S3_BUCKET.'/');

 


 
 $tmpfile = $_FILES['file']['tmp_name'];
$file = $_FILES['file']['name'];

$fileinfo = @getimagesize($_FILES["file"]["tmp_name"]);
$width = $fileinfo[0];
$height = $fileinfo[1];

 $allowed_image_extension = array(
        "png",
        "jpg",
        "jpeg",
        ".webp"
    );
    
    // Get image file extension
$file_extension = pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION);
    
    // Validate file input to check if is not empty
    if (! file_exists($_FILES["file"]["tmp_name"])) {
        $response = array(
            "type" => "error",
            "message" => "Choose an image to upload."
        );
        echo json_encode($response);
    }    // Validate file input to check if is with valid extension
    else if (! in_array($file_extension, $allowed_image_extension)) {
        $response = array(
            "type" => "error",
            "message" => "Upload valid images. Only PNG,JPG,JPEG are allowed."
        );
        echo json_encode($response);
    }    
    else if($width!=1024&&$height!==1024)
    {
       
        $response=array(
            'type'=>'error',
            'message'=>"File size should be 1024*1024");
        echo json_encode($response);
    }


else if (defined('AWS_S3_URL')) {
  // Persist to AWS S3 and delete uploaded file
  require_once('S3.php');
  S3::setAuth(AWS_S3_KEY, AWS_S3_SECRET);
  S3::setRegion(AWS_S3_REGION);
  S3::putObject(S3::inputFile($tmpfile), AWS_S3_BUCKET, $file, S3::ACL_PUBLIC_READ);
  $s3file='http://'.AWS_S3_BUCKET.'.s3.amazonaws.com/'.$file;

 $response = array(
        'type'=>"success",
        'url' =>$s3file
    );

   echo json_encode($response);
} 
?>