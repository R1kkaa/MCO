//Restaurant Details
export var restaurants = ["Jollibee","McDonalds","KFC","Bonchon","24 Chicken"];
export const location = ["Taft, Manila City","Taft, Manila City","Taft, Manila City","Taft, Manila City"];
export const ratings = [4.6,4.6,4.5,4.6,4.6];
export const reviews = [5,5,5,5,5];

export const emails = ["_jekacakes@gmail.com","RikkaFoods@gmail.com","Zachiebear@gmail.com","TheHawkMan@gmail.com","KaelleEats@gmail.com"];
export const passwords = ["mooncake123","munchmunch12345","princesszachy","baldeagle","kaellesopogi"];
export const name = ["Jeka Cataluna", "Angelo Geronimo", "Princess Hermione Marucot","Mike Hawk", "Sai Kabiling"];
export const username = ["@_jekacakes", "@RikkaFoods", "@Zachiebear", "@TheHawkMan", "@KaelleEats"];

export const desc = 
["I'm a 2nd year CCS student from DLSU who loves to explore food chains and helping out those who want to find good and cheap food in taft! Want a foodie buddy? Feel free to hit me up! I know a lot of good places!", 
"As someone who loves trying out new dishes, I'm so glad that there are new places in taft avenue that are popping off! I like going beyond fast food restaurants and highlighting those independent businesses so they can thrive as well!",
"I love sweets and desserts! Current obsession: fast food desserts! I'm here to find places to help you find a way to sate your sweet tooth's cravings!",
"I'm obsessed with finding the best fried chicken in Taft Avenue! I'm so glad I have a variety of choices to choose from, it's like fried chicken heaven! Personal favorite flavor is 24 Chicken's JD!",
"I absolutely adore Filipino cuisine, and I'm so glad that there are those that try to amp up these dishes and make them fancier! I'm here to uplift and find restaurants that are trying to improve the already perfect Filipino Cuisine!",];


export const jollibeereviews = [
{ userid: 0, rating: 5, review: "Crispylicious and Juicilicious! Lives up to its name.", helpful : 1, unhelpful : 0},
{ userid: 1, rating: 4, review: "Has long lines during peak hours, but the chicken here is always fresh!", helpful : 2, unhelpful : 0},
{ userid: 2, rating: 5, review: "I really love Jolly Spaghetti! This branch makes it best!" , helpful : 0, unhelpful : 0},
{ userid: 3, rating: 5, review: "Peach Mango Pie FTW! I also love the new choco float", helpful : 1, unhelpful : 0},
{ userid: 4, rating: 4, review: "The new mix and match is a life saver for students who want to save money! ", helpful : 1, unhelpful : 0}]

export const mcdoreviews = [
    { userid: 0, rating: 4, review: "Very generous with fries! Always served hot and crispy.", helpful : 3, unhelpful : 0},
    { userid: 1, rating: 5, review: "I love the new McWings! The spice is just right !", helpful : 1, unhelpful : 1},
    { userid: 2, rating: 5, review: "They bragged about bigger sizes and I got what they marketed!", helpful : 0, unhelpful : 1},
    { userid: 3, rating: 4, review: "You’ll get what you usually get in a regular McDo, it’s enough to stop the hunger.", helpful : 1, unhelpful : 0},
    { userid: 4, rating: 5, review: "I had a birthday party here the other day, they were pretty accommodating!", helpful : 1, unhelpful : 0}]

export const kfcreviews = [
    { userid: 0, rating: 4, review: "Pretty quiet branch, I go here when I want to eat and enjoy chicken in peace.", helpful : 2, unhelpful : 0},
    { userid: 1, rating: 5, review: " I love the gravy machine! My comfort food is rice and gravy, yum", helpful : 1, unhelpful : 0},
    { userid: 2, rating: 4, review: "The serving time’s not as bad as the other branches, I get my order in less than 10 minutes!", helpful : 2, unhelpful : 0},
    { userid: 3, rating: 5, review: " The menu is completely different from the ones I’m used to abroad, but I love how they turned it Filipino Friendly!", helpful : 1, unhelpful : 0},
    { userid: 4, rating: 4, review: "The combo meals are amazing! I especially like the mushroom soup paired with mashed potatoes 4/5!", helpful : 1, unhelpful : 0}]
    
    export const bonchonreviews = [
        { userid: 0, rating: 4, review: "I absolutely adore the new flavors! Bingsu is great too!", helpful : 1, unhelpful : 0},
        { userid: 1, rating: 5, review: " Great flavor on the chicken skin, and juicy meat on the inside!", helpful : 2, unhelpful : 0},
        { userid: 2, rating: 5, review: "I love how comfy the seats are and how the staff serve you the food! Very different from your typical fast food where you have to be the one to pick it up! Great Service!", helpful : 2, unhelpful : 0},
        { userid: 3, rating: 4, review: "Their Bibimbowls are amazing! I also love their iced tea blend!", helpful : 1, unhelpful : 0},
        { userid: 4, rating: 5, review: "I tried their chicken sandwiches the other day, surprisingly, they were great!", helpful : 1, unhelpful : 0}]

    export const chicken24reviews = [
        { userid: 0, rating: 4, review: "I like Bok’s better but their JD flavor really doesnt disappoint", helpful : 1, unhelpful : 0},
        { userid: 1, rating: 5, review: "Try their snow cheese, it’s so damn good!", helpful : 1, unhelpful : 0},
        { userid: 2, rating: 5, review: "Pretty good for its price, very student friendly and large portions!", helpful : 2, unhelpful : 0},
        { userid: 3, rating: 4, review: "The queue time is a bit long, but it’s worth it!", helpful : 1, unhelpful : 0},
        { userid: 4, rating: 5, review: "Not only do their flavors have great taste, they also have great music taste", helpful : 2, unhelpful : 0}]

export const restaurantreviews = [jollibeereviews,mcdoreviews,kfcreviews,bonchonreviews,chicken24reviews]
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