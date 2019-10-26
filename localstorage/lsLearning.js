/* Local StorageStudy */

let myObject = {
    name: "Leonidas",
    age: 34
};

let myObject_serialized = JSON.stringify(myObject);

localStorage.setItem('myObject', myObject_serialized );

let myObject_deserialized = JSON.parse(localStorage.getItem('myObject'));

console.log(myObject_deserialized);