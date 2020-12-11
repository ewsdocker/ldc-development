  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //
  //   Build content box object.
  //
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  var contentBox = new Array();

  //////////////////////////////////////////////////////////////////////////
  //
  //   Box add parameters
  //
  //     Enter:
  //	 	   boxId            = content id
  //		   boxContainer		= container id
  //		   boxName     	    = name
  //		   boxLeft			= left edge of box (x)
  //		   boxTop			= top edge of box (y)
  //		   boxZ		        = z-level
  //		   boxWidth    	    = width of box (in pixels)
  //		   boxHeight   	    = height of box (in pixels)
  //		   boxRelative      = true if relative to container, else absolute
  //		   boxBkUrl         = background url
  //		   boxBkColor       = background color
  //		   boxBkTransparent = background is transparent
  //		   boxColor    	    = color
  //		   boxLink			= url to link on click
  //    Exit:
  //           valid = false if error
  //
  //////////////////////////////////////////////////////////////////////////
  function boxAdd(boxId,
  		   		  boxContainer,
                  boxName,
				  boxLeft,
				  boxTop,
				  boxZ,
				  boxWidth,
				  boxHeight,
				  boxRelative,
				  boxBkUrl,
				  boxBkColor,
				  boxBkTransparent,
				  boxColor,
				  boxLink)
  {
    var boxRef = new animationElement(boxId, boxName, 'boxContent', boxZ);

	with (boxRef)
	{
	    parentId  = boxContainer;
		
	  	aeX = boxLeft;
	  	aeY = boxTop;
		aeWidth = boxWidth;
		aeHeight = boxHeight;
		aePosition = boxRelative;

		bkcolor = boxBkColor;
		bktransparent = boxBkTransparent;
		bkURL = boxBkUrl;
		
		color = boxColor;
		if (boxLink != null)
		{
		  aeClickLink = boxLink;
		  aeClickEvent = addClickEvent(boxName, 
		  			   	 			   boxId, 
									   contentBox.length, 
									   'boxLinkEvent()', 
									   false,
									   true);
		  if (aeClickEvent == null)
		  {
		    valid = false;
			return false;
		  }
		}
	}	
	
    if (contentBox.length == 0)
	{
	  addModule('contentBox', contentBox, 'boxInit()', 'boxReset()');
	}

	contentBox[contentBox.length] = boxRef;
	return true;
  }


  //////////////////////////////////////////////////////////////////////////
  //
  //       boxReset
  //
  //////////////////////////////////////////////////////////////////////////
  function boxReset()
  {
    if (contentBox.length == 0) return;
	contentBox.length = 0;
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //      boxLinkEvent
  //
  ////////////////////////////////////////////////////////////////////////
  function boxLinkEvent()
  {
	var boxObj = contentBox[clickEvent[currentClickIndex].index];
	if (boxObj == null) return;
	
	with (boxObj)
	{
      aeChildWindow = launch(aeClickLink,
				  	  	     '_top', //name,
						     "channelmode=0,dependent=0,directories=1,fullscreen=1,location=1,menubar=1,resizable=1,scrollbars=1,status=1,toolbar=1",
						     "animationWindow");
	}
  }
  
  ////////////////////////////////////////////////////////////////////////
  //
  //      boxInit
  //
  ////////////////////////////////////////////////////////////////////////
  function boxInit()
  {
    if (contentBox.length == 0) return;
	
	for (var i = 0; i < contentBox.length; ++i)
	{
	  with (contentBox[i])
	  {
//	    alert("boxInit " + i);
	    var boxRef = cbeGetElementById(id).cbe;

		if (boxRef != null)
		{
//	  	  alert("boxInit id " + id);
		  boxRef.hide();

		  boxRef.zIndex(aeZ);

		  if ((aeX + aeWidth) > (app.width() - aePadding)) aeX -= (aeWidth + aePadding);
		  if (aeX < aePadding) aeX = aePadding;

		  if ((aeY + aeHeight) > (app.height() - aePadding)) aeY -= (aeHeight + aePadding);
		  if (aeY < aePadding) aeY = aePadding;

//alert('boxInit ' + id + ' ' + aeX + ' ' + aeY + ' ' + aeWidth + ' ' + aeHeight);		
		  boxRef.moveTo(aeX, aeY);
		  boxRef.resizeTo(aeWidth, aeHeight);
		  boxRef.color(color);
		  boxRef.show();

		  if (bkURL) cbeNewImage(name, bkURL);

		  if (aeClickLink != null) clickEvent[aeClickEvent].active = true;
		}
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //        boxMove
  //
  //          Enter:
  //		    boxId    = box id
  //			boxX	 = x location
  //			boxY     = y location
  //			boxZ	 = z-level
  //			boxRel	 = 0 ==> absolute, else relative
  //
  //////////////////////////////////////////////////////////////////////////
  function boxMove(boxId, boxX, boxY, boxZ, boxRel)
  {
	for (var i = 0; i < contentBox.length; ++i)
	{
	  with (contentBox[i])
	  {
	    if (boxId == id)
		{
		  var mover = cbeGetElementById(id).cbe;
		  if (boxRel == 0)
		  {
		    if (boxX < aePadding) boxX = mover.left;
			else
			  if (boxX >= ((app.width() - 10) - (aeWidth + aePadding))) boxX = mover.left;
			if (boxY < aePadding) boxY = mover.top;
			else
			{
			  if (boxY >= ((app.height() - 10) - (aeHeight + aePadding))) boxY = mover.top;
			}
			
			mover.hide();
			mover.moveTo(boxX, boxY);
			mover.show();
		  }
		  else
		  {
		    if ((mover.left + boxX) < aePadding) boxX = 0;
			else
			  if ((mover.left + mover.width + boxX) >= 
			  	  ((app.width() - 10) - (mover.width + aePadding))) boxX = 0;

			if ((mover.top + boxY) < aePadding) boxY = 0;
			else
			  if ((mover.top + boxY) >= 
			  	  ((app.height() - 10) - (aeHeight + aePadding))) boxY = 0;

			mover.hide();
			mover.moveBy(boxX, boxY);
			mover.show();
		  }
//alert('boxMove ' + boxId + ' ' + boxX + ',' + boxY + ' ' + boxZ + ' ' + boxRel);
		}
	  }
	}
  }
  
  //////////////////////////////////////////////////////////////////////////
  //
  //        boxResize
  //
  //          Enter:
  //		    boxId    = box id
  //			boxW	 = width
  //			boxH     = height
  //
  //////////////////////////////////////////////////////////////////////////
  function boxResize(boxId, boxW, boxH)
  {
//alert('boxResize ' + boxId + ' ' + boxW + ' ' + boxH);
	for (var i = 0; i < contentBox.length; ++i)
	{
	  if (contentBox[i].id == boxId)
	  {
	    var boxRef = cbeGetElementById(boxId).cbe;
		boxRef.resizeTo(boxW, boxH);
	  }
	}
  }

