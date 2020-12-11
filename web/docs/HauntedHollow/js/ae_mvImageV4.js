  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //
  //   moving image objects.
  //
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  var mvImage = new Array();         //  moving image array
  var mvSpeed = 2;
  var mvTimerSpeed = 0;
  var mvTimer = null;

  //////////////////////////////////////////////////////////////////////////
  //
  //   mvImageAdd
  //
  //////////////////////////////////////////////////////////////////////////
  function mvImageAdd(mvImageId,
                      mvImageName,
					  mvImageUrl,
					  mvImageZ,
					  mvImageWidth,
					  mvImageHeight,
					  mvImageStep,
					  mvImageLink)
  {
    var mvRef = new animationElement(mvImageId, mvImageName, 'mvImage', mvImageZ);
	with (mvRef)
	{
	    t = 0;
		tStep = mvImageStep;

		vCount = 50 + Math.round(Math.random() * 100);
	
		aeWidth = mvImageWidth;
		aeHeight = mvImageHeight;
	
		wCenterX = 0;
		wCenterY = 0;

		if (cbeNewImage(mvImageName, mvImageUrl) == null)
		{
	        valid = false;
	    	return false;
	    }

		if (mvImageLink != '')
		{
		  aeClickLink = mvImageLink;
		  aeClickEvent = addClickEvent(mvImageName, 
		  			   	 			   mvImageId, 
									   mvImage.length, 
									   'mvImageLinkEvent()', 
									   false,
									   true);
		  if (aeClickEvent == null)
		  {
		    valid = false;
			return false;
		  }
		}
	}

    if (mvImage.length == 0) addModule('mvImage', mvImage, 'mvImageInit()', 'mvImageReset()');

	mvImage[mvImage.length] = mvRef;
	return true;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //       mvImageReset
  //
  //////////////////////////////////////////////////////////////////////////
  function mvImageReset()
  {
    if (mvImage.length == 0) return;
	mvImage.length = 0;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //       mvImageInit
  //
  //////////////////////////////////////////////////////////////////////////
  function mvImageInit()
  {
    mvTimerSpeed = mvSpeed;
    if (mvImage.length == 0) return;
	
    var minCount = 50;
	
	for (var i = 0; i < mvImage.length; ++i)
	{
	    with (mvImage[i])
		{
            wCenterX = (app.width()  - aeWidth)/2;
 	    	wCenterY = (app.height() - aeHeight)/2;

	    	t = 0;

			var mover = cbeGetElementById(id).cbe;
			var imgUrl = cbeGetElementById(name).src;

			if (bktransparent)
			{
			  mover.background('transparent');
			}
			mover.show();
			mover.resizeTo(aeWidth, aeHeight);
			mover.background(mover.background(), imgUrl);
   			mover.moveTo('center');
   	    	mover.zIndex(aeZ);
	    	mover.hide();

	    	visible = false;

			vCount = minCount + Math.round(Math.random() * 100);

			if (aeClickEvent != null)
			{
			  clickEvent[aeClickEvent].active = true;
			}
		}
    }

	mvTimer = aetNewTimer('mvImage', 
	  	 				  'mvAnimateMovers()', 
						  mvTimerSpeed, 
						  true);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //      mvImageLookup
  //
  //	    Enter:
  //		  mvId = id name to lookup
  //		Exit:
  //		  mvIndex = index of id, null if not found
  //
  ////////////////////////////////////////////////////////////////////////
  function mvImageLookup(mvId)
  {
    if (mvImage.length == 0) return null;
    
	var mvIndex;
	for (mvIndex = 0; mvIndex < mvImage.length; mvIndex++)
	{
	  if (mvImage[mvIndex].id == mvId) return mvIndex;
	}
	return null;
  }
  
  //////////////////////////////////////////////////////////////////////////
  //
  //   mvAnimateMovers
  //
  //     start mover animation timer
  //
  //////////////////////////////////////////////////////////////////////////
  function mvAnimateMovers() 
  {
    if (mvImage.length == 0) return;
	
    var minCount = 20;
	for(i = 0; i < mvImage.length; i++)
    {
	  with (mvImage[i])
	  {
   	      t += (tStep * 3);

	  	  aeX = Math.sin(t*2)*Math.sin(t*4.2)*Math.sin(t*5.1);
   	      aeX = Math.round((aeX * wCenterX) + wCenterX);

	  	  aeY = Math.sin(t*1.123)*Math.sin(t*7)*Math.sin(t*2.31);
   	      aeY = Math.round((aeY * wCenterY) + wCenterY);

	  	  var mover = cbeGetElementById(id).cbe;
	  	  mover.moveTo(aeX, aeY);
		  mover.zIndex(aeZ);
		  
	      vCount--;
	      if (vCount == 0)
	      {
		      if (visible)
		      {
		          visible = false;
   	  		      mover.hide();
			      vCount = minCount + Math.round(Math.random() * 100);
		      }
		  	  else
		  	  {
		          visible = true;
   	  			  mover.show();
				  vCount = minCount + Math.round(Math.random() * 100);
		  	  }
	      }
	  
	  }
    }
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //      mvImageLinkEvent
  //
  ////////////////////////////////////////////////////////////////////////
  function mvImageLinkEvent()
  {
	var imageObj = mvImage[clickEvent[currentClickIndex].index];

	if (imageObj == null) return;

	with (imageObj)
	{
      aeChildWindow = launch(aeClickLink,
				  	  	     '_top', //name,
						     "channelmode=0,dependent=0,directories=1,fullscreen=1,location=1,menubar=1,resizable=1,scrollbars=1,status=1,toolbar=1",
						     "animationWindow");
	}
  }
  
