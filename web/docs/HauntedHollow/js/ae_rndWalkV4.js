  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //
  //   Build random walker animation objects.
  //
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  var rwlkImage = new Array();        //  moving image array
  var rwlkSpeed = 3;
  var rwlkTimer = null;

  ////////////////////////////////////////////////////////////////////////
  //
  //      rndwalkAdd
  //
  //	    Add a new rndwalk
  //
  //          Enter:
  //		    wArray     = array with image url's
  //			wWalkId    = id
  //            wName      = rndwalk name
  //			wZLevel    = z-level
  //			wHorizStep = horizontal spacing of steps (pixels)
  //			wVertStep  = vertical spacing of steps (pixels)
  //			wWidth     = width of image (pixels)
  //			wHeight    = height of image (pixels)
  //			wHorzInit  = init horizontal direction (0 or 1 ==> left or right)
  //			wVertInit  = init vertical direction (0 or 1 ==> up or down)
  //			wPadding   = extra window border size
  //			wClickLink = click event
  //          Exit:
  //            object descriptor for future reference
  //
  ////////////////////////////////////////////////////////////////////////
  function rndwalkAdd(wArray,
                      wWalkId,
					  wName,
					  wZLevel,
				   	  wHorizStep,
				   	  wVertStep,
				   	  wWidth,
				   	  wHeight,
				   	  wHorzInit,
				   	  wVertInit,
				   	  wPadding,
					  wClickLink)
  {
    var rwlkRef = new animationElement(wWalkId, wName, 'rwlkImage', wZLevel);
	
	with (rwlkRef)
	{
	    aeWidth = wWidth;
		aeHeight = wHeight;
		aePadding = wPadding;
	
    	wStep = wHorizStep;
    	wVStep = wVertStep;

    	aeHorz = wHorzInit;
    	aeVert = wVertInit;

		wMinCount = wArray.length;
        animFrames = wArray.length / 2;

    	wFrame = 1;
    	wCFrame = 1;
  
		for (var i = 0; i < wMinCount; i++)
		{
	  	  var imgName = wName + (i + 1);
	  	  if (cbeNewImage(imgName, wArray[i]) == null)
	      {
	        valid = false;
			return false;
	      }
	    }

		if (wClickLink != '')
		{
		  aeClickLink = wClickLink;
		  aeClickEvent = addClickEvent(wName, 
		  			   	 			   wWalkId, 
									   rwlkImage.length, 
									   'rndWalkLinkEvent()', 
									   false, 
									   true);
		  if (aeClickEvent == null)
		  {
		    valid = false;
			return false;
		  }
		}
	}
	
    if (rwlkImage.length == 0)
	{
	  addModule('rndWalk', rwlkImage, 'rndwalkInit()', 'rndwalkReset()');
	}

	rwlkImage[rwlkImage.length] = rwlkRef;
	return true;
  }
  	
  //////////////////////////////////////////////////////////////////////////
  //
  //       rndwalkReset
  //
  //////////////////////////////////////////////////////////////////////////
  function rndwalkReset()
  {
    if (rwlkImage.length == 0) return;
	rwlkImage.length = 0;
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //      rndWalkLinkEvent
  //
  ////////////////////////////////////////////////////////////////////////
  function rndWalkLinkEvent()
  {
	var rwlkObj = rwlkImage[clickEvent[currentClickIndex].index];
	if (rwlkObj == null) return;
	
	with (rwlkObj)
	{
      aeChildWindow = launch(aeClickLink,
				  	  	     '_top', //name,
						     "channelmode=0,dependent=0,directories=1,fullscreen=1,location=1,menubar=1,resizable=1,scrollbars=1,status=1,toolbar=1",
						     "animationWindow");
	}
  }
  
  ////////////////////////////////////////////////////////////////////////
  //
  //      rndwalkInit
  //
  //        Initialize rndwalk
  //
  ////////////////////////////////////////////////////////////////////////
  function rndwalkInit()
  {
    rwlkTimerSpeed = rwlkSpeed;
  	rwlkTimer = null;
    
	if (rwlkImage.length == 0) return;

    for (var i = 0; i < rwlkImage.length; i++)
	{
	    with (rwlkImage[i])
	    {
            wCenterX = Math.round(app.width()/2 - (aeWidth/2));
			wCenterY = Math.round(app.height()/2 - (aeHeight/2));

	    	wHCount = wMinCount + Math.round(Math.random() * 100);
	    	wVCount = wMinCount + Math.round(Math.random() * 100);

	    	aeX = wCenterX;
	    	aeY = wCenterY;

	    	wCFrame = (aeHorz * animFrames) + 1;

			var walker = cbeGetElementById(rwlkImage[i].id).cbe;
	    	walker.hide();
			walker.zIndex(aeZ);
   			walker.resizeTo(aeWidth, aeHeight);
			walker.moveTo(wCenterX, wCenterY);

			walker.background(walker.background(), cbeGetElementById(name + wCFrame).src);
			walker.show();
	    }
	}

	if (rwlkImage[0].aeClickLink != '') clickEvent[rwlkImage[0].aeClickEvent].active = true;
	
	rwlkTimer = aetNewTimer('rwlkImage', 
	  	 				   	'rndwalkAnimate()', 
							rwlkTimerSpeed, 
							true);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //     rndwalkNewDirection
  //
  ////////////////////////////////////////////////////////////////////////
  function rndwalkNewDirection(rndwalk)
  {
    if (rwlkImage.length == 0) return;

    with (rndwalk)
	{
	  wHCount--;
	  if (wHCount <= 0)
	  {
		aeHorz = Math.round(Math.random());
		wHCount = wMinCount + Math.round(Math.random() * 100);
	  }

	  aeX = (aeHorz == 0) ? (aeX - wStep) : (aeX + wStep);

	  if ((aeX < aePadding) || (aeX >= (app.width() - 10) - (aeWidth + aePadding)))
	  {
	    aeHorz = (aeX <= aePadding) ? 1 : 0;
        wHCount = wMinCount + Math.round(Math.random() * 100);
	  }
	  
      ////////////////////////////////////////////////////////////////////

	  wVCount--;
	  if (wVCount <= 0)
	  {
		aeVert = Math.round(Math.random());
		wVCount = wMinCount + Math.round(Math.random() * 100);
	  }
	  aeY = (aeVert == 0) ? (aeY - wVStep) : (aeY + wVStep);

	  if ((aeY >= aePadding) && (aeY < (app.height() - 10) - (aeHeight + aePadding)))
	    return;
	  
	  aeVert = (aeY <= aePadding) ? 1 : 0;
      wVCount = wMinCount + Math.round(Math.random() * 100);
    }
  }
  
  ////////////////////////////////////////////////////////////////////////
  //
  //      rndwalkMove
  //
  //	    Move the object on the screen
  //
  //		  Enter:
  //		    rndwalk = object to move
  //
  ////////////////////////////////////////////////////////////////////////
  function rndwalkMove(rndwalk) 
  {
	var walker = cbeGetElementById(rndwalk.id).cbe;
    walker.hide();
	rndwalkNewDirection(rndwalk);
	
	with (rndwalk)
	{
	  wFrame++;
	  if (wFrame >= animFrames) wFrame = 0;

	  wCFrame = wFrame + (aeHorz * animFrames) + 1;
	  walker = cbeGetElementById(id).cbe;
	  walker.moveTo(aeX, aeY);
	  
	  walker.background(walker.background(), cbeGetElementById(name + wCFrame).src);
   	  walker.show();
	}
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //      rndwalkAnimate
  //
  //	    Animate the object on the screen
  //
  //		  Enter:
  //		    none
  //          Exit:
  //		  	all rndwalkers are moved and the
  //            animation timer event is restarted.
  //
  ////////////////////////////////////////////////////////////////////////
  function rndwalkAnimate()
  {
    if (rwlkImage.length == 0) return;
	
    for (var i = 0; i < rwlkImage.length; i++)
	{
	  rndwalkMove(rwlkImage[i]);
	}
  }

