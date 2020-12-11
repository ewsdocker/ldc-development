  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //
  //       Halloween.js
  //
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

      var halStoreVersion = 3;

	  var backgroundDir = '/Halloween/Backgrounds/';
	  var iconDir       = '/Halloween/Icons/';
	  var cursorDir     = '/Halloween/Icons/';
	  var bannerDir		= '/Halloween/Banners/';

  	  ////////////////////////////////////////////////////////////////////////
  	  //
  	  //     animationCreateObjects
  	  //
  	  ////////////////////////////////////////////////////////////////////////
	  function animationCreateObjects()
	  {
	    ////////////////////////////////////////////////////////////////////////
	    //
	    //           Background Image Elements
	    //
	    ////////////////////////////////////////////////////////////////////////
	    bkImageAdd('idBackground',    //  bkImageId     = background image Id
	               'background1',     //  bkName        = background image name
  				   backgroundDir + 'brck_0022.jpg',
				                      //  bkImageLocation = url of image
				   false,             //  bkTransparent = true if transparent background
				   '#898989',         //  bkColor       = background color
				   2);				  //  bkZLevel      = zlevel
/*
	    bkImageAdd('idBackground',    //  bkImageId     = background image Id
	               'background2',     //  bkName        = background image name
  				   backgroundDir + 'brck_0026.jpg',
				                      //  bkImageLocation = url of image
				   false,             //  bkTransparent = true if transparent background
				   '#898989',         //  bkColor       = background color
				   2);				  //  bkZLevel      = zlevel
*/
	    ////////////////////////////////////////////////////////////////////////
	    //
	    //           Static Image Elements
	    //
	    ////////////////////////////////////////////////////////////////////////

	    staticImageAdd('idBanner',  //  stImageName   = static image name
		               'title',     // stImageName   = static image name
  	    			   bannerDir + 'EWHalloween-01.gif',
					                // stImageURL    = url of static image.
					   null,		// stImageLink = href link
					   468,         // stImageWidth  = width of image (pixels)
					   60,          // stImageHeight = height of image (pixels)
					   10,		    // stImageZLevel = z-level
					   'n');

	    staticImageAdd('idDivider', // stImageId     = static image id name
		               'divider1',  // stImageName   = static image name
 	    			   iconDir + 'barani1-6.gif',
					                // stImageURL    = url of static image.
					   null,		// stImageLink = href link
					   532,         // stImageWidth  = width of image (pixels)
					   24,          // stImageHeight = height of image (pixels)
					   10,		    // stImageZLevel = z-level
					   'n');

	    ////////////////////////////////////////////////////////////////////////
	    //
	    //           Mover Image Animation Elements
	    //
	    ////////////////////////////////////////////////////////////////////////

	    mvImageAdd('idMover1',				// mvImageId
		           'ghost',					// mvImageName
  			       iconDir + 'Ghost.gif',	// mvImageUrl
				   15,						// mvImageZ
				   27,	   	 				// mvImageWidth
				   36,						// mvImageHeight
		           0.002);					// mvImageStep

	    mvImageAdd('idMover2',				// mvImageId
		           'pumpkin',				// mvImageName
  			       iconDir + 'Pumpkin.gif',	// mvImageUrl
				   16,						// mvImageZ
				   36,	   	 				// mvImageWidth
				   28,						// mvImageHeight
		           0.003);					// mvImageStep

	    mvImageAdd('idMover3',				// mvImageId
		           'skull',					// mvImageName
  			       iconDir + 'Skull.gif',	// mvImageUrl
				   17,						// mvImageZ
				   32,	   	 				// mvImageWidth
				   32,						// mvImageHeight
		           0.004);					// mvImageStep

	    mvImageAdd('idMover4',				// mvImageId
		           'bat',					// mvImageName
  			       iconDir + 'Bat.gif',	    // mvImageUrl
				   18,						// mvImageZ
				   56,	   	 				// mvImageWidth
				   23,						// mvImageHeight
		           0.005);					// mvImageStep

	    mvImageAdd('idMover5',				// mvImageId
		           'ghost2',				// mvImageName
  			       iconDir + 'Ghost2.gif',	// mvImageUrl
				   19,						// mvImageZ
				   50,	   	 				// mvImageWidth
				   52,						// mvImageHeight
		           0.006);					// mvImageStep

	    ////////////////////////////////////////////////////////////////////////
	    //
	    //           Random Walker Image Animation Elements
	    //
	    ////////////////////////////////////////////////////////////////////////

	    var rndwalkImageArray = new Array
		         (iconDir + '/Frank-L1.gif',
				  iconDir + '/Frank-L2.gif',
				  iconDir + '/Frank-L3.gif',
				  iconDir + '/Frank-L4.gif',
				  iconDir + '/Frank-L5.gif',
  				  iconDir + '/Frank-R1.gif',
  				  iconDir + '/Frank-R2.gif',
  				  iconDir + '/Frank-R3.gif',
  				  iconDir + '/Frank-R4.gif',
  				  iconDir + '/Frank-R5.gif');

        rndwalkAdd(rndwalkImageArray,  //  Array with image url's
		                 'idRndWalk',  //  Random walk id
		                     'frank',  //  wName      = walk name
						          25,  //  wZLevel
			                       8,  //  wHorizStep = horizontal spacing of steps
   			                       6,  //  wVertStep  = vertical spacing of steps
				                 100,  //  wWidth     = width of image
				                 100,  //  wHeight    = height of image
           Math.round(Math.random()),  //  wHorzInit  = horizontal direction (0 or 1)
		   Math.round(Math.random()),  //  wVertInit  = vertical direction (0 or 1)
				                  10); //  wPadding   = screen border width

	    ////////////////////////////////////////////////////////////////////////
	    //
	    //           Static Content Elements
	    //
	    ////////////////////////////////////////////////////////////////////////

	    stContentAdd('idCopyright',    //  static content id
					 'idApplication',  //  container id
	                 'copyright',      //  name
					 false,            //  relative to container
				     '',               //  content background url
				     "#898989",        //  background color
				     true,             //  transparent
					 "#0000ff", 	   //  color
					 30,		       //  z-level
				     25,               //  width
				     5,                //  height
					 's');			   //  location parameter

	    ////////////////////////////////////////////////////////////////////////

		boxAdd('idLeftColumn', 			//  box id
			   'idApplication',			//  container id
  			   'leftcolumn',			//  name
  			   0,						//  left edge of box (x)
			   0,						//  top edge of box (y)
  			   30,						//	z-level
			   180,						//  width of box (in pixels)
			   400,						//  height of box (in pixels)
  			   false,					//  true if relative to container, else absolute
  			   '',						//	background url
  			   "#000000",				//	background color
			   true,					//	background is transparent
			   "#ff0000");				//  color

		boxAdd('idRightColumn', 		//  box id
			   'idApplication',			//  container id
  			   'rightcolumn',			//  name
  			   200,						//  left edge of box (x)
			   0,						//  top edge of box (y)
  			   30,						//	z-level
			   150,						//  width of box (in pixels)
			   300,						//  height of box (in pixels)
  			   false,					//  true if relative to container, else absolute
  			   '',						//	background url
  			   "#000000",				//	background color
			   true,					//	background is transparent
			   "#ff0000");				//  color

		boxAdd('idMiddleColumn', 		//  box id
			   'idApplication',			//  container id
  			   'middlecolumn',			//  name
  			   185,						//  left edge of box (x)
			   0,						//  top edge of box (y)
  			   30,						//	z-level
			   500,						//  width of box (in pixels)
			   200,						//  height of box (in pixels)
  			   false,					//  true if relative to container, else absolute
  			   '',						//	background url
  			   "#000000",				//	background color
			   true,					//	background is transparent
			   "#ff0000");				//  color

		boxAdd('idContent', 			//  box id
			   'idMiddleColumn',		//  container id
  			   'content',   			//  name
  			   185,						//  left edge of box (x)
			   0,						//  top edge of box (y)
  			   30,						//	z-level
			   500,						//  width of box (in pixels)
			   200,						//  height of box (in pixels)
  			   false,					//  true if relative to container, else absolute
  			   '',						//	background url
  			   "#000000",				//	background color
			   true,					//	background is transparent
			   "#ff0000");				//  color

	    ////////////////////////////////////////////////////////////////////////

/*
  		mouseFollower('idFollower',		//  mfolImageId
					   'mfollower',     //  mfolName
					   iconDir + 'witchicon.gif',
					   32,              //  mfolImageWidth
				   	   32,              //  mfolHeight
					   10,              //  mfolPersistence
				       10,              //  mfolPadding
					   45);             //  mfolZLevel

	    ////////////////////////////////////////////////////////////////////////

		var mtrailArray = new Array(iconDir + 'witchicon.gif',
		                            iconDir + 'witchicon.gif',
								    iconDir + 'witchicon.gif',
								    iconDir + 'witchicon.gif',
						 		    iconDir + 'witchicon.gif');

  		mouseTrail('idTrail',		//  mtrailImageId
				   'mousetrail',    //  mtrailName
  		           mtrailArray,		//  mtrailArray
				   'mfollower',     //  mtrailFollower
				   32,              //  mtrailImageWidth
				   32,              //  mtrailHeight
				   35);             //  mtrailZ
*/
	    ////////////////////////////////////////////////////////////////////////

		enableMouse();

//		mouseFollowerSelect('mfollower');

	  }

	  function postInitialization()
	  {
	    appMove('idApplication', 0, 80, 1, 0);

	    stMoveImage('idBanner', 0, 10, 10, 1);

		boxMove('idLeftColumn', 0, 100, 30, 1);
		boxMove('idRightColumn', app.width() - 200, 100, 30, 0);

		var leftRef = cbeGetElementById('idLeftColumn').cbe;
		var rightRef = cbeGetElementById('idRightColumn').cbe;		
		var bannerRef = cbeGetElementById('idBanner').cbe;
		var dividerRef = cbeGetElementById('idDivider').cbe;
		
		var x = leftRef.left() + leftRef.width();
		var y = bannerRef.top() + bannerRef.height();
		
		stMoveImage('idDivider', 0, y, 30, 10);

		y = dividerRef.top() + dividerRef.height();
		
		var w = rightRef.left() - x;
		var h = app.height() - y;

		boxResize('idMiddleColumn', w, h);
		boxMove('idMiddleColumn', x, y, 30, 0);

		boxMove('idContent', 5, 0, 30, 0);
		boxResize('idContent', w - 10, h);
		
  		rwlkSpeed = 2;
	  }
