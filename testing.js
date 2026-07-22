const books = [
  { id: 1, title: "JavaScript", pages: 450 },
  { id: 2, title: "Node.js", pages: 320 },
  { id: 3, title: "Python", pages: 600 },
  { id: 4, title: "React", pages: 280 }
];

for (let index = 0; index < books.length; index++) {
    const element = books[index].pages
    element+element
    console.log(element)
}