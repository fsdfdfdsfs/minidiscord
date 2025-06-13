function addmessagestoscrn () 
{
    var message1 = document.getElementById("message1")
    var message2 = document.getElementById("message2")
    var message1txt = document.getElementById("message1txt")
    var message2txt = document.getElementById("message2txt")
    let messageHis = [];

    messageHis[0] = message1
    messageHis[1] = message2
    
    messageHis = messageHis.slice(2)

    console.log("messagehis 1 = ", messageHis[0])
    console.log("messagehis 2 = ", messageHis[1])
    console.log("messagehis 3 = ", messageHis[2])
}