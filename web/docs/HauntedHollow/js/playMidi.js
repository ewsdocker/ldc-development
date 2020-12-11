<SCRIPT LANGUAGE=JavaScript>
<!--
/* This JavaScript was composed by Kristin J. Johnson.
*The Wererat's Lair: http://wererat.net/ */
var nummidi = 4
day = new Date();
seed = day.getTime();
ran = parseInt(((seed - (parseInt(seed/1000,10) * 1000))/10)/100*nummidi + 1,10);


if (ran == (1)){
midi=("sounds/yourmidi1.mid")
title=("Midi 1")
leng=33
}

if (ran == (2)){
midi=("sounds/yourmidi2.mid")
title=("Midi 2")
leng=151
}

if (ran == (3)){
midi=("sounds/yourmidi3.mid")
title=("Midi 3")
leng=63
}

if (ran == (4)){
midi=("sounds/yourmidi4.mid")
title=("Midi 4")
leng=46
}

document.write("<META HTTP-EQUIV=REFRESH CONTENT='" + leng + "; URL=midiplayer.htm'>");
document.write("<EMBED SRC='"+ midi +"' AUTOSTART='true' LOOP='true' VOLUME=75 WIDTH=16 HEIGHT=16> <BR> ");
document.write("<FONT SIZE=-1>" + title + "</FONT> ");
//-->
</SCRIPT>

<FORM>
<INPUT TYPE="reset" VALUE="My Midi Player" ONCLICK="window.open('midiplayer.htm','Midis','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0,copyhistory=0,width=200,height=25')">
</FORM>

