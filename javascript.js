let messageHis = [];

function getMessage() 
{
    console.log("gettinggg message")
    var message = document.getElementById("TypedMessage")
    
}

function addmessagestoscrns () 
{
    const message = document.getElementById("TypedMessage").value;
    console.log(message)

    messageHis.push(message);

    console.log(messageHis)
    console.log("messagehis 1 = ", messageHis[0])
    console.log("messagehis 2 = ", messageHis[1])
    console.log("messagehis 3 = ", messageHis[2])


}