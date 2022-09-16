function drawMap(){
	headsUp.addEventListener(`mousedown`,onMouseDown)
	headsUp.addEventListener(`mousemove`,onMouseMove)
	canvasContext.clearRect(0,0,100000,100000)
	canvasContext.drawImage(galaxy,400+(2150*scale-2150)-galaxyPosition[0],100+(1350*scale-1350)-galaxyPosition[1])
	document.getElementById(`galaxyDisplay`).innerHTML=elements[2][galaxySelected][0]
	document.getElementById(`zoomContainer`).classList.remove(`hidden`)
	//	Links
	for(i1=0;i1<elements[0].length;i1++){
		for(i2=0;i2<elements[0][i1][3].length;i2++){
			for(i3=0;i3<elements[0].length;i3++){
				if(elements[0][i1][3][i2]==elements[0][i3][0]){
					switch(mapStyle){
						case `original`:
							drawLink(elements[0][i1][1][0],elements[0][i1][1][1],elements[0][i3][1][0]-((elements[0][i3][1][0]-elements[0][i1][1][0])/2),elements[0][i3][1][1]-((elements[0][i3][1][1]-elements[0][i1][1][1])/2))
							break
						case `modern`:
							for(i4=0;i4<elements[1].length;i4++){
								if(elements[0][i1][2]==elements[1][i4][0]){
									if(elements[0][i1][4].length>0||systemAllocation==`claimed`){
										drawLinkColour(elements[0][i1][1][0],elements[0][i1][1][1],elements[0][i3][1][0]-((elements[0][i3][1][0]-elements[0][i1][1][0])/1.8),elements[0][i3][1][1]-((elements[0][i3][1][1]-elements[0][i1][1][1])/1.8),elements[1][i4][1])
									}else{
										drawLink(elements[0][i1][1][0],elements[0][i1][1][1],elements[0][i3][1][0]-((elements[0][i3][1][0]-elements[0][i1][1][0])/1.8),elements[0][i3][1][1]-((elements[0][i3][1][1]-elements[0][i1][1][1])/1.8))
									}
									break
								}
							}
							break
					}
				}
			}
		}
	}
	//	Systems
	for(i1=0;i1<elements[0].length;i1++){
		for(i2=0;i2<elements[1].length;i2++){
			if(elements[0][i1][2]==elements[1][i2][0]){
				switch(mapStyle){
					case `original`:
						if(elements[0][i1][4].length>0||systemAllocation==`claimed`){
							drawSystemColour(elements[0][i1][1][0],elements[0][i1][1][1],9,elements[1][i2][1])
						}else{
							drawSystem(elements[0][i1][1][0],elements[0][i1][1][1],9)
						}
						break
					case `modern`:
						if(elements[0][i1][4].length>0||systemAllocation==`claimed`){
							drawSystemColour(elements[0][i1][1][0],elements[0][i1][1][1],1,elements[1][i2][1])
						}else{
							drawSystem(elements[0][i1][1][0],elements[0][i1][1][1],1)
						}
						break
				}
			}
		}
	}
	//	Wormholes
	var wormholes=[]
	for(i1=0;i1<elements[0].length;i1++){
		for(i2=0;i2<elements[0][i1][4].length;i2++){
			wormholes.push([elements[0][i1][4][i2],elements[0][i1][1][0],elements[0][i1][1][1]])
		}
	}
	for(i1=0;i1<wormholes.length;i1++){
		for(i2=i1+1;i2<wormholes.length;i2++){
			if(wormholes[i1][0]==wormholes[i2][0]){
				drawWormhole(wormholes[i1][1],wormholes[i1][2],wormholes[i2][1]-((wormholes[i2][1]-wormholes[i1][1])/2),wormholes[i2][2]-((wormholes[i2][2]-wormholes[i1][2])/2))
				drawWormhole(wormholes[i2][1],wormholes[i2][2],wormholes[i1][1]-((wormholes[i1][1]-wormholes[i2][1])/2),wormholes[i1][2]-((wormholes[i1][2]-wormholes[i2][2])/2))
				break
			}
		}
	}
	drawHUD()
	console.log(elements)
}
function drawHUD(){
	if(oldTarget!==target&&distance<=100){
		HUDContext.clearRect(0,0,100000,100000)
		HUDContext.drawImage(galaxies,canvas.width*scale*2.52,0,galaxies.width*1.4*scale,galaxies.height*1.4*scale)
		HUDContext.drawImage(zoom,canvas.width*scale*2.8,canvas.height*scale*1.6,zoom.width*1.4*scale,zoom.height*1.4*scale)
		drawSelect(elements[0][target][1][0]-galaxyPosition[0],elements[0][target][1][1]-galaxyPosition[1])
		drawRange(elements[0][target][1][0]-galaxyPosition[0],elements[0][target][1][1]-galaxyPosition[1])
		if(systemSelected!==target&&systemSelected){
			drawSelect(elements[0][systemSelected][1][0]-galaxyPosition[0],elements[0][systemSelected][1][1]-galaxyPosition[1])
		}
	}else{
		HUDContext.clearRect(0,0,100000,100000)
		HUDContext.drawImage(galaxies,canvas.width*scale*2.52,0,galaxies.width*1.4*scale,galaxies.height*1.4*scale)
		HUDContext.drawImage(zoom,canvas.width*scale*2.8,canvas.height*scale*1.6,zoom.width*1.4*scale,zoom.height*1.4*scale)
		if(systemSelected){
			drawSelect(elements[0][systemSelected][1][0]-galaxyPosition[0],elements[0][systemSelected][1][1]-galaxyPosition[1])
		}
	}
}
