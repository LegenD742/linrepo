const fs = require("fs");
const filepath = "./task.json";

// console.log(`hey  my ${filepath} whatsapp !!`);
// console.log(`heyy ${filepath}`);

const loadtasks = () => {
    try {
        const databuffer = fs.readFileSync(filepath);
        const data = databuffer.toString();
        return JSON.parse(data);
    }
    catch(error) {
        return [];
    }
} ;

const savetasks = (tasks) =>{
    const opdata = JSON.stringify(tasks);
    fs.writeFileSync(filepath,opdata);

} ;


const addtask = (task) => {
    const tasks = loadtasks();
    tasks.push({task});
    savetasks(tasks) ;
    console.log(`task added ${task}`);
} ;

const listing = () => {
    const tasks = loadtasks() ;
    tasks.forEach(
        (task,index) => console.log(`${index+1} - ${task.task}`) );
} ;

const command = process.argv[2];
const arg = process.argv[3];

if(command === "add"){
    addtask(arg);
}
else if( command === "list") {
    listing() ;
}
else{
    console.log(`cmd not recognised ${command} / ${arg}`);
}
