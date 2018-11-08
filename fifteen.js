"use strict"; 
var piece; 
var notify;
var timer;
var spaceY;
var spaceX;


 window.onload = function ()

{

	var puzzleArea = document.getElementById('puzzlearea');
	piece = puzzleArea.getElementsByTagName('div'); 

	for (var i=0; i<piece.length; i++) 
	{

		piece[i].className = 'puzzlepiece'; 
		piece[i].style.left = (i%4*100)+'px'; 
		piece[i].style.top = (parseInt(i/4)*100) + 'px'; 
		piece[i].style.backgroundPosition= '-' + piece[i].style.left + ' ' + '-' + piece[i].style.top; 
		

		piece[i].onmouseover = function() 

		{
			if (checkMove(parseInt(this.innerHTML)))

			{
				this.style.border = "2px solid red";
				this.style.color = "#006600";
				this.style.textDecoration = "underline";
                this.style.backgroundImage="url('http://www.georginalandick.com/wp-content/uploads/2016/09/Coastal-Trail-Artwork-400x400px.jpg')"; 
            }

		};


		piece[i].onclick = function() 
		{

			if (checkMove(parseInt(this.innerHTML))) 

			{
				swap(this.innerHTML-1); 


				if (finish()) 

				{

					win(); 

				}

				return;

			}

		};


		piece[i].onmouseout = function() 

		{
			this.style.border = "2px solid black"; 
			this.style.color = "#000000";
			this.style.textDecoration = "none"; 
		};

	}



	var shuffle = document.getElementById('shufflebutton'); 

	spaceX = '300px'; 
	spaceY = '300px';

	shuffle.onclick = function() 

	{

		for (var i=0; i<300; i++) 

		{

			var rand = parseInt(Math.random()* 100) %4; 

			if (rand == 0)

			{

				var temp = up(spaceX, spaceY); 

				if ( temp != -1)

				{

					swap(temp);

				}

			}

			if (rand == 1)

			{

				var temp = down(spaceX, spaceY);

				if ( temp != -1) 

				{

					swap(temp);

				}

			}



			if (rand == 2)

			{

				var temp = left(spaceX, spaceY);

				if ( temp != -1)

				{

					swap(temp);

				}

			}


			if (rand == 3)

			{

				var temp = right(spaceX, spaceY);

				if (temp != -1)

				{

					swap(temp);

				}

			}

		}

	};

};



function checkMove(position) 

{

	if (left(spaceX, spaceY) == (position-1))

	{

		return true;

	}



	if (down(spaceX, spaceY) == (position-1))

	{

		return true;

	}



	if (up(spaceX, spaceY) == (position-1))

	{

		return true;

	}



	if (right(spaceX, spaceY) == (position-1))

	{

		return true;

	}

}


function Notify()  

{

	notify --;  

	if (notify == 0) 

	{

		var body = document.getElementsByTagName('body');

		body[0].style.backgroundImage= "none"; 

		alert('Winner! ... Shuffle and Play Again');  

		var para=document.getElementsByClassName('explanation');
	    para[0].style.visibility="visible"; 

		return;

	}

	else  (notify % 2) 

	{

		var body = document.getElementsByTagName('body'); 

	    body[0].style.backgroundImage= "url('http://www.georginalandick.com/wp-content/uploads/2016/09/Coastal-Trail-Artwork-400x400px.jpg')";
	    
		
	}

    timer= setTimeout(Notify, 200);
}



function win() 
{

	var body = document.getElementsByTagName('body');

	
	body[0].style.backgroundImage= "url('http://www.georginalandick.com/wp-content/uploads/2016/09/Coastal-Trail-Artwork-400x400px.jpg')";

	notify = 10; 

	timer= setTimeout(Notify, 200);

	var para=document.getElementsByClassName('explanation');
	para[0].style.visibility="hidden"; 

}


function finish() 

{

	var flag = true;

	for (var i = 0; i < piece.length; i++)  
	{

		var top = parseInt(piece[i].style.top);

		var left = parseInt(piece[i].style.left);


		if (left != (i%4*100) || top != parseInt(i/4)*100) 

		{

			flag = false;

			break;

		}

	}

	return flag;

}



function left(x, y) 

{

	var cordX = parseInt(x);

	var cordY = parseInt(y);



	if (cordX > 0)

	{

		for (var i = 0; i < piece.length; i++) 

		{

			if (parseInt(piece[i].style.left) + 100 == cordX && parseInt(piece[i].style.top) == cordY)

			{

				return i;

			} 

		}

	}

	else 

	{

		return -1;

	}

}



function right (x, y) 
{

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordX < 300)

	{

		for (var i =0; i<piece.length; i++){

			if (parseInt(piece[i].style.left) - 100 == cordX && parseInt(piece[i].style.top) == cordY) 

			{

				return i;

			}

		}

	}

	else

	{

		return -1;

	} 

}



function up(x, y) 
{

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordY > 0)

	{

		for (var i=0; i<piece.length; i++)

		{

			if (parseInt(piece[i].style.top) + 100 == cordY && parseInt(piece[i].style.left) == cordX) 

			{

				return i;

			}

		} 

	}

	else 

	{

		return -1;

	}

}



function down (x, y) 

{

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordY < 300)

	{

		for (var i=0; i<piece.length; i++)

		{

			if (parseInt(piece[i].style.top) - 100 == cordY && parseInt(piece[i].style.left) == cordX) 

			{

				return i;

			}

		}

	}

	else

	{

		return -1;

	} 

}



function swap (position) 
{

	var temp = piece[position].style.top;

	piece[position].style.top = spaceY;

	spaceY = temp;

	temp = piece[position].style.left;

	piece[position].style.left = spaceX;

	spaceX = temp;

}
