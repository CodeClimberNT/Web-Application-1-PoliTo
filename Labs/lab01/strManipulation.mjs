const stringArr = ['cat', 'dog', 'bird', 'ca', 'b', 'hello', 'world', 'spring'];

function computeString(str){
	console.log(str);

	const len = str.length
	if((typeof str !== 'string') || (len < 2))
		console.log("");

	const init = str.slice(0, 2);
	const last = str.slice(len-2, len);

	console.log(init + last);
}

function computeArr(strings){
	console.log("initialize program");
	console.log(strings);
	console.log("Starting loop");
	for(const str of stringArr){
		computeString(str);
	}
}

computeArr(stringArr);
str.length()
