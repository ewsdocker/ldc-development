<html>
<head>
  <script language="javascript">
<!--Code &amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;copy;1997 Ron Coscorrosa, must include this copyright notice to use.
	function setNumber(testval) {
		document.forms[0].hidden.value=testval
	
}

function play() {
	element_num=document.forms[0].hidden.value;
	sound = "midis/" + document.forms[0].elements[element_num].options[document.forms[0].elements[element_num].selectedIndex].value
	if(navigator.appName=="Netscape") {
			type="<embed src=\"" + sound + "\" autostart='true'>" //If Netscape, use the <embed> tag
		} else {
		type="<bgsound src='" + sound + "'>"  //If not, use <bgsound> tag for MS Internet Explorer
	}
	top.invisible.document.close()  //closes invisible frame
		top.invisible.document.write(type) //writes html to frame
		top.invisible.document.close()
		document.forms[0].elements[element_num].focus();
}

function stop() {
	top.invisible.document.close()
		top.invisible.document.write("Sound Stopped")
		top.invisible.document.close()
}
//-->
</SCRIPT>
</head>
<body bgcolor=#000000 text=#FFFFFF>
<center>
  <b><font face="Times New Roman" size=+2><font color="#8080FF">J</font><font
      color="#7A7AFC">a</font><font color="#7575F8">v</font><font color="#6F6FF5">a</font><font
      color="#6A6AF1">s</font><font color="#6464EE">c</font><font color="#5F5FEA">r</font><font
      color="#5959E7">i</font><font color="#5353E4">p</font><font color="#4E4EE0">t</font><font
      color="#4848DD">

  </font><font color="#4343D9">M</font><font color="#3D3DD6">I</font><font
      color="#3838D2">D</font><font color="#3232CF">I</font><font color="#2D2DCB">
  </font><font color="#2727C8">P</font><font color="#2121C5">l</font><font
      color="#1C1CC1">a</font><font color="#1616BE">y</font><font color="#1111BA">e</font><font
      color="#0B0BB7">r</font></font></b>
  <p>
  By <a href="mailto:magazine@njcnews.org">New Jerusalem News</a>

  <p>
  <form>
    <table border=0 cellpadding=2 cellspacing=1 width=500>
      <tr bgcolor="#8080FF">
	<th align=center width=50%>Category</th>
	<th align=center width=50%>Song</th>
      </tr>
      <tr bgcolor="#7676F9">

	<td align=center>Christmas Songs</td>
	<td>
	  <select onFocus="setNumber(0)"> 
	  <option value="ocome.mid">O Come 
	  <option value="noel.mid">First Noel 
	  <option value="joy.mid">Joy to the World 
	  <option value="hark.mid">Hark the Herald 
	  <option value="silent.mid">Silent Night 
	  <option value="town.mid">O Little Town </select></td>
      </tr>
      <tr bgcolor="#6C6CF3">

	<td align=center>Response to Cross</td>
	<td>
	  <select onFocus="setNumber(1)"> 
	  <option value="thine.mid">I am thine 
	  <option value="cross.mid">At the cross 
	  <option value="myjesus.mid">My Jesus 
	  <option value="elshadai.mid">El-Shadai </select></td>
      </tr>
      <tr bgcolor="#6262ED">
	<td align=center>Select Songs</td>

	<td>
	  <select onFocus="setNumber(2)"> 
	  <option value="search.mid">Select 1 
	  <option value="select.mid">Select 2 </select></td>
      </tr>
      <tr bgcolor="#5959E7">
	<td align=center>Inspirational</td>
	<td>
	  <select onFocus="setNumber(3)"> 
	  <option value="praiprai.mid">Praise Him 
	  <option value="promises.mid">Standing on Promises
	  <option value="soldiers.mid">Onward Christian 
	  <option value="lifted.mid">He lifted me </select></td>

      </tr>
      <tr bgcolor="#4F4FE1">
	<td align=center>Faith</td>
	<td>
	  <select onFocus="setNumber(4)"> 
	  <option value="power.mid">There is Power 
	  <option value="great.mid">Then sings my soul
	  <option value="majesty.mid">Worship His majesty
	  <option value="magnify.mid">Magnify Him </select></td>
      </tr>

      <tr bgcolor="#4545DB">
	<td align=center>Commitment</td>
	<td>
	  <select onFocus="setNumber(5)"> 
	  <option value="amazing.mid">Amazing Grace 
	  <option value="fairest.mid">Fairest Lord Jesus
	  <option value="holground.mid">Holy Ground 
	  <option value="howilove.mid">How I love Jesus 
	  <option value="justas.mid">Just as I am 
	  <option value="lord.mid">He is Lord 
	  <option value="love.mid">His Love 
	  <option value="music.mid">Trumpet Sound 
	  <option value="blessed.mid">Blessed Assurance </select></td>

      </tr>
      <tr bgcolor="#3B3BD4">
	<td align=right>
	  <input type=button value="Play" onClick="play()"></td>
	<td align=left>
	  <input type=button value="Stop" onClick="stop()"></td>
      </tr>
    </table>
    <p>

    <input type=hidden value=0 name="hidden">
  </form>
</center>
<p ALIGN=Center>
<img width="580" SRC="ruleyell.gif">
<p ALIGN="Center">
<a HREF="mailto:magazine@njcnews.org?Subject=Prayer Requests, Newsgroup and Postal Address for  FREE Magazine"><img
    WIDTH="400" HEIGHT="40" SRC="freempn.gif"></a>
<p ALIGN="Center">
<small><b><a HREF="http://www.njcnews.org/">Home</a><font COLOR="Red">|</font></b></small>&nbsp;<small><b><a
    HREF="http://www.njcnews.org/latest.htm">New</a></b></small>
<font COLOR="Green"><small><b>|</b></small></font>
<b><small><a HREF="http://www.njcnews.org/salvat.htm">Salvation</a></small></b>

<b><small>|
<a HREF="http://www.njcnews.org/faith.htm">Encourage</a></small></b>
<font COLOR="Blue"><small><b>|</b></small></font>
<b><small><a HREF="http://www.njcnews.org/overcome.htm">Overcome</a></small></b>
<font COLOR="Yellow"><small><b>|</b></small></font>
<b><small><a HREF="http://www.njcnews.org/church.htm">Church</a></small></b>
<small><font COLOR="Gray"><b>|</b></font>
<b><a HREF="http://www.njcnews.org/music.htm">Song</a></b></small>
<font COLOR="Maroon"><small>|</small></font>

<b><small><a HREF="http://www.njcnews.org/audio.htm">Sermon</a></small></b>
<font COLOR="Olive"><small><b>|</b></small></font>
<b><small><a HREF="http://www.njcnews.org/video.htm">Video</a></small></b>
<font COLOR="Navy"><small><b>|</b></small></font>
<small><b><a HREF="http://www.njcnews.org/chat.htm">Chat</a></b></small>
<font COLOR="Purple"><b><small>|</small></b></font>
<b><small><a HREF="http://www.prowebserv.com/cgi-bin/indexer.cgi">Forum</a></small></b>
<font COLOR="Fuchsia"><small><b>|</b></small></font>
<b><small><a HREF="http://www.njcnews.org/links.htm">Add
Link</a></small></b>

<p ALIGN=Center>
<br>
<font color="Green"><font color="Red"><font size="-1"><font size="-1"><b>Copyright
&copy; 1997 <a href="mailto:magazine@njcnews.org?Subject=GET magazine">New
Jerusalem News </a>&nbsp;(All Rights Reserved)</b></font></font></font>.
&nbsp;<b><font color="Red"><font size="-1"><font size="-1">This homepage
and all links are copyrighted and cannot be reproduced&nbsp;in any manner
without the express written authorization of the
<a href="mailto:magazine@njcnews.org?Subject=GET magazine">Editor</a></font></font></font></b></font>
<h2>
  Thanks for Visiting!
</h2>
<p>

<br>
If you have any questions e-mail me at
<a href="mailto:magazine@njcnews.org">New Jerusalem News</a>
</body></html>