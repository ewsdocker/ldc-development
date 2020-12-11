  var sequenceTable = new Array();
  var frameTable = new Array();

  ////////////////////////////////////////////////////////////////////////
  //
  //     frameElement
  //
  //	   Enter:
  //	     frameName      = name of frame
  //		 frameId    	= id of object to be controlled
  //		 frameModule    = name of module id belongs to
  //		 frameMin       = how long to show frame (minimum) - tenths of sec
  //		 frameMax       = how long to show frame (maximum) - tenths of sec
  //		 frameTimer		= timer to use to control frame's timing
  //		 frameCallback  = optional callback to process this frame
  //
  ////////////////////////////////////////////////////////////////////////
  function frameElement(frameName,
	 			  	    frameId,
						frameModule,
					    frameMin,
					    frameMax,
					    frameCallback)
  {
    this.name = frameName;
	this.id = frameId;
	this.module = frameModule;
	this.minCount = frameMin;
	this.maxCount = frameMax;
	this.callback = frameCallback;
  }
	  
  ////////////////////////////////////////////////////////////////////////
  //
  //     createFrame
  //
  //	   Enter:
  //	     frameName      = name of frame
  //		 frameId        = id of object to be controlled
  //		 frameModule    = name of module id belongs to
  //		 frameMin       = how long to show frame (minimum) - tenths of sec
  //		 frameMax       = how long to show frame (maximum) - tenths of sec
  //		 frameCallback  = optional callback to process this frame
  //
  ////////////////////////////////////////////////////////////////////////
  function createFrame(frameName,
	 			  	   frameId,
					   frameModule,
					   frameMin,
					   frameMax,
					   frameCallback)
  {
    var frameIndex = frameTable.length;
    frameTable[frameTable.length] = new frameElement(frameName,
								  			   	     frameId,
												     frameModule,
											   	     frameMin,
											   	     frameMax,
											   	     frameCallback);
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
    this.name = sequenceName;
	this.list = frameList;
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
	sequenceAtom.timer = aetNewTimer(sequenceName,
					  				 'processSequence()',
									 initialTimeout,
									 true);
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
  //     processFrame
  //
  //	   Enter:
  //	     frameRef   = reference to frame descriptor
  //
  ////////////////////////////////////////////////////////////////////////
  function processFrame(sequenceAtom, frameAtom)
  {
	  var frameObj = cbeGetElementById(frameAtom.id).cbe;
	  var aeObject = aeObjectLookup(frameAtom.id, frameAtom.module);
	  if (aeObject.visible)
	  {
		aeObject.visible = false;
	  	frameObj.hide();
	  }
	  else
	  {
	    aeObject.visible = true;
	  	frameObj.show();
	  }
	  aeTimer[sequenceAtom.timer].counts = frameRandomCount(frameAtom.minCount, 
	  									   					frameAtom.maxCount);
	  aetStartTimerNumber(sequenceAtom.timer);
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
	aetStopTimerNumber(sequenceAtom.timer);
	if (sequenceAtom.index >= sequenceAtom.list.length) sequenceAtom.index = 0;
		
	var frameIndex = sequenceAtom.list[sequenceAtom.index];
	var frameAtom = frameTable[frameIndex];
		
	with (frameAtom)
	{
	  if (callback != null)
	  {
		eval(callback);
		return;
	  }
	    
	  processFrame(sequenceAtom, frameAtom);
	}
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

