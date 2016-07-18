console.log("web fixer running");


websitesWithFixes = {}

// We can do the first number after the Xth occurence of a segment and if there is no number, add one, as in the mangastreamer case
websitesWithFixes["http://readms.com/"] = {selector:".page", nextPageSelector: ".next"}

if(window.location.href.substring(0, window.location.href.substring(8).indexOf("/") + 9) in websitesWithFixes){
	
	console.log("website has fix");
	websiteDetails = websitesWithFixes[window.location.href.substring(0, window.location.href.substring(8).indexOf("/") + 9)];

	websiteDetails.nextLink = $(websiteDetails.nextPageSelector).find("a").attr("href");
	
	if(websiteDetails.nextLink){
		readyToLoad = true;
		console.log("found a next page");
	}else{
		console.log("no next page found");
	}

	// create scroll event to load next page 
	$(window).scroll(function() {
		if(readyToLoad){
			if($(window).scrollTop() + $(window).height() > $(document).height()-50) {
	       		readyToLoad = false;

	       		console.log("loading next page", websiteDetails.nextLink);

	       		$.get(websiteDetails.nextLink, function( data ) {
	       			console.log("fetched next page")
	       			
	       			console.log($(data).find(websiteDetails.selector));
	       			$(websiteDetails.selector).last().parent().append($(data).find(websiteDetails.selector));
	       			websiteDetails.nextLink = $(data).find(websiteDetails.nextPageSelector).find("a").attr("href");
	       			
	       			if(websiteDetails.nextLink){
	       				setTimeout(function(){readyToLoad = true}, 200)
	       			}
	       		});

	   		}
		};
	});
}
