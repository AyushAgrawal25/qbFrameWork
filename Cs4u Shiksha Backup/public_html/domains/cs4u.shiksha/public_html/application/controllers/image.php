<?php
        //$info=$this->index_model->selectDp(Session::get('peopleid'));
		if(file_exists('businesses/'.$_GET['bid'].'/logo/'.$_GET['lid'].'.jpg'))
		    $src_path='businesses/'.$_GET['bid'].'/logo/'.$_GET['lid'].'.jpg';
		else
		    $src_path='alpha/'.$_GET['alpha'].'.jpg';
		
        $src_image = imagecreatefromjpeg($src_path);
		list($width, $height) = getimagesize($src_path);
        // Create the output image as a true color image at the specified size
        //$dst_image = imagecreatetruecolor($_POST['width'], $_POST['height']);
		$dst_image = imagecreatetruecolor(200,200);

        // Copy and resize part of the source image with resampling to the
        // output image
        imagecopyresampled($dst_image, $src_image,0,0,0,0,200,200,$width,$height);
		//bool imagecopyresampled ( resource $dst_image , resource $src_image , int $dst_x , int $dst_y , int $src_x , int $src_y , int $dst_w , int $dst_h , int $src_w , int $src_h )
        // Destroy the source image
        imagedestroy($src_image);

        // Send a raw HTTP header
        header('Content-type: image/jpeg');

        // Output the image to browser
        imagejpeg($dst_image, null, 100);

        // Destroy the output image
        imagedestroy($dst_image);

        // Terminate the current script
        exit();
?>