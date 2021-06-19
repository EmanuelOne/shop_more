import fs from "fs";
import { products } from "./products.js";
const category = [
  "Appliances",
  "Apps & Games",
  "Arts, Crafts, & Sewing",
  "Automotive Parts & Accessories",

  "Books",
  "Cell Phones & Accessories",
  "Clothing, Shoes and Jewelry",
  "Computers",
  "Electronics",
  "Grocery & Gourmet Food",
];
const descriptions =
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat".split(
    "."
  );
const getRand = (max) => Math.floor(Math.random() * max.length);
let categoryProduct = products.map((product, i) => {
  //   console.log(rand);

  if (!product.category) product.category = category[getRand(category)];
  product.image = `./images/image${i <= 6 ? i + 1 : i - 6}.jpg`;
  descriptions.map(
    () => (product.description = descriptions[getRand(descriptions)])
  );

  return product;
});
categoryProduct = JSON.stringify(categoryProduct);
// console.log(categoryProduct);
fs.writeFile("./product.json", categoryProduct, (err) => {
  // throws an error, you could also catch it here
  if (err) throw err;

  // success case, the file was saved
  console.log("Lyric saved!");
});
