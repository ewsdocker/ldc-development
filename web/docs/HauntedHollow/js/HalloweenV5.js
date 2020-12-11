  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //
  //       Halloween.js
  //
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

      var afVersionRequired = 5;

	  var backgroundDir = 'HauntedHollow/Backgrounds/';
	  var iconDir       = 'HauntedHollow/Icons/';
	  var cursorDir     = 'HauntedHollow/Icons/';
	  var bannerDir		= 'HauntedHollow/Banners/';
	  var affiliateDir  = 'HauntedHollow/AffiliateBanners/';

  	  ////////////////////////////////////////////////////////////////////////
  	  //
  	  //     animationCreateObjects
  	  //
  	  ////////////////////////////////////////////////////////////////////////
	  function animationCreateObjects()
	  {
	    var afFrameList = new Array();
		var afParams = new Array();

        if (animationVersion == null)
		{
	  	  alert('af not loaded');
	    }
	
		if (animationVersion != afVersionRequired)
		{
	      alert('wrong af loaded: ' + animationVersion);
	    }

	    ////////////////////////////////////////////////////////////////////////

	    var storeURL = window.location.href.split("?").pop();

	    ////////////////////////////////////////////////////////////////////////
	    //
	    //           Background Image Elements
	    //
	    ////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idBackground1',                  // aFrameId
					   		 'background1',				   	   // aFrameName
					   		 'background',				   	   // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'backgroundInit(tableIndex)',     // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,						   	   // aFrameContentUrl
					   		 null,						   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 backgroundDir + 'Forest.jpg', 	   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 0,							   	   // aFrameZ
					   		 app.width(),				   	   // aFrameW
					   		 app.height(),				   	   // aFrameH
					   		 null);						   	   // aFrameParams

		afFrameList[afFrameList.length] = createFrameAtom('backgroundFrame1',
		 			  	   		 		  			  	  'idBackground1',
						   	     					  	  20,
						   	     					  	  50,
							     					  	  'backgroundTimeout(sequenceAtom)');
/*
		createAnimationFrame('idBackground2',                  // aFrameId
					   		 'background2',				   	   // aFrameName
					   		 'background',				   	   // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'backgroundInit(tableIndex)',     // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,						   	   // aFrameContentUrl
					   		 null,						   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 backgroundDir + 'Nite2.gif', 	   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 0,							   	   // aFrameZ
					   		 app.width(),				   	   // aFrameW
					   		 app.height(),				   	   // aFrameH
					   		 null);						   	   // aFrameParams

		afFrameList[afFrameList.length] = createFrameAtom('backgroundFrame2',
		 			  	   		 		  			  	  'idBackground2',
						   	     					  	  30,
						   	     					  	  60,
							     					  	  'backgroundTimeout(sequenceAtom)');
*/
		createSequence('backgroundSequence', afFrameList, 1);

		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////
		//
		//         Create a new content frame
		//
		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////
        
		/////////////////////////////////////////////////////////////////////////////
		//
		//    Copyright Block
		//
		//      Create a new animation frame
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idContainer1',                   // aFrameId
					   		 'copyrightBlock', 			   	   // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'boxInit(tableIndex)',            // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 storeURL,		   	   		       // aFrameContentLink
					   		 true,						   	   // aFrameVisible
					   		 '#0000ff',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 50,						   	   // aFrameZ
					   		 250,				   	   		   // aFrameW
					   		 30,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idCopyright',                    // aFrameId
					   		 'copyright', 				   	   // aFrameName
					   		 'content',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'contentInit(tableIndex)',        // aFrameInit
					   		 'idContainer1',				   // aFrameParent
					   		 null,      	   				   // aFrameContentUrl
					   		 storeURL,	  	     		       // aFrameContentLink
					   		 true,						   	   // aFrameVisible
					   		 '#866F86',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 51,						   	   // aFrameZ
					   		 200,				   	   		   // aFrameW
					   		 25,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////
		//
		//         Create a new image animation sequence
		//
		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////////////////
		//
		//    Title Banner Block
		//
		//      Create a new animation frame
		//
		/////////////////////////////////////////////////////////////////////////////
		afFrameList.length = 0;
		
		createAnimationFrame('idBox1',                      // aFrameId
					   		 'title',  				   	       // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'boxInit(tableIndex)',            // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 true,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 10,						   	   // aFrameZ
					   		 468,				   	   		   // aFrameW
					   		 60,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idImage1',                     // aFrameId
					   		 'banner', 				   	       // aFrameName
					   		 'image',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'imageInit(tableIndex)',          // aFrameInit
					   		 'idBox1',				   	   // aFrameParent
					   		 bannerDir + 'HauntedHollow-0.gif',  // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 true,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 10,						   	   // aFrameZ
					   		 468,				   	   		   // aFrameW
					   		 60,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////
		//
		//         Create a 3 image animation sequence
		//
		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////////////////
		//
		//    Castle Block
		//
		//      Create a new animation frame
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idBox2',                      // aFrameId
					   		 'castle', 				   	       // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'boxInit(tableIndex)',            // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 10,						   	   // aFrameZ
					   		 200,				   	   		   // aFrameW
					   		 226,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idImage2',                     // aFrameId
					   		 'castle', 				   	       // aFrameName
					   		 'image',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'imageInit(tableIndex)',          // aFrameInit
					   		 'idBox2',				   	   // aFrameParent
					   		 iconDir + 'Castle.gif',  		   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 10,						   	   // aFrameZ
					   		 200,				   	   		   // aFrameW
					   		 226,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////////////////
		//
		//    Enter Block
		//
		//      Create a new animation frame
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idBox3',                      // aFrameId
					   		 'enterBlock', 			   	       // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'boxInit(tableIndex)',            // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 11,						   	   // aFrameZ
					   		 159,				   	   		   // aFrameW
					   		 21,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idImage3',                     // aFrameId
					   		 'enter', 				   	       // aFrameName
					   		 'image',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'imageInit(tableIndex)',          // aFrameInit
					   		 'idBox3',				   	   // aFrameParent
					   		 iconDir + 'ClickToEnter.gif',     // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 11,						   	   // aFrameZ
					   		 159,				   	   		   // aFrameW
					   		 21,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////////////////
		//
		//    Dare Block
		//
		//      Create a new animation frame
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idBox4',                      // aFrameId
					   		 'dareBlock', 			   	       // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'boxInit(tableIndex)',            // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 11,						   	   // aFrameZ
					   		 125,				   	   		   // aFrameW
					   		 19,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idImage4',                     // aFrameId
					   		 'dare', 				   	       // aFrameName
					   		 'image',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'imageInit(tableIndex)',          // aFrameInit
					   		 'idBox4',				   	   // aFrameParent
					   		 bannerDir + 'IfYouDare.gif',      // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 12,						   	   // aFrameZ
					   		 125,				   	   		   // aFrameW
					   		 19,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//    Build frame list and add to animation sequencer
		//
		/////////////////////////////////////////////////////////////////////////////

		afFrameList[afFrameList.length] = createFrameAtom('contentFrame1',
		 			  	   		 		  			  	  'idBox2',
						   	     					  	  6,
						   	     					  	  10,
							     					  	  null);

		afFrameList[afFrameList.length] = createFrameAtom('contentFrame2',
		 			  	   		 		  			  	  'idBox3',
						   	     					  	  3,
						   	     					  	  5,
							     					  	  null);

		afFrameList[afFrameList.length] = createFrameAtom('contentFrame3',
		 			  	   		 		  			  	  'idBox4',
						   	     					  	  16,
						   	     					  	  30,
							     					  	  null);

		afFrameList[afFrameList.length] = createFrameAtom('contentFrame1',
		 			  	   		 		  			  	  'idBox2',
						   	     					  	  1,
						   	     					  	  2,
							     					  	  null);

		afFrameList[afFrameList.length] = createFrameAtom('contentFrame3',
		 			  	   		 		  			  	  'idBox4',
						   	     					  	  1,
						   	     					  	  2,
							     					  	  null);

		afFrameList[afFrameList.length] = createFrameAtom('contentFrame2',
		 			  	   		 		  			  	  'idBox3',
						   	     					  	  6,
						   	     					  	  20,
							     					  	  null);

		createSequence('staticSequence1', afFrameList, frameRandomCount(16, 30));

		/////////////////////////////////////////////////////////////////////////////
		//
		//    Scorpius Block
		//
		//      Create a new animation frame
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idBanner',                       // aFrameId
					   		 'requiredBanner',		   	       // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'boxInit(tableIndex)',            // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 null,				   	   		   // aFrameContentLink
					   		 true,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 99,						   	   // aFrameZ
					   		 468,				   	   		   // aFrameW
					   		 60,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////////////////
		//
		//    Quote Block
		//
		//      Create a new animation frame
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idBox5',                      // aFrameId
					   		 'quoteBlock', 			   	       // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'boxInit(tableIndex)',            // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 true,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 10,						   	   // aFrameZ
					   		 336,				   	   		   // aFrameW
					   		 37,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idImage5',                       // aFrameId
					   		 'quote', 				   	       // aFrameName
					   		 'image',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'imageInit(tableIndex)',          // aFrameInit
					   		 'idBox5',  				   	   // aFrameParent
					   		 bannerDir + 'Quote.gif',      	   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 10,						   	   // aFrameZ
					   		 336,				   	   		   // aFrameW
					   		 37,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////////////////
		//
		//    Eyes1 Block
		//
		//      Create a new animation frame
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idBox6',                         // aFrameId
					   		 'eyes1Block', 			   	       // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'boxInit(tableIndex)',            // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 15,						   	   // aFrameZ
					   		 55,				   	   		   // aFrameW
					   		 60,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idImage6',                       // aFrameId
					   		 'eyes1', 				   	       // aFrameName
					   		 'image',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'imageInit(tableIndex)',          // aFrameInit
					   		 'idBox6',  				   	   // aFrameParent
					   		 iconDir + 'SpookyEyes1.gif',  	   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 15,						   	   // aFrameZ
					   		 55,				   	   		   // aFrameW
					   		 60,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		afFrameList.length = 0;
		afFrameList[afFrameList.length] = createFrameAtom('contentFrame3',
		 			  	   		 		  			  	  'idBox6',
						   	     					  	  8,
						   	     					  	  16,
							     					  	  null);

		createSequence('staticSequence2', afFrameList, frameRandomCount(8, 16));

		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////////////////
		//
		//    Eyes2 Block
		//
		//      Create a new animation frame
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idBox7',                         // aFrameId
					   		 'eyes2Block', 			   	       // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'boxInit(tableIndex)',            // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 15,						   	   // aFrameZ
					   		 55,				   	   		   // aFrameW
					   		 60,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idImage7',                       // aFrameId
					   		 'eyes2', 				   	       // aFrameName
					   		 'image',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'imageInit(tableIndex)',          // aFrameInit
					   		 'idBox7',  				   	   // aFrameParent
					   		 iconDir + 'SpookyEyes1.gif',  	   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 15,						   	   // aFrameZ
					   		 55,				   	   		   // aFrameW
					   		 60,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		afFrameList.length = 0;
		afFrameList[afFrameList.length] = createFrameAtom('contentFrame4',
		 			  	   		 		  			  	  'idBox7',
						   	     					  	  4,
						   	     					  	  12,
							     					  	  null);

		createSequence('staticSequence3', afFrameList, frameRandomCount(4, 12));

		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////////////////
		//
		//    Eyes3 Block
		//
		//      Create a new animation frame
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idBox8',                         // aFrameId
					   		 'eyes3Block', 			   	       // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'boxInit(tableIndex)',            // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 15,						   	   // aFrameZ
					   		 55,				   	   		   // aFrameW
					   		 60,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idImage8',                       // aFrameId
					   		 'eyes3', 				   	       // aFrameName
					   		 'image',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'imageInit(tableIndex)',          // aFrameInit
					   		 'idBox8',  				   	   // aFrameParent
					   		 iconDir + 'SpookyEyes1.gif',  	   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 15,						   	   // aFrameZ
					   		 55,				   	   		   // aFrameW
					   		 60,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		afFrameList.length = 0;
		afFrameList[afFrameList.length] = createFrameAtom('contentFrame5',
		 			  	   		 		  			  	  'idBox8',
						   	     					  	  6,
						   	     					  	  14,
							     					  	  null);

		createSequence('staticSequence4', afFrameList, frameRandomCount(6, 14));

		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////
		//
		//      Sprites
		//
		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////////////////////
		//
		//    ghost Block
		//
		//      Create a new animation frame
		//
		/////////////////////////////////////////////////////////////////////////////
		afParams.length = 0;
		afParams[afParams.length] = 0.008;
		
		createAnimationFrame('idSprite1',                      // aFrameId
					   		 'ghostBlock', 			   	       // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'spriteInit(tableIndex)',         // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 20,						   	   // aFrameZ
					   		 27,				   	   		   // aFrameW
					   		 36,				   	   		   // aFrameH
					   		 afParams);					   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idSpriteImage1',                 // aFrameId
					   		 'ghost', 				   	       // aFrameName
					   		 'image',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'imageInit(tableIndex)',          // aFrameInit
					   		 'idSprite1',				   	   // aFrameParent
					   		 iconDir + 'Ghost.gif',      	   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 20,						   	   // aFrameZ
					   		 27,				   	   		   // aFrameW
					   		 36,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		afFrameList.length = 0;
		afFrameList[afFrameList.length] = createFrameAtom('spriteFrame1',
		 			  	   		 		  			  	  'idSprite1',
						   	     					  	  2,
						   	     					  	  0,
							     					  	  'spriteMove(sequenceAtom, frameAtom)');

		createSequence('spriteSequence1', afFrameList, 2);

		/////////////////////////////////////////////////////////////////////////////
		//
		//    Pumpkin Block
		//
		//      Create a new animation frame
		//
		/////////////////////////////////////////////////////////////////////////////
		afParams.length = 0;
		afParams[afParams.length] = 0.004;
		
		createAnimationFrame('idSprite2',                      // aFrameId
					   		 'pumpkinBlock', 			   	   // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'spriteInit(tableIndex)',         // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 21,						   	   // aFrameZ
					   		 36,				   	   		   // aFrameW
					   		 28,				   	   		   // aFrameH
					   		 afParams);					   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idSpriteImage2',                 // aFrameId
					   		 'ghost', 				   	       // aFrameName
					   		 'image',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'imageInit(tableIndex)',          // aFrameInit
					   		 'idSprite2',				   	   // aFrameParent
					   		 iconDir + 'Pumpkin.gif',      	   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 21,						   	   // aFrameZ
					   		 36,				   	   		   // aFrameW
					   		 28,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		afFrameList.length = 0;
		afFrameList[afFrameList.length] = createFrameAtom('spriteFrame2',
		 			  	   		 		  			  	  'idSprite2',
						   	     					  	  2,
						   	     					  	  0,
							     					  	  'spriteMove(sequenceAtom, frameAtom)');

		createSequence('spriteSequence2', afFrameList, 2);

		/////////////////////////////////////////////////////////////////////////////
		//
		//    Skull Block
		//
		//      Create a new animation frame
		//
		/////////////////////////////////////////////////////////////////////////////
		afParams.length = 0;
		afParams[afParams.length] = 0.002;
		
		createAnimationFrame('idSprite3',                      // aFrameId
					   		 'skullBlock',  			   	   // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'spriteInit(tableIndex)',         // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 22,						   	   // aFrameZ
					   		 32,				   	   		   // aFrameW
					   		 32,				   	   		   // aFrameH
					   		 afParams);					   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idSpriteImage3',                 // aFrameId
					   		 'skull', 				   	       // aFrameName
					   		 'image',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'imageInit(tableIndex)',          // aFrameInit
					   		 'idSprite3',				   	   // aFrameParent
					   		 iconDir + 'Skull.gif',      	   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 22,						   	   // aFrameZ
					   		 32,				   	   		   // aFrameW
					   		 32,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		afFrameList.length = 0;
		afFrameList[afFrameList.length] = createFrameAtom('spriteFrame3',
		 			  	   		 		  			  	  'idSprite3',
						   	     					  	  2,
						   	     					  	  0,
							     					  	  'spriteMove(sequenceAtom, frameAtom)');

		createSequence('spriteSequence3', afFrameList, 2);

		/////////////////////////////////////////////////////////////////////////////
		//
		//    Skull Block
		//
		//      Create a new animation frame
		//
		/////////////////////////////////////////////////////////////////////////////
		afParams.length = 0;
		afParams[afParams.length] = 0.003;
		
		createAnimationFrame('idSprite4',                      // aFrameId
					   		 'batBlock',  			   	   // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'spriteInit(tableIndex)',         // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 23,						   	   // aFrameZ
					   		 56,				   	   		   // aFrameW
					   		 23,				   	   		   // aFrameH
					   		 afParams);					   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idSpriteImage4',                 // aFrameId
					   		 'bat', 				   	       // aFrameName
					   		 'image',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'imageInit(tableIndex)',          // aFrameInit
					   		 'idSprite4',				   	   // aFrameParent
					   		 iconDir + 'Bat.gif',      	   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 23,						   	   // aFrameZ
					   		 56,				   	   		   // aFrameW
					   		 23,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		afFrameList.length = 0;
		afFrameList[afFrameList.length] = createFrameAtom('spriteFrame4',
		 			  	   		 		  			  	  'idSprite4',
						   	     					  	  2,
						   	     					  	  0,
							     					  	  'spriteMove(sequenceAtom, frameAtom)');

		createSequence('spriteSequence4', afFrameList, 2);

		/////////////////////////////////////////////////////////////////////////////
		//
		//    Ghoul Block
		//
		//      Create a new animation frame
		//
		/////////////////////////////////////////////////////////////////////////////
		afParams.length = 0;
		afParams[afParams.length] = 0.005;
		
		createAnimationFrame('idSprite5',                      // aFrameId
					   		 'ghoulBlock',  			   	   // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'spriteInit(tableIndex)',         // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 24,						   	   // aFrameZ
					   		 50,				   	   		   // aFrameW
					   		 52,				   	   		   // aFrameH
					   		 afParams);					   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idSpriteImage5',                 // aFrameId
					   		 'ghoul', 				   	       // aFrameName
					   		 'image',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'imageInit(tableIndex)',          // aFrameInit
					   		 'idSprite5',				   	   // aFrameParent
					   		 iconDir + 'Ghost2.gif',      	   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 24,						   	   // aFrameZ
					   		 50,				   	   		   // aFrameW
					   		 52,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		afFrameList.length = 0;
		afFrameList[afFrameList.length] = createFrameAtom('spriteFrame5',
		 			  	   		 		  			  	  'idSprite5',
						   	     					  	  2,
						   	     					  	  0,
							     					  	  'spriteMove(sequenceAtom, frameAtom)');

		createSequence('spriteSequence5', afFrameList, 2);

		/////////////////////////////////////////////////////////////////////////////
		//
		//    Ghoul Block
		//
		//      Create a new animation frame
		//
		/////////////////////////////////////////////////////////////////////////////
		afParams.length = 0;
		afParams[afParams.length] = 0.0035;
		
		createAnimationFrame('idSprite6',                      // aFrameId
					   		 'eyesBlock',  			   	   // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'spriteInit(tableIndex)',         // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 25,						   	   // aFrameZ
					   		 29,				   	   		   // aFrameW
					   		 14,				   	   		   // aFrameH
					   		 afParams);					   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idSpriteImage6',                 // aFrameId
					   		 'eyes', 				   	       // aFrameName
					   		 'image',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'imageInit(tableIndex)',          // aFrameInit
					   		 'idSprite6',				   	   // aFrameParent
					   		 iconDir + 'eyes01.gif',      	   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 25,						   	   // aFrameZ
					   		 29,				   	   		   // aFrameW
					   		 14,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		afFrameList.length = 0;
		afFrameList[afFrameList.length] = createFrameAtom('spriteFrame6',
		 			  	   		 		  			  	  'idSprite6',
						   	     					  	  3,
						   	     					  	  0,
							     					  	  'spriteMove(sequenceAtom, frameAtom)');

		createSequence('spriteSequence6', afFrameList, 3);

	    ////////////////////////////////////////////////////////////////////////
	    //
	    //           Random Walker Image Animation Elements
	    //
	    ////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////
		//
		//    Frank Block
		//
		//      Create a new animation frame
		//
		/////////////////////////////////////////////////////////////////////////////
		afParams.length = 0;
	    afParams = new Array
			       (8,  						//  wHorizStep = horizontal spacing of steps
   			        6,  			   	 		//  wVertStep  = vertical spacing of steps
           			Math.round(Math.random()),  //  wHorzInit  = horizontal direction (0 or 1)
		   			Math.round(Math.random()),  //  wVertInit  = vertical direction (0 or 1)
				    10,  						//  wPadding   = screen border padding
				    iconDir + '/Frank-L1.gif',
				    iconDir + '/Frank-L2.gif',
				    iconDir + '/Frank-L3.gif',
				    iconDir + '/Frank-L4.gif',
				    iconDir + '/Frank-L5.gif',
  				    iconDir + '/Frank-R1.gif',
  				    iconDir + '/Frank-R2.gif',
  				    iconDir + '/Frank-R3.gif',
  				    iconDir + '/Frank-R4.gif',
  				    iconDir + '/Frank-R5.gif');

		createAnimationFrame('idRndWalk',                      // aFrameId
					   		 'rwalk1Block',  			   	   // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'rndWalkerInit(tableIndex)',      // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 30,						   	   // aFrameZ
					   		 100,				   	   		   // aFrameW
					   		 100,				   	   		   // aFrameH
					   		 afParams);					   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idWalkerImage1',                 // aFrameId
					   		 'frank', 				   	       // aFrameName
					   		 'image',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'imageInit(tableIndex)',          // aFrameInit
					   		 'idRndWalk',				   	   // aFrameParent
					   		 iconDir + 'Frank-L1.gif',         // aFrameContentUrl
					   		 storeURL,				   	   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 30,						   	   // aFrameZ
					   		 100,				   	   		   // aFrameW
					   		 100,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		afFrameList.length = 0;
		afFrameList[afFrameList.length] = createFrameAtom('walkerFrame1',
		 			  	   		 		  			  	  'idRndWalk',
						   	     					  	  8,
						   	     					  	  0,
							     					  	  'rndWalkMove(sequenceAtom, frameAtom)');

		createSequence('walkerSequence1', afFrameList, 4);

		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////
		//
		//    MouseFollower Block
		//
		//      Create a new animation frame
		//
		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idFollower1',                    // aFrameId
					   		 'follower1Block',  		   	   // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'followerInit(tableIndex)',       // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 null,				   	   		   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 71,						   	   // aFrameZ
					   		 32,				   	   		   // aFrameW
					   		 32,				   	   		   // aFrameH
					   		 null);					   	   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idFollowerImage1',               // aFrameId
					   		 'follower1', 			   	       // aFrameName
					   		 'image',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'imageInit(tableIndex)',          // aFrameInit
					   		 'idFollower1',				   	   // aFrameParent
					   		 iconDir + 'witchicon.gif',        // aFrameContentUrl
					   		 null,				   	   		   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 71,						   	   // aFrameZ
					   		 32,				   	   		   // aFrameW
					   		 32,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////
		//
		//    Mouse Follower Image 2
		//
		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idFollower2',                    // aFrameId
					   		 'follower2Block',  		   	   // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'followerInit(tableIndex)',       // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 null,				   	   		   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 72,						   	   // aFrameZ
					   		 32,				   	   		   // aFrameW
					   		 32,				   	   		   // aFrameH
					   		 null);					   	   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idFollowerImage2',               // aFrameId
					   		 'follower2', 			   	       // aFrameName
					   		 'image',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'imageInit(tableIndex)',          // aFrameInit
					   		 'idFollower2',				   	   // aFrameParent
					   		 iconDir + 'witchicon.gif',        // aFrameContentUrl
					   		 null,				   	   		   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 72,						   	   // aFrameZ
					   		 32,				   	   		   // aFrameW
					   		 32,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////
		//
		//    Mouse Follower Image 3
		//
		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idFollower3',                    // aFrameId
					   		 'follower3Block',  		   	   // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'followerInit(tableIndex)',       // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 null,				   	   		   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 73,						   	   // aFrameZ
					   		 32,				   	   		   // aFrameW
					   		 32,				   	   		   // aFrameH
					   		 null);					   	   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idFollowerImage3',               // aFrameId
					   		 'follower3', 			   	       // aFrameName
					   		 'image',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'imageInit(tableIndex)',          // aFrameInit
					   		 'idFollower3',				   	   // aFrameParent
					   		 iconDir + 'witchicon.gif',        // aFrameContentUrl
					   		 null,				   	   		   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 73,						   	   // aFrameZ
					   		 32,				   	   		   // aFrameW
					   		 32,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////
		//
		//    Mouse Follower Image 4
		//
		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idFollower4',                    // aFrameId
					   		 'follower4Block',  		   	   // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'followerInit(tableIndex)',       // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 null,				   	   		   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 74,						   	   // aFrameZ
					   		 32,				   	   		   // aFrameW
					   		 32,				   	   		   // aFrameH
					   		 null);					   	   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idFollowerImage4',               // aFrameId
					   		 'follower4', 			   	       // aFrameName
					   		 'image',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'imageInit(tableIndex)',          // aFrameInit
					   		 'idFollower4',				   	   // aFrameParent
					   		 iconDir + 'witchicon.gif',        // aFrameContentUrl
					   		 null,				   	   		   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 74,						   	   // aFrameZ
					   		 32,				   	   		   // aFrameW
					   		 32,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////
		//
		//    Mouse Follower Image 5
		//
		/////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idFollower5',                    // aFrameId
					   		 'follower5Block',  		   	   // aFrameName
					   		 'static',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'followerInit(tableIndex)',       // aFrameInit
					   		 'idApplication',			   	   // aFrameParent
					   		 null,  						   // aFrameContentUrl
					   		 null,				   	   		   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 75,						   	   // aFrameZ
					   		 32,				   	   		   // aFrameW
					   		 32,				   	   		   // aFrameH
					   		 null);					   	   	   // aFrameParams

		/////////////////////////////////////////////////////////////////////////////
		//
		//      Now add a new animation image block
		//
		/////////////////////////////////////////////////////////////////////////////
		createAnimationFrame('idFollowerImage5',               // aFrameId
					   		 'follower5', 			   	       // aFrameName
					   		 'image',				   	       // aFrameType
					   		 null,						   	   // aFrameCallback
					   		 'imageInit(tableIndex)',          // aFrameInit
					   		 'idFollower5',				   	   // aFrameParent
					   		 iconDir + 'witchicon.gif',        // aFrameContentUrl
					   		 null,				   	   		   // aFrameContentLink
					   		 false,						   	   // aFrameVisible
					   		 '#000000',					   	   // aFrameColor
					   		 'transparent',				   	   // aFrameBackground
					   		 null, 	   						   // aFrameBackgroundUrl
					   		 0,			   				   	   // aFrameX
					   		 0,							   	   // aFrameY
					   		 75,						   	   // aFrameZ
					   		 32,				   	   		   // aFrameW
					   		 32,				   	   		   // aFrameH
					   		 null);						   	   // aFrameParams

		afFrameList.length = 0;
		afFrameList[afFrameList.length] = createFrameAtom('followerFrame1',
		 			  	   		 		  			  	  'idFollower1',
						   	     					  	  5,
						   	     					  	  0,
							     					  	  'mouseFollowerMove(sequenceAtom, frameAtom)');
		afFrameList[afFrameList.length] = createFrameAtom('followerFrame2',
		 			  	   		 		  			  	  'idFollower2',
						   	     					  	  5,
						   	     					  	  0,
							     					  	  'mouseFollowerMove(sequenceAtom, frameAtom)');
		afFrameList[afFrameList.length] = createFrameAtom('followerFrame3',
		 			  	   		 		  			  	  'idFollower3',
						   	     					  	  5,
						   	     					  	  0,
							     					  	  'mouseFollowerMove(sequenceAtom, frameAtom)');
		afFrameList[afFrameList.length] = createFrameAtom('followerFrame4',
		 			  	   		 		  			  	  'idFollower4',
						   	     					  	  5,
						   	     					  	  0,
							     					  	  'mouseFollowerMove(sequenceAtom, frameAtom)');
		afFrameList[afFrameList.length] = createFrameAtom('followerFrame5',
		 			  	   		 		  			  	  'idFollower5',
						   	     					  	  5,
						   	     					  	  0,
							     					  	  'mouseFollowerMove(sequenceAtom, frameAtom)');

		createSequence('followerSequence1', afFrameList, 1);

	    ////////////////////////////////////////////////////////////////////////
	    ////////////////////////////////////////////////////////////////////////
		//
		//    Mouse trails
		//
	    ////////////////////////////////////////////////////////////////////////
	    ////////////////////////////////////////////////////////////////////////

/*
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

	  //////////////////////////////////////////////////////////////////////////
	  //////////////////////////////////////////////////////////////////////////
	  //
	  //     postInitialization
	  //
	  //////////////////////////////////////////////////////////////////////////
	  //////////////////////////////////////////////////////////////////////////
	  function postInitialization()
	  {
	    appMove(0,   // appX
				0,   // appY
				1);  // appZ
				
		startAnimationSequence('backgroundSequence');

	    ////////////////////////////////////////////////////////////////////////
		//
		//    Copyright Content Block
		//
	    ////////////////////////////////////////////////////////////////////////
		var copyblockRef = cbeGetElementById('idContainer1').cbe;
		var copyrightRef = cbeGetElementById('idCopyright').cbe;
		
		afResizeObject(copyblockRef,
					   250,
					   30);
	    afMoveObject(copyblockRef,
					 Math.round((app.width() - copyblockRef.width())/2),
					 app.height() - copyblockRef.height() - (copyblockRef.height()/2) - 10,
					 50,
					 false);
					   
		afResizeObject(copyrightRef,
					   200,
					   25);
	    afMoveObject(copyrightRef,
					 Math.round((copyblockRef.width() - copyrightRef.width())/2),
					 Math.round((copyblockRef.height() - copyrightRef.height())/2),
					 51,
					 false);

	    ////////////////////////////////////////////////////////////////////////
		//
		//    Banner
		//
	    ////////////////////////////////////////////////////////////////////////
		var bannerRef = cbeGetElementById('idBanner').cbe;

	    afMoveObject(bannerRef,
					 Math.round((app.width() - bannerRef.width())/2),
					 0,
					 1,
					 false);
					 
	    ////////////////////////////////////////////////////////////////////////
		//
		//    HauntedHollow Banner
		//
	    ////////////////////////////////////////////////////////////////////////
		var hauntedRef = cbeGetElementById('idBox1').cbe;

	    afMoveObject(hauntedRef,
					 Math.round((app.width() - hauntedRef.width())/2),
					 Math.round(bannerRef.height() + 5),
					 1,
					 false);

	    ////////////////////////////////////////////////////////////////////////
		//
		//    Castle block
		//
	    ////////////////////////////////////////////////////////////////////////
		var castleRef = cbeGetElementById('idBox2').cbe;

	    afMoveObject(castleRef,
					 Math.round((app.width() - castleRef.width())/2),
					 Math.round((app.height() - castleRef.height())/2),
					 1,
					 false);

	    ////////////////////////////////////////////////////////////////////////
		//
		//    ClickToEnter Banner
		//
	    ////////////////////////////////////////////////////////////////////////
		var clickRef = cbeGetElementById('idBox3').cbe;

	    afMoveObject(clickRef,
					 Math.round((app.width() - clickRef.width())/2),
					 Math.round(castleRef.top() - clickRef.height() - 2),
					 11,
					 false);

	    ////////////////////////////////////////////////////////////////////////
		//
		//    IfYouDare Banner
		//
	    ////////////////////////////////////////////////////////////////////////
		var dareRef = cbeGetElementById('idBox4').cbe;

	    afMoveObject(dareRef,
					 Math.round((app.width() - dareRef.width())/2),
					 Math.round(castleRef.top() + castleRef.height() + 2),
					 11,
					 false);

		startAnimationSequence('staticSequence1');

	    ////////////////////////////////////////////////////////////////////////
		//
		//    Eyes1 Block
		//
	    ////////////////////////////////////////////////////////////////////////
		var eyesRef = cbeGetElementById('idBox6').cbe;
		
	    afMoveObject(eyesRef,
					 Math.round(app.width()/6 - eyesRef.width()/2),
					 Math.round(app.height()/4 - eyesRef.height()/2),
					 15,
					 false);

		startAnimationSequence('staticSequence2');

	    ////////////////////////////////////////////////////////////////////////
		//
		//    Eyes2 Block
		//
	    ////////////////////////////////////////////////////////////////////////
		eyesRef = cbeGetElementById('idBox7').cbe;
		
	    afMoveObject(eyesRef,
					 Math.round(app.width()/4 - eyesRef.width()),
					 Math.round(app.height()/6 - eyesRef.height()),
					 15,
					 false);

		startAnimationSequence('staticSequence3');

	    ////////////////////////////////////////////////////////////////////////
		//
		//    Eyes1 Block
		//
	    ////////////////////////////////////////////////////////////////////////
		eyesRef = cbeGetElementById('idBox8').cbe;
		
	    afMoveObject(eyesRef,
					 Math.round(3 * app.width()/4 - eyesRef.width()/2),
					 Math.round(app.height()/4 - eyesRef.height()/2),
					 15,
					 false);

		startAnimationSequence('staticSequence4');

	    ////////////////////////////////////////////////////////////////////////
		//
		//    Quote Block
		//
	    ////////////////////////////////////////////////////////////////////////
		var quoteRef = cbeGetElementById('idBox5').cbe;
		var dareBottom = dareRef.top() + dareRef.height();
		var center = Math.round(dareBottom + (copyblockRef.top() - dareBottom)/2);
		var quoteTop = Math.round(center - quoteRef.height()/2);

	    afMoveObject(quoteRef,
					 Math.round((app.width() - quoteRef.width())/2),
					 quoteTop,
					 11,
					 false);

	    ////////////////////////////////////////////////////////////////////////
		//
		//    Sprites
		//
	    ////////////////////////////////////////////////////////////////////////
		startAnimationSequence('spriteSequence1');
		startAnimationSequence('spriteSequence2');
		startAnimationSequence('spriteSequence3');
		startAnimationSequence('spriteSequence4');
		startAnimationSequence('spriteSequence5');
		startAnimationSequence('spriteSequence6');

	    ////////////////////////////////////////////////////////////////////////
		//
		//    RandomWalker
		//
	    ////////////////////////////////////////////////////////////////////////
		startAnimationSequence('walkerSequence1');

	    ////////////////////////////////////////////////////////////////////////
		//
		//    MouseFollower
		//
	    ////////////////////////////////////////////////////////////////////////
		startAnimationSequence('followerSequence1');
/*		
	    ////////////////////////////////////////////////////////////////////////
		//
		//    Advertisement 1
		//
	    ////////////////////////////////////////////////////////////////////////

		var adRef = cbeGetElementById('idAdvert1').cbe;
		
	    stMoveImage('idAdvert1',
					5,
					app.height() - adRef.height() - 15,
					18,
					0);

	    ////////////////////////////////////////////////////////////////////////
		//
		//    Start ad image sequence timer
		//
	    ////////////////////////////////////////////////////////////////////////
		frameIndex = createFrame('ad1Frame',
		 			  	   		 'idAdvert1',
								 'staticImage',
						   	     15,
						   	     30,
							     null);
		ad1Table[ad1Table.length] = frameIndex;
		createSequence('ad1Sequence', ad1Table, frameRandomCount(15, 30));

	    ////////////////////////////////////////////////////////////////////////
		//
		//    Eyes1
		//
	    ////////////////////////////////////////////////////////////////////////
		var eyesRef = cbeGetElementById('idBox6').cbe;
		
	    stMoveImage('idBox6',
					app.width()/6 - eyesRef.width()/2,
					app.height()/4 - eyesRef.height()/2,
					18, 
					0);

	    ////////////////////////////////////////////////////////////////////////
		//
		//    Start Eyes1 image sequence timer
		//
	    ////////////////////////////////////////////////////////////////////////
		frameIndex = createFrame('eye1Frame',
		 			  	   		 'idBox6',
								 'staticImage',
						   	     10,
						   	     20,
							     null);
		eye1Table[eye1Table.length] = frameIndex;
		createSequence('eye1Sequence', eye1Table, frameRandomCount(10, 20));

	    ////////////////////////////////////////////////////////////////////////
		//
		//    Eyes2
		//
	    ////////////////////////////////////////////////////////////////////////
		eyesRef = cbeGetElementById('idBox7').cbe;
		
	    stMoveImage('idBox7',
					app.width()/4 - eyesRef.width(),
					app.height()/6 - eyesRef.height(),
					18, 
					0);

		////////////////////////////////////////////////////////////////////////
		//
		//    Start Eyes2 image sequence timer
		//
	    ////////////////////////////////////////////////////////////////////////
		eye2Table.length = 0;
		frameIndex = createFrame('eye2Frame',
		 			  	   		 'idBox7',
								 'staticImage',
						   	     8,
						   	     16,
							     null);
		eye2Table[eye2Table.length] = frameIndex;
		createSequence('eye2Sequence', eye2Table, frameRandomCount(8, 16));

	    ////////////////////////////////////////////////////////////////////////
		//
		//    Eyes3
		//
	    ////////////////////////////////////////////////////////////////////////
		eyesRef = cbeGetElementById('idBox8').cbe;
		
	    stMoveImage('idBox8',
					Math.round(3 * app.width()/4 - eyesRef.width()/2),
					Math.round(app.height()/4 - eyesRef.height()/2),
					18,
					0);

		////////////////////////////////////////////////////////////////////////
		//
		//    Start Eyes3 image sequence timer
		//
	    ////////////////////////////////////////////////////////////////////////
		frameIndex = createFrame('eye3Frame',
		 			  	   		 'idBox8',
								 'staticImage',
						   	     10,
						   	     20,
							     null);
		eye3Table[eye3Table.length] = frameIndex;
		createSequence('eye3Sequence', eye3Table, frameRandomCount(10, 20));

	    ////////////////////////////////////////////////////////////////////////
		//
		//    RandomEyes
		//
	    ////////////////////////////////////////////////////////////////////////
		eyesRef = cbeGetElementById('idBox9').cbe;
		
	    stMoveImage('idBox9',
					Math.round(5 * app.width()/6 - eyesRef.width()/2),
					Math.round(app.height()/6 - eyesRef.height()/2),
					20,
					0);
*/
	  }

