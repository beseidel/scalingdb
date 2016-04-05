var mysql = require('mysql');
var randy = require('randy');
var _ = require('underscore');
var faker = require('faker');
var countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"];
var address_id = 0;
var business_id = 0;
var rowsToInsert = 10000000;

var dbpool = mysql.createPool({
  "connectionLimit": 100, 
  "host": "localhost",
  "database": "testscale3",
  "user": "root",
  "password": "root",
  "port": 3306
});

function generateAddresses(){
  var address_id_count = address_id;
  address_id++;
  var promise = new Promise(function(resolve, reject){
    var sqlQuery = `INSERT INTO addresses (` +
      `street_address,` +
      `city,` +
      `zipcode,` +
      `country,` +
      `lat,` +
      `lon,` +
      `area_code,` +
      `first_three_number,` +
      `last_four_number,` +
      `business_id,` + 
      `bus_id` + 
      ') VALUES ';

    var count = 10000;
    var address_insert_id = address_id_count * count
    _(count).times(function(n) {
      address_insert_id += 1;
      var street_address = '"' + faker.address.streetAddress() + '"';
      var city = '"' + faker.address.city() + '"';
      var zipcode = '"' + faker.address.zipCode() + '"';
      var country = '"' + randy.choice(countries) + '"';
      var lat = randy.randInt(-20000000,20000000);
      var lon = randy.randInt(-20000000,20000000);
      var area_code = randy.randInt(101, 999);
      var first_three_number = randy.randInt(101, 999);
      var last_four_number = randy.randInt(1001, 9999);

      sqlQuery += '(' + 
        street_address + ',' +
        city + ',' +
        zipcode + ',' +
        country + ',' +
        lat + ',' +
        lon + ',' +
        area_code + ',' +
        first_three_number + ',' +
        last_four_number + ',' +
        address_insert_id + ','
        address_insert_id + 
        ')';
      if (n != count-1) sqlQuery += ',';

    });
    resolve(sqlQuery);
  })
  promise.then(function(sqlQuery){
    dbpool.getConnection(function(err, connection){
      if(err){
        console.log(err)
      } else {
        connection.query(sqlQuery, function(err, results){
          if(err){
            console.log(err)
            connection.release();
          } else {
            console.log(results)
            connection.release();
          }
        })
      }
    })
  })
}


function generateBusinessInfos(){
  var business_id_count = business_id;
  business_id++;
  var generateBusinessInfos = new Promise(function(resolve, reject){
    var sqlQuery = 'INSERT INTO business_infos (' +
      `number_of_employee,` +
      `department,` +
      `slogan,` +
      `annual_business_cost,` +
      `annual_revenue,` +
      `annual_profit,` +
      `number_of_like,` +
      `number_of_dislike,` +
      `business_id,` +
      `bus_id` +
      ') VALUES ';


    var count = 10000;
    var business_insert_id = business_id_count * count;
    _(count).times(function(n) {       
      business_insert_id++;
      var number_of_employee = randy.randInt(1000, 100000);
      var department = '"' + faker.commerce.department() + '"';
      var slogan = '"' + faker.company.catchPhrase() + '"';
      var annual_business_cost = randy.randInt(1000, 100000);
      var annual_revenue = randy.randInt(1000, 100000);
      var annual_profit = annual_business_cost - annual_revenue;
      var number_of_like = randy.randInt(0, 1000000);
      var number_of_dislike = randy.randInt(0, 1000000);

      sqlQuery += '(' + 
        number_of_employee + ',' +
        department + ',' +
        slogan + ',' +
        annual_business_cost + ',' +
        annual_revenue + ',' +
        annual_profit + ',' +
        number_of_like + ',' +
        number_of_dislike + ',' +
        business_insert_id + ','
        business_insert_id +
      ')';
      if (n != count-1) sqlQuery += ',';
     
    });
    resolve(sqlQuery);
  })

  generateBusinessInfos.then(function(sqlQuery){
    dbpool.getConnection(function(err, connection){
      if(err){
        console.log(err)
      } else {
        connection.query(sqlQuery, function(err, results){
          if(err){
            console.log(err)
            connection.release();
          } else {
            console.log(results)
            connection.release();
          }
        })
      }
    })
  })
}

setInterval(function(){
  generateAddresses();
}, 500)

setInterval(function(){
  generateBusinessInfos();
}, 500)
