var accessiblePlanets=0
var xCoordinate
var yCoordinate
var oldTarget=0
var target=0
var distance
var systemSelected;
function onMouseMove(event){
	xCoordinate=Math.round((event.offsetX*3-2150)*scale)
	yCoordinate=Math.round((event.offsetY*3-1350)*scale)
	distance=100000
	for(i1=0;i1<elements[0].length;i1++){
		if(Math.dist(elements[0][i1][1][0]-galaxyPosition[0],elements[0][i1][1][1]-galaxyPosition[1],xCoordinate,yCoordinate)<distance){
			target=i1
			distance=Math.dist(elements[0][i1][1][0]-galaxyPosition[0],elements[0][i1][1][1]-galaxyPosition[1],xCoordinate,yCoordinate)
		}
	}
	if(oldTarget!==target&&distance<100){
		for(i1=0;i1<elements[1].length;i1++){
			if(elements[0][target][2]==elements[1][i1][0]){
				oldTarget=target
				HUDContext.clearRect(0,0,100000,100000)
				HUDContext.drawImage(galaxies,canvas.width*scale*2.52,0,galaxies.width*1.4*scale,galaxies.height*1.4*scale)
				HUDContext.drawImage(system,0,0,system.width*1.4*scale,system.height*1.4*scale)
				document.getElementById(`systemDisplay`).innerHTML=elements[0][target][0]
				document.getElementById(`systemDisplay`).style.color=``
				document.getElementById(`governmentDisplay`).innerHTML=elements[0][target][2]
				document.getElementById(`governmentDisplay`).style.color=``
				document.getElementById(`planetsContainer`).innerHTML=``
				accessiblePlanets=0
				if(elements[0][target][4].length){
					for(i2=0;i2<elements[0][target][4].length;i2++){
						for(i3=0;i3<elements[3].length;i3++){
							if(elements[0][target][4][i2]==elements[3][i3][0]){
								if(!elements[3][i3][1].includes(`requires: inaccessible`)){
									HUDContext.drawImage(planet,0,planet.height*1.299*scale*accessiblePlanets+system.height*1.4*scale,planet.width*1.4*scale,planet.height*1.4*scale)
									document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;color:rgb(112,112,112);font-size:13px;height:15px;left:29px;overflow:hidden;position:absolute;top:`+parseInt(planet.height*1.299*scale*accessiblePlanets/3+system.height*1.4*scale*.4)+`px;width:150px;">`+elements[0][target][4][i2]+`</label>`
									if(elements[3][i3][3]){
										document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;font-size:13px;left:38px;position:absolute;top:`+parseInt(planet.height*1.299*scale*accessiblePlanets/3+system.height*1.4*scale*.475)+`px;width:150px;">Shipyard</label>`
									}
									else{
										document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;color:rgb(70,70,70);font-size:13px;left:38px;position:absolute;top:`+parseInt(planet.height*1.299*scale*accessiblePlanets/3+system.height*1.4*scale*.475)+`px;width:150px;">Shipyard</label>`
									}
									if(elements[3][i3][4]){
										document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;font-size:13px;left:38px;position:absolute;top:`+parseInt(planet.height*1.299*scale*accessiblePlanets/3+system.height*1.4*scale*.55)+`px;width:150px;">Outfitter</label>`
									}
									else{
										document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;color:rgb(70,70,70);font-size:13px;left:38px;position:absolute;top:`+parseInt(planet.height*1.299*scale*accessiblePlanets/3+system.height*1.4*scale*.55)+`px;width:150px;">Outfitter</label>`
									}
									accessiblePlanets++
								}
							}
						}
					}
				}
				HUDContext.drawImage(trade,0,planet.height*1.299*scale*accessiblePlanets+system.height*1.4*scale,trade.width*1.4*scale,trade.height*1.4*scale)
				document.getElementById(`tradeContainer`).innerHTML=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:10px;line-height:140%;position:absolute;top:`+parseInt(99+(120*accessiblePlanets))+`px;">`+elements[0][target][5][0].join(`<br>`)+`</label>`
				if(systemSelected){
					for(i2=0;i2<elements[0][target][5][0].length;i2++){
						if(elements[0][target][5][1][i2]>elements[0][systemSelected][5][1][i2]){
							document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(88,166,88);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+parseInt(99+(120*accessiblePlanets)+(18*i2))+`px;width:30px;">+`+eval(elements[0][target][5][1][i2]-elements[0][systemSelected][5][1][i2])+`</label>`
						}
						else if(elements[0][target][5][1][i2]<elements[0][systemSelected][5][1][i2]){
							document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(166,88,88);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+parseInt(99+(120*accessiblePlanets)+(18*i2))+`px;width:30px;">`+eval(elements[0][target][5][1][i2]-elements[0][systemSelected][5][1][i2])+`</label>`
						}
						else if(elements[0][target][5][1][i2]==elements[0][systemSelected][5][1][i2]){
							document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+parseInt(99+(120*accessiblePlanets)+(18*i2))+`px;width:30px;">`+elements[0][target][5][1][i2]+`</label>`
						}
					}
				}
				else{
					document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+parseInt(99+(120*accessiblePlanets))+`px;width:30px;">`+elements[0][target][5][1].join(`<br>`)+`</label>`
				}
				HUDContext.drawImage(zoom,canvas.width*scale*2.8,canvas.height*scale*1.6,zoom.width*1.4*scale,zoom.height*1.4*scale)
				drawSelect(elements[0][target][1][0]-galaxyPosition[0],elements[0][target][1][1]-galaxyPosition[1])
			}
		}
		drawSelected()
	}else if(distance>=100){
		accessiblePlanets=0
		oldTarget=0
		HUDContext.clearRect(0,0,100000,100000)
		HUDContext.drawImage(galaxies,canvas.width*scale*2.52,0,galaxies.width*1.4*scale,galaxies.height*1.4*scale)
		HUDContext.drawImage(system,0,0,system.width*1.4*scale,system.height*1.4*scale)
		document.getElementById(`systemDisplay`).innerHTML=`- system -`
		document.getElementById(`systemDisplay`).style.color=`rgb(102,102,102)`
		document.getElementById(`governmentDisplay`).innerHTML=`- government -`
		document.getElementById(`governmentDisplay`).style.color=`rgb(102,102,102)`
		document.getElementById(`planetsContainer`).innerHTML=``
		HUDContext.drawImage(trade,0,planet.height*1.299*scale*accessiblePlanets+system.height*1.4*scale,trade.width*1.4*scale,trade.height*1.4*scale)
		document.getElementById(`tradeContainer`).innerHTML=``
		document.getElementById(`tradeContainer`).innerHTML+=`<label onClick="resetSelected()" style="animation:none;color:rgb(102,102,102);font-size:13px;left:10px;line-height:140%;position:absolute;top:`+99+`px;width:100px;">`+elements[0][target][5][0].join(`<br>`)+`</label>`
		if(systemSelected){
			document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+99+`px;width:30px;">`+elements[0][systemSelected][5][1].join(`<br>`)+`</label>`
		}
		else{
			document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+99+`px;width:30px;">-<br>-<br>-<br>-<br>-<br>-<br>-<br>-<br>-<br>-</label>`
		}
		HUDContext.drawImage(zoom,canvas.width*scale*2.8,canvas.height*scale*1.6,zoom.width*1.4*scale,zoom.height*1.4*scale)
		drawSelected()
	}
}
function onMouseDown(){
	if(systemSelected!==target&&distance<100){
		systemSelected=target
		HUDContext.clearRect(0,0,100000,100000)
		HUDContext.drawImage(galaxies,canvas.width*scale*2.52,0,galaxies.width*1.4*scale,galaxies.height*1.4*scale)
		HUDContext.drawImage(system,0,0,system.width*1.4*scale,system.height*1.4*scale)
		document.getElementById(`systemDisplay`).innerHTML=elements[0][target][0]
		document.getElementById(`systemDisplay`).style.color=``
		document.getElementById(`governmentDisplay`).innerHTML=elements[0][target][2]
		document.getElementById(`governmentDisplay`).style.color=``
		document.getElementById(`planetsContainer`).innerHTML=``
		accessiblePlanets=0
		if(elements[0][target][4].length){
			for(i2=0;i2<elements[0][target][4].length;i2++){
				for(i3=0;i3<elements[3].length;i3++){
					if(elements[0][target][4][i2]==elements[3][i3][0]){
						if(!elements[3][i3][1].includes(`requires: inaccessible`)){
							HUDContext.drawImage(planet,0,planet.height*1.299*scale*accessiblePlanets+system.height*1.4*scale,planet.width*1.4*scale,planet.height*1.4*scale)
							document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;color:rgb(112,112,112);font-size:13px;height:15px;left:29px;overflow:hidden;position:absolute;top:`+parseInt(planet.height*1.299*scale*accessiblePlanets/3+system.height*1.4*scale*.4)+`px;width:150px;">`+elements[0][target][4][i2]+`</label>`
							if(elements[3][i3][3]){
								document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;font-size:13px;left:38px;position:absolute;top:`+parseInt(planet.height*1.299*scale*accessiblePlanets/3+system.height*1.4*scale*.475)+`px;width:150px;">Shipyard</label>`
							}
							else{
								document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;color:rgb(70,70,70);font-size:13px;left:38px;position:absolute;top:`+parseInt(planet.height*1.299*scale*accessiblePlanets/3+system.height*1.4*scale*.475)+`px;width:150px;">Shipyard</label>`
							}
							if(elements[3][i3][4]){
								document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;font-size:13px;left:38px;position:absolute;top:`+parseInt(planet.height*1.299*scale*accessiblePlanets/3+system.height*1.4*scale*.55)+`px;width:150px;">Outfitter</label>`
							}
							else{
								document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;color:rgb(70,70,70);font-size:13px;left:38px;position:absolute;top:`+parseInt(planet.height*1.299*scale*accessiblePlanets/3+system.height*1.4*scale*.55)+`px;width:150px;">Outfitter</label>`
							}
							accessiblePlanets++
						}
					}
				}
			}
		}
		HUDContext.drawImage(trade,0,planet.height*1.299*scale*accessiblePlanets+system.height*1.4*scale,trade.width*1.4*scale,trade.height*1.4*scale)
		document.getElementById(`tradeContainer`).innerHTML=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:10px;line-height:140%;position:absolute;top:`+parseInt(99+(120*accessiblePlanets))+`px;">`+elements[0][target][5][0].join(`<br>`)+`</label>`
		if(systemSelected){
			for(i2=0;i2<elements[0][target][5][0].length;i2++){
				if(elements[0][target][5][1][i2]>elements[0][systemSelected][5][1][i2]){
					document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(88,166,88);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+parseInt(99+(120*accessiblePlanets)+(18*i2))+`px;width:30px;">+`+eval(elements[0][target][5][1][i2]-elements[0][systemSelected][5][1][i2])+`</label>`
				}
				else if(elements[0][target][5][1][i2]<elements[0][systemSelected][5][1][i2]){
					document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(166,88,88);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+parseInt(99+(120*accessiblePlanets)+(18*i2))+`px;width:30px;">`+eval(elements[0][target][5][1][i2]-elements[0][systemSelected][5][1][i2])+`</label>`
				}
				else if(elements[0][target][5][1][i2]==elements[0][systemSelected][5][1][i2]){
					document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+parseInt(99+(120*accessiblePlanets)+(18*i2))+`px;width:30px;">`+elements[0][target][5][1][i2]+`</label>`
				}
			}
		}
		else{
			document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+parseInt(99+(120*accessiblePlanets))+`px;width:30px;">`+elements[0][target][5][1].join(`<br>`)+`</label>`
		}
		HUDContext.drawImage(zoom,canvas.width*scale*2.8,canvas.height*scale*1.6,zoom.width*1.4*scale,zoom.height*1.4*scale)
		drawSelected()
	}
}
function drawSelected(){
	if(systemSelected){
		drawSelect(elements[0][systemSelected][1][0]-galaxyPosition[0],elements[0][systemSelected][1][1]-galaxyPosition[1])
	}
}
