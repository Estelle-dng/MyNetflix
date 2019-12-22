<?php 

$user = 'root';
$pass = 'root';

try {
    $dbh = new PDO('mysql:host=localhost;dbname=myNetflix', $user, $pass);
} 
catch (PDOException $e) {
    print "Erreur !: " . $e->getMessage() . "<br/>";
    die();
}
?>
