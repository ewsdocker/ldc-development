  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //
  //       Mouse Trailer.
  //
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////


  var mtrailImage = new Array();
  var mtrailTimer = null;
  var mtrailRef = null;

  //////////////////////////////////////////////////////////////////////////
  //
  //     mouseTrail
  //
  //	   Enter:
  //	     mtrailImageId      = trailer div id
  //         mtrailName         = trailer name
  //		 mtrailImageArray	= array containing trailer images
  //         mtrailFollower     = mouseFollower to attach trail to
  //		 mtrailImageWidth	= largest width  of images in trailer array
  //		 mtrailImageHeight  = largest height of images in trailer array
  //		 mtrailZ            = z-level
  //       Exit:
  //         true if successful
  //		 false if unsuccessful
  //
  //////////////////////////////////////////////////////////////////////////
  function mouseTrail(mtrailImageId,
					  mtrailName,
					  mtrailImageArray,
					  mtrailFollower,
					  mtrailWidth,
				   	  mtrailHeight,
					  mtrailZ)
  {
    var follower = mouseFollowerFind(mtrailFollower);
    if (follower >= mfolImage.length) return;
	var mfollower = mfolImage[follower];
	
    var trailRef = new animationElement(mtrailImageId, mtrailName, 'mtrailImage', mtrailZ);

	with (trailRef)
	{
	    wFrame = mfollower;
		mfollower.animFrames = trailRef;

	    aeWidth = mtrailWidth;
		aeHeight = mtrailHeight;

		animFrames = mtrailImageArray.length;

		for (var i = 0; i < mtrailImageArray.length; i++)
		{
	  	  var imgName = mtrailName + (i + 1);

	  	  if (cbeNewImage(imgName, mtrailImageArray[i]) == null)
	      {
	        valid = false;
			return false;
	      }
	    }
		
		selected = false;
	}
	
	if (mtrailImage.length == 0) addModule('mouseTrail', mtrailImage, 'mouseTrailInit()', 'mouseTrailReset()');
	
	mtrailImage[mtrailImage.length] = trailRef;
  }
  	
  //////////////////////////////////////////////////////////////////////////
  //
  //       mouseTrailReset
  //
  //////////////////////////////////////////////////////////////////////////
  function mouseTrailReset()
  {
    if (mtrailImage.length == 0) return;
	mtrailImage.length = 0;
  }
  
  //////////////////////////////////////////////////////////////////////////
  //
  //       mouseTrailInit
  //
  //////////////////////////////////////////////////////////////////////////
  function mouseTrailInit()
  {
    mtrailTimer = null;
  	mtrailRef = null;
    
	if (mtrailImage.length == 0) return false;
	
	for (var mtrailIndex = 0; mtrailIndex < mtrailImage.length; mtrailIndex++)
	{
	    var trailRef = mtrailImage[mtrailIndex];
    	with (trailRef)
	    {
		  for (var i = 0; i < animFrames; i++)
		  {
			var imgUrl = cbeGetElementById(name + (i + 1)).src;
			if (imgUrl == null) return false;

		    var trailer = cbeGetElementById(id + (i + 1)).cbe;
			if (trailer == null) return false;

			with (trailer)
			{
				background(background(), imgUrl);
   	    	    zIndex(aeZ + i);
			    resizeTo(aeWidth, aeHeight);
   				moveTo('center');
		        hide();
			}
		  }
	    	
		  visible = false;
		  selected = false;
		}
    }
	
	mtrailTimer = aetNewTimer('mouseTrail',
		                      'mouseTrailFollowMouse()',
							  2,
							  false);

	return true;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //       mouseTrailFollowMouse
  //
  //////////////////////////////////////////////////////////////////////////
  function mouseTrailFollowMouse()
  {
      var mouseTrail = mfollower.animFrames;
	  var mouseX = mfollowerRef.pageX();
	  var mouseY = mfollowerRef.pageY();
	  var visibleImages = 0;
	  
   	  for (var i = mouseTrail.animFrames - 1; i >= 0; i--)
	  {
		  var source = cbeGetElementById(mouseTrail.id + (i + 1)).cbe;
	      if ( (source.pageX() == mouseX) &&
		       (source.pageY() == mouseY) )
		  {
		      source.hide();
			  mouseTrail.visible = false;
		  }
		  else
		  {
		      if (i == 0) 
			  {
			      source.moveTo(mouseX, mouseY, 0, false);
			  }
			  else
			  {
		      	  var dest = cbeGetElementById(mouseTrail.id + i).cbe;
			  	  source.moveTo(dest.pageX(), dest.pageY(), 0, false);
			  }
			  source.show();
			  mouseTrail.visible = true;
			  visibleImages++;
		  }
	  }
	  // possible race condition (follower sets active and trail resets) is
	  // resolved by next mouse movement, since this is a non-critical event.
	  if (visibleImages == 0) aeTimer[mtrailTimer].active = false;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //       mouseTrailStart
  //
  //////////////////////////////////////////////////////////////////////////
  function mouseTrailStart()
  {
      var mouseTrail = mfollower.animFrames;
	  
   	  for (var i = 0; i < mouseTrail.animFrames; i++)
	  {
		  var id = mouseTrail.id + (i + 1);
		  var source = cbeGetElementById(id).cbe;
		  source.moveTo('center');
	  }
  }
  
