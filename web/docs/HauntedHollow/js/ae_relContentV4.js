  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //
  //   Relative Object Constructor.
  //
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  var relContent = new Array();

  //////////////////////////////////////////////////////////////////////////
  //
  //      relativeElement
  //
  //	    Enter:
  //		  relId     = element container identifier
  //		  relName   = element name
  //		  relType   = object type
  //		  relParent = parent (container) id
  //		  relObject = object to place element relative to
  //		Exit:
  //		  reference to newly created element.
  //
  //////////////////////////////////////////////////////////////////////////
  function relativeElement(relId, 
  		   				   relName, 
						   relType, 
						   relParent, 
						   relObject)
  {
	this.id       = relId;
	this.name     = relName;
	this.type     = relType;
	this.parentId = relParent;
	this.object   = relObject;
	this.doctype  = 'none';
	
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.w = 1;
	this.h = 1;
	
	this.left = 0;
	this.top = 0;
	this.width    = 1;
	this.height   = 1;

	this.halign = 'left';
	this.valign = 'top';
	
	this.padding = 0;
	
	this.position = 1;  //  0 = unassigned, 1 = document, 2 = container, 3 = object
	
	this.bkcolor = '#ffffff';
	this.bktransparent = true;
	this.bkname = '';
	
	this.color = '#0000ff';

	this.visible = true;
    this.valid = true;
	this.selected = false;
  }

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //
  //   Build relative static content object.
  //
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////
  //
  //   Relative static content add parameters
  //
  //     Enter:
  //	 	   relId            = content id
  //		   relParent		= container id
  //		   relName     	    = name
  //		   relDocType       = 'document', 'container', 'object'
  //		   relObject        = relative object id
  //		   relLeft 	  	    = x location (number or string containing function)
  //		   relTop      	  	= y location (number or string containing function)
  //		   relZ		      	= z-level
  //		   relWidth    	  	= width of box
  //		   relHeight   	  	= height of box
  //		   relBkUrl         = background url
  //		   relBkColor       = background color
  //		   relColor    	  	= color
  //    Exit:
  //           valid = false if error
  //
  //////////////////////////////////////////////////////////////////////////
  function relContentAdd(relId,
  		   				 relParent,
                         relName,
						 relDocType,
						 relObject,
						 relLeft,
						 relTop,
						 relZ,
						 relWidth,
						 relHeight,
					     relBkUrl,
						 relBkColor,
						 relColor)
  {
    var relRef = new relativeElement(relId, 
			   	 	 				 relName, 
									 'relContent', 
									 relParent,
									 relObject);
	var relIndex = relContent.length;
	with (relRef)
	{
	  doctype = relDocType;

	  left = relLeft;
	  top = relTop;
	  z = relZ;
	  width = relWidth;
	  height = relHeight;

	  if (relBkUrl != '')
	  {
	    if (cbeNewImage(relName, relBkUrl) == null) return relIndex;
	  }
	  
	  bkcolor = relBkColor;
	  color = relColor;
	}
	
    if (relContent.length == 0)
	{
	  addModule('relContent', relContent, 'relContentInit()', 'relContentReset()');
	}

	relContent[relContent.length] = relRef;
	return relIndex;
  }

  //////////////////////////////////////////////////////////////////////////
  //
  //       relContentReset
  //
  //////////////////////////////////////////////////////////////////////////
  function relContentReset()
  {
    if (relContent.length == 0) return;
	relContent.length = 0;
  }

  ////////////////////////////////////////////////////////////////////////
  //
  //      relContentInit
  //
  ////////////////////////////////////////////////////////////////////////
  function relComputePosition(object)
  {
    with (object)
	{
	  if ((! left) || (! top)) return false;
  	  if (typeof(left) != 'string') 
	  {
	    x = left;
		xtype = 1;
	  }
	  else
	  {
	    switch(left.toLowerCase())
		{
		  case 'left':
		    xtype = 2;
		    break;
			
		  case 'center':
		    xtype = 2;
		    break;
			
		  case 'right':
		    xtype = 2;
		    break;
			
		  default:	   	// not left, right or center
		    var regExp = /(\d+)\%/;
			if (regExp.exec(left.toLowerCase()))
			{
			  x = $1;
		      xtype = 3;
			  break;
			}
			xtype = 4;
		}
	  }
	}
	return true;
  }
  
  ////////////////////////////////////////////////////////////////////////
  //
  //      relContentInit
  //
  ////////////////////////////////////////////////////////////////////////
  function relContentInit()
  {
    if (relContent.length == 0) return;

	for (var relIndex = 0; relIndex < relContent.length; ++relIndex)
	{
	  with (relContent[relIndex])
	  {
		var obj = cbeGetElementById(id).cbe;
		var objParent = cbeGetElementById(parentId).cbe;
		
   	    obj.zIndex(aeZ);

		if ((aeWidth > 0) && (aeHeight > 0))
		{
		  var pWidth;
		  var pHeight;
		  
		  if (parentRel)
		  {
		    pWidth  = (aeWidth  * objParent.width())  / 100;
		    pHeight = (aeHeight * objParent.height()) / 100;
		  }
		  else
		  {
		    pWidth  = (aeWidth  * app.width())  / 100;
		    pHeight = (aeHeight * app.height()) / 100;
		  }

		  obj.resizeTo(pWidth, pHeight);
		}
		
		if (aePosition == 'relative')
		{
		  obj.moveTo(aeLocation, aePadding, false);
		}
		else
		{
		  var pX;
		  var pY;
		  
		  if (parentRel)
		  {
		    pX  = (aeX
			  * objParent.width())  / 100;
		    pY = (aeY * objParent.height()) / 100;
		  }
		  else
		  {
		    pX = (aeX * app.width()) / 100;
		    pY = (aeY * app.height()) / 100;
		  }
		  
		  obj.moveTo(pX, pY);
		}

		if (! bktransparent)
		{
		  obj.background(bkcolor);
			
		  var bkImage = cbeGetElementById(name);
		  if (bkImage != null)
		  {
	  		var imgUrl = bkImage.src;
			obj.background(obj.background(), imgUrl);
		  }
		}
		
  		obj.color(color);

	    obj.show();
	    visible = true;
      }
    }
  }

