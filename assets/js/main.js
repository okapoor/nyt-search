var searchTerm;
var NumRec;
var StartYear;
var endYear;
var article;
var numDocsToShow;
var section_name = $("<div>");
var web_url= $("<div>");
var pub_date= $("<div>");
var headline= $("<div>");
var NumRec=2;



function pullData(){
	searchTerm = $("#searchTerm").val();
	NumRec = $("#numRec option:selected").text();
	StartYear = $("#startYear").val();
	endYear = $("#endYear").val();
	article = $("#topArticles")

	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
          'api-key': "f78919dda5e74d16bc2e133a77cc6c1a",
          'q': searchTerm,
          'begin_date': StartYear+"01"+"01", //YYYYMMDD
          'end_date': endYear+"12"+"31" //YYYYMMDD
        });
//https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=f78919dda5e74d16bc2e133a77cc6c1a&q=&begin_date=0101&end_date=1231
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {

    	if(parseInt(NumRec) < result.response.docs.length){
    		numDocsToShow = parseInt(NumRec)
    	} else {
    		numDocsToShow = result.response.docs.length;
    	}
		
		for (var i = 0 ; i<numDocsToShow ; i++ ) {

		    console.log(result);

		    //Headlines
		    console.log(result.response.docs[i].headline.main);
		    article.append("<h1>" + result.response.docs[i].headline.main + "</h1>");

		    //Section
		    console.log(result.response.docs[i].section_name);
		    article.append("<h4>"+result.response.docs[i].section_name+"</h4>");

		    //Pub Date
		    console.log(result.response.docs[i].pub_date);
		    article.append("<h4>"+result.response.docs[i].pub_date+"</h4>");
		    //web url
		    console.log(result.response.docs[i].web_url);
		    article.append("<a href='"+ result.response.docs[i].web_url+"'>"+result.response.docs[i].web_url+"</a>")
		    // article.append("<>"+result.response.docs[i].web_url+"</h4>");

		    article.append("<hr>");

		}
         


    }).fail(function(err) {
      throw err;
    });
}

$(document).ready(function() {


	$("#search").click(pullData)
	$("#clear").click (function(){
		$("#topArticles").empty();
		$("#searchTerm").val("");
		$("#startYear").val("");
		$("#endYear").val("");

	})

})