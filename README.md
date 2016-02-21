<h2>A URL shortner Microservice</h2>
<h3>NOTE: the github code is for testing on local environment. The examples here are for the code deployed on Cloud9.</h3>
User stories:
<ul>
<li>1)  Pass a URL as a parameter and you will receive a shortened URL in the JSON response.<br>
        <em>(https://urlshortener-mojoboss.c9users.io/new/YOUR_LONG_URL)</em>
</li>
<li>2)  When you visit that shortened URL, it will redirect you to your original link.</li>
</ul>

<h3>Example usage:</h3>
<a>https://urlshortener-mojoboss.c9users.io/new/http://www.flipkart.com/home-entertainment/televisions/vu~brand/pr?p[]=facets.resolution%255B%255D%3DUltra%2BHD%2B%25284K%2529&sid=ckf%2Cczl&filterNone=true&otracker=hp_mod_offersectionone_row_2_bn_middle</a>
<br>
<h3>Example output:</h3>
{
"originalUrl":
"http://www.flipkart.com/home-entertainment/televisions/vu~brand/pr?p[]=facets.resolution%255B%255D%3DUltra%2BHD%2B%25284K%2529&sid=ckf%2Cczl&filterNone=true&otracker=hp_mod_offersectionone_row_2_bn_middle",
"shortenedUrl":
"https://urlshortener-mojoboss.c9users.io/zNxmT58"
}
<h3>Usage:</h3>
<a>
https://urlshortener-mojoboss.c9users.io/zNxmT58
</a>
<h4>will redirect to</h4>
<a>http://www.flipkart.com/home-entertainment/televisions/vu~brand/pr?p[]=facets.resolution%255B%255D%3DUltra%2BHD%2B%25284K%2529&sid=ckf%2Cczl&filterNone=true&otracker=hp_mod_offersectionone_row_2_bn_middle</a>
