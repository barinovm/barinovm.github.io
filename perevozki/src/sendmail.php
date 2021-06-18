<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';
  require 'phpmailer/src/SMTP.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'phpmailer/language/');
  $mail->IsHTML(true);

  $mail->isSMTP();
  $mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
  $mail->SMTPAuth = true;
  $mail->Username = '4952680241@mail.ru';
  $mail->Password = 'perevozkinedorogo';
  $mail->SMTPSecure = 'ssl';
  $mail->Port = 465;

  $mail->setFrom('4952680241@mail.ru', 'Запрос с сайта');
  $mail->addAddress('4952680241@mail.ru');
  $mail->Subject = 'Кто-то хочет оставить заказ!';

  $phone = $_POST['phone'];

  $mail->Body    = '' .$phone. ' - перезвони ' ;
  $mail->AltBody = '';

  if (!$mail->send()) {
    $message = 'Упс... Что-то пошло не так';
  } else {
    $message = 'Спасибо! Мы Вам перезвоним в ближайшее время';
  }

  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);
?>
