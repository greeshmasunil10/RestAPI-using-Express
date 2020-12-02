const Joi = require('joi');
const express = require('express');
const app = express(); 
app.use(express.json());

// app.get();
// app.post();
// app.put();
// app.delete();

const courses = [
    {   id: 1, 
        name: 'Baby Alive Shimmer ‘n Splash Mermaid',
        imageUrl: 'https://www.toysrus.ca/dw/image/v2/BDFX_PRD/on/demandware.static/-/Sites-toys-master-catalog/default/dw14eb8ef0/images/69A9C712_1.jpg?sw=767&sh=767&sm=fit',
        description: "Shimmer ‘n Splash Mermaid makes a splash with tons of fun in and out of the water! Just pull down her skirt and transform her from a baby into a mermaid with a shimmery, dazzling tail. Now kids are ready to splish, splash and play all day.",
        price :24.99
    },
    {   id: 2, 
        name: 'Barbie Doll, 11.5-inch Brunette',
        imageUrl: 'https://www.toysrus.ca/dw/image/v2/BDFX_PRD/on/demandware.static/-/Sites-toys-master-catalog/default/dw93c404cf/images/B4BF6A2F_1.jpg?sw=767&sh=767&sm=fit',
        description: "Slide into summer fun with Barbie doll and her pool! It's easy to fill and empty for an instant pool party -and with room for Barbie doll and her sisters or friends (sold separately), it's the perfect pool for a party! Barbie doll can slide right in and make a splash or lounge around in the built-in seating area. A colorful design inspires style, and accessories encourage imaginative storytelling. Two cool beverages, two cupholders next to the seating area and a towel with a colorful print help set the scene for the perfect summer day. Barbie doll is pool-ready in a bright swimsuit with fun, flowery graphics. Imaginations can play out so many summertime stories with Barbie doll and her pool! Collect other Barbie dolls and accessories to expand the playtime possibilities (each sold separately, subject to availability). Doll cannot swim or stand alone. Colors and decorations may vary.",
        price :34.99
    },
    {   id: 3, 
        name: 'Mealtime Magic Mia, Interactive Feeding Baby',
        imageUrl: 'https://www.toysrus.ca/dw/image/v2/BDFX_PRD/on/demandware.static/-/Sites-toys-master-catalog/default/dw10472272/images/541B789D_1.jpg?sw=767&sh=767&sm=fit',
        description: "Discover Mealtime Magic Mia, the most expressive and lifelike feeding baby doll! Mealtime is Mia's favorite time of day. She really recognizes and reacts to the foods you feed her, with over 70 sounds and phrases! ",
        price :79.99
    },
    {   id: 4, 
        name: 'Star Wars The Child Animatronic Edition',
        imageUrl: 'https://www.toysrus.ca/dw/image/v2/BDFX_PRD/on/demandware.static/-/Sites-toys-master-catalog/default/dwa9929f18/images/34D6CB88_1.jpg?sw=767&sh=767&sm=fit',
        description: "He may look like Baby Yoda, but this lovable creature is called The Child -- and now you can become his protector with this animatronic toy from Star Wars.",
        price :59.99
    },
    {   id: 5, 
        name: 'FurReal - Disney The Lion King Mighty Roar Simba',
        imageUrl: 'https://www.toysrus.ca/dw/image/v2/BDFX_PRD/on/demandware.static/-/Sites-toys-master-catalog/default/dw1cf18f1f/images/F65D2939_1.jpg?sw=767&sh=767&sm=fit',
        description: "The Disney The Lion King Mighty Roar Simba Interactive Plush Toy Embodies All The Fun, Charm, And Humor Of Animation'S Most Famous Lion Cub - And Now He Can Come Along With You On All New Adventures",
        price :144.99
    }

];

app.get('/', (req,res) => {
    console.log("client has requested acced on local host");
    console.log("requested url:"+req.url);
    res.send("hello there !");
});

app.get('/summer', (req, res) => {
    console.log("client has requested for summer");
    console.log("requested url:"+req.url);
    res.send(["greeshma", 24]);
});

app.get('/summer/:year/:month', (req,res) => {
    // res.send(req.params); //http://localhost:3000/summer/2018/feb
        res.send(req.query);
});

app.get('/api/courses', (req,res) => {
        res.send(courses);
});

app.get('/api/courses/:id', (req,res) => {
        var idno= req.params.id;
        const course = courses.find(x => x.id === parseInt(req.params.id));
        if(!course) return res.status(404).send('Course for the given ID not found!');
        else res.send(course);
});

// POST method
app.post('/api/courses', (req,res) => {
    
    const { error } = validateCourse(req.body); // or result.error

    if(error) return res.status(400).send(error.details[0].message);

    // if(!req.body.name || req.body.name.length <3){
    //     //400 Bad request
    //     res.status(400).send('Invalid or empty name.');
    //     return;
    // }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
});


/* Post man - url - body - json - run
{
    "name": "Java"
}
*/ 

app.put('/api/courses/:id', (req,res) => {
    const course = courses.find(x => x.id === parseInt(req.params.id));
        if(!course) return res.status(404).send('Course for the given ID not found!');

    const { error } = validateCourse(req.body); // or result.error

    if(error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(course);
}
app.delete('/api/courses/:id', (req,res) => {
    const course = courses.find(x => x.id === parseInt(req.params.id));
    if(!course) res.status(404).send('Course for the given ID not found!');

    const index =  courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);
});

// Dynamic PORT
const PORT = process.env.PORT ; // or 3000
app.listen(PORT, () => {
    console.log(process.env);
    console.log("listening on port:"+PORT+"...");
} );


/*VIDLY application to rent out movies.
http://vidly.com/api/genres get all genres
update , delete genres.

*/
