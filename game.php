<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/style.css">
  <title>My game</title>
 
</head>
<body>
  <div class="game center">
    <div class="canvas-wrapper">
      <p id="tagline">  Hi, <?php echo $_POST["username"]; ?>, I am Hungry!!</p>
      <p id="score"></p>
      <p id="highscore"></p>
      <canvas id="canvas-top"></canvas>
    </div>
    
  </div>
  
  <script src="script.js"></script>
</body>
</html>