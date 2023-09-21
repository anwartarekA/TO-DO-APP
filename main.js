// Setting the elements
let inputText = document.querySelector(".to-do-container .heading .enter");
let addButton = document.querySelector('.heading .plus');
let textContainer = document.querySelector('.task-content');
let mainSpan = document.querySelector(".task-content .task-box");
let tasksNums = document.querySelector(".tasks-status .nums_tasks span");
let tasksCompleted = document.querySelector(".tasks-status .task-completed span");
let deleteAll = document.querySelector('.AllTasks');
let deleteCompeleted = document.querySelector('.AllFinished');
let arr=[];
let count = localStorage.length;
// Focus on input when load the page direct
window.onload = function (){
    inputText.focus();
   if(localStorage.length > 0)
   {
    for(let i=0; i<localStorage.length;i++)
    {
        textContainer.innerHTML += localStorage.getItem(`span${i}`);
    }
     taskscount();
     document.querySelector('.no-message').remove();
   }
}
// make action onclick on plus button
addButton.onclick = function (){
    if(inputText.value === '')
    {
        emptyInput();
    }
    else
    {
        if(arr.includes(inputText.value))
        {
            duplicated();
            inputText.value = '';
            inputText.focus();
        }
        else
        {
            let noTaskMsg=document.querySelector(".task-content .no-message");
        // check if the no tasks message exists or not
        if(document.body.contains(document.querySelector(".task-content .no-message")))
        {
            noTaskMsg.remove();
        }
        // Create the Main span
        let main = document.createElement("span");
        // set the class name for main span
        main.className = "task-box";
        // set the value of inputText in the mainSpan
        let mainText = document.createTextNode(inputText.value);
        // create the delete button
        let deleteButton = document.createElement("span");
        // set the classname to the delete button
        deleteButton.className = 'delete';
        // create the text of the delete button
        let deleteText = document.createTextNode("Delete");
        // set the text of delete buttong in the delete button
        deleteButton.appendChild(deleteText);
        // set the text of  main span 
        main.appendChild(mainText);
        // push every main span to the array
        arr.push(main.firstChild.nodeValue);
        // set the full delete button in the main span
        main.appendChild(deleteButton);
        // set the main span in the text container
        textContainer.appendChild(main);
        // make local stortage
        localStorage.setItem(`span${count}`,main.outerHTML);
        // clear the inputText value
        inputText.value = '';
        // focus on input
        taskscount();
        inputText.focus();
        count++;
        }
    }
}

// delete the target element
document.addEventListener('click',function(e){
    if(e.target.className === "delete" )
    {
       e.target.parentNode.remove();      
       if(textContainer.childElementCount == 0)
       {
              NoMsg();
       }
    }
    // add class finished on the span
    if(e.target.classList.contains("task-box"))
    {
        e.target.classList.toggle("finished");
    }
    taskscount();
})

// create function no Msg 
function NoMsg ()
{   // create the span of message
    let noMSG = document.createElement('span');
    // set the classname to nomsg
    noMSG.className = 'no-message';
    // set the text of message
    let MsgText = document.createTextNode("No Tasks To Show");
    noMSG.appendChild(MsgText);
    // set the message to the text-content
    textContainer.appendChild(noMSG);
}

// create the function for counting the tasks
function taskscount()
{
    tasksNums.innerHTML = document.querySelectorAll('.task-content .task-box').length;
    tasksCompleted.innerHTML = document.querySelectorAll(".task-content .task-box.finished").length;
}

// create function to delete all contents tasks
function All()
{
    textContainer.innerHTML = '';
    inputText.focus();
    NoMsg();
    localStorage.clear();
    success();
}
deleteAll.addEventListener('click',All);
// create function to delet all finished tasks
function Finished ()
{
   let spanContainsClassFinished = document.querySelectorAll('.task-content .task-box.finished');
   spanContainsClassFinished.forEach((ele)=>{
        ele.remove();
    })
    if(textContainer.childElementCount === 0)
    {
        inputText.focus();
        NoMsg();
        compltedfinished();
    }
}
deleteCompeleted.addEventListener('click',Finished);

// create swal function to stop for empty input
function emptyInput()
{
    swal(
        {
            title:"Attention",
            text:"Oops! you should enter the input",
            icon:"error"
        }
    )
}
// swal function for success
function success()
{
    swal("Done","every tasks are deleted!","success")
}
// swal function for success
function compltedfinished()
{
    swal("Compilted!","every tasks are complited!","success")
}
// create function for duplicated 

function duplicated()
{
    swal({
        title:"Duplicated input text",
        text: "Duplicated, you should enter another text!",
        icon: "error"
    })
}
