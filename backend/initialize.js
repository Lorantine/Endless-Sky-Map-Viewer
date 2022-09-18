var canvas=document.getElementById(`canvas`)
canvas.height=screen.height
canvas.width=screen.width
var canvasContext=canvas.getContext(`2d`)
var headsUp=document.getElementById(`headsUp`)
headsUp.height=screen.height
headsUp.width=screen.width
var HUDContext=headsUp.getContext(`2d`)
var galaxy=document.getElementById(`galaxy`)
function initialize(){
	if(localStorage.getItem(`help`)==`false`){
		document.getElementById(`help`).innerHTML=`Help Me!`
		document.getElementById(`helpUpload`).classList.add(`hidden`)
		document.getElementById(`helpStyle`).classList.add(`hidden`)
		document.getElementById(`helpAllocation`).classList.add(`hidden`)
		document.getElementById(`helpBuffer`).classList.add(`hidden`)
		document.getElementById(`helpGalaxy`).classList.add(`hidden`)
		document.getElementById(`helpZoom`).classList.add(`hidden`)
		help=false
	}
	canvasContext.scale((1/3)/scale,(1/3)/scale)
	HUDContext.scale((1/3)/scale,(1/3)/scale)
	canvasContext.drawImage(galaxy,400,100)
}
