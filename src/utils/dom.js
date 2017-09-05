export function strToDom(htmlStr){
    var wrapper= document.createElement('div');
    wrapper.innerHTML= htmlStr;
    return wrapper.firstChild;
}
export function emptyNode(node){
   while (node.firstChild){ 
            node.removeChild(node.firstChild)
        }
}