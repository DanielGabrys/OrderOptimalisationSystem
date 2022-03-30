<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
</head>

<script src="{{asset('Frontend/Grid/grid.js')}}"></script>

<body>


<label for="x">row:</label>
<input type="number" id="x" name="x" value="3">
<label for="y">column:</label>
<input type="number" id="y" name="y" value="5">

<button onclick="addRow(document.getElementById('x').value,document.getElementById('y').value)">GENERATE GRID</button>
<button onclick="showGrid()">SUBMIT</button>

<div id="reload">
    <script> addRow(3,5)</script>
</div>



</body>

</html>

<style>
    #reload {
        float: none;
    }

    .unselected_cell {
        background-color: #EED;
        width: 80px;
        height: 80px;
        float: left;
        border: solid 1px black;
        cursor: pointer;
    }

    .selected_cell {
        background-color: green;
        width: 80px;
        height: 80px;
        float: left;
        border: solid 1px black;
        cursor: pointer;

    }
</style>
