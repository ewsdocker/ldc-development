  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //
  //       Mouse Follower.
  //
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  var mfolImage = new Array();
  var mfolTimer = null;

  var mfollowerEvent = null;

  var mfollowerRef = null;
  var mfollower = null;

  //////////////////////////////////////////////////////////////////////////
  //
  //     mouseFollower
  //
  //	   Enter:
  //	     mfolImageId      = cursor image id
  //		 mfolImageUrl     = image url
  //		 mfolImageArray	  = array containing cursor trailer images
  //		 mfolImageWidth	  = largest width  of images in trailer array
  //		 mfolImageHeight  = largest height of images in trailer array
  //		 mfolPersistence  = time (in mSec.) that a trailer image is visible
  //  		 mfolPadding      = screen border width
  //         mfolZ            = z-level
  //       Exit:
  //         true if successful
  //		 false if unsuccessful
  //
  //////////////////////////////////////////////////////////////////////////
  function mouseFollower(mfolImageId,
					  	  mfolName,
						  mfolImageUrl,
					   	  mfolWidth,
				   	  	  mfolHeight,
						  mfolPersistence,
						  mfolPadding,
						  mfolZ)
  {
    var mfollowerRef = new animationElement(mfolImageId, mfolName, 'mfolImage', mfolZ);
	
	with (mfollowerRef)
	{
	    aePrevX = aeMouse.x;
		aePrevY = aeMouse.y;

	    aeWidth = mfolWidth;
		aeHeight = mfolHeight;

		aePadding = mfolPadding;
		speed = mfolPersistence;

		timeout = 1;
		animFrames = 0;

		if (cbeNewImage(mfolName, mfolImageUrl) == null)
		{
		  valid = false;
		  return false;
		}
		selected = false;
	}

	if (mfolImage.length == 0) addModule('mouseFollower', mfolImage, '', 'mouseFollowerReset()');
	
	mfolImage[mfolImage.length] = mfollowerRef;
  }
  	
  //////////////////////////////////////////////////////////////////////////
  //
  //       mouseFollowerReset
  //
  //////////////////////////////////////////////////////////////////////////
  function mouseFollowerReset()
  {
    if (mfolImage.length == 0) return;
	mfolImage.length = 0;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //       mouseFollowerInit
  //
  //////////////////////////////////////////////////////////////////////////
  function mouseFollowerInit(followerNumber)
  {
    mfolTimer = null;

    mfollowerEvent = null;

    mfollowerRef = null;
    mfollower = null;
    
	if ((followerNumber >= mfolImage.length) ||
	    (followerNumber < 0))
	{
	  return false;
	}
	
	var mfolRef = mfolImage[followerNumber];
    with (mfolRef)
	{
      var follower = cbeGetElementById(id).cbe;
	  var imgUrl = cbeGetElementById(name).src;
      with (follower)
	  {
		background(background(), imgUrl);
   	    zIndex(aeZ);
		resizeTo(aeWidth, aeHeight);
   		moveTo('center');
		hide();
	  }

	  visible = false;
	  selected = false;
    }
	
	mfolTimer = aetNewTimer('mfolImage',
		                    'mouseFollowerMove()',
							1,
							true);
	return true;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //       mouseFollowerDeselect
  //
  //////////////////////////////////////////////////////////////////////////
  function mouseFollowerDeselect()
  {
      if ((mfolImage.length == 0) ||
	      (mfollowerRef == null)    ||
	      (mfollowerRef >= mfolImage.length)) return;
	  mfollowerRef.visible = false;
	  mfollowerRef.selected = false;
	  mfollowerRef = mfolImage.length;
  }
  
  //////////////////////////////////////////////////////////////////////////
  //
  //       mouseFollowerFind
  //
  //////////////////////////////////////////////////////////////////////////
  function mouseFollowerFind(followerName)
  {
      mouseFollowerDeselect();
	  for (var i = 0; i < mfolImage.length; i++)
	  {
	      if ((mfolImage[i].name == followerName) &&
		      (mfolImage[i].valid))
		  {
		    return i;
		  }
	  }
	  
	  return mfolImage.length;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //       mouseFollowerSelect
  //
  //////////////////////////////////////////////////////////////////////////
  function mouseFollowerSelect(followerName)
  {
      if (mfolImage.length == 0) return;
	  var followerNumber = mouseFollowerFind(followerName);
	  if (followerNumber == mfolImage.length) return;

	  mouseFollowerDeselect();

	  if (! mouseFollowerInit(followerNumber)) return;

	  mfollower = mfolImage[followerNumber];
	  mfollower.selected = true;

	  mfollowerRef = cbeGetElementById(mfollower.id).cbe;

	  mfollower.visible = false;
	  mfollower.aeX = aeMouse.x;
	  mfollower.aeY = aeMouse.y;

	  mfollowerRef.moveTo('center');
	  if (mfollower.animFrames != 0) mouseTrailStart();
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //       mouseFollowerStart
  //
  //////////////////////////////////////////////////////////////////////////
  function mouseFollowerStart()
  {
    if ((mfolImage.length == 0) ||
	    (mfollowerRef == null) ||
		(! timersAllowed)) return;

	mfollower.visible = false;
	mfollower.aeX = aeMouse.x;
	mfollower.aeY = aeMouse.y;

	mfollowerRef.moveTo('center');
	if (mfollower.animFrames != 0) mouseTrailStart();
  }
  
  //////////////////////////////////////////////////////////////////////////
  //
  //       mouseFollowerMove
  //
  //////////////////////////////////////////////////////////////////////////
  function mouseFollowerMove()
  {
    if (timersAllowed &&
	    (mfollowerRef != null) &&
		(mfolImage.length > 0))
    {
	    with (mfollower)
	    {
	        if ( (aeMouse.x != aeX) ||
	             (aeMouse.y != aeY) )
			{
			    aeX = aeMouse.x;
				aeY = aeMouse.y;

			    visible = true;
			    if ( (aeX < aePadding)   ||
				     (aeX > (app.width() - aePadding - aeWidth)) ||
				     (aeY < aePadding)   ||
				     (aeY > (app.height() - aePadding - aeHeight)) ) visible = false;

			    with (mfollowerRef)
			    {
		            hide();
					if (visible)
					{
   				      moveTo(aeX + 4, aeY + 4, 0, false);
					  zIndex(aeZ);
				      wStep = speed;
					  show();
					  aeTimer[mtrailTimer].active = true;
					}
		        }
	        }	      
			else if ((visible) && (wStep != 0))
			{
			  wStep--;
		  	  if (wStep == 0)
		      {
		        mfollowerRef.hide();
		    	visible = false;
		      }
		    }
			
	    }
	}
  }

