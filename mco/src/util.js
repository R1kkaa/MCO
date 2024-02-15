//Restaurant Details
export var restaurants = ["Jollibee","McDonalds","KFC","Bonchon"];
export const location = ["Taft, Manila City","Taft, Manila City","Taft, Manila City","Taft, Manila City"];
export const ratings = [4.5,5,5,5,5];
export const reviews = [2,2,2,2,2];

export const emails = ["1@gmail.com","2@gmail.com","3@gmail.com","4@gmail.com","5@gmail.com"];
export const passwords = ["12345","23451","34512","45123","51234"];
export const name = ["Andy Moore","Person 2", "Person 3", "Person 4", "Person 5"];
export const username = ["@_andyymoore","@p2", "@p3", "@p4", "@p5"];
export const desc = 
["Hey there, foodies and friends! I'm your friend, Andy, serving up a deliciously delightful mix of online antics and culinary cravings. From mouthwatering burgers to tantalizing tacos, my love for food knows no bounds. Join me on a flavor-packed journey as we explore the tastiest trends, swap recipes, and maybe even uncover the ultimate secret ingredient. Let's spice up this digital landscape one bite at a time!",
"Desc2",
"Desc3",
"Desc4",
"Desc5"];

//format [[RestaurantID, Edited, Star Rating, Review, Agree, Disagree]]
const personreviews = 
//P1's review 1 and review 2
[[[],[]],
//P2's review 1 and review 2
[[],[]],
//P3's review 1 and review 2
[[],[]],
//P4's review 1 and review 2
[[],[]],
//P5's review 1 and review 2
[[],[]]];

export function stringuserid(q){
    let link = "?userid="
    link = link.concat(q)
    return link;
}