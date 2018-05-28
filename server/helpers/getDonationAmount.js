require('dotenv').config()

import request from "request";
import cheerio from "cheerio";

const url = process.env.DONATIONS_URL

export const getDonationAmount = () => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, html) => {     
      if(!error){
          console.log('Finding donation totals...')
          const $ = cheerio.load(html)

          if ($('.donation-summary').length) {
            $('.donation-summary').filter(function(){
              const data = $(this);
              const amount = data.children().last().children().text()
              console.log('...found', amount)
              resolve(amount);
            })
          } else {
            reject(Error('Couldnt find .donation-summary node'))
          }

          
      } else {
        reject(Error(`Couldnt open url: ${url}`))
      }
    })
  })
}