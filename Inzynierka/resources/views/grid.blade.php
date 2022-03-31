<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
</head>

<script src="{{asset('Frontend/Js/Grid/grid.js')}}"></script>


<link href="{{asset('Frontend/css/grid/grid.css')}}" rel="stylesheet">

<body>


<label for="x">row:</label>
<input type="number" id="x" name="x" value="3">
<label for="y">column:</label>
<input type="number" id="y" name="y" value="5">

<button type="button" class="btn btn-primary">Primary</button>
<button onclick="addRow(document.getElementById('x').value,document.getElementById('y').value)">GENERATE GRID</button>
<button onclick="showGrid()">SUBMIT</button>

<div id="reload">
    <script> addRow(3,5)</script>
</div>



</body>

</html>

