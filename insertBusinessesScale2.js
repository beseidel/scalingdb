var mysql = require('mysql');
var randy = require('randy');
var _ = require('underscore');
var faker = require('faker');
var fs =  require('fs');
var _id = 0;

var countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"];

var dbpool = mysql.createPool({
  "connectionLimit": 100, 
  "host": "localhost",
  "database": "testScale3",
  "user": "root",
  "password": "root",
  "port": 3306
});

// Query base.
function generateBusinesses(){
  var b_id = _id;
  _id++;
  var generateBusinessesScript = new Promise(function(resolve, reject){
    var sqlQuery = 'INSERT INTO businesses (' +
      `business_name,` +
      `owner_first_name,` +
      `owner_last_name,` +
      `image_link,` +
      `b_id,` +
      `updated_at,` +
      `created_at` +
      ') VALUES ';

    var count = 10000;
    var b_insert_id = b_id * count
    // Create records.
    _(count).times(function(n) {
      // Get random point data
      b_insert_id += 1
      var business_name = '"' + faker.company.companyName() + '"';
      var owner_first_name = '"' + faker.name.firstName() + '"';
      var owner_last_name = '"' + faker.name.lastName() + '"';
      var image_link = '"' + faker.image.imageUrl() + '"';
      var updated_at = 'NOW()';
      var created_at = 'NOW()';

      // Values.
      sqlQuery += '(' + 
        business_name + ',' +
        owner_first_name + ',' +
        owner_last_name + ',' +
        image_link + ',' +
        b_insert_id + ',' +
        updated_at + ',' +
        created_at +
      ')';

      // Comma, except for last.
      if (n != count-1) sqlQuery += ',\n';
     
    });
    // console.log(sqlQuery)
    resolve(sqlQuery);
  })
  generateBusinessesScript.then(function(sqlQuery){
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

//GENERATE BUSINESSES
setInterval(function(){
  generateBusinesses();
}, 500)
