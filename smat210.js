//Global variables
let login = false;
let username = "";
let password = "";




function main(){
	getVersionID();
	
	}

function navigation(){
	document.getElementById("Navigation")
}
function home(){
	document.getElementById("home").style.display = "block";
	document.getElementById("news").style.display = "none";
	document.getElementById("items").style.display = "none";
	document.getElementById("htmlcomments").style.display = "none";
	document.getElementById("shop").style.display = "none";
	document.getElementById("regform").style.display = "none";
	//document.getElementById("getsearch").style.display = "none";

}
function getVersionID(){
	let data = null;

	let xhr = new XMLHttpRequest();

	xhr.open("GET", "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/version");
	xhr.setRequestHeader("accept", "application/json");

	xhr.onload = () => {
		const version_d = document.getElementById("version");
		version_d.innerHTML = xhr.responseText;
	}

	xhr.send(data);
}


function getNews(){
	let data = null;
	let xhr = new XMLHttpRequest();

	xhr.open("GET", "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/news");
	xhr.setRequestHeader("accept", "application/json");
	
	document.getElementById("home").style.display = "none";
	document.getElementById("news").style.display = "block";
	document.getElementById("items").style.display = "none";
	document.getElementById("htmlcomments").style.display = "none";
	document.getElementById("shop").style.display = "none";
	document.getElementById("regform").style.display = "none";
	//document.getElementById("getsearch").style.display = "none";


	xhr.onload = () => {
		let parseToJSON = JSON.parse(xhr.responseText);
		let descriptionfield = "";
		let news = "";
		for(i=0; i<parseToJSON.length;i++){
			let desc = `<p> ${parseToJSON[i].descriptionField} </p>`;
			let img = `<img style="width: 500px;" src=${parseToJSON[i].enclosureField.urlField} />`;
			let heading= `<h2> ${parseToJSON[i].titleField} </h2>`;
			let pubdate = `<p> ${parseToJSON[i].pubDateField}</p>`;
			console.log(desc)

			news += pubdate + heading + img + desc + "<br>";
		}
		news += "<br>"
		const version_d = document.getElementById("news");
		version_d.innerHTML = news;
	}

	xhr.send(null);

}

function getItems(){
	let data = null;

	let xhr = new XMLHttpRequest();

	xhr.open("GET", "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/items");
	xhr.setRequestHeader("accept", "application/json");

	document.getElementById("home").style.display = "none";
	document.getElementById("news").style.display = "none";
	document.getElementById("items").style.display = "block";
	document.getElementById("htmlcomments").style.display = "none";
	document.getElementById("shop").style.display = "none";
	document.getElementById("regform").style.display = "none";
	//document.getElementById("getsearch").style.display = "block";
	xhr.onload = () => {
		let parseJson = JSON.parse(xhr.responseText)
		const contentshtml = document.getElementById("contents");
		let tempString = "";
		let itemID = "";
		for (i=0; i<parseJson.length; i++){
			itemID = parseJson[i].ItemId;
			let imgLink = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/itemimg?id=";
			imgLink +=itemID;
			tempString += `<h2> ${parseJson[i].Title} </h2> <img src=${imgLink}> <p> ${parseJson[i].Description} </p>`;
		}
		contentshtml.innerHTML = tempString;
		
	}
	xhr.send(data);
}

function getHtmlcomments(){

	document.getElementById("home").style.display = "none";
	document.getElementById("news").style.display = "none";
	document.getElementById("items").style.display = "none";
	document.getElementById("htmlcomments").style.display = "block";
	document.getElementById("shop").style.display = "none";
	document.getElementById("regform").style.display = "none";
	//document.getElementById("getsearch").style.display = "none";

	let x = document.getElementById("com");
	x.src = x.src;
}

function postComment(){
	
	let authorname = document.getElementById("author").value;
	

	let xhr = new XMLHttpRequest();
	let uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/comment?name=" + authorname;
	xhr.open("POST", uri, true);
	xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");

	let data = document.getElementById("postcomment").value;
	
	xhr.onload = () => {
		let x = document.getElementById("com");
		x.src = x.src;
	}
	
	xhr.send(JSON.stringify(data));

	
		
}

function getSearch(){
	let data = "";

	let xhr = new XMLHttpRequest();
	let uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/search?term=" + document.getElementById("Searchbar").value;

	xhr.open("GET", uri);
	xhr.setRequestHeader("accept", "application/json");

	xhr.onload = () => {
		let parseJson = JSON.parse(xhr.responseText)
		const contentshtml = document.getElementById("contents");
		let tempString = "";
		let itemID = "";
		for (i=0; i<parseJson.length; i++){
			itemID = parseJson[i].ItemId;
			let imgLink = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/itemimg?id=";
			imgLink +=itemID;
			tempString += `<h2> ${parseJson[i].Title} </h2> <img src=${imgLink}> <p> ${parseJson[i].Description} </p>`;
		}
		contentshtml.innerHTML = tempString;
	}


	xhr.send(data);

}


function getShop(){

	let data = null;
	let xhr = new XMLHttpRequest();
	
	xhr.open("GET", "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/shop?term=");
	xhr.setRequestHeader("accept", "application/json");

	
	document.getElementById("home").style.display = "none";
	document.getElementById("news").style.display = "none";
	document.getElementById("items").style.display = "none";
	document.getElementById("htmlcomments").style.display = "none";
	document.getElementById("shop").style.display = "block";
	document.getElementById("regform").style.display = "none";

	xhr.onload = () => {

		let parseJson = JSON.parse(xhr.responseText)
		const contentshtml = document.getElementById("shopcontent");
		let tempStr = "";
		let imgID = "";
		for (i=0; i<parseJson.length; i++){
			imgID = parseJson[i].ItemId;
			let shopLink = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/shopimg?id=" + imgID;
			let buttonLink = "http://redsox.uoa.auckland.ac.nz/mss/Service.svc/buy?id=" + imgID; 
			 
			
			tempStr += `<h2> ${parseJson[i].Title} </h2> <img src=${shopLink}> <p> ${parseJson[i].Description} </p> <a href="${buttonLink} + ">Buy  </a>`;
		}

		contentshtml.innerHTML = tempStr;


	}
	xhr.send(data);

}


function shopSearch(){
	let data = "";

	let xhr = new XMLHttpRequest();
	let uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/shop?term=" + document.getElementById("shopsearchbar").value;

	xhr.open("GET", uri);
	xhr.setRequestHeader("accept", "application/json");

	xhr.onload = () => {
		let parseJson = JSON.parse(xhr.responseText)
		const contentshtml = document.getElementById("shopcontent");
		let tempStr = "";
		let imgID = "";
		for (i=0; i<parseJson.length; i++){
			imgID = parseJson[i].ItemId;
			let shopLink = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/shopimg?id=";
			let buttonLink = "http://localhost:8189/Service.svc/buy?id=";
			shopLink += imgID;
			buttonLink += imgID;
			
			tempStr += `<h2> ${parseJson[i].Title} </h2> <img src=${shopLink}> <p> ${parseJson[i].Description} </p> <a href="${buttonLink} ">Buy Now </a>`;
			
		}

		contentshtml.innerHTML = tempStr;


	}
	xhr.send(data);

}


function userReg(){
	document.getElementById("home").style.display = "none";
	document.getElementById("news").style.display = "none";
	document.getElementById("items").style.display = "none";
	document.getElementById("htmlcomments").style.display = "none";
	document.getElementById("shop").style.display = "none";
	document.getElementById("regform").style.display = "block";

	
	//let authorname = document.getElementById("author").value;
		
	
	let xhr = new XMLHttpRequest();
	let uri = "http://localhost:8188/MuseumService.svc/register";
	xhr.open("POST", uri, true);
	xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");
	
	let data = {Address: document.getElementById("useradd").value,
	Name: document.getElementById("username").value,
	Password: document.getElementById("userpwd").value};
		

	xhr.send(JSON.stringify(data));
	
		
			
	

}

//function getLogin(){
	
//	document.getElementById("home").style.display = "none";
//	document.getElementById("news").style.display = "none";
//	document.getElementById("items").style.display = "none";
//	document.getElementById("htmlcomments").style.display = "none";
//	document.getElementById("shop").style.display = "none";
//	document.getElementById("regform").style.display = "none";
//	document.getElementById("userlogin").style.display = "block";
	
//	const username = document.getElementById("userlogin").value;
//	const pwd = document.getElementById("userpwd").value
//	let uri = "http://localhost:8189/Service.svc/id"
//	xhr.open("GET", uri, true, username, password);
//	xhr.withCredentials = true;
	
//	xhr.onload = () => {
//		if login == true{
//			alert("login successful");
//		}
		
//		else{		//redirect to login page - create a function that would show the login section
			
			
			
//		}
	
	
//	xhr.send(null));
//}








const navSlide = () => {
    const classA = document.querySelector('.myclass');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    myclass.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    });

    navLinks.forEach((link, index) => {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 1.5}s`;

    });
}



