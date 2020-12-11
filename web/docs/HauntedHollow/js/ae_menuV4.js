  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //
  //       Menus
  //
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  var mbMenu = new Array();
  var meMenu = new Array();
  var mcMenu = new Array();
  
  var showingMenu = false;
  var menuBarDisplayed = false;
  var activeMenuButton = 0;
  var activeMenu = 0;
  
  //////////////////////////////////////////////////////////////////////////
  //
  //    menuElement
  //
  //	   Enter:
  //	     meId          = id name
  //         meName        = menu name
  //		 meZ           = z-coordinate
  //		 meTransparent = background transparent (if true)
  //
  //////////////////////////////////////////////////////////////////////////
  function menuElement(meId, meName, meZ, meTransparent)
  {
    this.id = meId;
	this.name = meName;
	this.transparent = meTransparent;
	this.visible = false;
	this.selected = false;
	
	this.x = 'n';
	this.y = 'rel';
	this.z = meZ;
	
	this.width = 0;
	this.height = 0;
  }
  
  //////////////////////////////////////////////////////////////////////////
  //
  //     menuCreate
  //
  //	   Enter:
  //	     meId          = id name
  //         meName        = menu name
  //		 meTransparent = background transparent (if true)
  //		 meZ           = z-coordinate
  //         meLocation    = relative location, or meId.left()
  //		 meY           = meId.top()
  //       Exit:
  //         true if successful
  //		 false if unsuccessful
  //
  //////////////////////////////////////////////////////////////////////////
  function menuCreate(meId,
				      meName,
				   	  meTransparent,
					  meZ,
				   	  meLocation,
				   	  meY)
  {
      var meMenuRef = new menuElement(meId, meName, meZ, meTransparent);
	  if (arguments.length == 4)
	  {
	    meMenuRef.y = 'rel';
		meMenuRef.x = meLocation;
	  }
	  else
	  {
	    meMenuRef.y = meY;
		meMenuRef.x = meLocation;
	  }

	  meMenu[meMenu.length] = meMenuRef;
  }
  
  //////////////////////////////////////////////////////////////////////////
  //
  //    meMenuFind
  //
  //////////////////////////////////////////////////////////////////////////
  function meMenuFind(menuName)
  {
      if (meMenu.length == 0) return meMenu.length;
	  for (var i=0; i < meMenu.length; i++)
	  {
	    if (meMenu[i].name == menuName) return i;
	  }
	  return meMenu.length;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //    menuButtonElement
  //
  //////////////////////////////////////////////////////////////////////////
  function menuButtonElement(meMenuName, meMenuIndex, staticRef, mcId, contentRef)
  {
    this.menuName = meMenuName;
	this.menuIndex = meMenuIndex;
	this.staticRef = staticRef;
	this.mouseOver = false;

	this.mcId = mcId;
	this.contentRef = contentRef;

	this.bkUrl = '';
	this.bkColor = '#ffffff';
	this.bkTransparent = false;

	this.width = 0;
	this.height = 0;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //     menuAdd
  //
  //	   Enter:
  //	     mbId         = id name
  //         mbName       = menu name
  //		 mbButton	  = array containing trailer images
  //         mbButtonOver = mouseFollower to attach trail to
  //		 mbWidth	  = width
  //		 mbHeight     = height
  //  		 mcId         = menu content id
  //  		 mcBkUrl      = background url
  //  		 mcBkColor    = background color
  //  		 mcBkTrans    = transparent
  //  		 mcWidth      = width
  //  		 mcHeight     = height
  //       Exit:
  //         true if successful
  //		 false if unsuccessful
  //
  //////////////////////////////////////////////////////////////////////////
  function menuAdd(meMenuName,
                   mbId,
				   mbName,
				   mbButton,
				   mbButtonOver,
				   mbWidth,
				   mbHeight,
				   mcId,
				   mcBkUrl,
				   mcBkColor,
				   mcBkTrans,
				   mcWidth,
				   mcHeight)
  {
    if (meMenu.length == 0) menuCreate('idMenu',meMenuName,true,5,'n');
	meMenuIndex = meMenuFind(meMenuName);
	if (meMenuIndex == meMenu.length) return;
	
    if (! staticImageAdd(mbId,
                         mbName,
					     mbButton,
					     mbWidth,
					     mbHeight,
						 120,
						 0,
						 meMenu[meMenuIndex].y)) return false;

    if (! stContentAdd(mcId,                 // content id
	                   mbId, 				 // container id
	                   mbName + '_body',	 // name
					   false, 				 // relative
					   mcBkUrl,				 // background url
					   mcBkColor,			 // background color
					   mcBkTrans,			 // background transparent
					   mcBkColor,			 // color
					   120,					 // z
					   0, //mcWidth,		 // width
					   0, //mcHeight,		 // height
					   0, 					 // left
					   0)) return false;	 // top

    var mbMenuRef = new menuButtonElement(meMenuName, 
	                                      meMenuIndex, 
										  stImage[stImage.length - 1],
										  mcId,
										  stContent[stContent.length - 1]);

    if (mbMenu.length == 0)
	{
	  addModule('menu', meMenu, 'menuInit()', 'menuReset()');
	}

    mbMenu[mbMenu.length] = mbMenuRef;
	
	if (cbeNewImage(mbName + '_over', mbButtonOver) == null) return false;
    
	cbeGetElementById(mbMenuRef.staticRef.id).cbe.hide();
	cbeGetElementById(mbMenuRef.contentRef.id).cbe.hide();

	if (mbHeight > meMenu[meMenuIndex].height) meMenu[meMenuIndex].height = mbHeight;
	meMenu[meMenuIndex].width += mbWidth + 1;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //       menuReset
  //
  //////////////////////////////////////////////////////////////////////////
  function menuReset()
  {
    if (meMenu.length == 0) return;
	meMenu.length = 0;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //    menuInit
  //
  //////////////////////////////////////////////////////////////////////////
  function menuInit()
  {
    if ((meMenu.length == 0) || (mbMenu.length == 0)) return;

    var meMenuRef;
	for (var menuIndex = 0; menuIndex < meMenu.length; menuIndex++)
	{
	  with (meMenu[menuIndex])
	  {
	    meMenuRef = cbeGetElementById(id).cbe;
		if (meMenuRef == null) alert('null  meMenuRef');


		if (selected && visible) meMenuRef.hide();
		else meMenuRef.show();

	    meMenuRef.resizeTo(width-1, height);

	    if (y == 'rel')
	    {
	      meMenuRef.moveTo(x);
	    }
	    else
	    {
	      meMenuRef.moveTo(x, y);
	    }
	  }
	  
	  menuBarDisplayed = true;
	  
	  var xOffset = 0;
	  for (var menuItemIndex = 0; menuItemIndex < mbMenu.length; ++menuItemIndex)
	  {
		if (mbMenu[menuItemIndex].menuName == meMenu[menuIndex].name)
		{
	      with (mbMenu[menuItemIndex])
	      {
		    var buttonRef = cbeGetElementById(staticRef.id).cbe;
			buttonRef.moveTo(xOffset, 0);
			
			var menuBodyRef = cbeGetElementById(mcId).cbe;
			menuBodyRef.moveTo(meMenuRef.pageX() + xOffset, 
			                   meMenuRef.pageY() + meMenu[meMenuIndex].height);
			menuBodyRef.zIndex = contentRef.aeZ;
			menuBodyRef.hide();
			xOffset += staticRef.aeWidth + 1;
		    buttonRef.show();
		  }
 		}
      }
    }
	
	activeMenuItem = mbMenu.length;
	menuBarDisplayed = true;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //    menuMouseChangeButton
  //
  //////////////////////////////////////////////////////////////////////////
  function menuMouseChangeButton(menuItem, buttonNameRef)
  {
	var menuObj = cbeGetElementById(mbMenu[menuItem].staticRef.id).cbe;
	var menuButton = cbeGetElementById(buttonNameRef).src
	menuObj.background(menuObj.background(), menuButton);
  }
  
  //////////////////////////////////////////////////////////////////////////
  //
  //    mbMenuFind
  //
  //////////////////////////////////////////////////////////////////////////
  function mbMenuFind(id)
  {
      if (mbMenu.length == 0) return 0;

	  for (var i=0; i < mbMenu.length; i++)
	  {
	    if ((mbMenu[i].staticRef.id == id) ||
		    ((mbMenu[i].contentRef.id == id) && (activeMenuItem = i)) ) return i;
	  }
	  return mbMenu.length;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //    menuMouseOverButton
  //
  //////////////////////////////////////////////////////////////////////////
  function menuMouseOverButton(leftPoint, topPoint)
  {
    var meX;
	var meY;
	
    for (var mIndex = 0; mIndex < mbMenu.length; mIndex++)
	{
	    var menuObj = cbeGetElementById(mbMenu[mIndex].staticRef.id).cbe;
        with (menuObj)
		{
		  meX = pageX(); meY = pageY();
	      if ( (leftPoint >= meX) &&  (leftPoint < (meX + width())) &&
		       (topPoint  >= meY) &&  (topPoint  < (meY + height())) ) return mIndex;
		}
	}

	return mbMenu.length;
  }
  
  //////////////////////////////////////////////////////////////////////////
  //
  //    menuMouseOverItem
  //
  //////////////////////////////////////////////////////////////////////////
  function menuMouseOverMenu(leftPoint, topPoint)
  {
    var meX;
	var meY;
	
    for (var mIndex = 0; mIndex < mbMenu.length; mIndex++)
	{
	    menuObj = cbeGetElementById(mbMenu[mIndex].contentRef.id).cbe;
		with (menuObj)
		{
		  meX = pageX(); meY = pageY();
	      if ( (leftPoint >= meX) && (leftPoint < (meX + width())) &&
		       (topPoint  >= meY) && (topPoint  < (meY + height())) ) return mIndex;
		}
	}

	return mbMenu.length;
  }
  
  //////////////////////////////////////////////////////////////////////////
  //
  //    menuMouseOver
  //
  //////////////////////////////////////////////////////////////////////////
  function menuMouseOver(event)
  {
	var mIndex = menuMouseOverButton(event.pageX, event.pageY);
	if (mIndex == activeMenuButton) return;

	if (activeMenuButton < mbMenu.length) 
	  menuMouseChangeButton(activeMenuButton, 
	                        mbMenu[activeMenuButton].staticRef.name);

	if (mIndex == mbMenu.length)
	{
	  activeMenuButton = mbMenu.length;
	  return;
	}

	menuMouseChangeButton(mIndex, mbMenu[mIndex].staticRef.name + '_over');
	activeMenuButton = mIndex;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //    menuShow
  //
  //////////////////////////////////////////////////////////////////////////
  function menuShow(mIndex)
  {
    activeMenu = mIndex;
    cbeGetElementById(mbMenu[activeMenu].contentRef.id).cbe.show();
	showingMenu = true;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //    menuHide
  //
  //////////////////////////////////////////////////////////////////////////
  function menuHide()
  {
	cbeGetElementById(mbMenu[activeMenu].contentRef.id).cbe.hide();

	activeMenu = mbMenu.length;
	showingMenu = false;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //    menuMouseClick
  //
  //////////////////////////////////////////////////////////////////////////
  function menuMouseClick(event)
  {
	var mIndex = menuMouseOverButton(event.pageX, event.pageY);
	if (mIndex == mbMenu.length)
	{
	  if (showingMenu)
	  {
	    var cIndex = menuMouseOverMenu(event.pageX, event.pageY);
	    if (cIndex == mbMenu.length) menuHide();
	  }
	  return;
	}

    if (showingMenu)
	{
	  var menuItem = activeMenu;
	  menuHide();
	  if (menuItem == activeMenuButton) return;
	}
	menuShow(mIndex);
  }

  
