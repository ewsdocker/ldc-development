#!/bin/bash

declare    testLdcJqFile=""
declare    testLdcJqPath="."

. ~/Development/ewsldc/ldc-framework/library/scripts/usr/local/lib/ldc/bash/ldcJq.lib

# =========================================================================
#
#   readGetJsonHelp
#		read the contents of the getSongInfo help file into assoc. arrays.
#
#   Enter:
#
# =========================================================================
function testGetJsonHelp()
{
	testLdcJqFile=${1:-"${getSongHelp.json}"}
	testLdcJqPath=${2:-"."}
	testLdcJqOpts=${3:-""}

	local jqResult=1
	
	while [ true ]
	do
		ldcJqInit ${testLdcJqFile} "${testLdcJqPath}"
		[[ $? -eq 0 ]] ||
		 {
			break
		 }
		
		(( jqResult++ ))

		testLdcJqQuery="\.options[] | \"\(.var) \(.use)\""
		[[ $? -eq 0 ]] ||
		 {
			break
		 }
		
		(( jqResult++ ))

		ldcJqQuery ${testLdcJqQuery} "-r"

		[[ $? -eq 0 ]] ||
		 {
			break
		 }
		
		(( jqResult++ ))

		echo ${ldcjq_QueryResult}
		
		jqResult=0
		break
	done

    return 0
}

testGetJsonHelp "getSongHelp.json" "../../../etc/ldc-bash"

exit 0
