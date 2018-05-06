/*
 * --- Usage ---
 * createReader( results => console.log(results) )
 * where results is an array of objects containing the fields 'longitude', 'latitude', and 'lux';
*/
function createReader(callback) {
	let input = document.getElementById('file-input'), reader = new FileReader()
	input.addEventListener('change', _ => {
		reader.onloadend = evt => {
			let
				data = evt.target.result,
				lines = data.split(/\r*\n/).filter( l => (/^(-?\d+(\.\d+\s*,\s*)?){2}\d+$/).test(l) ),
				seperator = /\s*,\s*/,
				results = []
			

			for (line in lines) {
				let columns = line.split(seperator)
				results.push({
					latitude: columns[0],
					longitude: columns[1],
					lux: columns[2],
				})
			}
			if (results.length == 0) alert('Could not read any records :(')
			else callback(results)
		}

		reader.readAsText(input.files[0])
	})
}


