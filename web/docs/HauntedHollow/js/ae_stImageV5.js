  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  //
  //    Content Handlers
  //
  ////////////////////////////////////////////////////////////////////////
  //
  //    Copyright © 2002. EarthWalk Software.
  //
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////
  //
  //      imageInit
  //
  ////////////////////////////////////////////////////////////////////////
  function imageInit(tableIndex)
  {
    if (! setActiveImage(tableIndex)) return false;
	
	with (appTable[tableIndex])
	{
	  if (contentLink != null)
	  {
		contentEvent = addClickEvent(name, 
		  			   	 			 id, 
									 'afLaunchWindow()', 
									 true,
									 true);
		if (contentEvent == null)
		{
		  if (afDebugAlert) alert('contentInit unable to create content event for ' +
			    			  		name + ', ' + id + ', link ' + contentLink);
		  return false;
		}
	  }
    }
    return true;
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //      setActiveImage
  //
  ////////////////////////////////////////////////////////////////////////
  function setActiveImage(tableIndex)
  {
	with (appTable[tableIndex])
	{
	  var imageUrl = cbeGetElementById(id);
	  var cbeName = name + '_fg_' + tableIndex;
	  var imageObj = cbeGetImageByName(cbeName);
	  if (imageObj == null)
	  {
	    if (afDebugAlerts) alert('setActiveImage imageObj is null');
		return false;
	  }
	  cbeSetImage(imageUrl, imageObj);
	  imageUrl.width = w;
	  imageUrl.height = h;

	  var afParent = afGetObjectById(parent);
	  if (afParent == null)
	  {
	    if (afDebugAlerts) alert('setActiveImage afParent is null for parent ' + parent);
		return false;
	  }
	  afParent.child = tableIndex;
	}
	return true;
  }
  
  ////////////////////////////////////////////////////////////////////////
  //
  //      contentInit
  //
  ////////////////////////////////////////////////////////////////////////
  function contentInit(tableIndex)
  {
	with (appTable[tableIndex])
	{
	  var contentRef = cbeGetElementById(id).cbe;
	  contentRef.color(color);
	  if (contentLink != null)
	  {
		contentEvent = addClickEvent(name, 
		  			   	 			 id, 
									 'afLaunchWindow()', 
									 true,
									 true);
		if (contentEvent == null)
		{
		  if (afDebugAlert) alert('contentInit unable to create content event for ' +
			    			  		name + ', ' + id + ', link ' + contentLink);
		  return false;
		}
	  }
    }

    return true;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //       spriteInit
  //
  //////////////////////////////////////////////////////////////////////////
  function spriteInit(tableIndex)
  {
    var minCount = 50;

	if (! boxInit(tableIndex))
	{
	  if (afDebugAlerts) alert('spriteInit boxInit failed for entry ' + tableIndex);
	  return false;
	}
		
	with (appTable[tableIndex])
	{
	  var spriteRef = cbeGetElementById(id).cbe;

	  tStep = parameters[0];
	  t = 0;

	  //
	  //  use hstep,vstep for centerX,centerY to speed up calculations
	  //
      hstep = (app.width()  - w)/2;
 	  vstep = (app.height() - h)/2;
	  vcount = minCount + Math.round(Math.random() * 100);

	  afMoveObject(spriteRef,
				   Math.round((app.width() - w)/2),
				   Math.round((app.height() - h)/2),
				   20,
				   false);
	}
	
	return true;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //   spriteMove
  //
  //     move the sprite
  //
  //////////////////////////////////////////////////////////////////////////
  function spriteMove(sequenceAtom, frameAtom)
  {
    var minCount = 20;

	afSprite = afGetObjectById(frameAtom.id);
    if (afSprite == null)
	{
	  if (afDebugAlerts) alert('spriteMove unable to get animation frame for ' + 
	  	 				 		sequenceAtom.name + ', ' + frameAtom.id);
	  return;
	}

	spriteObject = cbeGetElementById(frameAtom.id).cbe;
    if (spriteObject == null)
	{
	  if (afDebugAlerts) alert('spriteMove unable to get frame object for ' + 
	  	 				 		sequenceAtom.name + ', ' + frameAtom.id);
	  return;
  	} 

	with (afSprite)
	{
   	  t += (tStep * 3);

	  prevX = x;
	  prevY = y;
	  prevZ = z;
	  
   	  x = Math.round((Math.sin(t * 2) * Math.sin(t * 4.2) * Math.sin(t * 5.1) * hstep) + hstep);
   	  y = Math.round((Math.sin(t * 1.123) * Math.sin(t * 7) * Math.sin(t * 2.31) * vstep) + vstep);

	  spriteObject.moveTo(x, y);
	  spriteObject.zIndex(z);

	  vcount--;
	  if (vcount == 0)
	  {
		if (visible)
		{
		  visible = false;
   	  	  spriteObject.hide();
		  vcount = minCount + Math.round(Math.random() * 100);
		}
		else
		{
		  visible = true;
   	  	  spriteObject.show();
		  vcount = minCount + Math.round(Math.random() * 100);
		}
	  }
	}

	//
	//  save index and restart sequence timer
	//
	aftStartTimerNumber(sequenceAtom.timer);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //      rndWalkerInit
  //
  //        Initialize rndwalk
  //
  //		  frame parameter array entries:
  //		    0 = horizontal step
  //			1 = vertical step
  //			2 = initial horizontal
  //			3 = initial vertical
  //			4 = container padding
  //            5 - parameters.length = animation images
  //
  ////////////////////////////////////////////////////////////////////////
  function rndWalkerInit(tableIndex)
  {
	if (! boxInit(tableIndex))
	{
	  if (afDebugAlerts) alert('rndWalkerInit boxInit failed for entry ' + tableIndex);
	  return false;
	}
		
	with (appTable[tableIndex])
	{
	  var walkerRef = cbeGetElementById(id).cbe;

	  walkerRef.hide();

	  hstep = parameters[0];
	  vstep = parameters[1];
	  
      horz = parameters[2];
      vert = parameters[3];

	  padding = parameters[4];

	  wMinCount = parameters.length - 5;
      animFrames = wMinCount / 2;

      wFrame = 1;
      wCFrame = 1;
  
	  for (var i = 0; i < wMinCount; i++)
	  {
	  	var imgName = name + '_walk_' + i;
	  	if (cbeNewImage(imgName, parameters[5 + i]) == null)
	    {
	      valid = false;
		  return false;
	    }
	  }

      xcenter = Math.round((app.width() - w)/2);
	  ycenter = Math.round((app.height() - h)/2);

	  hcount = wMinCount + Math.round(Math.random() * 100);
	  vcount = wMinCount + Math.round(Math.random() * 100);

	  x = xcenter;
	  y = ycenter;
	  
	  prevX = x;
	  prevY = y;

   	  walkerRef.resizeTo(w, h);
	  walkerRef.moveTo(x, y);

	  wCFrame = (horz * animFrames) + 1;

	  walkerRef.zIndex(z);
	  walkerRef.show();
	}
	
	return true;
  }

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////
  //
  //      rndWalkMove
  //
  //	    Move the object on the screen
  //
  //		  Enter:
  //		    rndwalk = object to move
  //
  ////////////////////////////////////////////////////////////////////////
  function rndWalkMove(sequenceAtom, frameAtom) 
  {
	var afWalker = afGetObjectById(frameAtom.id);
    if (afWalker == null)
	{
	  if (afDebugAlerts) alert('rndwalkMove unable to get animation frame for ' + 
	  	 				 		sequenceAtom.name + ', ' + frameAtom.id);
	  return;
	}

	walkerObject = cbeGetElementById(frameAtom.id).cbe;
    if (walkerObject == null)
	{
	  if (afDebugAlerts) alert('rndwalkMove unable to get frame object for ' + 
	  	 				 		sequenceAtom.name + ', ' + frameAtom.id);
	  return;
  	} 

	with (afWalker)
	{
	  hcount--;
	  if (hcount <= 0)
	  {
		horz = Math.round(Math.random());
		hcount = wMinCount + Math.round(Math.random() * 100);
	  }
	  
	  prevX = x;
	  prevY = y;
	  
	  x = (horz == 0) ? (x - hstep) : (x + hstep);

	  if ((x < padding) || (x >= (app.width() - 10) - (w + padding)))
	  {
	    horz = (x <= padding) ? 1 : 0;
        hcount = wMinCount + Math.round(Math.random() * 100);
	  }
	  
      ////////////////////////////////////////////////////////////////////

	  vcount--;
	  if (vcount <= 0)
	  {
		vert = Math.round(Math.random());
		vcount = wMinCount + Math.round(Math.random() * 100);
	  }
	  
	  y = (vert == 0) ? (y - vstep) : (y + vstep);

	  if ((y < padding) || (y >= (app.height() - 10) - (h + padding)))
	  {
	    vert = (y <= padding) ? 1 : 0;
        vcount = wMinCount + Math.round(Math.random() * 100);
      }
	  
	  wFrame++;
	  if (wFrame >= animFrames) wFrame = 0;

	  wCFrame = wFrame + (horz * animFrames);

	  walkerObject.moveTo(x, y);
	  
	  /////////////////////////////////////////////////////////////////////////
	  
	  var cbeName = name + '_walk_' + wCFrame;
	  var imageObj = cbeGetImageByName(cbeName);
	  if (imageObj == null)
	  {
	    if (afDebugAlert) alert('rndWalkMove imageObj is null');
		return false;
	  }
	  
	  if (appTable[child] == null)
	  {
	    if (afDebugAlert) alert('rndWalkMove imageFrame is null for child ' + appTable[child]);
		return false;
	  }
	  
	  var imageFrame = cbeGetElementById(appTable[child].id);
	  if (imageFrame == null)
	  {
	    if (afDebugAlert) alert('rndWalkMove imageFrame is null for child.id ' + appTable[child].id);
		return false;
	  }
	  
	  cbeSetImage(imageFrame, imageObj);
	  
   	  walkerObject.show();
	}

	aftStartTimerNumber(sequenceAtom.timer);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //      followerInit
  //
  ////////////////////////////////////////////////////////////////////////
  function followerInit(tableIndex)
  {
	if (! boxInit(tableIndex))
	{
	  if (afDebugAlerts) alert('followerInit boxInit failed for entry ' + tableIndex);
	  return false;
	}
		
	with (appTable[tableIndex])
	{
      var follower = cbeGetElementById(id).cbe;
      with (follower)
	  {
   	    zIndex(z);
		resizeTo(w, h);

		x = -1;
		y = -1;
			
		prevX = x;
		prevY = y;

		moveTo(app.width()/2, app.height()/2);
	
		hide();
		
		wStep = 0;
	  }

	  visible = false;
	  selected = false;
	  
	  padding = 10;
	  speed = 10;
	}
  }
  
  //////////////////////////////////////////////////////////////////////////
  //
  //       mouseFollowerMove
  //
  //////////////////////////////////////////////////////////////////////////
//var _moveCount = 0;
  function mouseFollowerMove(sequenceAtom, frameAtom)
  {
/*
if (_moveCount < 10)
alert('mouseFollowerMove ' + frameAtom.id + ', ' + sequenceAtom.name);
_moveCount++;
*/
	var afFollower = afGetObjectById(frameAtom.id);
    if (afFollower == null)
	{
	  if (afDebugAlert) alert('mouseFollowerMove unable to get animation frame for ' + 
	  	 				 		sequenceAtom.name + ', ' + frameAtom.id);
	  return;
	}

	var followerRef = cbeGetElementById(frameAtom.id).cbe;
    if (followerRef == null)
	{
	  if (afDebugAlert) alert('mouseFollowerMove unable to get frame object for ' + 
	  	 				 		sequenceAtom.name + ', ' + frameAtom.id);
	  return;
  	} 

	with (afFollower)
	{
	  if ( (afMouse.x != x) ||
	       (afMouse.y != y) )
	  {
		prevX = x;
		prevY = y;
		
		x = afMouse.x;
		y = afMouse.y;
		
		followerRef.hide();

		if ( (x >= padding)   &&
			 (x <= (app.width() - padding - w)) &&
			 (y >= padding)   &&
			 (y <= (app.height() - padding - h)) )
		{ 
	   	  followerRef.moveTo(x + 4, y + 4, 0, false);
		  followerRef.zIndex(z);
		  wStep = speed;
		  followerRef.show();
		  visible = true;		  
		}
		if (sequenceAtom.list.length > 1) mouseFollowerTrails(sequenceAtom);
		aftStartTimerNumber(sequenceAtom.timer);
		return;
	  }

	  if ((visible) && (wStep != 0))
	  {
		if (! mouseFollowerTrailErase(sequenceAtom))
		{
		  wStep--;
		  if (wStep == 0)
		  {
		    followerRef.hide();
		    visible = false;
		  }
		}
	  }
    }
	aftStartTimerNumber(sequenceAtom.timer);
  }

  function mouseFollowerTrailErase(sequenceAtom)
  {
    var seqIndex;
	for (seqIndex = sequenceAtom.list.length - 1; seqIndex > 0; seqIndex--)
	{
	  var frameAtom = frameTable[sequenceAtom.list[seqIndex]];
	  var afFrame = afGetObjectById(frameAtom.id);
	  if (afFrame.visible)
	  {
		afFrame.visible = false;
		cbeGetElementById(afFrame.id).cbe.hide();
		return true;
	  }
	}
	return false;
  }
  
  function mouseFollowerTrails(sequenceAtom)
  {
	var prevFrameAtom = frameTable[sequenceAtom.list[0]];
	var prevFrame = afGetObjectById(prevFrameAtom.id);

	if (! prevFrame.visible) return;

	var seqIndex;
	for (seqIndex = 1; seqIndex < sequenceAtom.list.length; seqIndex++)
	{
	  var frameAtom = frameTable[sequenceAtom.list[seqIndex]];
	  
	  var frame = afGetObjectById(frameAtom.id);
      frame.prevX = frame.x;
	  frame.prevY = frame.y;
	  frame.x = prevFrame.prevX;
	  frame.y = prevFrame.prevY;
	  
	  var frameObject = cbeGetElementById(frameAtom.id).cbe;
	  frameObject.moveTo(frame.x + 4, frame.y + 4);
	  frameObject.show();

	  if (! frame.visible)
	  {
	    frame.visible = true;
	    return;
	  }
	  
	  prevFrame = frame;
	}
  }
  
