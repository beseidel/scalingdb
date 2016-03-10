create index `business_name`on `businesses`(`business_name`) using HASH;
create index `owner_first_name`on `businesses`(`owner_first_name`) using HASH;
create index `owner_last_name`on `businesses`(`owner_last_name`) using HASH;
create index `image_link`on `businesses`(`image_link`) using HASH;
create index `city`on `businesses`(`city`) using HASH;