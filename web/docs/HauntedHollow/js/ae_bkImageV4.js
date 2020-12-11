  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //
  //   Background image element objects.
  //
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  var bkImage = new Array();         //  a new background image array
  var bkSpeed = 400;
  var bkTimer = null;
  var bkCurrentImage = -1;

  ////////////////////////////////////////////////////////////////////////
  //
  //      bkImageAdd
  //
  //	    Add a new background image
  //
  //          Enter:
  //		    bkImageId	       = background image ID
  //            bkImageName        = background image name
  //			bkImageUrl         = url of image
  //            bkImageTransparent = true if transparent
  //			bkImageColor       = background color
  //			bkZLevel		   = z level
  //          Exit:
  //            object descriptor for future reference
  //
  ////////////////////////////////////////////////////////////////////////
  function bkImageAdd(bkImageId,
  		   			  bkImageName,
					  bkImageUrl,
					  bkImageTransparent,
					  bkImageColor,
					  bkZLevel)
  {
	var bkRef = new animationElement(bkImageId, bkImageName, 'bkImage', bkZLevel);

	with (bkRef)
	{
		visible = false;

		bktransparent = bkImageTransparent;
		bkcolor = bkImageColor;

		if (cbeNewImage(bkImageName, bkImageUrl) == null)
		{
		    valid = false;
			return false;
		}
	}

    if (bkImage.length == 0)
	{
	  addModule('bkImage', bkImage, 'bkImageInit()', 'bkImageReset()');
	  bkCurrentImage = -1;
	}

	bkImage[bkImage.length] = bkRef;
	return true;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //       bkImageReset
  //
  //////////////////////////////////////////////////////////////////////////
  function bkImageReset()
  {
  	bkTimer = null;
  	bkCurrentImage = -1;
    if (bkImage.length == 0) return;
	bkImage.length = 0;
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //      bkImageInit
  //
  ////////////////////////////////////////////////////////////////////////
  function bkImageInit()
  {
    bkTimerSpeed = bkSpeed;
	
	if (bkImage.length == 0) return;

    bkImageNext();

	bkTimer = aetNewTimer('bkImage',
	  	 				  'bkImageNext()',
						  bkTimerSpeed,
						  true);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //      bkImageNext
  //
  ////////////////////////////////////////////////////////////////////////
  function bkImageNext()
  {
    if (bkImage.length == 0) return;
	var index = Math.round(Math.random() * (bkImage.length - 1));
	if (index >= bkImage.length) index = 0;
	if (bkCurrentImage == index) return;
    with (bkImage[index])
	{	
		var imgUrl = cbeGetElementById(name).src;
		var appBackground = cbeGetElementById(id).cbe;
    	with (appBackground) 
		{
	        hide();
        	zIndex(aeZ);
			background(bkcolor,
		           	   imgUrl);
        	resizeTo(app.width(), app.height());
        	moveTo(0,0);
        	show();
		}
	}
	bkCurrentImage = index;
  }

