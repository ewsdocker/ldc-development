  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //
  //   Animation.js
  //
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  var animationVersion = 5;

  var cbeVersionRequired = '4.17';

  //////////////////////////////////////////////////////////////////////////

  var appId = 'idApplication';
  var app = null;

  var afApp = new animationFrame(appId, 				// aFrameId
  		   				  		 'application',			// aFrameName 
						  		 'application', 		// aFrameType
						  		 null,					// aFrameCallback
								 null,					// aFrameInit
						  		 null,					// aFrameParent
						  		 null,					// aFrameContentUrl
						  		 null,					// aFrameContentLink
						  		 true,					// aFrameVisible
						  		 '#000000',				// aFrameColor
						  		 'transparent',			// aFrameBackground
						  		 null,					// aFrameBackgroundUrl
						  		 0,						// aFrameX
						  		 0,						// aFrameY
						  		 1,	  		   			// aFrameZ
						  		 1,						// aFrameW
						  		 1,						// aFrameH
						  		 null);					// aFrameParams

  var appTable = new Array();
  
  //////////////////////////////////////////////////////////////////////////

  var afDebugAlert = true;        // true = display debug alerts
  	  			   	 			  // false = no debug alerts
  
  var clickEvent = new Array();
  var afTimer = new Array();

  var afTimerRef = null;
  var afTimerDuration = 50;
  var afTimerMSec = 0;

  var currentClickEvent = null;
  var currentClickIndex = -1;

  var afMouse = null;

  var timersAllowed = false;
  var afResizing = false;

  //////////////////////////////////////////////////////////////////////////

  var sequenceTable = new Array();
  var frameTable = new Array();

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //
  //     Animation Frame
  //
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////
  //
  //     stopAnimation
  //
  ////////////////////////////////////////////////////////////////////////
  function stopAnimation()
  {
      timersAllowed = false;
      window.cbe.removeEventListener('resize', onResize, false);
	  stopMouse();
  }
  
  ////////////////////////////////////////////////////////////////////////
  //
  //     mouseElement
  //
  ////////////////////////////////////////////////////////////////////////
  function mouseElement()
  {
    this.enabled = false;
	this.x = 0;
	this.y = 0;
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //     windowOnload
  //
  ////////////////////////////////////////////////////////////////////////
  function windowOnload()
  {
   	  if (afMouse == null) afMouse = new mouseElement();

      if (! createAnimationObject()) return;

	  animationCreateObjects();

      initializeAnimationWindow();
	  postInitialization();
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //        createAnimationObject
  //
  //////////////////////////////////////////////////////////////////////////
  function createAnimationObject()
  {
    if (appTable.length > 0) appTable.length = 0;
	appTable[0] = afApp;
	
    app = cbeGetElementById(appId).cbe;
	if (app == null)
	{
	  return false;
	}

	with (app)
	{
	  hide();
	  zIndex(afApp.zInit);
	  afApp.z = zIndex();
	  resizeTo(document.cbe.width(), 
	  		   document.cbe.height());
	  afApp.w = width();
	  afApp.h = height();
	  moveTo(afApp.xInit, afApp.yInit);
	  afApp.x = left();
	  afApp.y = top();
	  if (afApp.visible) show();
    }
	  
    afTimerMSec = afTimerDuration;
	if (afTimer.length > 0) afTimer.length = 0;
	return true;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //        initializeAnimationWindow
  //
  //////////////////////////////////////////////////////////////////////////
  function initializeAnimationWindow()
  {
    if (appId == null)
    {
	  window.status = 'application id not set!';
	  appId = 'idApplication';
    }
	  
	timersAllowed = false;

	initializeFrames();

	afApp.w = document.cbe.width();
	afApp.h = document.cbe.height();
	
	app.resizeTo(afApp.w, afApp.h);
	appMove(afApp.xInit,
		    afApp.yInit,
			afApp.zInit);
			
	if (afMouse.enabled) startMouse();
	  
	setTimeout('startAnimation()', 100);
    window.cbe.addEventListener('resize', onResize, false);

  }

  //////////////////////////////////////////////////////////////////////////
  //
  //        appMove
  //
  //          Enter:
  //			appX		 = x location
  //			appY         = y location
  //			appZ		 = z-level
  //
  //////////////////////////////////////////////////////////////////////////
  function appMove(appX, 
				   appY, 
				   appZ)
  {
    afApp.prevX = afApp.x;
    afApp.x 	= appX;
	
	afApp.prevY = afApp.y;
	afApp.y 	= appY;

	with (app)
	{
	  if (afApp.x < 0) afApp.x = 0;
	  if (afApp.y < 0) afApp.y = 0;

	  hide();
	  moveTo(afApp.x, afApp.y);
	  if (afApp.visible) show();
	}
  }
  
  //////////////////////////////////////////////////////////////////////////
  //
  //        initializeFrames
  //
  //////////////////////////////////////////////////////////////////////////
  function initializeFrames()
  {
    if (appTable.length == 0) return;
	var tableIndex;
	for (tableIndex = 0; tableIndex < appTable.length; tableIndex++)
	{
	  if (appTable[tableIndex].init != null) eval(appTable[tableIndex].init);
	}
  }
  
  //////////////////////////////////////////////////////////////////////////
  //
  //        startAnimation   
  //
  //////////////////////////////////////////////////////////////////////////
  function startAnimation()
  {
      timersAllowed = true;

	  if (afTimerRef == null) afTimerRef = setTimeout('animationTimer()', afTimerMSec);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //     onResize
  //
  ////////////////////////////////////////////////////////////////////////
  function onResize()
  {
    afResizing = true;

	stopAnimation();

    clickEvent.length = 0;
	currentClickIndex = -1;
	  
  	afTimer.length = 0;
	afTimerRef = null;
	afTimerMSec = afTimerDuration;

    location.replace(location.href);
	afResizing = false;
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //     enableMouse
  //
  ////////////////////////////////////////////////////////////////////////
  function enableMouse() 
  {
      afMouse.enabled = true;
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //     disableMouse
  //
  ////////////////////////////////////////////////////////////////////////
  function disableMouse() 
  {
      afMouse.enabled = false;
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //     startMouse
  //
  ////////////////////////////////////////////////////////////////////////
  function startMouse() 
  {
      if (! afMouse.enabled) return;

	  document.cbe.addEventListener('mouseOver', onMouseOver, false);
	  document.cbe.addEventListener('click', onClick, false);
      document.cbe.addEventListener('mouseMove', onMouseMove, false);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //     stopMouse
  //
  ////////////////////////////////////////////////////////////////////////
  function stopMouse() 
  {
    if (afMouse.enabled)
	{
	    document.cbe.removeEventListener('mouseMove', onMouseMove, false);
	    document.cbe.removeEventListener('click', onClick, false);
	    document.cbe.removeEventListener('mouseOver', onMouseOver, false);
	}
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //     onMouseMove
  //
  ////////////////////////////////////////////////////////////////////////
  function onMouseMove(event)
  {
      if (! afMouse.enabled) return;

      if (event.cbeTarget)
	  {
	      if ((afMouse.x != event.pageX) || (afMouse.y != event.pageY)) onMouseOver(event);
	      afMouse.x = event.pageX;
		  afMouse.y = event.pageY;
      }
  }
  

  ////////////////////////////////////////////////////////////////////////
  //
  //     onMouseOver
  //
  ////////////////////////////////////////////////////////////////////////
  function onMouseOver(event)
  {
      if (! afMouse.enabled) return;
/*
      if (event.cbeTarget)
	  {
	    if (menuBarDisplayed) menuMouseOver(event);
		
      }
*/
  }
  
  ////////////////////////////////////////////////////////////////////////
  //
  //     onClick
  //
  //	   generate mouse click interrupt
  //
  ////////////////////////////////////////////////////////////////////////
  function onClick(event)
  {
      if (! afMouse.enabled) return;

      if (event.cbeTarget)
	  {
/*
	    if (menuBarDisplayed)
		{
		  menuMouseClick(event);
		  return;
		}
*/
		if (clickEvent.length > 0)
		{
		  processClickEvent(event);
		}
      }
  }
  
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //
  //   Event Constructor.
  //
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////
  //
  //      animationFrameEvent
  //
  //	    Enter:
  //		  afeName     = name of event
  //		  afeId		  = container Id
  //		  afeCallback = function to execute when event occurs
  //		  afeType     = event type
  //		  afeActive   = true to start, false to leave idle.
  //		  afeBubble   = bubbling allowed
  //		Exit:
  //		  reference to newly created element.
  //
  //////////////////////////////////////////////////////////////////////////
  function animationFrameEvent(afeName, 
  		   					   afeId, 
							   afeCallback, 
							   afeType, 
							   afeActive, 
							   afeBubble)
  {
      this.descriptorType = 'afe';
	  this.name = afeName;
	  this.callback = afeCallback;
	  this.type = afeType;
	  this.active = afeActive;
	  this.bubble = afeBubble;
	  this.id = afeId;
	  this.assigned = true;
  }

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //
  //		Mouse Click Event Handler
  //
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////
  //
  //      addClickEvent
  //
  //	    Enter:
  //		  clickName     = name of event
  //		  clickId       = container id
  //		  clickCallback = function to execute when event occurs
  //		  clickActive   = true to start, false to leave idle.
  //		  clickBubble   = bubbling allowed
  //		Exit:
  //		  clickEventNumber = event number assigned.
  //
  //////////////////////////////////////////////////////////////////////////
  function addClickEvent(clickName, 
  		   				 clickId, 
						 clickCallback, 
						 clickActive, 
						 clickBubble)
  {
      var clickEventNumber = clickEvent.length;
      clickEvent[clickEventNumber] = new animationFrameEvent(clickName, 
  								  	  					     clickId, 
															 clickCallback, 
															 'click', 
															 clickActive, 
															 clickBubble);
	  return clickEventNumber;
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //     enableClickEvent
  //
  //	   enable mouse click event
  //
  ////////////////////////////////////////////////////////////////////////
  function enableClickEvent(clickName)
  {
	  if (clickEvent.length == 0) return;

      var clickIndex;
      for (clickIndex = 0; clickIndex < clickEvent.length; clickIndex++)
  	  {
        with (clickEvent[clickIndex])
	    {
	      if (name == clickName)
		  {
		    active = false;
			return clickIndex;
		  }
		}
	  }
  }
  
  ////////////////////////////////////////////////////////////////////////
  //
  //     disableClickEvent
  //
  //	   disable mouse click event
  //
  ////////////////////////////////////////////////////////////////////////
  function disableClickEvent(clickName)
  {
	  if (clickEvent.length == 0) return;

      var clickIndex;
      for (clickIndex = 0; clickIndex < clickEvent.length; clickIndex++)
  	  {
        with (clickEvent[clickIndex])
	    {
	      if (name == clickName)
		  {
		    active = false;
			return clickIndex;
		  }
		}
	  }
  }
  
  ////////////////////////////////////////////////////////////////////////
  //
  //     processClickEvent
  //
  //	   process mouse click interrupt
  //
  ////////////////////////////////////////////////////////////////////////
  function processClickEvent(event)
  {
	currentClickEvent = event;
    for (currentClickIndex = 0; currentClickIndex < clickEvent.length; currentClickIndex++)
  	{
      with (clickEvent[currentClickIndex])
	  {
		if (active && (event.cbeTarget.id == id))
		{
		  if ((cbeEventPhase[event.eventPhase] == 'AT_TARGET') ||
		      (bubble && 
			   (cbeEventPhase[event.eventPhase] == 'BUBBLING_PHASE'))) eval(callback);
		}
      }
	}
  }
  
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //
  //   Timer Constructor.
  //
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////
  //
  //      animationFrameTimer
  //
  //	    Enter:
  //		  aftName     = name of timer
  //		  aftCallback = function to execute when timer count reached
  //		  aftCounts   = number of 100 mSec intervals
  //		  aftActive   = true to start, false to leave idle.
  //		Exit:
  //		  reference to newly created element.
  //
  //////////////////////////////////////////////////////////////////////////
  function animationFrameTimer(aftName, 
  		   					   aftCallback, 
							   aftCounts, 
							   aftActive)
  {
      this.descriptorType = 'aft';
	  this.name = aftName;
	  this.callback = aftCallback;
	  this.counts = aftCounts;
	  this.countdown = aftCounts;
	  this.active = aftActive;
	  this.assigned = true;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //      aftNewTimer
  //
  //	    Enter:
  //		  aftName     = name of timer
  //		  aftCallback = function to execute when timer count reached
  //		  aftCounts   = number of 100 mSec intervals
  //		  aftActive   = true to start, false to leave idle.
  //		Exit:
  //		  afTimerNumber = timer number assigned.
  //
  //////////////////////////////////////////////////////////////////////////
  function aftNewTimer(aftName, 
  		   			   aftCallback, 
					   aftCounts, 
					   aftActive)
  {
      var afTimerNumber = afTimer.length;
      afTimer[afTimer.length] = new animationFrameTimer(aftName, aftCallback, aftCounts, aftActive);
	  return afTimerNumber;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //    aftGetTimer
  //      Enter:
  //        aftName = timer name to retrieve
  //      Exit:
  //        index of aftName in afTimer array.
  //        index = afTimer.length if not found.
  //
  //////////////////////////////////////////////////////////////////////////
  function aftGetTimer(aftName)
  {
      if (afTimer.length == 0) return 0;
	  
      for (var i = 0; i < afTimer.length; i++)
	  {
	      if ((afTimer[i].assigned) && (afTimer[i].name == aftName)) return i;
	  }
	  
	  return afTimer.length;
  }
  
  //////////////////////////////////////////////////////////////////////////
  //
  //    aftStartTimerName
  //      Enter:
  //	    aeName = timer name to start
  //      Exit:
  //	    timerIndex = index of timer started.
  //		timerIndex == afTimer.length if unsuccessful
  //
  //////////////////////////////////////////////////////////////////////////
  function aftStartTimerName(aftName)
  {
      var timerIndex = aftGetTimer(aftName);
	  if (timerIndex == afTimer.length) return afTimer.length;
	  return aftStartTimerNumber(timerIndex);
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //    aftStartTimerNumber
  //      Enter:
  //	    timerIndex = timer number to start
  //      Exit:
  //	    timerIndex = index of timer started.
  //		timerIndex == afTimer.length if unsuccessful
  //
  //////////////////////////////////////////////////////////////////////////
  function aftStartTimerNumber(timerIndex)
  {
	  if ((timerIndex == afTimer.length) || (! afTimer[timerIndex].assigned)) return afTimer.length;
	  with (afTimer[timerIndex])
	  {
	      countdown = counts;
		  active = true;
	  }
	  if (afTimerRef == null) afTimerRef = setTimeout('animationTimer()', afTimerMSec);
	  return timerIndex;
  }
    
  //////////////////////////////////////////////////////////////////////////
  //
  //    aftStopTimerName
  //      Enter:
  //	    aeName = timer name to stop
  //      Exit:
  //	    timerIndex = timer number stopped.
  //		timerIndex == afTimer.length if unsuccessful
  //
  //////////////////////////////////////////////////////////////////////////
  function aftStopTimerName(aftName)
  {
      var timerIndex = aftGetTimer(aftName);
	  if (timerIndex == afTimer.length) return afTimer.length;
	  return aftStopTimerNumber(timerIndex);
  }
    
  //////////////////////////////////////////////////////////////////////////
  //
  //    aftStopTimerNumber
  //      Enter:
  //	    timerIndex = timer number to stop
  //      Exit:
  //	    timerIndex = timer number stopped.
  //		timerIndex == afTimer.length if unsuccessful
  //
  //////////////////////////////////////////////////////////////////////////
  function aftStopTimerNumber(timerIndex)
  {
	  if ((timerIndex == afTimer.length) || (! afTimer[timerIndex].assigned)) return afTimer.length;
	  afTimer[timerIndex].active = false;
	  return timerIndex;
  }
    
  //////////////////////////////////////////////////////////////////////////
  //
  //    animationTimer
  //
  //      process the animation timer interrupt
  //
  //////////////////////////////////////////////////////////////////////////
  function animationTimer()
  {
      if (afTimer.length == 0)
	  {
	      afTimer = null;
		  return;
	  }

      for (timerIndex = 0; timerIndex < afTimer.length; timerIndex++)
  	  {
          with (afTimer[timerIndex])
	      {
		      if (active)
			  {
			      countdown -= 1;
				  if (countdown == 0)
				  {
				      eval(callback);
					  countdown = counts;
				  }
			  }
	      }
      }

	  afTimerRef = setTimeout('animationTimer()', afTimerMSec);
  }
  
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //
  //   Launch new window
  //
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////
  //
  //      afLaunchWindow
  //
  ////////////////////////////////////////////////////////////////////////
  function afLaunchWindow()
  {
    with (clickEvent[currentClickIndex])
	{
	  var afeObj = afGetObjectById(id);
	  if (afeObj == null) 
	  {
	    if (afDebugAlerts) alert('afLaunchWindow null object for id ' + id);
	    return;
	  }
	
	  with (afeObj)
	  {
        childId = launch(contentLink,
				  	  	 '_top', //name,
						 "channelmode=0,dependent=0,directories=1,fullscreen=1,location=1,menubar=1,resizable=1,scrollbars=1,status=1,toolbar=1",
						 "animationWindow");
	  }
	}
  }
  
  ////////////////////////////////////////////////////////////////////////
  //
  //      launch
  //
  //          Enter:
  //		    windowURL      = URL to open
  //            windowName     = name for new window
  //			windowFeatures = features for new window
  //			parentName	   = parent (this) window name
  //          Exit:
  //		    windowRef 	   = new window reference
  //
  ////////////////////////////////////////////////////////////////////////
  function launch(windowURL, 
  		   		  windowName, 
				  windowFeatures, 
				  parentName)
  {
    var windowRef = open(windowURL, 
				  		 windowName, 
						 windowFeatures);
  	if (windowRef.opener == null)
      windowRef.opener = window;
    windowRef.opener.name = parentName;
    return windowRef;
  }

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //
  //   Object Lookup.
  //
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////
  //
  //     afGetObjectById
  //
  //	   Enter:
  //	     afId = id of object to lookup
  //	   Exit:
  //	     afObjRef = reference to animation object, if found
  //		 		  = null if not found
  //
  ////////////////////////////////////////////////////////////////////////
  function afGetObjectById(afId)
  {
    var afIndex;
    for (afIndex = 0; afIndex < appTable.length; afIndex++)
	{
	  if (appTable[afIndex].id == afId) return appTable[afIndex];
	}
	return null;
  }
  
  //////////////////////////////////////////////////////////////////////////
  //
  //        afMoveObject
  //
  //          Enter:
  //		    afRef  = object reference
  //			afX	   = x location
  //			afY    = y location
  //			afZ	   = z-level
  //			afRel  = true for relative move, false for absolute
  //
  //////////////////////////////////////////////////////////////////////////
  function afMoveObject(afRef,
  		   				afX, 
				   		afY, 
				   		afZ,
						afRel)
  {
    if (afRef == null)
	{
	  if (afDebugAlerts) alert('afMoveObject afRef is null');
	  return;
	}
	afRef.hide();

	var afObject = afGetObjectById(afRef.id);

	with (afObject)
	{
      prevX = x;
	  prevY = y;
	  prevZ = z;

	  if (afRel)
	  {
	    x += afX;
		y += afY;
		z += afZ;
	  }
	  else
	  {
	    x = afX;
		y = afY;
		z = afZ;
	  }

	  if (x < 0) x = 0;
	  if (y < 0) y = 0;
	  if (z < 1) z = 1;
	  
	  afRef.moveTo(x, y);
	  afRef.zIndex(z);
	  
	  if (visible) afRef.show();
    }
  }
  
  //////////////////////////////////////////////////////////////////////////
  //
  //        afMoveObject
  //
  //          Enter:
  //		    afRef  = object reference
  //			afX	   = x location
  //			afY    = y location
  //			afZ	   = z-level
  //			afRel  = true for relative move, false for absolute
  //
  //////////////////////////////////////////////////////////////////////////
  function afResizeObject(afRef,
  		   				  afW, 
				   		  afH)
  {
	afRef.hide();
	var afObject = afGetObjectById(afRef.id);
	with (afObject)
	{
	  if (w < 1) x = 1;
	  if (h < 1) h = 1;
	  
	  afRef.resizeTo(w, h);
	  
	  if (visible) afRef.show();
    }
  }
  
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  //
  //     animationFrameSequencer
  //
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////
  //
  //     frameAtom
  //
  //	   Enter:
  //	     frameAtomName      = name of frame
  //		 frameAtomFrameId   = id of object to be controlled
  //		 frameAtomMin       = how long to show frame (minimum) - tenths of sec
  //		 frameAtomMax       = how long to show frame (maximum) - tenths of sec
  //		 frameAtomCallback  = optional callback to process this frame
  //
  ////////////////////////////////////////////////////////////////////////
  function frameAtom(frameAtomName,
	 			  	 frameAtomFrameId,
					 frameAtomMin,
					 frameAtomMax,
					 frameAtomCallback)
  {
    this.descriptorType = 'aframe';
    this.name = frameAtomName;
	this.id = frameAtomFrameId;
	this.minCount = frameAtomMin;
	this.maxCount = frameAtomMax;
	this.callback = frameAtomCallback;
  }
	  
  ////////////////////////////////////////////////////////////////////////
  //
  //     createFrameAtom
  //
  //	   Enter:
  //	     frameAtomName      = name of frame atom
  //		 frameAtomFrameId   = id of object to be controlled
  //		 frameAtomMin       = how long to show frame (minimum) - tenths of sec
  //		 frameAtomMax       = how long to show frame (maximum) - tenths of sec
  //		 frameAtomCallback  = optional callback to process this frame
  //
  ////////////////////////////////////////////////////////////////////////
  function createFrameAtom(frameAtomName,
	 			  	   	   frameAtomFrameId,
					   	   frameAtomMin,
					   	   frameAtomMax,
					   	   frameAtomCallback)
  {
    var frameIndex = frameTable.length;
    frameTable[frameTable.length] = new frameAtom(frameAtomName,
								  			   	  frameAtomFrameId,
											   	  frameAtomMin,
											   	  frameAtomMax,
											   	  frameAtomCallback);
	return frameIndex;
  }
	  
  ////////////////////////////////////////////////////////////////////////
  //
  //     sequenceObject
  //
  //	   Enter:
  //	     sequenceName  = name of sequence
  //		 frameList     = list of frames in sequence
  //	   Exit:
  //	     sequenceRef   = reference to new sequence
  //
  ////////////////////////////////////////////////////////////////////////
  function sequenceObject(sequenceName,
  		   				  frameList)
  {
    this.descriptorType = 'aseq';
    this.name = sequenceName;
	this.list = new Array();
	var listIndex;
	for (listIndex = 0; listIndex < frameList.length; listIndex++)
	{
	  this.list[listIndex] = frameList[listIndex];
	}
	this.index = 0;
	this.timer = null;
  }
	  
  ////////////////////////////////////////////////////////////////////////
  //
  //     createSequence
  //
  //	   Enter:
  //	     sequenceName   = name of sequence
  //		 frameList      = list of frames in sequence
  //		 initialTimeout = initial timer count
  //       Exit:
  //	     sequenceIndex = sequenceList element number created
  //
  ////////////////////////////////////////////////////////////////////////
  function createSequence(sequenceName,
  		   				  frameList,
						  initialTimeout)
  {
    var sequenceIndex = sequenceTable.length;
    var sequenceAtom = new sequenceObject(sequenceName, frameList);
	sequenceAtom.timer = aftNewTimer(sequenceName,
					  				 'processSequence()',
									 initialTimeout,
									 false);
	sequenceTable[sequenceIndex] = sequenceAtom;
	return sequenceIndex;
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //     frameRandomCounts
  //
  //	   Enter:
  //		 frameMin       = how long to show frame (minimum) - tenths of sec
  //		 frameMax       = how long to show frame (maximum) - tenths of sec
  //
  ////////////////////////////////////////////////////////////////////////
  function frameRandomCount(frameMin, frameMax)
  {
    if (frameMax == 0) return frameMin;
	
    var fMin = 10 * frameMin;
	var fMax = 10 * frameMax;
		
    var count = Math.round(fMax * Math.random());
	if (count < fMin) return fMin;
	return count;
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //     previousFrameIndex
  //
  //	   Enter:
  //	     sequenceAtom = reference to sequence descriptor
  //       Exit:
  //	     index of previous frameAtom in list
  //
  ////////////////////////////////////////////////////////////////////////
  function previousFrameIndex(sequenceAtom)
  {
    var index = sequenceAtom.index;
	if (index == 0) index = sequenceAtom.list.length;
	return --index;
  }
  	  
  ////////////////////////////////////////////////////////////////////////
  //
  //     previousFrameAtom
  //
  //	   Enter:
  //	     sequenceAtom = reference to sequence descriptor
  //       Exit:
  //	     previous frameAtom in list
  //
  ////////////////////////////////////////////////////////////////////////
  function previousFrameAtom(sequenceAtom)
  {
	return frameTable[sequenceAtom.list[previousFrameIndex(sequenceAtom)]];
  }
  	  
  ////////////////////////////////////////////////////////////////////////
  //
  //     processFrameAtom
  //
  //	   Enter:
  //	     sequenceAtom = reference to sequence descriptor
  //	     frameAtom    = reference to frame descriptor
  //       Exit:
  //	     none.
  //
  ////////////////////////////////////////////////////////////////////////
  function processFrameAtom(sequenceAtom, frameAtom)
  {
	  var frameObj = cbeGetElementById(frameAtom.id).cbe;
	  var afObject = afGetObjectById(frameAtom.id);
	  if (afObject == null)
	  {
	    return;	  
	  }
	  if (afObject.visible)
	  {
		afObject.visible = false;
	  	frameObj.hide();
	  }
	  else
	  {
	    afObject.visible = true;
	  	frameObj.show();
	  }
	  afTimer[sequenceAtom.timer].counts = frameRandomCount(frameAtom.minCount, 
	  									   					frameAtom.maxCount);
	  aftStartTimerNumber(sequenceAtom.timer);
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //     processFrameList
  //
  //	   Enter:
  //	     sequenceAtom = reference to sequence descriptor
  //       Exit:
  //	     none
  //
  ////////////////////////////////////////////////////////////////////////
  function processFrameList(sequenceAtom)
  {
	aftStopTimerNumber(sequenceAtom.timer);
	if (sequenceAtom.index >= sequenceAtom.list.length) sequenceAtom.index = 0;
		
	var frameIndex = sequenceAtom.list[sequenceAtom.index];
	var frameAtom = frameTable[frameIndex];
		
	if (frameAtom.callback != null)
	{
	  eval(frameAtom.callback);
	  return;
	}
	    
	processFrameAtom(sequenceAtom, frameAtom);
	sequenceAtom.index++;
	if (sequenceAtom.index >= sequenceAtom.list.length) sequenceAtom.index = 0;
  }
	  
  ////////////////////////////////////////////////////////////////////////
  //
  //     processSequence
  //
  ////////////////////////////////////////////////////////////////////////
  function processSequence()
  {
    var sequenceIndex;
	for (sequenceIndex = 0; sequenceIndex < sequenceTable.length; sequenceIndex++)
	{
	  if (sequenceTable[sequenceIndex].timer == timerIndex)
	  {
	    var sequenceAtom = sequenceTable[sequenceIndex];
	    processFrameList(sequenceAtom);
		return;
	  }
	}
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //     lookupSequenceName
  //
  //	   Enter:
  //	     sequenceName   = name of sequence
  //       Exit:
  //	     sequenceIndex = name index or null
  //
  ////////////////////////////////////////////////////////////////////////
  function lookupSequenceName(sequenceName)
  {
    var sequenceIndex;
	for (sequenceIndex = 0; sequenceIndex < sequenceTable.length; sequenceIndex++)
	{
	  if (sequenceTable[sequenceIndex].name == sequenceName) return sequenceIndex;
	}
	return null;
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //     startAnimationSequence
  //
  //	   Enter:
  //	     sequenceName   = name of sequence
  //       Exit:
  //	     true if successful, else false
  //
  ////////////////////////////////////////////////////////////////////////
  function startAnimationSequence(sequenceName)
  {
    var sequenceIndex = lookupSequenceName(sequenceName);
	if (sequenceIndex == null) return false;
	aftStartTimerNumber(sequenceTable[sequenceIndex].timer);
	return true;
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //     stopAnimationSequence
  //
  //	   Enter:
  //	     sequenceName   = name of sequence
  //       Exit:
  //	     none
  //
  ////////////////////////////////////////////////////////////////////////
  function stopAnimationSequence(sequenceName)
  {
    var sequenceIndex = lookupSequenceName(sequenceName);
	if (sequenceIndex == null) return;
	aftStartTimerNumber(sequenceTable[sequenceIndex].timer);
	return;
  }

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //
  //   Object Constructor.
  //
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////
  //
  //      animationFrame
  //
  //	    Enter:
  //		  aFrameId     			= element identifier
  //		  aFrameName   			= element name
  //		  aFrameType   			= object type
  //		  aFrameCallback 		= callback function
  //		  aFrameInit			= initialize function
  //		  aFrameParent			= parent container id
  //		  aFrameContentUrl		= contained content url (location)
  //		  aFrameContentLink		= content click link
  //		  aFrameVisible			= true if visible, else invisible
  //		  aFrameColor			= foreground color
  //		  aFrameBackground		= background color or 'transparent'
  //		  aFrameBackgroundUrl	= background url
  //		  aFrameX				= initial X location of frame
  //		  aFrameY				= initial Y location of frame
  //		  aFrameZ	   			= initial Z level of frame
  //		  aFrameW				= width of contained object (or frame)
  //		  aFrameH				= height of contained object (or frame)
  //		  aFrameParams			= callback relative parameter list
  //		Exit:
  //		  reference to newly created animation frame.
  //
  //////////////////////////////////////////////////////////////////////////
  function animationFrame(aFrameId, 
  		   				  aFrameName, 
						  aFrameType, 
						  aFrameCallback,
						  aFrameInit,
						  aFrameParent,
						  aFrameContentUrl,
						  aFrameContentLink,
						  aFrameVisible,
						  aFrameColor,
						  aFrameBackground,
						  aFrameBackgroundUrl,
						  aFrameX,
						  aFrameY,
						  aFrameZ,
						  aFrameW,
						  aFrameH,
						  aFrameParams)
  {
    this.descriptorType     = 'af';
	this.id   				= aFrameId;
	this.name 				= aFrameName;
	this.type 				= aFrameType;
	this.callback			= aFrameCallback;
	this.init				= aFrameInit;
	this.parent           	= aFrameParent;
    this.contentUrl			= aFrameContentUrl;
	this.contentLink		= aFrameContentLink;
	this.visible			= aFrameVisible;
	this.color				= aFrameColor;
	this.backgroundColor	= aFrameBackground;
	this.backgroundUrl		= aFrameBackgroundUrl;
	this.xInit				= aFrameX;
	this.yInit				= aFrameY;
	this.zInit				= aFrameZ;
	this.wInit				= aFrameW;
	this.hInit				= aFrameH;
	this.parameters			= new Array();
	if (aFrameParams != null)
	{
	  var pIndex = 0;
	  for (pIndex = 0; pIndex < aFrameParams.length; pIndex++)
	  {
	    this.parameters[pIndex] = aFrameParams[pIndex];
	  }
	}	

	this.x					= aFrameX;
	this.y					= aFrameY;
	this.z					= aFrameZ;
	this.w					= aFrameW;
	this.h					= aFrameH;

	this.prevX    			= aFrameX;
	this.prevY    			= aFrameY;
	this.prevZ    			= aFrameZ;
	
	this.xcenter			= 0;
	this.ycenter			= 0;
	
    this.horz 				= 0;
    this.vert 				= 0;

    this.hstep 				= 1;
    this.hcount 			= 0;

    this.vstep 				= 1;
	this.vcount 			= 0;

	this.speed 				= 1;
	this.timeout 			= 50;
	
	this.padding			= 10;

	this.t 					= 0;
	this.tStep 				= 0.001;

    this.animFrames 		= 1;
	this.wMinCount 			= 2;

    this.wFrame 			= 1;
    this.wCFrame 			= 1;

	this.contentEvent 		= null;
	this.child 				= null;
	
    this.valid 				= true;
	this.selected 			= false;
 }

  //////////////////////////////////////////////////////////////////////////
  //
  //      createAnimationFrame
  //
  //	    Enter:
  //		  aFrameId     			= element identifier
  //		  aFrameName   			= element name
  //		  aFrameType   			= object type
  //		  aFrameCallback 		= callback function
  //		  aFrameInit			= initialize function
  //		  aFrameParent			= parent container id
  //		  aFrameContentUrl		= contained content url (location)
  //		  aFrameContentLink		= content click link
  //		  aFrameVisible			= true if visible, else invisible
  //		  aFrameColor			= foreground color
  //		  aFrameBackground		= background color or 'transparent'
  //		  aFrameBackgroundUrl	= background url
  //		  aFrameX				= initial X location of frame
  //		  aFrameY				= initial Y location of frame
  //		  aFrameZ	   			= initial Z level of frame
  //		  aFrameW				= width of contained object (or frame)
  //		  aFrameH				= height of contained object (or frame)
  //		  aFrameParams			= callback relative parameter list
  //		Exit:
  //		  reference to newly created animation frame.
  //
  //////////////////////////////////////////////////////////////////////////
  function createAnimationFrame(aFrameId, 
  		   				        aFrameName, 
						  		aFrameType, 
						  		aFrameCallback,
						  		aFrameInit,
						  		aFrameParent,
						  		aFrameContentUrl,
						  		aFrameContentLink,
						  		aFrameVisible,
						  		aFrameColor,
						  		aFrameBackground,
						  		aFrameBackgroundUrl,
						  		aFrameX,
						  		aFrameY,
						  		aFrameZ,
						  		aFrameW,
						  		aFrameH,
						  		aFrameParams)
  {
    var afTableIndex = appTable.length;
    var appRef = new animationFrame(aFrameId,
  		   				            aFrameName, 
						  			aFrameType, 
						  			aFrameCallback,
						  			aFrameInit,
						  			aFrameParent,
						  			aFrameContentUrl,
						  			aFrameContentLink,
						  			aFrameVisible,
						  			aFrameColor,
						  			aFrameBackground,
						  			aFrameBackgroundUrl,
						  			aFrameX,
						  			aFrameY,
						  			aFrameZ,
						  			aFrameW,
						  			aFrameH,
						  			aFrameParams);
	if (appRef == null)
	{
	  alert('unable to allocate an animationFrame for ' + aFrameName + ' = ' + aFrameId);
	}
	appTable[appTable.length] = appRef;
	with (appTable[afTableIndex])
	{
	  if (type == 'image')
	  {
		if (cbeNewImage(name + '_fg_' + afTableIndex, contentUrl) == null)
		{
		    valid = false;
			return false;
		}
	  }
	  if (backgroundUrl != null)
	  {
		if (cbeNewImage(name + '_bg_' + afTableIndex, backgroundUrl) == null)
		{
		    valid = false;
			return false;
		}
	  }
	}
  }
  
  //////////////////////////////////////////////////////////////////////////
  //
  //     backgroundInit
  //	     Enter:
  //		   none
  //		 Exit:
  //		   none
  //
  //////////////////////////////////////////////////////////////////////////
  function backgroundInit(tableIndex)
  {
    with (appTable[tableIndex])
	{
	  var frameId = cbeGetElementById(id).cbe;
      with (frameId) 
	  {
	    hide();
        zIndex(zInit);
		z = zInit;
		background(backgroundColor,
		           backgroundUrl);
        resizeTo(wInit,
				 hInit);
		w = wInit;
		h = hInit;
        moveTo(xInit,
			   yInit);
		x = xInit;
		y = yInit;
        if (visible) show();
	  }
	}
  }
  
  //////////////////////////////////////////////////////////////////////////
  //
  //     backgroundTimeout
  //	   Enter:
  //	     sequenceAtom = reference to sequence descriptor
  //	   Exit:
  //		 none
  //
  //////////////////////////////////////////////////////////////////////////
  function backgroundTimeout(sequenceAtom)
  {
    //
	//  hide current background
	//
    var frameIndex = sequenceAtom.index;// = previousFrameIndex(sequenceAtom);
	var frameAtom = frameTable[frameIndex];

	var afObject = afGetObjectById(frameAtom.id);
    if (afObject == null)
	{
	  alert('backgroundTimeout unable to get previous animation frame for ' + sequenceAtom.name + 
	                                                                   ', ' + frameAtom.id);
	  return;
	}
	afObject.visible = false;
	
	var frameObject = cbeGetElementById(frameAtom.id).cbe;
    if (frameObject == null)
	{
	  alert('backgroundTimeout unable to get previous frame object for ' + sequenceAtom.name + 
		                                                            ', ' + frameAtom.id);
	  return;
	}
	frameObject.hide();

	//
	//  compute new background
	//
	var nextIndex = Math.round(Math.random() * (sequenceAtom.list.length - 1));
	frameIndex = sequenceAtom.list[nextIndex];
	var frameAtom = frameTable[frameIndex];

	//
	//  unhide new background
	//
	afObject = afGetObjectById(frameAtom.id);
    if (afObject == null)
	{
	  alert('backgroundTimeout unable to get animation frame for ' + sequenceAtom.name + 
		                                                      ', ' + frameAtom.id);
	  return;
	}
    afObject.visible = true;

	frameObject = cbeGetElementById(frameAtom.id).cbe;
    if (frameObject == null)
	{
	  alert('backgroundTimeout unable to get frame object for ' + sequenceAtom.name + 
	                                                       ', ' + frameAtom.id);
	  return;
  	} 
	frameObject.show();

	//
	//  save index and restart sequence timer
	//	
	afTimer[sequenceAtom.timer].counts = frameRandomCount(frameAtom.minCount, 
	  									   				  frameAtom.maxCount);
	sequenceAtom.index = nextIndex;
	if (sequenceAtom.index >= sequenceAtom.list.length) sequenceAtom.index = 0;
	aftStartTimerNumber(sequenceAtom.timer);
  }
 
  ////////////////////////////////////////////////////////////////////////
  //
  //      boxInit
  //
  ////////////////////////////////////////////////////////////////////////
  function boxInit(tableIndex)
  {
	with (appTable[tableIndex])
	{
	  var frameId = cbeGetElementById(id).cbe;
	  if (frameId == null)
	  {
	    if (afDebugAlert) alert('boxInit unable to load frame for ' + id);
		return false;
	  }
	  
      with (frameId) 
	  {
	    hide();
		
	    x = xInit;
		y = yInit;
		z = zInit;
		
		moveTo(x, y);
		zIndex(z);
		
		prevX = x;
		prevY = y;
		prevZ = z;
		
		w = wInit;
		h = hInit;
		
		resizeTo(w, h);

		color(color);
		if (backgroundUrl == null)
		{
		  background(backgroundColor);
		}
		else
		{
		  background(backgroundColor, backgroundUrl);
		}

	    if (visible) show();

		if (contentLink != null)
		{
		  contentEvent = addClickEvent(name, 
		  			   	 			   id, 
									   'afLaunchWindow()', 
									   true,
									   true);
		  if (contentEvent == null)
		  {
		    if (afDebugAlert) alert('boxInit unable to create content event for ' +
			      			  		name + ', ' + id + ', link ' + contentLink);
			return false;
		  }
		}
	  }
    }

    return true;
  }
   
