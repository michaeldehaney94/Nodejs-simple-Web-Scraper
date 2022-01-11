const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

const port = 3000 || process.env.PORT;

//website
const url = 'https://www.caribbeanjobs.com/ShowResults.aspx?Keywords=&autosuggestEndpoint=%2Fautosuggest&Location=123&Category=3&Recruiter=Company&Recruiter=Agency&btnSubmit=Search';

app.get('/results', (req, res) => {
    axios(url).then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const list = []; //contain the list of results
    
        $('.job-result-title', html).each(function() {
            //name of link found
            const title = $(this).text();
            //load data that has an anchor tag and link you are looking for
            const url = $(this).find('a').attr('href');
            list.push({
                title,
                url
            })
        })
        res.json(list);
        console.log(list);
    
    }).catch(err => console.error(err));
});


app.listen(port, () => {
    console.log(`Server started on ${port}`);
});