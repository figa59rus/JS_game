var scoreDiv = "<div id='scoreDiv' style='margin: auto; display: flex; float: left'>";
var mainDiv = "<div id='mainDiv' style='margin: auto; display: flex'>";
var differenceMin = 40;
var differenceMax = 48;
var tableProp = "";
var bodyTable = "";
var rowOne, colOne;
var dimension = 2;
var tdSize = 250;
var seconds = 30;
var score = 0;
var level = 1; 
var showTimer;
createTable(tdSize, dimension);

function createTable(tdSz, n) 
{
	document.write(scoreDiv);
	document.write("<ul><li style='list-style-type: none;'><h1 id='data' style='text-align: left;'>Score: " + score + "  Level: " + level + "</h1></li></div>");
	seconds = 30;
	showTimer = setInterval(showTime, 1000);
	dimension = n; //размер
	hue = getRandomInt(0, 360); //тон
	saturation = getRandomInt(0,100); //насыщенность
	lightness = getRandomInt(20,90); //прозрачность
	alphaAll = getRandomInt(20,90); //альфа-канал
	alphaOne = getRandomInt(20,90);

	//чем выше уровень, тем сложнее 
	while ( Math.abs(alphaOne - alphaAll) >= differenceMax || Math.abs(alphaOne - alphaAll) <= differenceMin) 
		{
			alphaAll = getRandomInt(15,90);
			alphaOne = getRandomInt(10,100);
		}
	//получаем итоговые цвета
	colorAll = "hsla(" + hue + "," + saturation + "%," + lightness + "%," + alphaAll/100 + ")"; 
	colorOne = "hsla(" + hue + "," + saturation + "%," + lightness + "%," + alphaOne/100 + ")";

	rowOne = getRandomInt(0, dimension);
	colOne = getRandomInt(0, dimension);

	td = "<td style = 'background-color: " + colorAll + "; width:" + tdSz + "px; height:" + tdSz + "px'";
	td += " onclick = 'assert(this)'></td>";
	tdOne = "<td style = 'background-color: " + colorOne + "; width:" + tdSz + "px; height:" + tdSz + "px'";
	tdOne += " onclick = 'assert(this)'></td>";
	tableProp = "<table id = 'tableProp' style = 'background-color:#ccccaa; cursor:pointer; margin: auto; display: flex; border = 1px'>";
	
	bodyTable = tableProp;
	for (i = 0; i < dimension; i++) 
	{
		bodyTable += "<tr>";
		for (j = 0; j < dimension; j++) 
		{
			if (i != rowOne || j != colOne)
				bodyTable += td;
			else
				bodyTable += tdOne;
		}
		bodyTable += "</tr>";
	}
	bodyTable += "</table>";

	document.write(mainDiv);
	document.write(bodyTable);
	document.write("</div>");
	tableProp = document.getElementById("tableProp");	
}

function assert(cell) 
{
	if (isTrueCell(cell))
	{
		if (differenceMin>10) //чем меньше значения, тем меньше разница по цветам
		{
			differenceMin--;
			differenceMax--;
		}
		else if (differenceMax>13) //число вычисленно эксперементальным путём (чтобы избежать одинаковых цветов)
			differenceMax--;
		dimension++;
		tdSize = tdSize / dimension * (dimension - 1);
		document.body.innerHTML="";
		score += level;
		level++;
		clearInterval(showTimer);
		createTable(tdSize, dimension);
	}
	else
	{
		endOfGame();
	}
}

function isTrueCell(cell)
{
	column = cell.cellIndex;
	row = getRow(cell, column);
	if (row === rowOne && column === colOne)
		return true;
	else
		return false;
}

function getRow(cell, column) 
{
	for (i = 0; i < dimension; i++) 
	{
		allRow = tableProp.rows[i];
			if (allRow.cells[column] == cell) 
				return i;
	}
}

function getRandomInt(min, max) 
{
	min = Math.ceil(min);
	max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function endOfGame() 
{
	alert("Ohh no! Your score: " + score + ". Your level: " + level);
	score = 0;
	level = 1;
	dimension = 2;
	tdSize = 380;
	differenceMax = 48;
	differenceMin = 40;	
	clearInterval(showTimer);
	window.location.reload();
}

function showTime ()
{
	
	if (seconds === -1)
		endOfGame();
	else
	{
		doc = document.getElementById('scoreDiv');
		doc.innerHTML = "";
		doc.innerHTML = "<ul><li style='list-style-type: none;'><h1 id='data' style='text-align: left; margin: auto; display: flex'>Score: " + score + "  Level: " + level + "</h1></li> <li style='list-style-type: none;'><h2 style='text-align: left; margin: auto; display: flex';>Seconds to lose: " + seconds + "</h2></li></ul>";
		seconds--;
	}
}